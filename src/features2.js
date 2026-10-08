/* ===== round 12: ten more improvements (runs inside the engine IIFE, after features.js) ===== */
(function(){
const T2={
 en:{tapTip:"Tip: tap any coloured phrase to hear it or save it.",hear:"▶ Hear",save:"＋ Save to my word book",saved:"Saved to your word book",
  plot:"Plot map",plotOff:"Hide plot map",plotH:"How this story is built",plotLead:"Each row is one paragraph. Tap a row to jump to it.",
  lab:{open:"Opening",build:"Build-up",climax:"Climax",res:"Resolution",end:"Ending"},
  more:"More like this",quiz:"Quick check",quizLead:"Which kind of good writing is each coloured phrase?",quizWin:"All correct! ★ You earned a star.",quizTry:"Good try! Look at the colours again and have another go.",again:"Try again",
  print:"Print",read:"★ I read this today",readDone:"✓ Read today",readMax:"You have earned today's 5 reading stars. Keep reading for fun!",
  mylevel:"Showing essays for your level. Tap \"All levels\" to see every essay.",
  spin:"Story spinner",spinLead:"Spin for a character, a place, a problem, a feeling and a twist. Lock the ones you like, spin again, then write the story.",
  spinBtn:"🎲 Spin",lock:"Lock",locked:"Locked",writeIt:"Write this story →",slots:["Who","Where","Problem","Feeling","Twist"],spinTopic:"Story spinner: ",
  memo:"Look, hide, write",memoLead:"Read a good sentence, hide it, then write it from memory. It is one of the best ways to make good phrases your own. Get 4 out of 5 right for a star (3 stars a day).",
  ready:"I'm ready – hide it",check:"Check",next:"Next →",correct:"Spot on!",close:"Very close!",notyet:"Not quite – compare carefully.",round:"Sentence",of:"of",done:"Round finished",score:"You got",again2:"New round",typeHere:"Type the sentence from memory…",peek:"Peek (3 s)",
  levels:"Level",hearIt:"▶ Hear it"},
 zh:{tapTip:"小提示：点一点彩色的好词好句，可以听一听，也可以收进生词本。",hear:"▶ 听一听",save:"＋ 收进生词本",saved:"已收进生词本",
  plot:"情节图",plotOff:"收起情节图",plotH:"这篇作文是怎样写成的",plotLead:"每一行是一个段落。点一行就能跳到那一段。",
  lab:{open:"开头",build:"经过",climax:"高潮",res:"结果",end:"结尾"},
  more:"相似的范文",quiz:"小测验",quizLead:"每个彩色的句子用了哪一种写法？",quizWin:"全对！★ 你得到一颗星。",quizTry:"不错！再看看颜色，再试一次。",again:"再试一次",
  print:"打印",read:"★ 今天读过了",readDone:"✓ 今天已读",readMax:"今天的 5 颗阅读星已经拿满啦，继续读着玩吧！",
  mylevel:"现在显示适合你年级的范文。点“全部年级”可以看所有范文。",
  spin:"故事转盘",spinLead:"转一转，得到人物、地点、问题、心情和意外。喜欢的就锁住，再转其他的，然后动笔写故事。",
  spinBtn:"🎲 转一转",lock:"锁住",locked:"已锁",writeIt:"用这个写故事 →",slots:["人物","地点","问题","心情","意外"],spinTopic:"故事转盘：",
  memo:"看一看，写一写",memoLead:"先读一个好句子，再把它藏起来，凭记忆写出来。这是把好词好句变成自己的最好方法之一。5 句写对 4 句就得一颗星（每天最多 3 颗）。",
  ready:"我记住了，藏起来",check:"检查",next:"下一句 →",correct:"完全正确！",close:"非常接近！",notyet:"还差一点，仔细对照一下。",round:"第",of:"句，共",done:"这一轮完成了",score:"你写对了",again2:"再来一轮",typeHere:"凭记忆写出这个句子……",peek:"偷看一下（3 秒）",
  levels:"年级",hearIt:"▶ 听一听"}};
const t2=()=>T2[lang];
const CLSTIP={en:{s:"Five senses: what you see, hear, smell, taste or touch.",sh:"Show, don't tell: actions, faces and bodies that show a feeling.",f:"A precise feeling word.",d:"Dialogue: real people talking.",c:"A connector that moves the story along.",fig:"Figurative language: a simile, metaphor or personification.",id:"An idiom or a strong, ready-made phrase."},
 zh:{s:"五感描写：看到、听到、闻到、尝到、摸到的。",sh:"神态动作描写：用动作和表情表现心情。",f:"准确的心情词语。",d:"人物对话：像真人说话一样。",c:"连接词：让故事一步一步往前走。",fig:"修辞手法：比喻、拟人等。",id:"成语或好词好句。"}};
const st=document.createElement("style");st.textContent=`
.mpop{position:absolute;z-index:60;max-width:300px;background:var(--card);color:var(--ink);border:2px solid var(--blue);border-radius:14px;padding:10px 12px;box-shadow:0 8px 24px rgba(0,0,0,.18);font-size:.95rem}
.mpop b{display:block;margin-bottom:4px}.mpop .row{gap:6px;margin-top:8px;flex-wrap:wrap}
article.essay mark{cursor:pointer}
.plotmap{counter-reset:pm}.plotmap button{display:flex;gap:10px;align-items:flex-start;width:100%;text-align:left;background:none;border:0;border-bottom:1px dashed var(--line);padding:8px 2px;font:inherit;color:inherit;cursor:pointer}
.plotmap .pl{flex:none;min-width:86px;font-weight:700;font-size:.85rem;border-radius:999px;padding:2px 10px;text-align:center;background:hsl(var(--h,210) 80% 92%);color:hsl(var(--h,210) 60% 28%)}
.plotmap .pt{flex:1;min-width:0}.plotmap .pc{color:var(--muted);font-size:.8rem}
article.essay p.flash{animation:fl 1.2s}@keyframes fl{0%,60%{background:rgba(246,195,67,.45)}100%{background:transparent}}
.quizq{margin:10px 0;padding:10px;border-radius:12px;background:var(--paper)}.quizq .row{gap:6px;flex-wrap:wrap;margin-top:6px}
.quizq button[aria-pressed=true].ok{background:var(--good);color:#fff;border-color:var(--good)}.quizq button[aria-pressed=true].no{background:var(--bad);color:#fff;border-color:var(--bad)}
.morelike{display:grid;gap:8px;grid-template-columns:repeat(auto-fit,minmax(200px,1fr))}
.spinner{display:grid;gap:10px;grid-template-columns:repeat(auto-fit,minmax(220px,1fr))}
.slot{border:2px solid var(--line);border-radius:14px;padding:10px 12px;background:var(--card);display:flex;flex-direction:column;gap:6px;min-height:110px}
.slot .sv{font-size:1.15rem;font-weight:700;flex:1}.slot.spinning .sv{opacity:.4}.slot.lk{border-color:var(--blue);background:hsl(210 80% 96%)}
.memo .shown{font-size:1.3rem;line-height:1.6;padding:14px;border-radius:12px;background:var(--paper);min-height:3em}
.memo textarea{width:100%;min-height:90px;font:inherit;font-size:1.15rem;padding:10px;border:2px solid var(--line);border-radius:12px;background:var(--card);color:var(--ink);box-sizing:border-box}
.memo .diff span.ok{background:rgba(76,175,122,.25)}.memo .diff span.miss{background:rgba(229,83,75,.25);text-decoration:underline wavy}
.memo .bar{height:6px;background:var(--line);border-radius:6px;overflow:hidden}.memo .bar i{display:block;height:100%;background:var(--blue);transition:width linear}
@media print{header,.hero,.topline,#index,#secTabs,.tabbar,nav,.pager,button,.btn,.toast-pop,.mpop,.selsave,.legend,.prog,.findbox{display:none!important}
 body{background:#fff!important}#main{max-width:none!important;margin:0!important;padding:0!important}.chip{border:1px solid #999!important;background:#fff!important}
 article.essay mark{background:none!important;text-decoration:underline}.block,.card{break-inside:avoid;box-shadow:none!important}}
`;document.head.appendChild(st);

/* helpers */
function addW(t){t=String(t).replace(/\s+/g," ").trim();if(!t)return;const list=words();if(!list.includes(t)){list.push(t);lstore.set("wiw2-words-"+lang,list)}toast(t2().saved);markChips()}
const lvIdx=()=>({A:0,B:1,C:2}[stageOf()]||0);
const myLv=()=>ELV[lang][lvIdx()];

/* 1. level-aware library + essay of the day */
let lvInit={};
const _rl=renderLibrary;renderLibrary=function(){
  if(libState.lv&&!ELV[lang].includes(libState.lv))libState.lv="";
  const open=lstore.get("wiw2-essayopen-"+lang,"");
  if(!lvInit[lang]&&!open){lvInit[lang]=1;libState.lv=myLv();_rl();const lead=$("#main .head .lead");if(lead)lead.insertAdjacentHTML("afterend",'<p class="tip" style="margin-top:6px">'+esc(t2().mylevel)+'</p>');return}
  _rl()};
libHomeCard=function(){if(!ESS[lang].length)return null;const t=lt();
  const pool=ESS[lang].filter(e=>e.level===myLv());const P=pool.length?pool:ESS[lang];
  const unread=P.filter(e=>!eRead(e.id));const Q=unread.length?unread:P;
  const e=Q[Math.floor(seeded(today()+lang+"essay"+(LID||""))()*Q.length)];
  const c=el("section","block",'<h3>'+t.essayDay+'</h3><div class="card essday"><span class="tag">'+t.cats[e.cat]+' · '+e.level+'</span><h4 style="font-size:1.3rem">'+esc(e.title)+'</h4><p>'+esc(ePreview(e))+'</p><div class="row"><button class="btn small" data-e="'+e.id+'">'+(lang==="zh"?"读这篇":"Read it")+' →</button><button class="btn ghost small lib">'+t.libCard+' ('+ESS[lang].length+')</button></div></div>');
  c.addEventListener("click",ev=>{const b=ev.target.closest("[data-e]");if(b){lstore.set("wiw2-essayopen-"+lang,b.dataset.e);openUnit(lang+"-essays",true)}if(ev.target.closest(".lib")){lstore.set("wiw2-essayopen-"+lang,"");openUnit(lang+"-essays",true)}});return c};

/* 2–5 + 7: essay page additions */
let pop=null;function closePop(){if(pop){pop.remove();pop=null}}
document.addEventListener("keydown",ev=>{if(ev.key==="Escape")closePop()});
document.addEventListener("click",ev=>{if(pop&&!ev.target.closest(".mpop")&&!ev.target.closest("article.essay mark"))closePop()});
function showPop(mk){closePop();const t=t2();const c=(mk.className||"").split(/\s+/)[0];const txt=mk.textContent.trim();
  pop=el("div","mpop",'<b>'+esc(txt)+'</b><span class="tag">'+esc((lt().cls||{})[c]||"")+'</span> <span class="muted">'+esc(((CLSTIP[lang]||{})[c]||"").replace(/^[^:：]*[:：]\s*/,""))+'</span><div class="row">'+(canSpeak?'<button class="btn small hr">'+t.hear+'</button>':'')+'<button class="btn ghost small sv">'+t.save+'</button></div>');
  document.body.appendChild(pop);const r=mk.getBoundingClientRect();const w=Math.min(300,window.innerWidth-24);pop.style.width=w+"px";
  let left=r.left+window.scrollX;left=Math.max(12,Math.min(left,window.scrollX+window.innerWidth-w-12));pop.style.left=left+"px";pop.style.top=(r.bottom+window.scrollY+8)+"px";
  const h=pop.querySelector(".hr");if(h)h.onclick=()=>speak(txt);pop.querySelector(".sv").onclick=()=>{addW(txt);closePop()}}
const LAB_A={en:{open:"Beginning",build:"What happened",climax:"The problem",res:"What happened",end:"Ending"},zh:{open:"开头",build:"经过",climax:"遇到的问题",res:"经过",end:"结尾"}};
function plotLabels(n,paras,lv){const L=lv===0?LAB_A[lang]:t2().lab;if(n<=1)return [L.open];if(n===2)return [L.open,L.end];
  const len=paras.map(p=>p.replace(/<[^>]+>/g,"").length);let ci=1;for(let i=1;i<n-1;i++)if(len[i]>len[ci])ci=i;
  if(n>=5&&ci===n-2&&n-3>=1){/* keep a resolution paragraph if possible */}
  return paras.map((p,i)=>i===0?L.open:i===n-1?L.end:i===ci?L.climax:i<ci?L.build:L.res)}
const HUE={};HUE["Beginning"]=140;HUE["What happened"]=200;HUE["The problem"]=10;HUE["Ending"]=40;HUE["遇到的问题"]=10;HUE[T2.en.lab.open]=HUE[T2.zh.lab.open]=140;HUE[T2.en.lab.build]=HUE[T2.zh.lab.build]=200;HUE[T2.en.lab.climax]=HUE[T2.zh.lab.climax]=10;HUE[T2.en.lab.res]=HUE[T2.zh.lab.res]=270;HUE[T2.en.lab.end]=HUE[T2.zh.lab.end]=40;
function firstSentence(p){const s=p.replace(/<[^>]+>/g,"").trim();const m=lang==="zh"?s.match(/^[\s\S]*?[。！？…]+[”」]?/):s.match(/^[\s\S]*?[.!?…]+[”’"]?(\s|$)/);let f=(m?m[0]:s).trim();const lim=lang==="zh"?48:130;if(f.length>lim)f=f.slice(0,lim)+"…";return f}
function quizFor(e,host){const t=t2(),C=lt().cls;const ms=eMarks(e).filter(x=>x.t.length<=(lang==="zh"?40:110));
  const byc={};ms.forEach(x=>{(byc[x.cls]=byc[x.cls]||[]).push(x)});const cs=seededShuffle(Object.keys(byc),seeded(e.id+"q"));
  const qs=cs.slice(0,3).map(c=>{const x=byc[c][Math.floor(seeded(e.id+c)()*byc[c].length)];const others=seededShuffle(Object.keys(C).filter(k=>k!==c),seeded(e.id+c+"o")).slice(0,2);return {x,opts:seededShuffle([c].concat(others),seeded(e.id+c+"s"))}});
  if(qs.length<2){host.remove();return}
  const key=lang+"-game:essq:"+e.id;
  function draw(){host.innerHTML='<h4>'+t.quiz+'</h4><p class="muted">'+t.quizLead+'</p>'+qs.map((q,i)=>'<div class="quizq" data-i="'+i+'"><div>“'+esc(q.x.t.replace(/^[“”"‘’'「」\s]+|[“”"‘’'「」\s]+$/g,""))+'”</div><div class="row">'+q.opts.map(o=>'<button class="btn ghost small" data-o="'+o+'">'+esc(C[o])+'</button>').join("")+'</div></div>').join("")+'<p class="fb" aria-live="polite"></p>';
    const ans={};host.querySelectorAll(".quizq").forEach(d=>d.addEventListener("click",ev=>{const b=ev.target.closest("[data-o]");if(!b||ans[d.dataset.i]!=null)return;const q=qs[+d.dataset.i];const ok=b.dataset.o===q.x.cls;ans[d.dataset.i]=ok;
      b.setAttribute("aria-pressed","true");b.classList.add(ok?"ok":"no");if(!ok){const r=d.querySelector('[data-o="'+q.x.cls+'"]');r.setAttribute("aria-pressed","true");r.classList.add("ok")}
      if(Object.keys(ans).length===qs.length){const all=Object.values(ans).every(Boolean);const fb=host.querySelector(".fb");
        if(all){fb.textContent=t.quizWin;fb.className="fb good";giveStar(key,fb);refreshNav()}else{fb.innerHTML=esc(t.quizTry)+' <button class="btn ghost small ag">'+t.again+'</button>';fb.className="fb bad";fb.querySelector(".ag").onclick=draw}}}))}
  draw()}
const _re2=renderEssay;renderEssay=function(e){_re2(e);closePop();const t=t2();const m=$("#main");const art=m.querySelector("article.essay");if(!art)return;
  art.insertAdjacentHTML("beforebegin",'<p class="muted" style="font-size:.9rem;margin:4px 0">'+esc(t.tapTip)+'</p>');
  art.addEventListener("click",ev=>{const mk=ev.target.closest("mark");if(mk&&!(window.getSelection&&String(getSelection()).trim().length>2)){ev.stopPropagation();showPop(mk)}});
  const tools=m.querySelector(".row");
  if(tools){const pb=el("button","btn ghost small",t.plot);tools.appendChild(pb);
    const pr=el("button","btn ghost small","🖨 "+t.print);pr.onclick=()=>window.print();tools.appendChild(pr);
    let card=null;pb.onclick=()=>{if(card){card.remove();card=null;pb.textContent=t.plot;return}
      const labs=plotLabels(e.paras.length,e.paras,ELV[lang].indexOf(e.level));card=el("div","card plotmap",'<h4>'+t.plotH+'</h4><p class="muted">'+t.plotLead+'</p>'+e.paras.map((p,i)=>'<button data-p="'+i+'"><span class="pl" style="--h:'+HUE[labs[i]]+'">'+labs[i]+'</span><span class="pt"><span class="pc">'+(lang==="zh"?"第"+(i+1)+"段":"Para "+(i+1))+'</span> '+esc(firstSentence(p))+'</span></button>').join(""));
      art.before(card);pb.textContent=t.plotOff;card.scrollIntoView({block:"start",behavior:"smooth"});
      card.addEventListener("click",ev=>{const b=ev.target.closest("[data-p]");if(!b)return;const P=art.querySelectorAll("p")[+b.dataset.p];if(P){P.scrollIntoView({block:"center",behavior:"smooth"});P.classList.remove("flash");void P.offsetWidth;P.classList.add("flash")}})}}
  /* quick check quiz, before the done button row */
  const qhost=el("div","card");const doneRow=[...m.querySelectorAll(":scope > .row")].pop();if(doneRow)doneRow.before(qhost);else m.appendChild(qhost);quizFor(e,qhost);
  /* more like this */
  const same=ESS[lang].filter(x=>x.cat===e.cat&&x.id!==e.id);const sc=x=>(x.level===e.level?0:1)+(eRead(x.id)?2:0);
  const pick=seededShuffle(same,seeded(e.id+"more")).sort((a,b)=>sc(a)-sc(b)).slice(0,3);
  if(pick.length){const lc=lt();const box=el("section","block",'<h3>'+t.more+'</h3><div class="morelike">'+pick.map(x=>'<button class="esscard'+(eRead(x.id)?' isread':'')+'" data-e="'+x.id+'"><span class="tag">'+lc.cats[x.cat]+' · '+x.level+'</span><b>'+esc(x.title)+'</b><span class="pv">'+esc(ePreview(x))+'</span></button>').join("")+'</div>');
    box.addEventListener("click",ev=>{const b=ev.target.closest("[data-e]");if(b)openEssay(b.dataset.e)});const pg=m.querySelector(".pager");if(pg)pg.before(box);else m.appendChild(box)}
};

/* 7 + 8: print + "I read this today" on word-bank pages */
function readKey(id){return lang+"-read:"+id+":"+today()}
function readsToday(){const d=":"+today();return Object.keys(stars).filter(k=>k.startsWith(lang+"-read:")&&k.endsWith(d)).length}
const _ou3=openUnit;openUnit=function(id,scroll){closePop();_ou3(id,scroll);
  if(!readIds().includes(id)||!unitById(id))return;const t=t2();const m=$("#main");
  const head=m.querySelector(".head");if(head&&!head.querySelector(".prbtn")){const pr=el("button","btn ghost small prbtn","🖨 "+t.print);pr.onclick=()=>window.print();const row=head.querySelector(".favbtn");if(row)row.after(pr);else head.appendChild(pr)}
  if(!m.querySelector(".readtick")){const box=el("div","block readtick",'<div class="row" style="justify-content:center"></div>');const b=el("button","btn",hasStar(readKey(id))?t.readDone:t.read);b.disabled=hasStar(readKey(id));
    b.onclick=()=>{if(readsToday()>=5){toast(t.readMax);return}giveStar(readKey(id),b);b.textContent=t.readDone;b.disabled=true;refreshNav()};
    box.firstChild.appendChild(b);const pg=m.querySelector(".pager");if(pg)pg.before(box);else m.appendChild(box)}};

/* 6. story spinner */
const SPIN={en:{who:["Wei Ming, who is always in a hurry","Aisyah, the class's best artist","a shy new classmate called Ravi","my little brother, aged four","Grandpa, who loves fixing things","Mei Ling, a chess champion","Daniel, who never stops talking","Nenek, who speaks only Malay","a bus captain on his last day of work","my best friend Hui Min","Arjun, the fastest runner in P3","our relief teacher, Mr Tan","a lost toddler in a yellow raincoat","the uncle at the drinks stall","my cousin from Australia","Coco, our curious poodle","Farah, who is scared of the dark","the school's new cleaner, Auntie Siti"],
  where:["the void deck after a storm","a crowded MRT train","the school library at recess","a hawker centre on a Sunday morning","the playground at dusk","East Coast Park","the Botanic Gardens","Changi Airport","a hospital waiting room","the school hall during a concert","the swimming pool","a snowy hill in Japan","the lift of our HDB block","Chinatown during Chinese New Year","the science room","a night market","a ferry to Pulau Ubin","the badminton court"],
  prob:["something precious goes missing","someone is blamed for something they did not do","a promise is about to be broken","a pet escapes","a performance goes wrong","two friends quarrel","someone is lost","a secret is accidentally told","a heavy rainstorm traps everyone","a competition is about to be lost","something gets broken","a younger child gets hurt (just a scrape)","the wrong bag is taken home","an important letter is never delivered","someone is left out","a lie grows bigger and bigger","a power cut","a dare goes too far"],
  feel:["nervous","guilty","proud","embarrassed","jealous","determined","relieved","lonely","frustrated","grateful","curious","disappointed","hopeful","worried","brave","sorry"],
  twist:["the 'villain' was trying to help all along","the lost thing was never lost","an old photo explains everything","a stranger turns out to be family","the youngest person solves it","the rain stops at the perfect moment","the note was meant for someone else","it was all a misunderstanding about one word","the prize goes to someone unexpected","the pet leads them to the answer","a grandparent tells a story that changes everything","the mistake becomes the best part of the day"]},
 zh:{who:["做事总是急急忙忙的伟明","班上最会画画的爱莎","害羞的新同学拉维","四岁的弟弟","喜欢修东西的爷爷","下棋冠军美玲","话特别多的丹尼尔","只会说马来话的外婆","最后一天上班的巴士司机","我的好朋友慧敏","跑得最快的阿俊","代课老师陈老师","穿黄色雨衣、走丢了的小朋友","饮料摊的安哥","从澳大利亚回来的表哥","好奇的贵宾犬可可","怕黑的法拉","学校新来的清洁工西蒂阿姨"],
  where:["暴风雨后的组屋楼下","挤满人的地铁车厢","休息时间的学校图书馆","星期天早上的小贩中心","黄昏时的游乐场","东海岸公园","植物园","樟宜机场","医院的候诊室","音乐会时的学校礼堂","游泳池","日本的雪山上","组屋的电梯里","农历新年的牛车水","科学实验室","夜市","去乌敏岛的渡轮上","羽毛球场"],
  prob:["心爱的东西不见了","有人被冤枉了","一个承诺快要做不到了","宠物跑掉了","表演出了差错","两个好朋友吵架了","有人走丢了","不小心说出了一个秘密","一场大雨把大家困住了","比赛眼看就要输了","有东西被打破了","一个小朋友擦伤了膝盖","拿错了书包回家","一封重要的信没有送到","有人被冷落了","一个谎越说越大","突然停电了","一个打赌玩过了头"],
  feel:["紧张","内疚","骄傲","难为情","嫉妒","下定决心","松了一口气","孤单","沮丧","感激","好奇","失望","充满希望","担心","勇敢","后悔"],
  twist:["原来“坏人”一直在帮忙","丢了的东西根本没丢","一张旧照片解开了谜团","陌生人原来是亲戚","年纪最小的人想出了办法","雨在最关键的时刻停了","纸条原来是写给别人的","原来是一个字引起的误会","奖品落到了意想不到的人手上","宠物带大家找到了答案","爷爷奶奶讲的一个故事改变了一切","那个错误竟然成了最美好的部分"]}};
const SK=["who","where","prob","feel","twist"];
PAGES.spinner={sec:"practice",icon:"comet",title:{en:"Story spinner",zh:"故事转盘"},render(m){const t=t2();
  pageHead(m,lang+"-spinner",lang==="zh"?"练习":"Practice",t.spin,t.spinLead);
  const S=SPIN[lang];let cur=lstore.get("wiw2-spin-"+lang,null)||SK.map(k=>S[k][0]);let lk=SK.map(()=>false);
  const box=el("div","block");box.innerHTML='<div class="spinner">'+SK.map((k,i)=>'<div class="slot" data-i="'+i+'"><span class="tag">'+t.slots[i]+'</span><span class="sv"></span><button class="btn ghost small lkb">🔓 '+t.lock+'</button></div>').join("")+'</div><div class="row" style="margin-top:12px;gap:8px;flex-wrap:wrap"><button class="btn spinb">'+t.spinBtn+'</button><button class="btn ghost wr">'+t.writeIt+'</button>'+(canSpeak?'<button class="btn ghost small sp">▶</button>':'')+'</div><p class="card sum" style="margin-top:12px"></p>';
  m.appendChild(box);
  function sentence(){return SK.map((k,i)=>t.slots[i]+(lang==="zh"?"：":": ")+cur[i]).join(lang==="zh"?"；":" · ")}
  function draw(){box.querySelectorAll(".slot").forEach((s,i)=>{s.querySelector(".sv").textContent=cur[i];s.classList.toggle("lk",lk[i]);s.querySelector(".lkb").textContent=(lk[i]?"🔒 "+t.locked:"🔓 "+t.lock)});box.querySelector(".sum").textContent=sentence()}
  box.querySelectorAll(".lkb").forEach((b,i)=>b.onclick=()=>{lk[i]=!lk[i];draw()});
  box.querySelector(".spinb").onclick=()=>{const slots=box.querySelectorAll(".slot");let n=0;slots.forEach((s,i)=>{if(!lk[i])s.classList.add("spinning")});
    const iv=setInterval(()=>{SK.forEach((k,i)=>{if(!lk[i])cur[i]=S[k][Math.floor(Math.random()*S[k].length)]});draw();if(++n>=8){clearInterval(iv);slots.forEach(s=>s.classList.remove("spinning"));lstore.set("wiw2-spin-"+lang,cur)}},70)};
  const sp=box.querySelector(".sp");if(sp)sp.onclick=()=>speak(sentence());
  box.querySelector(".wr").onclick=()=>{lstore.set("wiw2-topic-"+lang,"spin:"+sentence());const su=DATA[lang].find(u=>u.blocks.some(x=>x.type==="studio"));if(su)openUnit(su.id,true)};
  draw()}};
const _tl2=topicLabel;topicLabel=function(v){if(v&&v.startsWith("spin:"))return t2().spinTopic+v.slice(5);return _tl2(v)};
const _tc2=topicForCoach;topicForCoach=function(v){if(v&&v.startsWith("spin:"))return lang==="zh"?"一篇记叙文，故事设定："+v.slice(5):"A story with this set-up: "+v.slice(5);return _tc2(v)};
const _st2=R.studio;R.studio=(b,ctx)=>{const cur=lstore.get("wiw2-topic-"+lang,"");const w=_st2(b,ctx);const sel=w.querySelector("select");
  if(sel&&cur.startsWith("spin:")){const o=document.createElement("option");o.value=cur;o.textContent=topicLabel(cur);sel.prepend(o);sel.value=cur;lstore.set("wiw2-topic-"+lang,cur);const ideas=w.querySelector(".ideas");if(ideas)ideas.textContent=cur.slice(5)}
  return w};

/* 9. look, hide, write */
function memoPool(){const lv=lvIdx();if(lv===0){const u=unitById(lang==="zh"?"zh-chuxue":"en-firstwords");const P=new Set();if(u)u.blocks.forEach(b=>{if(b.type==="chips")b.groups.forEach(g=>[].concat(g.words,g.ex?[g.ex]:[]).forEach(w=>{w=String(w).replace(/<[^>]+>/g,"").trim();if(/[.!?。！？]$/.test(w)&&w.length>=(lang==="zh"?5:12)&&w.length<=(lang==="zh"?16:48)&&!/[“”"]/.test(w))P.add(w)}))});if(P.size>=8)return [...P]}const lim=lang==="zh"?[[8,18],[10,26],[12,34]][lv]:[[25,70],[35,100],[45,130]][lv];
  const out=new Set();ESS[lang].forEach(e=>{if(lv<2&&ELV[lang].indexOf(e.level)>lv+1)return;eMarks(e).forEach(x=>{if(!["sh","fig","s","id"].includes(x.cls))return;const s=x.t.trim();if(s.length>=lim[0]&&s.length<=lim[1]&&!/[“”"]/.test(s))out.add(s)})});return [...out]}
function norm(s){return lang==="zh"?s.replace(/[\s，。！？、；：,.!?;:'"“”‘’…—-]/g,""):s.toLowerCase().replace(/[’']/g,"'").replace(/[^a-z0-9' ]/g," ").replace(/\s+/g," ").trim()}
function diffHTML(target,typed){const A=lang==="zh"?[...norm(target)]:norm(target).split(" "),B=lang==="zh"?[...norm(typed)]:norm(typed).split(" ").filter(Boolean);
  const n=A.length,mm=B.length,dp=Array.from({length:n+1},()=>new Array(mm+1).fill(0));for(let i=n-1;i>=0;i--)for(let j=mm-1;j>=0;j--)dp[i][j]=A[i]===B[j]?dp[i+1][j+1]+1:Math.max(dp[i+1][j],dp[i][j+1]);
  const keep=new Array(n).fill(false);let i=0,j=0;while(i<n&&j<mm){if(A[i]===B[j]){keep[i]=true;i++;j++}else if(dp[i+1][j]>=dp[i][j+1])i++;else j++}
  const sep=lang==="zh"?"":" ";return {html:A.map((w,k)=>'<span class="'+(keep[k]?"ok":"miss")+'">'+esc(w)+'</span>').join(sep),score:n?dp[0][0]/Math.max(n,mm):0}}
PAGES.memo={sec:"practice",icon:"eye",title:{en:"Look, hide, write",zh:"看一看，写一写"},render(m){const t=t2();
  pageHead(m,lang+"-memo",lang==="zh"?"练习":"Practice",t.memo,t.memoLead);
  const pool=memoPool();const box=el("div","block memo");m.appendChild(box);
  let items=[],k=0,good=0;
  function newRound(){items=seededShuffle(pool,()=>Math.random()).slice(0,5);k=0;good=0;show()}
  function show(){const s=items[k];const auto=lvIdx()>0;const secs=Math.max(12,Math.round(lang==="zh"?s.length*0.6:s.split(" ").length*1.5));
    box.innerHTML='<p class="tag">'+(lang==="zh"?t.round+(k+1)+t.of+items.length+"句":t.round+" "+(k+1)+" "+t.of+" "+items.length)+'</p><div class="shown">'+esc(s)+'</div><div class="bar"><i style="width:100%"></i></div><div class="row" style="margin-top:10px;gap:8px">'+(canSpeak?'<button class="btn ghost small hr">'+t2().hearIt+'</button>':'')+'<button class="btn rd">'+t.ready+'</button></div>';
    const bar=box.querySelector(".bar i");if(auto)requestAnimationFrame(()=>{bar.style.transition="width "+secs+"s linear";bar.style.width="0%"});else box.querySelector(".bar").hidden=true;
    const to=auto?setTimeout(hide,secs*1000):0;const hr=box.querySelector(".hr");if(hr)hr.onclick=()=>speak(s);box.querySelector(".rd").onclick=()=>{clearTimeout(to);hide()}}
  function hide(){if(!box.isConnected)return;const s=items[k];
    box.innerHTML='<p class="tag">'+(lang==="zh"?t.round+(k+1)+t.of+items.length+"句":t.round+" "+(k+1)+" "+t.of+" "+items.length)+'</p><textarea placeholder="'+esc(t.typeHere)+'"></textarea><div class="row" style="margin-top:10px;gap:8px"><button class="btn ck">'+t.check+'</button><button class="btn ghost small pk">'+t.peek+'</button></div><div class="res"></div>';
    const ta=box.querySelector("textarea");ta.focus();
    box.querySelector(".pk").onclick=()=>{const r=box.querySelector(".res");r.innerHTML='<div class="shown">'+esc(s)+'</div>';setTimeout(()=>{if(r.isConnected&&!r.dataset.done)r.innerHTML=""},3000)};
    box.querySelector(".ck").onclick=()=>{const d=diffHTML(s,ta.value);const r=box.querySelector(".res");r.dataset.done=1;const ok=d.score>=0.9;if(ok)good++;
      r.innerHTML='<p class="fb '+(d.score>=0.9?"good":"bad")+'">'+(d.score>=0.999?t.correct:d.score>=0.9?t.close:t.notyet)+'</p><div class="shown diff">'+d.html+'</div><div class="row" style="margin-top:10px"><button class="btn nx">'+t.next+'</button></div>';
      box.querySelector(".ck").disabled=true;box.querySelector(".pk").disabled=true;r.querySelector(".nx").onclick=()=>{k++;if(k<items.length)show();else finish()}}}
  function finish(){const won=good>=4;let msg=t.score+" "+good+" / "+items.length;
    if(won){let n=0;while(n<3&&hasStar(lang+"-game:memo:"+today()+":"+n))n++;if(n<3){giveStar(lang+"-game:memo:"+today()+":"+n,box);msg+=" ★";refreshNav()}}
    box.innerHTML='<h3>'+t.done+'</h3><p class="fb '+(won?"good":"")+'">'+msg+'</p><button class="btn ag">'+t.again2+'</button>';box.querySelector(".ag").onclick=newRound}
  if(pool.length<5){box.innerHTML='<p class="muted">—</p>';return}newRound()}};

/* 10. switching language keeps your place */
const TWIN={"en-places":"zh-scenery","en-nature":"zh-ziran","en-climax":"zh-gaochao","en-thoughts":"zh-dubai","en-talk":"zh-duihua","en-scenes":"zh-changjing","en-firstwords":"zh-chuxue",
 "en-perform":"zh-biaoyan","en-science":"zh-kexue","en-festivals":"zh-jieri","en-travel":"zh-lvxing","en-sport":"zh-yundong","en-health":"zh-kanbing","en-food":"zh-meishi","en-homelife":"zh-jiating",
 "en-school":"zh-xiaoyuan","en-animals":"zh-dongwu","en-reflect":"zh-ganwu","en-speech":"zh-shuohua","en-faces":"zh-shentai","en-body":"zh-shentai","en-movement":"zh-dongzuo2","en-actionverbs":"zh-actionwords",
 "en-soundwords":"zh-xiangsheng","en-similes":"zh-biyu","en-sglife":"zh-xinjiapo","en-sensephrases":"zh-wugan2","en-golden":"zh-haoju","en-idioms2":"zh-chengyu2","en-wordswap":"zh-goodwords","en-charbank":"zh-renwu",
 "en-sentencebank":"zh-miaoxie","en-confused":"zh-yihun","en-formal":"zh-shiyong","en-wordfamilies":"zh-zizu","en-adjectives":"zh-sizi","en-wordpairs":"zh-jinfan","en-character":"zh-xinli"};
const RTWIN={};Object.keys(TWIN).forEach(k=>{if(!RTWIN[TWIN[k]])RTWIN[TWIN[k]]=k});
function exists(id){const l=id.slice(0,2);return !!(DATA[l]&&DATA[l].some(u=>u.id===id))||PAGES[id.slice(3)]||[l+"-today",l+"-home",l+"-essays",l+"-essayphrases"].includes(id)}
function twinOf(id,to){if(!id)return to+"-home";const m=TWIN[id]||RTWIN[id];if(m&&m.startsWith(to+"-")&&exists(m))return m;const s=to+id.slice(2);return exists(s)?s:to+"-home"}
document.querySelectorAll(".lang button").forEach(b=>b.onclick=()=>{if(b.dataset.lang===lang)return;const to=b.dataset.lang;
  let id=current&&current.id;if(id===lang+"-essays"){lstore.set("wiw2-essayopen-"+to,"")}setLang(to,twinOf(id,to))});
})();
