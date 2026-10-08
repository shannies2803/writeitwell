// Validator for Write It Well content files. Usage: node validate.js file1.js [file2.js ...]
const fs = require("fs"), vm = require("vm");
const GROUPS = { en: ["Start here","Building blocks","Word banks","Techniques","Practice","Model essays"],
                 zh: ["入门","基本功","词语宝库","写作技巧","练习园地","范文欣赏"] };
const TYPES = ["text","tip","steps","cards","avoid","chips","table","mountain","wordbank","settings","idioms","essay","mcq","rewrite","order","fixit","topics","studio","planner","flash"];
const MARKS = ["s","sh","f","d","c","fig","id"];
let errors = [], ids = new Set(), stats = {}, EXT = [];
const isStr = x => typeof x === "string" && x.trim().length > 0;
const arr = (x, min) => Array.isArray(x) && x.length >= (min || 1);
function checkHtml(s, where) {
  if (typeof s !== "string") return;
  const tags = s.match(/<\/?([a-zA-Z]+)[^>]*>/g) || [];
  for (const t of tags) {
    const name = t.replace(/^<\/?/, "").split(/[\s>]/)[0].toLowerCase();
    if (!["b","i","br","mark"].includes(name)) errors.push(where + ": disallowed tag " + t);
    const m = t.match(/class="([^"]*)"/); if (m && !MARKS.includes(m[1])) errors.push(where + ": bad mark class " + m[1]);
  }
  if (/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u.test(s)) errors.push(where + ": emoji found");
}
function walk(o, where) { if (typeof o === "string") checkHtml(o, where); else if (o && typeof o === "object") for (const k in o) walk(o[k], where + "." + k); }
for (const f of process.argv.slice(2)) {
  const ctx = { window: {} }; vm.createContext(ctx);
  const src = fs.readFileSync(f, "utf8");
  if (src.includes("`")) errors.push(f + ": contains a backtick");
  try { vm.runInContext(src, ctx, { filename: f }); } catch (e) { errors.push(f + ": JS error " + e.message); continue; }
  for (const part of ctx.window.CONTENT_PARTS || []) {
    if (!GROUPS[part.lang]) { errors.push(f + ": bad lang " + part.lang); continue; }
    (part.extends || []).forEach((x, k) => {
      if (!x || typeof x.id !== "string" || !x.id.startsWith(part.lang + "-") || !Array.isArray(x.blocks) || !x.blocks.length) { errors.push(f + ": bad extends entry " + k); return; }
      part.units = (part.units || []).concat([{ id: x.id + "--ext" + k + "-" + f.replace(/[^a-z0-9]/gi, ""), group: GROUPS[part.lang][2], order: 0, title: "ext", intro: "ext", blocks: x.blocks }]);
      EXT.push(x.id);
    });
    for (const u of part.units || []) {
      const w = f + " " + (u.id || "?");
      if (!isStr(u.id) || !u.id.startsWith(part.lang + "-")) errors.push(w + ": bad id");
      if (ids.has(u.id)) errors.push(w + ": duplicate id"); ids.add(u.id);
      if (!GROUPS[part.lang].includes(u.group)) errors.push(w + ": bad group " + u.group);
      if (typeof u.order !== "number") errors.push(w + ": order not number");
      if (!isStr(u.title) || !isStr(u.intro)) errors.push(w + ": missing title/intro");
      if (!arr(u.blocks)) errors.push(w + ": no blocks");
      (u.blocks || []).forEach((b, i) => {
        const bw = w + " block" + i + "(" + b.type + ")";
        if (!TYPES.includes(b.type)) { errors.push(bw + ": unknown type"); return; }
        stats[b.type] = (stats[b.type] || 0) + 1;
        walk(b, bw);
        const items = b.items || [];
        switch (b.type) {
          case "text": case "tip": if (!isStr(b.html)) errors.push(bw + ": html"); break;
          case "steps": items.forEach((x, j) => { if (!isStr(x.title) || !isStr(x.text)) errors.push(bw + " item" + j); }); break;
          case "avoid": if (!arr(items)) errors.push(bw + ": items"); break;
          case "chips": if (!arr(b.groups)) errors.push(bw + ": groups"); (b.groups || []).forEach((g, j) => { if (!isStr(g.title) || !arr(g.words)) errors.push(bw + " group" + j); }); break;
          case "table": if (!arr(b.head) || !arr(b.rows)) errors.push(bw + ": head/rows"); (b.rows || []).forEach((r, j) => { if (!Array.isArray(r) || r.length !== b.head.length) errors.push(bw + " row" + j + " length"); }); break;
          case "mountain": if (!Array.isArray(b.stages) || b.stages.length !== 5) errors.push(bw + ": need 5 stages"); break;
          case "wordbank": items.forEach((x, j) => { if (!isStr(x.name) || typeof x.hue !== "number" || !arr(x.ladder, 5) || x.ladder.length !== 5 || !arr(x.show, 3) || !arr(x.similes) || !isStr(x.tell) || !isStr(x.showEx)) errors.push(bw + " item" + j + " (" + x.name + ")"); }); break;
          case "settings": items.forEach((x, j) => { if (!isStr(x.name) || !arr(x.senses, 3) || x.senses.some(s => !isStr(s.label) || !arr(s.lines))) errors.push(bw + " item" + j); }); break;
          case "idioms": items.forEach((x, j) => { if (!isStr(x.w) || !isStr(x.m) || !isStr(x.cat) || typeof x.py !== "string" || (part.lang === "zh" && !isStr(x.py))) errors.push(bw + " item" + j + " " + x.w); }); break;
          case "essay": if (!isStr(b.title) || !arr(b.paras, 3) || !arr(b.legend) || !arr(b.notes)) errors.push(bw + ": fields"); break;
          case "mcq": items.forEach((x, j) => { if (!isStr(x.q) || !arr(x.o, 2) || typeof x.a !== "number" || x.a < 0 || x.a >= x.o.length || !isStr(x.e)) errors.push(bw + " item" + j); }); break;
          case "rewrite": items.forEach((x, j) => { if (!isStr(x.q) || !isStr(x.a)) errors.push(bw + " item" + j); }); break;
          case "order": items.forEach((x, j) => { if (!arr(x.words, 3) || new Set(x.words).size !== x.words.length) errors.push(bw + " item" + j); }); break;
          case "fixit": items.forEach((x, j) => { if (!isStr(x.wrong) || !isStr(x.right) || !isStr(x.why) || x.wrong === x.right) errors.push(bw + " item" + j); }); break;
          case "topics": items.forEach((x, j) => { if (!isStr(x.title) || !isStr(x.theme) || !isStr(x.level) || !arr(x.ideas)) errors.push(bw + " item" + j); }); break;
          case "flash": items.forEach((x, j) => { if (!isStr(x.f) || !isStr(x.b)) errors.push(bw + " item" + j); }); break;
          case "studio": if (!arr(b.rubric)) errors.push(bw + ": rubric"); break;
          case "planner": if (!arr(b.fields) || !arr(b.checks)) errors.push(bw + ": fields/checks"); (b.fields||[]).forEach((x,j)=>{ if(!/^[a-z0-9_]+$/.test(x.id||"")) errors.push(bw+" field"+j+" id"); }); break;
        }
        if (["mcq","rewrite","order","fixit","flash","topics","wordbank","settings","idioms","cards","steps"].includes(b.type) && !arr(items)) errors.push(bw + ": empty items");
      });
    }
  }
}
const realIds=[...ids].filter(i=>!i.includes("--ext"));if(realIds.length>60)EXT.forEach(t=>{if(!ids.has(t))errors.push("extends target not found: "+t)});
console.log("units:", ids.size, "block types:", JSON.stringify(stats));
if (errors.length) { console.log("ERRORS (" + errors.length + "):\n" + errors.slice(0, 80).join("\n")); process.exit(1); }
console.log("OK");
