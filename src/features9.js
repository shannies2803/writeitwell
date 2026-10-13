/* ===== round 22: Check my writing – offline marker for spelling, grammar, punctuation, tense, word choice and structure ===== */
(function(){
const zh=()=>lang==="zh";
const T9={en:{title:"Check my writing",eyebrow:"Writing",lead:"Type or paste a composition. The checker finds spelling, grammar, punctuation and tense slips, suggests stronger words, and tells you what you did well. It works without internet.",
  level:"Level",ph:"Type or paste your composition here…",check:"🔍 Check my writing",clear:"Clear",listen:"🔊 Read it to me",stop:"⏹ Stop",
  good:"What you did well",fix:"Things to fix",tips:"Ideas to make it better",none:"No slips found – well done!",target:"Your next target",
  words:"words",paras:"paragraphs",sents:"sentences",fixIt:"Fix",ignore:"Ignore",addSpell:"➕ Add misspelt words to My spelling",added:n=>n+" word(s) added to My spelling.",
  cats:{spell:"Spelling",grammar:"Grammar",punct:"Punctuation",tense:"Tense",word:"Word choice",style:"Sentences & structure"},
  areas:"How it looks",ok:"Good",some:"Check",many:"Work on this",short:"Write at least a few sentences first.",
  levelInfo:"What markers look for at this level",history:"My usual slips",hNone:"Check a few pieces of writing and your usual slips will show here.",hTop:"Most common",hWords:"Words I often misspell",
  examBtn:"🔍 Check spelling & grammar",star:"Star earned for checking your writing!",
  m:{spell:(w,s)=>"“"+w+"” – check the spelling."+(s.length?" Did you mean: ":""),am:(w,b)=>"Use British spelling: “"+b+"”.",
    i:"Always write “I” as a capital letter.",cap:"Start a sentence with a capital letter.",end:"End the sentence with a full stop (. ! or ?).",
    sp:"Add a space after the punctuation mark.",spb:"No space before a punctuation mark.",dbl:w=>"“"+w+"” is written twice.",
    ofHave:x=>"Write “"+x+" have”, not “"+x+" of”.",aan:(a,b)=>"Use “"+b+"” before this word, not “"+a+"”.",moreMost:"Don't use “more/most” with a word that already ends in -er/-est.",
    afterAux:(aux,v,b)=>"After “"+aux+"”, use the base verb: “"+aux+" "+b+"”, not “"+v+"”.",meAnd:"Put yourself last and use “I”: “My friend and I …”.",
    thenThan:"Use “than” for comparing (bigger than).",thanThen:"Use “then” for time (and then).",youre:"“You're” = you are.",its:"“It's” = it is.",itsOwn:"“Its” (no apostrophe) means belonging to it.",
    their:"“Their” = belonging to them.",there:"Use “there” here (there is / there was).",too:"Use “too” to mean “very / also”.",everyday:"“Every day” (two words) means each day; “everyday” means ordinary.",
    toHome:"Say “went home”, not “went to home”.",doesnt:"He/she/it doesn't …",dont:"I/you/we/they don't …",discuss:"“Discuss” doesn't need “about”.",wasWere:"Use “were” with we, they and you (we were).",returnBack:"“Return” already means go back.",
    quoteComma:"Put a comma (or ! ?) inside the speech marks before “said”.",tagComma:"Add a comma after the speech verb, before the speech marks.",
    excl:"One exclamation or question mark is enough.",
    tense:(w,b)=>"Your story is in the past tense – should “"+w+"” be “"+b+"”?",
    very:(x,alts)=>"Try one strong word instead of “"+x+"”: "+alts+".",over:(w,n,alts)=>"“"+w+"” is used "+n+" times. Try: "+alts+".",
    tell:f=>"Show, don't tell: instead of naming the feeling (“"+f+"”), show it through the face, body or actions. For example:",
    long:n=>"This sentence is "+n+" words long. Can you split it into two?",ands:"Too many “and”s in one sentence – split it up.",
    opener:(w,n)=>n+" sentences start with “"+w+"”. Try: Moments later, Without warning, Suddenly, After a while, an -ing opener (Looking around, I…), or a feeling (Trembling, I…).",
    andThen:"“And then” is overused – try “Moments later”, “Soon”, “Next”, or just start a new sentence.",startAnd:"Try not to start sentences with “And” or “So” in a composition.",
    paraOne:"Break your writing into paragraphs: beginning, problem, climax, ending. Press Enter twice to start a new paragraph.",paraFew:n=>"Only "+n+" paragraphs. Aim for at least 4: beginning, problem, climax, ending.",
    len:(n,t)=>n+" words. Aim for at least "+t+" at this level.",lenOk:(n,t)=>n+" words – good length for this level (aim "+t+"+).",
    openFlat:"“One day” / “Once upon a time” is a flat opening. Try starting with speech, a sound, an action or a feeling.",
    endFlat:"End with a feeling, what you learnt, or what you will do next time.",
    gPhr:(n,l)=>n+" good phrase"+(n>1?"s":"")+" from the word banks: "+l,gSpeech:"You used dialogue (speech) – great for bringing the story to life.",gSenses:"You described with the senses (sound, smell, touch…).",
    gShow:"You showed feelings through actions or the body.",gOpen:"Strong opening – it starts with action, speech or a sound.",gEnd:"Good ending – it shows a feeling or a lesson.",gParas:n=>n+" paragraphs – well organised.",gVary:"Good variety of sentence openings.",gNoSpell:"No spelling mistakes found!"},
  info:{1:["Write full sentences: a capital letter at the start, a full stop at the end.","Say who, where, what happened and how they felt.","Use describing words (colours, sizes, sounds).","Aim for 40+ words (about 5–6 sentences)."],
    2:["Write full sentences with capital letters and full stops.","Describe the pictures in order: first, next, then, finally.","Add a feeling and one describing word in each sentence.","Aim for 60+ words."],
    3:["Picture composition: tell the story shown in the pictures, in the past tense.","Use paragraphs: beginning, problem, climax, ending.","Show feelings through actions and faces, and use some dialogue.","Aim for 120+ words."],
    4:["Picture composition in the past tense, with a clear problem and solution.","4–5 paragraphs; build up to an exciting climax.","Use dialogue, the senses and good phrases; vary sentence openings.","Aim for 150+ words."],
    5:["Continuous writing (PSLE style): a topic with three pictures – use at least one.","Plan first: a clear problem, a climax, and a meaningful ending.","Markers look at content (relevant, well developed) and language (accurate grammar, varied vocabulary and sentences, good organisation).","Write at least 150 words; strong stories are often 300+."],
    6:["PSLE English Paper 1 (1 h 10 min): Situational Writing (14 marks) and Continuous Writing (36 marks).","Continuous Writing: a topic and three pictures – base your story on at least one of them.","Content: relevant to the topic, well developed, with a satisfying ending. Language: accurate, varied, well organised.","Write at least 150 words; strong stories are often 350+."]}},
 zh:{title:"检查我的作文",eyebrow:"写作",lead:"输入或贴上作文，检查字数、段落、的地得、常用词重复，并提醒你“描写”而不是“直说”感受。不用上网也能用。",
  level:"年级",ph:"在这里输入或贴上作文……",check:"🔍 检查作文",clear:"清除",listen:"🔊 读给我听",stop:"⏹ 停止",
  good:"写得好的地方",fix:"要改的地方",tips:"让作文更好的建议",none:"没有发现问题，真棒！",target:"下一个目标",
  words:"字",paras:"段",sents:"句",fixIt:"改",ignore:"忽略",addSpell:"",added:n=>"",
  cats:{spell:"错别字",grammar:"用词",punct:"标点",tense:"时态",word:"词语选择",style:"句子与结构"},
  areas:"整体情况",ok:"很好",some:"注意",many:"要加油",short:"请先多写几句话。",
  levelInfo:"这个年级老师看什么",history:"我常犯的错误",hNone:"多检查几篇作文后，这里会显示你常犯的错误。",hTop:"最常见",hWords:"",
  examBtn:"🔍 检查作文",star:"检查作文，得到一颗星！",
  m:{de:(a,b)=>"“"+a+"”后面是动作，要用“地”：“"+b+"”。",dei:(a,b)=>"动词后面说明程度，要用“得”：“"+b+"”。",end:"句子结束要加句号（。！？）。",
    excl:"一个感叹号或问号就够了。",over:(w,n,alts)=>"“"+w+"”用了"+n+"次，可以换成："+alts+"。",
    tell:f=>"不要直接说“"+f+"”，用神态、动作、心理来描写。例如：",opener:(w,n)=>n+"个句子都用“"+w+"”开头，换一换吧。",
    paraOne:"要分段：开头、经过、高潮、结尾。",paraFew:n=>"只有"+n+"段，至少写4段：开头、经过、高潮、结尾。",
    len:(n,t)=>"现在"+n+"字，这个年级最好写到"+t+"字以上。",lenOk:(n,t)=>n+"字，长度不错（目标"+t+"字以上）。",long:n=>"这个句子有"+n+"个字，太长了，可以分成两句。",
    gPhr:(n,l)=>"用了"+n+"个好词好句："+l,gSpeech:"用了对话，故事更生动。",gParas:n=>"分了"+n+"段，结构清楚。",gShow:"用了神态、动作描写来表现心情。",gEnd:"结尾写出了感受或收获。"},
  info:{1:["写完整的句子，句末加句号。","写清楚谁、在哪里、做什么、心情怎样。","目标：60字以上。"],2:["看图按顺序写：先、接着、然后、最后。","每句加一个描写的词。","目标：100字以上。"],
    3:["看图写话／短文：写清楚起因、经过、结果。","分段，加一点对话和心情描写。","目标：200字以上。"],4:["写出事情的经过和高潮，用对话、动作、神态描写。","分4段以上。","目标：300字以上。"],
    5:["看图作文或命题作文：先列提纲，有中心思想。","用好词好句、修辞手法，结尾点题。","目标：400字以上。"],6:["作文要有清楚的中心、生动的细节和点题的结尾。","注意的、地、得和标点。","目标：500字以上。"]}}};
const t9=()=>T9[lang];
["wiw2-checks-en","wiw2-checks-zh","wiw2-ckdraft-en","wiw2-ckdraft-zh"].forEach(k=>{if(typeof LKEYS!=="undefined"&&!LKEYS.includes(k))LKEYS.push(k)});
const st=document.createElement("style");st.textContent=
 ".ck9 textarea.ckin{width:100%;box-sizing:border-box;min-height:220px;font:inherit;font-size:1.05rem;line-height:1.6;padding:12px;border:2px solid var(--rule);border-radius:12px;background:var(--card);color:var(--ink)}"+
 ".ck9 .cktext{white-space:pre-wrap;line-height:1.9;border:1.5px solid var(--rule);border-radius:12px;padding:12px;background:var(--card);font-size:1.05rem;overflow-wrap:anywhere}"+
 ".ck9 mark.ck{background:none;color:inherit;border-bottom:3px solid #8a8f98;cursor:pointer;padding:0 1px;border-radius:2px}.ck9 mark.ck sup{font-size:.62em;font-weight:700;margin-left:1px}"+
 ".ck9 mark.ck.c-spell{border-color:#e0453a}.ck9 mark.ck.c-grammar{border-color:#f08c00}.ck9 mark.ck.c-punct{border-color:#8b5cf6}.ck9 mark.ck.c-tense{border-color:#2f7de1}.ck9 mark.ck.c-word{border-color:#1b9e5a}.ck9 mark.ck.c-style{border-color:#8a8f98}"+
 ".ck9 mark.ck.on{background:color-mix(in srgb,currentColor 0%,#ffe066 55%)}"+
 ".ck9 .cklist{list-style:none;padding:0;margin:0;display:grid;gap:8px}.ck9 .cklist li{border:1.5px solid var(--rule);border-left-width:6px;border-radius:10px;padding:8px 10px;background:var(--card)}"+
 ".ck9 .cklist li.on{outline:3px solid #ffe066}.ck9 .cktag{display:inline-block;font-size:.75rem;font-weight:700;padding:1px 8px;border-radius:999px;margin-right:6px;color:#fff}"+
 ".ck9 .t-spell{background:#e0453a}.ck9 .t-grammar{background:#f08c00}.ck9 .t-punct{background:#8b5cf6}.ck9 .t-tense{background:#2f7de1}.ck9 .t-word{background:#1b9e5a}.ck9 .t-style{background:#8a8f98}"+
 ".ck9 li.b-spell{border-left-color:#e0453a}.ck9 li.b-grammar{border-left-color:#f08c00}.ck9 li.b-punct{border-left-color:#8b5cf6}.ck9 li.b-tense{border-left-color:#2f7de1}.ck9 li.b-word{border-left-color:#1b9e5a}.ck9 li.b-style{border-left-color:#8a8f98}"+
 ".ck9 .ckfix{display:flex;gap:6px;flex-wrap:wrap;margin-top:6px}.ck9 .ckfix button{border:1.5px solid var(--blue);background:color-mix(in srgb,var(--blue) 8%,var(--card));color:var(--ink);border-radius:999px;padding:3px 12px;font:inherit;font-weight:700;cursor:pointer}"+
 ".ck9 .ckfix button.ig{border-color:var(--rule);background:var(--card);font-weight:400}"+
 ".ck9 .ckareas{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:8px}.ck9 .ckareas div{border:1.5px solid var(--rule);border-radius:10px;padding:8px 10px;background:var(--card)}"+
 ".ck9 .ckgood li{margin:4px 0}.ck9 .ckmeta{color:var(--muted);font-size:.95rem}.ck9 .cktarget{font-size:1.15rem;font-weight:700;border:2px dashed #f08c00;border-radius:12px;padding:10px 12px;margin:8px 0}"+
 ".ck9 .ckex{font-style:italic;color:var(--muted);margin:4px 0 0}";
document.head.appendChild(st);

/* ---------- dictionary ---------- */
let DI=null;function dict(){if(DI)return DI;const E=window.EN_DICT;if(!E)return null;const m=new Map();E.t.forEach((s,i)=>s.split(" ").forEach(w=>{if(w&&!m.has(w))m.set(w,i)}));
  const byLen=new Map();m.forEach((ti,w)=>{const L=w.length;if(!byLen.has(L))byLen.set(L,[]);byLen.get(L).push([w,ti])});return DI={m,byLen,am:E.am||{},mis:E.mis||{}}}
function dist(a,b,max){const la=a.length,lb=b.length;if(Math.abs(la-lb)>max)return max+1;let prev2=null,prev=[];for(let j=0;j<=lb;j++)prev[j]=j;
  for(let i=1;i<=la;i++){const cur=[i];let best=cur[0];for(let j=1;j<=lb;j++){const c=a[i-1]===b[j-1]?0:1;let v=Math.min(prev[j]+1,cur[j-1]+1,prev[j-1]+c);if(i>1&&j>1&&a[i-1]===b[j-2]&&a[i-2]===b[j-1])v=Math.min(v,prev2[j-2]+1);cur[j]=v;if(v<best)best=v}
    if(best>max)return max+1;prev2=prev;prev=cur}return prev[lb]}
function known(w){const D=dict();if(!D)return true;w=w.toLowerCase().replace(/’/g,"'");if(D.m.has(w))return true;
  let m;if((m=w.match(/^(.+)'s$/))&&D.m.has(m[1]))return true;if((m=w.match(/^(.+)s'$/))&&D.m.has(m[1]+"s"))return true;
  if((m=w.match(/^(.+)(n't|'re|'ll|'ve|'d|'m)$/))&&D.m.has(m[1]))return true;
  if(w.includes("-"))return w.split("-").every(p=>!p||D.m.has(p));return false}
function suggest(w){const D=dict();const lw=w.toLowerCase();if(D.mis[lw])return[D.mis[lw]];if(D.am[lw])return[D.am[lw]];const L=lw.length;const out=[];
  for(let l=L-2;l<=L+2;l++){const arr=D.byLen.get(l);if(!arr)continue;for(const [c,ti] of arr){if(ti>3&&L>3)continue;const d=dist(lw,c,2);if(d<=2)out.push([c,d*10+ti*2+(c[0]!==lw[0]?4:0)+(Math.abs(l-L))])}}
  out.sort((a,b)=>a[1]-b[1]);return out.slice(0,3).map(x=>x[0])}
const keepCase=(orig,rep)=>/^[A-Z]/.test(orig)&&rep?rep[0].toUpperCase()+rep.slice(1):rep;

/* ---------- reference lists ---------- */
const PAST={go:"went",goes:"went",is:"was",are:"were",am:"was",has:"had",have:"had",says:"said",say:"said",see:"saw",sees:"saw",run:"ran",runs:"ran",come:"came",comes:"came",want:"wanted",wants:"wanted",feel:"felt",feels:"felt",look:"looked",looks:"looked",get:"got",gets:"got",think:"thought",thinks:"thought",know:"knew",knows:"knew",tell:"told",tells:"told",take:"took",takes:"took",make:"made",makes:"made",give:"gave",gives:"gave",find:"found",finds:"found",eat:"ate",eats:"ate",walk:"walked",walks:"walked",shout:"shouted",shouts:"shouted",cry:"cried",cries:"cried",decide:"decided",decides:"decided",realise:"realised",realises:"realised",start:"started",starts:"started"};
const BASE={went:"go",ate:"eat",ran:"run",saw:"see",came:"come",took:"take",gave:"give",made:"make",got:"get",said:"say",told:"tell",bought:"buy",brought:"bring",caught:"catch",taught:"teach",thought:"think",found:"find",lost:"lose",won:"win",wrote:"write",broke:"break",fell:"fall",felt:"feel",kept:"keep",left:"leave",met:"meet",paid:"pay",sat:"sit",slept:"sleep",spoke:"speak",stood:"stand",swam:"swim",threw:"throw",understood:"understand",woke:"wake",wore:"wear",drank:"drink",drove:"drive",flew:"fly",forgot:"forget",hid:"hide",knew:"know",rode:"ride",sang:"sing",stole:"steal",chose:"choose",began:"begin",drew:"draw",grew:"grow",blew:"blow",shook:"shake",tore:"tear",did:"do",had:"have",was:"be",were:"be",wanted:"want",played:"play",walked:"walk",cried:"cry",tried:"try",looked:"look",jumped:"jump",shouted:"shout",helped:"help",finished:"finish",started:"start",asked:"ask",called:"call",laughed:"laugh",opened:"open",closed:"close",liked:"like",loved:"love",decided:"decide",dropped:"drop",stopped:"stop"};
const AUX="did|didn't|does|doesn't|do|don't|to|can|can't|cannot|could|couldn't|will|won't|would|wouldn't|should|shouldn't|must|might|may|let";
const COMPAR="better|best|worse|worst|bigger|biggest|happier|happiest|faster|fastest|taller|tallest|smaller|smallest|louder|loudest|older|oldest|younger|youngest|nicer|nicest|easier|easiest|harder|hardest|stronger|strongest|prettier|prettiest|funnier|funniest|scarier|scariest|longer|longest|shorter|shortest|higher|highest|colder|coldest|hotter|hottest|smarter|smartest|braver|bravest|kinder|kindest|quicker|quickest";
const ANEXC=/^(uni|use|usu|eu|one|once|ufo|ubiquit)/i,AHEXC=/^(hour|honest|honour|heir)/i;
const VERY={happy:"overjoyed, delighted, thrilled",sad:"heartbroken, miserable, devastated",scared:"terrified, petrified",afraid:"terrified, petrified",angry:"furious, livid",tired:"exhausted, worn out",big:"enormous, huge, gigantic",small:"tiny, minute",hungry:"starving, ravenous",good:"excellent, wonderful, fantastic",bad:"terrible, awful, dreadful",cold:"freezing, icy",hot:"scorching, boiling, sweltering",fast:"speedy, rapid",quickly:"swiftly, in a flash",slowly:"at a snail's pace",loud:"deafening, ear-splitting",quiet:"silent, hushed",pretty:"beautiful, gorgeous",nice:"lovely, delightful",surprised:"astonished, stunned",worried:"anxious, frantic",tasty:"delicious, mouth-watering",funny:"hilarious",dirty:"filthy, grimy",clean:"spotless",excited:"thrilled, overjoyed",nervous:"jittery, on edge",difficult:"challenging, tough",easy:"effortless",boring:"dull, tedious",interesting:"fascinating, gripping",old:"ancient",wet:"soaked, drenched",sure:"certain, positive",important:"crucial, vital",shocked:"stunned, horrified",dark:"pitch-black",bright:"dazzling",crowded:"packed, bustling",beautiful:"breathtaking, stunning",kind:"generous, thoughtful",smart:"brilliant, clever",heavy:"weighty, hefty",ugly:"hideous",strong:"powerful, mighty",weak:"feeble, frail",sick:"unwell, ill",much:"a great deal",many:"countless, dozens of"};
const OVER={nice:"lovely, pleasant, delightful",good:"great, wonderful, excellent",bad:"terrible, awful, dreadful",got:"received, became, grabbed, reached",said:"whispered, shouted, replied, explained, muttered",happy:"delighted, cheerful, overjoyed",sad:"upset, gloomy, miserable",big:"huge, enormous, massive",very:"really, extremely – or one strong word",thing:"a more exact noun (the gift, the problem…)",things:"more exact nouns",walked:"strolled, marched, trudged, tiptoed",ran:"dashed, raced, sprinted, hurried",looked:"glanced, peered, stared, gazed",saw:"noticed, spotted, caught sight of",went:"headed, rushed, made my way",so:"therefore, as a result",then:"after that, moments later, soon",scared:"frightened, terrified, nervous",cried:"sobbed, wept, wailed",laughed:"giggled, chuckled, burst out laughing"};
const OVERMIN={said:3,then:3,so:4,very:3,got:3,went:4,looked:4,ran:4,walked:4,saw:4};
const FEEL="happy|sad|scared|afraid|angry|nervous|excited|worried|shocked|surprised|upset|disappointed|proud|embarrassed|frightened|jealous|lonely|guilty|relieved|bored|anxious|terrified|furious|glad|curious|confused";
const SPEECH="said|asked|shouted|cried|replied|whispered|yelled|exclaimed|screamed|added|answered|explained|called|muttered|mumbled|sighed|laughed|giggled|groaned|grumbled|snapped|begged|pleaded|announced|insisted|wondered|squealed|gasped|sobbed|wailed|roared";
const SENSE=/\b(smell|smelt|smelled|scent|aroma|stench|heard|hear|sound|noise|crunch|creak|bang|thud|buzz|hiss|rustle|whisper|taste|tasted|sweet|sour|salty|bitter|rough|smooth|soft|sticky|slimy|warm|chilly|icy|cool breeze|glimmer|sparkl|shimmer|glow|bright|dim)\w*/i;
const SHOW=/\b(heart (pounded|thumped|raced|sank|leapt|skipped)|palms|knees (shook|trembled|wobbled)|bit (my|his|her) lip|tears|trembl|shiver|clench|frown|grin|beam|blush|cheeks (burned|turned|flushed)|sweat|gulp|swallowed hard|eyes (widened|sparkled|lit up|filled)|jaw dropped|hands (shook|trembled)|stomach (churned|knotted|flipped)|fists|sighed|shoulders (slumped|drooped))/i;
const ENDGOOD=/\b(learnt|learned|realised|realized|lesson|never forget|from that day|promised|will always|next time|from then on|grateful|thankful|proud|relieved|smiled|felt)\b/i;

/* ---------- bank phrases (strengths + show-don't-tell examples) ---------- */
let PH=null;function phrases(){if(PH)return PH;const s=new Set();(DATA.en||[]).forEach(u=>(u.blocks||[]).forEach(b=>{if(b.type==="chips")(b.groups||[]).forEach(g=>(g.words||[]).forEach(w=>{const x=String(w).replace(/<[^>]+>/g,"").trim().toLowerCase();const n=x.split(/\s+/).length;
  if(n>=3&&n<=7&&!/[.!?…"“”]/.test(x)&&!/^(the|a|an|my|i|we|it|he|she|they)\s\w+$/.test(x))s.add(x)}))}));return PH=[...s]}
const FEX={happy:["A huge grin spread across my face.","I skipped all the way home, humming a tune.","My eyes sparkled and I could not stop smiling."],
 sad:["My eyes stung and my lip began to tremble.","I stared at the floor, my shoulders drooping.","A lump rose in my throat and I could not say a word."],
 scared:["My heart thumped so loudly I was sure everyone could hear it.","My knees wobbled and my palms turned cold and sweaty.","I froze, too frightened to move a muscle."],
 angry:["My face turned red and I clenched my fists.","I stomped off and slammed the door behind me.","I gritted my teeth and glared at him."],
 nervous:["My stomach churned as I waited for my turn.","I kept fiddling with the hem of my shirt.","My mouth went dry and my voice came out as a squeak."],
 excited:["I bounced on my toes, unable to stand still.","I could hardly sleep the night before.","My heart raced as I tore open the box."],
 worried:["I bit my lip and kept glancing at the clock.","A frown creased my forehead.","I paced up and down the corridor."],
 shocked:["My jaw dropped and I could only stare.","I gasped and clapped a hand over my mouth.","I stood rooted to the spot."],
 surprised:["My eyebrows shot up.","I blinked twice, not believing my eyes.","“Really?” I gasped."],
 upset:["My eyes filled with tears.","I turned away so no one would see my face crumple.","I pushed my plate away, no longer hungry."],
 disappointed:["My smile slowly faded.","I let out a long sigh and my shoulders slumped.","I trudged back to my seat."],
 proud:["I stood up straight and beamed.","I held the trophy high above my head.","My chest swelled with pride."],
 embarrassed:["My cheeks burned bright red.","I wished the ground would swallow me up.","I hid my face behind my hands."],
 jealous:["I crossed my arms and looked away.","A sour feeling twisted in my stomach as everyone crowded round him.","I muttered, “It’s not that special.”"],
 lonely:["I sat by myself at the end of the bench.","I watched the others laughing together and wished I could join in.","The house felt far too quiet."],
 guilty:["I could not look Mum in the eye.","My stomach knotted every time I thought about what I had done.","I hung my head and stared at my shoes."],
 relieved:["I let out a long breath I did not know I was holding.","My shoulders relaxed and a smile crept back onto my face.","I sank into my chair with a sigh."],
 bored:["I yawned and drummed my fingers on the table.","The minutes crawled by.","I rested my chin on my hand and stared out of the window."],
 tired:["My eyelids drooped and I could barely keep them open.","I dragged my feet all the way home.","I flopped onto the sofa and did not move."],
 curious:["I tilted my head and leaned closer.","I could not resist taking a peek.","Questions buzzed around in my head."],
 confused:["I scratched my head and frowned.","I stared at the question, puzzled.","“Huh?” I said, wrinkling my nose."]};
function feelEx(f){const m={afraid:"scared",frightened:"scared",terrified:"scared",glad:"happy",furious:"angry",anxious:"nervous"};return FEX[m[f]||f]||FEX.happy}
/* ---------- English checker ---------- */
function speechRanges(text){const r=[];const re=/[“"]([^”"]*)[”"]?/g;let m;while((m=re.exec(text))){r.push([m.index,m.index+m[0].length]);if(!m[0].length)re.lastIndex++}return r}
function inR(r,i){return r.some(([a,b])=>i>=a&&i<b)}
function sentences(text){const out=[];const re=/[^.!?\n]+(?:[.!?]+[”"’']?|$|(?=\n))/g;let m;while((m=re.exec(text))){const raw=m[0];const lead=raw.match(/^\s*/)[0].length;const s=raw.trim();if(s)out.push({s,start:m.index+lead,end:m.index+lead+s.length});if(!raw.length)re.lastIndex++}return out}
function checkEN(text,lv){const D=dict();const iss=[];const add=(s,e,cat,msg,fix,extra)=>iss.push({s,e,cat,msg,fix:fix==null?null:[].concat(fix),extra});
  const SR=speechRanges(text);const outside=i=>!inR(SR,i);
  // spelling
  const sents=sentences(text);const sentStarts=new Set(sents.map(x=>x.start).concat(sents.map(x=>{const q=x.s.match(/^[“"‘']+/);return q?x.start+q[0].length:x.start})));
  const tokRe=/[A-Za-z][A-Za-z'’-]*[A-Za-z]|[A-Za-z]/g;let m;const missed=[];
  while((m=tokRe.exec(text))){const w=m[0].replace(/’/g,"'");const lw=w.toLowerCase();const i=m.index;const cap=/^[A-Z]/.test(w);
    if(w==="i"){add(i,i+1,"punct",t9().m.i,"I");continue}
    if(D){if(D.am[lw]){add(i,i+w.length,"spell",t9().m.am(w,D.am[lw]),keepCase(w,D.am[lw]));continue}
      if(D.mis[lw]&&(!cap||sentStarts.has(i))){add(i,i+w.length,"spell",t9().m.spell(w,[1]),keepCase(w,D.mis[lw]),{miss:D.mis[lw]});missed.push(D.mis[lw]);continue}
      if(lw.length<2||/^[A-Z]{2,}$/.test(w))continue;if(cap&&!sentStarts.has(i))continue;
      if(!known(lw)){if(cap){const sg=suggest(lw);if(!sg.length||dist(lw,sg[0],1)>1)continue}const sg=suggest(lw);add(i,i+w.length,"spell",t9().m.spell(w,sg),sg.map(x=>keepCase(w,x)),{miss:sg[0]||""});if(sg[0])missed.push(sg[0])}}}
  const T=t9().m;const rx=(re,fn)=>{re.lastIndex=0;let k;while((k=re.exec(text))){fn(k);if(!k[0].length)re.lastIndex++}};
  // grammar
  rx(/\b(could|should|would|must|might)\s+of\b/gi,k=>add(k.index,k.index+k[0].length,"grammar",T.ofHave(k[1]),k[1]+" have"));
  rx(/\b(a)\s+([A-Za-z]+)/g,k=>{const n=k[2];if(/^[aeiou]/i.test(n)&&!ANEXC.test(n)||AHEXC.test(n))add(k.index,k.index+1,"grammar",T.aan("a","an"),"an")});
  rx(/\bA\s+([A-Za-z]+)/g,k=>{const n=k[1];if(/^[aeiou]/i.test(n)&&!ANEXC.test(n)||AHEXC.test(n))add(k.index,k.index+1,"grammar",T.aan("A","An"),"An")});
  rx(/\b(an|An)\s+([A-Za-z]+)/g,k=>{const n=k[2];if(/^[b-df-hj-np-tv-z]/i.test(n)&&!AHEXC.test(n)&&!/^[A-Z]{2,}/.test(n))add(k.index,k.index+k[1].length,"grammar",T.aan(k[1],k[1]==="An"?"A":"a"),k[1]==="An"?"A":"a")});
  rx(new RegExp("\\b(more|most)\\s+("+COMPAR+")\\b","gi"),k=>add(k.index,k.index+k[0].length,"grammar",T.moreMost,k[2]));
  rx(new RegExp("\\b("+AUX+")\\s+(?:not\\s+)?("+Object.keys(BASE).filter(v=>!/^(had|was|were|did)$/.test(v)).join("|")+")\\b","gi"),k=>{const aux=k[1].toLowerCase();const v=k[2].toLowerCase();if(aux==="to"&&/^(had|did)$/.test(v))return;
    if(aux==="let"&&!/^(went|ate|ran|saw|came|took|gave|made|got)$/.test(v))return;const b=BASE[v];if(!b)return;const vs=k.index+k[0].length-k[2].length;const aux2=/\snot\s/i.test(k[0])?k[1]+" not":k[1];add(vs,vs+k[2].length,"grammar",T.afterAux(aux2,k[2],b),keepCase(k[2],b))});
  rx(/\b([Mm]e and (my \w+|[A-Z][a-z]+|him|her))(?=,?\s+(went|were|was|ran|played|walked|decided|saw|had|got|came|are|go|play|did|tried|started|looked|found|rushed|hurried|sat|stood|waited|ate|bought|made)\b)/g,k=>{const who=k[2];const atStart=/(^|[.!?]\s+|\n)$/.test(text.slice(0,k.index))||k.index===0;const fixd=(who.startsWith("my ")?(atStart?"My ":"my ")+who.slice(3):who)+" and I";add(k.index,k.index+k[1].length,"grammar",T.meAnd,fixd)});
  rx(/\b(we|they|you)\s+(was)\b/gi,k=>{const s=k.index+k[0].length-3;add(s,s+3,"grammar",T.wasWere,"were")});
  rx(new RegExp("\\b("+COMPAR+"|more|less|rather|other)\\s+then\\b","gi"),k=>{const s=k.index+k[0].length-4;add(s,s+4,"grammar",T.thenThan,"than")});
  rx(/\b(more|less)\s+[a-z]+\s+then\b/gi,k=>{const s=k.index+k[0].length-4;add(s,s+4,"grammar",T.thenThan,"than")});
  rx(/\b(and|,)\s*than\b/gi,k=>{const s=k.index+k[0].length-4;add(s,s+4,"grammar",T.thanThen,"then")});
  rx(/\byour\s+(welcome|so|very|going|not|right|the best|being|getting|kidding|joking)\b/gi,k=>add(k.index,k.index+4,"grammar",T.youre,keepCase(k[0],"you're")));
  rx(/\bits\s+(a|an|the|so|very|not|time|my|going|raining|okay|ok|getting|too|late|alright|all right|fine|true|mine|yours)\b/gi,k=>add(k.index,k.index+3,"grammar",T.its,keepCase(k[0],"it's")));
  rx(/\bit's\s+(own|tail|paw|paws|legs|eyes|head|wings|leaves|fur|nest|mother|owner|cage|bowl|feathers|ears|fins|shell|roots|branches)\b/gi,k=>add(k.index,k.index+4,"grammar",T.itsOwn,keepCase(k[0],"its")));
  rx(/\bthere\s+(house|home|mum|dad|mother|father|car|bags?|teacher|friends?|parents|own|school|class|dog|cat|names?|faces|eyes|hands|room|books?|toys?)\b/gi,k=>add(k.index,k.index+5,"grammar",T.their,keepCase(k[0],"their")));
  rx(/\btheir\s+(is|are|was|were)\b/gi,k=>add(k.index,k.index+5,"grammar",T.there,keepCase(k[0],"there")));
  rx(/\bto\s+(much|many|late|early|big|small|hot|cold|tired|scared|heavy|far|fast|slow|loud|busy|full|difficult|hard)\b/gi,k=>{const pre=text.slice(Math.max(0,k.index-12),k.index);if(/\b(went|go|goes|going|back|ran|walked|due|close|next|up|up to|from)\s*$/i.test(pre))return;add(k.index,k.index+2,"grammar",T.too,keepCase(k[0],"too"))});
  rx(/\beveryday(?=\s*[,.!?]|\s+(I|we|he|she|they|my|our|after|before|at)\b)/gi,k=>add(k.index,k.index+8,"grammar",T.everyday,keepCase(k[0],"every day")));
  rx(/\b(go|goes|went|going|come|came|coming|ran|run|walked|rushed|hurried|way|back|reached|returned)\s+to\s+home\b/gi,k=>{const s=k.index+k[0].length-7;add(s,s+7,"grammar",T.toHome,"home")});
  rx(/\b(he|she|it)\s+don't\b/gi,k=>{const s=k.index+k[0].length-5;add(s,s+5,"grammar",T.doesnt,"doesn't")});
  rx(/\b(I|you|we|they)\s+doesn't\b/g,k=>{const s=k.index+k[0].length-7;add(s,s+7,"grammar",T.dont,"don't")});
  rx(/\bdiscuss(ed|ing)?\s+about\b/gi,k=>add(k.index,k.index+k[0].length,"grammar",T.discuss,k[0].replace(/\s+about$/i,"")));
  rx(/\breturn(ed|ing|s)?\s+back\b/gi,k=>add(k.index,k.index+k[0].length,"grammar",T.returnBack,k[0].replace(/\s+back$/i,"")));
  rx(/\b(\w+)\s+\1\b/gi,k=>{if(/^(had|that|very|so|ha|no|bye|knock|tick|tock|go|run|pull|push|again)$/i.test(k[1]))return;const s=k.index+k[1].length;add(s,k.index+k[0].length,"grammar",T.dbl(k[1]),"")});
  // punctuation
  sents.forEach((x,j)=>{const off=(x.s.match(/^[“"‘'(]+/)||[""])[0].length;const ch=x.s[off];if(ch&&/[a-z]/.test(ch)){const prev=text.slice(Math.max(0,x.start-3),x.start);if(/[,]\s*[”"]?\s*$/.test(prev))return;if(inR(SR,x.start+off)&&!/[.!?]\s*$/.test(prev)&&j>0)return;add(x.start+off,x.start+off+1,"punct",T.cap,ch.toUpperCase())}});
  text.split(/\n/).reduce((pos,line)=>{const tl=line.replace(/\s+$/,"");if(tl.trim().split(/\s+/).length>=4&&!/[.!?…”"'’)]$/.test(tl))add(pos+tl.length-1,pos+tl.length,"punct",T.end,tl.slice(-1)+".");return pos+line.length+1},0);
  rx(/[,.!?](?=[A-Za-z])/g,k=>{const before=text.slice(Math.max(0,k.index-2),k.index+3);if(/\d[.,]\d|[a-z]\.[a-z]\./i.test(before)||/\b(e\.g|i\.e|a\.m|p\.m|Mr|Mrs|Ms|Dr)$/i.test(text.slice(Math.max(0,k.index-4),k.index)))return;add(k.index,k.index+1,"punct",T.sp,k[0]+" ")});
  rx(/\s+([,.!?;:])(?!\S*[”"])/g,k=>{if(/[.!?]/.test(k[1])&&/\.\s*\.\s*\./.test(text.slice(k.index-2,k.index+4)))return;add(k.index,k.index+k[0].length,"punct",T.spb,k[1])});
  rx(new RegExp("([A-Za-z])([”\"])\\s*(?:(?:he|she|I|they|we|Mum|Mummy|Dad|Daddy|Mother|Father|Teacher|Grandma|Grandpa|my \\w+|[A-Z][a-z]+)\\s+)?("+SPEECH+")\\b","g"),k=>{const q=k.index+1;add(q,q+1,"punct",T.quoteComma,","+k[2])});
  rx(new RegExp("\\b("+SPEECH+")\\s+([“\"])(?=[A-Z])","g"),k=>{const s=k.index+k[1].length;add(s,s+1,"punct",T.tagComma,", "+"")});
  rx(/([!?])[!?]+/g,k=>add(k.index,k.index+k[0].length,"punct",T.excl,k[1]));
  // tense (outside speech)
  const outsideTxt=text.replace(/[“"][^”"]*[”"]?/g,m=>" ".repeat(m.length));
  const past=(outsideTxt.match(/\b(was|were|had|went|did|said|saw|came|took|felt|thought|ran|got|made|\w+ed)\b/gi)||[]).length;
  const IRR={};Object.entries(BASE).forEach(([pst,bs])=>{if(!IRR[bs]&&!/(ed)$/.test(pst))IRR[bs]=pst});Object.assign(IRR,{is:"was",are:"were",am:"was",has:"had",have:"had",be:"was"});
  const VB="play|kick|jump|walk|run|see|come|go|eat|look|help|want|try|cry|shout|laugh|open|close|like|love|decide|drop|stop|ask|call|finish|start|fall|hit|take|make|give|find|feel|think|know|tell|say|get|buy|bring|catch|throw|swim|ride|climb|chase|pick|push|pull|carry|hold|hug|smile|scream|rush|hurry|wait|reach|notice|realise|hear|turn|watch|wave|grab|slip|trip|share|thank|forget|remember|hide|break|sit|stand|sleep|wake|wear|win|lose|meet|pay|read|write|sing|draw|cook|clean|wash|need|hope|wish|try";
  const pastOf=v=>{v=v.toLowerCase();if(IRR[v])return IRR[v];if(/e$/.test(v))return v+"d";if(/[^aeiou]y$/.test(v))return v.slice(0,-1)+"ied";if(/^(stop|drop|grab|slip|trip|hug|chat|nod|plan|skip|rob|beg|rub|clap)$/.test(v))return v+v.slice(-1)+"ed";return v+"ed"};
  const sing=v=>v.replace(/(ch|sh|s|x|o)es$/,"$1").replace(/ies$/,"y").replace(/s$/,"");
  const presRe=new RegExp("\\b(I|we|they|you|he|she|it|my (?:friend|mum|dad|mother|father|brother|sister|teacher|classmate|grandma|grandpa|dog|cat)|[A-Z][a-z]+)\\s+(is|are|am|has|(?:"+VB+")(?:s|es)?|(?:tries|cries|hurries|carries|says|goes|does|watches|catches|reaches|rushes|pushes|finishes|washes))\\b","g");
  const pres=[];let pk;while((pk=presRe.exec(outsideTxt))){const subj=pk[1],v=pk[2];const pre=outsideTxt.slice(Math.max(0,pk.index-8),pk.index);if(/\b(to|will|can|could|would|should|must|let|did|didn't|do|don't|might|may)\s*$/i.test(pre))continue;
    if(/^(The|A|An|One|Then|When|After|Before|Suddenly|Soon|Later|Finally|At|In|On|Every|Mum|Dad)$/.test(subj)&&!/^(Mum|Dad)$/.test(subj))continue;
    const lv2=v.toLowerCase();if(/^(see|feel|hope|wish|know|think|like|love|want|need|remember)$/.test(lv2)&&/^(I|we|you|they)$/i.test(subj)&&inR(SR,pk.index))continue;
    pres.push({i:pk.index+pk[0].length-v.length,v,b:/^(is|are|am|has)$/.test(lv2)?lv2:(/^(says|goes|does)$/.test(lv2)?{says:"say",goes:"go",does:"do"}[lv2]:(new RegExp("^("+VB+")$").test(lv2)?lv2:sing(lv2)))})}
  if(past>=5&&past>=pres.length*1.5)pres.forEach(p=>{const pt=pastOf(p.b);add(p.i,p.i+p.v.length,"tense",T.tense(p.v,pt),pt)});
  // word choice
  rx(/\b(very|really|so)\s+([a-z]+)\b/gi,k=>{const a=k[2].toLowerCase();if(!VERY[a]||!outside(k.index))return;add(k.index,k.index+k[0].length,"word",T.very(k[0],VERY[a]),VERY[a].split(", ").slice(0,2).map(x=>keepCase(k[0],x)))});
  const lowOut=outsideTxt.toLowerCase();Object.keys(OVER).forEach(w=>{if(w==="very")return;const re=new RegExp("\\b"+w+"\\b","g");const ms=[...lowOut.matchAll(re)];const min=OVERMIN[w]||2;if(ms.length>=min){const k=ms[min-1];add(k.index,k.index+w.length,"word",T.over(w,ms.length,OVER[w]),null)}});
  rx(new RegExp("\\b(I|he|she|we|they|my \\w+|[A-Z][a-z]+)\\s+(was|were|felt|feel|am|is)\\s+(?:so |very |really |quite |a bit |extremely )?("+FEEL+")\\b","g"),k=>{if(!outside(k.index))return;const f=k[3].toLowerCase();const ex=feelEx(f);const fs=k.index+k[0].length-k[3].length;add(fs,fs+k[3].length,"word",T.tell(k[0]),null,{ex})});
  // style
  sents.forEach(x=>{const n=x.s.split(/\s+/).length;if(n>=35)add(x.start,x.end,"style",T.long(n),null);else{const a=(x.s.match(/\band\b/gi)||[]).length;if(a>=3)add(x.start,x.end,"style",T.ands,null)}});
  const op={};sents.forEach(x=>{const w=(x.s.replace(/^[“"‘']+/,"").split(/[\s,]+/)[0]||"");if(!w||inR(SR,x.start))return;(op[w.toLowerCase()]=op[w.toLowerCase()]||[]).push(x)});
  Object.entries(op).forEach(([w,xs])=>{if(xs.length>=3&&!/^(the|a)$/.test(w)){const x=xs[2];add(x.start,x.start+w.length,"style",T.opener(w[0].toUpperCase()+w.slice(1),xs.length),null)}});
  const at=[...text.matchAll(/\band then\b/gi)];if(at.length>=2)add(at[1].index,at[1].index+8,"style",T.andThen,null);
  const sa=sents.filter(x=>/^(And|So)\b/.test(x.s)&&!inR(SR,x.start));if(sa.length)add(sa[0].start,sa[0].start+sa[0].s.split(/\s/)[0].length,"style",T.startAnd,null);
  // de-duplicate overlaps (keep first / higher priority)
  const pri={spell:0,grammar:1,punct:2,tense:3,word:4,style:5};iss.sort((a,b)=>a.s-b.s||pri[a.cat]-pri[b.cat]);const out=[];let lastEnd=-1;
  iss.forEach(x=>{if(x.cat==="style"||x.extra&&x.extra.ex||x.cat==="word"&&x.e-x.s>30){out.push(Object.assign(x,{wide:true}));return}if(x.s<lastEnd)return;out.push(x);lastEnd=x.e});
  return {issues:out,missed:[...new Set(missed.filter(Boolean))],meta:metaEN(text,lv,sents,SR)}}
function metaEN(text,lv,sents,SR){const T=t9().m;const words=(text.match(/[A-Za-z'’-]+/g)||[]).length;const paras=text.split(/\n\s*\n|\n/).filter(x=>x.trim()).length;
  const tgt={1:40,2:60,3:120,4:150,5:150,6:150}[lv]||120;const good=[],tips=[];
  if(words>=tgt)good.push(T.lenOk(words,tgt));else tips.push(T.len(words,tgt));
  if(lv>=3){if(paras<=1&&words>=60)tips.push(T.paraOne);else if(paras<4&&words>=100)tips.push(T.paraFew(paras));else if(paras>=4)good.push(T.gParas(paras))}
  const low=" "+text.toLowerCase().replace(/[’]/g,"'").replace(/[^a-z' ]+/g," ").replace(/\s+/g," ")+" ";let found=phrases().filter(p=>low.includes(" "+p.replace(/[^a-z' ]+/g," ").replace(/\s+/g," ").trim()+" "));found=found.filter(p=>!found.some(q=>q!==p&&q.includes(p)));
  if(found.length)good.push(T.gPhr(found.length,found.slice(0,6).join(" · ")));
  if(SR.length)good.push(T.gSpeech);if(SENSE.test(text))good.push(T.gSenses);if(SHOW.test(text))good.push(T.gShow);
  const first=(sents[0]||{s:""}).s;if(/^(one day|once upon a time|on a|last|yesterday)\b/i.test(first))tips.push(T.openFlat);else if(/^[“"]|^[A-Z][a-z]+!|^(crash|bang|boom|thud|splash|creak|ring|beep|whoosh|knock)/i.test(first)||/^[A-Z][a-z]+ing\b/.test(first))good.push(T.gOpen);
  const lastP=text.trim().split(/\n/).filter(x=>x.trim()).pop()||"";if(words>=60){if(ENDGOOD.test(lastP))good.push(T.gEnd);else tips.push(T.endFlat)}
  return {words,paras,sents:sents.length,good,tips}}

/* ---------- Chinese checker ---------- */
const ZH_ADV="高兴|开心|慢慢|快快|轻轻|大声|小声|认真|仔细|小心|飞快|悄悄|静静|紧紧|急忙|兴奋|伤心|难过|害怕|生气|努力|高高兴兴|开开心心|慢吞吞|恶狠狠|狠狠|拼命|用力|不停|耐心|热情|焦急|着急|紧张|激动|得意|好奇|温柔|轻声|默默|偷偷|呆呆|愣愣|笑眯眯|气呼呼|兴高采烈|小心翼翼|依依不舍|津津有味|全神贯注|一步一步|一口一口|一句一句";
const ZH_V="跑|走|说|笑|哭|跳|喊|叫|看|望|写|读|吃|喝|点头|摇头|回答|离开|抱|拿|打开|学习|练习|做|问|跑过去|走过去|站|坐|想|听|拍|握|推|拉|追|冲|爬|唱|画|收拾|打扫|向|对|往|把";
function checkZH(text,lv){const T=t9().m;const iss=[];const add=(s,e,cat,msg,fix,extra)=>iss.push({s,e,cat,msg,fix:fix==null?null:[].concat(fix),extra});const rx=(re,fn)=>{let k;re.lastIndex=0;while((k=re.exec(text))){fn(k);if(!k[0].length)re.lastIndex++}};
  rx(new RegExp("("+ZH_ADV+")的("+ZH_V+")","g"),k=>{const i=k.index+k[1].length;add(i,i+1,"grammar",T.de(k[0],k[1]+"地"+k[2]),"地")});
  rx(/(跑|走|说|笑|哭|跳|唱|写|长|吃|玩|睡|洗|打扫|累|热|冷|急|高兴|忙|饿|气)的(很|非常|真|好|特别|满头大汗|飞快|又快又好|津津有味|上气不接下气|眼泪都|直不起腰|团团转|说不出话)/g,k=>{const i=k.index+k[1].length;add(i,i+1,"grammar",T.dei(k[0],k[1]+"得"+k[2]),"得")});
  rx(/([！？!?])[！？!?]+/g,k=>add(k.index,k.index+k[0].length,"punct",T.excl,k[1]));
  text.split(/\n/).reduce((pos,line)=>{const tl=line.replace(/\s+$/,"");if((tl.match(/[一-鿿]/g)||[]).length>=8&&!/[。！？!?…”"）)]$/.test(tl))add(pos+tl.length-1,pos+tl.length,"punct",T.end,tl.slice(-1)+"。");return pos+line.length+1},0);
  const OV={然后:[3,"接着、过了一会儿、不一会儿、这时"],很:[5,"十分、格外、特别，或用四字词语"],非常:[3,"格外、十分、极了"],说:[4,"问、喊道、回答、小声地说、笑着说"],突然:[3,"忽然、一下子、冷不防"],开心:[3,"兴高采烈、乐开了花、心花怒放"],高兴:[3,"兴高采烈、喜出望外、乐不可支"]};
  Object.entries(OV).forEach(([w,[min,alts]])=>{const ms=[...text.matchAll(new RegExp(w,"g"))];if(ms.length>=min){const k=ms[min-1];add(k.index,k.index+w.length,"word",T.over(w,ms.length,alts),null)}});
  rx(/(我|他|她|我们|大家)(感到|觉得)?(很|非常|特别|十分|好)?(高兴|开心|伤心|难过|害怕|生气|紧张|激动|着急|失望|得意|惭愧)/g,k=>add(k.index,k.index+k[0].length,"word",T.tell(k[0]),null,{ex:{高兴:["嘴角忍不住往上翘","高兴得一蹦三尺高"],开心:["笑得合不拢嘴","心里像吃了蜜一样甜"],伤心:["眼泪在眼眶里打转","低着头，一句话也说不出来"],难过:["鼻子一酸，眼泪掉了下来","心里像压了一块大石头"],害怕:["心怦怦直跳，手心全是汗","吓得双腿发软"],生气:["气得满脸通红","握紧了拳头，眉头皱成一团"],紧张:["手心直冒冷汗","心像揣了只小兔子，怦怦乱跳"],激动:["激动得说不出话来","眼睛一下子亮了起来"],着急:["急得像热锅上的蚂蚁","在原地团团转"],失望:["脸上的笑容一下子消失了","垂头丧气地走开了"],得意:["扬起下巴","笑得眼睛眯成一条缝"],惭愧:["脸一下子红到了耳根","低着头不敢看老师"]}[k[4]]||[]}));
  const sents=[];{const re=/[^。！？!?\n]+[。！？!?]*/g;let k;while((k=re.exec(text))){const s=k[0].trim();if(s)sents.push({s,start:k.index+(k[0].length-k[0].trimStart().length),end:k.index+k[0].length})}}
  const op={};sents.forEach(x=>{const w=x.s.replace(/^[“"]/,"").slice(0,2);if(/^[一-鿿]{2}$/.test(w))(op[w]=op[w]||[]).push(x)});Object.entries(op).forEach(([w,xs])=>{if(xs.length>=3)add(xs[2].start,xs[2].start+2,"style",T.opener(w,xs.length),null)});
  sents.forEach(x=>{const n=(x.s.match(/[一-鿿]/g)||[]).length;if(n>=60)add(x.start,x.end,"style",T.long(n),null)});
  const pri={spell:0,grammar:1,punct:2,tense:3,word:4,style:5};iss.sort((a,b)=>a.s-b.s||pri[a.cat]-pri[b.cat]);const out=[];let lastEnd=-1;iss.forEach(x=>{if(x.cat==="style"){out.push(Object.assign(x,{wide:true}));return}if(x.s<lastEnd)return;out.push(x);lastEnd=x.e});
  const chars=(text.match(/[一-鿿]/g)||[]).length;const paras=text.split(/\n\s*\n|\n/).filter(x=>x.trim()).length;const tgt={1:60,2:100,3:200,4:300,5:400,6:500}[lv]||200;const good=[],tips=[];
  if(chars>=tgt)good.push(T.lenOk(chars,tgt));else tips.push(T.len(chars,tgt));if(lv>=3){if(paras<=1&&chars>=100)tips.push(T.paraOne);else if(paras<4&&chars>=150)tips.push(T.paraFew(paras));else if(paras>=4)good.push(T.gParas(paras))}
  const fz=new Set();(DATA.zh||[]).forEach(u=>(u.blocks||[]).forEach(b=>{if(b.type==="chips")(b.groups||[]).forEach(g=>(g.words||[]).forEach(w=>{const x=String(w).replace(/<[^>]+>/g,"").trim();if(/^[一-鿿]{4,8}$/.test(x)&&text.includes(x))fz.add(x)}));if(b.type==="idioms")(b.items||[]).forEach(it=>{if(it.w&&text.includes(it.w))fz.add(it.w)})}));
  if(fz.size)good.push(T.gPhr(fz.size,[...fz].slice(0,8).join("、")));if(/[“"「]/.test(text))good.push(T.gSpeech);if(/(怦怦|眼泪|脸红|满脸|皱|咬着|攥|握紧|发抖|直冒|瞪大|笑眯眯|撅着嘴|低着头)/.test(text))good.push(T.gShow);
  const lastP=text.trim().split(/\n/).filter(x=>x.trim()).pop()||"";if(chars>=100&&/(明白|懂得|学会|难忘|永远|以后|下次|终于|感到|觉得|这件事)/.test(lastP))good.push(T.gEnd);
  return {issues:out,missed:[],meta:{words:chars,paras,sents:sents.length,good,tips}}}

function runCheck(text,lv){return zh()?checkZH(text,lv):checkEN(text,lv)}

/* ---------- rendering ---------- */
function curLevel(){const l=learnerLevel();if(l){const n=parseInt(l.slice(1),10);if(n>=1&&n<=6)return n}const s=lstore.get("wiw2-cklv",0);if(s)return s;return {A:2,B:3,C:5}[stageOf()]||3}
function annotate(text,issues){let html="",pos=0;issues.forEach((x,n)=>{if(x.wide)return;if(x.s<pos)return;html+=esc(text.slice(pos,x.s))+'<mark class="ck c-'+x.cat+'" data-n="'+n+'">'+esc(text.slice(x.s,x.e)||" ")+'<sup>'+(n+1)+'</sup></mark>';pos=x.e});return html+esc(text.slice(pos))}
function areasHTML(issues,meta){const t=t9();const c={};issues.forEach(x=>{c[x.cat]=(c[x.cat]||0)+1});const per100=n=>n*100/Math.max(40,meta.words);
  const cats=zh()?["grammar","punct","word","style"]:["spell","grammar","punct","tense","word","style"];
  return '<div class="ckareas">'+cats.map(k=>{const n=c[k]||0;const r=per100(n);const lvl=n===0?0:r<3?1:2;return '<div><b>'+["🟢","🟡","🔴"][lvl]+' '+t.cats[k]+'</b><div class="ckmeta">'+(n?n+" × – "+[t.ok,t.some,t.many][lvl]:t.ok)+'</div></div>'}).join("")+'</div>'}
function resultHTML(text,res,opts){const t=t9();const I=res.issues;const c={};I.forEach(x=>{c[x.cat]=(c[x.cat]||0)+1});const top=Object.entries(c).filter(([k])=>k!=="style").sort((a,b)=>b[1]-a[1])[0];
  return '<div class="sp-card"><p class="ckmeta">'+res.meta.words+' '+t.words+' · '+res.meta.paras+' '+t.paras+' · '+res.meta.sents+' '+t.sents+'</p><div class="cktext">'+annotate(text,I)+'</div></div>'+
   (top?'<div class="cktarget">🎯 '+t.target+': '+t.cats[top[0]]+'</div>':'')+
   '<div class="sp-card"><h3 style="margin-top:0">⭐ '+t.good+'</h3>'+(res.meta.good.length?'<ul class="ckgood">'+res.meta.good.map(g=>'<li>✅ '+esc(g)+'</li>').join("")+'</ul>':'<p class="muted">—</p>')+'</div>'+
   '<div class="sp-card"><h3 style="margin-top:0">🔧 '+t.fix+' ('+I.length+')</h3>'+(I.length?'<ol class="cklist">'+I.map((x,n)=>'<li class="b-'+x.cat+'" data-n="'+n+'"><span class="cktag t-'+x.cat+'">'+(n+1)+' · '+t.cats[x.cat]+'</span>'+esc(x.msg)+
     (x.extra&&x.extra.ex&&x.extra.ex.length?'<div class="ckex">'+x.extra.ex.map(e=>"• "+esc(e)).join("<br>")+'</div>':'')+
     (opts.fix&&x.fix&&x.fix.length?'<div class="ckfix">'+x.fix.map((f,j)=>'<button data-fix="'+n+'" data-j="'+j+'">'+(f===""?"✂ "+t.fixIt:esc(f))+'</button>').join("")+'<button class="ig" data-ig="'+n+'">'+t.ignore+'</button></div>':(x.fix&&x.fix.length&&x.fix[0]?'<div class="ckmeta">→ '+esc(x.fix.join(" / "))+'</div>':''))+'</li>').join("")+'</ol>':'<p class="fb good">'+t.none+'</p>')+'</div>'+
   (res.meta.tips.length?'<div class="sp-card"><h3 style="margin-top:0">💡 '+t.tips+'</h3><ul>'+res.meta.tips.map(x=>'<li>'+esc(x)+'</li>').join("")+'</ul></div>':'')+
   '<div class="sp-card"><h3 style="margin-top:0">'+t.areas+'</h3>'+areasHTML(I,res.meta)+(!zh()&&res.missed.length&&opts.spell!==false?'<div class="row" style="margin-top:10px;gap:8px;flex-wrap:wrap"><button class="btn small addsp">'+t.addSpell+'</button><span class="ckmeta spmsg"></span></div>':'')+'</div>'}
function bindResult(root,text,res,onFix){root.addEventListener("click",ev=>{const mk=ev.target.closest("mark.ck,[data-n]");const fx=ev.target.closest("[data-fix]"),ig=ev.target.closest("[data-ig]"),as=ev.target.closest(".addsp");
  if(fx&&onFix){const x=res.issues[+fx.dataset.fix];onFix(x,x.fix[+fx.dataset.j]);return}
  if(ig){const li=ig.closest("li");li.style.opacity=.45;ig.parentElement.remove();const m=root.querySelector('mark[data-n="'+ig.dataset.ig+'"]');if(m)m.replaceWith(document.createTextNode(m.firstChild.textContent));return}
  if(as){addToSpelling(res.missed,text);const m=root.querySelector(".spmsg");if(m)m.textContent=t9().added(res.missed.length);as.disabled=true;return}
  if(mk&&mk.dataset.n!=null){const n=mk.dataset.n;root.querySelectorAll(".on").forEach(x=>x.classList.remove("on"));root.querySelectorAll('[data-n="'+n+'"]').forEach(x=>x.classList.add("on"));
    const other=mk.tagName==="MARK"?root.querySelector('li[data-n="'+n+'"]'):root.querySelector('mark[data-n="'+n+'"]');if(other)other.scrollIntoView({block:"center",behavior:"smooth"})}})}
function addToSpelling(words,text){const k="wiw2-spell-en";const s=lstore.get(k,null)||{};s.cards=s.cards||{};s.custom=s.custom||[];s.days=s.days||{};
  words.forEach(w=>{if(!/^[A-Za-z' -]{2,20}$/.test(w))return;if(s.custom.some(x=>String(x.w).toLowerCase()===w.toLowerCase()))return;const sent=(text.split(/(?<=[.!?])\s+/).find(x=>new RegExp("\\b"+w.slice(0,3),"i").test(x))||"").slice(0,120);s.custom.unshift({w,s:"",trick:""})});lstore.set(k,s)}
function logCheck(res){const k="wiw2-checks-"+lang;const L=lstore.get(k,[]);const c={};res.issues.forEach(x=>{c[x.cat]=(c[x.cat]||0)+1});L.unshift({d:today(),w:res.meta.words,c,miss:res.missed.slice(0,20)});while(L.length>60)L.pop();lstore.set(k,L)}
function historyHTML(){const t=t9();const L=lstore.get("wiw2-checks-"+lang,[]).slice(0,10);if(!L.length)return '<p class="muted">'+t.hNone+'</p>';const c={};const mw={};
  L.forEach(x=>{Object.entries(x.c||{}).forEach(([k,n])=>{c[k]=(c[k]||0)+n});(x.miss||[]).forEach(w=>{mw[w]=(mw[w]||0)+1})});
  const top=Object.entries(c).filter(([k])=>k!=="style").sort((a,b)=>b[1]-a[1]).slice(0,3);const tw=Object.entries(mw).sort((a,b)=>b[1]-a[1]).slice(0,12);
  return '<p><b>'+t.hTop+':</b> '+(top.map(([k,n])=>t.cats[k]+" ("+n+")").join(" · ")||"—")+'</p>'+(tw.length&&t.hWords?'<p><b>'+t.hWords+':</b> '+tw.map(([w])=>esc(w)).join(", ")+'</p>':'')+'<p class="ckmeta">'+L.length+' × · '+L.map(x=>x.d.slice(5)).slice(0,5).join(", ")+'</p>'}

/* ---------- the page ---------- */
Object.assign(ICONMAP,{check:"proofread"});
PAGES.check={sec:"practice",icon:"proofread",title:{en:"Check my writing",zh:"检查我的作文"},render(m){const t=t9();pageHead(m,lang+"-check",t.eyebrow,t.title,t.lead);
  const box=el("section","block ck9");m.appendChild(box);let lv=curLevel();const dk="wiw2-ckdraft-"+lang;
  box.innerHTML='<div class="sp-card"><div class="row" style="gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:8px"><b>'+t.level+'</b><span class="w7seg lvsel">'+[1,2,3,4,5,6].map(n=>'<button data-lv="'+n+'" aria-pressed="'+(n===lv)+'">P'+n+'</button>').join("")+'</span></div>'+
    '<details class="lvinfo"><summary><b>📋 '+t.levelInfo+'</b></summary><ul class="lvul"></ul></details>'+
    '<textarea class="ckin" placeholder="'+esc(t.ph)+'"></textarea><div class="row" style="gap:8px;flex-wrap:wrap;margin-top:8px"><button class="btn go">'+t.check+'</button>'+(canSpeak?'<button class="btn ghost small rd">'+t.listen+'</button>':'')+'<button class="btn ghost small clr">'+t.clear+'</button></div><p class="fb msg"></p></div><div class="res"></div>'+
    '<div class="sp-card"><h3 style="margin-top:0">📈 '+t.history+'</h3><div class="hist">'+historyHTML()+'</div></div>';
  const ta=box.querySelector(".ckin");ta.value=lstore.get(dk,"")||"";
  const info=()=>{box.querySelector(".lvul").innerHTML=t.info[lv].map(x=>'<li>'+esc(x)+'</li>').join("")};info();
  box.querySelector(".lvsel").addEventListener("click",ev=>{const b=ev.target.closest("[data-lv]");if(!b)return;lv=+b.dataset.lv;lstore.set("wiw2-cklv",lv);box.querySelectorAll(".lvsel button").forEach(x=>x.setAttribute("aria-pressed",String(x===b)));info();if(box.querySelector(".res").innerHTML)go(false)});
  ta.addEventListener("input",()=>lstore.set(dk,ta.value));
  function go(first){const text=ta.value;const msg=box.querySelector(".msg");const n=zh()?(text.match(/[\u4e00-\u9fff]/g)||[]).length:(text.match(/[A-Za-z]+/g)||[]).length;const cur=box.querySelector(".res");
    if(n<(zh()?15:8)){msg.className="fb bad msg";msg.textContent=t.short;cur.innerHTML="";return}msg.textContent="";msg.className="fb msg";
    const r=runCheck(text,lv);const fresh=el("div","res",resultHTML(text,r,{fix:true}));cur.replaceWith(fresh);
    bindResult(fresh,text,r,(x,f)=>{ta.value=text.slice(0,x.s)+f+text.slice(x.e);lstore.set(dk,ta.value);go(false)});
    if(first){logCheck(r);box.querySelector(".hist").innerHTML=historyHTML();if(n>=(zh()?60:40)){const k=lang+"-coach:para:check:"+today();if(!stars[k]){giveStar(k,fresh.querySelector(".sp-card"));toast(t.star)}}fresh.scrollIntoView({block:"start",behavior:"smooth"})}}
  box.querySelector(".go").onclick=()=>go(true);box.querySelector(".clr").onclick=()=>{ta.value="";lstore.set(dk,"");box.querySelector(".res").innerHTML="";ta.focus()};
  const rd=box.querySelector(".rd");if(rd)rd.onclick=()=>{if(rd.dataset.on){speechSynthesis.cancel();rd.dataset.on="";rd.textContent=t.listen;return}rd.dataset.on="1";rd.textContent=t.stop;speak(ta.value);const iv=setInterval(()=>{if(!speechSynthesis.speaking){clearInterval(iv);rd.dataset.on="";rd.textContent=t.listen}},500)}}};

/* ---------- exam practice: check the finished composition ---------- */
new MutationObserver(()=>{const w=document.querySelector("#main .w7text:not([data-ck])");if(!w)return;w.dataset.ck=1;const t=t9();const b=el("button","btn small",t.examBtn);b.style.margin="6px 0";w.after(b);
  b.onclick=()=>{const text=w.textContent;const r=runCheck(text,curLevel());const holder=el("div","ck9");holder.innerHTML=resultHTML(text,r,{fix:false});b.replaceWith(holder);bindResult(holder,text,r,null);logCheck(r);holder.scrollIntoView({block:"start",behavior:"smooth"})}}).observe(document.getElementById("main"),{childList:true,subtree:true});

/* ---------- parent report: writing slips ---------- */
const _rep9=PAGES.report&&PAGES.report.render;if(_rep9)PAGES.report.render=function(m){_rep9(m);try{const t=t9();const c=el("section","sp-card ck9 d4noprint");c.innerHTML='<h3 style="margin-top:0">🔍 '+t.history+' – '+t.title+'</h3>'+historyHTML()+'<button class="btn ghost small" data-go="'+lang+'-check">'+t.check+'</button>';
  c.querySelector("[data-go]").onclick=()=>openUnit(lang+"-check",true);const u=m.querySelector(".u8");if(u)u.after(c);else m.appendChild(c)}catch(e){}};

window.__ck9={runCheck,checkEN,checkZH};
})();
