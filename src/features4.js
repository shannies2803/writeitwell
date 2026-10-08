/* ===== round 14: twenty improvements (runs inside the engine IIFE, after spelling.js and vg.js) ===== */
(function(){
const zh=()=>lang==="zh";const stA=()=>stageOf()==="A";
const T4={en:{d4:"My Daily 4",d4Lead:"Do these four every day. Small steps, every day, add up to big progress.",
  items:{read:["📖","Read a word bank","Tap ★ I read this today at the bottom of any bank"],spell:["🔤","Spelling practice","Today's spelling"],vg:["📐","Daily 10","Vocab & Grammar"],essay:["📚","Read a model essay","Finish one essay and tap ★"]},
  go:"Go",allDone:"Daily 4 complete! Amazing work today! 🎉",timer:"⏱ 10-minute timer",timerDone:"Time's up – great focus!",stop:"Stop",pause:"Pause",resume:"Resume",
  reward:"Reward goal",rewardLead:"Set a reward to work towards. Stars from English and 华文 both count.",rewardFor:"Reward",rewardAt:"Stars needed",save:"Save",rewardGot:"🎁 You reached your reward goal! Ask a grown-up for:",toGo:n=>n+" more stars to your reward",
  report:"Parent report",reportLead:"A snapshot of practice for the current learner. Print it or look at it together each week.",
  week:"This week",month:"Last 5 weeks",daysPract:"days practised",stars:"stars this week",spellM:"spelling words mastered",spellL:"spelling words learning",spellAcc:"spelling accuracy",
  vgN:"grammar & vocab questions",vgAcc:"grammar & vocab accuracy",vgBank:"in mistake bank",ess:"model essays read",wb:"words in word book",d4days:"Daily 4 completed",
  weak:"Topics to work on",trouble:"Trickiest spelling words",print:"🖨 Print",cert:"🏅 Weekly certificate",certTitle:"Certificate of Effort",certFor:"is awarded this certificate for hard work in",certWeek:"Week of",
  likes:"What do you like?",likesLead:"Pick a few. We'll suggest essays and word banks you'll enjoy.",suggest:"Banks you might like",
  install:"📲 Use it like an app",installLead:"On an iPad or iPhone: open the site in Safari, tap the Share button, then Add to Home Screen. On Android: open the ⋮ menu in Chrome and choose Add to Home screen.",
  easy:"Easy-read",short:"Short reads",earn:"How to earn stars",earnList:["★ Read a word bank (tap “I read this today”, up to 5 a day)","★ Finish a model essay or its Quick check","★ Today's spelling session","★ Vocab & Grammar: Daily 10, a topic (70%+), a sprint or a practice paper","★ Practice questions in lessons","★ Word games, dictation and Look, hide, write"],
  wbTitle:"My word book",wbLead:"Every word and phrase you have saved. Tap ▶ to hear one, or add single words to your spelling list.",toSpell:"+ Spelling",inSpell:"✓ In spelling",flash:"Flashcards",remove:"Remove",openWB:"Open as a page",
  slow:"🐢 Slow",none:"Nothing yet."},
 zh:{d4:"每日四件事",d4Lead:"每天做完这四件事。天天进步一点点，积少成多。",
  items:{read:["📖","读一个词语宝库","在任何词语宝库底下点“★ 今天读过了”"],spell:["🔤","听写练习","今天的听写"],vg:["📐","每日 10 题","词语与语法"],essay:["📚","读一篇范文","读完一篇范文，点 ★"]},
  go:"去",allDone:"今天的四件事都完成了！真了不起！🎉",timer:"⏱ 10 分钟计时",timerDone:"时间到！你真专心！",stop:"停止",pause:"暂停",resume:"继续",
  reward:"奖励目标",rewardLead:"设定一个奖励。英文和华文的星星都算。",rewardFor:"奖励",rewardAt:"需要几颗星",save:"保存",rewardGot:"🎁 你达到奖励目标了！请大人兑现：",toGo:n=>"还差 "+n+" 颗星就能拿到奖励",
  report:"家长报告",reportLead:"当前学习者的练习情况。可以打印，或者每周和孩子一起看一看。",
  week:"本周",month:"最近 5 周",daysPract:"练习天数",stars:"本周星星",spellM:"听写已记牢",spellL:"听写正在学",spellAcc:"听写正确率",
  vgN:"词语语法题数",vgAcc:"词语语法正确率",vgBank:"错题本",ess:"读过的范文",wb:"生词本词语",d4days:"完成每日四件事",
  weak:"需要加强的题目",trouble:"最容易写错的字词",print:"🖨 打印",cert:"🏅 每周奖状",certTitle:"努力奖",certFor:"在以下方面认真努力，特发此状：",certWeek:"日期",
  likes:"你喜欢什么？",likesLead:"选几个，我们会推荐你喜欢的范文和词语宝库。",suggest:"你可能喜欢的词语宝库",
  install:"📲 像应用程序一样使用",installLead:"iPad 或 iPhone：用 Safari 打开网站，点“分享”，再点“添加到主屏幕”。安卓手机：在 Chrome 点 ⋮，选“添加到主屏幕”。",
  easy:"易读",short:"短篇",earn:"怎样得到星星",earnList:["★ 读词语宝库（点“今天读过了”，每天最多 5 颗）","★ 读完一篇范文或做完小测验","★ 完成今天的听写","★ 词语与语法：每日 10 题、一个题目（70% 以上）、限时挑战或模拟卷","★ 课程里的练习题","★ 词语游戏、听写、看一看写一写"],
  wbTitle:"我的生词本",wbLead:"你收藏的所有词语和句子。点 ▶ 听一听，也可以把词语加进听写。",toSpell:"＋ 听写",inSpell:"✓ 已在听写",flash:"闪卡",remove:"删除",openWB:"打开生词本页面",
  slow:"🐢 慢速",none:"还没有。"}};
const t4=()=>T4[lang];
const st=document.createElement("style");st.textContent=`
.d4{display:grid;gap:8px;grid-template-columns:repeat(auto-fit,minmax(150px,1fr))}
.d4 button{display:grid;gap:4px;text-align:left;font:inherit;color:inherit;background:var(--card);border:2px solid var(--rule);border-radius:14px;padding:10px;cursor:pointer;min-height:88px}
.d4 button.done{border-color:var(--good);background:color-mix(in srgb,var(--good) 14%,var(--card))}.d4 .ic{font-size:1.5rem}.d4 small{color:var(--muted)}
.d4ring{display:flex;align-items:center;gap:10px;margin:6px 0}.d4ring .bar{flex:1;height:10px;border-radius:10px;background:var(--rule);overflow:hidden}.d4ring .bar i{display:block;height:100%;background:var(--good);transition:width .4s}
.ftimer{position:fixed;right:12px;bottom:calc(84px + env(safe-area-inset-bottom,0px));z-index:50;background:var(--card);border:2px solid var(--blue);border-radius:16px;padding:8px 12px;box-shadow:0 6px 20px rgba(0,0,0,.18);display:flex;gap:8px;align-items:center;font-weight:700}
.ftimer b{font-size:1.3rem;font-variant-numeric:tabular-nums}
.confetti{position:fixed;top:-12px;width:10px;height:14px;z-index:9999;pointer-events:none;border-radius:2px;animation:cf 2.6s ease-in forwards}
@keyframes cf{to{transform:translateY(105vh) rotate(720deg);opacity:.9}}
.rw .bar{height:12px;border-radius:12px;background:var(--rule);overflow:hidden;margin:6px 0}.rw .bar i{display:block;height:100%;background:linear-gradient(90deg,var(--pencil),var(--good))}
.heat{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;max-width:320px}.heat div{aspect-ratio:1;border-radius:4px;background:var(--rule);font-size:.6rem;display:flex;align-items:center;justify-content:center;color:var(--muted)}.heat div.on{background:var(--good);color:#fff}.heat div.d4{background:#1b7f3b;color:#fff;outline:2px solid var(--pencil)}
.rgrid{display:grid;gap:8px;grid-template-columns:repeat(auto-fit,minmax(140px,1fr))}.rgrid div{background:var(--card);border:1px solid var(--rule);border-radius:12px;padding:10px;text-align:center}.rgrid b{display:block;font-size:1.6rem}
.cert{border:10px double var(--pencil,#F6C343);border-radius:20px;padding:30px 20px;text-align:center;background:var(--card)}.cert h2{font-size:2.2rem;margin:6px 0}.cert .nm{font-size:2rem;font-family:var(--display);border-bottom:2px solid var(--ink);display:inline-block;padding:0 30px;margin:10px 0}
.likes{display:flex;gap:6px;flex-wrap:wrap}
html.easyread body{font-family:"Lexend","Atkinson Hyperlegible",system-ui,sans-serif!important;letter-spacing:.03em;word-spacing:.12em}
html.easyread #main p,html.easyread #main li,html.easyread .chip,html.easyread .ex{line-height:1.8}
#easyBtn[aria-pressed=true]{background:var(--blue);color:#fff}
.wbpage .row{gap:8px;flex-wrap:wrap;align-items:center;border-bottom:1px dashed var(--rule);padding:6px 0}.wbpage .w{font-weight:700;flex:1;min-width:10em}
@media print{.ftimer,.d4noprint{display:none!important}.cert{border-color:#c9a227}}
`;document.head.appendChild(st);

/* ---------- 4. confetti ---------- */
function celebrate(){if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const cols=["#E5534B","#F2994A","#F6C343","#4CAF7A","#3E7CD6","#9B59B6"];
  for(let i=0;i<90;i++){const c=document.createElement("i");c.className="confetti";c.style.left=Math.random()*100+"vw";c.style.background=cols[i%cols.length];c.style.animationDelay=(Math.random()*.6)+"s";c.style.animationDuration=(2+Math.random()*1.6)+"s";c.style.transform="rotate("+Math.random()*360+"deg)";document.body.appendChild(c);setTimeout(()=>c.remove(),4500)}}

/* ---------- 1. Daily 4 tracking ---------- */
function didKey(){return "wiw2-did-"+lang}
function did(){return lstore.get(didKey(),{})}
function mark(f){const d=did();const k=today();d[k]=d[k]||{};if(d[k][f])return;d[k][f]=1;const ks=Object.keys(d).sort();while(ks.length>120)delete d[ks.shift()];lstore.set(didKey(),d);
  const all=["read","spell","vg","essay"].every(x=>d[k][x]);if(all&&!d[k].all){d[k].all=1;lstore.set(didKey(),d);setTimeout(()=>{celebrate();toast(t4().allDone)},400)}refreshD4()}
const _gs4=giveStar;giveStar=function(k,from){const r=_gs4(k,from);const L=k.slice(0,2);if(L===lang){if(k.includes("-read:"))mark("read");else if(k.includes("-game:spell:"))mark("spell");else if(k.includes("-game:vg:daily"))mark("vg");else if(k.includes("-essay:"))mark("essay")}checkReward();return r};
function d4State(){const d=did()[today()]||{};
  /* also detect activities done without a star (e.g. star already earned earlier) */
  try{const sp=lstore.get("wiw2-spell-"+lang,null);if(sp&&sp.days&&sp.days[today()]&&sp.days[today()].done)d.spell=1}catch(e){}
  if(Object.keys(stars).some(k=>k.startsWith(lang+"-read:")&&k.endsWith(":"+today())))d.read=1;if(hasStar(lang+"-game:vg:daily:"+today()))d.vg=1;return d}
function d4Card(compact){const t=t4();const d=d4State();const keys=["read","spell","vg","essay"];const n=keys.filter(k=>d[k]).length;
  const go={read:()=>{const ids=readIds();const pick=ids[Math.floor(seeded(today()+lang+"d4")()*ids.length)];openUnit(stA()&&unitById(lang==="zh"?"zh-chuxue":"en-firstwords")?(lang==="zh"?"zh-chuxue":"en-firstwords"):pick,true)},spell:()=>openUnit(lang+"-myspell",true),vg:()=>openUnit(lang+"-vg",true),essay:()=>{lstore.set("wiw2-essayopen-"+lang,"");openUnit(lang+"-essays",true)}};
  const c=el("section","block d4card",'<div class="sp-card"><div class="row" style="justify-content:space-between;flex-wrap:wrap;gap:6px"><h3 style="margin:0">✅ '+t.d4+'</h3><button class="btn ghost small tmr d4noprint">'+t.timer+'</button></div>'+(compact?'':'<p class="muted">'+t.d4Lead+'</p>')+
    '<div class="d4ring"><span><b>'+n+'</b> / 4</span><div class="bar"><i style="width:'+n*25+'%"></i></div></div><div class="d4">'+keys.map(k=>'<button data-k="'+k+'" class="'+(d[k]?"done":"")+'"><span class="ic">'+(d[k]?"✅":t.items[k][0])+'</span><b>'+t.items[k][1]+'</b><small>'+t.items[k][2]+'</small></button>').join("")+'</div>'+(n===4?'<p class="fb good">'+t.allDone+'</p>':'')+'</div>');
  c.querySelector(".d4").addEventListener("click",ev=>{const b=ev.target.closest("[data-k]");if(b)go[b.dataset.k]()});c.querySelector(".tmr").onclick=()=>startTimer(10);return c}
function refreshD4(){const old=document.querySelector("#main .d4card");if(old){const n=d4Card(old.dataset.compact==="1");n.dataset.compact=old.dataset.compact;old.replaceWith(n)}}

/* ---------- 2. study timer ---------- */
let tmr=null;function beep(){try{const A=new (window.AudioContext||window.webkitAudioContext)();[0,0.35,0.7].forEach(s=>{const o=A.createOscillator(),g=A.createGain();o.frequency.value=880;o.connect(g);g.connect(A.destination);g.gain.setValueAtTime(.2,A.currentTime+s);g.gain.exponentialRampToValueAtTime(.001,A.currentTime+s+.3);o.start(A.currentTime+s);o.stop(A.currentTime+s+.3)})}catch(e){}}
function startTimer(min){if(tmr){tmr.el.remove();clearInterval(tmr.iv)}const t=t4();let left=min*60,paused=false;const box=el("div","ftimer",'<span>⏱</span><b>'+min+':00</b><button class="btn ghost small ps">'+t.pause+'</button><button class="btn ghost small sp">✕</button>');document.body.appendChild(box);
  const fmt=s=>Math.floor(s/60)+":"+String(s%60).padStart(2,"0");const iv=setInterval(()=>{if(paused)return;left--;box.querySelector("b").textContent=fmt(Math.max(0,left));if(left<=0){clearInterval(iv);beep();celebrate();toast(t.timerDone);box.querySelector("b").textContent="✓";setTimeout(()=>box.remove(),6000);tmr=null}},1000);
  box.querySelector(".ps").onclick=ev=>{paused=!paused;ev.target.textContent=paused?t.resume:t.pause};box.querySelector(".sp").onclick=()=>{clearInterval(iv);box.remove();tmr=null};tmr={el:box,iv}}

/* ---------- 3. reward goals ---------- */
function RW(){return store.get("wiw2-reward-"+(LID||"guest"),null)}
function totalStars(){return langStars("en")+langStars("zh")}
function rewardCard(){const r=RW();if(!r||!r.n)return null;const t=t4();const s=totalStars();const pct=Math.min(100,Math.round(s/r.n*100));
  return el("section","block rw",'<div class="sp-card"><b>🎁 '+t.reward+': '+esc(r.what)+'</b><div class="bar"><i style="width:'+pct+'%"></i></div><span class="muted">★ '+s+' / '+r.n+(s>=r.n?' · '+t.rewardGot+' <b>'+esc(r.what)+'</b>':' · '+t.toGo(r.n-s))+'</span></div>')}
function checkReward(){const r=RW();if(!r||!r.n||r.got)return;if(totalStars()>=r.n){r.got=1;store.set("wiw2-reward-"+(LID||"guest"),r);setTimeout(()=>{celebrate();toast(t4().rewardGot+" "+r.what)},600)}}

/* ---------- 7. interests ---------- */
const LIKES=[["animals","🐶",{en:"Animals",zh:"动物"},["animals"],["en-animals","zh-dongwu"]],["performing","🎭",{en:"Music & stage",zh:"音乐表演"},["performing"],["en-perform","zh-biaoyan"]],["science","🔬",{en:"Science & robots",zh:"科学机器人"},["science"],["en-science","zh-kexue"]],
  ["sport","⚽",{en:"Sport & games",zh:"运动游戏"},["hobbies"],["en-sport","zh-yundong"]],["travel","✈️",{en:"Travel",zh:"旅行"},["travel","outings"],["en-travel","zh-lvxing"]],["festivals","🏮",{en:"Festivals",zh:"节日"},["festivals"],["en-festivals","zh-jieri"]],
  ["food","🍜",{en:"Food",zh:"美食"},["daily"],["en-food","zh-meishi"]],["adventure","🗺️",{en:"Adventure & imagination",zh:"想象冒险"},["imagination","unexpected"],["en-climax","zh-gaochao"]],["friends","🤝",{en:"Friends & family",zh:"朋友家人"},["friendship","family"],["en-homelife","zh-jiating"]],["school","🏫",{en:"School life",zh:"校园生活"},["school"],["en-school","zh-xiaoyuan"]]];
function myLikes(){return store.get("wiw2-likes-"+(LID||"guest"),[])}
function likesPicker(onChange){const t=t4();const cur=myLikes();const c=el("div","sp-card",'<b>'+t.likes+'</b><p class="muted">'+t.likesLead+'</p><div class="likes">'+LIKES.map(l=>'<button class="pill" data-l="'+l[0]+'" aria-pressed="'+cur.includes(l[0])+'">'+l[1]+' '+l[2][lang]+'</button>').join("")+'</div>');
  c.querySelector(".likes").addEventListener("click",ev=>{const b=ev.target.closest("[data-l]");if(!b)return;let L=myLikes();L=L.includes(b.dataset.l)?L.filter(x=>x!==b.dataset.l):L.concat(b.dataset.l);store.set("wiw2-likes-"+(LID||"guest"),L);b.setAttribute("aria-pressed",L.includes(b.dataset.l));if(onChange)onChange()});return c}
function likedCats(){const s=new Set();myLikes().forEach(k=>{const l=LIKES.find(x=>x[0]===k);if(l)l[3].forEach(c=>s.add(c))});return s}
function likedBanks(){const out=[];myLikes().forEach(k=>{const l=LIKES.find(x=>x[0]===k);if(l)l[4].forEach(id=>{if(id.startsWith(lang+"-")&&unitById(id))out.push(id)})});return out}

/* Today page: Daily 4, reward, likes */
const _rt4=renderToday;renderToday=function(){_rt4.apply(this,arguments);const m=$("#main");const head=m.querySelector(".head");const d4=d4Card(false);if(head)head.after(d4);else m.prepend(d4);
  const r=rewardCard();if(r)d4.after(r);if(!myLikes().length){const lp=likesPicker(()=>{});lp.classList.add("block");m.appendChild(lp)}};
/* Home: compact Daily 4, reward, banks you might like */
const _rh4=renderHome;renderHome=function(){_rh4.apply(this,arguments);const m=$("#main");const head=m.querySelector(".startcard")||m.querySelector(".head");const d4=d4Card(true);d4.dataset.compact="1";if(head)head.after(d4);else m.prepend(d4);
  const r=rewardCard();if(r)d4.after(r);const lb=likedBanks();if(lb.length){const t=t4();const s=el("section","block",'<h3>💡 '+t.suggest+'</h3><div class="row" style="gap:8px;flex-wrap:wrap">'+lb.map(id=>'<button class="btn ghost small" data-go="'+id+'">'+esc(unitById(id).title)+' →</button>').join("")+'</div>');
    s.addEventListener("click",ev=>{const b=ev.target.closest("[data-go]");if(b)openUnit(b.dataset.go,true)});(r||d4).after(s)}};
/* Library: picked-for-you uses likes; short reads filter */
let shortOnly=false;const _lf=libFiltered;libFiltered=function(){const L=_lf();return shortOnly?L.filter(e=>eLen(e)<=(zh()?240:210)):L};
const _rl4=renderLibrary;renderLibrary=function(){_rl4();const m=$("#main");if(m.querySelector("article.essay"))return;
  const un=m.querySelector(".unreadt");if(un&&!m.querySelector(".shortt")){const l=el("label","unreadt shortt",'<input type="checkbox"'+(shortOnly?" checked":"")+'> '+t4().short);un.after(l);l.querySelector("input").onchange=ev=>{shortOnly=ev.target.checked;renderLibrary()}}
  const cats=likedCats();const box=m.querySelector(".picked");if(box&&cats.size){const lvl=ELV[lang][{A:0,B:1,C:2}[stageOf()]||0];const pool=ESS[lang].filter(e=>cats.has(e.cat)&&!eRead(e.id));const p2=pool.filter(e=>e.level===lvl);const P=(p2.length>=3?p2:pool);
    const pick=seededShuffle(P,seeded(today()+lang+"likes"+(LID||""))).slice(0,3);if(pick.length){const lc=lt();box.innerHTML=pick.map(x=>'<button class="esscard" data-e="'+x.id+'"><span class="tag">'+lc.cats[x.cat]+' · '+x.level+'</span><b>'+esc(x.title)+'</b><span class="pv">'+esc(ePreview(x))+'</span></button>').join("")}}};

/* ---------- 5/6/16. Parent report page ---------- */
function weekStartKey(){const d=new Date();const day=(d.getDay()+6)%7;d.setDate(d.getDate()-day);return dkey(d)}
function lastNDays(n){const out=[];for(let i=n-1;i>=0;i--){const d=new Date();d.setDate(d.getDate()-i);out.push(dkey(d))}return out}
PAGES.report={sec:"practice",icon:"trophy",title:{en:"Parent report",zh:"家长报告"},render(m){const t=t4();
  pageHead(m,lang+"-report",zh()?"给家长":"For parents",t.report,t.reportLead);
  const lname=(LEARNERS.find(x=>x.id===LID)||{}).name||(zh()?"访客":"Guest");const ws=weekStartKey();
  const daysSet=new Set(lstore.get("wiw2-days",[]));const D=did();const wk=lastNDays(7);
  const act=lstore.get("wiw2-act",{});let wStars=0,wEss=0;Object.keys(act).forEach(d=>{if(d>=ws){wStars+=act[d].stars||0;wEss+=act[d].essays||0}});
  const sp=lstore.get("wiw2-spell-"+lang,{})||{};const cards=sp.cards||{};const cw=Object.keys(cards);const mast=cw.filter(w=>cards[w].b>=6).length;let sr=0,sx=0;Object.values(sp.days||{}).forEach(d=>{sr+=d.r||0;sx+=d.x||0});
  const vg=lstore.get("wiw2-vg-"+lang,{})||{};const vit=vg.it||{};let vr=0,vx=0;Object.values(vg.days||{}).forEach(d=>{vr+=d.r||0;vx+=d.x||0});const bank=Object.keys(vit).filter(k=>vit[k].bank).length;
  const essRead=ESS[lang].filter(e=>eRead(e.id)).length;const d4n=Object.keys(D).filter(k=>D[k].all).length;
  const top=el("div","",'<h3>'+esc(lname)+' · '+(zh()?"华文":"English")+'</h3><h4>'+t.week+'</h4><div class="rgrid">'+
    [[wk.filter(d=>daysSet.has(d)).length+" / 7",t.daysPract],[wStars,t.stars],[wk.filter(d=>D[d]&&D[d].all).length,t.d4days],[wEss,t.ess]].map(x=>'<div><b>'+x[0]+'</b>'+x[1]+'</div>').join("")+'</div>'+
    '<h4>'+t.month+'</h4><div class="heat">'+lastNDays(35).map(d=>'<div class="'+(D[d]&&D[d].all?"d4":daysSet.has(d)?"on":"")+'" title="'+d+'">'+d.slice(8)+'</div>').join("")+'</div>'+
    '<h4>'+(zh()?"总体":"Overall")+'</h4><div class="rgrid">'+[[mast,t.spellM],[cw.length-mast,t.spellL],[(sr+sx?Math.round(sr/(sr+sx)*100):0)+"%",t.spellAcc],[vr+vx,t.vgN],[(vr+vx?Math.round(vr/(vr+vx)*100):0)+"%",t.vgAcc],[bank,t.vgBank],[essRead,t.ess],[words().length,t.wb],[d4n,t.d4days]].map(x=>'<div><b>'+x[0]+'</b>'+x[1]+'</div>').join("")+'</div>');
  const sc=el("div","sp-card");sc.appendChild(top);m.appendChild(sc);
  /* weak topics */
  const tp={};Object.keys(vit).forEach(k=>{const id=k.split("#")[0];const r=vit[k];tp[id]=tp[id]||{c:0,w:0};tp[id].c+=r.c||0;tp[id].w+=r.w||0});
  const weak=Object.keys(tp).filter(id=>tp[id].c+tp[id].w>=3).sort((a,b)=>tp[a].c/(tp[a].c+tp[a].w)-tp[b].c/(tp[b].c+tp[b].w)).slice(0,5);
  const VGT={};(window.VG||[]).forEach(u=>VGT[u.id]=u.title);
  const trouble=cw.filter(w=>cards[w].x>0&&cards[w].b<6).sort((a,b)=>cards[b].x-cards[a].x).slice(0,10);
  sc.appendChild(el("div","",'<h4>'+t.weak+'</h4>'+(weak.length?'<ul class="dots">'+weak.map(id=>'<li>'+esc(VGT[id]||id)+' – '+Math.round(tp[id].c/(tp[id].c+tp[id].w)*100)+'%</li>').join("")+'</ul>':'<p class="muted">'+t.none+'</p>')+
    '<h4>'+t.trouble+'</h4>'+(trouble.length?'<p>'+trouble.map(w=>'<b>'+esc(w)+'</b> ✗'+cards[w].x).join(" · ")+'</p>':'<p class="muted">'+t.none+'</p>')));
  const row=el("div","row d4noprint");row.style.cssText="gap:8px;flex-wrap:wrap";const pb=el("button","btn",t.print);pb.onclick=()=>window.print();const cb=el("button","btn ghost",t.cert);cb.onclick=()=>certificate(m,lname,{days:wk.filter(d=>daysSet.has(d)).length,stars:wStars,mast,d4:wk.filter(d=>D[d]&&D[d].all).length});row.append(pb,cb);sc.appendChild(row);
  /* reward */
  const r=RW()||{what:"",n:50};const rc=el("div","sp-card d4noprint",'<h3>🎁 '+t.reward+'</h3><p class="muted">'+t.rewardLead+'</p><div class="row" style="gap:8px;flex-wrap:wrap"><input class="lsearch rwW" style="flex:2 1 180px" placeholder="'+(zh()?"例如：去动物园":"e.g. a trip to the zoo")+'"><input type="number" min="5" step="5" class="lsearch rwN" style="flex:1 1 90px"><button class="btn small">'+t.save+'</button></div>');
  rc.querySelector(".rwW").value=r.what||"";rc.querySelector(".rwN").value=r.n||50;rc.querySelector("button").onclick=()=>{store.set("wiw2-reward-"+(LID||"guest"),{what:rc.querySelector(".rwW").value.trim()||"🎁",n:Math.max(5,+rc.querySelector(".rwN").value||50),got:0});toast(t.save+" ✓");const old=m.querySelector(".rw");const nr=rewardCard();if(old)old.remove();if(nr)rc.before(nr)};
  const ex=rewardCard();if(ex)m.appendChild(ex);m.appendChild(rc);
  const lp=likesPicker(()=>{});lp.classList.add("d4noprint");m.appendChild(lp);
  m.appendChild(el("div","sp-card d4noprint",'<h3>'+t.install+'</h3><p>'+t.installLead+'</p>'))}};
function certificate(m,name,s){const t=t4();m.innerHTML="";const back=el("button","btn ghost small d4noprint","← "+t.report);back.onclick=()=>openUnit(lang+"-report",true);const pb=el("button","btn small d4noprint",t.print);pb.onclick=()=>window.print();
  const r=el("div","row d4noprint");r.style.gap="8px";r.append(back,pb);m.appendChild(r);
  m.appendChild(el("div","cert",'<div style="font-size:3rem">🏅</div><h2>'+t.certTitle+'</h2><div class="nm">'+esc(name)+'</div><p>'+t.certFor+'</p><p><b>'+(zh()?"华文写作、词语和听写":"English writing, vocabulary and spelling")+'</b></p><div class="rgrid" style="max-width:520px;margin:12px auto">'+[[s.days+"/7",t.daysPract],[s.stars,t.stars],[s.d4,t.d4days],[s.mast,t.spellM]].map(x=>'<div><b>'+x[0]+'</b>'+x[1]+'</div>').join("")+'</div><p class="muted">'+t.certWeek+': '+new Date().toLocaleDateString(zh()?"zh-CN":"en-GB",{day:"numeric",month:"long",year:"numeric"})+'</p>'));celebrate()}

/* ---------- 18. word book page ---------- */
PAGES.mywords={sec:"read",icon:"book",title:{en:"My word book",zh:"我的生词本"},render(m){const t=t4();pageHead(m,lang+"-mywords",s7().readLong,t.wbTitle,t.wbLead);
  const list=el("div","sp-card wbpage");m.appendChild(list);
  function spList(){const s=lstore.get("wiw2-spell-"+lang,{})||{};return new Set([].concat((s.custom||[]).map(x=>x.w),Object.keys(s.cards||{})))}
  function draw(){const W=words();const sp=spList();list.innerHTML=W.length?W.map((w,i)=>'<div class="row"><span class="w">'+esc(w)+'</span>'+(canSpeak?'<button class="btn ghost small" data-h="'+i+'">▶</button>':'')+((zh()?/^[一-鿿]{1,4}$/.test(w):/^[A-Za-z' -]{2,20}$/.test(w))?(sp.has(w)?'<span class="sp-badge m">'+t.inSpell+'</span>':'<button class="btn ghost small d4noprint" data-s="'+i+'">'+t.toSpell+'</button>'):'')+'<button class="btn ghost small d4noprint" data-r="'+i+'">'+t.remove+'</button></div>').join(""):'<p class="muted">'+t.none+'</p>'}
  list.addEventListener("click",ev=>{const W=words();const h=ev.target.closest("[data-h]"),s=ev.target.closest("[data-s]"),r=ev.target.closest("[data-r]");
    if(h)speak(W[+h.dataset.h]);if(s){const k="wiw2-spell-"+lang;const st=lstore.get(k,null)||{};st.custom=st.custom||[];st.custom.unshift({w:W[+s.dataset.s]});lstore.set(k,st);draw()}
    if(r){lstore.set("wiw2-words-"+lang,W.filter((x,i)=>i!==+r.dataset.r));draw()}});
  const row=el("div","row d4noprint");row.style.cssText="gap:8px;margin-top:10px";const pb=el("button","btn ghost small",t.print);pb.onclick=()=>window.print();row.appendChild(pb);m.appendChild(row);draw()}};

/* ---------- 17. how to earn stars + word book link in the panel ---------- */
const _op4=openPanel;openPanel=function(tab){_op4(tab);const p=$("#panel");if(!p||p.hidden)return;const t=t4();
  if(tab!=="words"&&!p.querySelector(".earn")){const c=el("details","card earn",'<summary><b>⭐ '+t.earn+'</b></summary><ul class="dots">'+t.earnList.map(x=>'<li>'+esc(x)+'</li>').join("")+'</ul>');(p.querySelector(".wrap")||p).appendChild(c)}
  if(tab==="words"&&!p.querySelector(".wbopen")){const b=el("button","btn small wbopen",t.openWB+" →");b.onclick=()=>{p.hidden=true;openUnit(lang+"-mywords",true)};const w=p.querySelector(".wrap")||p;const h=w.querySelector(".ptabs");if(h)h.after(b);else w.appendChild(b)}};

/* ---------- 12. easy-read mode ---------- */
let lexLoaded=false;function setEasy(on){document.documentElement.classList.toggle("easyread",on);store.set("wiw2-easy",on);const b=$("#easyBtn");if(b)b.setAttribute("aria-pressed",on);
  if(on&&!lexLoaded){lexLoaded=true;const l=document.createElement("link");l.rel="stylesheet";l.href="https://fonts.googleapis.com/css2?family=Lexend:wght@400;600;700&display=swap";document.head.appendChild(l)}}
{const tl=document.querySelector(".topline");if(tl&&!$("#easyBtn")){const b=document.createElement("button");b.id="easyBtn";b.title=T4.en.easy+" / "+T4.zh.easy;b.textContent="Aa";b.setAttribute("aria-label","Easy-read mode");b.className=($("#pyBtn")||{}).className||"";
  b.style.cssText="border:1.5px solid var(--rule);background:var(--card);border-radius:999px;padding:4px 10px;font-weight:700;cursor:pointer";const py=$("#pyBtn");if(py)py.before(b);else tl.appendChild(b);b.onclick=()=>setEasy(!document.documentElement.classList.contains("easyread"))}
  if(store.get("wiw2-easy",false))setEasy(true)}

/* ---------- 13. tap-to-hear chips for P1–P2 ---------- */
document.addEventListener("click",ev=>{const c=ev.target.closest&&ev.target.closest("#main .chip");if(c&&stA()&&canSpeak){try{speak(c.textContent)}catch(e){}}},true);

/* ---------- 14. pinyin on Chinese questions for P1–P2 ---------- */
let pyP4=null;function loadPy(){if(window.pinyinPro)return Promise.resolve();if(pyP4)return pyP4;pyP4=new Promise((res,rej)=>{const s=document.createElement("script");s.src="https://cdn.jsdelivr.net/npm/pinyin-pro@3.26.0/dist/index.js";s.onload=()=>window.pinyinPro?res():rej();s.onerror=()=>{pyP4=null;rej()};document.head.appendChild(s)});return pyP4}
function rubyIn(x){if(x.dataset.py4||!/[一-鿿]/.test(x.textContent))return;x.dataset.py4=1;try{x.innerHTML=x.innerHTML.split(/(<[^>]+>)/).map(seg=>seg.startsWith("<")?seg:(/[一-鿿]/.test(seg)?pinyinPro.html(seg):seg)).join("")}catch(e){}}
const mo=new MutationObserver(()=>{if(!zh()||!stA()||!store.get("wiw2-py",true))return;const xs=document.querySelectorAll("#main .vg-q:not([data-py4]), #main .vg-opts button:not([data-py4]), #main .sp-sent:not([data-py4]), #main .vg-why div:not([data-py4])");if(!xs.length)return;loadPy().then(()=>xs.forEach(rubyIn)).catch(()=>{})});
mo.observe(document.getElementById("main"),{childList:true,subtree:true});

/* ---------- 11. find: banks, topics and spelling words first ---------- */
const _fr=PAGES.find.render;PAGES.find.render=function(m){_fr(m);const inp=m.querySelector("#findIn");if(!inp)return;const box=el("div","findextra");inp.closest(".findbox").after(box);
  function draw(){const q=inp.value.trim().toLowerCase();if(q.length<(zh()?1:2)){box.innerHTML="";return}const out=[];
    readIds().forEach(id=>{const u=unitById(id);if(u&&String(u.title).toLowerCase().includes(q))out.push('<button class="btn ghost small" data-go="'+id+'">📖 '+esc(u.title)+'</button>')});
    (window.VG||[]).filter(u=>u.lang===lang&&(u.title.toLowerCase().includes(q)||(u.words||[]).some(w=>w.w.toLowerCase()===q))).slice(0,8).forEach(u=>out.push('<button class="btn ghost small" data-vg="'+u.id+'">📐 '+esc(u.title)+'</button>'));
    const SPW=zh()?window.SPELL_ZH_WORDS:window.SPELL_EN_WORDS;const hit=(SPW||[]).find(x=>x.w.toLowerCase()===q);
    box.innerHTML=(out.length?'<div class="row" style="gap:6px;flex-wrap:wrap;margin:8px 0">'+out.join("")+'</div>':'')+(hit?'<div class="sp-card" style="margin:8px 0"><b>🔤 '+esc(hit.w)+'</b>'+(hit.py?' <span class="muted">'+esc(hit.py)+'</span>':'')+'<div class="sp-trick" style="margin-top:6px">'+esc(hit.trick)+'</div><i>'+esc(hit.s)+'</i></div>':'')}
  box.addEventListener("click",ev=>{const b=ev.target.closest("[data-go]"),v=ev.target.closest("[data-vg]");if(b)openUnit(b.dataset.go,true);if(v){if(window.__vgOpen)window.__vgOpen(v.dataset.vg)}});
  inp.addEventListener("input",draw);draw()};

/* ---------- 15. add-to-home-screen icon + manifest ---------- */
try{const cv=document.createElement("canvas");cv.width=cv.height=180;const g=cv.getContext("2d");g.fillStyle="#3E7CD6";g.fillRect(0,0,180,180);g.fillStyle="#F6C343";g.fillRect(0,128,180,52);g.fillStyle="#fff";g.font="bold 88px sans-serif";g.textAlign="center";g.textBaseline="middle";g.fillText("W",90,78);g.fillStyle="#2B2D42";g.font="bold 30px sans-serif";g.fillText("写",90,155);
  const png=cv.toDataURL("image/png");const add=(rel,href,extra)=>{const l=document.createElement("link");l.rel=rel;l.href=href;Object.assign(l,extra||{});document.head.appendChild(l)};
  add("apple-touch-icon",png);add("icon",png);const man={name:"Write It Well",short_name:"Write It Well",display:"standalone",background_color:"#ffffff",theme_color:"#3E7CD6",start_url:location.href.split("#")[0],icons:[{src:png,sizes:"180x180",type:"image/png"}]};
  add("manifest","data:application/manifest+json,"+encodeURIComponent(JSON.stringify(man)));
  [["apple-mobile-web-app-capable","yes"],["mobile-web-app-capable","yes"],["apple-mobile-web-app-title","Write It Well"],["theme-color","#3E7CD6"]].forEach(([n,c])=>{const me=document.createElement("meta");me.name=n;me.content=c;document.head.appendChild(me)})}catch(e){}

})();
