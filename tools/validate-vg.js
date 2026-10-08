// node validate-vg.js file1.js [...]
const fs=require("fs"),vm=require("vm");const ctx={window:{}};vm.createContext(ctx);const errs=[];
for(const f of process.argv.slice(2)){const s=fs.readFileSync(f,"utf8");if(s.includes("`"))errs.push(f+": backtick");try{vm.runInContext(s,ctx)}catch(e){errs.push(f+": JS "+e.message)}}
const V=ctx.window.VG||[];const ids=new Set();const isS=x=>typeof x==="string"&&x.trim().length>0;const LV=["A","B","C"];let n=0,by={};
V.forEach((u,ui)=>{const k="topic "+ui+" "+u.id;if(!isS(u.id)||ids.has(u.id))errs.push(k+": id missing/duplicate");ids.add(u.id);
  if(!["en","zh"].includes(u.lang))errs.push(k+": lang");if(!["grammar","vocab"].includes(u.kind))errs.push(k+": kind");if(!u.id.startsWith(u.lang+"-"))errs.push(k+": id must start with lang-");
  ["group","title","intro"].forEach(f=>{if(!isS(u[f]))errs.push(k+": "+f)});if(!LV.includes(u.lv))errs.push(k+": lv");
  if(!Array.isArray(u.rules)||u.rules.length<2||u.rules.some(r=>!isS(r.h)||!isS(r.html)))errs.push(k+": rules (2+ with h/html)");
  if(u.kind==="vocab"&&(!Array.isArray(u.words)||u.words.length<12||u.words.some(w=>!isS(w.w)||!isS(w.m)||!isS(w.ex))))errs.push(k+": vocab needs 12+ words {w,m,ex}");
  if(!Array.isArray(u.mistakes)||u.mistakes.some(m=>!isS(m.wrong)||!isS(m.right)||!isS(m.why)))errs.push(k+": mistakes");
  if(!Array.isArray(u.items)||u.items.length<25)errs.push(k+": need 25+ items (has "+(u.items||[]).length+")");
  (u.items||[]).forEach((it,j)=>{const q=k+" item"+j;n++;by[it.t]=(by[it.t]||0)+1;if(!LV.includes(it.lv))errs.push(q+": lv");if(!isS(it.q))errs.push(q+": q");if(!isS(it.why))errs.push(q+": why");
    if(it.t==="mcq"){if(!Array.isArray(it.o)||it.o.length<3||it.o.length>4)errs.push(q+": o 3-4");else{if(new Set(it.o).size!==it.o.length)errs.push(q+": duplicate options");if(!(Number.isInteger(it.a)&&it.a>=0&&it.a<it.o.length))errs.push(q+": a index")}}
    else if(it.t==="fix"){if(!isS(it.err)||!it.q.includes(it.err))errs.push(q+": err must appear in q");if(!isS(it.a))errs.push(q+": a")}
    else if(it.t==="fill"){if((it.q.match(/___/g)||[]).length!==1)errs.push(q+": exactly one ___");if(!Array.isArray(it.a)||!it.a.length||it.a.some(x=>!isS(x)))errs.push(q+": a list")}
    else if(it.t==="trans"){if(!Array.isArray(it.a)||!it.a.length||it.a.some(x=>!isS(x)))errs.push(q+": a list")}
    else errs.push(q+": type "+it.t);
    if(/[\u{1F300}-\u{1FAFF}]/u.test(JSON.stringify(it)))errs.push(q+": emoji")})});
console.log("topics",V.length,"items",n,JSON.stringify(by));
if(errs.length){console.log("ERRORS ("+errs.length+"):\n"+errs.slice(0,60).join("\n"));process.exit(1)}console.log("OK");
