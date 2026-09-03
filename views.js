/* ==========================================================================
   WOLFTYPE — VIEW TEMPLATES
   Pure functions returning HTML strings for each route.
   ========================================================================== */

const WT_THEMES = [
  {id:"wolfblue", name:"Wolf Blue", c:["#3d8bff","#05070d","#0d121c"]},
  {id:"midnight", name:"Midnight", c:["#7c8aff","#05070d","#0d121c"]},
  {id:"arctic", name:"Arctic", c:["#4fd0e9","#050a0d","#0a1215"]},
  {id:"deepocean", name:"Deep Ocean", c:["#2fb8c9","#040b0e","#081315"]},
  {id:"carbon", name:"Carbon", c:["#c9d3e0","#060606","#0f0f0f"]},
  {id:"bluesteel", name:"Blue Steel", c:["#5b8def","#05070d","#0d121c"]},
  {id:"eclipse", name:"Eclipse", c:["#a86bff","#05070d","#0f0c1a"]},
];

function escapeHtml(s){ return (s||"").replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function fmtNum(n){ return Math.round(n).toLocaleString(); }
function fmtTime(sec){ const m=Math.floor(sec/60), s=Math.round(sec%60); return m>0?`${m}m ${s}s`:`${s}s`; }
function timeAgo(iso){
  const d = new Date(iso), diff = (Date.now()-d.getTime())/1000;
  if(diff<60) return "just now";
  if(diff<3600) return Math.floor(diff/60)+"m ago";
  if(diff<86400) return Math.floor(diff/3600)+"h ago";
  return Math.floor(diff/86400)+"d ago";
}

/* ===================== LANDING ===================== */
function viewLanding(){
  return `
  <section class="hero fade-in">
    <div class="container">
      <div class="hero-logo" aria-hidden="true">
        <svg viewBox="0 0 48 48" fill="none" width="40" height="40">
          <polygon points="8,4 17,16 24,11 31,16 40,4 38,26 24,40 10,26" stroke="var(--accent)" stroke-width="1.5" stroke-linejoin="round" fill="none"/>
          <path d="M17,16 L24,25 L31,16 M24,11 L24,25 M10,26 L24,25 L38,26" stroke="var(--accent)" stroke-width="0.85" stroke-linejoin="round" opacity="0.45"/>
          <circle cx="18.5" cy="21.5" r="1.4" fill="var(--accent-2)"/>
          <circle cx="29.5" cy="21.5" r="1.4" fill="var(--accent-2)"/>
          <polygon points="24,30 21.5,34 24,37 26.5,34" fill="var(--accent-2)" opacity="0.9"/>
        </svg>
      </div>
      <span class="hero-badge"><span class="dot"></span> Historically-grounded typing practice</span>
      <h1>Master Your Keyboard.<br><span class="accent">One Key at a Time.</span></h1>
      <p class="hero-sub">Practice smarter, type faster, and learn history while you build real keyboard mastery — structured lessons, adaptive drills, and hundreds of historical passages.</p>
      <div class="hero-ctas">
        <button class="btn btn-primary btn-lg" data-nav="/test">Start Typing</button>
        <button class="btn btn-outline btn-lg" data-nav="/academy">Learn Touch Typing</button>
      </div>

      <div class="hero-preview">
        <div class="hero-preview-stats">
          <div class="hp-stat"><div class="n">87</div><div class="l">WPM</div></div>
          <div class="hp-stat"><div class="n">98.4%</div><div class="l">Accuracy</div></div>
          <div class="hp-stat"><div class="n">94</div><div class="l">Consistency</div></div>
        </div>
        <div class="hero-preview-text">
          <span class="hp-correct">The Renaissance marked a return to classical ideals </span><span class="hp-current">o</span><span class="hp-pending">f art, philosophy, and human potential across Europe.</span>
        </div>
      </div>
    </div>
  </section>

  <section class="container">
    <div class="section-head">
      <span class="section-tag">Why WolfType</span>
      <h2>Typing practice that teaches you something</h2>
      <p>Every long-form passage is built from real historical writing — not lorem ipsum. Build speed while actually learning something.</p>
    </div>
    <div class="feature-grid">
      ${featureCard(svgIcon("keyboard"),"Precision Typing Engine","Real keystroke-level WPM, raw WPM, accuracy, and consistency — calculated live, never faked.")}
      ${featureCard(svgIcon("scroll"),"Historical Passages","Hundreds of passages spanning Ancient Rome to the Space Race, organized by era and difficulty.")}
      ${featureCard(svgIcon("cap"),"Structured Academy","15 progressive levels from home row basics to expert-level historical writing.")}
      ${featureCard(svgIcon("target"),"Adaptive Practice","WolfType detects your weak keys automatically and builds targeted drills around them.")}
      ${featureCard(svgIcon("chart"),"Deep Analytics","Track WPM trends, accuracy, consistency, and a full keyboard heatmap over time.")}
      ${featureCard(svgIcon("wolf"),"Progression System","Earn XP, level up from Beginner to Alpha, unlock achievements, and maintain streaks.")}
    </div>
  </section>

  <section class="container">
    <div class="section-head">
      <span class="section-tag">Explore History</span>
      <h2>Type your way through the timeline</h2>
      <p>Jump into any era and start typing immediately.</p>
    </div>
    <div class="era-strip">
      ${WT_TIMELINE.slice(0,8).map(t=>`
        <div class="era-chip" data-nav="/history/passage/${t.passageId}">
          <div class="yr">${t.year}</div>
          <div class="nm">${escapeHtml(t.title)}</div>
        </div>`).join("")}
    </div>
  </section>

  <section class="container">
    <div class="cta-banner">
      <h2>Ready to build real keyboard mastery?</h2>
      <p>Free to start. No account required for basic practice.</p>
      <button class="btn btn-primary btn-lg" data-nav="/test">Start Typing Now</button>
    </div>
  </section>
  `;
}
function featureCard(icon,title,desc){
  return `<div class="feature-card"><div class="fi">${icon}</div><h3>${title}</h3><p>${desc}</p></div>`;
}
function svgIcon(name){
  const icons = {
    keyboard: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="2" y="6" width="20" height="13" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M6 14h.01M18 14h.01M9 14h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
    scroll: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M6 4h12a2 2 0 0 1 2 2v13a1 1 0 0 1-1.6.8L16 18l-2.4 1.8a1 1 0 0 1-1.2 0L10 18l-2.4 1.8A1 1 0 0 1 6 19V6a2 2 0 0 1 0-2Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M9 8h6M9 11.5h6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
    cap: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 3 2 8l10 5 10-5-10-5Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M6 10.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M22 8v6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
    target: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="12" r="1.4" fill="currentColor"/></svg>`,
    chart: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 20V10M11 20V4M18 20v-7" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>`,
    wolf: `<svg width="20" height="20" viewBox="0 0 48 48" fill="none"><polygon points="8,4 17,16 24,11 31,16 40,4 38,26 24,40 10,26" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round" fill="none"/><circle cx="18.5" cy="21.5" r="1.9" fill="currentColor"/><circle cx="29.5" cy="21.5" r="1.9" fill="currentColor"/></svg>`,
    globe: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/><path d="M3 12h18M12 3c2.5 2.7 4 6 4 9s-1.5 6.3-4 9c-2.5-2.7-4-6-4-9s1.5-6.3 4-9Z" stroke="currentColor" stroke-width="1.5"/></svg>`,
  };
  return icons[name] || "";
}

/* ===================== DASHBOARD (Home, authed) ===================== */
function viewDashboard(){
  const s = WolfStore.get();
  const st = s.stats;
  const li = wtLevelInfo(st.xp);
  const recentHistory = st.history.slice(-7);
  const wpmTrend = recentHistory.map(h=>h.wpm);
  const lesson = WT_LESSONS[Math.min(WT_LESSONS.length-1, Object.keys(st.lessonProgress).length)] || WT_LESSONS[0];
  const lessonPct = st.lessonProgress[lesson.id] || 0;
  const weakKeys = wtTopWeakKeys(st, 3);
  const goalPct = Math.min(100, Math.round((st.dailyGoalProgress / s.goals.dailyMinutes)*100));

  return `
  <div class="page fade-in">
    <div class="dash-grid">
      <div class="flex flex-col gap-16">
        <div class="dash-hero">
          <div class="dash-hero-top">
            <div>
              <div class="greeting">${wtGreeting()}, ${escapeHtml(s.user?.username || "Guest")}</div>
              <div class="greeting-sub">Level ${li.current.lvl} · ${li.current.name} · ${fmtNum(st.xp)} XP</div>
            </div>
            <div class="streak-pill"><span class="flame">🔥</span> ${st.currentStreak} day streak</div>
          </div>
          <div class="stat-row">
            <div class="stat-box"><div class="v">${st.testsCompleted}</div><div class="k">Tests Completed</div></div>
            <div class="stat-box"><div class="v">${fmtTime(st.totalTypingSeconds)}</div><div class="k">Practice Time</div></div>
            <div class="stat-box"><div class="v">${st.avgWpm}</div><div class="k">Average WPM</div></div>
            <div class="stat-box"><div class="v">${st.bestWpm}</div><div class="k">Best WPM</div></div>
          </div>
        </div>

        <div class="panel">
          <div class="panel-title"><h3>Progress (last 7 tests)</h3><a data-nav="/stats">View all →</a></div>
          <div id="dash-chart" class="chart-box"></div>
        </div>

        <div class="panel">
          <div class="panel-title"><h3>Recommended Practice</h3></div>
          ${weakKeys.length ? `
            <div class="reco-box">
              <p>You frequently miss ${weakKeys.map(k=>`<b>${k.key.toUpperCase()}</b>`).join(", ")}. Try a focused 5-minute drill to sharpen accuracy.</p>
              <div class="keys">${weakKeys.map(k=>`<span class="key-chip">${k.key.toUpperCase()}</span>`).join("")}</div>
              <button class="btn btn-primary btn-sm mt-16" data-action="practice-weak-keys">Start Weak Key Drill</button>
            </div>` : `
            <div class="reco-box"><p>Complete a few more tests and WolfType will start recommending targeted drills based on your weak keys.</p></div>
          `}
        </div>
      </div>

      <div class="side-panel">
        <div class="panel">
          <div class="panel-title"><h3>Personal Best</h3></div>
          <div class="flex flex-col gap-12">
            ${pbRow("Best WPM", st.bestWpm)}
            ${pbRow("Best Accuracy", st.bestAccuracy+"%")}
            ${pbRow("Best Consistency", st.bestConsistency)}
            ${pbRow("Longest Test", st.longestTestWords+" words")}
          </div>
        </div>

        <div class="panel">
          <div class="panel-title"><h3>Continue Learning</h3></div>
          <div class="lesson-card">
            ${lessonRing(lessonPct)}
            <div class="lesson-info">
              <div class="t">Lesson ${String(lesson.id).padStart(2,"0")} — ${lesson.title}</div>
              <div class="s">${lesson.sub}</div>
            </div>
          </div>
          <button class="btn btn-outline btn-sm mt-16" style="width:100%" data-nav="/academy">Continue Lesson</button>
        </div>

        <div class="panel">
          <div class="panel-title"><h3>Daily Goal</h3></div>
          <div class="flex justify-between"><span class="muted" style="font-size:0.85rem">${st.dailyGoalProgress.toFixed(1)} / ${s.goals.dailyMinutes} min</span><span class="dim" style="font-size:0.8rem">${goalPct}%</span></div>
          <div class="goal-bar-track"><div class="goal-bar-fill" style="width:${goalPct}%"></div></div>
        </div>

        <div class="panel">
          <div class="panel-title"><h3>Today's Challenge</h3></div>
          ${dailyChallengeCard()}
        </div>
      </div>
    </div>
  </div>`;
}
function pbRow(label, val){
  return `<div class="flex justify-between items-center"><span class="muted" style="font-size:0.85rem">${label}</span><span style="font-family:var(--font-mono);font-weight:700">${val}</span></div>`;
}
function lessonRing(pct){
  const r=22, c=2*Math.PI*r, off=c-(pct/100)*c;
  return `<div class="lesson-ring"><svg width="52" height="52"><circle class="bg" cx="26" cy="26" r="${r}" fill="none" stroke-width="4"/><circle class="fg" cx="26" cy="26" r="${r}" fill="none" stroke-width="4" stroke-dasharray="${c}" stroke-dashoffset="${off}"/></svg><div class="pct">${pct}%</div></div>`;
}
function wtGreeting(){
  const h = new Date().getHours();
  if(h<5) return "Burning the midnight oil";
  if(h<12) return "Good morning";
  if(h<18) return "Good afternoon";
  return "Good evening";
}
function wtTopWeakKeys(st,n){
  const arr = Object.entries(st.keyStats).map(([key,v])=>{
    const total = v.correct+v.incorrect;
    const acc = total>0 ? (v.correct/total)*100 : 100;
    return {key, acc, total};
  }).filter(k=>k.total>=3 && k.acc<95);
  arr.sort((a,b)=>a.acc-b.acc);
  return arr.slice(0,n);
}
function wtDailyChallengePassage(){
  const dayIdx = Math.floor(Date.now()/86400000) % WT_PASSAGES.length;
  return WT_PASSAGES[dayIdx];
}
function dailyChallengeCard(){
  const p = wtDailyChallengePassage();
  return `
    <div class="reco-box" style="margin-top:0">
      <div class="flex justify-between items-center"><span class="diff-badge diff-${p.difficulty.toLowerCase()}">${p.difficulty}</span><span class="dim" style="font-size:0.75rem">+250 XP</span></div>
      <p style="margin-top:10px;font-weight:700;color:var(--text-0)">${escapeHtml(p.title)}</p>
      <p style="margin-top:4px;font-size:0.78rem">Goal: 80 WPM · Min accuracy 95%</p>
      <button class="btn btn-primary btn-sm mt-16" style="width:100%" data-action="start-passage" data-passage-id="${p.id}">Accept Challenge</button>
    </div>`;
}

/* ===================== TYPING TEST ===================== */
function viewTest(){
  return `
  <div class="page test-shell fade-in" id="test-page">
    <div class="mode-bar" id="mode-bar">
      <div class="mode-group" id="mode-group-mode">
        <button class="mode-btn" data-mode="time">time</button>
        <button class="mode-btn" data-mode="words">words</button>
        <button class="mode-btn" data-mode="quote">quote</button>
        <button class="mode-btn" data-mode="zen">zen</button>
        <button class="mode-btn" data-mode="accuracy">accuracy</button>
      </div>
      <div class="mode-group" id="mode-group-value"></div>
      <div class="mode-group">
        <button class="mode-btn" data-action="toggle-punct">punctuation</button>
        <button class="mode-btn" data-action="toggle-numbers">numbers</button>
      </div>
      <div class="mode-group">
        <button class="mode-btn" data-nav="/history">${svgIcon("scroll")} pick passage</button>
      </div>
    </div>

    <div class="test-stats-bar" id="test-stats-bar">
      <div class="tsb-item live"><div class="v" id="live-time">30</div><div class="l">time</div></div>
      <div class="tsb-item live"><div class="v" id="live-wpm">0</div><div class="l">wpm</div></div>
      <div class="tsb-item live"><div class="v" id="live-acc">100%</div><div class="l">accuracy</div></div>
      <div class="tsb-item"><div class="v" id="live-errors">0</div><div class="l">errors</div></div>
    </div>
    <span id="live-text-badge" class="live-badge hidden">
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/><path d="M3 12h18M12 3c2.5 2.7 4 6 4 9s-1.5 6.3-4 9c-2.5-2.7-4-6-4-9s1.5-6.3 4-9Z" stroke="currentColor" stroke-width="1.6"/></svg>
      streaming live text from Wikipedia
    </span>

    <div class="type-area-wrap">
      <div class="passage-meta" id="passage-meta"></div>
      <div class="type-area" id="type-area" tabindex="0"></div>
      <div class="focus-lost hidden" id="focus-lost"><strong>Paused</strong><span class="dim">Click or press any key to resume</span></div>
    </div>

    <div class="type-hint">
      <kbd>tab</kbd> + <kbd>enter</kbd> restart test · <kbd>esc</kbd> command palette
    </div>

    <div id="vk-container"></div>
  </div>`;
}

function renderVirtualKeyboard(){
  const rows = [
    ["1","2","3","4","5","6","7","8","9","0"],
    ["q","w","e","r","t","y","u","i","o","p"],
    ["a","s","d","f","g","h","j","k","l",";"],
    ["z","x","c","v","b","n","m",",","."],
  ];
  let html = `<div class="vk">`;
  rows.forEach(row=>{
    html += `<div class="vk-row">${row.map(k=>`<div class="vk-key" data-key="${k}">${k}</div>`).join("")}</div>`;
  });
  html += `<div class="vk-row"><div class="vk-key space" data-key=" "></div></div></div>`;
  return html;
}

/* ===================== RESULTS ===================== */
function viewResults(result, meta){
  const s = WolfStore.get();
  const isBest = meta.wasBest;
  return `
  <div class="page page-narrow fade-in">
    <div class="results-hero">
      ${isBest ? `<div class="pb-badge">✨ New Personal Best</div>` : ""}
      <div class="results-wpm">${Math.round(result.wpm)}<span class="unit">wpm</span></div>
      <div class="results-acc">${result.accuracy.toFixed(1)}% Accuracy</div>
      ${meta.prevBest!=null ? `<div class="results-compare">Previous best: ${meta.prevBest} WPM ${isBest?`<span class="plus">+${Math.round(result.wpm-meta.prevBest)} WPM</span>`:""}</div>` : ""}
    </div>

    <div class="results-grid">
      ${rstat("Raw WPM", Math.round(result.rawWpm))}
      ${rstat("Correct", result.correctChars)}
      ${rstat("Incorrect", result.incorrectChars)}
      ${rstat("Errors", result.errors)}
      ${rstat("Consistency", result.consistency)}
      ${rstat("Duration", fmtTime(result.duration))}
    </div>

    <div id="result-graph" class="chart-box" style="max-width:800px;margin:0 auto"></div>

    <div class="results-actions">
      <button class="btn btn-primary btn-lg" data-action="restart-test">Try Again</button>
      <button class="btn btn-outline" data-action="share-result">Share Result</button>
      <button class="btn btn-ghost" data-nav="/stats">View Stats</button>
    </div>

    ${meta.newAchievements && meta.newAchievements.length ? `
      <div class="panel mt-32" style="max-width:600px;margin:32px auto 0">
        <div class="panel-title"><h3>Achievement${meta.newAchievements.length>1?'s':''} Unlocked</h3></div>
        <div class="flex gap-16" style="flex-wrap:wrap">
          ${meta.newAchievements.map(a=>`<div class="achv" style="flex:1;min-width:120px"><div class="ai">${a.icon}</div><div class="an">${a.name}</div><div class="ad">${a.desc}</div></div>`).join("")}
        </div>
      </div>` : ""}

    <div class="share-card hidden" id="share-card">
      <div class="sc-brand">Wolf<span style="color:var(--accent)">Type</span></div>
      <div class="sc-wpm">${Math.round(result.wpm)} WPM</div>
      <div class="sc-acc">${result.accuracy.toFixed(1)}% Accuracy</div>
      ${meta.title ? `<div class="sc-title">"${escapeHtml(meta.title)}"</div>` : ""}
      ${isBest ? `<div class="sc-title" style="color:var(--success)">Personal Best</div>` : ""}
    </div>
  </div>`;
}
function rstat(label,val){ return `<div class="rstat"><div class="v">${val}</div><div class="k">${label}</div></div>`; }

/* ===================== PRACTICE ===================== */
function viewPractice(){
  const s = WolfStore.get();
  const weak = Object.entries(s.stats.keyStats).map(([key,v])=>{
    const total=v.correct+v.incorrect; const acc = total>0?(v.correct/total)*100:100;
    return {key,acc,total};
  }).filter(k=>k.total>=2).sort((a,b)=>a.acc-b.acc).slice(0,8);

  const modes = [
    {id:"weak", name:"Weak Keys", desc:"Drills built from your lowest-accuracy keys."},
    {id:"speed", name:"Speed Practice", desc:"Short bursts focused on raw typing speed."},
    {id:"accuracy", name:"Accuracy Practice", desc:"Slow down and eliminate errors entirely."},
    {id:"capitalization", name:"Capitalization", desc:"Shift-key heavy drills."},
    {id:"numbers", name:"Numbers", desc:"Digit sequences and numeric text."},
    {id:"punctuation", name:"Punctuation", desc:"Commas, periods, and symbols."},
    {id:"common", name:"Common Words", desc:"The most frequent English words."},
    {id:"historical", name:"Historical Vocabulary", desc:"Vocabulary drawn from real historical passages."},
  ];

  return `
  <div class="page fade-in">
    <div class="section-head" style="margin-bottom:36px">
      <span class="section-tag">Practice</span>
      <h2>Targeted Practice</h2>
      <p>WolfType builds drills around exactly what you need to improve.</p>
    </div>

    <div class="panel mt-24">
      <div class="panel-title"><h3>Your Weak Keys</h3></div>
      ${weak.length ? weak.map(k=>weakKeyRow(k)).join("") : `<p class="muted">Complete a few tests and your weak keys will appear here.</p>`}
    </div>

    <div class="card-grid grid-4 mt-32">
      ${modes.map(m=>`
        <div class="panel panel-tight" style="cursor:pointer" data-action="start-practice" data-practice-mode="${m.id}">
          <h4 style="color:var(--text-0);font-size:0.95rem;margin-bottom:6px">${m.name}</h4>
          <p class="dim" style="font-size:0.8rem;line-height:1.5">${m.desc}</p>
        </div>`).join("")}
    </div>

    <div class="panel mt-32">
      <div class="panel-title"><h3>Finger Training</h3></div>
      <p class="muted" style="margin-bottom:20px">Select a key to see the recommended finger and hand position.</p>
      <div class="flex items-center gap-16" style="flex-wrap:wrap">
        <div id="finger-display" style="min-width:180px">
          <div class="dim" style="font-size:0.8rem">Recommended Finger</div>
          <div id="finger-label" style="font-size:1.4rem;font-weight:700;color:var(--accent-2);font-family:var(--font-display)">Select a key</div>
        </div>
        <div id="finger-vk">${renderVirtualKeyboard()}</div>
      </div>
    </div>
  </div>`;
}
function weakKeyRow(k){
  const color = k.acc<80 ? "var(--error)" : k.acc<92 ? "var(--warning)" : "var(--success)";
  return `<div class="weak-key-row">
    <div class="wk-badge">${k.key.toUpperCase()}</div>
    <div class="wk-bar"><div class="wk-bar-fill" style="width:${k.acc}%;background:${color}"></div></div>
    <div class="wk-pct">${Math.round(k.acc)}%</div>
  </div>`;
}

/* ===================== ACADEMY ===================== */
function viewAcademy(){
  const s = WolfStore.get();
  const progress = s.stats.lessonProgress;
  const currentIdx = Object.keys(progress).length;

  return `
  <div class="page page-narrow fade-in">
    <div class="section-head" style="margin-bottom:44px">
      <span class="section-tag">WolfType Academy</span>
      <h2>Beginner to Expert Typing Path</h2>
      <p>15 structured levels — from finger placement to full historical passages.</p>
    </div>
    <div class="level-path">
      ${WT_LESSONS.map((l,i)=>{
        const done = progress[l.id] >= 100;
        const current = i === currentIdx && !done;
        const locked = i > currentIdx;
        const status = done?"done":current?"current":locked?"locked":"";
        return `
        <div class="level-node ${status}">
          <div class="level-badge">${done?"✓":String(l.id).padStart(2,"0")}</div>
          <div class="level-body" data-action="open-lesson" data-lesson-id="${l.id}">
            <div>
              <h4>${l.title}</h4>
              <p>${l.sub}</p>
            </div>
            <div class="dim" style="font-family:var(--font-mono);font-size:0.8rem">${progress[l.id]||0}%</div>
          </div>
        </div>`;
      }).join("")}
    </div>
  </div>`;
}

function viewLessonDetail(lesson){
  const s = WolfStore.get();
  const pct = s.stats.lessonProgress[lesson.id] || 0;
  return `
  <div class="page page-narrow fade-in">
    <button class="btn btn-ghost btn-sm" data-nav="/academy">← Back to Academy</button>
    <div class="section-head" style="margin:28px 0 32px;text-align:left">
      <span class="section-tag">Lesson ${String(lesson.id).padStart(2,"0")}</span>
      <h2>${lesson.title}</h2>
      <p>${lesson.sub}</p>
    </div>
    <div class="goal-bar-track"><div class="goal-bar-fill" style="width:${pct}%"></div></div>
    <div class="panel mt-24">
      ${lesson.type==="intro" ? `
        <h3 style="margin-bottom:14px">Before you begin</h3>
        <p class="muted" style="line-height:1.7">Sit with your back straight and both feet flat on the floor. Rest your wrists lightly above the keyboard rather than on the desk. Place your left fingers on A S D F and your right fingers on J K L ; — the small bumps on F and J help you find this position without looking down. Keep your eyes on the screen, not your hands.</p>
        <button class="btn btn-primary mt-24" data-action="start-lesson-drill" data-lesson-id="${lesson.id}" data-drill-idx="0">Start Drill</button>
      ` : lesson.type==="passage" ? `
        <h3 style="margin-bottom:14px">${lesson.passageDifficulty} Historical Passages</h3>
        <p class="muted" style="margin-bottom:20px">Choose a passage to complete this lesson level.</p>
        <div class="passage-grid">
          ${WT_PASSAGES.filter(p=>p.difficulty===lesson.passageDifficulty).slice(0,6).map(p=>passageCard(p,s)).join("")}
        </div>
      ` : `
        <h3 style="margin-bottom:14px">Drills</h3>
        <div class="flex flex-col gap-12">
          ${lesson.drills.map((d,i)=>`
            <div class="flex justify-between items-center" style="padding:14px 16px;background:var(--bg-3);border-radius:10px">
              <span style="font-family:var(--font-mono);color:var(--text-1);font-size:0.95rem">${escapeHtml(d)}</span>
              <button class="btn btn-primary btn-sm" data-action="start-lesson-drill" data-lesson-id="${lesson.id}" data-drill-idx="${i}">Practice</button>
            </div>`).join("")}
        </div>
      `}
    </div>
  </div>`;
}

/* ===================== HISTORY LIBRARY ===================== */
function viewHistory(filters={}){
  const eras = [...new Set(WT_PASSAGES.map(p=>p.era))];
  const diffs = ["Beginner","Intermediate","Advanced","Expert"];
  let list = WT_PASSAGES;
  if(filters.era) list = list.filter(p=>p.era===filters.era);
  if(filters.diff) list = list.filter(p=>p.difficulty===filters.diff);
  if(filters.q) list = list.filter(p=>p.title.toLowerCase().includes(filters.q.toLowerCase()));
  const s = WolfStore.get();

  return `
  <div class="page fade-in">
    <div class="section-head" style="margin-bottom:32px">
      <span class="section-tag">History Library</span>
      <h2>Type your way through history</h2>
      <p>${WT_PASSAGES.length}+ original passages spanning the Ancient World to the Space Race.</p>
    </div>

    <div class="filter-bar">
      <input class="search-input" id="history-search" placeholder="Search by title…" value="${escapeHtml(filters.q||"")}" />
      <select class="select-input" id="history-era-filter">
        <option value="">All Eras</option>
        ${eras.map(e=>`<option value="${e}" ${filters.era===e?"selected":""}>${e}</option>`).join("")}
      </select>
      <select class="select-input" id="history-diff-filter">
        <option value="">All Difficulties</option>
        ${diffs.map(d=>`<option value="${d}" ${filters.diff===d?"selected":""}>${d}</option>`).join("")}
      </select>
      <button class="btn btn-ghost btn-sm" data-nav="/history/timeline">📍 Timeline View</button>
    </div>

    <div class="passage-grid" id="passage-grid">
      ${list.length ? list.map(p=>passageCard(p,s)).join("") : emptyState("No passages found","Try a different search or filter.","")}
    </div>
  </div>`;
}
function passageCard(p, s){
  const done = s.stats.passagesCompleted.includes(p.id);
  const words = p.text.split(" ").length;
  const mins = Math.max(1, Math.round(words/40));
  return `
  <div class="passage-card" data-action="start-passage" data-passage-id="${p.id}">
    <div class="pc-top">
      <span class="pc-era">${p.category}</span>
      ${done ? `<span class="pc-done">✓</span>` : ""}
    </div>
    <h4>${escapeHtml(p.title)}</h4>
    <p class="pc-excerpt">${escapeHtml(p.text.slice(0,110))}…</p>
    <div class="pc-meta">
      <span class="diff-badge diff-${p.difficulty.toLowerCase()}">${p.difficulty}</span>
      <span>${words} words</span>
      <span>~${mins} min</span>
    </div>
  </div>`;
}

function viewTimeline(){
  return `
  <div class="page page-narrow fade-in">
    <div class="section-head" style="margin-bottom:20px">
      <span class="section-tag">Interactive Timeline</span>
      <h2>Explore history chronologically</h2>
      <p>Select any era to begin typing that passage immediately.</p>
    </div>
    <div class="timeline">
      ${WT_TIMELINE.map(t=>`
        <div class="tl-item" data-action="start-passage" data-passage-id="${t.passageId}">
          <div class="tl-year">${t.year}</div>
          <div class="tl-title">${t.title}</div>
          <div class="tl-desc">${escapeHtml(WT_PASSAGES.find(p=>p.id===t.passageId)?.text.slice(0,90))}…</div>
        </div>`).join("")}
    </div>
  </div>`;
}

/* ===================== STATISTICS ===================== */
function viewStats(range="30"){
  const s = WolfStore.get();
  const st = s.stats;
  const now = Date.now();
  const rangeMs = {"7":7,"30":30,"90":90,"180":180,"365":365,"all":100000}[range]*86400000;
  const filtered = st.history.filter(h=> (now - new Date(h.date).getTime()) <= rangeMs);
  const weak = Object.entries(st.keyStats).map(([key,v])=>{
    const total=v.correct+v.incorrect; return {key, acc: total>0?(v.correct/total)*100:100, total};
  }).filter(k=>k.total>0).sort((a,b)=>a.acc-b.acc);

  return `
  <div class="page fade-in">
    <div class="section-head" style="margin-bottom:8px;text-align:left;max-width:none">
      <span class="section-tag">Statistics</span>
      <h2>Your Typing Analytics</h2>
    </div>
    <div class="stat-filter-row mt-24">
      ${[["7","7 Days"],["30","30 Days"],["90","3 Months"],["180","6 Months"],["365","1 Year"],["all","All Time"]].map(([v,l])=>`
        <button class="filter-pill ${range===v?'active':''}" data-action="stats-range" data-range="${v}">${l}</button>`).join("")}
    </div>

    <div class="card-grid grid-4 mt-24">
      ${statCard("Tests", filtered.length)}
      ${statCard("Avg WPM", filtered.length ? Math.round(filtered.reduce((a,b)=>a+b.wpm,0)/filtered.length) : 0)}
      ${statCard("Avg Accuracy", (filtered.length ? (filtered.reduce((a,b)=>a+b.accuracy,0)/filtered.length).toFixed(1) : 0)+"%")}
      ${statCard("Best WPM", st.bestWpm)}
    </div>

    <div class="panel mt-24">
      <div class="panel-title"><h3>WPM Over Time</h3></div>
      <div class="chart-box" id="stats-wpm-chart"></div>
    </div>

    <div class="card-grid grid-2 mt-24">
      <div class="panel">
        <div class="panel-title"><h3>Weakest Keys</h3></div>
        ${weak.length ? weak.slice(0,8).map(weakKeyRow).join("") : `<p class="muted">No key data yet.</p>`}
      </div>
      <div class="panel">
        <div class="panel-title"><h3>Keyboard Heatmap</h3></div>
        <div class="heatmap-kb" id="heatmap-container">${renderVirtualKeyboard()}</div>
      </div>
    </div>

    <div class="panel mt-24">
      <div class="panel-title"><h3>Recent Tests</h3></div>
      <table class="lb-table">
        <thead><tr><th>When</th><th>Mode</th><th>WPM</th><th>Accuracy</th><th>Errors</th></tr></thead>
        <tbody>
          ${filtered.slice(-12).reverse().map(h=>`
            <tr><td class="dim">${timeAgo(h.date)}</td><td>${h.title||h.mode}</td><td class="lb-wpm">${h.wpm}</td><td>${h.accuracy}%</td><td>${h.errors}</td></tr>`).join("") || `<tr><td colspan="5" class="dim text-center">No tests in this range yet.</td></tr>`}
        </tbody>
      </table>
    </div>
  </div>`;
}
function statCard(label,val){ return `<div class="stat-box"><div class="v">${val}</div><div class="k">${label}</div></div>`; }

/* ===================== LEADERBOARD ===================== */
function viewLeaderboard(tab="global"){
  const s = WolfStore.get();
  const you = { rank: 47, user: s.user?.username || "Guest (you)", wpm: s.stats.bestWpm || 0, accuracy: s.stats.bestAccuracy || 0 };
  const fake = wtSyntheticLeaderboard();
  const tabs = [["global","Global"],["weekly","Weekly"],["daily","Daily"],["historical","Historical"],["accuracy","Accuracy"],["speed","Speed"]];
  return `
  <div class="page fade-in">
    <div class="section-head" style="margin-bottom:8px;text-align:left;max-width:none">
      <span class="section-tag">Leaderboard</span>
      <h2>Top Typists</h2>
    </div>
    <div class="tabs mt-24">
      ${tabs.map(([id,label])=>`<button class="tab-btn ${tab===id?'active':''}" data-action="lb-tab" data-tab="${id}">${label}</button>`).join("")}
    </div>
    <div class="panel">
      <table class="lb-table">
        <thead><tr><th>Rank</th><th>Typist</th><th>WPM</th><th>Accuracy</th><th>Score</th></tr></thead>
        <tbody>
          ${fake.map((r,i)=>`
            <tr><td class="lb-rank ${i===0?'top1':i===1?'top2':i===2?'top3':''}">#${i+1}</td>
            <td class="lb-user"><span class="avatar-dot">${r.user[0]}</span>${r.user}</td>
            <td class="lb-wpm">${r.wpm}</td><td>${r.accuracy}%</td><td>${r.score}</td></tr>`).join("")}
          <tr style="background:rgba(61,139,255,0.06)">
            <td class="lb-rank">#${you.rank}</td>
            <td class="lb-user"><span class="avatar-dot">${(you.user||"G")[0]}</span>${you.user}</td>
            <td class="lb-wpm">${you.wpm}</td><td>${you.accuracy}%</td><td>${Math.round(you.wpm*you.accuracy)}</td></tr>
        </tbody>
      </table>
    </div>
    <p class="dim mt-16" style="font-size:0.8rem">Leaderboard data shown is illustrative. Connect an account and sync stats to compete on the live global board.</p>
  </div>`;
}
function wtSyntheticLeaderboard(){
  const names = ["Ava Stone","Leo Marsh","Nadia K.","Theo Bright","Iris Vane","Milo Reyes","Sana Cole","Dorian Fox","Elin Cross","Kian Wolfe"];
  return names.map((n,i)=>({ user:n, wpm: 140 - i*7 - Math.floor(Math.random()*4), accuracy: (98-i*0.4).toFixed(1), score: Math.round((140-i*7)*98) }));
}

/* ===================== PROFILE ===================== */
function viewProfile(){
  const s = WolfStore.get();
  const st = s.stats;
  const li = wtLevelInfo(st.xp);
  return `
  <div class="page fade-in">
    <div class="profile-header">
      <div class="profile-avatar">${(s.user?.username||"G")[0].toUpperCase()}</div>
      <div>
        <div class="profile-name">${escapeHtml(s.user?.username || "Guest Typist")}</div>
        <div class="profile-rank">${li.current.name} · Level ${li.current.lvl}</div>
        <div class="xp-track">
          <div class="flex justify-between dim" style="font-size:0.76rem;margin-bottom:6px"><span>${fmtNum(st.xp)} XP</span><span>${li.next?fmtNum(li.next.xp)+' XP':'Max'}</span></div>
          <div class="goal-bar-track"><div class="goal-bar-fill" style="width:${li.pct}%"></div></div>
        </div>
      </div>
      <div style="margin-left:auto" class="flex gap-8">
        ${s.user ? `<button class="btn btn-ghost" data-action="logout">Log out</button>` : `<button class="btn btn-primary" data-nav="/login">Log in to save progress</button>`}
      </div>
    </div>

    <div class="card-grid grid-4 mt-32">
      ${statCard("Tests Completed", st.testsCompleted)}
      ${statCard("Average WPM", st.avgWpm)}
      ${statCard("Best WPM", st.bestWpm)}
      ${statCard("Best Accuracy", st.bestAccuracy+"%")}
    </div>

    <div class="panel mt-24">
      <div class="panel-title"><h3>Achievements</h3><span class="dim" style="font-size:0.8rem">${st.achievements.length}/${WT_ACHIEVEMENTS.length}</span></div>
      <div class="badge-grid">
        ${WT_ACHIEVEMENTS.map(a=>`
          <div class="achv ${st.achievements.includes(a.id)?'':'locked'}">
            <div class="ai">${a.icon}</div><div class="an">${a.name}</div><div class="ad">${a.desc}</div>
          </div>`).join("")}
      </div>
    </div>
  </div>`;
}

/* ===================== SETTINGS ===================== */
const WT_SETTINGS_SECTIONS = ["Account","Test Behavior","Appearance","Sound","Goals","Privacy"];
function viewSettings(section="Test Behavior"){
  const s = WolfStore.get();
  return `
  <div class="page fade-in">
    <div class="section-head" style="margin-bottom:8px;text-align:left;max-width:none"><span class="section-tag">Settings</span><h2>Preferences</h2></div>
    <div class="settings-layout mt-32">
      <div class="settings-nav">
        ${WT_SETTINGS_SECTIONS.map(sec=>`<button class="${sec===section?'active':''}" data-action="settings-section" data-section="${sec}">${sec}</button>`).join("")}
      </div>
      <div>
        ${settingsSectionBody(section, s)}
      </div>
    </div>
  </div>`;
}
function settingsSectionBody(section, s){
  if(section==="Account"){
    return `<div class="settings-section"><h3>Account</h3>
      ${s.user ? `
      ${settingRowText("Username", s.user.username)}
      ${settingRowText("Email", s.user.email||"—")}
      <div class="setting-row"><div><div class="sr-label">Delete Account</div><div class="sr-sub">Permanently remove your data from this browser.</div></div><button class="btn btn-danger btn-sm" data-action="delete-account">Delete</button></div>
      ` : `<p class="muted">You're browsing as a guest. <a data-nav="/register" style="color:var(--accent-2);font-weight:600">Create an account</a> to save progress across sessions.</p>`}
    </div>`;
  }
  if(section==="Test Behavior"){
    return `<div class="settings-section"><h3>Test Behavior</h3>
      ${toggleRow("Live WPM","Show WPM while typing","liveWpm",s.settings.liveWpm)}
      ${toggleRow("Live Graph","Show performance graph during test","liveGraph",s.settings.liveGraph)}
      ${toggleRow("Smooth Caret","Animate caret transitions","smoothCaret",s.settings.smoothCaret)}
      ${toggleRow("Keyboard Visible","Show virtual keyboard during tests","keyboardVisible",s.settings.keyboardVisible)}
      ${toggleRow("Blur Unfocused","Blur text when test loses focus","blurUnfocused",s.settings.blurUnfocused)}
      ${toggleRow("Animations","Enable micro-interactions","animations",s.settings.animations)}
    </div>`;
  }
  if(section==="Appearance"){
    return `<div class="settings-section"><h3>Theme</h3>
      <div class="theme-grid">
        ${WT_THEMES.map(t=>`
          <div class="theme-swatch ${s.settings.theme===t.id?'active':''}" data-action="set-theme" data-theme="${t.id}">
            <div class="sw-dots">${t.c.map(c=>`<span class="sw-dot" style="background:${c}"></span>`).join("")}</div>
            <div class="sw-name">${t.name}</div>
          </div>`).join("")}
      </div>
      <h3 class="mt-32">Font Size</h3>
      <div class="chip-row">
        ${["sm","md","lg"].map(sz=>`<button class="chip ${s.settings.fontSize===sz?'on':''}" data-action="set-fontsize" data-size="${sz}">${sz.toUpperCase()}</button>`).join("")}
      </div>
    </div>`;
  }
  if(section==="Sound"){
    return `<div class="settings-section"><h3>Sound</h3>
      ${toggleRow("Typing Sounds","Play a sound on each keystroke","soundEnabled",s.settings.soundEnabled)}
      <div class="setting-row"><div><div class="sr-label">Volume</div></div><input type="range" min="0" max="1" step="0.1" value="${s.settings.soundVolume}" id="sound-volume" /></div>
    </div>`;
  }
  if(section==="Goals"){
    return `<div class="settings-section"><h3>Goals</h3>
      <div class="setting-row"><div class="sr-label">Target WPM</div><input class="select-input" type="number" id="goal-wpm" value="${s.goals.targetWpm}" style="width:100px"/></div>
      <div class="setting-row"><div class="sr-label">Target Accuracy %</div><input class="select-input" type="number" id="goal-accuracy" value="${s.goals.targetAccuracy}" style="width:100px"/></div>
      <div class="setting-row"><div class="sr-label">Daily Practice (minutes)</div><input class="select-input" type="number" id="goal-minutes" value="${s.goals.dailyMinutes}" style="width:100px"/></div>
      <button class="btn btn-primary mt-16" data-action="save-goals">Save Goals</button>
    </div>`;
  }
  if(section==="Privacy"){
    return `<div class="settings-section"><h3>Privacy</h3>
      ${toggleRow("Hide from Leaderboards","Keep your results private","hideFromLeaderboard",false)}
      <p class="muted mt-16" style="font-size:0.85rem;line-height:1.6">WolfType stores your typing statistics locally in your browser. No keystroke content is ever transmitted or sold. Read our <a data-nav="/privacy" style="color:var(--accent-2)">Privacy Policy</a> for details.</p>
      <button class="btn btn-outline mt-16" data-action="export-data">Export My Data</button>
    </div>`;
  }
  return "";
}
function toggleRow(label,sub,key,val){
  return `<div class="setting-row"><div><div class="sr-label">${label}</div><div class="sr-sub">${sub}</div></div><div class="switch ${val?'on':''}" data-action="toggle-setting" data-key="${key}"></div></div>`;
}
function settingRowText(label,val){
  return `<div class="setting-row"><div class="sr-label">${label}</div><div class="dim">${escapeHtml(val)}</div></div>`;
}

/* ===================== AUTH ===================== */
function viewLogin(){
  return `
  <div class="page">
    <div class="auth-shell fade-in">
      <div class="auth-card">
        <h2>Welcome back</h2>
        <div class="sub">Log in to sync your progress, stats, and achievements.</div>
        <div class="field"><label>Username</label><input type="text" id="login-username" placeholder="wolf_typist" /></div>
        <div class="field"><label>Password</label><input type="password" id="login-password" placeholder="••••••••" /></div>
        <button class="btn btn-primary" style="width:100%;justify-content:center" data-action="do-login">Log In</button>
        <div class="auth-divider">or</div>
        <button class="btn btn-outline" style="width:100%;justify-content:center" data-action="do-google">Continue with Google</button>
        <div class="auth-switch">No account? <a data-nav="/register">Register</a> · <a data-nav="/forgot">Forgot password?</a></div>
      </div>
    </div>
  </div>`;
}
function viewRegister(){
  return `
  <div class="page">
    <div class="auth-shell fade-in">
      <div class="auth-card">
        <h2>Create your account</h2>
        <div class="sub">Free forever. Track progress, unlock achievements, and climb the leaderboard.</div>
        <div class="field"><label>Username</label><input type="text" id="reg-username" placeholder="wolf_typist" /></div>
        <div class="field"><label>Email</label><input type="email" id="reg-email" placeholder="you@example.com" /></div>
        <div class="field"><label>Password</label><input type="password" id="reg-password" placeholder="••••••••" /></div>
        <button class="btn btn-primary" style="width:100%;justify-content:center" data-action="do-register">Create Account</button>
        <div class="auth-divider">or</div>
        <button class="btn btn-outline" style="width:100%;justify-content:center" data-action="do-google">Continue with Google</button>
        <div class="auth-switch">Already have an account? <a data-nav="/login">Log in</a></div>
      </div>
    </div>
  </div>`;
}
function viewForgot(){
  return `
  <div class="page"><div class="auth-shell fade-in"><div class="auth-card">
    <h2>Reset password</h2>
    <div class="sub">Enter your email and we'll send reset instructions.</div>
    <div class="field"><label>Email</label><input type="email" id="forgot-email" placeholder="you@example.com" /></div>
    <button class="btn btn-primary" style="width:100%;justify-content:center" data-action="do-forgot">Send Reset Link</button>
    <div class="auth-switch"><a data-nav="/login">Back to login</a></div>
  </div></div></div>`;
}

/* ===================== STATIC PAGES ===================== */
function viewAbout(){
  return `<div class="page page-narrow fade-in">
    <span class="section-tag">About</span>
    <h2 class="mt-8">Type Faster. Type Smarter. Learn History.</h2>
    <p class="muted mt-24" style="line-height:1.8">WolfType was built on a simple idea: typing practice shouldn't be empty. Every long-form passage in WolfType is drawn from real history — from the Code of Hammurabi to the Apollo 11 landing — so every minute you spend building speed also builds knowledge. Our structured academy takes complete beginners from home-row basics to expert-level historical writing, while adaptive practice keeps identifying and fixing your specific weak points. WolfType is built for people who want to actually get better, not just watch a number go up.</p>
  </div>`;
}
function viewPrivacy(){
  return `<div class="page page-narrow fade-in"><span class="section-tag">Privacy</span><h2 class="mt-8">Privacy Policy</h2>
  <p class="muted mt-24" style="line-height:1.8">WolfType stores typing statistics, settings, and progress locally in your browser's storage. We do not sell personal data, and we only collect what is necessary to operate core features such as saved history, statistics, and achievements. If you create an account, we store your username and email for authentication purposes only. You may export or delete your data at any time from Settings → Privacy.</p></div>`;
}
function viewTerms(){
  return `<div class="page page-narrow fade-in"><span class="section-tag">Terms</span><h2 class="mt-8">Terms of Service</h2>
  <p class="muted mt-24" style="line-height:1.8">By using WolfType, you agree to use the platform for personal, non-commercial typing practice. Leaderboard results are subject to reasonable anti-cheat review, and accounts submitting implausible results may be flagged for manual review. Historical content is provided for educational purposes and is written to be historically responsible, though it should not be treated as a substitute for academic scholarship.</p></div>`;
}
function viewContact(){
  return `<div class="page page-narrow fade-in"><span class="section-tag">Contact</span><h2 class="mt-8">Get in touch</h2>
  <p class="muted mt-24">Questions, feedback, or bug reports are always welcome.</p>
  <div class="panel mt-24">
    <div class="field"><label>Message</label><textarea id="contact-msg" rows="5" style="width:100%;background:var(--bg-1);border:1px solid var(--line);border-radius:10px;padding:12px;color:var(--text-0)" placeholder="Tell us what's on your mind…"></textarea></div>
    <button class="btn btn-primary mt-16" data-action="send-contact">Send Message</button>
  </div></div>`;
}
function viewStatus(){
  return `<div class="page page-narrow fade-in"><span class="section-tag">Status</span><h2 class="mt-8">System Status</h2>
  <div class="panel mt-24 flex justify-between items-center"><span>Typing Engine</span><span style="color:var(--success)">● Operational</span></div>
  <div class="panel mt-16 flex justify-between items-center"><span>Local Storage Sync</span><span style="color:var(--success)">● Operational</span></div>
  <div class="panel mt-16 flex justify-between items-center"><span>Leaderboards (demo data)</span><span style="color:var(--success)">● Operational</span></div>
  </div>`;
}
function emptyState(title,desc,btnLabel,action){
  return `<div class="empty-state" style="grid-column:1/-1">
    <div class="es-icon"><svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M4 7h16M4 12h10M4 17h13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></div>
    <h3>${title}</h3><p>${desc}</p>
    ${btnLabel?`<button class="btn btn-primary" data-action="${action}">${btnLabel}</button>`:""}
  </div>`;
}
