/* ===== round 20: from reading to writing (runs inside the engine IIFE, after features6) =====
   1. "Write with this bank" on every word bank: Use 3 phrases / Write a paragraph
   2. Word book: spaced review of saved words + "My sentences"
   3. Exam practice: timed picture composition, plan, write, auto-hints, parent marking checklist
   4. Picture words (P1–P2): look and choose, picture sentence
   5. Tap to hear example sentences (all) and Chinese phrases (all ages)
   6. Pinyin: all / hard characters only / off
*/
(function(){
const zh=()=>lang==="zh";const stA=()=>stageOf()==="A";const stg=()=>stageOf();
const W4=window.__w4||{};
const T7={en:{
  wTitle:"✍️ Write with this bank",use3:"Use 3",para:"Write a paragraph",
  pick3:"Tap 3 phrases you like (tap 🔀 for others). Then write your own sentence with each one.",more:"🔀 Other phrases",
  yourSent:"Your sentence…",check:"Check",allGood:"Brilliant! 3 good sentences – you earned a star.",
  needPhrase:p=>"Use the phrase “"+p+"” (you may change its tense).",tooShort:n=>"Make it a bit longer (at least "+n+" words).",
  capital:"Start with a capital letter.",stop:"End with a full stop (. ! or ?).",ok:"✓ Great sentence!",chooseFirst:"Tap 3 phrases first.",
  paraLead:t=>"Write a paragraph (at least 5 sentences) for a story about “"+t+"”. Try to use at least 3 of these phrases – they turn green when you use them.",
  paraPh:"Write your paragraph here…",words:"words",used:"phrases used",done:"I'm done",paraNeed:(w,p)=>"Keep going: write at least "+w+" words and use at least "+p+" of the phrases.",
  paraGood:"Wonderful paragraph! Star earned. It is saved in your word book under “My sentences”.",
  rvTitle:"🔁 Review my saved words",rvLead:"Words come back after 1, 2, 4, 8 and 16 days. The more you use them, the longer they stay away.",
  rvDue:n=>n?n+" to review today":"Nothing due today – well done!",rvStart:"Start review",rvCloze:"Fill in the missing phrase:",rvWrite:w=>"Write a sentence using “"+w+"”:",
  rvRight:"✓ Correct!",rvWrong:a=>"Not quite. The answer is: "+a,rvNext:"Next →",rvDone:"Review finished! ⭐",rvSkip:"Show answer",
  mySent:"✍️ My sentences",mySentNone:"Sentences you write with “Use 3”, paragraphs and picture sentences appear here.",
  exTitle:"Exam practice",exLead:"Picture composition, exam style: look at the pictures, plan, write against the clock, then check it together with a grown-up.",
  exPick:"Choose pictures",exRandom:"🎲 Surprise me",exTime:"Time",min:"min",exStart:"Start writing",exPlan:"Plan (2–3 minutes)",
  planL:["Beginning – who, where, when","Problem – what went wrong?","Climax – the most exciting part","Ending – how it was solved, how you felt"],
  exIdeas:"💡 Need ideas? Questions for each picture",exPhr:"Phrases to try",exWrite:"Write your composition",exPh:"Leave an empty line between paragraphs.",
  exTarget:n=>"Aim for "+n+"+ words",paras:"paragraphs",exFinish:"I've finished ✓",timeUp:"⏰ Time's up! Finish your sentence, then tap I've finished.",
  exCheck:"Check it together",auto:"What the computer noticed",markTitle:"Marking checklist (for a grown-up, about 2 minutes)",
  markLead:"For each line tap No / A bit / Yes. It gives a rough score out of 20 – the same idea teachers use (content and language).",
  no:"No",bit:"A bit",yes:"Yes",content:"Content",language:"Language",score:"Score",saveMark:"Save score",saved:"Saved. Star earned! ⭐",
  C:["Opening sets the scene (who, where, when) or hooks the reader","Story follows all the pictures","A clear problem, and a climax with details (actions, feelings, what people said)","Ending: how it was solved + a feeling or lesson","Interesting, stays on topic, long enough"],
  L:["Paragraphs (a new one for each part)","Past tense kept the whole way","Spelling mostly correct","Punctuation: capitals, full stops, commas, speech marks","Good vocabulary and different sentence openings"],
  hW:(n,t)=>n+" words (target "+t+")",hP:n=>n+" paragraph"+(n===1?"":"s")+(n<4?" – try 4 or more: beginning, problem, climax, ending":""),
  hPh:n=>n+" good phrases spotted",hOpen:(w,n)=>"“"+w+"” starts "+n+" sentences – try other openings",hTense:(w,n)=>"“"+w+"” appears "+n+" times outside speech – check you kept to the past tense",
  hSaid:n=>"“said” used "+n+" times – try whispered, cried, muttered…",history:"Past attempts",view:"View",print:"🖨 Print",again:"Try another",resume:"Continue my draft",
  pwTitle:"Picture words",pwLead:"Look at the picture and tap the right word. Then write a sentence about a picture!",
  pwChoose:"Look and choose",pwSent:"Picture sentence",pwQ:"What is this?",pwQf:"How does this person feel?",pwQp:"Where is this?",pwQa:"What is the boy doing?",
  pwScore:(a,b)=>a+" / "+b,pwDone:"All done! ⭐ Great looking and reading!",pwAgain:"Play again",
  psLead:"Look at the picture. Write ONE sentence about it. These words can help:",psFrame:"I can see… / The boy is… / They are…",psPh:"My sentence…",
  psNeed:"Use one of the helping words.",psGood:"Super sentence! ⭐",psNew:"New picture",hear:"🔊 Hear it",tapHear:"Tap a sentence to hear it",
  pyAll:"拼音",pyHard:"拼音·难字"},
 zh:{
  wTitle:"✍️ 用这个词语宝库写一写",use3:"用三个好词",para:"写一段话",
  pick3:"点选三个你喜欢的好词（点 🔀 换一批），然后用每一个词写一个句子。",more:"🔀 换一批",
  yourSent:"我的句子……",check:"检查",allGood:"太棒了！三个好句子，得到一颗星。",
  needPhrase:p=>"句子里要用上“"+p+"”。",tooShort:n=>"句子再长一点（至少 "+n+" 个字）。",
  capital:"",stop:"句子最后要有标点（。！？）。",ok:"✓ 好句子！",chooseFirst:"先点选三个好词。",
  paraLead:t=>"围绕“"+t+"”写一段话（至少五句）。试着用上三个下面的好词，用上了会变绿色。",
  paraPh:"在这里写一段话……",words:"字",used:"个好词用上了",done:"写好了",paraNeed:(w,p)=>"继续写：至少 "+w+" 个字，用上至少 "+p+" 个好词。",
  paraGood:"写得真好！得到一颗星。这段话保存在生词本的“我的句子”里。",
  rvTitle:"🔁 复习生词本",rvLead:"词语会在 1、2、4、8、16 天后回来。用得越熟，隔得越久。",
  rvDue:n=>n?"今天要复习 "+n+" 个":"今天没有要复习的，真棒！",rvStart:"开始复习",rvCloze:"填上缺少的词语：",rvWrite:w=>"用“"+w+"”写一个句子：",
  rvRight:"✓ 对了！",rvWrong:a=>"不对哦。答案是："+a,rvNext:"下一个 →",rvDone:"复习完了！⭐",rvSkip:"看答案",
  mySent:"✍️ 我的句子",mySentNone:"你用“用三个好词”、写一段话和看图写句写的句子会出现在这里。",
  exTitle:"考试练习",exLead:"按考试的方式写看图作文：看图、列提纲、计时写作，写完和大人一起检查。",
  exPick:"选一组图",exRandom:"🎲 随便来一组",exTime:"时间",min:"分钟",exStart:"开始写",exPlan:"列提纲（2–3 分钟）",
  planL:["开头——谁、在哪里、什么时候","问题——发生了什么事？","高潮——最紧张的部分","结尾——怎么解决，心情怎样"],
  exIdeas:"💡 没有想法？看看每幅图的问题",exPhr:"可以用的好词",exWrite:"写作文",exPh:"每一段之间空一行。",
  exTarget:n=>"目标 "+n+" 字以上",paras:"段",exFinish:"写完了 ✓",timeUp:"⏰ 时间到！写完这一句，然后点“写完了”。",
  exCheck:"一起检查",auto:"电脑发现的",markTitle:"评分表（请大人帮忙，大约两分钟）",
  markLead:"每一项点“没有 / 有一点 / 有”。会算出一个大概的分数（满分 20），和老师看内容、语文的方法一样。",
  no:"没有",bit:"有一点",yes:"有",content:"内容",language:"语文",score:"分数",saveMark:"保存分数",saved:"保存好了，得到一颗星！⭐",
  C:["开头交代时间、地点、人物，或能吸引读者","按照图意写，每幅图都写到了","有问题和高潮，细节丰富（动作、神态、语言、心理）","结尾写出结果和感受或启示","内容有趣，切题，字数够"],
  L:["分段清楚","用词恰当，有好词好句","错别字少","标点正确（对话要用引号）","句子通顺，句式有变化"],
  hW:(n,t)=>n+" 个字（目标 "+t+"）",hP:n=>n+" 段"+(n<4?"——试着分四段：开头、问题、高潮、结尾":""),
  hPh:n=>"找到 "+n+" 个好词好句",hOpen:(w,n)=>"“"+w+"”开头的句子有 "+n+" 个，换一换开头吧",hTense:()=>"",hSaid:n=>"“说”用了 "+n+" 次——试试“喊道、小声地说、嘀咕”……",
  history:"以前的练习",view:"看看",print:"🖨 打印",again:"再来一组",resume:"继续写草稿",
  pwTitle:"看图学词",pwLead:"看图，点出正确的词语。然后看图写一句话！",
  pwChoose:"看图选词",pwSent:"看图写句",pwQ:"这是什么？",pwQf:"他的心情怎么样？",pwQp:"这是哪里？",pwQa:"男孩在做什么？",
  pwScore:(a,b)=>a+" / "+b,pwDone:"全部完成！⭐ 你看得真仔细！",pwAgain:"再玩一次",
  psLead:"看图，写一句话。这些词语可以帮你：",psFrame:"我看见…… / 男孩在…… / 他们……",psPh:"我的句子……",
  psNeed:"用上一个提示词语。",psGood:"好句子！⭐",psNew:"换一幅图",hear:"🔊 听一听",tapHear:"点句子可以听",
  pyAll:"拼音",pyHard:"拼音·难字"}};
const t7=()=>T7[lang];
["wiw2-mysent-en","wiw2-mysent-zh","wiw2-wbsr-en","wiw2-wbsr-zh","wiw2-exam-en","wiw2-exam-zh","wiw2-examdraft-en","wiw2-examdraft-zh"].forEach(k=>{if(typeof LKEYS!=="undefined"&&!LKEYS.includes(k))LKEYS.push(k)});

const css=document.createElement("style");css.textContent=`
.w7card{border:2px solid var(--blue);border-radius:16px;padding:14px;background:color-mix(in srgb,var(--blue) 5%,var(--card))}
.w7tabs{display:flex;gap:6px;flex-wrap:wrap;margin:6px 0 10px}.w7tabs button{font:inherit;font-weight:700;border:2px solid var(--rule);background:var(--card);border-radius:999px;padding:6px 14px;cursor:pointer;color:var(--ink)}
.w7tabs button[aria-pressed=true]{border-color:var(--blue);background:var(--blue);color:#fff}
.w7pool{display:flex;flex-wrap:wrap;gap:6px;margin:8px 0}.w7pool button{font:inherit;border:2px solid var(--rule);background:var(--card);border-radius:12px;padding:6px 10px;cursor:pointer;color:var(--ink);text-align:left}
.w7pool button[aria-pressed=true]{border-color:var(--blue);background:color-mix(in srgb,var(--blue) 15%,var(--card));font-weight:700}
.w7pool button.used{border-color:var(--good);background:color-mix(in srgb,var(--good) 18%,var(--card))}
.w7row{margin:10px 0}.w7row label{display:block;font-weight:700;margin-bottom:4px}
.w7 textarea,.w7 input[type=text]{width:100%;box-sizing:border-box;font:inherit;font-size:1.05rem;border:2px solid var(--rule);border-radius:12px;padding:10px;background:var(--card);color:var(--ink);min-width:0}
.w7 textarea:focus,.w7 input:focus{outline:none;border-color:var(--blue)}
.w7 .fb{margin:4px 0 0}.w7meta{color:var(--muted);font-size:.92rem;margin:4px 0}
.w7pics{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:8px;margin:8px 0}.w7pics figure{margin:0;border:2px solid var(--rule);border-radius:12px;overflow:hidden;background:var(--card);position:relative}
.w7pics figure b{position:absolute;left:6px;top:4px;background:var(--blue);color:#fff;border-radius:999px;padding:0 8px;font-size:.85rem}.w7pics svg{display:block;width:100%;height:auto}
.w7timer{position:sticky;top:0;z-index:20;display:flex;gap:10px;align-items:center;justify-content:space-between;background:var(--card);border:2px solid var(--blue);border-radius:12px;padding:6px 12px;margin:6px 0;font-weight:700}
.w7timer.low{border-color:#E5534B;color:#E5534B}
.w7plan{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:8px}
.w7mk{display:grid;gap:6px;margin:6px 0}.w7mk div{display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center;border-bottom:1px solid var(--rule);padding:4px 0}
.w7seg{display:flex;gap:4px}.w7seg button{font:inherit;font-size:.85rem;border:1.5px solid var(--rule);background:var(--card);border-radius:8px;padding:4px 8px;cursor:pointer;color:var(--ink)}.w7seg button[aria-pressed=true]{background:var(--blue);border-color:var(--blue);color:#fff}
@media(max-width:520px){.w7mk div{grid-template-columns:1fr}}
.w7score{font-size:1.6rem;font-weight:800}
.w7hints li{margin:3px 0}
.w7opts{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:10px 0}.w7opts button{font:inherit;font-size:1.25rem;font-weight:700;padding:14px 6px;border:2px solid var(--rule);border-radius:14px;background:var(--card);cursor:pointer;color:var(--ink);min-height:64px}
.w7opts button.ok{border-color:var(--good);background:color-mix(in srgb,var(--good) 22%,var(--card))}.w7opts button.no{border-color:#E5534B;opacity:.6}
.w7big{max-width:420px;margin:0 auto;border:2px solid var(--rule);border-radius:16px;overflow:hidden;background:#fff}.w7big svg{display:block;width:100%;height:auto}
.w7face{max-width:200px}
#main .ex{cursor:pointer}
.w7sent li{margin:6px 0}.w7sent small{color:var(--muted)}
`;document.head.appendChild(css);

/* ---------- helpers ---------- */
const strip=s=>String(s==null?"":s).replace(/<[^>]+>/g,"").replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/\s+/g," ").trim();
const HANRE=/[㐀-鿿]/g;
function wc(s){return zh()?(String(s).match(HANRE)||[]).length:(String(s).trim().match(/[A-Za-z0-9’']+/g)||[]).length}
function dayPlus(n){return dkey(new Date(Date.now()+n*864e5))}
function shuffle7(a){const b=a.slice();for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]]}return b}
function isShort(w){if(zh()){const n=(w.match(HANRE)||[]).length;return n>=2&&n<=8&&!/[。！？，、；]/.test(w)}const n=w.split(/\s+/).length;return n<=5&&w.length>=3&&!/[.!?;:"“”…]/.test(w)}
function unitPhrases(u){const out=[];(u.blocks||[]).forEach(b=>{if(b.type==="chips")(b.groups||[]).forEach(g=>(g.words||[]).forEach(w=>{const s=strip(w);if(s&&isShort(s))out.push(s)}))});return[...new Set(out)]}
let EXIDX={};function exIndex(){if(EXIDX[lang])return EXIDX[lang];const m=new Map();
  DATA[lang].forEach(u=>(u.blocks||[]).forEach(b=>{if(b.type!=="chips")return;(b.groups||[]).forEach(g=>{if(!g.ex)return;const ex=strip(g.ex);(g.words||[]).forEach(w=>{const s=strip(w);if(!s||m.has(s.toLowerCase()))return;if(ex.toLowerCase().includes(s.toLowerCase())&&s.length<ex.length*0.7)m.set(s.toLowerCase(),ex)})})}));return EXIDX[lang]=m}
let ALLPH={};function allPhrases(){if(ALLPH[lang])return ALLPH[lang];const s=new Set();DATA[lang].forEach(u=>(u.blocks||[]).forEach(b=>{if(b.type==="chips")(b.groups||[]).forEach(g=>(g.words||[]).forEach(w=>{const x=strip(w);if(zh()?((x.match(HANRE)||[]).length>=4&&x.length<=10&&!/[。！？，]/.test(x)):(x.split(" ").length>=2&&x.split(" ").length<=6&&!/[.!?]$/.test(x)))s.add(zh()?x:x.toLowerCase())}))}));return ALLPH[lang]=[...s]}
const STOP=new Set(["the","and","a","an","of","to","with","my","his","her","their","our","your","was","were","is","are","am","like","as","in","on","at","it","for","from","up","out","into","be","i","me","you","he","she","they","we","that","this","so","all","one","someone","something","s"]);
const normEn=s=>String(s).toLowerCase().replace(/[‘’]/g,"'").replace(/[^a-z0-9' ]+/g," ").replace(/\s+/g," ").trim();
function usesPhrase(sent,ph){if(zh()){const a=String(sent).replace(/\s/g,"");const parts=strip(ph).split(/……|…|\.\.\.|\//).map(x=>x.replace(/[^㐀-鿿]/g,"")).filter(Boolean);return parts.length&&parts.every(p=>a.includes(p))}
  const s=normEn(sent),p=normEn(ph.replace(/\(.*?\)/g,"").split("/")[0]);if(!p)return true;if((" "+s+" ").includes(" "+p+" "))return true;
  const sw=s.split(" ");const cw=p.split(" ").filter(w=>w.length>=3&&!STOP.has(w));if(!cw.length)return s.includes(p);
  const hit=cw.filter(w=>{const st=w.slice(0,Math.max(3,Math.min(5,w.length-1)));return sw.some(x=>x.startsWith(st))}).length;return hit>=Math.ceil(cw.length*0.6)}
function sentCheck(s,ph){const t=t7();const x=String(s).trim();const minW=zh()?(stA()?5:8):(stA()?4:6);const out=[];
  if(wc(x)<minW)out.push(t.tooShort(minW));
  if(!zh()&&!/^["'“‘(]?[A-Z0-9]/.test(x))out.push(t.capital);
  if(zh()?!/[。！？!?…”"]$/.test(x):!/[.!?]["'”’)]?$/.test(x))out.push(t.stop);
  if(ph&&!usesPhrase(x,ph))out.push(t.needPhrase(ph));return out}
function saveSent(text,phrases,from){const k="wiw2-mysent-"+lang;const L=lstore.get(k,[]);L.unshift({d:today(),t:text,p:phrases||[],u:from||""});while(L.length>300)L.pop();lstore.set(k,L)}
function star(key,from){let got=false;try{got=giveStar(key,from)!==false;refreshNav()}catch(e){}if(got&&W4.celebrate)W4.celebrate()}
function sayIt(s){if(canSpeak)try{speak(s)}catch(e){}}

/* ---------- 1. Write with this bank ---------- */
function writeCard(u){const t=t7();const pool=unitPhrases(u);if(pool.length<6)return null;
  const c=el("section","block w7card w7");c.id="w7";
  c.innerHTML='<h3 style="margin-top:0">'+t.wTitle+'</h3><div class="w7tabs"><button data-tab="u3" aria-pressed="true">'+t.use3+'</button><button data-tab="pa" aria-pressed="false">'+t.para+'</button></div><div class="w7body"></div>';
  const body=c.querySelector(".w7body");
  c.querySelector(".w7tabs").addEventListener("click",ev=>{const b=ev.target.closest("[data-tab]");if(!b)return;c.querySelectorAll("[data-tab]").forEach(x=>x.setAttribute("aria-pressed",String(x===b)));b.dataset.tab==="u3"?use3():para()});
  function use3(){let shown=shuffle7(pool).slice(0,8),picked=[];
    body.innerHTML='<p>'+t.pick3+'</p><div class="w7pool"></div><button class="btn ghost small mo">'+t.more+'</button><div class="rows"></div>';
    const pe=body.querySelector(".w7pool"),rows=body.querySelector(".rows");
    function drawPool(){pe.innerHTML=shown.map((w,i)=>'<button data-i="'+i+'" aria-pressed="'+picked.includes(w)+'">'+esc(w)+'</button>').join("")}
    function drawRows(){const keep={};rows.querySelectorAll("textarea").forEach(x=>keep[x.dataset.p]=x.value);
      rows.innerHTML=picked.map((w,i)=>'<div class="w7row"><label>'+(i+1)+'. '+esc(w)+'</label><textarea rows="2" data-p="'+esc(w)+'" placeholder="'+esc(t.yourSent)+'"></textarea><p class="fb" aria-live="polite"></p></div>').join("")+(picked.length===3?'<button class="btn ck">'+t.check+'</button> <p class="fb all"></p>':'');
      rows.querySelectorAll("textarea").forEach(x=>{if(keep[x.dataset.p])x.value=keep[x.dataset.p]});const ck=rows.querySelector(".ck");if(ck)ck.onclick=check}
    function check(){let good=0;const tas=[...rows.querySelectorAll("textarea")];tas.forEach(ta=>{const fb=ta.nextElementSibling;const errs=sentCheck(ta.value,ta.dataset.p);
        if(errs.length){fb.className="fb bad";fb.textContent=errs.filter(Boolean).join(" ")}else{fb.className="fb good";fb.textContent=t.ok;good++}});
      const all=rows.querySelector(".all");if(good===3){all.className="fb good all";all.textContent=t.allGood;tas.forEach(ta=>{saveSent(ta.value.trim(),[ta.dataset.p],u.id);srTouch(ta.dataset.p,true)});star(lang+"-coach:use3:"+u.id+":"+today(),all)}else all.textContent=""}
    pe.addEventListener("click",ev=>{const b=ev.target.closest("[data-i]");if(!b)return;const w=shown[+b.dataset.i];if(picked.includes(w))picked=picked.filter(x=>x!==w);else if(picked.length<3)picked.push(w);else{picked.shift();picked.push(w)}drawPool();drawRows()});
    body.querySelector(".mo").onclick=()=>{shown=picked.concat(shuffle7(pool.filter(w=>!picked.includes(w))).slice(0,8-picked.length));drawPool()};
    drawPool();drawRows();if(!picked.length)rows.innerHTML='<p class="muted">'+t.chooseFirst+'</p>'}
  function para(){const ph=shuffle7(pool).slice(0,6);const minW=zh()?(stA()?40:100):(stA()?25:60),minP=stA()?1:3;
    body.innerHTML='<p>'+esc(t.paraLead(strip(u.title)))+'</p><div class="w7pool">'+ph.map(w=>'<button tabindex="-1" data-w="'+esc(w)+'">'+esc(w)+'</button>').join("")+'</div><textarea rows="8" placeholder="'+esc(t.paraPh)+'"></textarea><p class="w7meta"></p><button class="btn dn">'+t.done+'</button><p class="fb"></p>';
    const ta=body.querySelector("textarea"),meta=body.querySelector(".w7meta"),fb=body.querySelector(".fb:last-child");
    const dk="wiw2-paradraft-"+lang+"-"+u.id;try{ta.value=sessionStorage.getItem(dk)||""}catch(e){}
    function upd(){let n=0;body.querySelectorAll(".w7pool button").forEach(b=>{const on=usesPhrase(ta.value,b.dataset.w);b.classList.toggle("used",on);if(on)n++});meta.textContent=wc(ta.value)+" "+t.words+" · "+n+" "+t.used;try{sessionStorage.setItem(dk,ta.value)}catch(e){}return n}
    ta.addEventListener("input",upd);body.querySelector(".w7pool").addEventListener("click",ev=>{const b=ev.target.closest("[data-w]");if(b)sayIt(b.dataset.w)});
    body.querySelector(".dn").onclick=()=>{const n=upd();if(wc(ta.value)<minW||n<minP){fb.className="fb bad";fb.textContent=t.paraNeed(minW,minP);return}
      fb.className="fb good";fb.textContent=t.paraGood;const used=ph.filter(w=>usesPhrase(ta.value,w));saveSent(ta.value.trim(),used,u.id);used.forEach(w=>srTouch(w,true));try{sessionStorage.removeItem(dk)}catch(e){}star(lang+"-coach:para:"+u.id+":"+today(),fb)};upd()}
  use3();return c}
const _ou7=openUnit;openUnit=function(id,scroll){_ou7(id,scroll);try{if(!readIds().includes(id))return;const u=unitById(id);if(!u)return;const m=$("#main");if(m.querySelector("#w7"))return;
  const c=writeCard(u);if(!c)return;const rt=m.querySelector(".readtick");if(rt)rt.before(c);else{const pg=m.querySelector(".pager");if(pg)pg.before(c);else m.appendChild(c)}
  if(sessionStorage.getItem("wiw2-gowrite")){sessionStorage.removeItem("wiw2-gowrite");setTimeout(()=>c.scrollIntoView({block:"start",behavior:"smooth"}),150)}}catch(e){}};
function goWrite(){if(stA()){lstore.set("wiw2-pwmode","sent");openUnit(lang+"-picwords",true);return}
  const ids=readIds().filter(id=>{const u=unitById(id);return u&&unitPhrases(u).length>=6});if(!ids.length)return;
  const readToday=Object.keys(stars).filter(k=>k.startsWith(lang+"-read:")&&k.endsWith(":"+today())).map(k=>k.split(":")[1]).filter(id=>ids.includes(id));
  const pick=readToday.length?readToday[readToday.length-1]:ids[Math.floor(seeded(today()+lang+"w7")()*ids.length)];
  try{sessionStorage.setItem("wiw2-gowrite","1")}catch(e){}openUnit(pick,true)}
window.__w7={goWrite};

/* ---------- 2. Word book: spaced review + my sentences ---------- */
const GAPS=[0,1,2,4,8,16,32];
function srAll(){return lstore.get("wiw2-wbsr-"+lang,{})}
function srTouch(w,ok){const S=srAll();const r=S[w]||{b:0,d:today()};r.b=ok?Math.min(r.b+1,GAPS.length-1):1;r.d=dayPlus(GAPS[r.b]||1);S[w]=r;lstore.set("wiw2-wbsr-"+lang,S)}
function dueList(){const S=srAll();const td=today();return words().filter(w=>!S[w]||S[w].d<=td)}
function reviewCard(){const t=t7();const c=el("section","sp-card w7");const draw0=()=>{const due=dueList();c.innerHTML='<h3 style="margin-top:0">'+t.rvTitle+'</h3><p class="muted">'+t.rvLead+'</p><p><b>'+t.rvDue(due.length)+'</b></p>'+(due.length?'<button class="btn st">'+t.rvStart+'</button>':'');const b=c.querySelector(".st");if(b)b.onclick=()=>run(shuffle7(due).slice(0,8))};
  function run(list){let i=0;const idx=exIndex();
    function one(){if(i>=list.length){c.innerHTML='<p class="fb good">'+t.rvDone+'</p>';star(lang+"-game:wbreview:"+today(),c);setTimeout(draw0,2500);return}
      const w=list[i];const ex=idx.get(w.toLowerCase());let mode=ex?"cloze":"write";let blank="";
      if(ex){const re=new RegExp(w.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"i");blank=ex.replace(re,"_____")}
      c.innerHTML='<p class="w7meta">'+(i+1)+' / '+list.length+'</p>'+(mode==="cloze"?'<p><b>'+t.rvCloze+'</b></p><p class="ex" style="font-size:1.1rem">'+esc(blank)+'</p><input type="text" autocomplete="off" autocapitalize="off" spellcheck="false">':'<p><b>'+esc(t.rvWrite(w))+'</b></p><textarea rows="2"></textarea>')+
        '<div class="row" style="gap:8px;margin-top:8px"><button class="btn ck">'+t.check+'</button><button class="btn ghost sk">'+t.rvSkip+'</button></div><p class="fb"></p>';
      const inp=c.querySelector("input,textarea"),fb=c.querySelector(".fb");inp.focus();
      const next=()=>{const nb=el("button","btn",t.rvNext);nb.onclick=()=>{i++;one()};c.querySelector(".row").replaceWith(nb);nb.focus()};
      c.querySelector(".ck").onclick=()=>{let ok;if(mode==="cloze"){const a=zh()?inp.value.replace(/\s/g,""):normEn(inp.value),b=zh()?w.replace(/\s/g,""):normEn(w);ok=a===b||(!zh()&&a.length>3&&usesPhrase(a,w)&&a.split(" ").length<=b.split(" ").length+1)}else ok=!sentCheck(inp.value,w).length;
        if(ok){fb.className="fb good";fb.textContent=t.rvRight;sayIt(mode==="cloze"?ex:inp.value);if(mode==="write")saveSent(inp.value.trim(),[w],"review");srTouch(w,true);next()}
        else{fb.className="fb bad";fb.textContent=mode==="cloze"?t.rvWrong(w):sentCheck(inp.value,w).filter(Boolean).join(" ")}};
      c.querySelector(".sk").onclick=()=>{fb.className="fb bad";fb.textContent=t.rvWrong(mode==="cloze"?ex:w);srTouch(w,false);next()};
      inp.addEventListener("keydown",ev=>{if(ev.key==="Enter"&&mode==="cloze"){ev.preventDefault();const b=c.querySelector(".ck");if(b)b.click()}})}
    one()}
  draw0();return c}
function mySentCard(){const t=t7();const L=lstore.get("wiw2-mysent-"+lang,[]);const c=el("section","sp-card w7");
  c.innerHTML='<h3 style="margin-top:0">'+t.mySent+'</h3>'+(L.length?'<p class="muted">'+t.tapHear+'</p><ol class="w7sent">'+L.slice(0,60).map(x=>'<li data-t="'+esc(x.t)+'">'+esc(x.t).replace(/\n/g,"<br>")+' <small>'+esc(x.d)+(x.p&&x.p.length?' · '+esc(x.p.join(", ")):'')+'</small></li>').join("")+'</ol>':'<p class="muted">'+t.mySentNone+'</p>');
  c.addEventListener("click",ev=>{const li=ev.target.closest("li[data-t]");if(li)sayIt(li.dataset.t)});return c}
if(PAGES.mywords){const _mw=PAGES.mywords.render;PAGES.mywords.render=function(m){_mw(m);const h=m.querySelector(".head");const rc=reviewCard();rc.classList.add("block");if(h)h.after(rc);else m.prepend(rc);const ms=mySentCard();ms.classList.add("block");m.appendChild(ms)}}

/* ---------- 3. Exam practice ---------- */
const THEMEBANK={honesty:"choices",kindness:"helping",responsibility:"choices",courage:"climax",friendship:"homelife",family:"homelife",accident:"accidents",safety:"accidents",lost:"getaround",animals:"animals",school:"school",sport:"sport",environment:"nature",perseverance:"reflect",mistakes:"choices",unexpected:"mystery",outings:"travel",helping:"helping"};
function sets(){return(window.PICSETS||[]).filter(s=>s.panels&&s.panels.length>=3&&s.panels.every(p=>p[lang]&&p.scene))}
function targetW(){return zh()?{A:100,B:250,C:400}[stg()]:{A:60,B:150,C:220}[stg()]}
function examPhrases(set){const bk={en:["en-climax","en-feelings","en-golden"],zh:["zh-gaochao","zh-feelings","zh-haoju"]}[lang].slice();const tb=THEMEBANK[set.theme];if(tb){const cand=zh()?null:"en-"+tb;if(cand&&unitById(cand))bk.unshift(cand)}
  let p=[];bk.forEach(id=>{const u=unitById(id);if(u)p=p.concat(shuffle7(unitPhrases(u)).slice(0,id===bk[0]?4:2))});return[...new Set(p)].slice(0,8)}
function autoHints(text){const t=t7();const out=[];const w=wc(text);const tw=targetW();out.push((w>=tw?"✅ ":"⚠️ ")+t.hW(w,tw));
  const paras=text.split(/\n\s*\n|\n/).filter(x=>x.trim()).length;out.push((paras>=4||stA()?"✅ ":"⚠️ ")+t.hP(paras));
  const low=zh()?text:" "+text.toLowerCase().replace(/[^a-z' ]+/g," ").replace(/\s+/g," ")+" ";let found=allPhrases().filter(p=>zh()?low.includes(p):(p.split(" ").length>=3&&!/^(the|a|an|my|i|we|it)\s\w+\s?\w*$/.test(p)&&low.includes(" "+p.replace(/[^a-z' ]+/g," ").replace(/\s+/g," ").trim()+" ")));found=found.filter(p=>!found.some(q=>q!==p&&q.includes(p)));out.push((found.length>=3?"✅ ":"💡 ")+t.hPh(found.length)+(found.length?": "+found.slice(0,8).join(" · "):""));
  if(!zh()){const sents=text.replace(/[“"][^”"]*[”"]/g,"Q.").split(/[.!?]+\s+|\n+/).map(s=>s.trim()).filter(Boolean);const f={};sents.forEach(s=>{const k=(s.split(/[\s,]+/)[0]||"").replace(/[^A-Za-z']/g,"");if(k)f[k]=(f[k]||0)+1});
    Object.entries(f).filter(([k,n])=>n>=3&&k!=="Q").forEach(([k,n])=>out.push("💡 "+t.hOpen(k,n)));
    const outside=text.replace(/[“"][^”"]*[”"]/g," ").toLowerCase();["is","are","am"].forEach(x=>{const n=(outside.match(new RegExp("\\b"+x+"\\b","g"))||[]).length;if(n>=2)out.push("💡 "+t.hTense(x,n))});
    const sd=(text.match(/\bsaid\b/gi)||[]).length;if(sd>=3)out.push("💡 "+t.hSaid(sd))}
  else{const sents=text.split(/[。！？\n]/).map(s=>s.replace(/^[\s“”"]+/,"")).filter(Boolean);const f={};sents.forEach(s=>{const k=s.slice(0,2);f[k]=(f[k]||0)+1});Object.entries(f).filter(([k,n])=>n>=3&&/^[㐀-鿿]{2}$/.test(k)).forEach(([k,n])=>out.push("💡 "+t.hOpen(k,n)));
    const sd=(text.match(/说/g)||[]).length;if(sd>=4)out.push("💡 "+t.hSaid(sd))}
  return out}
let exTick=null;
PAGES.exam={sec:"practice",icon:"clock",title:{en:"Exam practice",zh:"考试练习"},render(m){const t=t7();if(exTick){clearInterval(exTick);exTick=null}
  pageHead(m,lang+"-exam",zh()?"写作":"Writing",t.exTitle,t.exLead);const box=el("section","block w7");m.appendChild(box);
  const dk="wiw2-examdraft-"+lang;
  function choose(){const S=sets();const lv=stg();const pref=S.filter(s=>lv==="A"?s.level!=="C":lv==="B"?true:s.level!=="A");const list=shuffle7(pref.length?pref:S).slice(0,6);
    const mins=zh()?{A:[20,30,40],B:[40,50,60],C:[50,60,70]}[lv]:{A:[20,30,40],B:[40,50,60],C:[50,60,70]}[lv];const draft=lstore.get(dk,null);
    box.innerHTML=(draft&&draft.text?'<div class="sp-card"><button class="btn rs">'+t.resume+'</button></div>':'')+'<div class="sp-card"><h3 style="margin-top:0">'+t.exTime+'</h3><div class="w7seg tm">'+mins.map((x,i)=>'<button data-m="'+x+'" aria-pressed="'+(i===1)+'">'+x+' '+t.min+'</button>').join("")+'</div></div>'+
      '<div class="sp-card"><h3 style="margin-top:0">'+t.exPick+'</h3><button class="btn rnd">'+t.exRandom+'</button><div class="w7pics" style="margin-top:10px">'+list.map(s=>'<figure data-s="'+s.id+'" style="cursor:pointer" role="button" tabindex="0">'+sceneSVG(s.panels[0].scene,"")+'<figcaption style="padding:4px 8px;font-weight:700">'+esc((s.panels[0][lang].q||"").split(/[?？]/)[0].slice(0,40))+'…</figcaption></figure>').join("")+'</div></div>'+histHTML();
    let mn=mins[1];box.querySelector(".tm").addEventListener("click",ev=>{const b=ev.target.closest("[data-m]");if(!b)return;mn=+b.dataset.m;box.querySelectorAll(".tm button").forEach(x=>x.setAttribute("aria-pressed",String(x===b)))});
    box.querySelector(".rnd").onclick=()=>work(list[Math.floor(Math.random()*list.length)].id,mn,null);
    box.querySelectorAll("figure[data-s]").forEach(f=>{f.onclick=()=>work(f.dataset.s,mn,null);f.onkeydown=e=>{if(e.key==="Enter")f.click()}});
    const rs=box.querySelector(".rs");if(rs)rs.onclick=()=>work(draft.set,draft.mins,draft);bindHist()}
  function work(sid,mins,draft){const s=sets().find(x=>x.id===sid);if(!s)return choose();const tw=targetW();
    const d=draft||{set:sid,mins,start:Date.now(),plan:["","","",""],text:""};lstore.set(dk,d);
    box.innerHTML='<div class="w7timer"><span>⏱ <b class="tl"></b></span><span class="w7meta wn"></span></div>'+
      '<div class="w7pics">'+s.panels.map((p,i)=>'<figure><b>'+(i+1)+'</b>'+sceneSVG(p.scene,"")+'</figure>').join("")+'</div>'+
      '<details class="sp-card"><summary><b>'+t.exIdeas+'</b></summary><ol>'+s.panels.map(p=>'<li>'+esc(p[lang].q||"")+'</li>').join("")+'</ol></details>'+
      '<div class="sp-card"><h3 style="margin-top:0">'+t.exPlan+'</h3><div class="w7plan">'+t.planL.map((l,i)=>'<label><span class="w7meta">'+l+'</span><textarea rows="2" data-pl="'+i+'"></textarea></label>').join("")+'</div></div>'+
      '<div class="sp-card"><b>'+t.exPhr+'</b><div class="w7pool">'+examPhrases(s).map(w=>'<button tabindex="-1" data-w="'+esc(w)+'">'+esc(w)+'</button>').join("")+'</div></div>'+
      '<div class="sp-card"><h3 style="margin-top:0">'+t.exWrite+'</h3><p class="w7meta">'+t.exTarget(tw)+' · '+t.exPh+'</p><textarea class="comp" rows="18"></textarea><div class="row" style="gap:8px;margin-top:8px"><button class="btn fin">'+t.exFinish+'</button></div></div>';
    const ta=box.querySelector(".comp"),wn=box.querySelector(".wn"),tl=box.querySelector(".tl"),tb=box.querySelector(".w7timer");ta.value=d.text||"";box.querySelectorAll("[data-pl]").forEach(x=>{x.value=d.plan[+x.dataset.pl]||""});
    function save(){d.text=ta.value;box.querySelectorAll("[data-pl]").forEach(x=>{d.plan[+x.dataset.pl]=x.value});lstore.set(dk,d)}
    function upd(){const n=wc(ta.value);const ps=ta.value.split(/\n\s*\n|\n/).filter(x=>x.trim()).length;wn.textContent=n+" "+t.words+" · "+ps+" "+t.paras;
      box.querySelectorAll(".w7pool button").forEach(b=>b.classList.toggle("used",usesPhrase(ta.value,b.dataset.w)))}
    let warned=false;function tick(){const left=Math.round((d.start+d.mins*60000-Date.now())/1000);if(!document.body.contains(tl)){clearInterval(exTick);exTick=null;return}
      if(left<=0){tl.textContent="0:00";tb.classList.add("low");if(!warned){warned=true;toast(t.timeUp);if(W4.celebrate){}}return}
      tl.textContent=Math.floor(left/60)+":"+String(left%60).padStart(2,"0");tb.classList.toggle("low",left<300)}
    if(exTick)clearInterval(exTick);exTick=setInterval(tick,1000);tick();
    box.oninput=()=>{save();upd()};upd();
    box.querySelector(".w7pool").addEventListener("click",ev=>{const b=ev.target.closest("[data-w]");if(b)sayIt(b.dataset.w)});
    box.querySelector(".fin").onclick=()=>{save();if(wc(ta.value)<10){ta.focus();return}clearInterval(exTick);exTick=null;mark(s,d)};box.scrollIntoView({block:"start"})}
  function mark(s,d){const t=t7();const hints=autoHints(d.text);const sc={C:[null,null,null,null,null],L:[null,null,null,null,null]};
    box.innerHTML='<div class="sp-card"><h3 style="margin-top:0">'+t.exCheck+'</h3><div class="w7pics">'+s.panels.map((p,i)=>'<figure><b>'+(i+1)+'</b>'+sceneSVG(p.scene,"")+'</figure>').join("")+'</div>'+
      '<div class="w7text" style="white-space:pre-wrap;line-height:1.7;border:1.5px solid var(--rule);border-radius:12px;padding:12px;margin:8px 0">'+esc(d.text)+'</div></div>'+
      '<div class="sp-card"><h3 style="margin-top:0">🤖 '+t.auto+'</h3><ul class="w7hints">'+hints.map(h=>'<li>'+esc(h)+'</li>').join("")+'</ul></div>'+
      '<div class="sp-card"><h3 style="margin-top:0">📝 '+t.markTitle+'</h3><p class="muted">'+t.markLead+'</p>'+["C","L"].map(g=>'<h4>'+(g==="C"?t.content:t.language)+' <span class="w7meta sub-'+g+'"></span></h4><div class="w7mk">'+t[g].map((x,i)=>'<div><span>'+esc(x)+'</span><span class="w7seg" data-g="'+g+'" data-i="'+i+'">'+[t.no,t.bit,t.yes].map((y,v)=>'<button data-v="'+v+'" aria-pressed="false">'+y+'</button>').join("")+'</span></div>').join("")+'</div>').join("")+
      '<p>'+t.score+': <span class="w7score">– / 20</span></p><div class="row" style="gap:8px;flex-wrap:wrap"><button class="btn sv" disabled>'+t.saveMark+'</button><button class="btn ghost pr">'+t.print+'</button><button class="btn ghost ag">'+t.again+'</button></div><p class="fb"></p></div>';
    const scoreEl=box.querySelector(".w7score"),sv=box.querySelector(".sv");
    function calc(){const sum=a=>a.reduce((n,x)=>n+(x||0),0);const c=sum(sc.C),l=sum(sc.L);box.querySelector(".sub-C").textContent=c+" / 10";box.querySelector(".sub-L").textContent=l+" / 10";const done=sc.C.concat(sc.L).every(x=>x!==null);scoreEl.textContent=(done?c+l:"–")+" / 20";sv.disabled=!done;return c+l}
    box.querySelectorAll(".w7seg").forEach(sg=>sg.addEventListener("click",ev=>{const b=ev.target.closest("[data-v]");if(!b)return;sc[sg.dataset.g][+sg.dataset.i]=+b.dataset.v;sg.querySelectorAll("button").forEach(x=>x.setAttribute("aria-pressed",String(x===b)));calc()}));calc();
    sv.onclick=()=>{const total=calc();const k="wiw2-exam-"+lang;const L=lstore.get(k,[]);L.unshift({d:today(),set:s.id,w:wc(d.text),score:total,text:d.text,plan:d.plan});while(L.length>40)L.pop();lstore.set(k,L);lstore.set(dk,null);
      sv.disabled=true;const fb=box.querySelector(".fb");fb.className="fb good";fb.textContent=t.saved;star(lang+"-coach:exam:"+s.id+":"+today(),fb)};
    box.querySelector(".pr").onclick=()=>window.print();box.querySelector(".ag").onclick=()=>{lstore.set(dk,null);choose()};box.scrollIntoView({block:"start"})}
  function histHTML(){const t=t7();const L=lstore.get("wiw2-exam-"+lang,[]);if(!L.length)return"";
    return '<div class="sp-card"><h3 style="margin-top:0">'+t.history+'</h3><div class="w7mk">'+L.slice(0,12).map((x,i)=>'<div><span>'+esc(x.d)+' · '+x.w+' '+t.words+' · <b>'+x.score+' / 20</b></span><button class="btn ghost small" data-h="'+i+'">'+t.view+'</button></div>').join("")+'</div><div class="hv"></div></div>'}
  function bindHist(){const L=lstore.get("wiw2-exam-"+lang,[]);box.querySelectorAll("[data-h]").forEach(b=>b.onclick=()=>{const x=L[+b.dataset.h];const hv=box.querySelector(".hv");hv.innerHTML='<div class="w7text" style="white-space:pre-wrap;line-height:1.7;border:1.5px solid var(--rule);border-radius:12px;padding:12px;margin:8px 0">'+esc(x.text)+'</div><ul class="w7hints">'+autoHints(x.text).map(h=>'<li>'+esc(h)+'</li>').join("")+'</ul>'})}
  choose()}};

/* ---------- 4. Picture words (P1–P2, but anyone can play) ---------- */
const PW={
 prop:{wallet:["wallet","钱包"],money:["money","钱"],ball:["ball","球"],bicycle:["bicycle","自行车"],scooter:["scooter","滑板车"],dog:["dog","狗"],cat:["cat","猫"],puppy:["puppy","小狗"],kitten:["kitten","小猫"],bird:["bird","鸟"],vase:["vase","花瓶"],umbrella:["umbrella","雨伞"],schoolbag:["school bag","书包"],phone:["phone","手机"],book:["book","书"],cake:["cake","蛋糕"],plate:["plate","盘子"],bowl:["bowl","碗"],cup:["cup","杯子"],trophy:["trophy","奖杯"],medal:["medal","奖牌"],kite:["kite","风筝"],tree:["tree","树"],bench:["bench","长椅"],bus:["bus","公共汽车"],letter:["letter","信"],gift:["present","礼物"],flowerpot:["flowerpot","花盆"],bottle:["bottle","瓶子"],toy:["toy","玩具"],"banana-peel":["banana peel","香蕉皮"],fishtank:["fish tank","鱼缸"],basket:["basket","篮子"],broom:["broom","扫把"],icecream:["ice cream","冰淇淋"],laptop:["laptop","手提电脑"],drum:["drum","鼓"],desk:["desk","书桌"],chair:["chair","椅子"],table:["table","桌子"],bed:["bed","床"],lamp:["lamp","台灯"],window:["window","窗户"],door:["door","门"],stairs:["stairs","楼梯"],lift:["lift","电梯"],bin:["rubbish bin","垃圾桶"],shoppingbag:["shopping bag","购物袋"],mop:["mop","拖把"],box:["box","箱子"],sandcastle:["sandcastle","沙堡"],bucket:["bucket","水桶"],clock:["clock","时钟"],whiteboard:["whiteboard","白板"],shelf:["shelf","架子"],plant:["plant","盆栽"],firstaid:["first-aid kit","急救箱"]},
 bg:{classroom:["classroom","教室"],voiddeck:["void deck","组屋楼下"],hawker:["hawker centre","小贩中心"],playground:["playground","游乐场"],park:["park","公园"],living:["living room","客厅"],kitchen:["kitchen","厨房"],bedroom:["bedroom","卧室"],street:["street","街道"],busstop:["bus stop","巴士站"],mrt:["MRT station","地铁站"],beach:["beach","海边"],field:["field","操场"],library:["library","图书馆"],market:["market","巴刹"],hall:["school hall","礼堂"],zoo:["zoo","动物园"],clinic:["clinic","诊所"],garden:["garden","花园"]},
 face:{happy:["happy","开心"],laughing:["laughing","哈哈大笑"],sad:["sad","难过"],crying:["crying","哭"],scared:["scared","害怕"],angry:["angry","生气"],surprised:["surprised","惊讶"],worried:["worried","担心"],proud:["proud","骄傲"],shy:["shy","害羞"],thinking:["thinking","思考"],sleepy:["sleepy","想睡觉"],hurt:["hurt","痛"],relieved:["relieved","松了一口气"]},
 pose:{walk:["walking","走路"],run:["running","跑步"],sit:["sitting","坐着"],fall:["falling","摔倒"],wave:["waving","挥手"],cry:["crying","哭"],jump:["jumping","跳"],kneel:["kneeling","跪着"],shout:["shouting","大喊"],sleep:["sleeping","睡觉"],clap:["clapping","拍手"],think:["thinking","想"],point:["pointing","指着"]}};
const SMALL=new Set(["wallet","money","phone","letter","banana-peel","medal","cup","icecream","bottle","kitten","bird","clock","book","plate","bowl","toy","cake","trophy","ball","puppy","gift"]);
const MID=new Set(["cat","dog","vase","umbrella","schoolbag","flowerpot","fishtank","basket","laptop","drum","lamp","bucket","sandcastle","box","shoppingbag","plant","firstaid","bin","broom","mop","chair","scooter","puddle"]);
const INDOOR=new Set(["vase","phone","book","cake","plate","bowl","cup","trophy","medal","letter","gift","bottle","toy","fishtank","basket","broom","laptop","drum","desk","chair","table","bed","lamp","window","door","box","clock","whiteboard","shelf","plant","mop","firstaid","schoolbag","icecream","money","wallet","kitten","cat"]);
function pwPic(cat,k){try{if(cat==="face")return'<div class="w7big w7face">'+ART.face(k,{})+'</div>';
  if(cat==="bg")return'<div class="w7big">'+ART.scene({bg:k,time:"day"},{label:""})+'</div>';
  if(cat==="pose")return'<div class="w7big">'+ART.scene({bg:"playground",time:"day",actors:[{who:"boy",x:200,pose:k,face:k==="cry"?"crying":k==="sleep"?"sleepy":k==="fall"?"hurt":"happy"}]},{label:""})+'</div>';
  const vb=SMALL.has(k)?"140 180 120 90":MID.has(k)?"100 130 200 150":k==="kite"?"110 90 180 135":BIGC.has(k)?"60 80 280 210":null;let svg=ART.scene({bg:INDOOR.has(k)?"living":"park",time:"day",props:[{k,x:200}]},{label:""});if(vb)svg=svg.replace(/viewBox="[^"]*"/,'viewBox="'+vb+'"');return'<div class="w7big">'+svg+'</div>'}catch(e){return""}}
const BIGC=new Set(["desk","table","window","fence","shelf","bench","signboard","door","stairs","lift","bed","whiteboard","bicycle"]);
PAGES.picwords={sec:"practice",icon:"pictures",title:{en:"Picture words",zh:"看图学词"},render(m){const t=t7();pageHead(m,lang+"-picwords",zh()?"看图":"Look and learn",t.pwTitle,t.pwLead);
  if(!window.ART){m.appendChild(el("p","muted","…"));return}
  const box=el("section","block w7");m.appendChild(box);const L=zh()?1:0;
  const tabs=el("div","w7tabs",'<button data-tab="ch">'+t.pwChoose+'</button><button data-tab="se">'+t.pwSent+'</button>');box.before(tabs);
  function setTab(x){lstore.set("wiw2-pwmode",x);tabs.querySelectorAll("button").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.tab===x)));x==="se"?sent():choose()}
  tabs.addEventListener("click",ev=>{const b=ev.target.closest("[data-tab]");if(b)setTab(b.dataset.tab)});
  function choose(){const cats=["prop","prop","prop","bg","face","pose"];const qs=[];const seen=new Set();
    while(qs.length<10){const cat=cats[Math.floor(Math.random()*cats.length)];const keys=Object.keys(PW[cat]).filter(k=>cat!=="prop"||(ART.PROP||[]).includes(k));const k=keys[Math.floor(Math.random()*keys.length)];if(seen.has(cat+k))continue;seen.add(cat+k);
      const others=shuffle7(keys.filter(x=>x!==k&&PW[cat][x][L]!==PW[cat][k][L])).slice(0,2);qs.push({cat,k,opts:shuffle7([k].concat(others))})}
    let i=0,score=0,miss=false;
    function one(){if(i>=qs.length){box.innerHTML='<p class="fb good" style="font-size:1.3rem">'+t.pwDone+' '+t.pwScore(score,qs.length)+'</p><button class="btn">'+t.pwAgain+'</button>';box.querySelector("button").onclick=choose;star(lang+"-game:picwords:"+today(),box);return}
      const q=qs[i];miss=false;const Q={prop:t.pwQ,bg:t.pwQp,face:t.pwQf,pose:t.pwQa}[q.cat];
      box.innerHTML='<p class="w7meta">'+(i+1)+' / '+qs.length+' · ⭐ '+score+'</p><h3>'+Q+'</h3>'+pwPic(q.cat,q.k)+'<div class="w7opts">'+q.opts.map(k=>'<button data-k="'+k+'">'+esc(PW[q.cat][k][L])+'</button>').join("")+'</div>';
      box.querySelector(".w7opts").addEventListener("click",ev=>{const b=ev.target.closest("[data-k]");if(!b||b.disabled)return;
        if(b.dataset.k===q.k){b.classList.add("ok");if(!miss)score++;sayIt(PW[q.cat][q.k][L]);box.querySelectorAll(".w7opts button").forEach(x=>x.disabled=true);setTimeout(()=>{i++;one()},1100)}
        else{b.classList.add("no");b.disabled=true;miss=true;sayIt(PW[q.cat][b.dataset.k][L])}})}
    one()}
  function sent(){const S=(window.PICSETS||[]);if(!S.length)return;const set=S[Math.floor(Math.random()*S.length)];const p=set.panels[Math.floor(Math.random()*set.panels.length)];const sc=p.scene;
    const help=[];(sc.actors||[]).forEach(a=>{const who={boy:["boy","男孩"],girl:["girl","女孩"],man:["man","叔叔"],woman:["woman","阿姨"],grandpa:["grandpa","爷爷"],grandma:["grandma","奶奶"],teacher:["teacher","老师"],toddler:["little brother","小弟弟"]}[a.who];if(who)help.push(who[L]);if(a.face&&PW.face[a.face])help.push(PW.face[a.face][L]);if(a.pose&&PW.pose[a.pose])help.push(PW.pose[a.pose][L])});
    if(PW.bg[sc.bg])help.push(PW.bg[sc.bg][L]);(sc.props||[]).forEach(x=>{if(PW.prop[x.k])help.push(PW.prop[x.k][L])});const H=[...new Set(help)].slice(0,7);
    box.innerHTML='<div class="w7big">'+sceneSVG(sc,"")+'</div><p>'+t.psLead+'</p><div class="w7pool">'+H.map(w=>'<button data-w="'+esc(w)+'">'+esc(w)+'</button>').join("")+'</div><p class="w7meta">'+t.psFrame+'</p><textarea rows="2" placeholder="'+esc(t.psPh)+'"></textarea><div class="row" style="gap:8px;margin-top:8px;flex-wrap:wrap"><button class="btn ck">'+t.check+'</button><button class="btn ghost hr">'+t.hear+'</button><button class="btn ghost nw">'+t.psNew+'</button></div><p class="fb"></p>';
    const ta=box.querySelector("textarea"),fb=box.querySelector(".fb");
    box.querySelector(".w7pool").addEventListener("click",ev=>{const b=ev.target.closest("[data-w]");if(b){sayIt(b.dataset.w);b.classList.toggle("used",usesPhrase(ta.value,b.dataset.w))}});
    ta.addEventListener("input",()=>box.querySelectorAll(".w7pool button").forEach(b=>b.classList.toggle("used",usesPhrase(ta.value,b.dataset.w))));
    box.querySelector(".hr").onclick=()=>sayIt(ta.value||"");box.querySelector(".nw").onclick=sent;
    box.querySelector(".ck").onclick=()=>{const errs=sentCheck(ta.value,null).filter(Boolean);if(!H.some(w=>usesPhrase(ta.value,w)))errs.push(t.psNeed);
      if(errs.length){fb.className="fb bad";fb.textContent=errs.join(" ");return}fb.className="fb good";fb.textContent=t.psGood;sayIt(ta.value);saveSent(ta.value.trim(),H.filter(w=>usesPhrase(ta.value,w)),"picture");star(lang+"-coach:picsent:"+today(),fb)}}
  setTab(lstore.get("wiw2-pwmode","ch")==="sent"?"se":(lstore.get("wiw2-pwmode","ch")==="se"?"se":"ch"))}};

/* ---------- 5. tap to hear ---------- */
document.addEventListener("click",ev=>{const x=ev.target.closest&&ev.target.closest("#main .ex");if(x&&!ev.target.closest("button,a,input,textarea")){sayIt(x.innerHTML)}
  const c=ev.target.closest&&ev.target.closest("#main .chip");if(c&&zh()&&!stA())sayIt(c.textContent)},true);

/* ---------- 6. pinyin: all / hard only / off ---------- */
const EASYCH="一二三四五六七八九十百千万个人大小上下中左右前后里外天地日月水火山石田土木花草树叶鸟鱼虫马牛羊猫狗口手足目耳头心爸妈哥姐弟妹爷奶我你他她它们的是不了在有和也都很好多少来去走跑说看听写读字书本学校老师同学朋友家门开关吃喝饭菜果米面早午晚课今明昨年气雨雪风云太阳白红黄蓝绿黑色高长短冷热快慢新打玩笑哭坐站给拿要会能想爱喜欢没这那哪什么谁几吗呢吧啊对真又再还就才把从到向为只条张块自己起出入回东西南北边点分时候星期电话车飞机路公园商店买卖钱一样地得着过个子儿女男生";
let EASY=null;function easySet(){if(EASY)return EASY;EASY=new Set(EASYCH);(window.SPELL_ZH_WORDS||[]).forEach(x=>{if(x.lv==="A")for(const ch of x.w)EASY.add(ch)});return EASY}
const pcss=document.createElement("style");pcss.textContent="html.pyhard .pc.e::before{visibility:hidden}";document.head.appendChild(pcss);
function pyMode(){return store.get("wiw2-py",true)?(store.get("wiw2-pyhard",false)?"hard":"all"):"off"}
function applyPyMode(){const md=pyMode();document.documentElement.classList.toggle("nopy",lang==="zh"&&md==="off");document.documentElement.classList.toggle("pyhard",md==="hard");const b=$("#pyBtn");if(b){b.setAttribute("aria-pressed",String(md!=="off"));b.textContent=md==="hard"?t7().pyHard:t7().pyAll}
  if(md==="hard")markEasy()}
function markEasy(){const E=easySet();document.querySelectorAll("#main .pc:not(.e):not(.h)").forEach(s=>{s.classList.add(E.has(s.textContent)?"e":"h")})}
new MutationObserver(()=>{if(document.documentElement.classList.contains("pyhard"))markEasy()}).observe(document.getElementById("main"),{childList:true,subtree:true});
{const b=$("#pyBtn");if(b){b.onclick=()=>{const md=pyMode();if(md==="all"){store.set("wiw2-py",true);store.set("wiw2-pyhard",true)}else if(md==="hard"){store.set("wiw2-py",false);store.set("wiw2-pyhard",false)}else{store.set("wiw2-py",true);store.set("wiw2-pyhard",false)}applyPyMode()};
  b.title="拼音：全部 → 只有难字 → 关";applyPyMode()}}
const _sl7=setLang;setLang=function(){const r=_sl7.apply(this,arguments);applyPyMode();return r};
})();
