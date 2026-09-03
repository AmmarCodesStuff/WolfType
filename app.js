/* ==========================================================================
   WOLFTYPE — APPLICATION CONTROLLER
   Hash router + event delegation + typing test orchestration
   ========================================================================== */

const root = document.getElementById("app-root");
let CURRENT_ENGINE = null;
let CURRENT_TEST_CTX = null; // {passage, mode, duration, wordCount, title, passageId, practiceMode}
let ACTIVE_LESSON = null;

/* ---------------------------- ROUTER ---------------------------- */
function parseRoute(){
  const hash = location.hash.slice(1) || "/";
  const [path, qs] = hash.split("?");
  const params = new URLSearchParams(qs||"");
  return { path, params, parts: path.split("/").filter(Boolean) };
}

function navigate(path){ location.hash = "#"+path; }

function render(){
  const { path, params, parts } = parseRoute();
  updateNavActive(path);
  closeMobileDrawer();

  if(path === "/" || path === ""){
    root.innerHTML = WolfStore.get().user ? viewDashboard() : viewLanding();
    if(WolfStore.get().user) mountDashboardCharts();
  }
  else if(path === "/test"){ root.innerHTML = viewTest(); mountTypingTest(); }
  else if(path === "/practice"){ root.innerHTML = viewPractice(); mountPracticePage(); }
  else if(path === "/academy"){ root.innerHTML = viewAcademy(); }
  else if(parts[0] === "academy" && parts[1] === "lesson"){
    const lesson = WT_LESSONS.find(l=>String(l.id)===parts[2]);
    root.innerHTML = lesson ? viewLessonDetail(lesson) : emptyState("Lesson not found","","");
  }
  else if(path === "/history"){
    root.innerHTML = viewHistory({ era: params.get("era")||"", diff: params.get("diff")||"", q: params.get("q")||"" });
    mountHistoryFilters();
  }
  else if(path === "/history/timeline"){ root.innerHTML = viewTimeline(); }
  else if(parts[0]==="history" && parts[1]==="passage"){
    const p = WT_PASSAGES.find(p=>p.id===parts[2]);
    if(p) startPassageTest(p); else root.innerHTML = emptyState("Passage not found","","");
  }
  else if(path === "/stats"){ root.innerHTML = viewStats(params.get("range")||"30"); mountStatsCharts(params.get("range")||"30"); }
  else if(path === "/leaderboard"){ root.innerHTML = viewLeaderboard(params.get("tab")||"global"); }
  else if(path === "/profile"){ root.innerHTML = viewProfile(); }
  else if(path === "/settings"){ root.innerHTML = viewSettings(params.get("s")||"Test Behavior"); }
  else if(path === "/login"){ root.innerHTML = viewLogin(); }
  else if(path === "/register"){ root.innerHTML = viewRegister(); }
  else if(path === "/forgot"){ root.innerHTML = viewForgot(); }
  else if(path === "/about"){ root.innerHTML = viewAbout(); }
  else if(path === "/privacy"){ root.innerHTML = viewPrivacy(); }
  else if(path === "/terms"){ root.innerHTML = viewTerms(); }
  else if(path === "/contact"){ root.innerHTML = viewContact(); }
  else if(path === "/status"){ root.innerHTML = viewStatus(); }
  else { root.innerHTML = emptyState("Page not found","That page doesn't exist.","Go Home","nav-home"); }

  window.scrollTo({top:0, behavior:"instant"});
}

function updateNavActive(path){
  document.querySelectorAll("[data-nav]").forEach(el=>{
    el.classList.toggle("active", el.getAttribute("data-nav") === path);
  });
}

window.addEventListener("hashchange", render);

/* ---------------------------- GLOBAL CLICK DELEGATION ---------------------------- */
document.addEventListener("click", (e)=>{
  const navEl = e.target.closest("[data-nav]");
  if(navEl){ e.preventDefault(); navigate(navEl.getAttribute("data-nav")); return; }

  const actionEl = e.target.closest("[data-action]");
  if(actionEl){ handleAction(actionEl, e); return; }
});

function handleAction(el, e){
  const action = el.getAttribute("data-action");
  switch(action){
    case "nav-home": navigate("/"); break;
    case "practice-weak-keys": navigate("/practice"); startWeakKeyPractice(); break;
    case "start-passage": startPassageTest(WT_PASSAGES.find(p=>p.id===el.dataset.passageId)); break;
    case "start-practice": startPracticeMode(el.dataset.practiceMode); break;
    case "open-lesson": navigate(`/academy/lesson/${el.dataset.lessonId}`); break;
    case "start-lesson-drill": startLessonDrill(el.dataset.lessonId, parseInt(el.dataset.drillIdx)); break;
    case "restart-test": navigate("/test"); break;
    case "share-result": toggleShareCard(); break;
    case "toggle-punct": toggleTestSetting("punctuation"); break;
    case "toggle-numbers": toggleTestSetting("numbers"); break;
    case "stats-range": navigate(`/stats?range=${el.dataset.range}`); break;
    case "lb-tab": navigate(`/leaderboard?tab=${el.dataset.tab}`); break;
    case "settings-section": navigate(`/settings?s=${encodeURIComponent(el.dataset.section)}`); break;
    case "toggle-setting": toggleSetting(el.dataset.key, el); break;
    case "set-theme": applyTheme(el.dataset.theme); render(); break;
    case "set-fontsize": WolfStore.update(s=>s.settings.fontSize=el.dataset.size); render(); break;
    case "save-goals": saveGoals(); break;
    case "export-data": exportData(); break;
    case "delete-account": deleteAccount(); break;
    case "do-login": doLogin(); break;
    case "do-register": doRegister(); break;
    case "do-google": toast("Google auth requires a connected backend in this demo build.", "info"); break;
    case "do-forgot": toast("If an account exists, a reset link has been sent.", "success"); navigate("/login"); break;
    case "logout": doLogout(); break;
    case "send-contact": toast("Message sent. We'll get back to you soon.", "success"); break;
  }
}

function closeMobileDrawer(){ document.getElementById("mobile-drawer").classList.remove("open"); }

/* ---------------------------- TOASTS ---------------------------- */
function toast(msg, type="info", icon=""){
  const root = document.getElementById("toast-root");
  const el = document.createElement("div");
  el.className = `toast ${type}`;
  el.innerHTML = `${icon?`<span>${icon}</span>`:""}<span>${msg}</span>`;
  root.appendChild(el);
  setTimeout(()=>{ el.style.opacity="0"; el.style.transform="translateY(6px)"; el.style.transition="all .25s ease"; setTimeout(()=>el.remove(),250); }, 3400);
}

/* ---------------------------- THEME ---------------------------- */
function applyTheme(themeId){
  document.body.setAttribute("data-theme", themeId);
  WolfStore.update(s=>s.settings.theme = themeId);
}

/* ---------------------------- NAV / AUTH UI ---------------------------- */
function refreshNavUser(){
  const s = WolfStore.get();
  document.getElementById("nav-username").textContent = s.user ? s.user.username : "Guest";
  document.getElementById("nav-avatar").textContent = (s.user?.username || "G")[0].toUpperCase();
  document.getElementById("nav-login-btn").style.display = s.user ? "none" : "inline-flex";
}
document.getElementById("nav-profile-btn").addEventListener("click", ()=>navigate("/profile"));
document.getElementById("nav-login-btn").addEventListener("click", ()=>navigate("/login"));
document.getElementById("mobile-menu-btn").addEventListener("click", ()=>{
  document.getElementById("mobile-drawer").classList.toggle("open");
});

function doLogin(){
  const u = document.getElementById("login-username").value.trim();
  if(!u){ toast("Enter a username","info"); return; }
  WolfStore.update(s=>{ s.user = { username:u, email:s.user?.email||"", joined:new Date().toISOString() }; });
  refreshNavUser(); toast(`Welcome back, ${u}!`,"success"); navigate("/");
}
function doRegister(){
  const u = document.getElementById("reg-username").value.trim();
  const email = document.getElementById("reg-email").value.trim();
  if(!u){ toast("Enter a username","info"); return; }
  WolfStore.update(s=>{ s.user = { username:u, email, joined:new Date().toISOString() }; s.onboarded=false; });
  refreshNavUser(); toast(`Account created. Welcome, ${u}!`,"success");
  navigate("/"); maybeShowOnboarding();
}
function doLogout(){ WolfStore.update(s=>s.user=null); refreshNavUser(); toast("Logged out","info"); navigate("/"); }
function deleteAccount(){
  if(confirm("Delete all local WolfType data? This cannot be undone.")){
    WolfStore.reset(); refreshNavUser(); toast("Account and data deleted","info"); navigate("/");
  }
}

/* ---------------------------- SETTINGS ACTIONS ---------------------------- */
function toggleSetting(key, el){
  const s = WolfStore.update(s=>{ s.settings[key] = !s.settings[key]; });
  el.classList.toggle("on", s.settings[key]);
}
function saveGoals(){
  const wpm = parseInt(document.getElementById("goal-wpm").value)||80;
  const acc = parseInt(document.getElementById("goal-accuracy").value)||97;
  const min = parseInt(document.getElementById("goal-minutes").value)||20;
  WolfStore.update(s=>{ s.goals = {targetWpm:wpm,targetAccuracy:acc,dailyMinutes:min}; });
  toast("Goals saved","success");
}
function exportData(){
  const blob = new Blob([JSON.stringify(WolfStore.get(), null, 2)], {type:"application/json"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href = url; a.download = "wolftype-data.json"; a.click();
  URL.revokeObjectURL(url);
  toast("Data exported","success");
}

/* ---------------------------- TYPING TEST MOUNT ---------------------------- */
function mountTypingTest(){
  const s = WolfStore.get();
  CURRENT_TEST_CTX = {
    mode: s.settings.testMode, duration: s.settings.testDuration, wordCount: s.settings.testWords,
    punctuation: s.settings.punctuation, numbers: s.settings.numbers, title:null, passageId:null,
  };
  buildModeBar();
  loadNewTestText();
  wireModeBar();
  wireTypeArea();
  if(s.settings.keyboardVisible){
    document.getElementById("vk-container").innerHTML = renderVirtualKeyboard();
  }
}

function buildModeBar(){
  const s = WolfStore.get();
  const ctx = CURRENT_TEST_CTX;
  document.querySelectorAll(".mode-btn[data-mode]").forEach(b=>{
    b.classList.toggle("active", b.dataset.mode === ctx.mode);
  });
  document.getElementById("mode-group-value").innerHTML = modeValueButtons(ctx);
  document.querySelectorAll("[data-action='toggle-punct']").forEach(b=>b.classList.toggle("active", ctx.punctuation));
  document.querySelectorAll("[data-action='toggle-numbers']").forEach(b=>b.classList.toggle("active", ctx.numbers));
}
function modeValueButtons(ctx){
  if(ctx.mode==="time"){
    return [15,30,60,120,180].map(v=>`<button class="mode-btn ${ctx.duration===v?'active':''}" data-duration="${v}">${v}</button>`).join("");
  }
  if(ctx.mode==="words"){
    return [10,25,50,100,200].map(v=>`<button class="mode-btn ${ctx.wordCount===v?'active':''}" data-words="${v}">${v}</button>`).join("");
  }
  return "";
}
function wireModeBar(){
  document.getElementById("mode-bar").addEventListener("click", (e)=>{
    const modeBtn = e.target.closest("[data-mode]");
    if(modeBtn){ CURRENT_TEST_CTX.mode = modeBtn.dataset.mode; buildModeBar(); loadNewTestText(); return; }
    const durBtn = e.target.closest("[data-duration]");
    if(durBtn){ CURRENT_TEST_CTX.duration = parseInt(durBtn.dataset.duration); buildModeBar(); loadNewTestText(); return; }
    const wordBtn = e.target.closest("[data-words]");
    if(wordBtn){ CURRENT_TEST_CTX.wordCount = parseInt(wordBtn.dataset.words); buildModeBar(); loadNewTestText(); return; }
  });
}
function toggleTestSetting(key){
  CURRENT_TEST_CTX[key] = !CURRENT_TEST_CTX[key];
  buildModeBar(); loadNewTestText();
}

function generateTextForMode(ctx){
  if(ctx.mode === "quote"){
    const q = WT_QUOTES[Math.floor(Math.random()*WT_QUOTES.length)];
    ctx.title = q.source;
    return q.text;
  }
  if(ctx.mode === "zen"){ ctx.title = "Zen — no timer"; return wtGenerateWords(60, ctx); }
  if(ctx.mode === "accuracy"){ ctx.title = "Accuracy Focus"; return wtGenerateWords(30, ctx); }
  if(ctx.mode === "words"){ ctx.title = null; return wtGenerateWords(ctx.wordCount, ctx); }
  // time mode: generate a starting buffer; live internet text streams in as the test runs (see wtLiveText)
  ctx.title = null;
  return wtGenerateWords(120, ctx);
}

/* ---------------------------- LIVE INTERNET TEXT STREAM ----------------------------
   For endless modes (time / zen), WolfType opportunistically fetches real prose from
   Wikipedia's public REST API (CORS-enabled, no key required) so long tests never repeat
   the same local word pool. If the network is unavailable, generation falls back to the
   local word generator instantly — the typing test itself never blocks or stalls. */
const wtLiveText = {
  queue: [],
  fetching: false,
  failCount: 0,
  active: false,

  reset(){ this.queue = []; this.fetching = false; this.failCount = 0; },

  async refill(){
    if(this.fetching || this.failCount >= 3) return;
    this.fetching = true;
    try{
      const controller = new AbortController();
      const timeout = setTimeout(()=>controller.abort(), 4500);
      const res = await fetch("https://en.wikipedia.org/api/rest_v1/page/random/summary", { signal: controller.signal });
      clearTimeout(timeout);
      if(!res.ok) throw new Error("bad response");
      const data = await res.json();
      let text = (data.extract || "").replace(/\s+/g, " ").trim();
      text = text.replace(/\[[0-9]+\]/g, "");
      if(text.length > 20){
        this.queue.push(text);
        this.failCount = 0;
      }
    }catch(err){
      this.failCount++;
    }finally{
      this.fetching = false;
    }
  },

  /** Pull the next chunk of live words if ready, otherwise null (caller should use local fallback) */
  take(){
    if(this.queue.length === 0) return null;
    return this.queue.shift();
  },
};

/** Called periodically while a time/zen test is running to keep the buffer topped up. */
function maybeExtendLiveBuffer(){
  if(!CURRENT_ENGINE || CURRENT_ENGINE.finished) return;
  const mode = CURRENT_ENGINE.mode;
  if(mode !== "time" && mode !== "zen") return;
  const remaining = CURRENT_ENGINE.text.length - CURRENT_ENGINE.cursor;
  if(remaining > 140) return; // plenty of buffer left, nothing to do yet

  const chunk = wtLiveText.take();
  if(chunk){
    CURRENT_ENGINE.text += (CURRENT_ENGINE.text.endsWith(" ") ? "" : " ") + chunk;
    renderTypeArea(CURRENT_ENGINE.text, CURRENT_ENGINE.cursor, CURRENT_ENGINE.typed);
    markLiveTextActive(true);
  } else {
    // stopgap so the test can never run out, while a fresh live chunk fetches in the background
    CURRENT_ENGINE.text += " " + wtGenerateWords(20, CURRENT_TEST_CTX || {});
  }
  wtLiveText.refill();
}

function markLiveTextActive(on){
  if(wtLiveText.active === on) return;
  wtLiveText.active = on;
  const badge = document.getElementById("live-text-badge");
  if(badge) badge.classList.toggle("hidden", !on);
}

function enterCustomTest(text, meta){
  // Navigate URL to /test WITHOUT firing hashchange (pushState doesn't dispatch it),
  // so we control the render directly and avoid a race with the default router render.
  history.pushState(null, "", "#/test");
  updateNavActive("/test");
  root.innerHTML = viewTest();
  document.getElementById("mode-bar").style.display = "none";
  mountTypingTestWithText(text, meta);
}

function startPassageTest(passage){
  if(!passage) return;
  enterCustomTest(passage.text, {title:passage.title, category:passage.category, difficulty:passage.difficulty, passageId:passage.id, mode:"passage"});
}

function startLessonDrill(lessonId, drillIdx){
  const lesson = WT_LESSONS.find(l=>String(l.id)===String(lessonId));
  if(!lesson || !lesson.drills) return;
  ACTIVE_LESSON = {lesson, drillIdx, totalDrills: lesson.drills.length};
  const text = lesson.drills[drillIdx];
  enterCustomTest(text, {title:`Lesson ${lesson.id} · ${lesson.title}`, category:"Academy Drill", difficulty:"Guided", mode:"lesson"});
}

function startWeakKeyPractice(){
  const s = WolfStore.get();
  const weak = wtTopWeakKeys(s.stats, 4).map(k=>k.key);
  const text = weak.length ? buildKeyDrillText(weak) : wtGenerateWords(40, {});
  enterCustomTest(text, {title:"Weak Key Drill", category:"Practice", difficulty:"Adaptive", mode:"practice"});
}
function startPracticeMode(mode){
  const s = WolfStore.get();
  let text, title;
  if(mode==="weak"){ const weak = wtTopWeakKeys(s.stats,4).map(k=>k.key); text = weak.length?buildKeyDrillText(weak):wtGenerateWords(40,{}); title="Weak Key Drill"; }
  else if(mode==="speed"){ text = wtGenerateWords(60,{}); title="Speed Practice"; }
  else if(mode==="accuracy"){ text = wtGenerateWords(25,{}); title="Accuracy Practice"; }
  else if(mode==="capitalization"){ text = wtGenerateWords(30,{capitalization:true}); title="Capitalization Practice"; }
  else if(mode==="numbers"){ text = wtGenerateWords(30,{numbers:true}); title="Number Practice"; }
  else if(mode==="punctuation"){ text = wtGenerateWords(30,{punctuation:true}); title="Punctuation Practice"; }
  else if(mode==="common"){ text = WT_COMMON_WORDS.slice(0,40).join(" "); title="Common Words"; }
  else { const p = WT_PASSAGES[Math.floor(Math.random()*WT_PASSAGES.length)]; text = p.text.split(" ").slice(0,50).join(" "); title="Historical Vocabulary"; }
  enterCustomTest(text, {title, category:"Practice", difficulty:"Adaptive", mode:"practice"});
}
function buildKeyDrillText(keys){
  const templates = { r:["are","rare","river","revolution","research"], t:["the","that","test","typing","future"], o:["of","for","from","world","road"],
    a:["and","are","alpha","around","ancient"], s:["is","was","state","system","speed"], e:["the","empire","early","evidence","every"] };
  const words = [];
  keys.forEach(k=>{ words.push(k,k+k+k); (templates[k]||[k+"a",k+"e",k+"i"]).forEach(w=>words.push(w)); });
  return words.join(" ")+" "+words.join(" ");
}

function mountTypingTestWithText(text, meta){
  CURRENT_TEST_CTX = { ...meta, text };
  document.getElementById("passage-meta").innerHTML = `<span class="cat">${meta.category||""}</span><span>${meta.difficulty?`<span class="diff-badge diff-${(meta.difficulty||'').toLowerCase()}">${meta.difficulty}</span>`:""}</span>`;
  buildEngine(text, meta.mode==="passage"||meta.mode==="lesson"||meta.mode==="practice" ? "passage" : meta.mode);
  wireTypeArea();
  const s = WolfStore.get();
  if(s.settings.keyboardVisible) document.getElementById("vk-container").innerHTML = renderVirtualKeyboard();
}

function loadNewTestText(){
  const ctx = CURRENT_TEST_CTX;
  const text = generateTextForMode(ctx);
  document.getElementById("passage-meta").innerHTML = ctx.title ? `<span class="cat">${escapeHtml(ctx.title)}</span>` : "";
  buildEngine(text, ctx.mode);
}

function buildEngine(text, mode){
  if(CURRENT_ENGINE) CURRENT_ENGINE.destroy();
  const s = WolfStore.get();
  const timeLimit = (mode==="time") ? CURRENT_TEST_CTX.duration : null;
  CURRENT_ENGINE = new TypingEngine({
    text, mode: mode==="lesson"?"passage":mode, timeLimit,
    onTick: onEngineTick,
    onComplete: onEngineComplete,
  });
  wtLiveText.reset();
  markLiveTextActive(false);
  if(mode === "time" || mode === "zen"){ wtLiveText.refill(); }
  renderTypeArea(text, 0);
  updateStatsBar({wpm:0, accuracy:100, errors:0, remaining: timeLimit, elapsed:0});
}

function renderTypeArea(text, cursor, typedArr){
  const area = document.getElementById("type-area");
  if(!area) return;
  let html = "";
  for(let i=0;i<text.length;i++){
    const ch = text[i];
    let cls = "ch";
    if(typedArr && typedArr[i]){
      cls += typedArr[i].correct ? " correct" : " incorrect";
    } else if(i === cursor){ cls += " current"; }
    const display = escapeHtml(ch);
    html += `<span class="${cls}">${display}</span>`;
  }
  area.innerHTML = html;
}

function updateStatsBar({wpm, accuracy, errors, remaining, elapsed}){
  const timeEl = document.getElementById("live-time");
  const wpmEl = document.getElementById("live-wpm");
  const accEl = document.getElementById("live-acc");
  const errEl = document.getElementById("live-errors");
  if(!wpmEl) return;
  if(remaining != null) timeEl.textContent = Math.ceil(remaining);
  else timeEl.textContent = Math.floor(elapsed||0)+"s";
  wpmEl.textContent = Math.max(0,Math.round(wpm));
  accEl.textContent = accuracy.toFixed ? accuracy.toFixed(1)+"%" : accuracy+"%";
  errEl.textContent = errors;
}

function onEngineTick(data){ updateStatsBar(data); maybeExtendLiveBuffer(); }

function onEngineComplete(result){
  const prevBest = WolfStore.get().stats.bestWpm;
  const meta = wtRecordResult({
    ...result, mode: CURRENT_TEST_CTX.mode || "time", passageTitle: CURRENT_TEST_CTX.title, passageId: CURRENT_TEST_CTX.passageId,
  });
  meta.prevBest = prevBest > 0 ? prevBest : null;
  meta.title = CURRENT_TEST_CTX.title;

  if(ACTIVE_LESSON){
    const {lesson, drillIdx, totalDrills} = ACTIVE_LESSON;
    const pct = Math.round(((drillIdx+1)/totalDrills)*100);
    WolfStore.update(s=>{ s.stats.lessonProgress[lesson.id] = Math.max(s.stats.lessonProgress[lesson.id]||0, pct); });
    ACTIVE_LESSON = null;
  }
  if(CURRENT_TEST_CTX.mode === "passage" && CURRENT_TEST_CTX.difficulty){
    const matchLesson = WT_LESSONS.find(l=>l.type==="passage" && l.passageDifficulty===CURRENT_TEST_CTX.difficulty);
    if(matchLesson) WolfStore.update(s=>{ s.stats.lessonProgress[matchLesson.id] = 100; });
  }

  root.innerHTML = viewResults(result, meta);
  mountResultGraph(result);
  refreshNavUser();

  meta.newAchievements.forEach(a=>{
    setTimeout(()=>toast(`Achievement Unlocked: ${a.name}`, "achievement", a.icon), 400);
  });
  if(meta.wasBest) setTimeout(()=>toast("New Personal Best! 🎉","success"), 100);
}

function toggleShareCard(){
  const card = document.getElementById("share-card");
  card.classList.toggle("hidden");
  if(!card.classList.contains("hidden")) card.scrollIntoView({behavior:"smooth", block:"center"});
}

/* ---------------------------- KEYBOARD INPUT WIRING ---------------------------- */
function wireTypeArea(){
  const area = document.getElementById("type-area");
  if(!area) return;
  area.focus();
  area.addEventListener("click", ()=>area.focus());
  // global keydown listener for typing is registered exactly once in init()
}

function handleTypingKeydown(e){
  const area = document.getElementById("type-area");
  if(!area || !CURRENT_ENGINE || CURRENT_ENGINE.finished) return;
  if(document.activeElement && ["INPUT","TEXTAREA"].includes(document.activeElement.tagName)) return;
  if(!document.getElementById("test-page")) return;

  if(e.key === "Tab"){ e.preventDefault(); navigate("/test"); return; }
  if(e.key === "Escape"){ return; } // handled by cmdk

  if(e.key === "Backspace"){
    e.preventDefault();
    CURRENT_ENGINE.backspace();
    renderTypeArea(CURRENT_ENGINE.text, CURRENT_ENGINE.cursor, CURRENT_ENGINE.typed);
    updateStatsBar({wpm:CURRENT_ENGINE._instantWpm(CURRENT_ENGINE.elapsedSeconds()), accuracy:CURRENT_ENGINE.currentAccuracy(), errors:CURRENT_ENGINE.errors, remaining: CURRENT_ENGINE.mode==="time"?CURRENT_ENGINE.timeLimit-CURRENT_ENGINE.elapsedSeconds():null, elapsed:CURRENT_ENGINE.elapsedSeconds()});
    flashKey(" ", false, true);
    return;
  }
  if(e.key.length !== 1) return; // ignore modifier/arrow keys etc.
  e.preventDefault();

  const res = CURRENT_ENGINE.typeChar(e.key);
  renderTypeArea(CURRENT_ENGINE.text, CURRENT_ENGINE.cursor, CURRENT_ENGINE.typed);
  updateStatsBar({wpm:CURRENT_ENGINE._instantWpm(CURRENT_ENGINE.elapsedSeconds()), accuracy:CURRENT_ENGINE.currentAccuracy(), errors:CURRENT_ENGINE.errors, remaining: CURRENT_ENGINE.mode==="time"?CURRENT_ENGINE.timeLimit-CURRENT_ENGINE.elapsedSeconds():null, elapsed:CURRENT_ENGINE.elapsedSeconds()});
  flashKey(e.key, res && res.status==="incorrect");

  // auto-scroll: keep current char visible
  const currentEl = area.querySelector(".ch.current");
  if(currentEl && typeof currentEl.scrollIntoView === "function") currentEl.scrollIntoView({block:"nearest"});
}

function flashKey(key, wrong, isBackspace){
  const vk = document.querySelector(`.vk-key[data-key="${key.toLowerCase()===' '?' ':key.toLowerCase()}"]`);
  if(!vk) return;
  vk.classList.add(wrong ? "wrong" : "active");
  setTimeout(()=>vk.classList.remove("wrong","active"), 130);
}

/* ---------------------------- PRACTICE PAGE (finger training) ---------------------------- */
function mountPracticePage(){
  const vk = document.getElementById("finger-vk");
  if(!vk) return;
  vk.addEventListener("click", (e)=>{
    const key = e.target.closest(".vk-key");
    if(!key) return;
    const k = key.dataset.key;
    const finger = WT_FINGER_MAP[k] || "—";
    document.getElementById("finger-label").textContent = finger.replace("L-","Left ").replace("R-","Right ").replace("-"," ");
    vk.querySelectorAll(".vk-key").forEach(el=>el.classList.remove("active"));
    key.classList.add("active");
  });
}

/* ---------------------------- HISTORY FILTERS ---------------------------- */
function mountHistoryFilters(){
  const search = document.getElementById("history-search");
  const eraSel = document.getElementById("history-era-filter");
  const diffSel = document.getElementById("history-diff-filter");
  const apply = ()=>{
    const q = search.value, era = eraSel.value, diff = diffSel.value;
    const p = new URLSearchParams();
    if(q) p.set("q",q); if(era) p.set("era",era); if(diff) p.set("diff",diff);
    history.replaceState(null,"","#/history"+(p.toString()?`?${p}`:""));
    document.getElementById("passage-grid").innerHTML = (()=>{
      let list = WT_PASSAGES;
      if(era) list = list.filter(x=>x.era===era);
      if(diff) list = list.filter(x=>x.difficulty===diff);
      if(q) list = list.filter(x=>x.title.toLowerCase().includes(q.toLowerCase()));
      const s = WolfStore.get();
      return list.length ? list.map(x=>passageCard(x,s)).join("") : emptyState("No passages found","Try a different search or filter.","");
    })();
  };
  let t;
  search.addEventListener("input", ()=>{ clearTimeout(t); t=setTimeout(apply,200); });
  eraSel.addEventListener("change", apply);
  diffSel.addEventListener("change", apply);
}

/* ---------------------------- CHARTS (lightweight canvas, no deps) ---------------------------- */
function drawLineChart(container, series, opts={}){
  if(!container) return;
  container.innerHTML = "";
  if(!series.length){ container.innerHTML = `<p class="dim" style="text-align:center;padding-top:40px">Not enough data yet.</p>`; return; }
  const w = container.clientWidth || 600, h = container.clientHeight || 240;
  const canvas = document.createElement("canvas");
  canvas.width = w*2; canvas.height = h*2; canvas.style.width=w+"px"; canvas.style.height=h+"px";
  const ctx = canvas.getContext("2d"); ctx.scale(2,2);
  container.appendChild(canvas);

  const max = Math.max(...series, 10) * 1.15;
  const min = 0;
  const padL=36, padB=24, padT=14, padR=10;
  const cw = w-padL-padR, ch = h-padT-padB;

  const accent = getComputedStyle(document.body).getPropertyValue('--accent').trim() || "#3d8bff";
  const gridColor = getComputedStyle(document.body).getPropertyValue('--line').trim() || "#1c2432";
  const textColor = getComputedStyle(document.body).getPropertyValue('--text-3').trim() || "#4d5972";

  // grid
  ctx.strokeStyle = gridColor; ctx.lineWidth = 1; ctx.font = "10px JetBrains Mono, monospace"; ctx.fillStyle = textColor;
  for(let i=0;i<=4;i++){
    const y = padT + ch - (ch*i/4);
    ctx.beginPath(); ctx.moveTo(padL,y); ctx.lineTo(padL+cw,y); ctx.stroke();
    ctx.fillText(Math.round(max*i/4), 2, y+3);
  }

  // line
  const pts = series.map((v,i)=>({ x: padL + cw*(series.length===1?0:i/(series.length-1)), y: padT + ch - ch*((v-min)/(max-min)) }));
  const grad = ctx.createLinearGradient(0,padT,0,padT+ch);
  grad.addColorStop(0, accent+"55"); grad.addColorStop(1, accent+"00");
  ctx.beginPath(); ctx.moveTo(pts[0].x,padT+ch);
  pts.forEach(p=>ctx.lineTo(p.x,p.y));
  ctx.lineTo(pts[pts.length-1].x, padT+ch); ctx.closePath();
  ctx.fillStyle = grad; ctx.fill();

  ctx.beginPath(); ctx.strokeStyle = accent; ctx.lineWidth = 2.4; ctx.lineJoin="round";
  pts.forEach((p,i)=> i===0?ctx.moveTo(p.x,p.y):ctx.lineTo(p.x,p.y));
  ctx.stroke();

  pts.forEach(p=>{ ctx.beginPath(); ctx.arc(p.x,p.y,3,0,7); ctx.fillStyle=accent; ctx.fill(); });
}

function mountDashboardCharts(){
  const s = WolfStore.get();
  const wpmSeries = s.stats.history.slice(-7).map(h=>h.wpm);
  drawLineChart(document.getElementById("dash-chart"), wpmSeries);
}
function mountStatsCharts(range){
  const s = WolfStore.get();
  const now = Date.now();
  const rangeMs = {"7":7,"30":30,"90":90,"180":180,"365":365,"all":100000}[range]*86400000;
  const filtered = s.stats.history.filter(h=>(now-new Date(h.date).getTime())<=rangeMs);
  drawLineChart(document.getElementById("stats-wpm-chart"), filtered.map(h=>h.wpm));
  paintHeatmap(s.stats.keyStats);
}
function mountResultGraph(result){
  const el = document.getElementById("result-graph");
  if(!el) return;
  drawLineChart(el, result.wpmSamples.map(s=>s.wpm));
}
function paintHeatmap(keyStats){
  document.querySelectorAll("#heatmap-container .vk-key").forEach(el=>{
    const k = el.dataset.key;
    const v = keyStats[k];
    if(!v || (v.correct+v.incorrect)===0){ el.style.background=""; return; }
    const acc = v.correct/(v.correct+v.incorrect);
    const hue = Math.round(acc*130); // 0=red 130=green
    el.style.background = `hsla(${hue}, 65%, 32%, 0.9)`;
  });
}

/* ---------------------------- COMMAND PALETTE ---------------------------- */
const CMDK_COMMANDS = [
  {label:"Start Test", group:"Navigation", action:()=>navigate("/test")},
  {label:"Practice Weak Keys", group:"Navigation", action:()=>{navigate("/practice"); setTimeout(startWeakKeyPractice,50);}},
  {label:"Open Dashboard", group:"Navigation", action:()=>navigate("/")},
  {label:"Open Statistics", group:"Navigation", action:()=>navigate("/stats")},
  {label:"Open History Library", group:"Navigation", action:()=>navigate("/history")},
  {label:"Open Academy", group:"Navigation", action:()=>navigate("/academy")},
  {label:"Open Leaderboard", group:"Navigation", action:()=>navigate("/leaderboard")},
  {label:"Open Profile", group:"Navigation", action:()=>navigate("/profile")},
  {label:"Open Settings", group:"Navigation", action:()=>navigate("/settings")},
  {label:"Restart Test", group:"Test", action:()=>{ navigate("/test"); }},
  ...WT_THEMES.map(t=>({label:`Theme: ${t.name}`, group:"Appearance", action:()=>{applyTheme(t.id); render();}})),
];
let cmdkSelected = 0, cmdkFiltered = CMDK_COMMANDS;

function openCmdk(){
  document.getElementById("cmdk-overlay").classList.remove("hidden");
  const input = document.getElementById("cmdk-input");
  input.value = ""; input.focus();
  cmdkFiltered = CMDK_COMMANDS; cmdkSelected = 0;
  renderCmdkList();
}
function closeCmdk(){ document.getElementById("cmdk-overlay").classList.add("hidden"); }
function renderCmdkList(){
  const list = document.getElementById("cmdk-list");
  list.innerHTML = cmdkFiltered.map((c,i)=>`<div class="cmdk-item ${i===cmdkSelected?'sel':''}" data-idx="${i}"><span>${c.label}</span><span class="grp">${c.group}</span></div>`).join("") || `<div class="cmdk-item">No results</div>`;
}
document.getElementById("cmdk-trigger").addEventListener("click", openCmdk);
document.getElementById("cmdk-overlay").addEventListener("click", (e)=>{ if(e.target.id==="cmdk-overlay") closeCmdk(); });
document.getElementById("cmdk-input").addEventListener("input", (e)=>{
  const q = e.target.value.toLowerCase();
  cmdkFiltered = CMDK_COMMANDS.filter(c=>c.label.toLowerCase().includes(q));
  cmdkSelected = 0; renderCmdkList();
});
document.getElementById("cmdk-list").addEventListener("click", (e)=>{
  const item = e.target.closest(".cmdk-item"); if(!item) return;
  const idx = parseInt(item.dataset.idx); if(cmdkFiltered[idx]){ cmdkFiltered[idx].action(); closeCmdk(); }
});
document.getElementById("theme-trigger").addEventListener("click", ()=>navigate("/settings?s=Appearance"));
document.getElementById("footer-shortcuts").addEventListener("click",(e)=>{ e.preventDefault(); openCmdk(); });

document.addEventListener("keydown",(e)=>{
  const overlay = document.getElementById("cmdk-overlay");
  const isOpen = !overlay.classList.contains("hidden");
  if((e.ctrlKey||e.metaKey) && e.key.toLowerCase()==="k"){ e.preventDefault(); isOpen?closeCmdk():openCmdk(); return; }
  if(e.key === "Escape"){
    if(isOpen){ closeCmdk(); return; }
    const onTestPage = !!document.getElementById("test-page");
    if(!onTestPage){ openCmdk(); }
    return;
  }
  if(!isOpen) return;
  if(e.key === "ArrowDown"){ e.preventDefault(); cmdkSelected = Math.min(cmdkFiltered.length-1, cmdkSelected+1); renderCmdkList(); }
  if(e.key === "ArrowUp"){ e.preventDefault(); cmdkSelected = Math.max(0, cmdkSelected-1); renderCmdkList(); }
  if(e.key === "Enter"){ if(cmdkFiltered[cmdkSelected]){ cmdkFiltered[cmdkSelected].action(); closeCmdk(); } }
});

/* ---------------------------- ONBOARDING ---------------------------- */
function maybeShowOnboarding(){
  const s = WolfStore.get();
  if(s.onboarded) return;
  const overlay = document.createElement("div");
  overlay.className = "onboard-overlay";
  overlay.innerHTML = `
    <div class="onboard-modal">
      <div class="onboard-steps"><div class="s done"></div><div class="s"></div><div class="s"></div></div>
      <h3 style="margin-bottom:10px">Welcome to WolfType</h3>
      <p class="muted" style="margin-bottom:24px">Let's tailor your starting point. What's your experience level?</p>
      <div class="onboard-option" data-level="beginner"><span>Complete Beginner</span><span class="dim">→</span></div>
      <div class="onboard-option" data-level="some"><span>Some Experience</span><span class="dim">→</span></div>
      <div class="onboard-option" data-level="fast"><span>Fast Typist</span><span class="dim">→</span></div>
    </div>`;
  document.body.appendChild(overlay);
  overlay.querySelectorAll(".onboard-option").forEach(opt=>{
    opt.addEventListener("click", ()=>{
      const level = opt.dataset.level;
      WolfStore.update(s=>{ s.onboarded = true; });
      overlay.remove();
      const startLesson = level==="beginner" ? 0 : level==="some" ? 4 : 9;
      toast(`Starting point set. Recommended lesson: ${WT_LESSONS[startLesson].title}`, "success");
      if(level!=="fast") navigate("/academy"); else navigate("/test");
    });
  });
}

/* ---------------------------- INIT ---------------------------- */
function init(){
  document.getElementById("year").textContent = new Date().getFullYear();
  applyTheme(WolfStore.get().settings.theme);
  refreshNavUser();
  document.addEventListener("keydown", handleTypingKeydown);
  render();
  window.addEventListener("resize", ()=>{
    if(location.hash.includes("/stats")) mountStatsCharts(new URLSearchParams(location.hash.split("?")[1]).get("range")||"30");
    if(location.hash === "#/" && WolfStore.get().user) mountDashboardCharts();
  });
}
init();
