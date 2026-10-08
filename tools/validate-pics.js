// node validate-pics.js file1.js [...]
const fs=require("fs"),vm=require("vm"),path=require("path");
const V=JSON.parse(fs.readFileSync(path.join(__dirname,"art-vocab.json"),"utf8"));
let errors=[],ids=new Set(),count=0;
const isStr=x=>typeof x==="string"&&x.trim().length>0;
const chk=(cond,msg)=>{if(!cond)errors.push(msg)};
for(const f of process.argv.slice(2)){
  const src=fs.readFileSync(f,"utf8");chk(!src.includes("`"),f+": backtick");
  const ctx={window:{}};vm.createContext(ctx);
  try{vm.runInContext(src,ctx)}catch(e){errors.push(f+": JS error "+e.message);continue}
  for(const s of ctx.window.PICSETS||[]){count++;const w=f+" "+(s.id||"?");
    chk(isStr(s.id)&&s.id.startsWith("ps-"),w+": id");chk(!ids.has(s.id),w+": duplicate id");ids.add(s.id);
    chk(["A","B","C"].includes(s.level),w+": level");chk(isStr(s.theme),w+": theme");
    chk(Array.isArray(s.panels)&&s.panels.length>=3&&s.panels.length<=4,w+": need 3-4 panels");
    for(const L of ["en","zh"]){const t=s[L]||{};chk(isStr(t.title)&&isStr(t.plot)&&Array.isArray(t.words)&&t.words.length>=6&&isStr(t.twist),w+": "+L+" title/plot/words/twist")}
    const people={};
    (s.panels||[]).forEach((p,i)=>{const pw=w+" panel"+(i+1);const sc=p.scene||{};
      chk(V.bg.includes(sc.bg),pw+": bad bg "+sc.bg);
      if(sc.time!==undefined)chk(V.time.includes(sc.time),pw+": bad time "+sc.time);
      if(sc.weather!==undefined)chk(V.weather.includes(sc.weather),pw+": bad weather "+sc.weather);
      const acts=sc.actors||[];chk(acts.length<=4,pw+": too many actors");
      acts.forEach((a,j)=>{const aw=pw+" actor"+j;
        chk(V.who.includes(a.who),aw+": who "+a.who);chk(typeof a.x==="number"&&a.x>=30&&a.x<=370,aw+": x");
        if(a.pose!==undefined)chk(V.pose.includes(a.pose),aw+": pose "+a.pose);
        if(a.face!==undefined)chk(V.face.includes(a.face),aw+": face "+a.face);
        if(a.hold!==undefined)chk(V.prop.includes(a.hold),aw+": hold "+a.hold);
        if(a.skin!==undefined)chk(V.skin.includes(a.skin),aw+": skin "+a.skin);
        if(a.hair!==undefined)chk(V.hair.includes(a.hair),aw+": hair "+a.hair);
        for(const c of ["top","bottom"])if(a[c]!==undefined)chk(V.color.includes(a[c]),aw+": "+c+" "+a[c]);
      });
      const xs=acts.map(a=>a.x).sort((a,b)=>a-b);for(let k=1;k<xs.length;k++)if(xs[k]-xs[k-1]<45)errors.push(pw+": actors too close (x "+xs[k-1]+","+xs[k]+")");
      const props=sc.props||[];chk(props.length<=6,pw+": too many props");
      props.forEach((q,j)=>{chk(V.prop.includes(q.k),pw+" prop"+j+": "+q.k);chk(typeof q.x==="number"&&q.x>=0&&q.x<=400,pw+" prop"+j+": x")});
      (sc.fx||[]).forEach((q,j)=>{chk(V.fx.includes(q.k),pw+" fx"+j+": "+q.k);if(q.prop!==undefined)chk(V.prop.includes(q.prop),pw+" fx"+j+" prop: "+q.prop)});
      for(const L of ["en","zh"]){const t=p[L]||{};chk(isStr(t.q)&&isStr(t.model),pw+": "+L+" q/model")}
    });
  }
}
console.log("sets:",count);
if(errors.length){console.log("ERRORS ("+errors.length+"):\n"+errors.slice(0,80).join("\n"));process.exit(1)}
console.log("OK");
