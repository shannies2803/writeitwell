/* ===== games.js: Word games hub + Dictation (module, runs inside the engine IIFE) ===== */
(function(){
const ZH=()=>lang==="zh";
const T=(en,zh)=>ZH()?zh:en;
const strip=h=>String(h==null?"":h).replace(/<br\s*\/?>/gi," ").replace(/<[^>]+>/g,"").replace(/&nbsp;/g," ").replace(/\s+/g," ").trim();
const uniq=a=>[...new Set(a)];
const pick=(a,n)=>shuffle(a).slice(0,n);
const blocksOf=(type,filter)=>{const out=[];DATA[lang].forEach(u=>{if(filter&&!filter(u))return;u.blocks.forEach(b=>{if(b.type===type)out.push({b,u})})});return out};
const safe=f=>{try{return f()}catch(e){return null}};

/* ---------- styles (once) ---------- */
if(!document.getElementById("gm-style")){const st=document.createElement("style");st.id="gm-style";st.textContent=`
.gm-hub{display:grid;gap:14px;grid-template-columns:repeat(auto-fill,minmax(250px,1fr))}
.gm-tile{border-top:6px solid hsl(var(--h,215) 70% 55%)}
.gm-tile h3{display:flex;gap:10px;align-items:center}
.gm-tile .gm-ic svg{display:block;width:36px;height:36px}
.gm-meta{display:flex;flex-wrap:wrap;gap:4px 12px;font-size:.85rem;color:var(--muted)}
.gm-meta b{color:var(--ink)}
.gm-stars{letter-spacing:2px;color:var(--pencil);font-size:1rem}
.gm-stars .off{color:var(--rule)}
.gm-top{display:flex;flex-wrap:wrap;gap:8px;align-items:center;justify-content:space-between}
.gm-board{display:grid;gap:8px;grid-template-columns:repeat(3,minmax(0,1fr))}
@media (min-width:640px){.gm-board{grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}}
.gm-card{position:relative;min-height:96px;border:2px solid var(--rule);border-radius:12px;padding:8px 6px;background:var(--blue);color:var(--paper);display:grid;place-items:center;text-align:center;font-weight:700;line-height:1.25;overflow-wrap:anywhere;transition:transform .25s,background .25s}
.gm-card .bk{font-family:var(--display);font-size:1.8rem;opacity:.85}
.gm-card .fr{display:none;gap:3px;justify-items:center;font-size:.92rem}
.gm-card.up,.gm-card.ok{background:var(--card);color:var(--ink);border-color:var(--blue);transform:rotateY(0)}
.gm-card.up .bk,.gm-card.ok .bk{display:none}
.gm-card.up .fr,.gm-card.ok .fr{display:grid}
.gm-card.ok{border-color:var(--good);background:color-mix(in srgb,var(--good) 14%,var(--card))}
.gm-card.miss{border-color:var(--bad)}
.gm-card .w{font-family:var(--display);font-size:1.05rem}
html[lang="zh"] .gm-card .w{font-size:1.2rem}
.gm-card .py{font-weight:400;font-size:.75rem;color:var(--blue)}
.gm-card .m{font-weight:400;font-size:.86rem}
.gm-card .face svg{display:block;width:62px!important;height:62px!important}
@media (min-width:640px){.gm-card{min-height:118px}.gm-card .face svg{width:78px!important;height:78px!important}}
.gm-card:disabled{cursor:default}
.gm-flip{animation:gmflip .25s ease}
@keyframes gmflip{0%{transform:scaleX(.2)}100%{transform:scaleX(1)}}
@media (prefers-reduced-motion:reduce){.gm-flip{animation:none}.gm-card{transition:none}}
.gm-big{font-family:var(--display);font-size:1.5rem;font-weight:700;line-height:1.35}
html[lang="zh"] .gm-big{font-size:1.6rem}
.gm-src{font-size:.82rem;color:var(--muted)}
.gm-sent{font-size:1.08rem;line-height:1.7;background:var(--blue-soft);border-radius:10px;padding:10px 12px}
.gm-sent .blank{display:inline-block;min-width:5em;border-bottom:3px solid var(--blue);margin:0 2px}
.gm-sense{display:grid;gap:8px;grid-template-columns:repeat(auto-fit,minmax(110px,1fr))}
.gm-sense button{text-align:center;font-weight:700}
.gm-score{font-family:var(--display);font-size:2.6rem;font-weight:800;line-height:1}
.gm-end{display:grid;gap:12px;justify-items:start}
.gm-dict{display:grid;gap:12px}
.gm-dict .row input{flex:1 1 220px;font-size:1.25rem;font-family:var(--body)}
.gm-dict input.ok{border-color:var(--good)}
.gm-dict input.no{border-color:var(--bad)}
.gm-hint{background:color-mix(in srgb,var(--pencil) 18%,transparent);border-radius:10px;padding:8px 12px}
.gm-ans{font-size:1.15rem;font-weight:700;border-radius:10px;padding:8px 12px}
.gm-ans.good{background:color-mix(in srgb,var(--good) 14%,transparent)}
.gm-ans.bad{background:color-mix(in srgb,var(--bad) 12%,transparent)}
.gm-miss{list-style:none;margin:0;padding:0;display:grid;gap:6px}
.gm-miss li{display:flex;flex-wrap:wrap;gap:6px 10px;align-items:center;border-bottom:1px dashed var(--rule);padding:6px 0}
.gm-miss s{color:var(--muted);text-decoration-color:var(--bad)}
.gm-lists{display:grid;gap:10px;grid-template-columns:repeat(auto-fill,minmax(210px,1fr))}
.gm-list{border:2px solid var(--rule);background:var(--card);border-radius:12px;padding:12px 14px;text-align:left;display:grid;gap:2px}
.gm-list b{font-family:var(--display);font-size:1.1rem}
.gm-list span{font-size:.85rem;color:var(--muted)}
.gm-list[aria-pressed="true"]{border-color:var(--pencil);box-shadow:0 0 0 2px var(--pencil) inset}
`;document.head.appendChild(st)}

/* ---------- shared: stars, stats ---------- */
function starKey(g,n){return lang+"-game:"+g+":"+today()+":"+n}
function starsToday(g){let c=0;for(let n=0;n<3;n++)if(hasStar(starKey(g,n)))c++;return c}
function awardGame(g,from){for(let n=0;n<3;n++){const k=starKey(g,n);if(!hasStar(k)){giveStar(k,from);safe(refreshNav);return true}}return false}
function bestKey(g){return "wiw2-game-best-"+g}
function finishRound(g,score,lowerBetter){lstore.set("wiw2-games-played",(+lstore.get("wiw2-games-played",0)||0)+1);
  const prev=lstore.get(bestKey(g),null);const isBest=prev==null||(lowerBetter?score<prev:score>prev);if(isBest)lstore.set(bestKey(g),score);return {isBest,prev}}
function starRow(g){const n=starsToday(g);return '<span class="gm-stars" aria-label="'+esc(T(n+" of 3 stars today","今天 "+n+"/3 颗星"))+'">'+"★".repeat(n)+'<span class="off">'+"★".repeat(3-n)+'</span></span>'}
const PRAISE={en:["Great job!","Spot on!","Brilliant!","You got it!","Super!","Well done!"],zh:["答对了！","真棒！","太厉害了！","没错！","好极了！","你真行！"]};
const praise=()=>PRAISE[lang][Math.floor(Math.random()*PRAISE[lang].length)];
function backBtn(onBack){const b=el("button","btn ghost small","← "+T("All games","所有游戏"));b.type="button";b.onclick=onBack;return b}
function scrollTop(node){safe(()=>{const r=node.getBoundingClientRect();if(r.top<0)node.scrollIntoView({block:"start"})})}

/* ---------- data builders ---------- */
function idiomPairs(){const out=[];blocksOf("idioms").forEach(({b})=>b.items.forEach(x=>{const w=strip(x.w);let m=strip(x.m);
    if(ZH()){m=m.split(" / ")[0].replace(/[。.]$/,"");if(!/^[\u4e00-\u9fff]{3,5}$/.test(w))return;if(m.length>18)return}
    else{if(w.length>28||m.length>46)return}
    if(!w||!m)return;out.push({w,py:strip(x.py),m})}));
  const seen=new Set();return out.filter(x=>{if(seen.has(x.w))return false;seen.add(x.w);return true})}
function feelingPairs(){const out=[];const seen=new Set();blocksOf("wordbank").forEach(({b})=>b.items.forEach(x=>{const f=faceFor(x.face||x.name);if(!f)return;const key=f.match(/aria-label="([^"]*)"/);const k=key?key[1]:f;if(seen.has(k))return;seen.add(k);
    out.push({name:strip(x.name).split(" / ")[0],face:f,hue:x.hue})}));return out}
function strongerRows(){const rows=[];
  blocksOf("table").forEach(({b})=>{if(typeof b.weakCol!=="number")return;const head=b.head.join(" ");if(/formal|书面|口语|老套|新意/i.test(head))return;
    const sc=b.weakCol===0?1:0;
    b.rows.forEach(r=>{const plain=strip(r[b.weakCol]);const cell=strip(r[sc]);if(!plain||!cell)return;
      if(ZH()){if(plain.length>6||/[。！？，]/.test(plain))return}else{if(plain.split(/\s+/).length>3||plain.length>22||/[.!?“”"]/.test(plain))return}
      const opts=cell.replace(/\([^)]*\)|（[^）]*）/g,"").split(/[,，、;；]/).map(s=>s.trim()).filter(s=>s&&s!==plain&&(ZH()?s.length<=10:s.length<=30)&&!/[.!?。！？]/.test(s));
      if(opts.length)rows.push({plain,opts})})});
  return rows}
const SENSE_KEYS=["see","hear","smell","touch","taste"];
const SENSE_LBL={en:{see:"See",hear:"Hear",smell:"Smell",touch:"Touch",taste:"Taste"},zh:{see:"视觉 👀",hear:"听觉 👂",smell:"嗅觉 👃",touch:"触觉 ✋",taste:"味觉 👅"}};
const SENSE_EMO={see:"👀",hear:"👂",smell:"👃",touch:"✋",taste:"👅"};
function senseLabel(k){return ZH()?SENSE_LBL.zh[k]:SENSE_EMO[k]+" "+SENSE_LBL.en[k]}
function normSense(l){const s=strip(l).toLowerCase();
  if(/see|sight|look|视|看/.test(s))return "see";if(/hear|sound|listen|听|声/.test(s))return "hear";if(/smell|嗅|闻/.test(s))return "smell";
  if(/touch|feel(?!ings)|触|摸/.test(s))return "touch";if(/taste|味|尝/.test(s))return "taste";return null}
function senseLines(){const out=[];blocksOf("settings").forEach(({b})=>b.items.forEach(set=>set.senses.forEach(s=>{const k=normSense(s.label);if(!k)return;
    s.lines.forEach(line=>{const t=strip(line);if(t&&t.length<=(ZH()?40:90))out.push({t,k,place:strip(set.name)})})})));return out}
const TECH=["s","sh","f","fig","id","c"];
function essayMarks(){const out=[];(ESS[lang]||[]).forEach(e=>eMarks(e).forEach(m=>{if(!TECH.includes(m.cls))return;const t=m.t;if(!t||t.length>(ZH()?30:80)||t.length<2)return;out.push({t,cls:m.cls,e})}));return out}
function clozeItems(){const out=[];(ESS[lang]||[]).forEach(e=>e.paras.forEach(p=>{const re=/<mark class="([a-z]+)">([\s\S]*?)<\/mark>/g;let m;const marks=[];while((m=re.exec(p)))marks.push({cls:m[1],raw:m[0],t:strip(m[2]),i:m.index});
    marks.forEach(mk=>{if(!TECH.includes(mk.cls)||mk.t.length<2||mk.t.length>(ZH()?20:50))return;
      const txt=strip(p.slice(0,mk.i)+"\u0001"+p.slice(mk.i+mk.raw.length));
      const sents=ZH()?txt.match(/[^。！？]+[。！？]*[”」]?/g):txt.match(/[^.!?]+[.!?]+[”’"]?\s*|[^.!?]+$/g);if(!sents)return;
      const s=sents.find(x=>x.includes("\u0001"));if(!s)return;const st=s.trim();const rest=st.replace("\u0001","").replace(/[\s“”"‘’，,。.!！?？]/g,"");
      if(rest.length<(ZH()?5:12)||st.length>(ZH()?80:200))return;
      out.push({sent:st,ans:mk.t,cls:mk.cls,e})})}));return out}

/* ---------- generic quiz runner ---------- */
/* q: {prompt (html), opts [text], a (index), src (html), say (text to read), cls (opts layout)} */
function runQuiz(host,game,qs,onBack){
  let i=0,score=0;const total=qs.length;
  host.innerHTML="";const top=el("div","gm-top");top.appendChild(backBtn(onBack));top.appendChild(el("span","tag",esc(game.title())));host.appendChild(top);
  const box=el("div","runner");box.setAttribute("aria-live","polite");host.appendChild(box);
  function show(){const q=qs[i];
    box.innerHTML='<div class="rhead"><span class="rcount">'+T("Question "+(i+1)+" of "+total,"第 "+(i+1)+" 题，共 "+total+" 题")+'</span><span class="rcount">'+T("Score: ","得分：")+score+'</span></div>'+
      '<div class="prog" role="progressbar" aria-valuemin="0" aria-valuemax="'+total+'" aria-valuenow="'+i+'"><i style="width:'+(i/total*100)+'%"></i></div>'+
      '<div class="q">'+q.prompt+'</div>'+(q.src?'<div class="gm-src">'+q.src+'</div>':'');
    if(q.say&&canSpeak){const lb=listenBtn(()=>q.say);if(lb)box.appendChild(lb)}
    const opts=el("div",q.grid?"opts gm-sense":"opts");q.opts.forEach((o,k)=>{const b=el("button","",esc(o));b.type="button";b.dataset.k=k;opts.appendChild(b)});box.appendChild(opts);
    const fb=el("p","fb");box.appendChild(fb);const nav=el("div","rnav");box.appendChild(nav);
    opts.addEventListener("click",ev=>{const b=ev.target.closest("button");if(!b||opts.dataset.done)return;opts.dataset.done=1;const k=+b.dataset.k;
      opts.querySelectorAll("button").forEach(x=>{x.disabled=true;if(+x.dataset.k===q.a)x.classList.add("right")});
      if(k===q.a){score++;fb.className="fb good";fb.innerHTML="✓ "+praise()+(q.why?' <span class="muted">'+q.why+'</span>':'')}
      else{b.classList.add("wrong");fb.className="fb bad";fb.innerHTML=T("Nice try! The answer is ","差一点！正确答案是")+"<b>"+esc(q.opts[q.a])+"</b>"+T(".","。")+(q.why?' <span class="muted">'+q.why+'</span>':'')}
      box.querySelector(".rhead .rcount:last-child").textContent=T("Score: ","得分：")+score;
      const nx=el("button","btn",i+1<total?T("Next →","下一题 →"):T("See my score","看看得分"));nx.type="button";nx.onclick=()=>{i++;if(i<total){show();scrollTop(box)}else end()};nav.appendChild(nx);nx.focus({preventScroll:true})});
    const f=opts.querySelector("button");if(f&&i>0)f.focus({preventScroll:true})}
  function end(){const pass=score>=Math.ceil(total*0.7);const r=finishRound(game.key,score,false);
    const msg=score===total?T("Perfect score! You're a word wizard!","满分！你真是个词语小高手！"):pass?T("Great work! Keep it up!","做得很好！继续加油！"):T("Good try! Play again to beat your score.","不错的尝试！再玩一次，超越自己吧！");
    box.innerHTML='<div class="gm-end"><span class="tag">'+esc(game.title())+'</span><div class="gm-score">'+score+' / '+total+'</div><p class="q">'+msg+'</p>'+
      '<div class="prog"><i style="width:'+(score/total*100)+'%"></i></div>'+
      '<p class="muted">'+(r.isBest&&r.prev!=null?T("New best score! ","新纪录！"):"")+T("Best: ","最高分：")+lstore.get(bestKey(game.key),score)+' / '+total+'</p><p class="gm-starsline"></p><div class="row"></div></div>';
    const sl=box.querySelector(".gm-starsline");const row=box.querySelector(".row");
    const again=el("button","btn",T("Play again","再玩一次"));again.type="button";again.onclick=()=>game.start(host,onBack);
    const bk=el("button","btn ghost",T("All games","所有游戏"));bk.type="button";bk.onclick=onBack;row.append(again,bk);
    if(pass){const got=awardGame(game.key,again);sl.innerHTML=got?'<span class="done-card">★ '+T("You earned a star!","你得到了一颗星！")+'</span>':'<span class="muted">'+T("You've collected all 3 stars for this game today. Amazing!","今天这个游戏的 3 颗星都拿到啦，真了不起！")+'</span>'}
    else sl.innerHTML='<span class="muted">'+T("Get 7 or more right to earn a star.","答对 7 题或以上就能得到一颗星。")+'</span>';
    sl.insertAdjacentHTML("beforeend"," "+starRow(game.key));
    again.focus({preventScroll:true});scrollTop(box)}
  show()}

/* ---------- memory (pairs) game ---------- */
function runMemory(host,game,pairs,onBack){
  host.innerHTML="";const top=el("div","gm-top");top.appendChild(backBtn(onBack));host.appendChild(top);
  const info=el("div","runner");info.innerHTML='<div class="rhead"><span class="q" style="margin:0">'+esc(game.title())+'</span><span class="rcount" aria-live="polite"></span></div><p class="muted">'+game.how()+'</p>';host.appendChild(info);
  const cnt=info.querySelector(".rcount");const board=el("div","gm-board");info.appendChild(board);const end=el("div");info.appendChild(end);
  const cards=shuffle(pairs.flatMap((p,pi)=>[{pi,side:0,html:p.a,label:p.al},{pi,side:1,html:p.b,label:p.bl}]));
  let moves=0,found=0,open=[],lock=false;
  const upd=()=>{cnt.textContent=T("Moves: "+moves+" · Pairs: "+found+"/"+pairs.length,"步数："+moves+" · 配对："+found+"/"+pairs.length)};upd();
  cards.forEach((c,ci)=>{const b=el("button","gm-card",'<span class="bk" aria-hidden="true">?</span><span class="fr">'+c.html+'</span>');b.type="button";b.dataset.ci=ci;b.setAttribute("aria-label",T("Card ","卡片 ")+(ci+1));c.btn=b;board.appendChild(b)});
  board.addEventListener("click",ev=>{const b=ev.target.closest(".gm-card");if(!b||lock)return;const c=cards[+b.dataset.ci];if(c.done||open.includes(c))return;
    b.classList.add("up");b.classList.remove("gm-flip");void b.offsetWidth;b.classList.add("gm-flip");b.setAttribute("aria-label",c.label);open.push(c);
    if(open.length<2)return;moves++;const [x,y]=open;
    if(x.pi===y.pi){found++;[x,y].forEach(z=>{z.done=true;z.btn.classList.remove("up");z.btn.classList.add("ok");z.btn.disabled=true;z.btn.setAttribute("aria-label",z.label+" ✓")});open=[];upd();
      if(found===pairs.length)finish()}
    else{lock=true;upd();[x,y].forEach(z=>z.btn.classList.add("miss"));setTimeout(()=>{[x,y].forEach(z=>{z.btn.classList.remove("up","miss");z.btn.setAttribute("aria-label",T("Card ","卡片 ")+(+z.btn.dataset.ci+1))});open=[];lock=false},900)}});
  function finish(){const r=finishRound(game.key,moves,true);
    end.innerHTML='<div class="gm-end"><div class="gm-score">'+T("All matched!","全部配对成功！")+'</div><p class="q">'+T("You found all "+pairs.length+" pairs in "+moves+" moves.","你用了 "+moves+" 步，找到了全部 "+pairs.length+" 对。")+'</p><p class="muted">'+(r.isBest&&r.prev!=null?T("New record! ","新纪录！"):"")+T("Best: "+lstore.get(bestKey(game.key),moves)+" moves","最少步数："+lstore.get(bestKey(game.key),moves))+'</p><p class="gm-starsline"></p><div class="row"></div></div>';
    const row=end.querySelector(".row");const again=el("button","btn",T("Play again","再玩一次"));again.type="button";again.onclick=()=>game.start(host,onBack);
    const bk=el("button","btn ghost",T("All games","所有游戏"));bk.type="button";bk.onclick=onBack;row.append(again,bk);
    const got=awardGame(game.key,again);const sl=end.querySelector(".gm-starsline");
    sl.innerHTML=(got?'<span class="done-card">★ '+T("You earned a star!","你得到了一颗星！")+'</span>':'<span class="muted">'+T("You've collected all 3 stars for this game today. Amazing!","今天这个游戏的 3 颗星都拿到啦，真了不起！")+'</span>')+" "+starRow(game.key);
    again.focus({preventScroll:true});safe(()=>end.scrollIntoView({block:"nearest"}))}}

/* ---------- the games ---------- */
const GAMES=[
 {key:"idioms",hue:180,icon:"quote",title:()=>T("Idiom Match","成语配对"),blurb:()=>T("Flip the cards and match each idiom to its meaning.","翻开卡片，把成语和它的意思配成一对。"),
  how:()=>T("Tap two cards. If the idiom and its meaning match, they stay open.","每次翻两张卡片。成语和意思对上了，卡片就会留下来。"),
  ok:()=>idiomPairs().length>=6,
  start(host,back){const P=pick(idiomPairs(),6).map(x=>({a:'<span class="w">'+esc(x.w)+'</span>'+(x.py?'<span class="py">'+esc(x.py)+'</span>':''),al:x.w,b:'<span class="m">'+esc(x.m)+'</span>',bl:x.m}));runMemory(host,this,P,back)}},
 {key:"feelings",hue:340,icon:"heart",title:()=>T("Feelings Match","心情配对"),blurb:()=>T("Match each face to the feeling it shows.","看看表情，把脸和心情词语配起来。"),
  how:()=>T("Tap two cards. Find the face that goes with each feeling word.","每次翻两张卡片，找出和心情词语相配的表情。"),
  ok:()=>feelingPairs().length>=6,
  start(host,back){const P=pick(feelingPairs(),6).map(x=>({a:'<span class="face">'+x.face+'</span>',al:T("a face showing ","表情：")+x.name,b:'<span class="w">'+esc(x.name)+'</span>',bl:x.name}));runMemory(host,this,P,back)}},
 {key:"stronger",hue:30,icon:"swap",title:()=>T("Stronger Word","换个好词"),blurb:()=>T("Swap a plain word for a stronger, sharper one.","把平淡的词换成更生动的说法。"),
  ok:()=>strongerRows().length>=6,
  start(host,back){const rows=strongerRows();const pool=uniq(rows.flatMap(r=>r.opts));
    const qs=pick(rows,10).map(r=>{const ans=r.opts[Math.floor(Math.random()*r.opts.length)];const bad=new Set(r.opts.concat([r.plain]));
      const ds=shuffle(pool.filter(x=>!bad.has(x))).slice(0,2);const opts=shuffle([ans].concat(ds));
      return {prompt:T("Choose a stronger way to say ","哪个说法比 ")+'<span class="gm-big">“'+esc(r.plain)+'”</span>'+T("."," 更生动？"),opts,a:opts.indexOf(ans),say:r.plain}});
    runQuiz(host,this,qs,back)}},
 {key:"senses",hue:140,icon:"eye",title:()=>T("Sense Sort","五感分类"),blurb:()=>T("Is it something you see, hear, smell, touch or taste?","这句话写的是看到、听到、闻到、摸到还是尝到的？"),
  ok:()=>{const L=senseLines();return L.length>=10&&uniq(L.map(x=>x.k)).length>=3},
  start(host,back){const L=senseLines();const keys=SENSE_KEYS.filter(k=>L.some(x=>x.k===k));const cap={};const chosen=[];
    shuffle(L).forEach(x=>{if(chosen.length>=10)return;if((cap[x.k]||0)>=3)return;cap[x.k]=(cap[x.k]||0)+1;chosen.push(x)});
    const qs=chosen.map(x=>({prompt:T("Which sense is this?","这是哪一种感觉？")+'<div class="gm-sent" style="margin-top:8px">'+esc(x.t)+'</div>',src:T("Place: ","场景：")+esc(x.place),opts:keys.map(senseLabel),a:keys.indexOf(x.k),grid:true,say:x.t}));
    runQuiz(host,this,qs,back)}},
 {key:"technique",hue:270,icon:"lightbulb",title:()=>T("Spot the Technique","找写作手法"),blurb:()=>T("A phrase from a model essay: which writing trick is it?","范文里的好词好句，用的是哪一种写作手法？"),
  ok:()=>uniq(essayMarks().map(x=>x.cls)).length>=4&&essayMarks().length>=10,
  start(host,back){const M=essayMarks();const by={};M.forEach(x=>{(by[x.cls]=by[x.cls]||[]).push(x)});const cls=Object.keys(by);
    const qs=[];for(let n=0;n<10;n++){const c=cls[n%cls.length];const x=by[c][Math.floor(Math.random()*by[c].length)];qs.push(x)}
    const items=shuffle(qs).map(x=>{const others=shuffle(cls.filter(c=>c!==x.cls)).slice(0,3);const opts=shuffle([x.cls].concat(others));
      return {prompt:T("Which technique is this?","这用了哪一种写作手法？")+'<div class="gm-sent" style="margin-top:8px">“'+esc(x.t)+'”</div>',src:T("From: ","出自：")+'<i>'+esc(x.e.title)+'</i>',opts:opts.map(c=>lt().cls[c]),a:opts.indexOf(x.cls)}});
    runQuiz(host,this,items,back)}},
 {key:"cloze",hue:210,icon:"puzzle",title:()=>T("Missing Phrase","补上好词句"),blurb:()=>T("Fill the gap in a sentence from a model essay.","从范文里选出句子，把缺少的好词句补上。"),
  ok:()=>clozeItems().length>=10,
  start(host,back){const C=clozeItems();const by={};C.forEach(x=>{(by[x.cls]=by[x.cls]||[]).push(x)});
    const qs=pick(C,40).filter(x=>(by[x.cls]||[]).filter(y=>y.e.id!==x.e.id&&y.ans!==x.ans).length>=2).slice(0,10).map(x=>{
      const others=uniq(shuffle(by[x.cls].filter(y=>y.e.id!==x.e.id&&y.ans!==x.ans)).map(y=>y.ans)).slice(0,2);const opts=shuffle([x.ans].concat(others));
      const s=esc(x.sent).replace("\u0001",'<span class="blank" aria-label="'+esc(T("blank","空白"))+'">&nbsp;</span>');
      return {prompt:T("Which phrase fits the gap?","哪个词句最适合填进空白处？")+'<div class="gm-sent" style="margin-top:8px">'+s+'</div>',src:T("From: ","出自：")+'<i>'+esc(x.e.title)+'</i> · '+lt().cls[x.cls],opts,a:opts.indexOf(x.ans)}});
    runQuiz(host,this,qs,back)}}
];

PAGES.games={sec:"practice",icon:"puzzle",title:{en:"Word games",zh:"词语游戏"},render(main){
  const host=el("div","block");
  function hub(){main.innerHTML="";
    main.appendChild(el("div","head",'<div class="uhead"><span class="uicon">'+unitIcon(lang+"-games",56)+'</span><div><span class="eyebrow">'+T("Practice","练习")+'</span><h2>'+T("Word games","词语游戏")+'</h2></div></div><p class="lead">'+T("Quick games to warm up your word power. Win a round (7 out of 10, or finish a matching game) to earn a star. You can earn up to 3 stars per game every day.","用小游戏热热身，增强词语能力！每轮答对 7 题或以上（配对游戏全部配完）就能得到一颗星。每个游戏每天最多得 3 颗星。")+'</p>'));
    const played=+lstore.get("wiw2-games-played",0)||0;
    if(played)main.appendChild(el("p","muted",T("Rounds played so far: ","已经玩了 ")+'<b>'+played+'</b>'+T(""," 轮")));
    const grid=el("div","gm-hub");
    (stageOf()==="A"?["feelings","senses","stronger","cloze","technique","idioms"].map(k=>GAMES.find(x=>x.key===k)).filter(Boolean):GAMES).forEach(g=>{if(!safe(()=>g.ok()))return;const best=lstore.get(bestKey(g.key),null);const mem=g.key==="idioms"||g.key==="feelings";
      const c=el("div","card gm-tile");c.style.setProperty("--h",g.hue);
      c.innerHTML='<h3><span class="gm-ic" aria-hidden="true">'+(safe(()=>ART.icon(g.icon,{size:36}))||"")+'</span>'+esc(g.title())+'</h3><p>'+g.blurb()+'</p>'+
        '<div class="gm-meta"><span>'+T("Today: ","今天：")+starRow(g.key)+'</span>'+(best!=null?'<span>'+T("Best: ","最佳：")+'<b>'+best+(mem?T(" moves"," 步"):" / 10")+'</b></span>':'')+'</div>';
      const b=el("button","btn",T("Play","开始玩")+" →");b.type="button";b.setAttribute("aria-label",T("Play ","开始玩 ")+g.title());b.onclick=()=>{main.innerHTML="";main.appendChild(host);g.start(host,()=>{hub();scrollTop(main)});scrollTop(main)};
      const r=el("div","row");r.appendChild(b);c.appendChild(r);grid.appendChild(c)});
    if(!grid.children.length)main.appendChild(el("p","muted",T("No games are available yet. Check back soon!","暂时还没有游戏，过几天再来看看吧！")));else main.appendChild(grid);
    const d=el("div","card",'<h4>'+T("Want to practise spelling?","想练习听写吗？")+'</h4><p class="muted">'+T("Listen to a word, then type it.","听一听，再写出来。")+'</p>');
    const db=el("button","btn ghost small",T("Go to Dictation →","去听写 →"));db.type="button";db.onclick=()=>openUnit(lang+"-dictation",true);const rr=el("div","row");rr.appendChild(db);d.appendChild(rr);main.appendChild(d)}
  hub()}};

/* ---------- dictation ---------- */
function dictLists(){const L=[];const en=!ZH();
  const fl=(it)=>strip(String(it.f).split(/<br\s*\/?>/i)[0]);
  if(en){
    const sp=[];blocksOf("flash",u=>/spelling/.test(u.id)).forEach(({b})=>b.items.forEach(it=>{const w=fl(it);if(w&&w.length<=24)sp.push({ans:w,say:w})}));
    if(sp.length>=4)L.push({id:"spell",name:"Spelling words",sub:"Words that are easy to get wrong",items:sp});
    const tr=[];blocksOf("table",u=>u.id==="en-confused").forEach(({b})=>b.rows.forEach(r=>{const ws=strip(r[0]).split(/\s*\/\s*/).map(s=>s.trim());
      strip(r[1]).split(/;\s*/).forEach(part=>{const m=part.split(/\s*=\s*/);if(m.length!==2)return;const w=m[0].trim(),mean=m[1].trim();if(!ws.includes(w)||/\d/.test(w))return;
        if(ws.some(x=>new RegExp("\\b"+x.replace(/[’']/g,"['’]")+"\\b","i").test(mean)))return;if(w.split(" ").length>2)return;tr.push({ans:w,say:w,hint:mean})})}));
    if(tr.length>=4)L.push({id:"tricky",name:"Tricky words",sub:"Words that sound alike: read the clue!",items:tr});
    const ph=[];blocksOf("chips",u=>u.id==="en-wordpairs").forEach(({b})=>b.groups.forEach(g=>g.words.forEach(w=>{const t=strip(w);if(t&&t.length<=30)ph.push({ans:t,say:t})})));
    if(ph.length>=4)L.push({id:"phrases",name:"Phrases",sub:"Strong word pairs to spell",items:uniqBy(ph)});
  }else{
    const cy=[];blocksOf("idioms").forEach(({b})=>b.items.forEach(x=>{const w=strip(x.w);if(/^[\u4e00-\u9fff]{4}$/.test(w))cy.push({ans:w,say:w,py:strip(x.py)})}));
    if(cy.length>=4)L.push({id:"cy",name:"成语",sub:"听一听，写出四字成语",items:uniqBy(cy)});
    const sz=[];blocksOf("chips",u=>u.id==="zh-sizi").forEach(({b})=>b.groups.forEach(g=>g.words.forEach(w=>{const t=strip(w);if(/^[\u4e00-\u9fff]{4}$/.test(t))sz.push({ans:t,say:t})})));
    if(sz.length>=4)L.push({id:"sz",name:"四字词语",sub:"写景、写人、写心情的好词",items:uniqBy(sz)});
    const yc=[];blocksOf("table",u=>u.id==="zh-chars"||u.id==="zh-yihun").forEach(({b})=>{const ci=b.head.indexOf("组词"),wi=b.head.indexOf("词语"),mi=b.head.indexOf("意思");
      b.rows.forEach(r=>{if(ci>=0){strip(r[ci]).split(/\s*\/\s*|、/).forEach(w=>{w=w.replace(/[（(][^）)]*[）)]/g,"").trim();if(/^[\u4e00-\u9fff]{2,5}$/.test(w))yc.push({ans:w,say:w})})}
        else if(wi>=0&&mi>=0){const ws=strip(r[wi]).split(/\s*\/\s*/);const parts=String(r[mi]).split(/<br\s*\/?>/i);
          ws.forEach(w=>{if(!/^[\u4e00-\u9fff]{2,5}$/.test(w))return;const p=parts.find(x=>strip(x).startsWith(w+"："));if(!p)return;let h=strip(p).slice(w.length+1);ws.forEach(x=>{h=h.split(x).join("＿＿")});yc.push({ans:w,say:w,hint:h})})}})});
    if(yc.length>=4)L.push({id:"yc",name:"易错字词",sub:"同音字、形近字，看提示再写",items:uniqBy(yc)});
  }
  return L}
function uniqBy(a){const s=new Set();return a.filter(x=>{if(s.has(x.ans))return false;s.add(x.ans);return true})}
function normAns(s){s=String(s||"").normalize("NFKC").trim();
  if(ZH())return s.replace(/[\s\p{P}\p{S}]/gu,"");
  return s.toLowerCase().replace(/[‘’`´]/g,"'").replace(/[-–—]/g," ").replace(/[^a-z0-9' ]/g,"").replace(/\s+/g," ").trim()}
function speakSlow(t){if(!canSpeak)return;try{speechSynthesis.cancel();const v=typeof bestVoice==="function"?bestVoice():null;const u=new SpeechSynthesisUtterance(String(t));u.lang=v?v.lang:(ZH()?"zh-CN":"en-GB");if(v)u.voice=v;u.rate=0.6;speechSynthesis.speak(u)}catch(e){}}

PAGES.dictation={sec:"practice",icon:"ear",title:{en:"Dictation",zh:"听写"},render(main){
  let sel=lstore.get("wiw2-dict-list-"+lang,"");
  function head(){main.appendChild(el("div","head",'<div class="uhead"><span class="uicon">'+unitIcon(lang+"-dictation",56)+'</span><div><span class="eyebrow">'+T("Practice","练习")+'</span><h2>'+T("Dictation","听写")+'</h2></div></div><p class="lead">'+T("Listen carefully, then type what you hear. Ten words or phrases in each round. Score 7 or more to earn a star.","仔细听，再把听到的词语写下来。每轮 10 个词语，写对 7 个或以上就能得到一颗星。")+'</p>'))}
  function menu(){main.innerHTML="";head();
    if(!canSpeak){main.appendChild(el("div","card",'<h3>'+T("This device can't read aloud","这台设备不能朗读")+'</h3><p>'+T("Dictation needs a device that can speak words out loud. Try a different browser, a tablet or a phone, or ask a grown-up to read the words to you.","听写需要能朗读词语的设备。可以换一个浏览器、平板电脑或手机试试，或者请家长念给你听。")+'</p>'));return}
    const lists=dictLists();if(!lists.length){main.appendChild(el("p","muted",T("No word lists yet. Check back soon!","暂时还没有听写词表，过几天再来看看吧！")));return}
    if(!lists.some(l=>l.id===sel))sel=lists[0].id;
    const card=el("div","card",'<h3>'+T("Choose a list","选择词表")+'</h3>');const box=el("div","gm-lists");box.setAttribute("role","group");
    lists.forEach(l=>{const b=el("button","gm-list",'<b>'+esc(l.name)+'</b><span>'+esc(l.sub)+'</span><span>'+T(l.items.length+" words",l.items.length+" 个词语")+'</span>');b.type="button";b.dataset.id=l.id;b.setAttribute("aria-pressed",l.id===sel);box.appendChild(b)});
    box.addEventListener("click",ev=>{const b=ev.target.closest(".gm-list");if(!b)return;sel=b.dataset.id;lstore.set("wiw2-dict-list-"+lang,sel);box.querySelectorAll(".gm-list").forEach(x=>x.setAttribute("aria-pressed",x===b))});
    card.appendChild(box);
    const best=lstore.get(bestKey("dict"),null);
    card.appendChild(el("div","gm-meta",'<span>'+T("Today: ","今天：")+starRow("dict")+'</span>'+(best!=null?'<span>'+T("Best: ","最高分：")+'<b>'+best+' / 10</b></span>':'')));
    const go=el("button","btn",T("Start dictation","开始听写")+" →");go.type="button";go.onclick=()=>{const l=lists.find(x=>x.id===sel);run(l)};
    const r=el("div","row");r.appendChild(go);card.appendChild(r);main.appendChild(card);
    main.appendChild(el("p","tip",T("<b>Tip:</b> Use <b>Play slower</b> as many times as you like. Say the word quietly to yourself before you type it.","<b>小贴士：</b>听不清楚可以按<b>慢速再听</b>，听几遍都可以。写之前，先在心里默念一遍。")))}
  function run(list){const items=pick(list.items,Math.min(10,list.items.length));const total=items.length;let i=0,score=0;const misses=[];
    main.innerHTML="";const top=el("div","gm-top");const bk=el("button","btn ghost small","← "+T("Word lists","听写词表"));bk.type="button";bk.onclick=()=>{safe(()=>speechSynthesis.cancel());menu()};top.append(bk,el("span","tag",esc(list.name)));main.appendChild(top);
    const box=el("div","runner gm-dict");main.appendChild(box);
    function show(){const it=items[i];
      box.innerHTML='<div class="rhead"><span class="rcount">'+T("Word "+(i+1)+" of "+total,"第 "+(i+1)+" 个，共 "+total+" 个")+'</span><span class="rcount">'+T("Score: ","得分：")+score+'</span></div>'+
        '<div class="prog"><i style="width:'+(i/total*100)+'%"></i></div>'+
        (it.hint?'<p class="gm-hint"><b>'+T("Clue: ","提示：")+'</b>'+esc(it.hint)+'</p>':'')+
        '<div class="row"><button type="button" class="btn small play">▶ '+T("Play","播放")+'</button><button type="button" class="btn ghost small slow">▶ '+T("Play slower","慢速再听")+'</button></div>'+
        '<label for="dictIn">'+T("Type what you hear:","写出你听到的词语：")+'</label>'+
        '<div class="row"><input type="text" id="dictIn" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" lang="'+(ZH()?"zh-CN":"en")+'"><button type="button" class="btn chk">'+T("Check","检查")+'</button></div>'+
        '<div class="out" aria-live="polite"></div><div class="rnav"></div>';
      const inp=box.querySelector("#dictIn"),out=box.querySelector(".out"),nav=box.querySelector(".rnav"),chk=box.querySelector(".chk");
      box.querySelector(".play").onclick=()=>speak(it.say);box.querySelector(".slow").onclick=()=>speakSlow(it.say);
      let done=false;
      function check(){if(done)return;const v=inp.value;if(!v.trim()){out.innerHTML='<p class="muted">'+T("Type your answer first, then press Check.","先写下答案，再按“检查”。")+'</p>';inp.focus();return}
        done=true;const ok=normAns(v)===normAns(it.ans);inp.readOnly=true;chk.disabled=true;inp.classList.add(ok?"ok":"no");
        if(ok){score++;out.innerHTML='<p class="gm-ans good">✓ '+praise()+' <span>'+esc(it.ans)+'</span>'+(it.py?' <span class="py">'+esc(it.py)+'</span>':'')+'</p>'}
        else{misses.push({it,typed:v.trim()});out.innerHTML='<p class="gm-ans bad">'+T("Not quite. The answer is ","还差一点。正确答案是 ")+'<b>'+esc(it.ans)+'</b>'+(it.py?' <span class="py">'+esc(it.py)+'</span>':'')+'</p>'}
        box.querySelector(".rhead .rcount:last-child").textContent=T("Score: ","得分：")+score;
        const nx=el("button","btn",i+1<total?T("Next →","下一个 →"):T("See my score","看看得分"));nx.type="button";nx.onclick=()=>{i++;if(i<total){show();scrollTop(box)}else end()};nav.appendChild(nx);nx.focus({preventScroll:true})}
      chk.onclick=check;inp.addEventListener("keydown",ev=>{if(ev.key==="Enter"&&!ev.isComposing&&ev.keyCode!==229){ev.preventDefault();check()}});
      inp.focus({preventScroll:true});setTimeout(()=>speak(it.say),250)}
    function end(){safe(()=>speechSynthesis.cancel());const pass=score>=Math.ceil(total*0.7);const r=finishRound("dict",score,false);
      box.innerHTML='<div class="gm-end"><span class="tag">'+esc(list.name)+'</span><div class="gm-score">'+score+' / '+total+'</div><p class="q">'+(score===total?T("Perfect! Every word spelled right!","全对！太棒了！"):pass?T("Great listening and spelling!","听得仔细，写得认真！"):T("Good effort! Look at the words below, then try again.","很努力！看看下面的词语，再试一次吧。"))+'</p>'+
        '<p class="muted">'+(r.isBest&&r.prev!=null?T("New best score! ","新纪录！"):"")+T("Best: ","最高分：")+lstore.get(bestKey("dict"),score)+' / 10</p><p class="gm-starsline"></p><div class="row"></div></div>';
      const row=box.querySelector(".row");const again=el("button","btn",T("Play again","再听写一轮"));again.type="button";again.onclick=()=>run(list);
      const lb=el("button","btn ghost",T("Word lists","听写词表"));lb.type="button";lb.onclick=menu;row.append(again,lb);
      const sl=box.querySelector(".gm-starsline");
      if(pass){const got=awardGame("dict",again);sl.innerHTML=got?'<span class="done-card">★ '+T("You earned a star!","你得到了一颗星！")+'</span>':'<span class="muted">'+T("You've collected all 3 dictation stars today. Amazing!","今天的 3 颗听写星星都拿到啦，真了不起！")+'</span>'}
      else sl.innerHTML='<span class="muted">'+T("Get 7 or more right to earn a star.","写对 7 个或以上就能得到一颗星。")+'</span>';
      sl.insertAdjacentHTML("beforeend"," "+starRow("dict"));
      if(misses.length){const rv=el("div","card",'<h4>'+T("Words to review","需要复习的词语")+'</h4><p class="muted">'+T("Listen again and look closely at each one. Tap a word to save it to your word book.","再听一听，仔细看一看。点一下词语，可以收藏到好词本。")+'</p>');
        const ul=el("ul","gm-miss");misses.forEach(m=>{const li=el("li");if(canSpeak){const p=el("button","listen","▶");p.type="button";p.setAttribute("aria-label",T("Play ","播放 ")+m.it.ans);p.onclick=()=>speak(m.it.say);li.appendChild(p)}
          li.appendChild(el("span","chip",esc(m.it.ans)));if(m.it.py)li.appendChild(el("span","py",esc(m.it.py)));li.appendChild(el("span","muted",T("you wrote ","你写了 ")+'<s>'+esc(m.typed)+'</s>'));ul.appendChild(li)});
        rv.appendChild(ul);box.appendChild(rv);markChips()}
      again.focus({preventScroll:true});scrollTop(box)}
    show()}
  menu()}};
})();
