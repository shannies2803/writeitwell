const fs=require("fs"),vm=require("vm");
const files=fs.readdirSync(".").filter(f=>/^(en|zh)-.*\.js$/.test(f)&&!/^(en|zh)-.*spec/i.test(f));
const ctx={window:{CONTENT_PARTS:[],ESSAYS:[]}};vm.createContext(ctx);
for(const f of files.concat(fs.readdirSync(".").filter(f=>/^essays-.*\.js$/.test(f)))){try{vm.runInContext(fs.readFileSync(f,"utf8"),ctx)}catch(e){console.log("ERR",f,e.message)}}
const W=ctx.window;
// units
const units={};for(const p of W.CONTENT_PARTS){for(const u of p.units||[])units[u.id]={lang:p.lang,u,blocks:[...u.blocks]};}
for(const p of W.CONTENT_PARTS)for(const x of p.extends||[]){if(units[x.id])units[x.id].blocks.push(...x.blocks);else console.log("orphan extend",x.id)}
// collect strings per unit for read banks
function strs(o,out){if(typeof o==="string")out.push(o);else if(Array.isArray(o))o.forEach(v=>strs(v,out));else if(o&&typeof o==="object")for(const k in o)if(!["type","id","icon","art"].includes(k))strs(o[k],out);return out}
const rows=[];const all={en:new Map(),zh:new Map()};
for(const id in units){const {lang,u,blocks}=units[id];const bt={};blocks.forEach(b=>bt[b.type]=(bt[b.type]||0)+1);
 const s=strs(blocks.filter(b=>["wordbank","settings","idioms","chips","table","cards"].includes(b.type)),[]);
 s.forEach(t=>{const k=t.replace(/<[^>]+>/g,"").trim().toLowerCase();if(k.length<2)return;const m=all[lang];m.set(k,(m.get(k)||[]).concat(id))});
 rows.push([id,s.length,Object.entries(bt).map(([k,v])=>k+v).join(" ")]);}
rows.sort((a,b)=>a[0].localeCompare(b[0]));
console.log("UNITS",rows.length);rows.forEach(r=>console.log(r.join("\t")));
for(const l of ["en","zh"]){const d=[...all[l]].filter(([k,v])=>v.length>1&&new Set(v).size===1);console.log(l,"entries",all[l].size,"dup-within-unit",d.length,d.slice(0,15).map(x=>x[0]+"@"+x[1][0]).join(" ; "));
 const dx=[...all[l]].filter(([k,v])=>new Set(v).size>1);console.log(l,"cross-unit dup",dx.length);}
// en text checks
const am=/\b(color|favorite|neighbor|realize|apologize|organize|center|theater|mom|gotten|candy|cookie|elevator|apartment|vacation|recess|sidewalk|cellphone|traveled|behavior|gray)\b/i;
let amHits=[];for(const id in units){if(units[id].lang!=="en")continue;strs(units[id].blocks,[]).forEach(t=>{const m=t.match(am);if(m)amHits.push(m[0]+" @"+id)})}
console.log("US-spelling-ish hits",amHits.length,[...new Set(amHits)].slice(0,40).join(" | "));
// essays
const E=W.ESSAYS;console.log("ESSAYS",E.length);
const by={};E.forEach(e=>{const k=e.lang+" "+e.cat+" "+e.level;by[k]=(by[k]||0)+1});
const cats=[...new Set(E.map(e=>e.cat))];
for(const l of ["en","zh"]){console.log(l);cats.forEach(c=>{const lv=Object.keys(by).filter(k=>k.startsWith(l+" "+c+" "));console.log("  ",c,lv.map(k=>k.split(" ")[2]+":"+by[k]).join(" "))})}
const tt={};E.forEach(e=>{const k=e.lang+e.title.trim().toLowerCase();tt[k]=(tt[k]||[]).concat(e.id)});console.log("dup titles",Object.values(tt).filter(v=>v.length>1).map(v=>v.join("/")).join(" ; "));
// name frequency
const names={};E.filter(e=>e.lang==="en").forEach(e=>{(e.paras.join(" ").match(/\b[A-Z][a-z]+(?: [A-Z][a-z]+)?\b/g)||[]).forEach(n=>names[n]=(names[n]||0)+1)});
console.log("top capitalised",Object.entries(names).sort((a,b)=>b[1]-a[1]).slice(0,60).map(x=>x.join(":")).join(" "));
// openings
const op={};E.filter(e=>e.lang==="en").forEach(e=>{const w=e.paras[0].replace(/<[^>]+>/g,"").split(/\s+/).slice(0,2).join(" ");op[w]=(op[w]||0)+1});
console.log("en openings top",Object.entries(op).sort((a,b)=>b[1]-a[1]).slice(0,15).map(x=>x.join(":")).join(" | "));
const zop={};E.filter(e=>e.lang==="zh").forEach(e=>{const w=e.paras[0].replace(/<[^>]+>/g,"").slice(0,2);zop[w]=(zop[w]||0)+1});
console.log("zh openings top",Object.entries(zop).sort((a,b)=>b[1]-a[1]).slice(0,15).map(x=>x.join(":")).join(" | "));
// overused phrases in essays
const ph=["heart pounded","heart was pounding","butterflies","beamed","grinned from ear to ear","tears welled","lump in my throat","heart sank","cheeks burned","learnt a valuable lesson","I learnt","from that day on","a wave of","sigh of relief","bit my lip","心里像","小鹿","热锅上的蚂蚁","恍然大悟","依依不舍","心花怒放","七上八下","面红耳赤","从那以后","我终于明白"];
ph.forEach(p=>{const n=E.filter(e=>e.paras.join(" ").includes(p)).length;console.log("  phrase",p,n)});
// endings
const end={};E.filter(e=>e.lang==="en").forEach(e=>{const t=e.paras[e.paras.length-1].replace(/<[^>]+>/g,"");if(/learnt|learned|lesson/i.test(t))end.lesson=(end.lesson||0)+1});console.log("en endings with lesson/learnt",end.lesson);
