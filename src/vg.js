/* ===== Vocab & Grammar / 词语与语法 (runs inside the engine IIFE) ===== */
(function(){
const ALL=(window.VG||[]).filter(u=>u&&u.items&&u.items.length);const BY={};ALL.forEach(u=>BY[u.id]=u);
const zh=()=>lang==="zh";const L3=["A","B","C"];
const T={en:{title:"Vocab & Grammar",lead:"Learn a rule, see the common mistakes, then practise with instant explanations. Anything you get wrong goes into your Mistake bank and comes back until you've got it.",
  daily:"Daily 10",dailyLead:"A mixed workout: your mistake-bank questions first, then new ones from the topics you need most.",start:"Start",bank:"Mistake bank",bankLead:n=>n+" question"+(n===1?"":"s")+" to fix",bankEmpty:"Empty – brilliant!",
  grammar:"Grammar",vocab:"Vocabulary",all:"Show all levels",mine:"My level only",mastery:"mastered",learnTab:"Learn",practise:"Practise 10",practiseAll:"Practise all",print:"🖨 Worksheet",
  rules:"Rules",words:"Words to know",mistakes:"Common mistakes",back:"← All topics",check:"Check",next:"Next →",finish:"See my score",
  right:["Correct!","Yes – well done!","Spot on!","Brilliant!"],wrong:"Not quite.",answer:"Answer:",why:"Why:",
  fix1:"Which part is wrong? Tap it.",fix2:"Now type the correct word(s):",fill:"Type your answer",trans:"Write the new sentence",
  modelQ:"Compare with the model answer. Did you get it right?",yes:"✓ Yes, same idea",no:"✗ Not quite",model:"Model answer",
  score:(a,b)=>"You got "+a+" out of "+b+".",star:"★ Star earned!",again:"Practise again",toTopic:"Back to the topic",
  prog:"Progress",progLead:"How much of each topic you have mastered (answered correctly).",done:"questions answered",acc:"accuracy",
  sheet:"Worksheet",key:"Answer key",name:"Name: ________________   Date: __________",level:"Level",
  todayCard:n=>"Vocab & Grammar: Daily 10"+(n?" · "+n+" in your mistake bank":""),go:"Go →",search:"Search topics",hear:"▶"},
 zh:{title:"词语与语法",lead:"先学规则，看看常见错误，再做练习，每题都有讲解。做错的题会放进“错题本”，以后再出现，直到你真的会了。",
  daily:"每日 10 题",dailyLead:"综合练习：先做错题本里的题，再做你最需要练的新题。",start:"开始",bank:"错题本",bankLead:n=>"有 "+n+" 道题要再练",bankEmpty:"错题本是空的，太棒了！",
  grammar:"语法",vocab:"词语",all:"显示所有年级",mine:"只看我的年级",mastery:"已掌握",learnTab:"学一学",practise:"练习 10 题",practiseAll:"全部练习",print:"🖨 练习纸",
  rules:"规则",words:"要认识的词语",mistakes:"常见错误",back:"← 所有题目",check:"检查",next:"下一题 →",finish:"看成绩",
  right:["答对了！","真棒！","完全正确！","太好了！"],wrong:"再想想。",answer:"答案：",why:"讲解：",
  fix1:"哪个部分错了？点一点。",fix2:"把它改正，写出正确的字词：",fill:"写出答案",trans:"写出新的句子",
  modelQ:"和参考答案比一比，你写对了吗？",yes:"✓ 对了，意思一样",no:"✗ 还不对",model:"参考答案",
  score:(a,b)=>"答对 "+a+" / "+b+" 题。",star:"★ 得到一颗星！",again:"再练一次",toTopic:"回到这个题目",
  prog:"进步记录",progLead:"每个题目掌握了多少（答对的题目）。",done:"已做题数",acc:"正确率",
  sheet:"练习纸",key:"答案",name:"姓名：____________   日期：__________",level:"年级",
  todayCard:n=>"词语与语法：每日 10 题"+(n?" · 错题本 "+n+" 题":""),go:"去练习 →",search:"搜索题目",hear:"▶"}};
const t=()=>T[lang];
const st=document.createElement("style");st.textContent=`
.vg-grid{display:grid;gap:10px;grid-template-columns:repeat(auto-fill,minmax(230px,1fr))}
.vg-topic{background:var(--card);border:1.5px solid var(--rule);border-radius:14px;padding:12px;text-align:left;font:inherit;color:inherit;cursor:pointer;display:grid;gap:6px}
.vg-topic:hover{border-color:var(--blue)}.vg-topic b{font-size:1.05rem}
.vg-bar{height:7px;border-radius:7px;background:var(--rule);overflow:hidden}.vg-bar i{display:block;height:100%;background:var(--good)}
.vg-lv{font-size:.75rem;font-weight:700;border-radius:999px;padding:1px 8px;background:hsl(var(--h) 80% 90%);color:hsl(var(--h) 60% 28%);justify-self:start}
.vg-q{font-size:1.25rem;line-height:1.6;margin:6px 0 10px}.vg-q .blank{display:inline-block;min-width:4em;border-bottom:3px solid var(--blue);margin:0 3px}
.vg-opts{display:grid;gap:8px}.vg-opts button{font:inherit;font-size:1.1rem;text-align:left;padding:12px 14px;border-radius:12px;border:2px solid var(--rule);background:var(--card);color:var(--ink);cursor:pointer;min-height:48px}
.vg-opts button.ok{background:var(--good);border-color:var(--good);color:#fff}.vg-opts button.no{background:var(--bad);border-color:var(--bad);color:#fff}
.vg-toks{display:flex;flex-wrap:wrap;gap:6px;margin:8px 0}.vg-toks button{font:inherit;font-size:1.15rem;padding:6px 10px;border-radius:10px;border:2px solid var(--rule);background:var(--card);color:var(--ink);cursor:pointer;min-height:44px}
.vg-toks button.ok{background:var(--good);color:#fff;border-color:var(--good)}.vg-toks button.no{background:var(--bad);color:#fff;border-color:var(--bad)}
.vg-in{width:100%;box-sizing:border-box;font:inherit;font-size:1.2rem;padding:10px 12px;border:2px solid var(--blue);border-radius:12px;background:var(--card);color:var(--ink)}
.vg-why{border-left:5px solid var(--pencil);padding:8px 12px;background:color-mix(in srgb,var(--pencil) 14%,var(--card));border-radius:0 10px 10px 0;margin-top:10px}
.vg-rule{background:var(--card);border:1px solid var(--rule);border-radius:12px;padding:12px}
.vg-mis div{margin:4px 0}.vg-mis .w{color:var(--bad);text-decoration:line-through}.vg-mis .r{color:var(--good);font-weight:700}
.vg-words{display:grid;gap:6px}.vg-words div{border-bottom:1px dashed var(--rule);padding:6px 0}
.vg-head{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
.vg-sheet ol li{margin:10px 0;break-inside:avoid}.vg-sheet .opts{display:flex;gap:18px;flex-wrap:wrap;margin-top:4px}
@media print{.vg-noprint{display:none!important}}
`;document.head.appendChild(st);

/* state */
const KEY=()=>"wiw2-vg-"+lang;
function S(){const s=lstore.get(KEY(),null)||{};s.it=s.it||{};s.days=s.days||{};return s}
function save(s){lstore.set(KEY(),s)}
function addDays(n){const d=new Date();d.setDate(d.getDate()+n);return dkey(d)}
const BINT=[1,3,7];
function rec(key,ok){const s=S();const r=s.it[key]||{c:0,w:0};r.last=ok?1:0;r.at=today();if(ok){r.c++;if(r.bank){r.st=(r.st||0)+1;if(r.st>=2){r.bank=0;r.st=0}else r.due=addDays(BINT[Math.min(r.st,2)])}}else{r.w++;r.bank=1;r.st=0;r.due=addDays(1)}
  s.it[key]=r;const d=s.days[today()]=s.days[today()]||{r:0,x:0};if(ok)d.r++;else d.x++;save(s)}
function bankKeys(s,dueOnly){return Object.keys(s.it).filter(k=>s.it[k].bank&&BY[k.split("#")[0]]&&(!dueOnly||!s.it[k].due||s.it[k].due<=today()))}
function topics(){return ALL.filter(u=>u.lang===lang)}
function lvi(){return {A:0,B:1,C:2}[stageOf()]||1}
function itemsFor(u,all){const li=lvi();return u.items.map((it,i)=>({u,it,i,key:u.id+"#"+i})).filter(x=>all||L3.indexOf(x.it.lv)<=li)}
function mastery(u,s){const xs=itemsFor(u,false);if(!xs.length)return 0;return xs.filter(x=>s.it[x.key]&&s.it[x.key].last===1).length/xs.length}
let showAll=false,view={name:"home"};

/* compare helpers */
function nEn(x){return String(x).toLowerCase().replace(/[’‘`]/g,"'").replace(/[“”]/g,'"').replace(/\s+/g," ").replace(/\s*([,.!?;:])\s*/g,"$1 ").replace(/[.!?]\s*$/,"").trim()}
function nZh(x){return String(x).replace(/\s+/g,"").replace(/[，。！？；：、“”‘’"'（）()…—\-,.!?;:]/g,"")}
const nm=x=>zh()?nZh(x):nEn(x);
function shuffle(a){return seededShuffle(a.slice(),()=>Math.random())}

/* page */
PAGES.vg={sec:"practice",icon:"quiz",title:{en:"Vocab & Grammar",zh:"词语与语法"},render(m){const host=el("div");m.appendChild(host);
  pageHead(host,lang+"-vg",zh()?"练习":"Practice",t().title,t().lead);const body=el("div");host.appendChild(body);
  const go=v=>{view=v;body.innerHTML="";(v.name==="topic"?topicView:v.name==="quiz"?quizView:v.name==="sheet"?sheetView:v.name==="exam"?examView:v.name==="sprint"?sprintView:homeView)(body,v);if(v.name!=="home")host.scrollIntoView({block:"start"})};
  body.go=go;const v0=view.pend?Object.assign({},view,{pend:false}):{name:"home"};go(v0)}};

function homeView(b){const s=S();const bank=bankKeys(s,false);const due=bankKeys(s,true);
  const top=el("div","vg-grid vg-noprint");
  const dc=el("div","sp-card",'<h3>⚡ '+t().daily+'</h3><p class="muted">'+t().dailyLead+'</p>');const db=el("button","btn",t().start);db.onclick=()=>b.go({name:"quiz",list:daily(),title:t().daily,daily:true});dc.appendChild(db);
  const bc=el("div","sp-card",'<h3>📒 '+t().bank+'</h3><p class="muted">'+(bank.length?t().bankLead(bank.length):t().bankEmpty)+'</p>');if(bank.length){const bb=el("button","btn ghost",t().start+" ("+Math.min(bank.length,15)+")");bb.onclick=()=>b.go({name:"quiz",list:shuffle(due.length?due:bank).slice(0,15).map(k=>{const [id,i]=k.split("#");return {u:BY[id],it:BY[id].items[+i],i:+i,key:k}}),title:t().bank});bc.appendChild(bb)}
  top.append(dc,bc);b.appendChild(top);setTimeout(()=>homeExtras(b),0);
  const tools=el("div","row vg-noprint",'<input class="lsearch vgq" placeholder="'+esc(t().search)+'" style="flex:1 1 200px"><button class="pill vgall" aria-pressed="'+showAll+'">'+t().all+'</button>');tools.style.cssText="gap:8px;margin:14px 0;flex-wrap:wrap";b.appendChild(tools);
  const list=el("div");b.appendChild(list);
  function draw(){const q=tools.querySelector(".vgq").value.trim().toLowerCase();list.innerHTML="";
    ["grammar","vocab"].forEach(kind=>{const ts=topics().filter(u=>u.kind===kind&&(showAll||L3.indexOf(u.lv)<=lvi())&&(!q||(u.title+" "+u.group+" "+(u.words||[]).map(w=>w.w).join(" ")).toLowerCase().includes(q)));if(!ts.length)return;
      list.appendChild(el("h3","",kind==="grammar"?"📐 "+t().grammar:"📚 "+t().vocab));const groups=[...new Set(ts.map(u=>u.group))];
      groups.forEach(g=>{list.appendChild(el("h4","muted",esc(g)));const grid=el("div","vg-grid");ts.filter(u=>u.group===g).sort((a,c)=>L3.indexOf(a.lv)-L3.indexOf(c.lv)).forEach(u=>{const mm=mastery(u,s);
        const bt=el("button","vg-topic",'<span class="vg-lv" style="--h:'+[140,210,30][L3.indexOf(u.lv)]+'">'+ELV[lang][L3.indexOf(u.lv)]+'</span><b>'+esc(u.title)+'</b><div class="vg-bar"><i style="width:'+Math.round(mm*100)+'%"></i></div><small class="muted">'+Math.round(mm*100)+'% '+t().mastery+' · '+itemsFor(u,showAll).length+'</small>');
        bt.onclick=()=>b.go({name:"topic",id:u.id});grid.appendChild(bt)});list.appendChild(grid)})})}
  tools.querySelector(".vgq").addEventListener("input",draw);tools.querySelector(".vgall").onclick=ev=>{showAll=!showAll;ev.target.setAttribute("aria-pressed",showAll);draw()};draw();
  /* progress summary */
  let r=0,x=0;Object.values(s.days).forEach(d=>{r+=d.r||0;x+=d.x||0});
  b.appendChild(el("div","sp-card",'<h3>'+t().prog+'</h3><div class="sp-stats"><div><b>'+(r+x)+'</b>'+t().done+'</div><div><b>'+(r+x?Math.round(r/(r+x)*100):0)+'%</b>'+t().acc+'</div><div><b>'+bank.length+'</b>'+t().bank+'</div></div>'))}

function daily(){const s=S();const due=shuffle(bankKeys(s,true)).slice(0,4).map(k=>{const [id,i]=k.split("#");return {u:BY[id],it:BY[id].items[+i],i:+i,key:k}});
  const ts=topics().filter(u=>L3.indexOf(u.lv)<=lvi()).sort((a,c)=>mastery(a,s)-mastery(c,s));const pickT=shuffle(ts.slice(0,Math.max(6,Math.ceil(ts.length/2)))).slice(0,6);
  const fresh=[];pickT.forEach(u=>{const xs=itemsFor(u,false).filter(x=>!s.it[x.key]);const ys=xs.length?xs:itemsFor(u,false).filter(x=>s.it[x.key].last!==1);shuffle(ys).slice(0,2).forEach(y=>fresh.push(y))});
  return due.concat(shuffle(fresh)).slice(0,10)}

function topicView(b,v){const u=BY[v.id];if(!u){b.go({name:"home"});return}lstore.set("wiw2-vg-last-"+lang,u.id);const s=S();const mm=mastery(u,s);
  const back=el("button","btn ghost small vg-noprint",t().back);back.onclick=()=>b.go({name:"home"});b.appendChild(back);
  b.appendChild(el("div","",'<div class="vg-head"><h2 style="margin:6px 0">'+esc(u.title)+'</h2><span class="vg-lv" style="--h:'+[140,210,30][L3.indexOf(u.lv)]+'">'+ELV[lang][L3.indexOf(u.lv)]+'</span></div><p>'+esc(u.intro)+'</p><div class="vg-bar"><i style="width:'+Math.round(mm*100)+'%"></i></div><small class="muted">'+Math.round(mm*100)+'% '+t().mastery+'</small>'));
  const act=el("div","row vg-noprint",'');act.style.cssText="gap:8px;margin:12px 0;flex-wrap:wrap";
  const p10=el("button","btn",t().practise);p10.onclick=()=>{const xs=itemsFor(u,showAll);const unseen=xs.filter(x=>!s.it[x.key]||s.it[x.key].last!==1);b.go({name:"quiz",list:shuffle(unseen.length>=10?unseen:xs).slice(0,10),title:u.title,topic:u.id})};
  const pa=el("button","btn ghost",t().practiseAll+" ("+itemsFor(u,showAll).length+")");pa.onclick=()=>b.go({name:"quiz",list:itemsFor(u,showAll),title:u.title,topic:u.id});
  const pw=el("button","btn ghost small",t().print);pw.onclick=()=>b.go({name:"sheet",id:u.id});act.append(p10,pa,pw);b.appendChild(act);
  b.appendChild(el("h3","",t().rules));const rg=el("div","vg-grid");rg.style.gridTemplateColumns="repeat(auto-fill,minmax(260px,1fr))";u.rules.forEach(r=>rg.appendChild(el("div","vg-rule",'<b>'+esc(r.h)+'</b><div style="margin-top:6px">'+r.html+'</div>')));b.appendChild(rg);
  if(u.words&&u.words.length){b.appendChild(el("h3","",t().words));const wl=el("div","vg-words",u.words.map((w,i)=>'<div><span class="chip">'+esc(w.w)+'</span> '+(canSpeak?'<button class="btn ghost small" data-s="'+i+'">'+t().hear+'</button> ':'')+'<span class="muted">'+esc(w.m)+'</span><br><i>'+esc(w.ex)+'</i></div>').join(""));
    wl.addEventListener("click",ev=>{const x=ev.target.closest("[data-s]");if(x){const w=u.words[+x.dataset.s];speak(w.w+(zh()?"。":". ")+w.ex)}});b.appendChild(wl);markChips()}
  if(u.mistakes&&u.mistakes.length){b.appendChild(el("h3","",t().mistakes));b.appendChild(el("div","vg-rule vg-mis",u.mistakes.map(x=>'<div><span class="w">✗ '+esc(x.wrong)+'</span><br><span class="r">✓ '+esc(x.right)+'</span><br><span class="muted">'+esc(x.why)+'</span></div>').join("<hr style='border:0;border-top:1px dashed var(--rule)'>")))}
  const p2=p10.cloneNode(true);p2.onclick=p10.onclick;const r2=el("div","row vg-noprint");r2.style.marginTop="14px";r2.appendChild(p2);b.appendChild(r2)}

function qHTML(q){return esc(q).replace("___",'<span class="blank"></span>')}
function quizView(b,v){const list=v.list||[];let k=0,ok=0;const wrongs=[];
  if(!list.length){b.go({name:"home"});return}
  function show(){b.innerHTML="";if(k>=list.length)return end();const x=list[k],it=x.it;
    const bar=el("div","sp-prog vg-noprint",'<i style="width:'+Math.round(k/list.length*100)+'%"></i>');b.appendChild(bar);
    const c=el("div","sp-card");c.appendChild(el("div","row",'<span class="tag">'+esc(v.title)+(v.daily?' · '+esc(x.u.title):'')+' · '+(k+1)+'/'+list.length+'</span>'));b.appendChild(c);
    const done=(good,ansText)=>{rec(x.key,good);if(good)ok++;else wrongs.push(x);
      c.appendChild(el("div","vg-why",'<b class="'+(good?"":"")+'">'+(good?t().right[Math.floor(Math.random()*t().right.length)]:t().wrong+' '+t().answer+' <span style="color:var(--good)">'+esc(ansText)+'</span>')+'</b><div>'+esc(it.why)+'</div>'));
      const n=el("button","btn",k+1<list.length?t().next:t().finish);n.style.marginTop="10px";n.onclick=()=>{k++;show()};c.appendChild(n);n.focus();n.scrollIntoView({block:"nearest"})};
    if(it.t==="mcq"){c.appendChild(el("div","vg-q",qHTML(it.q)));const box=el("div","vg-opts");const order=shuffle(it.o.map((o,i)=>i));
      order.forEach(i=>{const bt=el("button","",esc(it.o[i]));bt.onclick=()=>{if(box.dataset.done)return;box.dataset.done=1;const good=i===it.a;bt.classList.add(good?"ok":"no");if(!good)[...box.children][order.indexOf(it.a)].classList.add("ok");done(good,it.o[it.a])};box.appendChild(bt)});c.appendChild(box)}
    else if(it.t==="fix"){c.appendChild(el("p","muted",t().fix1));const toks=el("div","vg-toks");
      const i0=it.q.indexOf(it.err);const seg=s2=>{if(!zh())return s2.split(/\s+/).filter(Boolean);const out=[];let cur="";for(const ch of s2){cur+=ch;if(/[，。！？；：、]/.test(ch)||cur.length>=3){out.push(cur);cur=""}}if(cur)out.push(cur);return out};
      const before=seg(it.q.slice(0,i0));const parts=before.concat([it.err]).concat(seg(it.q.slice(i0+it.err.length)));const errIdx=before.length;
      parts.forEach((p,pi)=>{const bt=el("button","",esc(p));bt.dataset.i=pi;toks.appendChild(bt)});c.appendChild(toks);
      let firstOk=null;toks.addEventListener("click",ev=>{const bt=ev.target.closest("button");if(!bt||toks.dataset.done)return;toks.dataset.done=1;firstOk=+bt.dataset.i===errIdx;bt.classList.add(firstOk?"ok":"no");if(!firstOk)toks.children[errIdx].classList.add("ok");
        c.appendChild(el("p","",'<b>'+t().fix2+'</b> <span class="muted">('+esc(it.err)+' → ?)</span>'));const inp=document.createElement("input");inp.className="vg-in";["autocomplete","autocorrect","autocapitalize"].forEach(a=>inp.setAttribute(a,"off"));inp.setAttribute("spellcheck","false");c.appendChild(inp);inp.focus();
        const ck=el("button","btn",t().check);ck.style.marginTop="8px";c.appendChild(ck);const go=()=>{if(!inp.value.trim())return;ck.disabled=true;inp.disabled=true;const good=[].concat(it.a).some(x=>nm(inp.value)===nm(x));done(good&&firstOk,it.err+" → "+[].concat(it.a)[0])};ck.onclick=go;inp.addEventListener("keydown",ev2=>{if(ev2.key==="Enter"&&!ck.disabled)go()})})}
    else if(it.t==="fill"){c.appendChild(el("div","vg-q",qHTML(it.q)));const inp=document.createElement("input");inp.className="vg-in";inp.placeholder=t().fill;["autocomplete","autocorrect","autocapitalize"].forEach(a=>inp.setAttribute(a,"off"));inp.setAttribute("spellcheck","false");c.appendChild(inp);setTimeout(()=>inp.focus(),30);
      const ck=el("button","btn",t().check);ck.style.marginTop="8px";c.appendChild(ck);const go=()=>{if(!inp.value.trim())return;ck.disabled=true;inp.disabled=true;const good=it.a.some(a=>nm(a)===nm(inp.value));done(good,it.a[0])};ck.onclick=go;inp.addEventListener("keydown",ev=>{if(ev.key==="Enter"&&!ck.disabled)go()})}
    else{c.appendChild(el("div","vg-q",esc(it.q)));const ta=document.createElement("textarea");ta.className="vg-in";ta.rows=3;ta.placeholder=t().trans;["autocomplete","autocorrect","autocapitalize"].forEach(a=>ta.setAttribute(a,"off"));ta.setAttribute("spellcheck","false");c.appendChild(ta);
      const ck=el("button","btn",t().check);ck.style.marginTop="8px";c.appendChild(ck);ck.onclick=()=>{if(!ta.value.trim())return;ck.disabled=true;ta.disabled=true;if(it.a.some(a=>nm(a)===nm(ta.value))){done(true,it.a[0]);return}
        c.appendChild(el("div","vg-why",'<b>'+t().model+':</b><ul class="dots">'+it.a.map(a=>'<li>'+esc(a)+'</li>').join("")+'</ul><p>'+t().modelQ+'</p>'));const r=el("div","row");r.style.gap="8px";const y=el("button","btn",t().yes),n=el("button","btn ghost",t().no);r.append(y,n);c.appendChild(r);
        y.onclick=()=>{r.remove();done(true,it.a[0])};n.onclick=()=>{r.remove();done(false,it.a[0])}}}
  }
  function end(){const box=el("div","sp-card",'<h3>'+esc(v.title)+'</h3><p style="font-size:1.5rem"><b>'+t().score(ok,list.length)+'</b></p>');
    if(ok/list.length>=0.7){const sk=lang+"-game:vg:"+(v.daily?"daily":v.topic||"bank")+":"+today();if(!hasStar(sk)){giveStar(sk,box);box.appendChild(el("p","fb good",t().star));refreshNav()}}
    if(wrongs.length)box.appendChild(el("div","",'<p class="muted">'+t().bank+':</p><ul class="dots">'+wrongs.map(x=>'<li>'+esc(x.it.q)+'</li>').join("")+'</ul>'));
    const r=el("div","row");r.style.cssText="gap:8px;flex-wrap:wrap";const a=el("button","btn",t().again);a.onclick=()=>{k=0;ok=0;wrongs.length=0;list.sort(()=>Math.random()-.5);show()};r.appendChild(a);
    if(v.topic){const tp=el("button","btn ghost",t().toTopic);tp.onclick=()=>b.go({name:"topic",id:v.topic});r.appendChild(tp)}const h=el("button","btn ghost",t().back);h.onclick=()=>b.go({name:"home"});r.appendChild(h);box.appendChild(r);b.appendChild(box)}
  show()}

function sheetView(b,v){const u=BY[v.id];const xs=itemsFor(u,showAll).slice(0,30);
  const back=el("button","btn ghost small vg-noprint",t().toTopic);back.onclick=()=>b.go({name:"topic",id:u.id});const pr=el("button","btn small vg-noprint",t().print);pr.onclick=()=>window.print();
  const r=el("div","row vg-noprint");r.style.gap="8px";r.append(back,pr);b.appendChild(r);
  const lt2=i=>"ABCD"[i];
  b.appendChild(el("div","vg-sheet",'<h2>'+esc(u.title)+' – '+t().sheet+'</h2><p>'+t().name+'</p><ol>'+xs.map(x=>{const it=x.it;
    if(it.t==="mcq")return '<li>'+esc(it.q).replace("___","________")+'<div class="opts">'+it.o.map((o,i)=>'('+lt2(i)+') '+esc(o)).join("")+'</div></li>';
    if(it.t==="fix")return '<li>'+(zh()?"改正错误：":"Correct the mistake: ")+esc(it.q)+'<br>__________________</li>';
    if(it.t==="fill")return '<li>'+esc(it.q).replace("___","________")+'</li>';
    return '<li>'+esc(it.q)+'<br>______________________________________________<br>______________________________________________</li>'}).join("")+'</ol>'+
    '<h3 style="break-before:page">'+t().key+'</h3><ol style="columns:2">'+xs.map(x=>{const it=x.it;return '<li>'+(it.t==="mcq"?"("+lt2(it.a)+") "+esc(it.o[it.a]):it.t==="fix"?esc(it.err)+" → "+esc([].concat(it.a)[0]):esc(it.a[0]))+'</li>'}).join("")+'</ol>'))}

/* Today page card */
const _rt=renderToday;renderToday=function(){_rt.apply(this,arguments);try{const m=$("#main");if(m.querySelector(".vgToday"))return;const n=bankKeys(S(),true).length;
  const c=el("section","block vgToday",'<div class="sp-card" style="border-color:var(--good)"><b>📐 '+esc(t().todayCard(n))+'</b><div><button class="btn small">'+t().go+'</button></div></div>');
  c.querySelector("button").onclick=()=>{view={name:"home"};openUnit(lang+"-vg",true)};const anchor=m.querySelector(".spToday")||m.querySelector(".head");if(anchor)anchor.after(c);else m.prepend(c)}catch(e){}};
/* ---- round 14 additions: practice paper, sprint, weak spots, continue, keyboard ---- */
const T2={en:{paper:"Practice paper",paperLead:"20 mixed questions like a test. No help until you finish – then see every answer explained.",sprint:"60-second sprint",sprintLead:"How many can you get right in one minute?",best:"Best",
  cont:"Continue",weak:"Your weak spots",finishP:"Finish and mark",left:"left",q:"Question",of:"of",result:"Your result",yours:"Your answer",correct:"Correct answer",blank:"(blank)",go:"Go!",timeUp:"Time's up!",sprintScore:n=>n+" correct!",newBest:"New best! 🎉",byTopic:"By topic",prev:"← Back",skip:"Skip"},
 zh:{paper:"模拟卷",paperLead:"20 道综合题，像考试一样。做完之前没有提示，做完后每题都有讲解。",sprint:"60 秒挑战",sprintLead:"一分钟里你能答对几题？",best:"最好成绩",
  cont:"继续上次的题目",weak:"需要加强的地方",finishP:"交卷批改",left:"剩余",q:"第",of:"题，共",result:"成绩",yours:"你的答案",correct:"正确答案",blank:"（没有作答）",go:"开始！",timeUp:"时间到！",sprintScore:n=>"答对 "+n+" 题！",newBest:"新纪录！🎉",byTopic:"各题目成绩",prev:"← 上一题",skip:"跳过"}};
const t2=()=>T2[lang];
window.__vgOpen=id=>{view={name:"topic",id,pend:true};openUnit(lang+"-vg",true)};
function topicAcc(s){const tp={};Object.keys(s.it).forEach(k=>{const id=k.split("#")[0];if(!BY[id]||BY[id].lang!==lang)return;const r=s.it[k];tp[id]=tp[id]||{c:0,w:0};tp[id].c+=r.c||0;tp[id].w+=r.w||0});return tp}
function homeExtras(b){const s=S();const t=t2();const grid=b.querySelector(".vg-grid");
  const pc=el("div","sp-card",'<h3>📝 '+t.paper+'</h3><p class="muted">'+t.paperLead+'</p>');const pb=el("button","btn ghost",T[lang].start);pb.onclick=()=>b.go({name:"exam"});pc.appendChild(pb);
  const best=lstore.get("wiw2-vgsprint-"+lang,0);const sc=el("div","sp-card",'<h3>⏱ '+t.sprint+'</h3><p class="muted">'+t.sprintLead+(best?' '+t.best+': <b>'+best+'</b>':'')+'</p>');const sb=el("button","btn ghost",t.go);sb.onclick=()=>b.go({name:"sprint"});sc.appendChild(sb);
  if(grid){grid.append(pc,sc)}
  const last=lstore.get("wiw2-vg-last-"+lang,"");const tp=topicAcc(s);const weak=Object.keys(tp).filter(id=>tp[id].c+tp[id].w>=3&&tp[id].c/(tp[id].c+tp[id].w)<0.75).sort((a,c)=>tp[a].c/(tp[a].c+tp[a].w)-tp[c].c/(tp[c].c+tp[c].w)).slice(0,4);
  if((last&&BY[last])||weak.length){const box=el("div","sp-card vg-noprint");box.style.marginTop="10px";
    if(last&&BY[last]){const cb=el("button","btn small","▶ "+t.cont+": "+BY[last].title);cb.onclick=()=>b.go({name:"topic",id:last});box.appendChild(cb)}
    if(weak.length){box.appendChild(el("h4","",'🎯 '+t.weak));const r=el("div","row");r.style.cssText="gap:6px;flex-wrap:wrap";weak.forEach(id=>{const x=el("button","btn ghost small",esc(BY[id].title)+' · '+Math.round(tp[id].c/(tp[id].c+tp[id].w)*100)+'%');x.onclick=()=>b.go({name:"topic",id});r.appendChild(x)});box.appendChild(r)}
    if(grid)grid.after(box)}}
function pool(types){const li=lvi();const out=[];topics().filter(u=>L3.indexOf(u.lv)<=li).forEach(u=>itemsFor(u,false).forEach(x=>{if(types.includes(x.it.t))out.push(x)}));return out}
function examView(b){const t=t2(),T0=T[lang];const P=pool(["mcq","fill","fix"]);const g=shuffle(P.filter(x=>x.u.kind==="grammar")).slice(0,12),v=shuffle(P.filter(x=>x.u.kind==="vocab")).slice(0,8);const list=shuffle(g.concat(v));
  const ans=new Array(list.length).fill(null);let k=0;let secs=list.length*75;const head=el("div","row vg-noprint",'<span class="tag">📝 '+t.paper+'</span><span class="tag tm"></span>');head.style.cssText="justify-content:space-between;margin-bottom:8px";b.appendChild(head);
  const body=el("div");b.appendChild(body);const fmt=s=>Math.floor(s/60)+":"+String(s%60).padStart(2,"0");const iv=setInterval(()=>{if(!b.isConnected){clearInterval(iv);return}secs--;head.querySelector(".tm").textContent="⏱ "+fmt(Math.max(0,secs))+" "+t.left;if(secs<=0){clearInterval(iv);mark()}},1000);
  function show(){body.innerHTML="";const x=list[k],it=x.it;const c=el("div","sp-card");c.appendChild(el("span","tag",(lang==="zh"?t.q+(k+1)+t.of+list.length+"题":t.q+" "+(k+1)+" "+t.of+" "+list.length)+' · '+esc(x.u.title)));body.appendChild(c);
    if(it.t==="mcq"){c.appendChild(el("div","vg-q",qHTML(it.q)));const box=el("div","vg-opts");it.o.forEach((o,i)=>{const bt=el("button","",(["A","B","C","D"][i])+". "+esc(o));if(ans[k]===i){bt.style.borderColor="var(--blue)";bt.style.background="color-mix(in srgb,var(--blue) 14%,var(--card))"}bt.onclick=()=>{ans[k]=i;show()};box.appendChild(bt)});c.appendChild(box)}
    else{c.appendChild(el("div","vg-q",it.t==="fix"?(lang==="zh"?"改正句子里的一个错误，写出正确的字词：":"Find the ONE mistake and write the correct word(s):")+"<br>"+esc(it.q):qHTML(it.q)));const inp=document.createElement("input");inp.className="vg-in";["autocomplete","autocorrect","autocapitalize"].forEach(a=>inp.setAttribute(a,"off"));inp.setAttribute("spellcheck","false");inp.value=ans[k]||"";inp.oninput=()=>ans[k]=inp.value;c.appendChild(inp)}
    const nav=el("div","row");nav.style.cssText="gap:8px;margin-top:12px;flex-wrap:wrap";if(k>0){const p=el("button","btn ghost small",t.prev);p.onclick=()=>{k--;show()};nav.appendChild(p)}
    if(k<list.length-1){const n=el("button","btn",T0.next);n.onclick=()=>{k++;show()};nav.appendChild(n)}const f=el("button","btn "+(k===list.length-1?"":"ghost small"),t.finishP);f.onclick=()=>{clearInterval(iv);mark()};nav.appendChild(f);c.appendChild(nav);
    const dots=el("div","row vg-noprint",list.map((x,i)=>'<button class="pill" data-i="'+i+'" aria-pressed="'+(i===k)+'" style="min-width:36px'+(ans[i]!=null&&ans[i]!==""?";background:color-mix(in srgb,var(--good) 25%,var(--card))":"")+'">'+(i+1)+'</button>').join(""));dots.style.cssText="gap:4px;flex-wrap:wrap;margin-top:10px";dots.onclick=ev=>{const d=ev.target.closest("[data-i]");if(d){k=+d.dataset.i;show()}};body.appendChild(dots)}
  function isRight(x,a){const it=x.it;if(a==null||a==="")return false;if(it.t==="mcq")return a===it.a;if(it.t==="fill")return it.a.some(z=>nm(z)===nm(a));return [].concat(it.a).some(z=>nm(z)===nm(a))}
  function mark(){head.querySelector(".tm").textContent="";let ok=0;const byT={};list.forEach((x,i)=>{const r=isRight(x,ans[i]);if(r)ok++;rec(x.key,r);const k2=x.u.title;byT[k2]=byT[k2]||[0,0];byT[k2][1]++;if(r)byT[k2][0]++});
    body.innerHTML="";const c=el("div","sp-card",'<h3>'+t.result+'</h3><p style="font-size:2rem"><b>'+ok+' / '+list.length+'</b></p><h4>'+t.byTopic+'</h4><ul class="dots">'+Object.keys(byT).map(k2=>'<li>'+esc(k2)+': '+byT[k2][0]+'/'+byT[k2][1]+'</li>').join("")+'</ul>');
    if(ok/list.length>=0.7){const sk=lang+"-game:vg:paper:"+today();if(!hasStar(sk)){giveStar(sk,c);refreshNav()}}
    c.appendChild(el("div","",list.map((x,i)=>{const it=x.it;const r=isRight(x,ans[i]);const yours=ans[i]==null||ans[i]===""?t.blank:it.t==="mcq"?it.o[ans[i]]:ans[i];const right=it.t==="mcq"?it.o[it.a]:it.t==="fix"?it.err+" → "+[].concat(it.a)[0]:it.a[0];
      return '<div class="vg-why" style="border-left-color:'+(r?"var(--good)":"var(--bad)")+'"><b>'+(i+1)+'. '+(r?"✓":"✗")+'</b> '+esc(it.q)+'<br><span class="muted">'+t.yours+':</span> '+esc(yours)+(r?'':'<br><span class="muted">'+t.correct+':</span> <b style="color:var(--good)">'+esc(right)+'</b>')+'<div class="muted">'+esc(it.why)+'</div></div>'}).join("")));
    const bk=el("button","btn ghost",T0.back);bk.onclick=()=>b.go({name:"home"});c.appendChild(bk);body.appendChild(c);c.scrollIntoView({block:"start"})}
  show()}
function sprintView(b){const t=t2(),T0=T[lang];const P=shuffle(pool(["mcq"]));let k=0,ok=0,secs=60,over=false;
  const head=el("div","sp-card",'<div class="row" style="justify-content:space-between"><b>⏱ <span class="sc">60</span>s</b><b>✓ <span class="ok">0</span></b></div>');b.appendChild(head);const body=el("div");b.appendChild(body);
  const iv=setInterval(()=>{if(!b.isConnected){clearInterval(iv);return}secs--;head.querySelector(".sc").textContent=secs;if(secs<=0){clearInterval(iv);end()}},1000);
  function show(){if(over)return;body.innerHTML="";const x=P[k%P.length],it=x.it;const c=el("div","sp-card");c.appendChild(el("div","vg-q",qHTML(it.q)));const box=el("div","vg-opts");
    it.o.forEach((o,i)=>{const bt=el("button","",esc(o));bt.onclick=()=>{if(box.dataset.done||over)return;box.dataset.done=1;const good=i===it.a;bt.classList.add(good?"ok":"no");if(!good)box.children[it.a].classList.add("ok");if(good){ok++;head.querySelector(".ok").textContent=ok}rec(x.key,good);setTimeout(()=>{k++;show()},good?350:1100)};box.appendChild(bt)});c.appendChild(box);body.appendChild(c)}
  function end(){over=true;const best=lstore.get("wiw2-vgsprint-"+lang,0);const nb=ok>best;if(nb)lstore.set("wiw2-vgsprint-"+lang,ok);body.innerHTML="";const c=el("div","sp-card",'<h3>'+t.timeUp+'</h3><p style="font-size:2rem"><b>'+t.sprintScore(ok)+'</b></p>'+(nb?'<p class="fb good">'+t.newBest+'</p>':'<p class="muted">'+t.best+': '+best+'</p>'));
    if(ok>=10){const sk=lang+"-game:vg:sprint:"+today();if(!hasStar(sk)){giveStar(sk,c);refreshNav()}}const a=el("button","btn",T0.again);a.onclick=()=>b.go({name:"sprint"});const h=el("button","btn ghost",T0.back);h.onclick=()=>b.go({name:"home"});const r=el("div","row");r.style.gap="8px";r.append(a,h);c.appendChild(r);body.appendChild(c)}
  show()}
document.addEventListener("keydown",ev=>{if(!current||current.id!==lang+"-vg")return;const tag=(ev.target.tagName||"").toLowerCase();if(tag==="input"||tag==="textarea")return;
  const n="1234".indexOf(ev.key)>=0?+ev.key-1:"abcd".indexOf(ev.key.toLowerCase());const opts=document.querySelectorAll("#main .vg-opts:not([data-done]) button");if(n>=0&&opts[n]){opts[n].click();ev.preventDefault();return}
  if(ev.key==="Enter"){const nx=[...document.querySelectorAll("#main .sp-card .btn")].reverse().find(x=>/Next|See my score|下一题|看成绩/.test(x.textContent));if(nx){nx.click();ev.preventDefault()}}});

})();
