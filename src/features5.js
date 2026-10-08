/* ===== round 15: hosted-site improvements (runs inside the engine IIFE, last module) ===== */
(function(){
const zh=()=>lang==="zh";const stA=()=>stageOf()==="A";
const T5={en:{update:"A new version of the site is ready.",reload:"Update now",offline:"Saved for offline use – the site now works without internet.",
  copyLink:"🔗 Copy link",copied:"Link copied – paste it in a message.",sound:"Sound effects",harder:"Harder idioms and sayings (P3 and up) – tap to show",
  moveTitle:"Move progress to another device",moveLead:"Save a progress file here, then open it on the other device (iPad, laptop…). Spelling, Vocab & Grammar, stars and saved work all move across.",
  saveFile:"⬇ Save progress file",loadFile:"⬆ Load progress file",loaded:"Progress loaded!",badFile:"That file didn't work – is it a Write It Well progress file?"},
 zh:{update:"网站有新版本了。",reload:"马上更新",offline:"已保存，没有网络也能使用。",
  copyLink:"🔗 复制链接",copied:"链接已复制，可以发给别人。",sound:"音效",harder:"比较难的成语和俗语（小三以上）——点一下打开",
  moveTitle:"把进度搬到另一台设备",moveLead:"在这里保存进度文件，再到另一台设备（iPad、电脑……）打开。听写、词语与语法、星星和保存的作品都会一起搬过去。",
  saveFile:"⬇ 保存进度文件",loadFile:"⬆ 打开进度文件",loaded:"进度已载入！",badFile:"这个文件不能用，它是“好好写作文”的进度文件吗？"}};
const t5=()=>T5[lang];

/* ---------- 1. backups include every newer kind of progress ---------- */
["wiw2-spell-en","wiw2-spell-zh","wiw2-vg-en","wiw2-vg-zh","wiw2-did-en","wiw2-did-zh","wiw2-act","wiw2-portfolio-en","wiw2-portfolio-zh","wiw2-favs-en","wiw2-favs-zh",
 "wiw2-vgsprint-en","wiw2-vgsprint-zh","wiw2-vg-last-en","wiw2-vg-last-zh","wiw2-recent-en","wiw2-recent-zh","wiw2-spin-en","wiw2-spin-zh"].forEach(k=>{if(!LKEYS.includes(k))LKEYS.push(k)});

/* ---------- 2. offline + update notice (only on the real website) ---------- */
const hosted=/^https?:$/.test(location.protocol)&&!/claude\.ai|claudeusercontent|anthropic/.test(location.hostname)&&"serviceWorker" in navigator;
if(hosted){window.addEventListener("load",()=>{navigator.serviceWorker.register("/sw.js").then(reg=>{
  const ask=w=>{const t=t5();const bar=el("div","toast-pop",'<span>'+t.update+'</span> <button class="btn small">'+t.reload+'</button>');bar.style.cssText="position:fixed;left:50%;transform:translateX(-50%);bottom:calc(90px + env(safe-area-inset-bottom,0px));z-index:9999;display:flex;gap:10px;align-items:center;opacity:1";
    document.body.appendChild(bar);bar.querySelector("button").onclick=()=>{w.postMessage("skipWaiting")}};
  if(reg.waiting&&navigator.serviceWorker.controller)ask(reg.waiting);
  reg.addEventListener("updatefound",()=>{const w=reg.installing;if(!w)return;w.addEventListener("statechange",()=>{if(w.state==="installed"){if(navigator.serviceWorker.controller)ask(w);else if(!store.get("wiw2-offline-told",false)){store.set("wiw2-offline-told",true);toast(t5().offline)}}})});
  setInterval(()=>reg.update().catch(()=>{}),60*60*1000)}).catch(()=>{});
  let reloading=false;navigator.serviceWorker.addEventListener("controllerchange",()=>{if(reloading)return;reloading=true;location.reload()})})}

/* ---------- 3. shareable links to essays ---------- */
{const m=(location.hash||"").match(/^#(en|zh)-essays\/([\w-]+)$/);if(m&&EIDX[m[2]]){try{localStorage.setItem("wiw2-essayopen-"+m[1]+":"+(LID||"guest"),JSON.stringify(m[2]))}catch(e){}lstore.set("wiw2-essayopen-"+m[1],m[2]);try{history.replaceState(null,"","#"+m[1]+"-essays")}catch(e){}}}
const _re5=renderEssay;renderEssay=function(e){_re5(e);try{history.replaceState(history.state||{essay:e.id},"","#"+lang+"-essays/"+e.id)}catch(x){}
  const row=$("#main .row");if(row&&!row.querySelector(".cplink")){const b=el("button","btn ghost small cplink",t5().copyLink);b.onclick=()=>{const url=location.href;(navigator.clipboard?navigator.clipboard.writeText(url):Promise.reject()).then(()=>toast(t5().copied)).catch(()=>{prompt("",url)})};row.appendChild(b)}};
window.addEventListener("hashchange",()=>{const m=(location.hash||"").match(/^#(en|zh)-essays\/([\w-]+)$/);if(!m||!EIDX[m[2]])return;if(document.querySelector("article.essay")&&current&&current.id===m[1]+"-essays"&&lstore.get("wiw2-essayopen-"+m[1],"")===m[2])return;
  const go=()=>{lstore.set("wiw2-essayopen-"+lang,m[2]);openUnit(lang+"-essays",true)};if(m[1]!==lang){lstore.set("wiw2-essayopen-"+m[1],m[2]);setLang(m[1],m[1]+"-essays")}else go()});

/* ---------- 4. sound effects (with a mute switch) ---------- */
let AC=null;function ac(){try{return AC||(AC=new (window.AudioContext||window.webkitAudioContext)())}catch(e){return null}}
function tone(freqs,dur,type,vol){if(!store.get("wiw2-sound",true))return;const A=ac();if(!A)return;let t0=A.currentTime;freqs.forEach((f,i)=>{const o=A.createOscillator(),g=A.createGain();o.type=type||"sine";o.frequency.value=f;o.connect(g);g.connect(A.destination);const s=t0+i*dur*0.8;g.gain.setValueAtTime(vol||0.12,s);g.gain.exponentialRampToValueAtTime(0.001,s+dur);o.start(s);o.stop(s+dur)})}
const ding=()=>tone([660,880,1175],0.12,"sine",0.1),buzz=()=>tone([220,180],0.14,"triangle",0.07);
let lastSnd=0;function snd(f){const n=Date.now();if(n-lastSnd<180)return;lastSnd=n;f()}
new MutationObserver(ms=>{for(const m of ms){const n=m.target;if(m.type==="attributes"&&n.classList){if(n.classList.contains("ok")&&n.closest(".vg-opts,.vg-toks,.sp-mcq")&&n.matches("button")&&!n.dataset.snd){n.dataset.snd=1;if(!n.parentElement.querySelector(".no"))snd(ding)}
      else if(n.classList.contains("no")&&n.matches("button")&&!n.dataset.snd){n.dataset.snd=1;snd(buzz)}}
    if(m.type==="childList")m.addedNodes.forEach(a=>{if(a.nodeType===1&&a.matches&&a.matches(".fb.good"))snd(ding);else if(a.nodeType===1&&a.matches&&a.matches(".fb.bad"))snd(buzz)})}})
  .observe(document.getElementById("main"),{subtree:true,childList:true,attributes:true,attributeFilter:["class"]});
{const tl=document.querySelector(".topline");if(tl&&!$("#sndBtn")){const b=document.createElement("button");b.id="sndBtn";b.setAttribute("aria-label","Sound effects / 音效");
  b.style.cssText="border:1.5px solid var(--rule);background:var(--card);border-radius:999px;padding:4px 10px;font-weight:700;cursor:pointer";const set=()=>{b.textContent=store.get("wiw2-sound",true)?"🔊":"🔇"};set();
  b.onclick=()=>{store.set("wiw2-sound",!store.get("wiw2-sound",true));set();if(store.get("wiw2-sound",true))ding()};const e=$("#easyBtn")||$("#pyBtn");if(e)e.before(b);else tl.appendChild(b)}}

/* ---------- 5. P1–P2: fold away harder idiom blocks ---------- */
const _ri=R.idioms;R.idioms=(b,ctx)=>{const w=_ri(b,ctx);if(!stA())return w;const d=document.createElement("details");d.className="block";d.innerHTML='<summary style="cursor:pointer;font-weight:700;padding:8px 0">🔒 '+esc(t5().harder)+'</summary>';d.appendChild(w);return d};

/* ---------- 6. progress file: save / load (parent report) ---------- */
const _rep=PAGES.report&&PAGES.report.render;if(_rep)PAGES.report.render=function(m){_rep(m);const t=t5();const c=el("div","sp-card d4noprint",'<h3>📦 '+t.moveTitle+'</h3><p class="muted">'+t.moveLead+'</p><div class="row" style="gap:8px;flex-wrap:wrap"><button class="btn small sv">'+t.saveFile+'</button><label class="btn ghost small" style="cursor:pointer">'+t.loadFile+'<input type="file" accept=".txt,text/plain" hidden></label><span class="msg muted"></span></div>');
  c.querySelector(".sv").onclick=()=>{const code=makeCode();const name=(learnerName()||"guest").replace(/[^\w一-鿿-]+/g,"_");const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([code],{type:"text/plain"}));a.download="write-it-well-"+name+"-"+today()+".txt";document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},500)};
  c.querySelector("input").onchange=ev=>{const f=ev.target.files[0];if(!f)return;f.text().then(s=>{const ok=restoreCode(s);c.querySelector(".msg").textContent=ok?t.loaded:t.badFile;if(ok){refreshProgress();refreshNav()}})};
  const anchor=m.querySelector(".rw")||m.querySelector(".sp-card:last-child");m.appendChild(c)};
})();
/* ===== quick shortcuts to the big sections (Home, Today) ===== */
(function(){
const st=document.createElement("style");st.textContent=".qlinks{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:8px;margin:8px 0 12px}.qlinks button{display:flex;gap:10px;align-items:center;font:inherit;font-weight:700;font-size:1.05rem;text-align:left;padding:12px 14px;border-radius:14px;border:2px solid var(--blue);background:color-mix(in srgb,var(--blue) 8%,var(--card));color:var(--ink);cursor:pointer;min-height:56px}.qlinks button span{font-size:1.6rem}";document.head.appendChild(st);
const L={en:[["myspell","🔤","My spelling"],["vg","📐","Vocab & Grammar"],["essays","📚","Model essays"],["report","📊","Parent report"]],zh:[["myspell","🔤","我的听写"],["vg","📐","词语与语法"],["essays","📚","范文库"],["report","📊","家长报告"]]};
function bar(){const b=el("nav","qlinks",L[lang].map(x=>'<button data-q="'+x[0]+'"><span>'+x[1]+'</span>'+x[2]+'</button>').join(""));b.setAttribute("aria-label","Shortcuts");
  b.addEventListener("click",ev=>{const x=ev.target.closest("[data-q]");if(!x)return;if(x.dataset.q==="essays")lstore.set("wiw2-essayopen-"+lang,"");openUnit(lang+"-"+x.dataset.q,true)});return b}
function add(){const m=$("#main");if(m.querySelector(".qlinks"))return;const head=m.querySelector(".head");if(head)head.after(bar());else m.prepend(bar())}
const _h=renderHome;renderHome=function(){_h.apply(this,arguments);add()};
const _t=renderToday;renderToday=function(){_t.apply(this,arguments);add()};
})();
