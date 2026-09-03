/* ==========================================================================
   WOLFTYPE — STORAGE LAYER (localStorage-backed, no backend required)
   ========================================================================== */

const WT_KEY = "wolftype_state_v1";

function wtDefaultState(){
  return {
    user: null, // {username, email, joined}
    onboarded: false,
    settings: {
      theme: "wolfblue",
      testMode: "time", testDuration: 30, testWords: 25,
      punctuation: false, numbers: false, capitalization: true,
      soundEnabled: false, soundVolume: 0.4,
      liveWpm: true, liveGraph: true, smoothCaret: true,
      keyboardVisible: true, blurUnfocused: true, animations: true,
      fontSize: "md",
    },
    goals: { targetWpm: 80, targetAccuracy: 97, dailyMinutes: 20 },
    stats: {
      testsCompleted: 0, practiceTime: 0, totalTypingSeconds: 0,
      bestWpm: 0, bestAccuracy: 0, bestConsistency: 0, longestTestWords: 0,
      avgWpm: 0, avgAccuracy: 0, xp: 0, level: 1,
      perfectRuns: 0, passagesCompleted: [], nightTest:false,
      currentStreak: 0, longestStreak: 0, lastActiveDate: null,
      history: [], // {date, wpm, rawWpm, accuracy, consistency, mode, errors, duration}
      keyStats: {}, // key -> {correct, incorrect}
      lessonProgress: {}, // lessonId -> percent 0-100
      achievements: [],
      dailyGoalProgress: 0, dailyGoalDate: null,
    },
  };
}

const WolfStore = {
  _state: null,
  load(){
    if(this._state) return this._state;
    try{
      const raw = localStorage.getItem(WT_KEY);
      this._state = raw ? this._deepMerge(wtDefaultState(), JSON.parse(raw)) : wtDefaultState();
    }catch(e){ this._state = wtDefaultState(); }
    return this._state;
  },
  save(){ try{ localStorage.setItem(WT_KEY, JSON.stringify(this._state)); }catch(e){} },
  get(){ return this.load(); },
  update(fn){ const s = this.load(); fn(s); this.save(); return s; },
  reset(){ this._state = wtDefaultState(); this.save(); },
  _deepMerge(base, override){
    if(typeof override !== "object" || override === null) return base;
    const out = Array.isArray(base) ? base.slice() : {...base};
    for(const k in base){
      if(override[k] === undefined) continue;
      if(typeof base[k] === "object" && base[k] !== null && !Array.isArray(base[k]) && typeof override[k]==="object"){
        out[k] = this._deepMerge(base[k], override[k]);
      } else out[k] = override[k];
    }
    for(const k in override){ if(!(k in base)) out[k] = override[k]; }
    return out;
  }
};

function wtLevelInfo(xp){
  let current = WT_LEVELS[0], next = WT_LEVELS[1];
  for(let i=0;i<WT_LEVELS.length;i++){
    if(xp >= WT_LEVELS[i].xp) current = WT_LEVELS[i];
    next = WT_LEVELS[i+1] || null;
  }
  const span = next ? next.xp - current.xp : 1;
  const into = next ? xp - current.xp : 0;
  const pct = next ? Math.min(100, Math.round((into/span)*100)) : 100;
  return { current, next, pct, xp };
}

function wtToday(){ return new Date().toISOString().slice(0,10); }

function wtUpdateStreak(s){
  const today = wtToday();
  if(s.stats.lastActiveDate === today) return; // already counted today
  const yesterday = new Date(Date.now()-86400000).toISOString().slice(0,10);
  if(s.stats.lastActiveDate === yesterday){ s.stats.currentStreak += 1; }
  else { s.stats.currentStreak = 1; }
  s.stats.longestStreak = Math.max(s.stats.longestStreak, s.stats.currentStreak);
  s.stats.lastActiveDate = today;
  if(s.stats.dailyGoalDate !== today){ s.stats.dailyGoalDate = today; s.stats.dailyGoalProgress = 0; }
}

function wtRecordResult(result){
  // result: {wpm, rawWpm, accuracy, consistency, errors, correctChars, incorrectChars, duration, mode, passageTitle, keyErrors, wordsTyped}
  const s = WolfStore.get();
  const wasBest = result.wpm > s.stats.bestWpm;
  wtUpdateStreak(s);

  s.stats.testsCompleted += 1;
  s.stats.totalTypingSeconds += result.duration;
  s.stats.dailyGoalProgress += Math.round(result.duration/60*10)/10;

  const hr = new Date().getHours();
  if(hr>=0 && hr<4) s.stats.nightTest = true;

  s.stats.bestWpm = Math.max(s.stats.bestWpm, Math.round(result.wpm));
  s.stats.bestAccuracy = Math.max(s.stats.bestAccuracy, Math.round(result.accuracy*10)/10);
  s.stats.bestConsistency = Math.max(s.stats.bestConsistency, Math.round(result.consistency));
  s.stats.longestTestWords = Math.max(s.stats.longestTestWords, result.wordsTyped||0);
  if(result.errors === 0) s.stats.perfectRuns += 1;

  s.stats.history.push({
    date: new Date().toISOString(), wpm: Math.round(result.wpm), rawWpm: Math.round(result.rawWpm),
    accuracy: Math.round(result.accuracy*10)/10, consistency: Math.round(result.consistency),
    mode: result.mode, errors: result.errors, duration: result.duration, title: result.passageTitle||null
  });
  if(s.stats.history.length > 500) s.stats.history = s.stats.history.slice(-500);

  const n = s.stats.testsCompleted;
  s.stats.avgWpm = Math.round(((s.stats.avgWpm*(n-1)) + result.wpm)/n);
  s.stats.avgAccuracy = Math.round((((s.stats.avgAccuracy*(n-1)) + result.accuracy)/n)*10)/10;

  if(result.keyErrors){
    for(const k in result.keyErrors){
      if(!s.stats.keyStats[k]) s.stats.keyStats[k] = {correct:0, incorrect:0};
      s.stats.keyStats[k].incorrect += result.keyErrors[k];
    }
  }
  if(result.keyCorrect){
    for(const k in result.keyCorrect){
      if(!s.stats.keyStats[k]) s.stats.keyStats[k] = {correct:0, incorrect:0};
      s.stats.keyStats[k].correct += result.keyCorrect[k];
    }
  }

  if(result.passageId && !s.stats.passagesCompleted.includes(result.passageId)){
    s.stats.passagesCompleted.push(result.passageId);
  }

  // XP: base on wpm + accuracy quality
  const xpGain = Math.round(20 + result.wpm*0.6 + (result.accuracy-90)*1.2 + (result.errors===0?30:0));
  s.stats.xp += Math.max(10, xpGain);
  s.stats.level = wtLevelInfo(s.stats.xp).current.lvl;

  WolfStore.save();

  const newAchievements = [];
  for(const a of WT_ACHIEVEMENTS){
    if(!s.stats.achievements.includes(a.id) && a.check(s.stats)){
      s.stats.achievements.push(a.id);
      newAchievements.push(a);
    }
  }
  WolfStore.save();
  return { wasBest, newAchievements };
}
