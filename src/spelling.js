/* ===== My Spelling / 我的听写 (runs inside the engine IIFE) ===== */
(function(){
const SW={en:[],zh:[]};const DICT={en:{},zh:{}};
[["en",window.SPELL_EN_WORDS],["zh",window.SPELL_ZH_WORDS]].forEach(([l,arr])=>(arr||[]).forEach(x=>{const k=l==="en"?x.w.toLowerCase():x.w;if(!DICT[l][k]){DICT[l][k]=x;SW[l].push(x)}}));
const PATTERNS=window.SPELL_EN_PATTERNS||[],HOMO=window.SPELL_EN_HOMO||[],GROUPS=window.SPELL_ZH_GROUPS||[];
const PRIORITY={en:["immediately","a while","into","another","their","through","breakfast","because","said","friend","there","they're","which","were","where","beautiful","different","favourite"],zh:[]};
const INT=[0,1,2,4,7,14,30];const MASTER=6;
const zh=()=>lang==="zh";
const T={en:{title:"My spelling",lead:"Ten minutes a day. Learn why each word is spelt that way, write it from memory, then review it again after 1, 2, 4, 7, 14 and 30 days until it sticks for good.",
  tabs:{today:"Today",mine:"My words",rules:"Rules & word families",homo:"Sound-alike words",card:"Proofreading card",prog:"Progress",how:"How it works"},
  due:n=>n+" to review",fresh:n=>n+" new",start:"Start today's spelling",nothing:"All done for today! Come back tomorrow, or learn a few extra words.",extra:"Learn 3 extra words",
  learn:"New word",hear:"▶ Hear it",letters:"🔤 Spell it out",trick:"The trick",cover:"Cover it and write it →",listen:"Listen, then write the word.",noVoice:"(No sound on this device – read the sentence and fill the gap.)",
  hint:"Show the first letter",check:"Check",right:["Spot on!","Perfect!","Yes! Well done.","Brilliant!","Nailed it!"],wrong:"Not yet – look carefully at the red letters.",capital:"Remember the capital letter!",
  fix3:"Write it correctly 3 times:",cont:"Continue →",paperQ:"Write it on paper, then tap the button.",reveal:"I've written it – show me",gotIt:"✓ I got it right",missed:"✗ I got it wrong",paperFix:"Write it correctly 3 times on your paper, then continue.",
  done:"Today's spelling is done!",score:(a,b)=>"You got "+a+" out of "+b+" right first time.",again:"Words to watch:",starMsg:"★ You earned a star for practising today.",back:"Back to Today",
  streak:n=>n+"-day streak",mastered:"Mastered",learning:"Learning",waiting:"Waiting to start",box:b=>"Step "+b+" of 6",next:"Next check",nowDue:"today",
  addTitle:"Add words",addLead:"One word per line. You can add a sentence and a trick after a | sign, e.g.  separate | Keep the apples separate. | There's A RAT in sepARATe.",add:"Add to my list",added:n=>n+" word(s) added. They will come first.",
  browse:"Browse the word list",browseLead:"Common words children often misspell. Tap + to add a word to the front of your list.",addOne:"+ Add",inList:"✓ In my list",remove:"Remove",reset:"Start again",sure:"Tap again to confirm",
  settings:"Settings",perDay:"New words each day",mode:"How to answer",type:"Type it",paper:"Write on paper (best for handwriting)",
  practise:"Practise these",pLead:"Look at the word, then it hides. Type it from memory.",look:"Look carefully…",
  homoLead:"These words sound the same (or nearly) but are spelt differently. Read the hints, then try the quiz.",pick:"Which word fits?",
  cardLead:"Stick this card on your desk. Before you hand in any writing, hunt for these words and check each one.",print:"🖨 Print",noTrouble:"Practise a few days first – your trickiest words will appear here.",
  progLead:"Your spelling so far.",acc:"Right first time",last14:"Last 14 days",trouble:"Trickiest words",thisWeek:"Mastered this week",
  todayCard:n=>"My spelling: "+n+" word"+(n===1?"":"s")+" to practise today",go:"Go →"},
 zh:{title:"我的听写",lead:"每天十分钟。先弄懂每个字为什么这样写，再凭记忆写出来，然后在第 1、2、4、7、14、30 天复习，直到真正记牢。",
  tabs:{today:"今天",mine:"我的词语",rules:"形近字",homo:"",card:"易错字卡",prog:"进步记录",how:"怎样用"},
  due:n=>"复习 "+n+" 个",fresh:n=>"新学 "+n+" 个",start:"开始今天的听写",nothing:"今天的听写完成啦！明天再来，或者多学几个新词。",extra:"多学 3 个新词",
  learn:"新词语",hear:"▶ 听一听",letters:"",trick:"记字窍门",cover:"盖住，写一写 →",listen:"听一听，把词语写在格子里。",noVoice:"（这台设备不能发声，请看拼音和句子来写。）",
  hint:"",check:"写好了，对答案",right:["全对！","写得真好！","太棒了！","完全正确！"],wrong:"",capital:"",
  fix3:"",cont:"继续 →",paperQ:"",reveal:"写好了，对答案",gotIt:"✓ 我写对了",missed:"✗ 我写错了",paperFix:"照着正确的字，在下面再写三遍。",
  done:"今天的听写完成啦！",score:(a,b)=>"第一次就写对 "+a+" 个，共 "+b+" 个。",again:"要多注意的词语：",starMsg:"★ 今天坚持练习，得到一颗星！",back:"回到今天",
  streak:n=>"连续 "+n+" 天",mastered:"已记牢",learning:"正在学",waiting:"等着学",box:b=>"第 "+b+" / 6 步",next:"下次复习",nowDue:"今天",
  addTitle:"添加词语",addLead:"每行一个词语。可以用 | 加上句子和窍门，例如：晴天 | 今天是个晴天。 | 有太阳才是晴天，所以是日字旁。",add:"加进我的词语",added:n=>"加了 "+n+" 个词语，会优先练习。",
  browse:"浏览易错词语",browseLead:"小朋友常常写错的词语。点“＋”把它加到最前面。",addOne:"＋ 加入",inList:"✓ 已加入",remove:"删除",reset:"重新开始",sure:"再点一次确认",
  settings:"设置",perDay:"每天新学几个",mode:"",type:"",paper:"",
  practise:"",pLead:"",look:"",homoLead:"",pick:"选一选，哪个字对？",
  cardLead:"把这张卡贴在书桌上。交作文或听写前，专门检查这些字。",print:"🖨 打印",noTrouble:"先练习几天，你最容易写错的字就会出现在这里。",
  progLead:"你的听写进步记录。",acc:"第一次就写对",last14:"最近 14 天",trouble:"最容易写错的",thisWeek:"本周记牢",
  todayCard:n=>"我的听写：今天要练 "+n+" 个词语",go:"去练习 →",
  clear:"擦掉",draw:"在格子里写",copy3:"照着写三遍：",parts:"拆一拆",confuse:"别写成",groupsLead:"这些字长得像、读音也像。先看清楚偏旁的意思，再做小测验。",quiz:"小测验",
  tryQuiz:"做小测验",qWin:"全对！★",qScore:(a,b)=>"答对 "+a+" / "+b}};
const t=()=>T[lang];
T.en.tabs.test="School test";T.zh.tabs.test="学校听写";
const XT={en:{mockDone:"Practice test finished",mockLead:"Any word you missed has gone back into your daily review.",spotBtn:"Bonus: Spot the mistake",
  testOn:(ti,d)=>(ti?ti+" – ":"")+"school test on "+d,ready:(a,b)=>a+" of "+b+" words are getting strong",mock:"Practice test",
  testTitle:"This week's school spelling list",testLead:"Type the words from the school list (one per line). You can add the sentence after a | sign. These words go to the front of the daily practice until the test day.",
  testName:"Name (optional), e.g. Spelling 12",testDate:"Test date",saveTest:"Save the list",clearTest:"Clear the list",printList:"🖨 Print the list",
  practiseAll:"Practise all the test words now",noTest:"No school list yet.",saved:"Saved!",
  spotTitle:"Spot the mistake",spotLead:"One word in each sentence is spelt wrongly. Tap it, then type it correctly.",spotFix:"Now type it correctly:",spotWin:"Detective work! ★",
  patterns:"Your mistake patterns",patLead:"From your wrong attempts. Work on the biggest one first.",
  fromBook:"Add single words from my word book",
  pat:{homo:["Sound-alike mix-ups","You wrote a real word that sounds the same (e.g. there/their). Do the Sound-alike words quizzes."],dbl:["Double letters","You missed or added a double letter. Say the word slowly and listen for the short vowel before the double: hopping, dinner, immediately."],
   swap:["Letters in the wrong order","The right letters are there but jumbled (e.g. freind). Use Spell it out and say the letters in order."],end:["Word endings","The ending went wrong (-ly, -ful, -ed, -tion, -ous…). Learn the ending rules in Rules & word families."],
   silent:["Silent letters","You left out a silent letter (k-nife, w-rite, lam-b). Say it in your 'spelling voice': k-nife."],vowel:["Vowel sounds","The vowels were wrong (a, e, i, o, u). Find the tricky vowel and make a memory hook for it."],
   miss:["Missing a letter","One letter was missing. Look, say, cover, write – and check every letter."],other:["Other mistakes","Keep practising – look carefully at the red letters each time."]}},
 zh:{mockDone:"模拟听写完成",mockLead:"写错的词语已经放回每天的复习里。",spotBtn:"",testOn:(ti,d)=>(ti?ti+"：":"")+d+" 学校听写",ready:(a,b)=>"已经比较熟的："+a+" / "+b,mock:"模拟听写",
  testTitle:"本周学校听写词语",testLead:"把学校的听写词语输入进来，每行一个，可以用 | 加句子。考试前，这些词语会优先练习。",testName:"名称（可不填），例如：听写 12",testDate:"听写日期",saveTest:"保存",clearTest:"清除",printList:"🖨 打印词语表",
  practiseAll:"现在练习全部听写词语",noTest:"还没有输入学校的听写词语。",saved:"已保存！",patterns:"",patLead:"",fromBook:"从生词本加入词语",pat:{}}};
const X=()=>XT[lang];
function addDaysTo(d,n){const x=new Date(d+"T00:00:00");x.setDate(x.getDate()+n);return dkey(x)}
function tTest(b){const s=S();const tt=s.test||{words:[],date:addDays(4),title:"",sent:[]};
  const c=el("div","sp-card sp-noprint",'<h3>'+X().testTitle+'</h3><p class="muted">'+esc(X().testLead)+'</p><input class="lsearch tn" placeholder="'+esc(X().testName)+'"><label>'+X().testDate+' <input type="date" class="td" style="font:inherit;padding:6px;border-radius:8px;border:1.5px solid var(--rule)"></label><textarea rows="8" style="width:100%;box-sizing:border-box;font:inherit;font-size:1.1rem;padding:8px;border-radius:10px;border:1.5px solid var(--rule);background:var(--card);color:var(--ink)"></textarea><div class="row" style="gap:8px;flex-wrap:wrap"><button class="btn sv">'+X().saveTest+'</button><button class="btn ghost small cl">'+X().clearTest+'</button><span class="msg muted"></span></div>');
  c.querySelector(".tn").value=tt.title||"";c.querySelector(".td").value=tt.date||addDays(4);
  c.querySelector("textarea").value=(tt.words||[]).map(w=>{const x=(tt.sent||[]).find(y=>y.w===w);return w+(x&&x.s?" | "+x.s:"")}).join("\n");
  c.querySelector(".sv").onclick=()=>{const lines=c.querySelector("textarea").value.split(/\n+/).map(x=>x.trim()).filter(Boolean);const s2=S();const words=[],sent=[];
    lines.forEach(l=>{const [w,se]=l.split("|").map(x=>(x||"").trim());if(w&&!words.includes(w)){words.push(w);if(se)sent.push({w,s:se})}});
    s2.test={words,sent,date:c.querySelector(".td").value||addDays(4),title:c.querySelector(".tn").value.trim()};save(s2);c.querySelector(".msg").textContent=X().saved;drawInfo()};
  c.querySelector(".cl").onclick=()=>{const s2=S();delete s2.test;save(s2);b.innerHTML="";tTest(b)};
  b.appendChild(c);const info=el("div","sp-card");b.appendChild(info);
  function drawInfo(){const s2=S();const T2=s2.test;if(!T2||!T2.words.length){info.innerHTML='<p class="muted">'+X().noTest+'</p>';return}
    info.innerHTML='<h3>'+esc(T2.title||X().testTitle)+' <span class="muted" style="font-size:1rem">'+esc(T2.date)+'</span></h3><ol class="sp-print">'+T2.words.map(w=>{const cd=s2.cards[w];const [cl,lab]=status(cd);return '<li><b'+(zh()?' style="font-family:KaiTi,STKaiti,serif;font-size:1.3rem"':'')+'>'+esc(w)+'</b> <span class="sp-badge '+cl+' sp-noprint">'+lab+'</span></li>'}).join("")+'</ol><div class="row sp-noprint" style="gap:8px;flex-wrap:wrap"></div>';
    const row=info.querySelector(".row");const p=el("button","btn",X().practiseAll);p.onclick=()=>{const s3=S();const neu=T2.words.filter(w=>!s3.cards[w]);const old=T2.words.filter(w=>s3.cards[w]&&s3.cards[w].b<MASTER);session(b,old,neu)};
    const m=el("button","btn ghost",X().mock);m.onclick=()=>session(b,seededShuffle(T2.words,()=>Math.random()),[],{mock:true});const pr=el("button","btn ghost small",X().printList);pr.onclick=()=>window.print();row.append(p,m,pr)}
  drawInfo()}
function collapse(w){return w.replace(/(.)\1+/g,"$1")}
function classify(target,typed){const a=target.toLowerCase().trim(),y=typed.toLowerCase().trim();if(!y||a===y)return null;
  if(DICT.en[y]||HOMO.some(h=>h.set.some(z=>z.toLowerCase()===y)))return "homo";
  if(collapse(a)===collapse(y))return "dbl";
  if(a.length===y.length&&[...a].sort().join("")===[...y].sort().join(""))return "swap";
  const ends=["ly","ful","ed","tion","sion","ous","ing","le","ture","ness","ment"];const e=ends.find(x=>a.endsWith(x));if(e&&a.slice(0,a.length-e.length-1)===y.slice(0,a.length-e.length-1)&&!y.endsWith(e))return "end";
  for(let i=0;i<a.length;i++){if("kwbhgtnu".includes(a[i])&&a.slice(0,i)+a.slice(i+1)===y)return "silent"}
  if(a.replace(/[aeiouy]/g,"*")===y.replace(/[aeiouy]/g,"*"))return "vowel";
  if(y.length===a.length-1){let j=0;for(const ch of a){if(ch===y[j])j++}if(j===y.length)return "miss"}
  return "other"}
function patternsHTML(s){if(zh())return "";const cnt={};Object.keys(s.cards).forEach(w=>(s.cards[w].bad||[]).forEach(y=>{const k=classify(w,y);if(k)cnt[k]=(cnt[k]||0)+1}));
  const ks=Object.keys(cnt).sort((a,b)=>cnt[b]-cnt[a]);if(!ks.length)return "";const mx=cnt[ks[0]];
  return '<h4>'+X().patterns+'</h4><p class="muted">'+X().patLead+'</p>'+ks.map(k=>'<div style="margin:6px 0"><b>'+X().pat[k][0]+'</b> <span class="muted">×'+cnt[k]+'</span><div class="sp-prog"><i style="width:'+Math.round(cnt[k]/mx*100)+'%;background:var(--bad)"></i></div><div class="muted" style="font-size:.95rem">'+esc(X().pat[k][1])+'</div></div>').join("")}
function mutate(w){const m=w.match(/([a-z])\1/i);if(m)return w.replace(m[0],m[1]);const vs=[...w].map((c,i)=>/[aeiou]/i.test(c)&&i>0?i:-1).filter(i=>i>0);
  if(w.length>4){const i=1+Math.floor(w.length/2)-1;if(w[i]!==w[i+1])return w.slice(0,i)+w[i+1]+w[i]+w.slice(i+2)}
  if(vs.length){const i=vs[0];const r="aeiou".replace(w[i].toLowerCase(),"");return w.slice(0,i)+r[0]+w.slice(i+1)}return w+w.slice(-1)}
function spotGame(b){const s=S();let pool=Object.keys(s.cards).map(w=>entry(w)).filter(e=>e.s&&!/\s|'/.test(e.w)&&e.w.length>=4);if(pool.length<4)pool=SW.en.filter(e=>e.lv!=="C"&&!/\s|'/.test(e.w)&&e.w.length>=4).slice(0,40);
  const items=seededShuffle(pool,()=>Math.random()).slice(0,6);let k=0,ok=0;
  function show(){b.innerHTML="";if(k>=items.length){const box=el("div","sp-card",'<h3>'+X().spotTitle+'</h3><p style="font-size:1.4rem"><b>'+ok+' / '+items.length+'</b></p>');const sk="en-game:spot:"+today();if(ok>=items.length-1&&!hasStar(sk)){giveStar(sk,box);box.appendChild(el("p","fb good",X().spotWin));refreshNav()}const bk=el("button","btn ghost",t().back);bk.onclick=()=>{b.innerHTML="";tToday(b)};box.appendChild(bk);b.appendChild(box);return}
    const e=items[k];const bad=mutate(e.w);const i=e.s.toLowerCase().indexOf(e.w.toLowerCase());const sent=e.s.slice(0,i)+bad+e.s.slice(i+e.w.length);
    const c=el("div","sp-card",'<span class="tag">'+X().spotTitle+' '+(k+1)+'/'+items.length+'</span><p class="muted">'+X().spotLead+'</p>');const words=sent.split(/(\s+)/);const row=el("div","sp-chips");
    words.forEach(tok=>{if(!tok.trim())return;const bt=el("button","",esc(tok));bt.onclick=()=>{if(row.dataset.done)return;row.dataset.done=1;const clean=tok.replace(/[^A-Za-z']/g,"");const hit=clean.toLowerCase()===bad.toLowerCase();bt.style.background=hit?"var(--good)":"var(--bad)";bt.style.color="#fff";
      if(!hit)[...row.children].forEach(x=>{if(x.textContent.replace(/[^A-Za-z']/g,"").toLowerCase()===bad.toLowerCase()){x.style.background="var(--pencil)"}});
      c.appendChild(el("p","",'<b>'+X().spotFix+'</b>'));const inp=document.createElement("input");inp.className="sp-in";["autocomplete","autocorrect","autocapitalize"].forEach(a=>inp.setAttribute(a,"off"));inp.setAttribute("spellcheck","false");c.appendChild(inp);inp.focus();
      const ck=el("button","btn",t().check);c.appendChild(ck);const go=()=>{ck.disabled=true;inp.disabled=true;const r=cmpEn(inp.value,e.w).ci;if(r&&hit)ok++;c.appendChild(el("p","fb "+(r?"good":"bad"),r?"✓":"✗ "+esc(e.w)));if(!r)grade(e.w,false,inp.value);const n=el("button","btn",t().cont);n.onclick=()=>{k++;show()};c.appendChild(n);n.focus()};ck.onclick=go;inp.addEventListener("keydown",ev=>{if(ev.key==="Enter"&&!ck.disabled)go()})};row.appendChild(bt)});
    c.appendChild(row);b.appendChild(c)}
  show()}

const st=document.createElement("style");st.textContent=`
.sp-tabs{display:flex;gap:6px;flex-wrap:wrap;margin:6px 0 14px}.sp-tabs button{flex:none}
@media (max-width:700px){.sp-tabs{flex-wrap:nowrap;overflow-x:auto;padding-bottom:6px}}
.sp-card{background:var(--card);border:1.5px solid var(--rule);border-radius:16px;padding:16px;display:grid;gap:12px}
.sp-word{font-size:2.4rem;font-weight:800;letter-spacing:.04em;font-family:var(--display);word-break:break-word}
.sp-word.zhw{font-family:"KaiTi","STKaiti","Kaiti SC",serif;font-weight:400;font-size:3rem;letter-spacing:.12em}
.sp-sent{font-size:1.2rem;line-height:1.6}.sp-sent b{background:color-mix(in srgb,var(--pencil) 45%,transparent);padding:0 4px;border-radius:4px}
.sp-blank{display:inline-block;min-width:5em;border-bottom:3px solid var(--blue);margin:0 4px}
.sp-trick{border-left:5px solid var(--pencil);padding:8px 12px;background:color-mix(in srgb,var(--pencil) 14%,var(--card));border-radius:0 10px 10px 0}
.sp-in{width:100%;box-sizing:border-box;font:inherit;font-size:1.6rem;padding:10px 14px;border:2px solid var(--blue);border-radius:12px;background:var(--card);color:var(--ink);letter-spacing:.03em}
.sp-diff{font-size:1.8rem;font-family:var(--display);letter-spacing:.06em}.sp-diff .ok{color:var(--good)}.sp-diff .bad{color:var(--bad);text-decoration:underline wavy}.sp-diff .miss{color:var(--bad);opacity:.6}
.sp-prog{height:8px;border-radius:8px;background:var(--rule);overflow:hidden}.sp-prog i{display:block;height:100%;background:var(--good)}
.sp-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:8px}.sp-stats div{background:var(--card);border:1px solid var(--rule);border-radius:12px;padding:10px;text-align:center}.sp-stats b{display:block;font-size:1.8rem}
.sp-list{display:grid;gap:6px}.sp-row{display:flex;gap:8px;align-items:center;flex-wrap:wrap;border-bottom:1px dashed var(--rule);padding:6px 0}.sp-row .w{font-weight:700;min-width:7em}
.sp-badge{font-size:.78rem;border-radius:999px;padding:2px 8px;background:var(--rule)}.sp-badge.m{background:color-mix(in srgb,var(--good) 30%,transparent)}.sp-badge.l{background:color-mix(in srgb,var(--pencil) 40%,transparent)}
.sp-bars{display:flex;gap:4px;align-items:flex-end;height:90px}.sp-bars div{flex:1;display:flex;flex-direction:column-reverse;gap:1px;min-width:0}.sp-bars i{display:block;background:var(--good);border-radius:3px 3px 0 0}.sp-bars i.x{background:var(--bad)}.sp-bars small{font-size:.6rem;text-align:center;color:var(--muted)}
.tzg-row{display:flex;gap:8px;flex-wrap:wrap}.tzg{position:relative;width:min(120px,22vw);aspect-ratio:1;border:2px solid #c0392b;border-radius:4px;background:#fff;
 background-image:linear-gradient(#e8b4ad,#e8b4ad),linear-gradient(#e8b4ad,#e8b4ad);background-size:100% 1px,1px 100%;background-position:center;background-repeat:no-repeat;touch-action:none}
.tzg canvas{position:absolute;inset:0;width:100%;height:100%}.tzg .ans{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:"KaiTi","STKaiti","Kaiti SC",serif;font-size:min(90px,17vw);color:rgba(46,125,50,.35);pointer-events:none}
.sp-print{font-size:1.2rem}.sp-print li{margin:8px 0}
.sp-chips{display:flex;flex-wrap:wrap;gap:6px}.sp-chips button{font:inherit;border:1.5px solid var(--rule);border-radius:999px;background:var(--card);color:var(--ink);padding:4px 12px;cursor:pointer}
.sp-mcq{display:flex;gap:8px;flex-wrap:wrap}.sp-mcq button{font:inherit;font-size:1.4rem;min-width:56px;min-height:48px;border-radius:12px;border:2px solid var(--rule);background:var(--card);color:var(--ink);cursor:pointer}
.sp-mcq button.ok{background:var(--good);color:#fff;border-color:var(--good)}.sp-mcq button.no{background:var(--bad);color:#fff;border-color:var(--bad)}
.sp-zchar{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:8px}.sp-zchar div{background:var(--card);border:1px solid var(--rule);border-radius:12px;padding:10px}.sp-zchar .c{font-family:"KaiTi","STKaiti",serif;font-size:2.4rem}
@media print{.sp-noprint{display:none!important}}
`;document.head.appendChild(st);

/* ---------- state ---------- */
const KEY=()=>"wiw2-spell-"+lang;
function S(){const s=lstore.get(KEY(),null)||{};s.cards=s.cards||{};s.custom=s.custom||[];s.days=s.days||{};s.set=Object.assign({perDay:5,mode:"type"},s.set||{});return s}
function save(s){lstore.set(KEY(),s)}
function addDays(n){const d=new Date();d.setDate(d.getDate()+n);return dkey(d)}
const norm=w=>zh()?w:String(w).toLowerCase();
function entry(w){const s=S();const c=s.custom.find(x=>norm(x.w)===norm(w))||((s.test&&s.test.sent)||[]).find(x=>norm(x.w)===norm(w));const b=DICT[lang][norm(w)];return Object.assign({w},b||{},c&&c.s?{s:c.s}:{},c&&c.trick?{trick:c.trick}:{},{w:(b&&b.w)||w})}
function lvOrder(){const st=stageOf();return st==="A"?["A","B"]:st==="B"?["A","B","C"]:["B","C","A"]}
function queue(s){const out=[],seen=new Set(Object.keys(s.cards).map(norm));const push=w=>{const k=norm(w);if(!seen.has(k)){seen.add(k);out.push(w)}};
  if(s.test&&s.test.date>=today())s.test.words.forEach(w=>push(w));s.custom.forEach(c=>push(c.w));if(stageOf()!=="A")PRIORITY[lang].forEach(w=>{if(DICT[lang][norm(w)])push(DICT[lang][norm(w)].w)});
  const lo=lvOrder();[1,2,3].forEach(r=>lo.forEach(l=>SW[lang].filter(x=>x.rank===r&&x.lv===l).forEach(x=>push(x.w))));return out}
function dueList(s){const td=today();return Object.keys(s.cards).filter(k=>{const c=s.cards[k];return c.b>=1&&c.due<=td}).sort((a,b)=>s.cards[a].due.localeCompare(s.cards[b].due)||s.cards[a].b-s.cards[b].b)}
function newToday(s){const d=s.days[today()];return (d&&d.newN)||0}
function streak(s){let n=0;for(let i=0;i<400;i++){const d=s.days[addDays(-i)];if(d&&d.done)n++;else if(i>0)break}return n}
function grade(w,ok,typed){const s=S();const k=w;const c=s.cards[k]||{b:0,r:0,x:0,hist:[]};if(!ok&&typed&&String(typed).trim())c.bad=(c.bad||[]).concat(String(typed).trim()).slice(-6);
  if(ok){c.b=Math.min(c.b+1,MASTER);c.r++;c.due=addDays(INT[c.b]);if(c.b>=MASTER&&!c.mAt)c.mAt=today()}else{c.b=1;c.x++;c.due=addDays(1);c.mAt=null}
  c.hist=(c.hist||[]).concat(ok?1:0).slice(-8);c.last=today();s.cards[k]=c;
  const d=s.days[today()]=s.days[today()]||{r:0,x:0};if(ok)d.r++;else d.x++;save(s)}
function startCard(w){const s=S();if(!s.cards[w]){s.cards[w]={b:0,r:0,x:0,hist:[],added:today()};const d=s.days[today()]=s.days[today()]||{r:0,x:0};d.newN=(d.newN||0)+1;save(s)}}

/* ---------- helpers ---------- */
function say(x){if(canSpeak)speak(x)}
function slowWord(e){try{speechSynthesis.cancel();const tx=zh()?e.w+"。"+(e.s||"")+"。"+e.w:e.w+". "+(e.s||"")+". "+e.w;const u=new SpeechSynthesisUtterance(tx);const v=bestVoice();if(v){u.voice=v;u.lang=v.lang}else u.lang=zh()?"zh-CN":"en-GB";u.rate=zh()?0.55:0.6;speechSynthesis.speak(u)}catch(x){}}
function sayWord(e){say(zh()?e.w+"。"+(e.s||"")+"。"+e.w:e.w+". "+(e.s||"")+". "+e.w)}
function blankSent(e){const s=e.s||"";if(!s)return "";const i=zh()?s.indexOf(e.w):s.toLowerCase().indexOf(e.w.toLowerCase());if(i<0)return esc(s);
  return esc(s.slice(0,i))+(zh()?'（<span class="sp-blank" style="min-width:'+(e.w.length*1.2)+'em"></span>）':'<span class="sp-blank"></span>')+esc(s.slice(i+e.w.length))}
function hiSent(e){const s=e.s||"";const i=zh()?s.indexOf(e.w):s.toLowerCase().indexOf(e.w.toLowerCase());if(i<0)return esc(s);return esc(s.slice(0,i))+'<b>'+esc(s.slice(i,i+e.w.length))+'</b>'+esc(s.slice(i+e.w.length))}
function cmpEn(a,b){const f=x=>String(x).trim().replace(/[’‘`]/g,"'").replace(/\s+/g," ");return {exact:f(a)===f(b),ci:f(a).toLowerCase()===f(b).toLowerCase()}}
function diffEn(target,typed){const A=[...target],B=[...typed.trim()];const n=A.length,m=B.length,dp=Array.from({length:n+1},()=>new Array(m+1).fill(0));
  for(let i=n-1;i>=0;i--)for(let j=m-1;j>=0;j--)dp[i][j]=A[i].toLowerCase()===B[j].toLowerCase()?dp[i+1][j+1]+1:Math.max(dp[i+1][j],dp[i][j+1]);
  let i=0,j=0,html="";while(i<n||j<m){if(i<n&&j<m&&A[i].toLowerCase()===B[j].toLowerCase()){html+='<span class="ok">'+esc(B[j])+'</span>';i++;j++}
    else if(j<m&&(i>=n||dp[i][j+1]>=dp[i+1][j])){html+='<span class="bad">'+esc(B[j])+'</span>';j++}else{html+='<span class="miss">_</span>';i++}}return html}
function pyOf(e){if(e.py)return e.py;try{return window.pinyinPro?pinyinPro.pinyin(e.w):""}catch(x){return ""}}
function pads(n,ans){const row=el("div","tzg-row");for(let i=0;i<n;i++){const d=el("div","tzg");const c=document.createElement("canvas");d.appendChild(c);row.appendChild(d);
    let drawing=false,ctx=null;const fit=()=>{const r=d.getBoundingClientRect();const k=window.devicePixelRatio||1;c.width=r.width*k;c.height=r.height*k;ctx=c.getContext("2d");ctx.scale(k,k);ctx.lineWidth=Math.max(4,r.width/22);ctx.lineCap="round";ctx.lineJoin="round";ctx.strokeStyle="#1c2340"};
    requestAnimationFrame(fit);const pt=ev=>{const r=c.getBoundingClientRect();return [ev.clientX-r.left,ev.clientY-r.top]};
    c.addEventListener("pointerdown",ev=>{if(!ctx)fit();drawing=true;c.setPointerCapture(ev.pointerId);const [x,y]=pt(ev);ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+.1,y+.1);ctx.stroke()});
    c.addEventListener("pointermove",ev=>{if(!drawing)return;const [x,y]=pt(ev);ctx.lineTo(x,y);ctx.stroke()});
    ["pointerup","pointercancel","pointerleave"].forEach(e=>c.addEventListener(e,()=>{drawing=false}));
    d.clear=()=>{if(ctx)ctx.clearRect(0,0,c.width,c.height)};d.show=ch=>{if(!d.querySelector(".ans"))d.appendChild(el("div","ans",esc(ch)))}}
  return row}
function clearBtn(row){const b=el("button","btn ghost small",T.zh.clear);b.onclick=()=>row.querySelectorAll(".tzg").forEach(d=>{d.clear();const a=d.querySelector(".ans");if(a)a.remove()});return b}

/* ---------- page ---------- */
let tab="today";
PAGES.myspell={sec:"practice",icon:"abc",title:{en:"My spelling",zh:"我的听写"},render(m){
  pageHead(m,lang+"-myspell",zh()?"练习":"Practice",t().title,t().lead);
  const tabs=el("div","sp-tabs sp-noprint");const keys=["today","test","mine","rules"].concat(zh()?[]:["homo"]).concat(["card","prog","how"]);
  tabs.innerHTML=keys.map(k=>'<button class="pill" data-t="'+k+'" aria-pressed="'+(k===tab)+'">'+t().tabs[k]+'</button>').join("");m.appendChild(tabs);
  const body=el("div");m.appendChild(body);
  tabs.addEventListener("click",ev=>{const b=ev.target.closest("[data-t]");if(!b)return;tab=b.dataset.t;tabs.querySelectorAll("[data-t]").forEach(x=>x.setAttribute("aria-pressed",x===b));draw()});
  function draw(){body.innerHTML="";try{({today:tToday,test:tTest,mine:tMine,rules:zh()?tGroups:tRules,homo:tHomo,card:tCard,prog:tProg,how:tHow})[tab](body)}catch(e){body.textContent=String(e)}}
  draw()}};

/* ---------- Today / session ---------- */
function tToday(b){const s=S();const due=dueList(s);const left=Math.max(0,s.set.perDay-newToday(s));const q=queue(s).slice(0,left);
  const d=s.days[today()];if(s.test&&s.test.date>=today()&&s.test.words.length){const ready=s.test.words.filter(w=>s.cards[w]&&s.cards[w].b>=2).length;const tb=el("div","sp-card",'<b>📝 '+esc(X().testOn(s.test.title||"",s.test.date))+'</b><div class="sp-prog"><i style="width:'+Math.round(ready/s.test.words.length*100)+'%"></i></div><span class="muted">'+X().ready(ready,s.test.words.length)+'</span>');const gb=el("button","btn ghost small",X().mock);gb.onclick=()=>session(b,seededShuffle(s.test.words,()=>Math.random()),[],{mock:true});tb.appendChild(gb);b.appendChild(tb)}
  const box=el("div","sp-card");
  box.innerHTML='<div class="sp-stats"><div><b>'+due.length+'</b>'+(zh()?"要复习":"to review")+'</div><div><b>'+q.length+'</b>'+(zh()?"新词语":"new words")+'</div><div><b>'+streak(s)+'</b>'+(zh()?"连续天数":"day streak")+'</div></div>';
  if(due.length+q.length){const go=el("button","btn",t().start+" ("+(due.length+q.length)+")");go.onclick=()=>session(b,due,q);box.appendChild(go)}
  else{box.appendChild(el("p","fb good",t().nothing));const ex=el("button","btn ghost",t().extra);ex.onclick=()=>{const qq=queue(S()).slice(0,3);if(qq.length)session(b,[],qq)};box.appendChild(ex)}
  const set=el("details","sp-noprint",'<summary>'+t().settings+'</summary><div class="row" style="gap:8px;margin-top:8px;flex-wrap:wrap"><span>'+t().perDay+'</span>'+[3,5,8].map(n=>'<button class="pill" data-n="'+n+'" aria-pressed="'+(s.set.perDay===n)+'">'+n+'</button>').join("")+'</div>'+
    (zh()?'':'<div class="row" style="gap:8px;margin-top:8px;flex-wrap:wrap"><span>'+t().mode+'</span><button class="pill" data-m="type" aria-pressed="'+(s.set.mode==="type")+'">'+t().type+'</button><button class="pill" data-m="paper" aria-pressed="'+(s.set.mode==="paper")+'">'+t().paper+'</button></div>'));
  set.addEventListener("click",ev=>{const n=ev.target.closest("[data-n]"),mo=ev.target.closest("[data-m]");if(!n&&!mo)return;const s2=S();if(n)s2.set.perDay=+n.dataset.n;if(mo)s2.set.mode=mo.dataset.m;save(s2);b.innerHTML="";tToday(b)});
  b.append(box,set)}

function session(b,due,fresh,opts){opts=opts||{};const items=[...fresh.map(w=>({w,isNew:true})),...due.map(w=>({w}))];
  /* interleave: new words first get learnt, reviews mixed in */
  let i=0,first=0,firstTotal=items.length;const missed=[];const retried=new Set();
  function nextItem(){b.innerHTML="";if(i>=items.length)return finish();const it=items[i];const e=entry(it.w);
    const bar=el("div","sp-prog sp-noprint",'<i style="width:'+Math.round(i/items.length*100)+'%"></i>');b.appendChild(bar);
    if(it.isNew&&!it.learnt){learnStep(e,()=>{it.learnt=true;startCard(e.w);b.innerHTML="";b.appendChild(bar);testStep(e,it);b.scrollIntoView({block:"start"})})}else testStep(e,it)}
  function learnStep(e,done){const c=el("div","sp-card");
    c.innerHTML='<span class="tag">'+t().learn+'</span>'+(zh()?'<div class="muted" style="font-size:1.2rem">'+esc(pyOf(e))+'</div><div class="sp-word zhw">'+esc(e.w)+'</div>':'<div class="sp-word">'+esc(e.w)+'</div>')+
      (e.s?'<div class="sp-sent">'+hiSent(e)+'</div>':'')+
      (e.parts?'<div><span class="tag">'+T.zh.parts+'</span> <b style="font-size:1.3rem">'+esc(e.parts)+'</b></div>':'')+
      (e.trick?'<div class="sp-trick"><span class="tag">'+t().trick+'</span><div>'+esc(e.trick)+'</div></div>':'')+
      (e.confuse?'<div><span class="tag">'+T.zh.confuse+'</span> '+esc(e.confuse)+'</div>':'')+'<div class="row sp-btns" style="gap:8px;flex-wrap:wrap"></div>';
    const row=c.querySelector(".sp-btns");if(canSpeak){const h=el("button","btn ghost small",t().hear);h.onclick=()=>sayWord(e);row.appendChild(h);const sl=el("button","btn ghost small",zh()?"🐢 慢速":"🐢 Slow");sl.onclick=()=>slowWord(e);row.appendChild(sl);
      if(!zh()){const l=el("button","btn ghost small",t().letters);l.onclick=()=>say([...e.w].map(ch=>ch===" "?"space":ch==="'"?"apostrophe":ch).join(", "));row.appendChild(l)}}
    const go=el("button","btn",t().cover);go.onclick=done;row.appendChild(go);b.appendChild(c);if(canSpeak)setTimeout(()=>sayWord(e),300)}
  function promptHTML(e){return '<p class="muted">'+t().listen+(canSpeak?'':' '+t().noVoice)+'</p>'+(zh()?'<div style="font-size:1.4rem">'+esc(pyOf(e))+'</div>':'')+(e.s?'<div class="sp-sent">'+blankSent(e)+'</div>':'')}
  function testStep(e,it){const c=el("div","sp-card");c.innerHTML=promptHTML(e);const btns=el("div","row",'');btns.style.cssText="gap:8px;flex-wrap:wrap";
    if(canSpeak){const h=el("button","btn ghost small",t().hear);h.onclick=()=>sayWord(e);btns.appendChild(h);const sl=el("button","btn ghost small",zh()?"🐢 慢速":"🐢 Slow");sl.onclick=()=>slowWord(e);btns.appendChild(sl);setTimeout(()=>sayWord(e),250)}
    c.appendChild(btns);b.appendChild(c);const mode=zh()?"draw":S().set.mode;
    if(mode==="type"){const inp=document.createElement("input");inp.className="sp-in";["autocomplete","autocorrect","autocapitalize","spellcheck"].forEach(a=>inp.setAttribute(a,a==="spellcheck"?"false":"off"));inp.setAttribute("aria-label","spelling");
      c.appendChild(inp);const hint=el("button","btn ghost small",t().hint);if(opts.mock)hint.hidden=true;hint.onclick=()=>{inp.placeholder=e.w[0]+"…";hint.disabled=true;it.hinted=true};btns.appendChild(hint);
      const ck=el("button","btn",t().check);c.appendChild(ck);setTimeout(()=>inp.focus(),50);
      const doCheck=()=>{const r=cmpEn(inp.value,e.w);if(!inp.value.trim())return;ck.disabled=true;inp.disabled=true;result(e,it,r.ci&&!it.hinted,r.ci&&!r.exact,c,inp.value)};ck.onclick=doCheck;inp.addEventListener("keydown",ev=>{if(ev.key==="Enter")doCheck()})}
    else if(mode==="paper"){c.appendChild(el("p","",t().paperQ));const rv=el("button","btn",t().reveal);c.appendChild(rv);rv.onclick=()=>{rv.remove();selfMark(e,it,c)}}
    else{const row=pads([...e.w].length);c.appendChild(el("p","muted",T.zh.draw));c.appendChild(row);const cl=clearBtn(row);const rv=el("button","btn",t().reveal);const r2=el("div","row",'');r2.style.gap="8px";r2.append(cl,rv);c.appendChild(r2);
      rv.onclick=()=>{rv.remove();row.querySelectorAll(".tzg").forEach((d,k)=>d.show([...e.w][k]));selfMark(e,it,c)}}}
  function revealHTML(e){return (zh()?'<div class="muted">'+esc(pyOf(e))+'</div><div class="sp-word zhw">'+esc(e.w)+'</div>':'<div class="sp-word">'+esc(e.w)+'</div>')+(e.parts?'<div><span class="tag">'+T.zh.parts+'</span> <b>'+esc(e.parts)+'</b></div>':'')+(e.trick?'<div class="sp-trick"><span class="tag">'+t().trick+'</span><div>'+esc(e.trick)+'</div></div>':'')+(e.confuse?'<div><span class="tag">'+T.zh.confuse+'</span> '+esc(e.confuse)+'</div>':'')}
  function selfMark(e,it,c){c.appendChild(el("div","",revealHTML(e)));const r=el("div","row",'');r.style.cssText="gap:8px;flex-wrap:wrap";const y=el("button","btn",t().gotIt),n=el("button","btn ghost",t().missed);r.append(y,n);c.appendChild(r);
    y.onclick=()=>{r.remove();record(e,it,true);c.appendChild(el("p","fb good",t().right[Math.floor(Math.random()*t().right.length)]));contBtn(c)};
    n.onclick=()=>{r.remove();record(e,it,false);c.appendChild(el("p","fb bad",t().paperFix));if(zh()){c.appendChild(el("p","",T.zh.copy3));for(let k=0;k<3;k++)c.appendChild(pads([...e.w].length))}contBtn(c)}}
  function result(e,it,ok,capWarn,c,typed){if(ok){record(e,it,true);c.appendChild(el("p","fb good",t().right[Math.floor(Math.random()*t().right.length)]+(capWarn&&/[A-Z]/.test(e.w)?" "+t().capital:"")));contBtn(c);return}
    it.typed=typed;record(e,it,false);c.appendChild(el("p","fb bad",t().wrong));c.appendChild(el("div","sp-diff",diffEn(e.w,typed)));c.appendChild(el("div","",revealHTML(e)));
    c.appendChild(el("p","",'<b>'+t().fix3+'</b>'));const ins=[0,1,2].map(()=>{const x=document.createElement("input");x.className="sp-in";["autocomplete","autocorrect","autocapitalize"].forEach(a=>x.setAttribute(a,"off"));x.setAttribute("spellcheck","false");x.style.fontSize="1.3rem";c.appendChild(x);return x});
    const cb=el("button","btn",t().cont);cb.disabled=true;c.appendChild(cb);const chk=()=>{let all=true;ins.forEach(x=>{const ok2=cmpEn(x.value,e.w).ci;x.style.borderColor=x.value?(ok2?"var(--good)":"var(--bad)"):"";if(!ok2)all=false});cb.disabled=!all};
    ins.forEach(x=>x.addEventListener("input",chk));ins[0].focus();cb.onclick=()=>{i++;nextItem()}}
  function record(e,it,ok){if(opts.mock){if(ok)first++;else{missed.push(e.w);grade(e.w,false,it.typed)}return}
    if(!it.retry){grade(e.w,ok,it.typed);if(ok)first++;else{missed.push(e.w)}}
    if(!ok&&!retried.has(e.w)){retried.add(e.w);items.push({w:e.w,retry:true})}}
  function contBtn(c){const cb=el("button","btn",t().cont);cb.onclick=()=>{i++;nextItem()};c.appendChild(cb);cb.focus()}
  function finish(){const s=S();const d=s.days[today()]=s.days[today()]||{r:0,x:0};d.done=true;save(s);
    const box=el("div","sp-card",opts.mock?'<h3>'+X().mockDone+'</h3><p style="font-size:1.6rem"><b>'+first+' / '+firstTotal+'</b></p><p>'+X().mockLead+'</p>':'<h3>'+t().done+'</h3><p>'+t().score(first,firstTotal)+'</p><p><b>'+t().streak(streak(S()))+'</b></p>');
    if(missed.length)box.appendChild(el("div","",'<p>'+t().again+'</p><div class="sp-chips">'+[...new Set(missed)].map(w=>'<button data-w="'+esc(w)+'">'+esc(w)+'</button>').join("")+'</div>'));
    const k=lang+"-game:spell:"+today();if(!hasStar(k)){giveStar(k,box);box.appendChild(el("p","fb good",t().starMsg));refreshNav()}
    if(!zh()&&!opts.mock){const sp=el("button","btn",X().spotBtn);sp.onclick=()=>spotGame(b);box.appendChild(sp)}
    const bk=el("button","btn ghost",t().back);bk.onclick=()=>{b.innerHTML="";tToday(b)};box.appendChild(bk);
    box.addEventListener("click",ev=>{const x=ev.target.closest("[data-w]");if(x)say(x.dataset.w)});b.innerHTML="";b.appendChild(box)}
  nextItem()}

/* ---------- My words ---------- */
function status(c){return !c?["w",t().waiting]:c.b>=MASTER?["m",t().mastered]:["l",t().learning+" · "+t().box(c.b)]}
function tMine(b){const s=S();
  const add=el("div","sp-card sp-noprint",'<h3>'+t().addTitle+'</h3><p class="muted">'+esc(t().addLead)+'</p><textarea rows="4" style="width:100%;box-sizing:border-box;font:inherit;font-size:1.1rem;padding:8px;border-radius:10px;border:1.5px solid var(--rule);background:var(--card);color:var(--ink)"></textarea><div class="row" style="gap:8px"><button class="btn ad">'+t().add+'</button><span class="msg muted"></span></div>');
  add.querySelector(".ad").onclick=()=>{const lines=add.querySelector("textarea").value.split(/\n+/).map(x=>x.trim()).filter(Boolean);const s2=S();let n=0;
    lines.reverse().forEach(line=>{const [w,se,tr]=line.split("|").map(x=>(x||"").trim());if(!w)return;if(s2.custom.some(x=>norm(x.w)===norm(w)))return;s2.custom.unshift({w,s:se||"",trick:tr||""});n++});save(s2);add.querySelector(".msg").textContent=t().added(n);add.querySelector("textarea").value="";drawList()};
  {const fb=el("button","btn ghost small",X().fromBook);fb.onclick=()=>{const s2=S();let n=0;words().map(w=>String(w).trim()).filter(w=>zh()?/^[\u4e00-\u9fff]{2,4}$/.test(w):/^[A-Za-z'-]{3,16}$/.test(w)).forEach(w=>{if(!s2.custom.some(x=>norm(x.w)===norm(w))&&!s2.cards[w]){s2.custom.push({w});n++}});save(s2);add.querySelector(".msg").textContent=t().added(n);drawList()};add.querySelector(".row").appendChild(fb)}
  b.appendChild(add);
  const listBox=el("div","sp-card");b.appendChild(listBox);
  function drawList(){const s2=S();const q=queue(s2).slice(0,12);const started=Object.keys(s2.cards);
    const rows=started.sort((a,b2)=>(s2.cards[a].b>=MASTER)-(s2.cards[b2].b>=MASTER)||String(s2.cards[a].due||"").localeCompare(String(s2.cards[b2].due||""))).map(w=>{const c=s2.cards[w];const [cl,lab]=status(c);
      return '<div class="sp-row"><span class="w">'+esc(w)+'</span><span class="sp-badge '+cl+'">'+lab+'</span><span class="muted">'+(c.b>=1?t().next+": "+(c.due<=today()?t().nowDue:c.due):"")+' · ✓'+c.r+' ✗'+c.x+'</span><button class="btn ghost small rm" data-w="'+esc(w)+'">'+t().remove+'</button></div>'}).join("");
    listBox.innerHTML='<h3>'+t().tabs.mine+' ('+started.length+')</h3><div class="sp-list">'+(rows||'<p class="muted">—</p>')+'</div><h4 style="margin-top:12px">'+(zh()?"接下来要学的":"Coming up next")+'</h4><div class="sp-chips">'+q.map(w=>'<button data-say="'+esc(w)+'">'+esc(w)+'</button>').join("")+'</div>'+
      '<div class="row sp-noprint" style="margin-top:12px"><button class="btn ghost small rs">'+t().reset+'</button></div>';
    listBox.querySelectorAll(".rm").forEach(x=>x.onclick=()=>{const s3=S();delete s3.cards[x.dataset.w];s3.custom=s3.custom.filter(c=>c.w!==x.dataset.w);save(s3);drawList()});
    const rs=listBox.querySelector(".rs");rs.onclick=()=>{if(rs.dataset.armed){const s3=S();s3.cards={};s3.days={};save(s3);drawList()}else{rs.dataset.armed=1;rs.textContent=t().sure}};
    listBox.querySelectorAll("[data-say]").forEach(x=>x.onclick=()=>say(x.dataset.say))}
  drawList();
  const br=el("details","sp-card sp-noprint",'<summary><b>'+t().browse+'</b> ('+SW[lang].length+')</summary><p class="muted">'+t().browseLead+'</p><div class="row" style="gap:6px;flex-wrap:wrap" id="spLv">'+["A","B","C"].map((l,i)=>'<button class="pill" data-l="'+l+'" aria-pressed="'+(i===0)+'">'+ELV[lang][i]+'</button>').join("")+'</div><div class="sp-list bl" style="margin-top:8px"></div>');
  b.appendChild(br);let lv="A";
  function drawBrowse(){const s2=S();const inl=w=>s2.cards[w]||s2.custom.some(c=>norm(c.w)===norm(w));
    br.querySelector(".bl").innerHTML=SW[lang].filter(x=>x.lv===lv).sort((a,c)=>a.rank-c.rank).map(x=>'<div class="sp-row"><span class="w">'+esc(x.w)+'</span><span class="muted" style="flex:1;min-width:12em">'+esc(x.trick)+'</span>'+(inl(x.w)?'<span class="sp-badge m">'+t().inList+'</span>':'<button class="btn ghost small ad1" data-w="'+esc(x.w)+'">'+t().addOne+'</button>')+'</div>').join("");
    br.querySelectorAll(".ad1").forEach(x=>x.onclick=()=>{const s3=S();s3.custom.unshift({w:x.dataset.w});save(s3);drawBrowse();drawList()})}
  br.querySelector("#spLv").addEventListener("click",ev=>{const x=ev.target.closest("[data-l]");if(!x)return;lv=x.dataset.l;br.querySelectorAll("#spLv .pill").forEach(p=>p.setAttribute("aria-pressed",p===x));drawBrowse()});
  br.addEventListener("toggle",()=>{if(br.open)drawBrowse()})}

/* ---------- English rules & families ---------- */
function tRules(b){const L=["A","B","C"];const ps=PATTERNS.slice().sort((a,c)=>L.indexOf(a.lv)-L.indexOf(c.lv));
  ps.forEach(p=>{const d=el("details","sp-card",'<summary><b>'+esc(p.title)+'</b> <span class="sp-badge">'+ELV.en[L.indexOf(p.lv)]+'</span></summary><div>'+p.explain+'</div><div class="sp-trick"><span class="tag">'+(zh()?"":"Rule")+'</span><div>'+esc(p.rule)+'</div></div><div class="sp-chips">'+p.words.map(w=>'<button data-say="'+esc(w)+'">'+esc(w)+'</button>').join("")+'</div>'+(p.odd&&p.odd.length&&p.odd.join("").trim()?'<p><b>'+(lang==="zh"?"":"Watch out: ")+'</b>'+esc(p.odd.join(", "))+'</p>':'')+'<p class="muted">'+esc(p.tip)+'</p><div class="pr"></div>');
    const go=el("button","btn small",t().practise);d.appendChild(go);go.onclick=()=>{go.remove();lookCoverWrite(d.querySelector(".pr"),seededShuffle(p.words,()=>Math.random()).slice(0,8))};
    d.addEventListener("click",ev=>{const x=ev.target.closest("[data-say]");if(x)say(x.dataset.say)});b.appendChild(d)})}
function lookCoverWrite(host,words){let k=0,ok=0;
  function show(){host.innerHTML="";if(k>=words.length){host.innerHTML='<p class="fb good">'+ok+" / "+words.length+'</p>';const k2=lang+"-game:spellrule:"+today();if(ok>=words.length-1&&!hasStar(k2)){giveStar(k2,host);refreshNav()}return}
    const w=words[k];const card=el("div","",'<p class="muted">'+t().look+' ('+(k+1)+'/'+words.length+')</p><div class="sp-word">'+esc(w)+'</div>');host.appendChild(card);say(w);
    setTimeout(()=>{if(!host.isConnected)return;card.innerHTML='<p class="muted">'+t().pLead+'</p>';const inp=document.createElement("input");inp.className="sp-in";["autocomplete","autocorrect","autocapitalize"].forEach(a=>inp.setAttribute(a,"off"));inp.setAttribute("spellcheck","false");card.appendChild(inp);inp.focus();
      const ck=el("button","btn small",t().check);card.appendChild(ck);const go=()=>{const r=cmpEn(inp.value,w);ck.disabled=true;inp.disabled=true;if(r.ci){ok++;card.appendChild(el("p","fb good","✓"))}else{card.appendChild(el("div","sp-diff",diffEn(w,inp.value)));card.appendChild(el("p","",'<b>'+esc(w)+'</b>'))}
        const n=el("button","btn small",t().cont);n.onclick=()=>{k++;show()};card.appendChild(n);n.focus()};ck.onclick=go;inp.addEventListener("keydown",ev=>{if(ev.key==="Enter"&&!ck.disabled)go()})},Math.max(2500,w.length*350))}
  show()}

/* ---------- Homophones ---------- */
function tHomo(b){b.appendChild(el("p","muted",t().homoLead));
  HOMO.forEach((h,hi)=>{const d=el("details","sp-card",'<summary><b>'+esc(h.set.join(" · "))+'</b></summary><ul class="dots">'+h.hints.map(x=>'<li>'+esc(x)+'</li>').join("")+'</ul><div class="qz"></div>');
    d.addEventListener("toggle",()=>{if(d.open&&!d.querySelector(".qz").childElementCount)mcqRun(d.querySelector(".qz"),h.quiz.map(q=>({s:esc(q.s).replace("___",'<span class="sp-blank"></span>'),opts:h.set,a:q.a})),"homo"+hi,true)});b.appendChild(d)})}
function mcqRun(host,qs,key,ci){let k=0,ok=0;function show(){host.innerHTML="";if(k>=qs.length){host.appendChild(el("p","fb "+(ok===qs.length?"good":""),ok===qs.length?(zh()?T.zh.qWin:"All right! ★"):(zh()?T.zh.qScore(ok,qs.length):ok+" / "+qs.length)));
      const sk=lang+"-game:spellq:"+key+":"+today();if(ok===qs.length&&!hasStar(sk)){giveStar(sk,host);refreshNav()}const ag=el("button","btn ghost small",zh()?"再做一次":"Try again");ag.onclick=()=>{k=0;ok=0;show()};host.appendChild(ag);return}
    const q=qs[k];const c=el("div","",'<p class="muted">'+(zh()?T.zh.pick:t().pick)+' ('+(k+1)+'/'+qs.length+')</p><div class="sp-sent">'+q.s+'</div>');const row=el("div","sp-mcq");
    seededShuffle(q.opts.slice(),()=>Math.random()).forEach(o=>{const bt=el("button","",esc(o));bt.onclick=()=>{if(row.dataset.done)return;row.dataset.done=1;const good=ci?o.toLowerCase()===String(q.a).toLowerCase():o===q.a;bt.classList.add(good?"ok":"no");
      if(!good)[...row.children].forEach(x=>{if((ci?x.textContent.toLowerCase()===String(q.a).toLowerCase():x.textContent===q.a))x.classList.add("ok")});if(good)ok++;say(q.s.replace(/<[^>]+>/g,zh()?q.a:" "+q.a+" "));const n=el("button","btn small",t().cont);n.onclick=()=>{k++;show()};c.appendChild(n)};row.appendChild(bt)});
    c.insertBefore(row,c.children[2]||null);host.appendChild(c)}show()}

/* ---------- Chinese look-alike groups ---------- */
function tGroups(b){b.appendChild(el("p","muted",T.zh.groupsLead));const L=["A","B","C"];
  GROUPS.slice().sort((a,c)=>L.indexOf(a.lv)-L.indexOf(c.lv)).forEach((g,gi)=>{const d=el("details","sp-card",'<summary><b>'+esc(g.title)+'</b> <span class="sp-badge">'+ELV.zh[L.indexOf(g.lv)]+'</span></summary><p>'+esc(g.note)+'</p><div class="sp-zchar">'+g.chars.map(c=>'<div><span class="c">'+esc(c.c)+'</span> <span class="muted">'+esc(c.py)+'</span><div>'+esc(c.tip)+'</div><div class="muted">'+esc(c.words.join("、"))+'</div></div>').join("")+'</div><div class="qz"></div>');
    const go=el("button","btn small",T.zh.tryQuiz);d.appendChild(go);go.onclick=()=>{go.remove();mcqRun(d.querySelector(".qz"),g.quiz.map(q=>({s:esc(q.s).replace("（　）",'（<span class="sp-blank" style="min-width:1.5em"></span>）'),opts:q.opts,a:q.a})),"g"+gi,false)};b.appendChild(d)})}

/* ---------- Proofreading card ---------- */
function trouble(s,n){return Object.keys(s.cards).filter(w=>s.cards[w].b<MASTER&&(s.cards[w].x>0)).sort((a,c)=>s.cards[c].x-s.cards[a].x||s.cards[a].b-s.cards[c].b).slice(0,n)}
function tCard(b){const s=S();let ws=trouble(s,10);if(ws.length<10){const more=Object.keys(s.cards).filter(w=>s.cards[w].b<MASTER&&!ws.includes(w));ws=ws.concat(more).slice(0,10)}
  if(ws.length<6)ws=ws.concat(queue(s).filter(w=>!ws.includes(w))).slice(0,10);
  const c=el("div","sp-card",'<h3>'+(zh()?"✏️ 我的易错字卡":"✏️ My proofreading card")+'</h3><p>'+t().cardLead+'</p><ol class="sp-print">'+ws.map(w=>{const e=entry(w);return '<li><b style="font-size:1.4rem'+(zh()?';font-family:KaiTi,STKaiti,serif':'')+'">'+esc(e.w)+'</b>'+(zh()&&e.py?' <span class="muted">'+esc(e.py)+'</span>':'')+(e.trick?'<br><span class="muted">'+esc(e.trick)+'</span>':'')+'</li>'}).join("")+'</ol>');
  const p=el("button","btn ghost sp-noprint",t().print);p.onclick=()=>window.print();c.appendChild(p);b.appendChild(c)}

/* ---------- Progress ---------- */
function tProg(b){const s=S();const ws=Object.keys(s.cards);const mast=ws.filter(w=>s.cards[w].b>=MASTER).length;const learning=ws.length-mast;
  let r=0,x=0;Object.values(s.days).forEach(d=>{r+=d.r||0;x+=d.x||0});const wk=ws.filter(w=>s.cards[w].mAt&&s.cards[w].mAt>=addDays(-6)).length;
  const c=el("div","sp-card",'<p class="muted">'+t().progLead+'</p><div class="sp-stats"><div><b>'+mast+'</b>'+t().mastered+'</div><div><b>'+learning+'</b>'+t().learning+'</div><div><b>'+streak(s)+'</b>'+(zh()?"连续天数":"day streak")+'</div><div><b>'+(r+x?Math.round(r/(r+x)*100):0)+'%</b>'+t().acc+'</div><div><b>'+wk+'</b>'+t().thisWeek+'</div></div>');
  const days=[];for(let i=13;i>=0;i--)days.push(addDays(-i));const mx=Math.max(1,...days.map(d=>{const v=s.days[d]||{};return (v.r||0)+(v.x||0)}));
  c.appendChild(el("div","",'<h4>'+t().last14+'</h4><div class="sp-bars">'+days.map(d=>{const v=s.days[d]||{};return '<div title="'+d+'"><small>'+d.slice(8)+'</small><i style="height:'+((v.r||0)/mx*70)+'px"></i><i class="x" style="height:'+((v.x||0)/mx*70)+'px"></i></div>'}).join("")+'</div>'));
  const tr=trouble(s,12);c.appendChild(el("div","",'<h4>'+t().trouble+'</h4>'+(tr.length?'<div class="sp-chips">'+tr.map(w=>'<button data-say="'+esc(w)+'">'+esc(w)+' <small>✗'+s.cards[w].x+'</small></button>').join("")+'</div>':'<p class="muted">'+t().noTrouble+'</p>')));
  const ph=patternsHTML(s);if(ph)c.appendChild(el("div","",ph));
  c.addEventListener("click",ev=>{const z=ev.target.closest("[data-say]");if(z)say(z.dataset.say)});b.appendChild(c)}

/* ---------- How it works ---------- */
const HOW={en:`<h3>How to use My spelling (for children and parents)</h3>
<ol class="dots">
<li><b>Ten minutes, every day.</b> Little and often beats a long session once a week. Tap <i>Start today's spelling</i>: it gives you the words due for review plus a few new ones.</li>
<li><b>Learn the trick first.</b> Every new word comes with a reason for its spelling – word parts (<i>in + to</i>), a rule (<i>immediate + ly</i>), or a memory hook. Say it in your "spelling voice" (<i>Wed-nes-day</i>, <i>break-fast</i>).</li>
<li><b>Look, say, cover, write, check.</b> Look at the word, hear it, then it is covered and you write it from memory. Choosing <i>Write on paper</i> in Settings is even better, because the hand remembers spellings.</li>
<li><b>Fix it straight away.</b> If you get a word wrong, you see exactly which letters were wrong and you write it correctly three times.</li>
<li><b>Spaced review.</b> Each word comes back after 1, 2, 4, 7, 14 and 30 days. Get it right each time and it moves up a step. Six steps = mastered. Get it wrong and it starts again at step 1 – no problem, that is how memory gets stronger.</li>
<li><b>Words in sentences.</b> You always hear and see the word in a real sentence, because that is how you use it in compositions.</li>
<li><b>Proofreading card.</b> Print your card of trickiest words and keep it on your desk. Before you hand in any writing, hunt for those words.</li>
</ol>
<h4>Tips for parents</h4>
<ul class="dots">
<li>Whenever your child asks "How do you spell…?", add that word in <i>My words</i>. Their own words come first.</li>
<li>Sit with them for the first week. Ask "What's the trick for this one?" rather than just correcting.</li>
<li>Celebrate the streak, not the score. A 30-day streak will change their spelling.</li>
<li>Look at <i>Progress</i> once a week together: count the mastered words.</li>
<li>If spelling stays very hard after a few months of steady practice, have a chat with the teacher; a specialist check can help.</li>
</ul>`,
zh:`<h3>怎样用“我的听写”（给孩子和家长）</h3>
<ol class="dots">
<li><b>每天十分钟。</b>天天练一点，比一个星期练一次长时间有用得多。点“开始今天的听写”，系统会安排今天要复习的词语和几个新词语。</li>
<li><b>先学窍门。</b>每个新词都有“拆一拆”（把难字拆成部件，例如 晴 = 日 + 青）和“记字窍门”（偏旁的意思、字谜、容易漏写的笔画），还有“别写成”的形近字。</li>
<li><b>看、读、盖、写、对。</b>先看清楚、听一听，然后词语被盖住，你在田字格里凭记忆写出来，再对答案。</li>
<li><b>写错马上改。</b>写错了，就照着正确的字再写三遍。</li>
<li><b>间隔复习。</b>每个词语会在第 1、2、4、7、14、30 天再出现。每次写对就上一级，六级就算记牢了。写错了就回到第一级——没关系，记忆就是这样变牢的。</li>
<li><b>放在句子里练。</b>每个词语都在一个真实的句子里出现，因为写作文时就是这样用的。</li>
<li><b>易错字卡。</b>把最容易写错的字打印出来贴在书桌上，交作业前专门检查这些字。</li>
</ol>
<h4>给家长的建议</h4>
<ul class="dots">
<li>孩子问“这个字怎么写？”时，就把它加进“我的词语”，自己的词语会最先练习。</li>
<li>第一个星期陪孩子一起练，多问“这个字的窍门是什么？”，少直接纠正。</li>
<li>多表扬“连续天数”，少看分数。坚持一个月，进步会很明显。</li>
<li>每周和孩子一起看一次“进步记录”，数一数记牢了多少个词语。</li>
<li>用平板写字时，可以用手指或触控笔在田字格里写；也可以在纸上写，再点“对答案”。</li>
</ul>`};
function tHow(b){b.appendChild(el("div","sp-card",HOW[lang]))}

/* ---------- Today page card ---------- */
const _rt=renderToday;renderToday=function(){_rt.apply(this,arguments);try{const s=S();const n=dueList(s).length+Math.max(0,Math.min(s.set.perDay-newToday(s),queue(s).length));const m=$("#main");if(m.querySelector(".spToday"))return;
  const c=el("section","block spToday",'<div class="sp-card" style="border-color:var(--blue)"><b>🔤 '+esc(t().todayCard(n))+'</b><div><button class="btn small">'+t().go+'</button></div></div>');
  c.querySelector("button").onclick=()=>{tab="today";openUnit(lang+"-myspell",true)};const head=m.querySelector(".head");if(head)head.after(c);else m.prepend(c)}catch(e){}};
})();
