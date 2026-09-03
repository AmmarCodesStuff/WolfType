/* ==========================================================================
   WOLFTYPE — BEGINNER TYPING ACADEMY
   15 structured levels, home row -> expert historical passages
   ========================================================================== */

const WT_FINGER_MAP = {
  q:"L-pinky", a:"L-pinky", z:"L-pinky", "1":"L-pinky",
  w:"L-ring", s:"L-ring", x:"L-ring", "2":"L-ring",
  e:"L-middle", d:"L-middle", c:"L-middle", "3":"L-middle",
  r:"L-index", f:"L-index", v:"L-index", t:"L-index", g:"L-index", b:"L-index", "4":"L-index", "5":"L-index",
  y:"R-index", h:"R-index", n:"R-index", u:"R-index", j:"R-index", m:"R-index", "6":"R-index", "7":"R-index",
  i:"R-middle", k:"R-middle", "8":"R-middle",
  o:"R-ring", l:"R-ring", "9":"R-ring",
  p:"R-pinky", ";":"R-pinky", "0":"R-pinky", "'":"R-pinky", "[":"R-pinky", "]":"R-pinky",
  " ":"thumb", ",":"R-ring", ".":"R-ring", "/":"R-pinky"
};

const WT_LESSONS = [
  { id:0, title:"Introduction", sub:"Posture, hand position & home row orientation",
    drills:["asdf jkl; asdf jkl;","fj fj fj dk dk sl sl a;"], type:"intro" },
  { id:1, title:"Home Row Mastery", sub:"A S D F  ·  J K L ;",
    drills:["asdf jkl; asdf jkl;","ask fall lads jak flask salad","a dad fads a lass; ask sal"] },
  { id:2, title:"Top Row Foundations", sub:"Q W E R T  ·  Y U I O P",
    drills:["qwert yuiop qwert yuiop","were你 quiet tower type","try quote power write your"] },
  { id:3, title:"Bottom Row Foundations", sub:"Z X C V B  ·  N M",
    drills:["zxcvb nm zxcvb nm","zebra crown bunch mnemonic","cave banzai zoomin nice buzz"] },
  { id:4, title:"Full Alphabet Flow", sub:"Combine all letters smoothly",
    drills:["the quick brown fox jumps over the lazy dog","pack my box with five dozen liquor jugs"] },
  { id:5, title:"Common Words", sub:"High-frequency English words",
    drills:["the of and to in a is that for it as was with by","he this are or his from at which but have an"] },
  { id:6, title:"Capitalization", sub:"Shift key discipline",
    drills:["The Roman Empire Ruled Europe","Napoleon Crossed The Alps In Winter","Marie Curie Won Two Nobel Prizes"] },
  { id:7, title:"Numbers", sub:"0 1 2 3 4 5 6 7 8 9",
    drills:["1453 1969 1789 1215 1066","In 1776 and again in 1861 and 1945"] },
  { id:8, title:"Symbols & Punctuation", sub:"! @ # $ % ^ & * ( ) and more",
    drills:["Hello, world! Are you ready? Let's go.","Cost: $45.99 (20% off) — email us @ team!"] },
  { id:9, title:"Sentences", sub:"Short structured sentences",
    drills:["History teaches us where we came from.","Every empire eventually meets its end.","Trade routes connected distant civilizations."] },
  { id:10, title:"Short Paragraphs", sub:"Multi-sentence flow",
    drills:["Ancient Rome began as a small city on the Tiber River. Over centuries, it grew into a vast empire spanning three continents."] },
  { id:11, title:"Beginner Historical Passages", sub:"Real history, gentle pacing", type:"passage", passageDifficulty:"Beginner" },
  { id:12, title:"Intermediate Passages", sub:"Longer historical narratives", type:"passage", passageDifficulty:"Intermediate" },
  { id:13, title:"Advanced Passages", sub:"Complex historical writing", type:"passage", passageDifficulty:"Advanced" },
  { id:14, title:"Expert Passages", sub:"Full complexity: punctuation, numbers, vocabulary", type:"passage", passageDifficulty:"Expert" },
];

const WT_ACHIEVEMENTS = [
  { id:"first_step", name:"First Step", desc:"Complete your first typing test", icon:"🐾", check:s=>s.testsCompleted>=1 },
  { id:"wpm30", name:"30 WPM", desc:"Reach 30 WPM", icon:"⚡", check:s=>s.bestWpm>=30 },
  { id:"wpm50", name:"50 WPM", desc:"Reach 50 WPM", icon:"⚡", check:s=>s.bestWpm>=50 },
  { id:"wpm75", name:"75 WPM", desc:"Reach 75 WPM", icon:"🔥", check:s=>s.bestWpm>=75 },
  { id:"wpm100", name:"100 WPM", desc:"Reach 100 WPM", icon:"🚀", check:s=>s.bestWpm>=100 },
  { id:"precision", name:"Precision", desc:"Achieve 99% accuracy", icon:"🎯", check:s=>s.bestAccuracy>=99 },
  { id:"perfect_run", name:"Perfect Run", desc:"Complete a test with zero errors", icon:"💎", check:s=>s.perfectRuns>=1 },
  { id:"scholar", name:"Scholar", desc:"Complete 10 historical passages", icon:"📜", check:s=>s.passagesCompleted>=10 },
  { id:"historian", name:"Historian", desc:"Complete 50 historical passages", icon:"🏛️", check:s=>s.passagesCompleted>=50 },
  { id:"marathon", name:"Marathon", desc:"Type for 30 total minutes", icon:"⏱️", check:s=>s.totalTypingSeconds>=1800 },
  { id:"consistent", name:"Consistent", desc:"Maintain a 7 day streak", icon:"🔗", check:s=>s.longestStreak>=7 },
  { id:"night_wolf", name:"Night Wolf", desc:"Complete a test between midnight and 4am", icon:"🌙", check:s=>s.nightTest===true },
  { id:"wolf_pack", name:"Wolf Pack", desc:"Complete 100 typing tests", icon:"🐺", check:s=>s.testsCompleted>=100 },
  { id:"level5", name:"Fast Typist", desc:"Reach Level 5", icon:"🏅", check:s=>s.level>=5 },
  { id:"alpha", name:"Alpha", desc:"Reach Level 10 — Alpha Wolf", icon:"👑", check:s=>s.level>=10 },
];

const WT_LEVELS = [
  {lvl:1,name:"Beginner",xp:0},{lvl:2,name:"Learner",xp:200},{lvl:3,name:"Typist",xp:500},
  {lvl:4,name:"Skilled",xp:1000},{lvl:5,name:"Fast",xp:1800},{lvl:6,name:"Expert",xp:2800},
  {lvl:7,name:"Master",xp:4200},{lvl:8,name:"Elite",xp:6000},{lvl:9,name:"Wolf",xp:8500},
  {lvl:10,name:"Alpha",xp:12000},
];
