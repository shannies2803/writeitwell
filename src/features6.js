/* ===== round 19: pinyin above every Chinese character, for every learner, offline ===== */
(function(){
const st=document.createElement("style");
st.textContent=".pc{display:inline-block;text-align:center;text-indent:0;line-height:1.2;vertical-align:bottom;padding:0 .07em;margin-top:.2em;text-transform:none;letter-spacing:0}"+
 ".pc::before{content:attr(data-p);display:block;font-size:.6em;text-transform:none;font-weight:400;font-style:normal;color:var(--blue);line-height:1.25;white-space:nowrap;letter-spacing:0}"+
 ".nopy .pc::before{display:none}.nopy #main rt{display:none}"+
 ".chip[data-py='']::before{display:none}";
document.head.appendChild(st);
const HAN=/[㐀-鿿]/;
const SKIP=new Set(["SCRIPT","STYLE","TEXTAREA","INPUT","SELECT","OPTION","RUBY","RT","RP","svg","SVG","CODE"]);
const pyOn=()=>store.get("wiw2-py",true);
const active=()=>lang==="zh"&&pyOn()&&!!window.pinyinPro;
function skipNode(n){for(let e=n.parentNode;e&&e.id!=="main";e=e.parentNode){if(SKIP.has(e.nodeName)||e.isContentEditable||(e.classList&&(e.classList.contains("pc")||e.classList.contains("nopy6"))))return true}return false}
function wrapText(n){const s=n.nodeValue;let arr;try{arr=pinyinPro.pinyin(s,{type:"all",toneType:"symbol"})}catch(e){return}
  const f=document.createElement("span");f.className="p6w";let buf="";
  arr.forEach(x=>{if(x.isZh&&HAN.test(x.origin)){if(buf){f.appendChild(document.createTextNode(buf));buf=""}const sp=document.createElement("span");sp.className="pc";sp.dataset.p=x.pinyin;sp.textContent=x.origin;f.appendChild(sp)}else buf+=x.origin});
  if(buf)f.appendChild(document.createTextNode(buf));n.replaceWith(f)}
/* stop the older, partial pinyin helpers from doubling up */
function claim(root){root.querySelectorAll(".ex:not(.pyd), .dots li:not(.pyd)").forEach(x=>x.classList.add("pyd"));
  root.querySelectorAll(".vg-q, .vg-opts button, .sp-sent, .vg-why div").forEach(x=>{x.dataset.py4=1});
  root.querySelectorAll(".chip").forEach(c=>{if(c.getAttribute("data-py")!=="")c.setAttribute("data-py","")})}
let queue=[],busy=false;
function collect(root){const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:n=>HAN.test(n.nodeValue)&&!skipNode(n)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT});const out=[];while(w.nextNode())out.push(w.currentNode);return out}
function pump(){busy=true;const t0=performance.now();while(queue.length&&performance.now()-t0<12){const n=queue.shift();if(n.isConnected&&n.parentNode)wrapText(n)}
  if(queue.length)requestAnimationFrame(pump);else busy=false}
function run(root){if(!active()||!root)return;claim(root);queue.push(...collect(root));if(!busy&&queue.length){const first=queue.splice(0,400);first.forEach(n=>{if(n.isConnected)wrapText(n)});if(queue.length)requestAnimationFrame(pump)}}
const main=document.getElementById("main");
let pend=false;new MutationObserver(()=>{if(!active())return;claim(main);if(pend)return;pend=true;Promise.resolve().then(()=>{pend=false;run(main)})}).observe(main,{childList:true,subtree:true,characterData:true});
$("#pyBtn").addEventListener("click",()=>setTimeout(()=>run(main),30));
/* essays: the global pinyin replaces the old per-essay button */
const _re6=renderEssay;renderEssay=function(e){if(lang==="zh")lstore.set("wiw2-esspy",false);_re6(e);if(lang==="zh"){const tools=$("#main .row");if(tools)[...tools.querySelectorAll("button")].forEach(b=>{if(/拼音/.test(b.textContent))b.remove()})}};
run(main);
})();
