/* ===== round 11: features module (runs inside the engine IIFE) ===== */
(function(){
/* --- new essay categories --- */
["animals","imagination","environment","hobbies","daily","performing","science","travel","festivals","responsibility"].forEach(c=>{if(!ECATS.includes(c))ECATS.push(c)});
Object.assign(L10.en.cats,{animals:"Animals & pets",imagination:"Imagination & adventure",environment:"Environment & community",hobbies:"Sports & hobbies",daily:"Everyday life",performing:"Music & performing",science:"Science & discovery",travel:"Travel",festivals:"Festivals & celebrations",responsibility:"Responsibility"});
Object.assign(L10.zh.cats,{animals:"动物与宠物",imagination:"想象与冒险",environment:"环保与社区",hobbies:"运动与爱好",daily:"生活点滴",performing:"音乐与表演",science:"科学与发现",travel:"旅行见闻",festivals:"节日与庆祝",responsibility:"责任与担当"});
Object.keys(ESS).forEach(l=>ESS[l].sort((a,b)=>ECATS.indexOf(a.cat)-ECATS.indexOf(b.cat)||ELV[l].indexOf(a.level)-ELV[l].indexOf(b.level)||a.id.localeCompare(b.id)));
Object.keys(ESS).forEach(l=>{SEARCHTXT[l+"-essays"]=ESS[l].map(e=>e.title+" "+e.paras.join(" ")).join(" ").replace(/<[^>]+>/g," ").toLowerCase();SEARCHTXT[l+"-essayphrases"]=SEARCHTXT[l+"-essays"]});

const F={en:{find:"Find a word",findLead:"Type a word or a feeling, such as happy, rain, walked or brave. You will see matching words and phrases from every word bank and the essay library.",
  findPh:"Find a word or phrase…",found:n=>n+" matches",noMatch:"Nothing found. Try a shorter word.",open:"Open",fromEss:"From model essays",
  focus:"Focus mode",focusOf:(a,b)=>a+" of "+b,auto:"Auto-play",stop:"Stop",shuffle:"Shuffle",close:"Close",readAlong:"▶ Read along",stopReading:"■ Stop",
  fav:"♡ Favourite",faved:"♥ Favourite",favs:"My favourites",cont:"Continue reading",try5:"5 words to try today",try5Lead:"Use at least two of these in your next story.",
  write:"Write your own version",inspired:"Inspired by: ",inspiredIdeas:"Write your OWN story on the same theme. Don't copy. Borrow a few phrases you like:",
  savePhrase:"＋ Save to word book",saved:"Saved to your word book",
  portfolio:"My portfolio",portLead:"Save each composition here so you can see how your writing grows.",saveTo:"Save to portfolio",newComp:"Start a new composition",savedPort:"Saved to your portfolio",
  emptyPort:"Nothing saved yet. Write something and tap Save to portfolio.",openIt:"Open",del:"Delete",delSure:"Tap again to delete",readMine:"▶ Read my story aloud",
  helper:"Phrase helper",forTopic:"For this topic",myBook:"My word book",tryToday:"Try today",emptyBook:"Your word book is empty. Tap words in the banks to save them.",
  badges:"Badges",newBadge:b=>"New badge: "+b+"!",goals:"This week's goals",goalNames:{stars:"Earn 40 stars",essays:"Read 5 model essays",words:"Save 15 new words",games:"Play 3 word games"},
  review:"Review as flashcards",know:"I know it",notYet:"Not yet",reviewDone:"Review finished!",chart:"Stars in the last 7 days",noChart:"Activity shows here for learners on this device.",
  textSize:"Text size",pyLoadFail:"Pinyin needs an internet connection. Please try again later."},
 zh:{find:"找词语",findLead:"输入一个词语或心情，例如 高兴、下雨、跑、勇敢，就能找到所有词语宝库和范文库里相关的好词好句。",
  findPh:"找词语或句子……",found:n=>"找到 "+n+" 条",noMatch:"找不到，试试短一点的词。",open:"打开",fromEss:"出自范文",
  focus:"专注阅读",focusOf:(a,b)=>a+" / "+b,auto:"自动播放",stop:"停止",shuffle:"打乱",close:"关闭",readAlong:"▶ 跟读",stopReading:"■ 停止",
  fav:"♡ 收藏",faved:"♥ 已收藏",favs:"我的收藏",cont:"继续阅读",try5:"今天试用这 5 个词",try5Lead:"下一篇作文里至少用上两个。",
  write:"仿写一篇",inspired:"仿写：",inspiredIdeas:"写一篇同主题、属于你自己的故事，不要照抄。可以借用几个喜欢的好词好句：",
  savePhrase:"＋ 收藏到好词本",saved:"已收藏到好词本",
  portfolio:"我的作文集",portLead:"把每一篇作文保存下来，看看自己的进步。",saveTo:"保存到作文集",newComp:"开始写新作文",savedPort:"已保存到作文集",
  emptyPort:"还没有保存的作文。写好后按“保存到作文集”。",openIt:"打开",del:"删除",delSure:"再按一次删除",readMine:"▶ 朗读我的作文",
  helper:"好词助手",forTopic:"这个题目用得上",myBook:"我的好词本",tryToday:"今天试用",emptyBook:"好词本还是空的，在词语宝库里点一下词语就能收藏。",
  badges:"徽章",newBadge:b=>"获得新徽章：「"+b+"」！",goals:"本周目标",goalNames:{stars:"得到 40 颗星",essays:"读 5 篇范文",words:"收藏 15 个新词",games:"玩 3 次词语游戏"},
  review:"用闪卡复习",know:"我会了",notYet:"还不会",reviewDone:"复习完成！",chart:"最近 7 天的星星",noChart:"在这台设备上练习的学生，会在这里显示记录。",
  textSize:"字号",pyLoadFail:"拼音需要连接网络，请稍后再试。"}};
const ft=()=>F[lang];
const css=document.createElement("style");css.textContent=`
:root{--fz:1}
html{font-size:calc(100% * var(--fz))}
body{font-size:calc(17px * var(--fz))}
.fsz{display:flex;gap:4px}
.fsz button{border:1.5px solid var(--rule);background:var(--card);border-radius:999px;min-width:40px;min-height:40px;font-weight:800}
.topline .fsz{margin-left:auto}
.topline #pyBtn{margin-left:0}
.findbox{display:flex;gap:8px;min-width:0;max-width:100%}.findbox .btn{flex:none}#main>*{min-width:0}.studio select,.studio .row{max-width:100%;min-width:0}.studio select{width:100%;text-overflow:ellipsis}
.findbox input{flex:1 1 0;width:0;min-width:0;font:inherit;font-size:1.1rem;padding:10px 14px;border:2px solid var(--blue);border-radius:12px;background:var(--card);color:var(--ink)}
.findres{display:grid;gap:14px}
.findgrp{background:var(--card);border:1px solid var(--rule);border-radius:var(--radius);padding:12px 14px;display:grid;gap:8px}
.findgrp .fh{display:flex;justify-content:space-between;gap:8px;align-items:center}
.findgrp .fh b{font-family:var(--display)}
.findgrp .sub{font-size:.8rem;color:var(--muted);font-weight:700;letter-spacing:.04em}
.focusbtn{justify-self:start}
.deck{display:grid;gap:14px;max-width:760px;margin:0 auto}
.deckcard{background:var(--card);border:2px solid var(--rule);border-radius:20px;padding:24px 22px;min-height:46vh;display:grid;gap:14px;align-content:center;text-align:center}
.deckcard .dt{font-family:var(--display);font-size:calc(1.9rem * var(--fz));font-weight:800;line-height:1.25}
.deckcard .dsub{color:var(--blue)}
.deckcard .chips{justify-content:center}
.deckcard .chip{font-size:1.15rem;padding:6px 14px}
.deckcard .ex{font-size:1.1rem}
.deckcard ul{text-align:left;margin:0 auto}
.decknav{display:flex;gap:8px;justify-content:space-between;align-items:center;flex-wrap:wrap}
.essay p.reading{background:color-mix(in srgb,var(--pencil) 22%,transparent);border-radius:8px;box-shadow:0 0 0 6px color-mix(in srgb,var(--pencil) 22%,transparent)}
.essay.pymode p{line-height:2.5}
.essay ruby rt{font-size:.55em;color:var(--blue);font-weight:400}
.selsave{position:fixed;left:50%;transform:translateX(-50%);bottom:calc(24px + env(safe-area-inset-bottom,0px));z-index:22;background:var(--blue);color:var(--paper);border:none;border-radius:999px;padding:10px 18px;font-weight:800;box-shadow:0 6px 20px rgba(0,0,0,.25)}
@media (max-width:899px){.selsave{bottom:calc(90px + env(safe-area-inset-bottom,0px))}}
.recents{display:flex;gap:8px;overflow-x:auto;padding-bottom:4px}
.recents button{flex:0 0 auto;display:flex;gap:8px;align-items:center;border:1.5px solid var(--rule);background:var(--card);border-radius:14px;padding:8px 12px;max-width:260px;text-align:left}
.recents button svg{width:30px;height:30px;flex:0 0 auto}
.recents button span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.try5 .chip{font-size:1.1rem;padding:6px 14px;background:color-mix(in srgb,var(--pencil) 35%,var(--card))}
.badges{display:grid;gap:10px;grid-template-columns:repeat(auto-fill,minmax(130px,1fr))}
.badge2{border:1.5px solid var(--rule);background:var(--card);border-radius:14px;padding:10px;text-align:center;display:grid;gap:4px;justify-items:center;font-size:.85rem}
.badge2 svg{width:44px;height:44px}
.badge2.off{opacity:.38;filter:grayscale(1)}
.badge2 b{font-size:.9rem}
.goal{display:grid;grid-template-columns:minmax(0,1fr) 120px 60px;gap:10px;align-items:center;padding:4px 0}
.goal span:last-child{text-align:right;font-variant-numeric:tabular-nums;color:var(--muted);font-size:.9rem}
.goal.done span:first-child{color:var(--good);font-weight:700}
.wk{display:flex;gap:6px;align-items:flex-end;height:90px;padding-top:6px}
.wk div{flex:1;display:grid;gap:2px;justify-items:center;align-content:end;height:100%;font-size:.7rem;color:var(--muted)}
.wk i{display:block;width:70%;background:var(--blue);border-radius:4px 4px 0 0;min-height:2px}
.port{display:grid;gap:6px}
.portrow{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:8px;align-items:center;border-bottom:1px dashed var(--rule);padding:6px 0}
.portrow small{color:var(--muted)}
.helper .tabs{display:flex;gap:6px;flex-wrap:wrap}
.helper .tabs button{border:1.5px solid var(--rule);background:var(--card);border-radius:999px;padding:4px 12px;font-weight:700;font-size:.9rem}
.helper .tabs button[aria-pressed="true"]{background:var(--blue);border-color:var(--blue);color:var(--paper)}
`;document.head.appendChild(css);

/* --- text size --- */
const FZ=[0.9,1,1.12,1.25,1.4];
function applyFz(){const i=store.get("wiw2-fz",1);document.documentElement.style.setProperty("--fz",FZ[Math.max(0,Math.min(FZ.length-1,i))])}
const fz=el("div","fsz",'<button id="fzDown" aria-label="Smaller text">A−</button><button id="fzUp" aria-label="Bigger text">A+</button>');
const tl=document.querySelector(".topline");tl.insertBefore(fz,$("#pyBtn"));
$("#fzDown").onclick=()=>{store.set("wiw2-fz",Math.max(0,store.get("wiw2-fz",1)-1));applyFz()};
$("#fzUp").onclick=()=>{store.set("wiw2-fz",Math.min(FZ.length-1,store.get("wiw2-fz",1)+1));applyFz()};
applyFz();

/* --- activity log, recent, favourites --- */
function act(field,n){const a=lstore.get("wiw2-act",{});const d=today();a[d]=a[d]||{};a[d][field]=(a[d][field]||0)+(n||1);const ks=Object.keys(a).sort();while(ks.length>120)delete a[ks.shift()];lstore.set("wiw2-act",a)}
const _gs=giveStar;giveStar=function(k,from){const r=_gs(k,from);if(r){act("stars");if(k.includes("-essay:"))act("essays");if(k.includes("-game:"))act("games")}setTimeout(checkBadges,400);return r};
const _tw=toggleWord;toggleWord=function(c){const before=words().length;_tw(c);if(words().length>before)act("words");checkBadges()};
function addWord(t){t=String(t).replace(/\s+/g," ").trim();if(!t)return;const list=words();if(!list.includes(t)){list.push(t);lstore.set("wiw2-words-"+lang,list);act("words");checkBadges()}toast(ft().saved);markChips()}
function recent(){return lstore.get("wiw2-recent-"+lang,[])}
function pushRecent(id){if(!id)return;const r=recent().filter(x=>x!==id);r.unshift(id);lstore.set("wiw2-recent-"+lang,r.slice(0,8))}
function favs(){return lstore.get("wiw2-favs-"+lang,[])}
function toggleFav(id){let f=favs();if(f.includes(id))f=f.filter(x=>x!==id);else f.unshift(id);lstore.set("wiw2-favs-"+lang,f);return f.includes(id)}
function labelOf(id){if(EIDX[id])return EIDX[id].title;return titleOf(id)}
function iconOf(id){if(EIDX[id])return unitIcon(lang+"-essays",30);return unitIcon(id,30)}
function goto(id){if(EIDX[id]){lstore.set("wiw2-essayopen-"+lang,id);openUnit(lang+"-essays",true)}else openUnit(id,true)}

const _ou=openUnit;openUnit=function(id,scroll){try{speechSynthesis.cancel()}catch(e){}hideSel();_ou(id,scroll);
  if(readIds().includes(id)){pushRecent(id);const v=lstore.get("wiw2-banksread-"+lang,[]);if(!v.includes(id)){v.push(id);lstore.set("wiw2-banksread-"+lang,v);checkBadges()}addFocusButton(id)}};

/* --- find a word --- */
let FINDIDX={};
function buildFind(){if(FINDIDX[lang])return FINDIDX[lang];const out=[];const add=(t,u,g,ex)=>{t=String(t||"").replace(/<br\s*\/?>/g," ").replace(/<[^>]+>/g,"").trim();if(t)out.push({t,lt:t.toLowerCase(),u,g:String(g||"").replace(/<[^>]+>/g,""),ex:ex?String(ex).replace(/<[^>]+>/g,""):""})};
  readIds().forEach(id=>{const u=unitById(id);if(!u)return;u.blocks.forEach(b=>{
    if(b.type==="chips")b.groups.forEach(g=>g.words.forEach(w=>add(w,id,(b.title?b.title+" · ":"")+g.title,g.ex)));
    else if(b.type==="idioms")b.items.forEach(x=>add(x.w+(x.py?" ("+x.py+")":"")+" — "+x.m,id,x.cat,x.ex));
    else if(b.type==="wordbank")b.items.forEach(x=>{x.ladder.forEach(w=>add(w,id,x.name));x.show.forEach(w=>add(w,id,x.name));x.similes.forEach(w=>add(w,id,x.name))});
    else if(b.type==="settings")b.items.forEach(x=>x.senses.forEach(s=>s.lines.forEach(w=>add(w,id,x.name+" · "+s.label))));
    else if(b.type==="flash")b.items.forEach(x=>add(String(x.f).split(/<br/)[0]+" — "+x.b,id,b.title||""));
    else if(b.type==="table")b.rows.forEach(r=>add(r.join(" · "),id,b.title||(b.head||[]).join(" / ")));
    else if(b.type==="cards")b.items.forEach(x=>{if(x.ex)add(x.ex,id,b.title||x.title||x.tag)})})});
  ESS[lang].forEach(e=>eMarks(e).forEach(x=>{if(x.cls!=="d"&&x.t.length<90)add(x.t,lang+"-essays:"+e.id,e.title)}));
  return FINDIDX[lang]=out}
let findQ="";
PAGES.find={sec:"read",icon:"magnifier",title:{en:"Find a word",zh:"找词语"},render(m){const t=ft();
  m.appendChild(el("div","head",'<div class="uhead"><span class="uicon">'+unitIcon(lang+"-find",56)+'</span><div><span class="eyebrow">'+s7().readLong+'</span><h2>'+t.find+'</h2></div></div><p class="lead">'+t.findLead+'</p>'));
  const box=el("div","findbox",'<input type="search" id="findIn" placeholder="'+esc(t.findPh)+'" aria-label="'+esc(t.find)+'">');m.appendChild(box);
  const cnt=el("p","muted","");const res=el("div","findres");m.append(cnt,res);
  const inp=box.querySelector("input");inp.value=findQ;
  function draw(){const q=inp.value.trim().toLowerCase();findQ=inp.value;if(q.length<(lang==="zh"?1:2)){res.innerHTML="";cnt.textContent="";return}
    const idx=buildFind();const hits=idx.filter(x=>x.lt.includes(q)||x.g.toLowerCase().includes(q));
    cnt.textContent=hits.length?t.found(hits.length):t.noMatch;
    const by={};hits.slice(0,600).forEach(x=>{const k=x.u+"|"+x.g;(by[k]=by[k]||[]).push(x)});
    res.innerHTML=Object.keys(by).slice(0,80).map(k=>{const L=by[k];const u=L[0].u;const isE=u.includes(":");const uid=isE?u.split(":")[1]:u;
      return '<div class="findgrp"><div class="fh"><div><div class="sub">'+esc(isE?t.fromEss:titleOf(uid))+'</div><b>'+esc(L[0].g)+'</b></div><button class="btn ghost small" data-go="'+esc(uid)+'">'+t.open+' →</button></div><div class="chips">'+[...new Set(L.map(x=>x.t))].slice(0,40).map(w=>'<span class="chip">'+esc(w)+'</span>').join("")+'</div>'+(L[0].ex?'<p class="ex">'+esc(L[0].ex)+'</p>':'')+'</div>'}).join("");markChips()}
  inp.addEventListener("input",draw);res.addEventListener("click",ev=>{const b=ev.target.closest("[data-go]");if(b)goto(b.dataset.go)});draw();setTimeout(()=>inp.focus(),50)}};

/* --- focus mode --- */
function deckOf(u){const D=[];u.blocks.forEach(b=>{
  if(b.type==="chips")b.groups.forEach(g=>D.push({t:g.title,sub:b.title||"",chips:g.words,ex:g.ex,note:g.note}));
  else if(b.type==="wordbank")b.items.forEach(x=>D.push({t:x.name,face:x.face||x.name,chips:x.ladder,list:x.show,ex:x.showEx}));
  else if(b.type==="idioms")b.items.forEach(x=>D.push({t:x.w,sub:x.py,body:x.m,ex:x.ex}));
  else if(b.type==="settings")b.items.forEach(x=>x.senses.forEach(s=>D.push({t:x.name,sub:s.label,list:s.lines})));
  else if(b.type==="flash")b.items.forEach(x=>{const p=String(x.f).split(/<br\s*\/?>/);D.push({t:p[0],sub:p[1]||"",body:x.b})});
  else if(b.type==="table")b.rows.forEach(r=>D.push({t:r[0],sub:b.title||"",body:r.slice(1).map((c,i)=>(b.head&&b.head[i+1]?'<span class="tag">'+b.head[i+1]+'</span> ':'')+c).join("<br>")}));
  else if(b.type==="cards")b.items.forEach(x=>{if(x.ex||x.text)D.push({t:x.title||x.tag||"",sub:b.title||"",body:x.text||"",ex:x.ex})})});return D}
function addFocusButton(id){const u=unitById(id);if(!u)return;const head=$("#main .head");if(!head||head.querySelector(".focusbtn"))return;
  const b=el("button","btn small focusbtn","▶ "+ft().focus);b.onclick=()=>openDeck(deckOf(u),u.title);head.appendChild(b)}
let deckTimer=null;
function openDeck(D,title,opts){if(!D.length)return;opts=opts||{};const t=ft();const p=$("#panel");let i=0,auto=false,order=D.map((_,k)=>k);lastFocus=document.activeElement;
  function card(x){return '<div class="deckcard">'+(x.face?'<div class="bigface" style="justify-self:center">'+faceFor(x.face)+'</div>':'')+(x.sub?'<div class="dsub">'+x.sub+'</div>':'')+'<div class="dt">'+x.t+'</div>'+
    (x.chips?'<div class="chips">'+x.chips.map(w=>'<span class="chip">'+w+'</span>').join("")+'</div>':'')+(x.body?'<p>'+x.body+'</p>':'')+(x.list?'<ul class="dots">'+x.list.map(w=>'<li>'+w+'</li>').join("")+'</ul>':'')+(x.ex?'<p class="ex">'+x.ex+'</p>':'')+(x.note?'<p class="muted">'+x.note+'</p>':'')+'</div>'}
  function textOf(x){return [x.t,(x.chips||[]).join(lang==="zh"?"，":", "),x.body||"",(x.list||[]).join(" "),x.ex||""].join(lang==="zh"?"。":". ")}
  function draw(){const x=D[order[i]];p.innerHTML='<div class="wrap"><div class="row" style="justify-content:space-between"><h2 id="panelTitle" style="font-size:1.3rem">'+esc(title)+'</h2><button class="btn small" id="pClose">'+t.close+'</button></div><div class="deck">'+card(x)+
    '<div class="decknav"><button class="btn ghost" id="dPrev">←</button><span class="muted">'+t.focusOf(i+1,D.length)+'</span><button class="btn" id="dNext">→</button></div>'+
    '<div class="row" style="justify-content:center">'+(canSpeak?'<button class="btn ghost small" id="dSay">▶ '+ui().listen+'</button><button class="btn ghost small" id="dAuto">'+(auto?"■ "+t.stop:"▶▶ "+t.auto)+'</button>':'')+'<button class="btn ghost small" id="dShuf">'+t.shuffle+'</button>'+(opts.know?'<button class="btn small" id="dKnow">'+t.know+'</button>':'')+'</div></div></div>';
    $("#pClose").onclick=close;$("#dPrev").onclick=()=>go(-1);$("#dNext").onclick=()=>go(1);$("#dShuf").onclick=()=>{order=shuffle(order);i=0;draw()};
    const s=$("#dSay");if(s)s.onclick=()=>speak(textOf(x));
    const a=$("#dAuto");if(a)a.onclick=()=>{auto=!auto;clearTimeout(deckTimer);if(auto)runAuto();draw()};
    const k=$("#dKnow");if(k)k.onclick=()=>{opts.know(x);order.splice(i,1);if(!order.length){close();toast(t.reviewDone);return}if(i>=order.length)i=0;draw()};
    markDeckChips()}
  function markDeckChips(){const saved=new Set(words());p.querySelectorAll(".deckcard .chip").forEach(c=>{c.classList.add("saveable");c.setAttribute("role","button");c.tabIndex=0;c.classList.toggle("saved",saved.has(c.textContent.trim()));c.onclick=()=>{toggleWord(c)}})}
  function go(d){i=(i+d+order.length)%order.length;draw()}
  function runAuto(){clearTimeout(deckTimer);if(!auto)return;const x=D[order[i]];if(canSpeak)speak(textOf(x));const ms=Math.min(14000,3500+textOf(x).length*(lang==="zh"?260:70));deckTimer=setTimeout(()=>{if(!auto||p.hidden)return;go(1);runAuto()},ms)}
  function key(ev){if(p.hidden){document.removeEventListener("keydown",key);return}if(ev.key==="ArrowRight")go(1);if(ev.key==="ArrowLeft")go(-1)}
  function close(){auto=false;clearTimeout(deckTimer);try{speechSynthesis.cancel()}catch(e){}document.removeEventListener("keydown",key);closePanel()}
  document.addEventListener("keydown",key);p.hidden=false;document.body.style.overflow="hidden";draw();$("#pClose").focus()}

/* --- essays: read along, pinyin, favourite, write your own, save selection --- */
function readAlong(art,btn){const t=ft();if(btn.dataset.on==="1"){speechSynthesis.cancel();art.querySelectorAll("p.reading").forEach(x=>x.classList.remove("reading"));btn.dataset.on="";btn.textContent=t.readAlong;return}
  const ps=[...art.querySelectorAll("p")];let i=0;btn.dataset.on="1";btn.textContent=t.stopReading;speechSynthesis.cancel();const v=typeof bestVoice==="function"?bestVoice():null;
  function next(){art.querySelectorAll("p.reading").forEach(x=>x.classList.remove("reading"));if(i>=ps.length||btn.dataset.on!=="1"||!document.body.contains(art)){btn.dataset.on="";btn.textContent=t.readAlong;return}
    const p=ps[i++];const txt=(p.querySelector("rt")?[...p.childNodes].map(n=>n.nodeType===3?n.textContent:(n.querySelectorAll?[...n.querySelectorAll("ruby")].length?[...n.querySelectorAll("ruby")].map(r=>r.firstChild?r.firstChild.textContent:"").join(""):n.textContent:"")).join(""):p.textContent).trim();
    p.classList.add("reading");p.scrollIntoView({block:"center",behavior:"smooth"});
    const parts=txt.match(lang==="zh"?/[^。！？!?]+[。！？!?”]*/g:/[^.!?]+[.!?”’"]*\s*/g)||[txt];const chunks=[];let cur="";parts.forEach(x=>{if((cur+x).length>180&&cur){chunks.push(cur);cur=x}else cur+=x});if(cur)chunks.push(cur);
    chunks.forEach((c,k)=>{const u=new SpeechSynthesisUtterance(c.trim());u.lang=v?v.lang:(lang==="zh"?"zh-CN":"en-GB");if(v)u.voice=v;u.rate=typeof speechRate==="function"?speechRate():0.95;if(k===chunks.length-1)u.onend=()=>{if(btn.dataset.on==="1")next()};speechSynthesis.speak(u)})}
  next()}
function loadPinyin(){return new Promise((res,rej)=>{if(window.pinyinPro)return res();const s=document.createElement("script");s.src="https://cdn.jsdelivr.net/npm/pinyin-pro@3.26.0/dist/index.js";s.onload=()=>window.pinyinPro?res():rej();s.onerror=rej;document.head.appendChild(s)})}
function applyPinyin(art){const walker=document.createTreeWalker(art,NodeFilter.SHOW_TEXT);const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
  nodes.forEach(n=>{if(!/[\u4e00-\u9fff]/.test(n.textContent))return;const span=document.createElement("span");span.innerHTML=pinyinPro.html(n.textContent);n.replaceWith(span)});art.classList.add("pymode")}
const _re=renderEssay;renderEssay=function(e){_re(e);const t=ft();pushRecent(e.id);
  const tools=$("#main .row");if(!tools)return;const art=$("#main article.essay");
  const old=tools.querySelector(".listen");if(old&&canSpeak){const rb=el("button","btn ghost small",t.readAlong);rb.onclick=()=>readAlong(art,rb);old.replaceWith(rb)}
  if(lang==="zh"){const on=lstore.get("wiw2-esspy",false);const pb=el("button","btn ghost small",(on?"✓ ":"")+"拼音");pb.onclick=()=>{lstore.set("wiw2-esspy",!on);renderEssay(e)};tools.appendChild(pb);
    if(on)loadPinyin().then(()=>{if(document.body.contains(art))applyPinyin(art)}).catch(()=>toast(t.pyLoadFail))}
  const fb=el("button","btn ghost small",favs().includes(e.id)?t.faved:t.fav);fb.onclick=()=>{fb.textContent=toggleFav(e.id)?t.faved:t.fav};tools.appendChild(fb);
  const wb=el("button","btn small",t.write+" →");wb.onclick=()=>{lstore.set("wiw2-topic-"+lang,"essay:"+e.id);const su=DATA[lang].find(u=>u.blocks.some(x=>x.type==="studio"));if(su)openUnit(su.id,true)};tools.appendChild(wb)};
let selBtn=null;
function hideSel(){if(selBtn)selBtn.hidden=true}
document.addEventListener("selectionchange",()=>{const sel=window.getSelection();const txt=sel?String(sel).trim():"";const art=$("#main article.essay");
  if(!art||!txt||txt.length<2||txt.length>160||!sel.rangeCount||!art.contains(sel.getRangeAt(0).commonAncestorContainer)){hideSel();return}
  if(!selBtn){selBtn=el("button","selsave","");document.body.appendChild(selBtn);selBtn.addEventListener("mousedown",e=>e.preventDefault());selBtn.onclick=()=>{const s=String(window.getSelection()).trim();if(s)addWord(s);hideSel();try{window.getSelection().removeAllRanges()}catch(e){}}}
  selBtn.textContent=ft().savePhrase;selBtn.hidden=false});

/* --- studio: essay topics, portfolio, helper, read aloud --- */
const _tl=topicLabel;topicLabel=function(v){if(v&&v.startsWith("essay:")){const e=EIDX[v.slice(6)];return e?ft().inspired+e.title:v}return _tl(v)};
const _tc=topicForCoach;topicForCoach=function(v){if(v&&v.startsWith("essay:")){const e=EIDX[v.slice(6)];if(e)return lang==="zh"?"以「"+L10.zh.cats[e.cat]+"」为主题的记叙文（学生读过范文《"+e.title+"》后仿写，不应照抄）":"A story on the theme \""+L10.en.cats[e.cat]+"\" (the pupil read the model essay \""+e.title+"\" and is writing their own version; it must not be copied)"}return _tc(v)};
function try5(){if(stageOf()==="A"){const u=unitById(lang==="zh"?"zh-chuxue":"en-firstwords");if(u){const P=[];u.blocks.forEach(b=>{if(b.type==="chips")b.groups.forEach(g=>g.words.forEach(w=>{w=String(w).replace(/<[^>]+>/g,"").trim();if(w.length>=2&&w.length<=(lang==="zh"?5:16)&&!/[.!?。！？]/.test(w))P.push(w)}))});if(P.length>=5)return seededShuffle([...new Set(P)],seeded(today()+lang+"try5"+(LID||""))).slice(0,5)}}const pool=words().length>=8?words():wallPool();const P2=pool.filter(w=>/^[A-Za-z\u4e00-\u9fff]/.test(w)&&!/[“”"]/.test(w));return seededShuffle(P2.length>=5?P2:pool,seeded(today()+lang+"try5"+(LID||""))).slice(0,5)}
function themeWords(v){let src=[];const L=s=>String(s||"").toLowerCase();
  if(v&&v.startsWith("essay:")){const e=EIDX[v.slice(6)];if(e)return [...new Set(eMarks(e).filter(x=>x.cls!=="d"&&x.t.length<60).map(x=>x.t))]}
  if(v&&v.startsWith("pic:")){const ps=PICIDX[v.slice(4)];if(ps)return ps[lang].words}
  let theme="";DATA[lang].forEach(u=>u.blocks.forEach(b=>{if(b.type==="topics")b.items.forEach(tp=>{if(tp.title===v)theme=tp.theme})}));
  const keys=L(theme).split(/[\s&,，、/]+/).filter(x=>x.length>=2);
  if(keys.length)readIds().forEach(id=>{const u=unitById(id);u&&u.blocks.forEach(b=>{if(b.type==="chips")b.groups.forEach(g=>{if(keys.some(k=>L(g.title).includes(k)||L(b.title).includes(k)))src=src.concat(g.words)})})});
  if(!src.length)src=wallPool();return seededShuffle([...new Set(src.map(x=>String(x).replace(/<[^>]+>/g,"")))],seeded(v+lang)).slice(0,24)}
const _st=R.studio;R.studio=(b,ctx)=>{const w=_st(b,ctx);const t=ft();
  const sel=w.querySelector("select"),ta=w.querySelector("textarea[id^=st-text]");const cur=lstore.get("wiw2-topic-"+lang,"");
  if(cur.startsWith("essay:")&&EIDX[cur.slice(6)]){const o=document.createElement("option");o.value=cur;o.textContent=t.inspired+EIDX[cur.slice(6)].title;sel.prepend(o);sel.value=cur;showEssayIdeas()}
  function showEssayIdeas(){const e=EIDX[sel.value.slice(6)];if(!e)return;const ideas=w.querySelector(".ideas");ideas.innerHTML='<p>'+t.inspiredIdeas+'</p><div class="chips">'+themeWords(sel.value).map(x=>'<span class="chip">'+esc(x)+'</span>').join("")+'</div>';markChips()}
  sel.addEventListener("change",()=>{if(sel.value.startsWith("essay:"))showEssayIdeas();drawHelper()});
  const tcard=ta.closest(".card");
  if(canSpeak){const rb=el("button","btn ghost small",t.readMine);rb.onclick=()=>speak(ta.value);tcard.querySelector(".row .row,.row").appendChild(rb)}
  /* helper */
  const hp=el("div","card helper",'<h4>'+t.helper+'</h4><div class="tabs"><button data-h="topic" aria-pressed="true">'+t.forTopic+'</button><button data-h="today" aria-pressed="false">'+t.tryToday+'</button><button data-h="book" aria-pressed="false">'+t.myBook+'</button></div><div class="chips hc"></div>');
  let mode="topic";function drawHelper(){const L=mode==="topic"?themeWords(sel.value):mode==="today"?try5():words();hp.querySelector(".hc").innerHTML=L.length?L.map(x=>'<span class="chip">'+esc(x)+'</span>').join(""):'<p class="muted">'+t.emptyBook+'</p>';markChips()}
  hp.querySelector(".tabs").addEventListener("click",ev=>{const x=ev.target.closest("[data-h]");if(!x)return;mode=x.dataset.h;hp.querySelectorAll(".tabs button").forEach(y=>y.setAttribute("aria-pressed",String(y===x)));drawHelper()});
  tcard.after(hp);drawHelper();
  /* portfolio */
  const pk="wiw2-portfolio-"+lang;const pc=el("div","card",'<h4>'+t.portfolio+'</h4><p class="muted">'+t.portLead+'</p><div class="row"><button class="btn small sv">'+t.saveTo+'</button><button class="btn ghost small nw">'+t.newComp+'</button><span class="toast pm"></span></div><div class="port"></div>');
  hp.after(pc);let editing=lstore.get("wiw2-portcur-"+lang,"");
  const cnt=x=>lang==="zh"?(x.match(/[\u4e00-\u9fff]/g)||[]).length:(x.trim()?x.trim().split(/\s+/).length:0);
  function drawPort(){const L=lstore.get(pk,[]);pc.querySelector(".port").innerHTML=L.length?L.map(x=>'<div class="portrow"><div><b>'+esc(topicLabel(x.topic)||"—")+'</b><br><small>'+new Date(x.at).toLocaleDateString()+' · '+x.count+' '+(lang==="zh"?"字":"words")+'</small></div><div class="row"><button class="btn ghost small" data-o="'+x.id+'">'+t.openIt+'</button><button class="btn ghost small" data-d="'+x.id+'">'+t.del+'</button></div></div>').join(""):'<p class="muted">'+t.emptyPort+'</p>'}
  pc.querySelector(".sv").onclick=()=>{const txt=ta.value.trim();if(!txt)return;let L=lstore.get(pk,[]);const ex=L.find(x=>x.id===editing);
    if(ex){ex.text=txt;ex.topic=sel.value;ex.count=cnt(txt);ex.at=Date.now()}else{editing="p"+Date.now().toString(36);L.unshift({id:editing,topic:sel.value,text:txt,count:cnt(txt),at:Date.now()});lstore.set("wiw2-portcur-"+lang,editing)}
    lstore.set(pk,L.slice(0,80));pc.querySelector(".pm").textContent=t.savedPort;drawPort();checkBadges()};
  pc.querySelector(".nw").onclick=()=>{editing="";lstore.set("wiw2-portcur-"+lang,"");ta.value="";ta.dispatchEvent(new Event("input"));ta.focus()};
  pc.querySelector(".port").addEventListener("click",ev=>{const o=ev.target.closest("[data-o]"),d=ev.target.closest("[data-d]");const L=lstore.get(pk,[]);
    if(o){const x=L.find(y=>y.id===o.dataset.o);if(!x)return;editing=x.id;lstore.set("wiw2-portcur-"+lang,editing);ta.value=x.text;ta.dispatchEvent(new Event("input"));if([...sel.options].some(op=>op.value===x.topic||op.textContent===x.topic))sel.value=x.topic;ta.scrollIntoView({block:"center"})}
    if(d){if(d.dataset.armed!=="1"){d.dataset.armed="1";d.textContent=t.delSure;setTimeout(()=>{d.dataset.armed="";d.textContent=t.del},3000);return}lstore.set(pk,L.filter(y=>y.id!==d.dataset.d));if(editing===d.dataset.d){editing="";lstore.set("wiw2-portcur-"+lang,"")}drawPort()}});
  drawPort();return w};

/* --- badges --- */
const BADGES=[["star1","star",{en:"First star",zh:"第一颗星"},s=>s.stars>=1],["star50","star",{en:"50 stars",zh:"50 颗星"},s=>s.stars>=50],["star200","trophy",{en:"200 stars",zh:"200 颗星"},s=>s.stars>=200],["star500","trophy",{en:"500 stars",zh:"500 颗星"},s=>s.stars>=500],
 ["streak3","sun",{en:"3-day streak",zh:"连续 3 天"},s=>s.streak>=3],["streak7","sun",{en:"7-day streak",zh:"连续 7 天"},s=>s.streak>=7],["streak30","sun",{en:"30-day streak",zh:"连续 30 天"},s=>s.streak>=30],
 ["ess1","book",{en:"First essay read",zh:"读完第一篇范文"},s=>s.essays>=1],["ess10","books",{en:"10 essays read",zh:"读了 10 篇范文"},s=>s.essays>=10],["ess50","books",{en:"50 essays read",zh:"读了 50 篇范文"},s=>s.essays>=50],["ess100","trophy",{en:"100 essays read",zh:"读了 100 篇范文"},s=>s.essays>=100],
 ["w10","tag",{en:"10 words saved",zh:"收藏 10 个词"},s=>s.words>=10],["w50","tag",{en:"50 words saved",zh:"收藏 50 个词"},s=>s.words>=50],["w200","bank",{en:"200 words saved",zh:"收藏 200 个词"},s=>s.words>=200],
 ["g5","puzzle",{en:"5 games played",zh:"玩了 5 次游戏"},s=>s.games>=5],["g25","puzzle",{en:"25 games played",zh:"玩了 25 次游戏"},s=>s.games>=25],
 ["p1","pen",{en:"First saved story",zh:"第一篇作文集作品"},s=>s.port>=1],["p10","pen",{en:"10 saved stories",zh:"作文集 10 篇"},s=>s.port>=10],
 ["b10","eye",{en:"Explored 10 word banks",zh:"逛了 10 个词语宝库"},s=>s.banks>=10],["b30","eye",{en:"Explored 30 word banks",zh:"逛了 30 个词语宝库"},s=>s.banks>=30]];
function bstats(){const ks=Object.keys(stars);const both=k=>(store.get(k+"-en:"+(LID||"guest"),[])||[]).length+(store.get(k+"-zh:"+(LID||"guest"),[])||[]).length;
  return {stars:ks.length,essays:ks.filter(k=>k.includes("-essay:")).length,streak:streakDays(),words:both("wiw2-words"),games:lstore.get("wiw2-games-played",0)||0,port:both("wiw2-portfolio"),banks:both("wiw2-banksread")}}
function checkBadges(){const s=bstats();const got=lstore.get("wiw2-badges",[]);let changed=false;BADGES.forEach(([k,,n,f])=>{if(f(s)&&!got.includes(k)){got.push(k);changed=true;toast(ft().newBadge(n[lang]))}});if(changed)lstore.set("wiw2-badges",got)}
function badgesHTML(){const got=lstore.get("wiw2-badges",[]);return '<div class="card"><h3>'+ft().badges+' <small class="muted">'+got.length+' / '+BADGES.length+'</small></h3><div class="badges">'+BADGES.map(([k,ic,n])=>'<div class="badge2'+(got.includes(k)?'':' off')+'">'+(window.ART&&ART.icon?ART.icon(ic,{size:44}):"")+'<b>'+n[lang]+'</b></div>').join("")+'</div></div>'}
/* --- goals --- */
function weekStart(){const d=new Date();const wd=(d.getDay()+6)%7;d.setDate(d.getDate()-wd);return dkey(d)}
function weekTotals(){const a=lstore.get("wiw2-act",{});const ws=weekStart();const tot={stars:0,essays:0,words:0,games:0};Object.keys(a).forEach(d=>{if(d>=ws)Object.keys(tot).forEach(k=>tot[k]+=a[d][k]||0)});return tot}
const GOALS={stars:40,essays:5,words:15,games:3};
function goalsHTML(){const t=ft();const w=weekTotals();return '<div class="card"><h3>'+t.goals+'</h3>'+Object.keys(GOALS).map(k=>{const v=Math.min(w[k],GOALS[k]);return '<div class="goal'+(v>=GOALS[k]?' done':'')+'"><span>'+(v>=GOALS[k]?"✓ ":"")+t.goalNames[k]+'</span><div class="prog"><i style="width:'+(v/GOALS[k]*100)+'%"></i></div><span>'+v+' / '+GOALS[k]+'</span></div>'}).join("")+'</div>'}
const _rt=renderToday;renderToday=function(){_rt();const m=$("#main");const head=m.querySelector(".head");if(head)head.after(el("div","",goalsHTML()).firstChild)};
const _op=openPanel;openPanel=function(tab){_op(tab);const p=$("#panel");const wrap=p.querySelector(".wrap");if(!wrap)return;
  if(tab==="prog"){const stat=wrap.querySelector(".stat");const box=el("div","block",goalsHTML()+badgesHTML());if(stat)stat.after(box);else wrap.appendChild(box)}
  if(tab==="words"&&words().length){const b=el("button","btn small","▶ "+ft().review);b.onclick=()=>{openDeck(words().map(w=>({t:esc(w)})),ft().myBook,{know:x=>{const known=lstore.get("wiw2-known-"+lang,[]);known.push(x.t);lstore.set("wiw2-known-"+lang,known)}})};const h=wrap.querySelector("h2");wrap.insertBefore(b,wrap.children[2]||null)}};
/* --- parent weekly chart --- */
if(typeof openFamily==="function"){const _of=openFamily;openFamily=function(){_of();const t=ft();document.querySelectorAll("#panel .fam").forEach(card=>{const id=card.dataset.fl;const a=store.get("wiw2-act:"+id,null);
  const days=[];for(let i=6;i>=0;i--){const d=new Date();d.setDate(d.getDate()-i);days.push(dkey(d))}
  const vals=days.map(d=>a&&a[d]?a[d].stars||0:0);const max=Math.max(1,...vals);
  const box=el("div","",'<span class="tag">'+t.chart+'</span>'+(a?'<div class="wk">'+days.map((d,i)=>'<div><span>'+(vals[i]||"")+'</span><i style="height:'+(vals[i]/max*70)+'px"></i><span>'+d.slice(8)+'</span></div>').join("")+'</div>':'<p class="muted">'+t.noChart+'</p>'));
  const cols=card.querySelector(".cols");if(cols)cols.after(box)})}}
/* --- home extras --- */
const _rh=renderHome;renderHome=function(){_rh();const m=$("#main"),t=ft();const head=m.querySelector(".head");if(!head)return;const frag=[];
  const fb=el("div","findbox",'<input type="search" placeholder="'+esc(t.findPh)+'" aria-label="'+esc(t.find)+'"><button class="btn">'+t.find+'</button>');
  const go2=()=>{findQ=fb.querySelector("input").value;openUnit(lang+"-find",true)};fb.querySelector("button").onclick=go2;fb.querySelector("input").addEventListener("keydown",e=>{if(e.key==="Enter")go2()});frag.push(fb);
  const r=recent().filter(id=>id!==lang+"-home"&&(EIDX[id]||unitById(id)));
  if(r.length)frag.push(el("section","block",'<h3>'+t.cont+'</h3><div class="recents">'+r.slice(0,6).map(id=>'<button data-go="'+id+'">'+iconOf(id)+'<span>'+esc(labelOf(id))+'</span></button>').join("")+'</div>'));
  const f=favs().filter(id=>EIDX[id]||unitById(id));
  if(f.length)frag.push(el("section","block",'<h3>'+t.favs+'</h3><div class="recents">'+f.slice(0,12).map(id=>'<button data-go="'+id+'">'+iconOf(id)+'<span>♥ '+esc(labelOf(id))+'</span></button>').join("")+'</div>'));
  frag.push(el("section","block try5",'<h3>'+t.try5+'</h3><p class="muted">'+t.try5Lead+'</p><div class="chips">'+try5().map(x=>'<span class="chip">'+esc(x)+'</span>').join("")+'</div>'));
  let anchor=head;frag.forEach(x=>{anchor.after(x);anchor=x});
  m.querySelectorAll(".recents").forEach(rc=>rc.addEventListener("click",ev=>{const b=ev.target.closest("[data-go]");if(b)goto(b.dataset.go)}));markChips()};
/* bank pages: favourite button */
const _ou2=openUnit;openUnit=function(id,scroll){_ou2(id,scroll);if(readIds().includes(id)){const head=$("#main .head");if(head&&!head.querySelector(".favbtn")){const t=ft();const b=el("button","btn ghost small favbtn",favs().includes(id)?t.faved:t.fav);b.style.justifySelf="start";b.onclick=()=>{b.textContent=toggleFav(id)?t.faved:t.fav};const fbn=head.querySelector(".focusbtn");if(fbn){const row=el("div","row");fbn.replaceWith(row);row.append(fbn,b)}else head.appendChild(b)}}};
setTimeout(checkBadges,1500);
})();
