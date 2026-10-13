/* ===== round 21: parent report – what they actually use ===== */
(function(){
const T8={en:{title:"👀 What they actually use (last 14 days)",lead:"Opening a page is not the same as learning from it. Look for reading that turns into writing.",
  days:"Active days",opened:"Pages opened",banks:"Different word banks opened",ticked:"Banks read to the end",sents:"Sentences / paragraphs written",exams:"Exam practices",spell:"Spelling days",
  top:"Opened most",never:"Word banks not opened yet",none:"Nothing yet – usage is counted from today.",times:"×",strip:"Last 14 days",key:"📖 read · ✍️ wrote · 🔤 spelling",
  tipLow:"Lots of reading but little writing: try “Write with this bank” at the end of a bank they like.",tipGood:"Good balance of reading and writing – keep it up.",tipQuiet:"Only a few active days: a 10-minute daily habit works better than a long weekend session.",last:"latest score"},
 zh:{title:"👀 孩子实际用了什么（最近14天）",lead:"打开页面不等于学会了。要看读到的词语有没有用到写作里。",
  days:"有练习的天数",opened:"打开的页面",banks:"打开过的词语宝库",ticked:"读完的词语宝库",sents:"写的句子／段落",exams:"考试练习",spell:"听写天数",
  top:"最常打开",never:"还没打开过的词语宝库",none:"还没有记录——从今天开始统计。",times:"次",strip:"最近14天",key:"📖 阅读 · ✍️ 写作 · 🔤 听写",
  tipLow:"读得多、写得少：可以在喜欢的词语宝库底部试试“用这个词语宝库写一写”。",tipGood:"阅读和写作很平衡，继续保持！",tipQuiet:"练习的天数不多：每天10分钟比周末一次练很久更有效。",last:"最近得分"}};
const t8=()=>T8[lang];
const LOGK=()=>"wiw2-usage-"+lang;
["wiw2-usage-en","wiw2-usage-zh"].forEach(k=>{if(typeof LKEYS!=="undefined"&&!LKEYS.includes(k))LKEYS.push(k)});
/* record every page opened */
const _ou8=openUnit;openUnit=function(id,scroll){_ou8(id,scroll);try{if(!id||!/^(en|zh)-/.test(id))return;const L=lstore.get(LOGK(),[]);const d=today();const lastE=L[L.length-1];
  if(lastE&&lastE[0]===d&&lastE[1]===id)return;L.push([d,id]);while(L.length>2000)L.shift();lstore.set(LOGK(),L)}catch(e){}};
function daysBack(n){const out=[];const now=new Date();for(let i=n-1;i>=0;i--){const x=new Date(now);x.setDate(now.getDate()-i);out.push(dkey(x))}return out}
function usageCard(){const t=t8();const days=daysBack(14);const set=new Set(days);
  const log=lstore.get(LOGK(),[]).filter(x=>set.has(x[0]));
  const did=lstore.get("wiw2-did-"+lang,{});
  const ids=readIds();const idset=new Set(ids);
  const cnt={};log.forEach(x=>{cnt[x[1]]=(cnt[x[1]]||0)+1});
  const bankOpens=Object.keys(cnt).filter(id=>idset.has(id));
  const ticked=new Set(Object.keys(stars).filter(k=>k.startsWith(lang+"-read:")&&set.has(k.split(":").pop())).map(k=>k.split(":")[1])).size;
  const sents=lstore.get("wiw2-mysent-"+lang,[]).filter(x=>set.has(x.d)).length;
  const ex=lstore.get("wiw2-exam-"+lang,[]);const ex14=ex.filter(x=>set.has(x.d));
  const sp=days.filter(d=>did[d]&&did[d].spell).length;
  const active=days.filter(d=>(did[d]&&Object.keys(did[d]).length)||log.some(x=>x[0]===d)).length;
  const everOpened=new Set(lstore.get(LOGK(),[]).map(x=>x[1]).concat(lstore.get("wiw2-recent-"+lang,[])).concat(Object.keys(stars).filter(k=>k.startsWith(lang+"-read:")).map(k=>k.split(":")[1])));
  const never=ids.filter(id=>!everOpened.has(id));
  const top=bankOpens.sort((a,b)=>cnt[b]-cnt[a]).slice(0,8);
  const nm=id=>{const u=unitById(id);return u?esc(String(u.title)):id};
  const stat=(v,l)=>'<div style="flex:1 1 130px;border:1.5px solid var(--rule);border-radius:12px;padding:8px 10px;background:var(--card)"><b style="font-size:1.4rem">'+v+'</b><div class="muted" style="font-size:.9rem">'+l+'</div></div>';
  const strip=days.map(d=>{const x=did[d]||{};const r=x.read||log.some(y=>y[0]===d&&idset.has(y[1]));const ic=(r?"📖":"")+(x.write?"✍️":"")+(x.spell?"🔤":"");
    return '<div title="'+d+'" style="flex:1 0 0;min-width:0;text-align:center;border-radius:8px;padding:4px 0;background:'+(ic?"color-mix(in srgb,var(--blue) 12%,var(--card))":"transparent")+';border:1px solid var(--rule)"><div style="font-size:.7rem" class="muted">'+d.slice(-2)+'</div><div style="font-size:.75rem;line-height:1.3;word-break:break-all">'+(ic||"·")+'</div></div>'}).join("");
  let tip="";if(active<5)tip=t.tipQuiet;else if(bankOpens.length>=4&&sents<3)tip=t.tipLow;else if(sents>=3)tip=t.tipGood;
  const c=el("section","sp-card u8 d4noprint");
  c.innerHTML='<h3 style="margin-top:0">'+t.title+'</h3><p class="muted">'+t.lead+'</p>'+
    '<div style="display:flex;flex-wrap:wrap;gap:8px;margin:8px 0">'+stat(active+" / 14",t.days)+stat(log.length,t.opened)+stat(bankOpens.length,t.banks)+stat(ticked,t.ticked)+stat(sents,t.sents)+stat(ex14.length+(ex14.length?' <small class="muted">('+t.last+' '+ex14[0].score+'/20)</small>':''),t.exams)+stat(sp,t.spell)+'</div>'+
    '<p style="margin:10px 0 4px"><b>'+t.strip+'</b> <small class="muted">'+t.key+'</small></p><div style="display:flex;gap:3px">'+strip+'</div>'+
    (tip?'<p class="fb" style="margin-top:10px">💡 '+tip+'</p>':'')+
    '<p style="margin:12px 0 4px"><b>'+t.top+'</b></p>'+(top.length?'<div class="row" style="gap:6px;flex-wrap:wrap">'+top.map(id=>'<button class="btn ghost small" data-go="'+id+'">'+nm(id)+' <span class="muted">'+cnt[id]+t.times+'</span></button>').join("")+'</div>':'<p class="muted">'+t.none+'</p>')+
    (never.length?'<p style="margin:12px 0 4px"><b>'+t.never+'</b> <span class="muted">('+never.length+')</span></p><div class="row" style="gap:6px;flex-wrap:wrap">'+never.slice(0,12).map(id=>'<button class="btn ghost small" data-go="'+id+'">'+nm(id)+'</button>').join("")+'</div>':'');
  c.addEventListener("click",ev=>{const b=ev.target.closest("[data-go]");if(b)openUnit(b.dataset.go,true)});return c}
const _rep8=PAGES.report&&PAGES.report.render;if(_rep8)PAGES.report.render=function(m){_rep8(m);try{const c=usageCard();const first=m.querySelector(".sp-card");if(first&&first.parentNode)first.parentNode.insertBefore(c,first.nextSibling);else m.appendChild(c)}catch(e){}};
})();
