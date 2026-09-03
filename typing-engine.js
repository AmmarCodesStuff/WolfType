/* ==========================================================================
   WOLFTYPE — TYPING ENGINE
   Real keystroke-driven WPM / accuracy / consistency calculation.
   No fabricated values — every number derives from actual input events.
   ========================================================================== */

class TypingEngine {
  constructor(opts){
    this.text = opts.text || "";
    this.mode = opts.mode || "words"; // 'time' | 'words' | 'quote' | 'passage' | 'zen'
    this.timeLimit = opts.timeLimit || null; // seconds, for time mode
    this.onTick = opts.onTick || (()=>{});
    this.onComplete = opts.onComplete || (()=>{});
    this.reset();
  }

  reset(){
    this.typed = [];           // array of {char, correct, expected, ts}
    this.cursor = 0;
    this.startedAt = null;
    this.endedAt = null;
    this.finished = false;
    this.errors = 0;
    this.extraChars = 0;
    this.missedChars = 0;
    this.keyErrors = {};
    this.keyCorrect = {};
    this.wpmSamples = [];      // {t: secondsElapsed, wpm}
    this._tickHandle = null;
    this._lastSampleCount = 0;
    this.rawKeystrokes = 0;
  }

  start(){
    if(this.startedAt) return;
    this.startedAt = performance.now();
    this._tickHandle = setInterval(()=>this._tick(), 500);
    if(this.mode === "time" && this.timeLimit){
      this._deadline = this.startedAt + this.timeLimit*1000;
    }
  }

  elapsedSeconds(){
    if(!this.startedAt) return 0;
    const end = this.endedAt || performance.now();
    return (end - this.startedAt)/1000;
  }

  _tick(){
    if(this.finished) return;
    const elapsed = this.elapsedSeconds();
    if(this.mode === "time" && this.timeLimit && elapsed >= this.timeLimit){
      this.complete();
      return;
    }
    const wpm = this._instantWpm(elapsed);
    this.wpmSamples.push({t: elapsed, wpm});
    this.onTick({
      elapsed,
      remaining: this.mode==="time" ? Math.max(0, this.timeLimit-elapsed) : null,
      wpm,
      accuracy: this.currentAccuracy(),
      errors: this.errors,
    });
  }

  _instantWpm(elapsed){
    if(elapsed <= 0) return 0;
    const correctChars = this.typed.filter(t=>t.correct).length;
    return Math.round((correctChars/5) / (elapsed/60));
  }

  currentAccuracy(){
    const total = this.typed.length;
    if(total === 0) return 100;
    const correct = this.typed.filter(t=>t.correct).length;
    return Math.round((correct/total)*1000)/10;
  }

  /** Handle a single character input (call on keydown/input) */
  typeChar(char){
    if(this.finished) return null;
    if(!this.startedAt) this.start();
    this.rawKeystrokes++;

    if(this.cursor >= this.text.length){
      // extra characters beyond passage end (word/zen mode overflow)
      this.typed.push({char, correct:false, expected:null, ts:performance.now(), extra:true});
      this.extraChars++;
      this.errors++;
      return {status:"extra"};
    }

    const expected = this.text[this.cursor];
    const correct = char === expected;
    this.typed.push({char, correct, expected, ts:performance.now()});
    if(!correct){
      this.errors++;
      const k = expected.toLowerCase();
      this.keyErrors[k] = (this.keyErrors[k]||0)+1;
    } else {
      const k = expected.toLowerCase();
      this.keyCorrect[k] = (this.keyCorrect[k]||0)+1;
    }
    this.cursor++;

    if((this.mode!=="time" && this.mode!=="zen") && this.cursor >= this.text.length){
      this.complete();
      return {status: correct ? "correct":"incorrect", done:true};
    }
    return {status: correct ? "correct":"incorrect"};
  }

  backspace(){
    if(this.finished || this.typed.length===0) return;
    const last = this.typed.pop();
    if(last.extra) this.extraChars = Math.max(0,this.extraChars-1);
    else if(!last.correct){
      this.errors = Math.max(0, this.errors-1);
    }
    if(!last.extra) this.cursor = Math.max(0, this.cursor-1);
  }

  complete(){
    if(this.finished) return;
    this.finished = true;
    this.endedAt = performance.now();
    if(this._tickHandle) clearInterval(this._tickHandle);
    const result = this.computeResult();
    this.onComplete(result);
    return result;
  }

  computeResult(){
    const durationSec = Math.max(0.5, this.elapsedSeconds());
    const correctChars = this.typed.filter(t=>t.correct && !t.extra).length;
    const incorrectChars = this.typed.filter(t=>!t.correct && !t.extra).length;
    const totalTypedChars = this.typed.length;
    const missed = Math.max(0, this.cursor - (correctChars+incorrectChars));

    const wpm = (correctChars/5) / (durationSec/60);
    const rawWpm = (totalTypedChars/5) / (durationSec/60);
    const accuracy = totalTypedChars>0 ? (correctChars/totalTypedChars)*100 : 100;

    // consistency: based on variance of wpm samples (coefficient of variation, inverted)
    let consistency = 100;
    if(this.wpmSamples.length > 2){
      const vals = this.wpmSamples.map(s=>s.wpm).filter(v=>v>=0);
      const mean = vals.reduce((a,b)=>a+b,0)/vals.length;
      const variance = vals.reduce((a,b)=>a+Math.pow(b-mean,2),0)/vals.length;
      const stddev = Math.sqrt(variance);
      const cv = mean>0 ? stddev/mean : 0;
      consistency = Math.max(0, Math.round(100 - cv*100));
    }

    return {
      wpm: Math.max(0,wpm),
      rawWpm: Math.max(0,rawWpm),
      accuracy: Math.max(0,Math.min(100,accuracy)),
      consistency,
      correctChars, incorrectChars, extraChars:this.extraChars, missedChars:missed,
      errors: this.errors,
      duration: durationSec,
      wordsTyped: Math.round(correctChars/5),
      keyErrors: this.keyErrors,
      keyCorrect: this.keyCorrect,
      wpmSamples: this.wpmSamples,
      mode: this.mode,
    };
  }

  progressPercent(){
    if(this.mode==="time" && this.timeLimit){ return Math.min(100,(this.elapsedSeconds()/this.timeLimit)*100); }
    if(this.text.length===0) return 0;
    return Math.min(100,(this.cursor/this.text.length)*100);
  }

  destroy(){ if(this._tickHandle) clearInterval(this._tickHandle); }
}

/* ---------- Word list generator for Time/Words modes ---------- */
function wtGenerateWords(count, opts={}){
  const pool = WT_COMMON_WORDS;
  const words = [];
  for(let i=0;i<count;i++){
    let w = pool[Math.floor(Math.random()*pool.length)];
    if(opts.capitalization && Math.random()<0.12) w = w[0].toUpperCase()+w.slice(1);
    if(opts.numbers && Math.random()<0.08) w = String(Math.floor(Math.random()*9999));
    if(opts.punctuation && Math.random()<0.12) w += [",",".","!","?"][Math.floor(Math.random()*4)];
    words.push(w);
  }
  return words.join(" ");
}
