// node validate-spell.js file1.js [...]
const fs=require("fs"),vm=require("vm");
const ctx={window:{}};vm.createContext(ctx);const errs=[];
for(const f of process.argv.slice(2)){const src=fs.readFileSync(f,"utf8");if(src.includes("`"))errs.push(f+": backtick");try{vm.runInContext(src,ctx)}catch(e){errs.push(f+": JS "+e.message)}}
const W=ctx.window;const LV=["A","B","C"];const isS=x=>typeof x==="string"&&x.trim().length>0;
const seen=new Set();
(W.SPELL_EN_WORDS||[]).forEach((x,i)=>{const k="en word "+i+" "+x.w;if(!isS(x.w))errs.push(k+": w");if(seen.has("en:"+x.w))errs.push(k+": duplicate");seen.add("en:"+x.w);
  if(!LV.includes(x.lv))errs.push(k+": lv");if(![1,2,3].includes(x.rank))errs.push(k+": rank");if(!isS(x.tag))errs.push(k+": tag");if(!isS(x.trick))errs.push(k+": trick");
  if(!isS(x.s))errs.push(k+": s");else{const n=x.s.toLowerCase().split(x.w.toLowerCase()).length-1;if(n!==1)errs.push(k+": sentence must contain the word exactly once (found "+n+")")}
  if(/[\u{1F300}-\u{1FAFF}]/u.test(JSON.stringify(x)))errs.push(k+": emoji")});
(W.SPELL_ZH_WORDS||[]).forEach((x,i)=>{const k="zh word "+i+" "+x.w;if(!isS(x.w)||!/^[一-鿿]{1,5}$/.test(x.w))errs.push(k+": w must be 1-5 Chinese chars");if(seen.has("zh:"+x.w))errs.push(k+": duplicate");seen.add("zh:"+x.w);
  if(!LV.includes(x.lv))errs.push(k+": lv");if(![1,2,3].includes(x.rank))errs.push(k+": rank");
  if(!isS(x.py)||x.py.split(/\s+/).length!==[...x.w].length)errs.push(k+": py syllable count");
  if(!isS(x.parts))errs.push(k+": parts");if(!isS(x.trick))errs.push(k+": trick");if(typeof x.confuse!=="string")errs.push(k+": confuse");
  if(!isS(x.s)||x.s.split(x.w).length-1<1)errs.push(k+": sentence must contain the word")});
(W.SPELL_EN_PATTERNS||[]).forEach((p,i)=>{const k="pattern "+i+" "+p.id;["id","title","explain","rule","tip"].forEach(f=>{if(!isS(p[f]))errs.push(k+": "+f)});if(!LV.includes(p.lv))errs.push(k+": lv");if(!Array.isArray(p.words)||p.words.length<8)errs.push(k+": need 8+ words");if(!Array.isArray(p.odd))errs.push(k+": odd must be array")});
(W.SPELL_EN_HOMO||[]).forEach((h,i)=>{const k="homo "+i+" "+(h.set||[]).join("/");if(!Array.isArray(h.set)||h.set.length<2)errs.push(k+": set");if(!Array.isArray(h.hints)||h.hints.length!==h.set.length)errs.push(k+": hints length");
  if(!Array.isArray(h.quiz)||h.quiz.length<4)errs.push(k+": quiz 4+");else h.quiz.forEach((q,j)=>{if((q.s.match(/___/g)||[]).length!==1)errs.push(k+" q"+j+": one ___");if(!h.set.some(w=>w.toLowerCase()===String(q.a).toLowerCase()))errs.push(k+" q"+j+": answer not in set")})});
(W.SPELL_ZH_GROUPS||[]).forEach((g,i)=>{const k="group "+i+" "+g.title;if(!isS(g.title)||!isS(g.note))errs.push(k+": title/note");if(!LV.includes(g.lv))errs.push(k+": lv");
  if(!Array.isArray(g.chars)||g.chars.length<3)errs.push(k+": chars 3+");else g.chars.forEach((c,j)=>{if(!isS(c.c)||!isS(c.py)||!isS(c.tip)||!Array.isArray(c.words)||!c.words.length)errs.push(k+" char"+j+": fields")});
  if(!Array.isArray(g.quiz)||g.quiz.length<4)errs.push(k+": quiz 4+");else g.quiz.forEach((q,j)=>{if((q.s.match(/（　）/g)||[]).length!==1)errs.push(k+" q"+j+": one （　）");if(!q.opts.includes(q.a))errs.push(k+" q"+j+": a not in opts")})});
console.log("en words",(W.SPELL_EN_WORDS||[]).length,"zh words",(W.SPELL_ZH_WORDS||[]).length,"patterns",(W.SPELL_EN_PATTERNS||[]).length,"homo",(W.SPELL_EN_HOMO||[]).length,"groups",(W.SPELL_ZH_GROUPS||[]).length);
if(errs.length){console.log("ERRORS ("+errs.length+"):\n"+errs.slice(0,60).join("\n"));process.exit(1)}console.log("OK");
