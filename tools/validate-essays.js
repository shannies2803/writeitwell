// node validate-essays.js file1.js [...]
const fs=require("fs"),vm=require("vm");
const CATS=["kindness","honesty","courage","friendship","family","perseverance","mistakes","school","outings","unexpected","animals","imagination","environment","hobbies","daily","performing","science","travel","festivals","responsibility"];
const LV={en:{"P1–P2":[45,215],"P3–P4":[170,400],"P5–P6":[390,580]},zh:{"低年级":[55,280],"中年级":[190,480],"高年级":[470,760]}};
const MARKS=["s","sh","f","d","c","fig","id"];
let errors=[],ids=new Set(),n=0,stats={};
for(const f of process.argv.slice(2)){
  const src=fs.readFileSync(f,"utf8");if(src.includes("`"))errors.push(f+": backtick");
  const ctx={window:{}};vm.createContext(ctx);
  try{vm.runInContext(src,ctx)}catch(e){errors.push(f+": JS error "+e.message);continue}
  for(const e of ctx.window.ESSAYS||[]){n++;const w=f+" "+(e.id||"?");
    if(!e.id||ids.has(e.id))errors.push(w+": missing/duplicate id");ids.add(e.id);
    if(!LV[e.lang])errors.push(w+": lang");
    if(!CATS.includes(e.cat))errors.push(w+": cat "+e.cat);
    if(!e.id||!e.id.startsWith(e.lang+"-"+e.cat+"-"))errors.push(w+": id should start with "+e.lang+"-"+e.cat+"-");
    if(!LV[e.lang]||!LV[e.lang][e.level])errors.push(w+": level "+e.level);
    if(typeof e.title!=="string"||!e.title.trim())errors.push(w+": title");
    if(!Array.isArray(e.paras)||e.paras.length<3)errors.push(w+": need 3+ paras");
    if(!Array.isArray(e.notes)||e.notes.length<3||e.notes.some(x=>!x.title||!x.text))errors.push(w+": need 3+ notes {title,text}");
    const all=(e.paras||[]).join("\n");
    const tags=all.match(/<\/?[a-zA-Z]+[^>]*>/g)||[];
    let open=0,marks=0;
    for(const t of tags){const nm=t.replace(/^<\/?/,"").split(/[\s>]/)[0].toLowerCase();
      if(!["mark","i"].includes(nm)){errors.push(w+": disallowed tag "+t);continue}
      if(nm==="mark"){if(t.startsWith("</"))open--;else{open++;marks++;const m=t.match(/class="([^"]*)"/);if(!m||!MARKS.includes(m[1]))errors.push(w+": bad mark "+t);else stats[m[1]]=(stats[m[1]]||0)+1}}
      if(open<0||open>1){errors.push(w+": unbalanced/nested mark");open=0}}
    if(open!==0)errors.push(w+": unclosed mark");
    if(marks<4)errors.push(w+": too few marks ("+marks+")");
    const plain=all.replace(/<[^>]+>/g,"");
    const len=e.lang==="zh"?(plain.match(/[一-鿿]/g)||[]).length:plain.split(/\s+/).filter(Boolean).length;
    const r=LV[e.lang]&&LV[e.lang][e.level];if(r&&(len<r[0]||len>r[1]))errors.push(w+": length "+len+" outside "+r.join("-"));
    if(/[\u{1F300}-\u{1FAFF}]/u.test(all))errors.push(w+": emoji");
    if(e.lang==="en"&&/^\s*(<[^>]+>)*\s*One day/i.test(e.paras[0]||""))errors.push(w+": starts with One day");
  }
}
console.log("essays:",n,"marks:",JSON.stringify(stats));
if(errors.length){console.log("ERRORS ("+errors.length+"):\n"+errors.slice(0,60).join("\n"));process.exit(1)}
console.log("OK");
