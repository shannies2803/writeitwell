/* ===== round 13: fixes from the child and expert audits (runs inside the engine IIFE, after features2.js) ===== */
(function(){
const st=document.createElement("style");st.textContent=`
[hidden]{display:none!important}
@media (min-width:900px){nav.index[hidden]{display:grid!important}}
html body .eyebrow{text-transform:none;letter-spacing:.02em;font-size:.9rem}
html body .tag{text-transform:none;letter-spacing:.02em;font-size:.82rem}
html body .listen{min-height:40px;padding:6px 14px}
#main p:not([class]),#main li{font-size:1.0625rem}
#main input[type=checkbox]{width:22px;height:22px}
.dotsbar button{min-width:40px;min-height:40px}
@media (max-width:700px){
 #libcat,#liblv{flex-wrap:nowrap;overflow-x:auto;padding-bottom:6px;scrollbar-width:thin}
 #libcat .pill,#liblv .pill{flex:none}
 html:not(.athome) .hero .heroart,html:not(.athome) .hero h1,html:not(.athome) .hero .swap{display:none}
 html:not(.athome) .hero .wrap{padding-top:8px;padding-bottom:8px}
 html:not(.athome) .hero .level{margin-top:4px}
 .tbl.stack table,.tbl.stack tbody,.tbl.stack tr,.tbl.stack td{display:block;width:auto}
 .tbl.stack thead{display:none}
 .tbl.stack table{min-width:0}
 .tbl.stack td,.tbl.stack td.weak{white-space:normal}
 .tbl.stack{overflow:visible}
 .tbl.stack tr{border:1px solid var(--rule);border-radius:12px;padding:8px 10px;margin:0 0 10px;background:var(--card)}
 .tbl.stack td{border:0;padding:3px 0}
 .tbl.stack td[data-l]::before{content:attr(data-l);display:inline-block;width:100%;font-size:.75rem;font-weight:700;color:var(--muted)}
}
.tbl{min-width:0;max-width:100%}
.jumpbar{position:sticky;top:0;z-index:4;background:var(--paper,#fff);padding:6px 0;margin:4px 0 8px}
.jumpbar select{width:100%;font:inherit;padding:8px 10px;border-radius:10px;border:1.5px solid var(--rule);background:var(--card);color:var(--ink)}
.startcard{border:2px solid var(--pencil,#F6C343);border-radius:16px;padding:14px;background:color-mix(in srgb,var(--pencil,#F6C343) 18%,var(--card))}
.lvbadge{display:inline-block;font-size:.72rem;font-weight:700;border-radius:999px;padding:1px 8px;margin-left:6px;vertical-align:middle;background:hsl(var(--h) 80% 90%);color:hsl(var(--h) 60% 28%)}
.picked{display:grid;gap:8px;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));margin:6px 0 14px}
.navclose{display:none}
@media (max-width:899px){.navclose{display:block;position:sticky;top:0;margin-left:auto;z-index:2}}
.voicewarn{border:2px solid var(--bad);border-radius:12px;padding:10px 12px;margin:8px 0;background:color-mix(in srgb,var(--bad) 10%,var(--card))}
.chip[data-py]::before{content:attr(data-py);display:block;font-size:.72em;font-weight:400;color:var(--muted);line-height:1.2}
`;document.head.appendChild(st);
const zh=()=>lang==="zh";
const stA=()=>stageOf()==="A";

/* kid-friendly labels */
Object.assign(L10.en.cls,{c:"Joining words",fig:"Picture words (similes and more)",id:"Golden phrases",s:"Five senses",sh:"Show, don't tell",f:"Feeling words",d:"Dialogue"});
Object.assign(L10.en,{hlOn:"Hide colours",hlOff:"Show colours"});Object.assign(L10.zh,{hlOn:"隐藏颜色",hlOff:"显示颜色"});

/* paths and icons for the expert's new lessons */
Object.assign(ICONMAP,{firststory:"pencil",picseries:"pictures",kantu:"pictures",yiduan:"paragraph",xieren:"person"});
function setPath(l,k,arr){PATHS[l][k]=arr.filter(id=>DATA[l].some(u=>u.id===id))}
setPath("en","A",["en-firststory","en-picseries","en-picstories","en-firstwords","en-openings","en-feelings","en-senses","en-wordswap","en-dialogue","en-punctuation","en-actionverbs","en-showtell","en-ladders","en-spelling","en-warmups","en-starters","en-models3","en-studio"]);
{const B=PATHS.en.B.slice();const ins=(after,id)=>{if(B.includes(id))return;const i=B.indexOf(after);B.splice(i<0?B.length:i+1,0,id)};ins("en-plan","en-picseries");ins("en-dialogue","en-punctuation");const mi=B.indexOf("en-models");if(!B.includes("en-walkthrough"))B.splice(mi<0?B.length:mi,0,"en-walkthrough");setPath("en","B",B)}
setPath("zh","A",["zh-kantu","zh-chuxue","zh-picstories","zh-feelings","zh-actionwords","zh-reduplication","zh-measure","zh-dialogue","zh-punctuation","zh-chars","zh-ladders","zh-warmups","zh-models3","zh-studio"]);
{const B=PATHS.zh.B.slice();const ins=(after,id,before)=>{if(B.includes(id))return;const i=B.indexOf(after);if(before)B.splice(i<0?B.length:i,0,id);else B.splice(i<0?B.length:i+1,0,id)};ins("zh-paragraphs","zh-yiduan");ins("zh-describe","zh-xieren",true);setPath("zh","B",B);
 const C=PATHS.zh.C.slice();if(!C.includes("zh-xieren")){const i=C.indexOf("zh-describe");C.splice(i<0?C.length:i,0,"zh-xieren")}setPath("zh","C",C)}

/* tables stack into cards on phones */
const _tb=R.table;R.table=b=>{const w=_tb(b);const head=(b.head||[]).map(h=>String(h).replace(/<[^>]+>/g,""));
  if(head.length&&head.length<=4){w.classList.add("stack");w.querySelectorAll("tbody tr").forEach(tr=>[...tr.children].forEach((td,i)=>{if(head[i])td.setAttribute("data-l",head[i])}))}return w};

/* writing studio: word target by level */
const TARGET={en:{A:50,B:150,C:250},zh:{A:100,B:250,C:400}};
const _st3=R.studio;R.studio=(b,ctx)=>_st3(Object.assign({},b,{minWords:TARGET[lang][stageOf()]||b.minWords}),ctx);

/* feelings picker: show the chosen card; fewer faces for P1–P2 */
const _wb=R.wordbank;R.wordbank=b=>{const w=_wb(b);const pills=w.querySelector(".pills");const out=pills&&pills.nextElementSibling;
  if(pills&&out)pills.addEventListener("click",ev=>{if(ev.target.closest(".pill"))setTimeout(()=>out.scrollIntoView({block:"start",behavior:"smooth"}),30)});
  if(pills&&stA()&&b.items.length>12){const ps=[...pills.querySelectorAll(".pill")];ps.slice(10).forEach(p=>p.hidden=true);
    const more=el("button","btn ghost small",zh()?"更多心情 ▾":"More feelings ▾");more.onclick=()=>{ps.forEach(p=>p.hidden=false);more.remove()};pills.after(more)}
  return w};

/* pinyin for P1–P2 and the 低年级 bank */
let pyP=null;function loadPy(){if(window.pinyinPro)return Promise.resolve();if(pyP)return pyP;pyP=new Promise((res,rej)=>{const s=document.createElement("script");s.src="https://cdn.jsdelivr.net/npm/pinyin-pro@3.26.0/dist/index.js";s.onload=()=>window.pinyinPro?res():rej();s.onerror=()=>{pyP=null;rej()};document.head.appendChild(s)});return pyP}
function pyOn(){return store.get("wiw2-py",true)}
function addPinyin(root){if(!zh()||!pyOn())return;loadPy().then(()=>{if(!root.isConnected)return;const P=window.pinyinPro;
  root.querySelectorAll(".chip:not([data-py])").forEach(c=>{const t=c.textContent.trim();if(/[一-鿿]/.test(t)&&t.length<=12)c.setAttribute("data-py",P.pinyin(t))});
  root.querySelectorAll(".ex:not(.pyd), .dots li:not(.pyd)").forEach(x=>{if(x.querySelector("ruby")||!/[一-鿿]/.test(x.textContent)||x.textContent.length>60)return;try{x.innerHTML=x.innerHTML.split(/(<[^>]+>)/).map(seg=>seg.startsWith("<")?seg:(/[一-鿿]/.test(seg)?P.html(seg):seg)).join("");x.classList.add("pyd")}catch(e){}})}).catch(()=>{})}
function needPy(id){return zh()&&(id==="zh-chuxue"||id==="zh-kantu"||(stA()&&(readIds().includes(id)||id==="zh-home"||id==="zh-memo")))}
$("#pyBtn").addEventListener("click",()=>setTimeout(()=>{if(current&&needPy(current.id)){if(pyOn())addPinyin($("#main"));else{$("#main").querySelectorAll(".chip[data-py]").forEach(c=>c.removeAttribute("data-py"))}}},50));

/* level badges for word banks (suggested starting level) */
const LV_A=new Set(["firstwords","chuxue","feelings","senses","actionverbs","soundwords","faces","body","animals","dongwu","food","meishi","homelife","jiating","school","xiaoyuan","sport","yundong","festivals","jieri","travel","lvxing","places","scenery","nature","ziran","xiangsheng","reduplication","measure","adjectives","movement","perform","biaoyan","science","kexue","health","kanbing","talk","duihua","people","sglife","xinjiapo","wugan2","sensephrases","actionwords","dongzuo2","shentai","similes","biyu"]);
const LV_C=new Set(["idioms2","chengyu2","xiehouyu","sayings","formal","shiyong","confused","yihun","reflect","ganwu","golden","haoju","sentencebank","miaoxie","jinfan","sizi","patterns","wordfamilies","zizu","bank"]);
function bankLv(id){const k=id.replace(/^(en|zh)-/,"");return LV_A.has(k)?0:LV_C.has(k)?2:1}
const LVTXT={en:["P1+","P3+","P5+"],zh:["小一起","小三起","小五起"]};

/* home: start-here card for P1–P2, badges, level-aware wording */
const _rh=renderHome;renderHome=function(){_rh();const m=$("#main");
  m.querySelectorAll(".bankcard").forEach(c=>{const b=c.querySelector("[data-go]");if(!b)return;const lv=bankLv(b.dataset.go);const bb=c.querySelector(".bh b");if(bb&&!bb.querySelector(".lvbadge"))bb.insertAdjacentHTML("beforeend",'<span class="lvbadge" style="--h:'+[140,210,30][lv]+'">'+LVTXT[lang][lv]+'</span>')});
  if(stA()){const fid=zh()?"zh-chuxue":"en-firstwords";if(unitById(fid)&&!m.querySelector(".startcard")){const u=unitById(fid);
      const nm=(LEARNERS.find(x=>x.id===LID)||{}).name||"";
      const c=el("section","block startcard",'<h3>'+(zh()?"从这里开始"+(nm?"，"+esc(nm):"")+"！✏️":"Start here"+(nm?", "+esc(nm):"")+"! ✏️")+'</h3><p>'+esc(u.title)+'</p><button class="btn" data-go="'+fid+'">'+(zh()?"去读一读 →":"Let's read →")+'</button>');
      c.querySelector("button").onclick=()=>openUnit(fid,true);const head=m.querySelector(".head");if(head)head.after(c);else m.prepend(c)}
    const t5=m.querySelector(".try5 p.muted, .try5 .muted");if(t5)t5.textContent=zh()?"挑一个词，用它大声说一句话。":"Pick one word. Say a sentence with it out loud.";
    addPinyin(m)}};

/* every page: compact phone header, jump list on long banks, pinyin, drawer */
const _ou4=openUnit;openUnit=function(id,scroll){_ou4(id,scroll);const pid=(current&&current.id)||id;
  document.documentElement.classList.toggle("athome",pid===lang+"-home");
  const m=$("#main");
  if(readIds().includes(pid)&&unitById(pid)){const hs=[...m.querySelectorAll(":scope h3, :scope .block > h3, :scope section > h3")].filter(h=>h.textContent.trim());
    if(hs.length>=12&&!m.querySelector(".jumpbar")){hs.forEach((h,i)=>h.id="jh"+i);const jb=el("div","jumpbar",'<select aria-label="'+(zh()?"跳到":"Jump to")+'"><option value="">'+(zh()?"📑 跳到……":"📑 Jump to…")+'</option>'+hs.map((h,i)=>'<option value="jh'+i+'">'+esc(h.textContent.trim().slice(0,60))+'</option>').join("")+'</select>');
      jb.querySelector("select").onchange=ev=>{const t=document.getElementById(ev.target.value);if(t)t.scrollIntoView({block:"start",behavior:"smooth"});ev.target.value=""};
      const head=m.querySelector(".head");if(head)head.after(jb);else m.prepend(jb)}}
  if(needPy(pid))addPinyin(m);
  if(pid===lang+"-dictation")voiceCheck(m)};

/* dictation: warn when the device has no voice for this language */
function voiceCheck(m){if(!canSpeak){warn();return}let tries=0;(function chk(){const vs=speechSynthesis.getVoices();if(!vs.length&&tries++<10){setTimeout(chk,200);return}
  const ok=vs.some(v=>zh()?/^(zh|cmn)/i.test(v.lang):/^en/i.test(v.lang));if(!ok)warn()})();
  function warn(){if(m.querySelector(".voicewarn"))return;const w=el("div","voicewarn",zh()?"这台设备不能把词语读出来，所以听写没法进行。请大人在设备的“设置”里加上中文语音，或者换一台设备。":"This device can’t read words out loud, so dictation won’t work here. Ask a grown-up to add a voice in the device’s settings, or try another device.");const head=m.querySelector(".head");if(head)head.after(w);else m.prepend(w)}}

/* essays: Back returns to the list, at the same place; picked-for-you; button emphasis */
let libY=0;
const _oe=openEssay;openEssay=function(id){if(current&&current.id===lang+"-essays"&&!document.querySelector("article.essay"))libY=window.scrollY;_oe(id)};
const _re3=renderEssay;renderEssay=function(e){_re3(e);const m=$("#main");
  try{if(!(history.state&&history.state.essay===e.id))history.pushState({essay:e.id},"","#"+lang+"-essays")}catch(x){}
  const row=m.querySelector(".row");if(row){const bs=[...row.querySelectorAll("button")];const hb=bs[0];if(hb)hb.className="btn ghost small";const ra=bs.find(b=>/Read along|跟读/.test(b.textContent));if(ra)ra.className="btn small"}};
window.addEventListener("popstate",ev=>{if(current&&current.id===lang+"-essays"&&location.hash==="#"+lang+"-essays"){const s=ev.state;if(s&&s.essay&&EIDX[s.essay]){lstore.set("wiw2-essayopen-"+lang,s.essay);_re3(EIDX[s.essay])}else if(document.querySelector("article.essay")){lstore.set("wiw2-essayopen-"+lang,"");renderLibrary();setTimeout(()=>window.scrollTo(0,libY),30)}}});
const _rl3=renderLibrary;renderLibrary=function(){_rl3();const m=$("#main");if(m.querySelector("article.essay")||m.querySelector(".picked"))return;
  const pool=ESS[lang].filter(e=>e.level===ELV[lang][{A:0,B:1,C:2}[stageOf()]||0]&&!eRead(e.id));
  const pick=seededShuffle(pool,seeded(today()+lang+"picked"+(LID||""))).slice(0,3);if(!pick.length)return;const lc=lt();
  const box=el("section","block",'<h3>'+(zh()?"为你挑选的范文":"Picked for you")+'</h3><div class="picked">'+pick.map(x=>'<button class="esscard" data-e="'+x.id+'"><span class="tag">'+lc.cats[x.cat]+' · '+x.level+'</span><b>'+esc(x.title)+'</b><span class="pv">'+esc(ePreview(x))+'</span></button>').join("")+'</div>');
  box.addEventListener("click",ev=>{const b=ev.target.closest("[data-e]");if(b)openEssay(b.dataset.e)});const bar=m.querySelector(".head");if(bar)bar.after(box)};

/* lessons drawer: close button and Escape */
const nav=$("#index");if(nav&&!nav.querySelector(".navclose")){const cb=el("button","btn ghost small navclose",zh()?"✕ 关闭":"✕ Close");cb.onclick=()=>{nav.hidden=true;$("#menuBtn").setAttribute("aria-expanded","false")};nav.prepend(cb)}
const _bn=buildNav;buildNav=function(){_bn.apply(this,arguments);const n=$("#index");if(n&&!n.querySelector(".navclose")){const cb=el("button","btn ghost small navclose",zh()?"✕ 关闭":"✕ Close");cb.onclick=()=>{n.hidden=true;$("#menuBtn").setAttribute("aria-expanded","false")};n.prepend(cb)}};
document.addEventListener("keydown",ev=>{if(ev.key!=="Escape")return;const n=$("#index");if(n&&!n.hidden&&window.matchMedia("(max-width:899px)").matches){n.hidden=true;$("#menuBtn").setAttribute("aria-expanded","false")}});
document.documentElement.classList.toggle("athome",!current||current.id===lang+"-home");
})();
