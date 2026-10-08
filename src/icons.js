/* Write It Well - icon kit. Original flat picture-book icons drawn in code.
   window.ART.icon(name, opts) -> '<svg viewBox="0 0 64 64">...</svg>'
   opts: {size: px, label: "accessible text", tile: false (omit tile)} */
(function () {
  "use strict";
  var INK = "#2B2D42";
  var K = {
    red: "#E5534B", orange: "#F2994A", yellow: "#F6C343", green: "#4CAF7A", teal: "#2BA6A0",
    blue: "#3E7CD6", navy: "#24407A", purple: "#8A6BD1", pink: "#F28DB2", white: "#FFFFFF",
    grey: "#9AA3B5", brown: "#8B5E3C", wood: "#E9C99A", grass: "#9ED48B", sky: "#BFE3F5",
    cream: "#F6EFDF", skin: "#F7D9C4", tan: "#E8B994", stripe: "#E58F65", lbrown: "#B07A4F"
  };
  // light tile tints
  var T = {
    red: "#FBE0DE", orange: "#FDE8D5", yellow: "#FDF0C8", green: "#DDF2E5", teal: "#D3EFEC",
    blue: "#DDE8F8", purple: "#E9E2F7", pink: "#FCE3EC", sky: "#E0F1FA", cream: "#F8EEDC"
  };

  var ST = ' stroke="' + INK + '" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"';
  function f(c) { return ' fill="' + (c || "none") + '"'; }
  function P(d, c) { return '<path d="' + d + '"' + f(c) + ST + "/>"; }
  function N(d, c) { return '<path d="' + d + '"' + f(c) + "/>"; } // fill only
  function C(x, y, r, c) { return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '"' + f(c) + ST + "/>"; }
  function D(x, y, r, c) { return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '"' + f(c || INK) + "/>"; }
  function E(x, y, rx, ry, c) { return '<ellipse cx="' + x + '" cy="' + y + '" rx="' + rx + '" ry="' + ry + '"' + f(c) + ST + "/>"; }
  function R(x, y, w, h, rx, c) { return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + rx + '"' + f(c) + ST + "/>"; }
  function Rn(x, y, w, h, rx, c) { return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + rx + '"' + f(c) + "/>"; }
  function L(x1, y1, x2, y2, col, w) {
    return '<path d="M' + x1 + " " + y1 + " L" + x2 + " " + y2 + '" fill="none" stroke="' + (col || INK) + '" stroke-width="' + (w || 2.5) + '" stroke-linecap="round"/>';
  }
  function S(d, col, w, extra) { // coloured stroke only (no ink)
    return '<path d="' + d + '" fill="none" stroke="' + col + '" stroke-width="' + w + '" stroke-linecap="round" stroke-linejoin="round"' + (extra || "") + "/>";
  }
  function tube(d, col, w) { // thick coloured line with ink outline
    return S(d, INK, w + 5) + S(d, col, w);
  }
  function G(t, inner) { return '<g transform="' + t + '">' + inner + "</g>"; }
  function star(cx, cy, R1, r1, c, rot) {
    var pts = [], a0 = -Math.PI / 2 + (rot || 0);
    for (var i = 0; i < 10; i++) {
      var rr = i % 2 ? r1 : R1, a = a0 + i * Math.PI / 5;
      pts.push((cx + rr * Math.cos(a)).toFixed(1) + " " + (cy + rr * Math.sin(a)).toFixed(1));
    }
    return P("M" + pts.join(" L") + " Z", c);
  }
  function spark(cx, cy, r, c) { // 4-point sparkle, filled, no outline
    return N("M" + cx + " " + (cy - r) + " Q" + cx + " " + cy + " " + (cx + r) + " " + cy + " Q" + cx + " " + cy + " " + cx + " " + (cy + r) +
      " Q" + cx + " " + cy + " " + (cx - r) + " " + cy + " Q" + cx + " " + cy + " " + cx + " " + (cy - r) + " Z", c);
  }
  function sparkO(cx, cy, r, c) { // sparkle with ink outline
    return P("M" + cx + " " + (cy - r) + " Q" + (cx + r * 0.18) + " " + (cy - r * 0.18) + " " + (cx + r) + " " + cy + " Q" + (cx + r * 0.18) + " " + (cy + r * 0.18) + " " + cx + " " + (cy + r) +
      " Q" + (cx - r * 0.18) + " " + (cy + r * 0.18) + " " + (cx - r) + " " + cy + " Q" + (cx - r * 0.18) + " " + (cy - r * 0.18) + " " + cx + " " + (cy - r) + " Z", c);
  }
  // crescent: outer circle minus offset inner circle
  function crescent(cx, cy, Rr, ox, oy, r, c) {
    var dx = ox - cx, dy = oy - cy, d = Math.sqrt(dx * dx + dy * dy);
    var a = (Rr * Rr - r * r + d * d) / (2 * d), h = Math.sqrt(Math.max(0, Rr * Rr - a * a));
    var mx = cx + a * dx / d, my = cy + a * dy / d;
    var p1x = mx + h * dy / d, p1y = my - h * dx / d, p2x = mx - h * dy / d, p2y = my + h * dx / d;
    function n(v) { return v.toFixed(1); }
    return P("M" + n(p1x) + " " + n(p1y) + " A" + Rr + " " + Rr + " 0 1 0 " + n(p2x) + " " + n(p2y) +
      " A" + r + " " + r + " 0 0 1 " + n(p1x) + " " + n(p1y) + " Z", c);
  }
  function face(cx, cy, s) { // tiny happy face: eyes + smile
    s = s || 1;
    return D(cx - 4 * s, cy - 1, 1.6 * s) + D(cx + 4 * s, cy - 1, 1.6 * s) +
      S("M" + (cx - 3 * s) + " " + (cy + 3 * s) + " Q" + cx + " " + (cy + 6 * s) + " " + (cx + 3 * s) + " " + (cy + 3 * s), INK, 2);
  }

  var I = {};

  I.steps = ["green", function () {
    return E(16, 50, 11, 6, K.grass) + E(32, 38, 10, 5.5, K.yellow) + E(47, 26, 9.5, 5.5, K.orange) +
      D(16, 50, 1.8) +
      D(29.5, 38, 1.8) + D(34.5, 38, 1.8) +
      D(43, 26, 1.7) + D(47, 26, 1.7) + D(51, 26, 1.7) +
      sparkO(47, 11, 6, K.yellow) + S("M20 42 Q22 40 24 41", K.grey, 2) + S("M37 30 Q39 28 41 29", K.grey, 2);
  }];

  I.question = ["blue", function () {
    return R(9, 8, 30, 40, 4, K.white) +
      L(15, 17, 33, 17, K.grey, 3) + L(15, 24, 33, 24, K.grey, 3) + L(15, 31, 26, 31, K.grey, 3) +
      tube("M45 45 L54 54", K.brown, 5) + C(38, 36, 11, "#E7F4FB") + S("M31 34 A7 7 0 0 1 36 29", K.white, 3);
  }];

  I.mountain = ["sky", function () {
    return P("M5 54 L26 16 L36 32 L43 23 L59 54 Z", K.green) +
      P("M20 27 L26 16 L32 27 L29 25 L26 28 L23 25 Z", K.white) +
      S("M14 50 Q20 44 18 40 Q16 34 22 31", K.white, 2.5, ' stroke-dasharray="0.1 5"') +
      L(26, 16, 26, 5) + P("M26 5 L37 8.5 L26 12 Z", K.red);
  }];

  I.pictures = ["pink", function () {
    return G("rotate(-12 30 26)", R(10, 10, 34, 27, 3, K.pink)) +
      G("rotate(6 36 34)", R(18, 20, 38, 31, 3, K.yellow) + R(22, 24, 30, 23, 1.5, K.sky) +
        P("M22 47 L31 34 L37 41 L42 36 L52 47 Z", K.grass) + C(45, 30, 3.2, K.white));
  }];

  I.lightbulb = ["yellow", function () {
    return L(32, 4, 32, 7, INK) + L(14, 11, 16.5, 13.5) + L(50, 11, 47.5, 13.5) + L(8, 25, 11, 25) + L(53, 25, 56, 25) +
      P("M26 42 C26 37 18 34 18 25 A14 14 0 0 1 46 25 C46 34 38 37 38 42 Z", K.yellow) +
      S("M29 37 L29 29 L32 32 L35 29 L35 37", K.orange, 2.2) +
      S("M23 23 A9 9 0 0 1 28 16", K.white, 3) +
      R(25, 42, 14, 5, 2, K.grey) + R(26, 47, 12, 5, 2, K.grey) + P("M29 52 H35 L33 56 H31 Z", INK);
  }];

  I.clock = ["red", function () {
    return P("M23 13 Q32 6 41 13") + C(18, 17, 6, K.red) + C(46, 17, 6, K.red) +
      L(20, 50, 16, 56) + L(44, 50, 48, 56) +
      C(32, 35, 18, K.red) + C(32, 35, 13.5, K.white) +
      D(32, 24.5, 1.4) + D(42.5, 35, 1.4) + D(32, 45.5, 1.4) + D(21.5, 35, 1.4) +
      L(32, 35, 32, 27.5, INK, 2.8) + L(32, 35, 38.5, 38, INK, 2.8) + D(32, 35, 2.2, K.red);
  }];

  I.hook = ["teal", function () {
    return S("M38 2 V6", INK, 2) +
      tube("M38 14 V37 A10 10 0 0 1 18 37 V31", K.grey, 3.5) +
      tube("M18 31 L24 37", K.grey, 3.5) + C(38, 10, 4, "none") +
      C(52, 26, 2.6, K.white) + C(48, 18, 1.8, K.white) + C(14, 18, 2.2, K.white) +
      S("M8 54 Q12 51 16 54 T24 54", K.white, 2.5) + S("M40 56 Q44 53 48 56 T56 56", K.white, 2.5);
  }];

  I.flag = ["green", function () {
    var sq = "";
    for (var r = 0; r < 3; r++) for (var c = 0; c < 4; c++) if ((r + c) % 2 === 0) sq += Rn(21 + c * 7.5, 11 + r * 7, 7.5, 7, 0, INK);
    return E(18, 56, 11, 3.5, K.grass) + tube("M18 56 V10", K.brown, 3) +
      R(21, 11, 30, 21, 1.5, K.white) + sq + R(21, 11, 30, 21, 1.5, "none") + C(18, 8, 3.2, K.yellow);
  }];

  I.paragraph = ["sky", function () {
    return R(13, 7, 38, 50, 4, K.white) +
      L(25, 16, 44, 16, K.blue, 3) + L(19, 22, 44, 22, K.blue, 3) + L(19, 28, 36, 28, K.blue, 3) +
      L(25, 37, 44, 37, K.teal, 3) + L(19, 43, 44, 43, K.teal, 3) + L(19, 49, 32, 49, K.teal, 3);
  }];

  I.pencil = ["yellow", function () {
    return G("rotate(-45 32 32)",
      R(18, 25, 28, 14, 0, K.yellow) + L(18, 32, 44, 32, K.orange, 2.5) +
      R(44, 25, 6, 14, 0, K.grey) + P("M50 25 H54 A5 5 0 0 1 59 30 V34 A5 5 0 0 1 54 39 H50 Z", K.pink) +
      P("M18 25 L5 32 L18 39 Z", K.wood) + P("M10 29.3 L5 32 L10 34.7 Z", INK));
  }];

  I.puzzle = ["purple", function () {
    return P("M31 16 H55 V47 H31 V38 A7 7 0 1 0 31 25 Z", K.teal) +
      P("M9 16 H31 V25 A7 7 0 1 1 31 38 V47 H9 Z", K.purple) +
      D(19, 30, 1.8, K.white) + D(43, 32, 1.8, K.white);
  }];

  I.speech = ["blue", function () {
    return P("M14 8 H36 Q42 8 42 14 V24 Q42 30 36 30 H22 L13 37 L15 30 H14 Q8 30 8 24 V14 Q8 8 14 8 Z", K.white) +
      L(15, 16, 34, 16, K.grey, 3) + L(15, 22, 28, 22, K.grey, 3) +
      P("M28 28 H50 Q56 28 56 34 V44 Q56 50 50 50 H49 L51 57 L42 50 H28 Q22 50 22 44 V34 Q22 28 28 28 Z", K.yellow) +
      D(32, 39, 2.2) + D(39, 39, 2.2) + D(46, 39, 2.2);
  }];

  I.bandage = ["pink", function () {
    var holes = D(14, 29, 1.2, K.lbrown) + D(14, 35, 1.2, K.lbrown) + D(19, 32, 1.2, K.lbrown) +
      D(50, 29, 1.2, K.lbrown) + D(50, 35, 1.2, K.lbrown) + D(45, 32, 1.2, K.lbrown);
    return G("rotate(-38 32 32)", R(5, 22, 54, 20, 10, K.tan) + R(23, 24, 18, 16, 3, "#F8E3CF") + holes) +
      spark(51, 12, 5, K.yellow) + spark(12, 51, 4, K.yellow);
  }];

  I.envelope = ["orange", function () {
    return R(7, 15, 50, 36, 5, K.white) +
      P("M9 48 L26 32") + P("M55 48 L38 32") +
      P("M9 17.5 L32 35 L55 17.5", K.white) + C(32, 35, 4.5, K.red);
  }];

  I.punctuation = ["purple", function () {
    return tube("M13 12 V33", K.red, 5) + C(13, 45, 3.6, K.red) +
      tube("M21 19 A7.5 7.5 0 1 1 33 25 C30 27 29 29 29 33", K.blue, 5) + C(29, 45, 3.6, K.blue) +
      P("M39.5 44 A3.8 3.8 0 0 1 47 44 Q47 51 41 55 Q43 50 42 47.6 A3.8 3.8 0 0 1 39.5 44 Z", K.green) +
      C(54, 45, 3.6, K.orange);
  }];

  I.hourglass = ["cream", function () {
    var glass = "M20 13 H44 C44 24 36 28 34.5 32 C36 36 44 40 44 51 H20 C20 40 28 36 29.5 32 C28 28 20 24 20 13 Z";
    return N(glass, "#EAF5FB") +
      N("M23.5 20 H40.5 C39 25 34.5 27 32 30.5 C29.5 27 25 25 23.5 20 Z", K.yellow) +
      N("M21.5 50 C23 43 29 40.5 32 40.5 C35 40.5 41 43 42.5 50 Z", K.yellow) +
      L(32, 31, 32, 41, K.orange, 2) + P(glass, "none") +
      R(15, 8, 34, 6, 3, K.brown) + R(15, 50, 34, 6, 3, K.brown);
  }];

  I.pace = ["green", function () {
    var rabbit = E(41, 24, 9, 6.5, K.white) + P("M47 16 L45 6 Q48 4 49 8 L50 15", K.white) + P("M50 16 L52 6 Q55 5 55 9 L53 16", K.white) +
      C(51, 20, 5.5, K.white) + D(52.5, 19, 1.3) + D(56, 22, 1, K.pink) + C(32, 22, 2.8, K.white) +
      P("M36 29 L32 33") + P("M45 30 L49 33");
    var snail = P("M7 54 Q7 49 12 49 H29 L32 42 Q35 39 37 42 L36 54 Z", "#C9E7B8") +
      L(33, 42, 31, 36) + L(36, 42, 38, 36) + D(31, 35.5, 1.6) + D(38, 35.5, 1.6) +
      C(19, 42, 9, K.orange) + S("M19 42 m-1 0 a2.5 2.5 0 1 1 3 2.5 a5 5 0 1 1 -6 -5", INK, 2);
    return L(8, 18, 20, 18, K.green, 3) + L(12, 25, 24, 25, K.green, 3) + L(6, 32, 16, 32, K.green, 3) + rabbit + snail;
  }];

  I.palette = ["orange", function () {
    return P("M32 9 C47 9 57 19 57 30 C57 39 50 42 45 40 C41 38 37 40 38 45 C39 52 34 55 27 54 C15 52 7 43 7 31 C7 18 18 9 32 9 Z", K.wood) +
      C(25, 44, 3.8, T.orange) +
      C(19, 27, 4.6, K.red) + C(29, 18, 4.6, K.yellow) + C(41, 18, 4.6, K.blue) + C(48, 28, 4.3, K.green) + C(17, 37.5, 3.6, K.purple);
  }];

  I.heart = ["pink", function () {
    return P("M32 53 C14 41 8 31 8 22 C8 14 14 9 21 9 C26 9 30 12 32 16 C34 12 38 9 43 9 C50 9 56 14 56 22 C56 31 50 41 32 53 Z", K.red) +
      S("M15 22 Q15 16 21 15", K.white, 3.2) + spark(52, 47, 4.5, K.yellow);
  }];

  I.eye = ["teal", function () {
    var lid = "M6 33 C14 21 24 16 32 16 C40 16 50 21 58 33 C50 45 40 50 32 50 C24 50 14 45 6 33 Z";
    return L(20, 19.5, 17, 13) + L(32, 16, 32, 9) + L(44, 19.5, 47, 13) +
      P(lid, K.white) + C(32, 33, 11, K.teal) + D(32, 33, 5) + D(35.5, 29.5, 2.3, K.white) + P(lid, "none");
  }];

  I.person = ["blue", function () {
    return P("M11 57 C11 45 19 39 32 39 C45 39 53 45 53 57 Z", K.blue) +
      P("M27 39 L32 45 L37 39", K.white) +
      C(32, 24, 12.5, K.skin) +
      P("M19.5 25 C18 15 25 10.5 32 10.5 C40 10.5 46 15 44.5 24 C40 22 34 20 30 16 C27 20 23 23 19.5 25 Z", K.brown) +
      D(27.5, 27, 1.7) + D(36.5, 27, 1.7) + S("M28.5 31.5 Q32 34.5 35.5 31.5", INK, 2) +
      D(24.5, 31, 2, "#F4B4B4") + D(39.5, 31, 2, "#F4B4B4");
  }];

  I.weather = ["sky", function () {
    var rays = "";
    for (var i = 0; i < 8; i++) {
      var a = i * Math.PI / 4, x1 = 22 + 12.5 * Math.cos(a), y1 = 21 + 12.5 * Math.sin(a), x2 = 22 + 16 * Math.cos(a), y2 = 21 + 16 * Math.sin(a);
      rays += L(x1.toFixed(1), y1.toFixed(1), x2.toFixed(1), y2.toFixed(1));
    }
    return rays + C(22, 21, 9, K.yellow) +
      P("M17 44 C11 44 9 37 14 34.5 C14 28 21 26 25 29.5 C27 23 37 21 40.5 27.5 C47 25.5 53 31 50.5 37 C55 38 55 44 49 44 Z", K.white) +
      tube("M21 49.5 L19 54.5", K.blue, 2.2) + tube("M31 49.5 L29 54.5", K.blue, 2.2) + tube("M41 49.5 L39 54.5", K.blue, 2.2);
  }];

  I.swap = ["orange", function () {
    return P("M10 18 H38 V10 L53 21 L38 32 V24 H10 Q8 24 8 21 Q8 18 10 18 Z", K.orange) +
      P("M54 40 H26 V32 L11 43 L26 54 V46 H54 Q56 46 56 43 Q56 40 54 40 Z", K.blue);
  }];

  I.quote = ["purple", function () {
    function q(x, y, c) { return tube("M" + (x - 5.5) + " " + (y + 1) + " C" + (x - 7) + " " + (y - 9) + " " + (x - 2) + " " + (y - 13) + " " + (x + 4) + " " + (y - 14.5), c, 3.5) + C(x, y, 6.2, c); }
    var open = q(17, 28, K.purple) + q(32, 28, K.purple);
    var close = G("rotate(180 32 32)", q(15, 27, K.teal) + q(30, 27, K.teal));
    return open + close;
  }];

  I.run = ["orange", function () {
    return L(6, 22, 15, 22, K.orange, 3) + L(4, 30, 13, 30, K.orange, 3) + L(8, 38, 15, 38, K.orange, 3) +
      tube("M33 24 L24 28 L19 23", K.tan, 3.5) +
      tube("M29 38 L22 45 L14 44", K.navy, 4.5) +
      tube("M35 23 L29 38", K.red, 8) +
      tube("M29 38 L39 43 L37 54", K.navy, 4.5) + P("M36 54 H43 Q45 54 45 56 H35 Z", K.white) + P("M10 41 L13 47 L15 46 L14 41", K.white) +
      tube("M35 25 L43 30 L50 25", K.tan, 3.5) +
      C(40, 14, 7, K.tan) + P("M33.5 13 C33 7 39 5 43 6.5 C46 8 47 11 46.5 13 C43 12 40 11 38 9 C37 11 35 12.5 33.5 13 Z", INK) + D(43.5, 15, 1.4);
  }];

  I.star = ["yellow", function () {
    return star(32, 34, 24, 11, K.yellow) + D(28, 33, 1.8) + D(36, 33, 1.8) + S("M28.5 38 Q32 41 35.5 38", INK, 2) +
      spark(54, 10, 4.5, K.orange) + spark(9, 12, 3.5, K.orange);
  }];

  I.tag = ["green", function () {
    return S("M44 22 C52 16 56 10 50 7 C45 5 44 12 47 15", INK, 2.2) +
      G("rotate(-35 32 32)", P("M12 22 H40 L53 32 L40 42 H12 Q8 42 8 38 V26 Q8 22 12 22 Z", K.green) +
        C(42, 32, 3, T.green) + L(14, 29, 32, 29, K.white, 3) + L(14, 35, 27, 35, K.white, 3));
  }];

  I.cards = ["blue", function () {
    return G("rotate(-14 26 32)", R(9, 10, 30, 40, 5, K.blue) + star(24, 30, 8, 3.8, K.yellow)) +
      G("rotate(10 38 34)", R(24, 14, 30, 40, 5, K.white) + C(39, 28, 6, K.pink) + L(31, 41, 47, 41, K.grey, 3) + L(31, 47, 42, 47, K.grey, 3));
  }];

  I.mask = ["purple", function () {
    var m = "M0 0 Q12 -3 24 0 V11 C24 23 18 29 12 29 C6 29 0 23 0 11 Z";
    var sad = G("translate(32 15) rotate(12)", P(m, K.blue) + S("M5 9 Q8 7 11 9", INK, 2.5) + S("M14 10 Q17 8 20 10", INK, 2.5) + P("M7 21 Q12 16 17 21", "none"));
    var happy = G("translate(8 11) rotate(-12)", P(m, K.yellow) + S("M5 10 Q8 7 11 10", INK, 2.5) + S("M14 10 Q17 7 20 10", INK, 2.5) + P("M6 16 Q12 25 18 16 Z", K.red));
    return sad + happy;
  }];

  I.comet = ["purple", function () {
    return P("M43 13 C30 18 18 30 8 48 C18 42 23 42 27 44 C26 40 30 36 46 32 Z", K.orange) +
      S("M38 20 C30 26 24 32 17 41", K.yellow, 3) +
      C(44, 22, 10, K.yellow) + S("M39 19 A6 6 0 0 1 43 16", K.white, 2.8) +
      spark(14, 14, 4.5, K.pink) + spark(52, 47, 4, K.pink) + D(24, 10, 1.6, K.purple) + D(54, 36, 1.6, K.purple);
  }];

  I.rewind = ["purple", function () {
    return C(32, 32, 23, K.purple) + P("M30 21 L15 32 L30 43 Z", K.white) + P("M47 21 L32 32 L47 43 Z", K.white);
  }];

  I.moon = ["blue", function () {
    return crescent(30, 33, 21, 42, 25, 16, K.yellow) +
      S("M17 33 Q20 36 23 33", INK, 2.2) + S("M19 42 Q23 45 27 42", INK, 2.2) + D(15, 38, 2.2, "#F4B4B4") +
      sparkO(46, 46, 6, K.white) + spark(52, 14, 4.5, K.yellow) + D(40, 10, 1.6, K.yellow);
  }];

  I.magnifier = ["green", function () {
    return tube("M40 40 L53 53", K.brown, 6) +
      C(27, 27, 18, K.grey) + C(27, 27, 13.5, "#EAF5FB") +
      P("M19 34 C19 24 26 19 35 19 C35 29 29 35 19 34 Z", K.green) + L(20.5, 33, 31, 23, INK, 2) +
      S("M18 23 A10 10 0 0 1 22 17.5", K.white, 3);
  }];

  I.blocks = ["orange", function () {
    return R(9, 34, 21, 21, 3, K.red) + R(34, 34, 21, 21, 3, K.blue) + R(21.5, 10, 21, 21, 3, K.yellow) +
      C(19.5, 44.5, 5, K.white) + P("M44.5 39 L50 49.5 H39 Z", K.white) + star(32, 21, 7, 3.2, K.white);
  }];

  I.ladder = ["sky", function () {
    return R(19, 15, 26, 5, 2, K.wood) + R(19, 26, 26, 5, 2, K.wood) + R(19, 37, 26, 5, 2, K.wood) + R(19, 48, 26, 5, 2, K.wood) +
      R(14, 7, 7, 52, 3.5, K.brown) + R(43, 7, 7, 52, 3.5, K.brown) + spark(55, 11, 4.5, K.yellow);
  }];

  I.quiz = ["green", function () {
    function row(y, mark) {
      return R(17, y - 4.5, 9, 9, 2, K.white) + L(31, y, 46, y, K.grey, 3) + mark;
    }
    return R(11, 7, 42, 50, 4, K.white) +
      row(17, S("M18 16 L21.5 20 L28 11", K.green, 3.2)) +
      row(31, S("M18 30 L21.5 34 L28 25", K.green, 3.2)) +
      row(45, "");
  }];

  I.list = ["yellow", function () {
    function row(y, c) { return D(22, y, 2.8, c) + L(28, y, 44, y, K.grey, 3); }
    return R(11, 10, 42, 48, 5, K.brown) + R(15, 15, 34, 39, 2, K.white) + R(23, 6, 18, 9, 3, K.grey) +
      row(25, K.red) + row(34, K.blue) + row(43, K.green);
  }];

  I.desk = ["cream", function () {
    return tube("M15 30 L19 18 L28 14", K.teal, 2) + R(9, 29, 13, 4, 2, K.teal) + P("M25 9 L37 13 L31 22 Z", K.teal) +
      L(43, 22, 45, 13, K.red, 3) + L(47, 22, 49, 14, K.blue, 3) +
      R(41, 20, 11, 12, 2, K.orange) + P("M25 32 L28 28 H39 L37 32 Z", K.white) +
      R(5, 32, 54, 6, 2, K.brown) + R(9, 38, 5, 18, 1.5, K.brown) + R(50, 38, 5, 18, 1.5, K.brown) + R(36, 38, 14, 9, 1.5, K.lbrown) + D(43, 42.5, 1.5);
  }];

  I.map = ["green", function () {
    return P("M7 15 L23 9 V49 L7 55 Z", K.cream) + P("M23 9 L41 15 V55 L23 49 Z", "#EBDDBF") + P("M41 15 L57 9 V49 L41 55 Z", K.cream) +
      N("M9 40 C13 36 18 39 21 35 V47 L9 51 Z", K.grass) + N("M43 40 C47 42 51 38 55 40 V47.5 L43 52 Z", K.grass) +
      S("M13 46 C19 38 26 42 30 32 C33 25 40 30 45 24", K.red, 2.5, ' stroke-dasharray="3.5 4"') +
      P("M47 22 C42 16 42 9 47 8 C52 9 52 16 47 22 Z", K.red) + D(47, 12.5, 2, K.white);
  }];

  I.sun = ["yellow", function () {
    var rays = "";
    for (var i = 0; i < 8; i++) {
      var a = i * Math.PI / 4 + Math.PI / 8, x1 = 32 + 18 * Math.cos(a), y1 = 32 + 18 * Math.sin(a), x2 = 32 + 24 * Math.cos(a), y2 = 32 + 24 * Math.sin(a);
      rays += tube("M" + x1.toFixed(1) + " " + y1.toFixed(1) + " L" + x2.toFixed(1) + " " + y2.toFixed(1), K.orange, 2.5);
    }
    return rays + C(32, 32, 14, K.yellow) +
      S("M24.5 30 Q27 27 29.5 30", INK, 2.2) + S("M34.5 30 Q37 27 39.5 30", INK, 2.2) +
      S("M27 35.5 Q32 40 37 35.5", INK, 2.2) + D(23.5, 35, 2.2, K.pink) + D(40.5, 35, 2.2, K.pink);
  }];

  I.pen = ["blue", function () {
    return S("M7 56 C12 50 16 56 21 51", K.navy, 2.5) +
      G("rotate(-45 32 32)",
        R(23, 25, 28, 14, 6, K.navy) + R(46, 25, 9, 14, 4, K.navy) + R(42, 25, 4, 14, 0, K.yellow) +
        P("M23 26.5 L8 32 L23 37.5 Z", K.yellow) + L(9.5, 32, 17, 32, INK, 1.8) + D(18, 32, 1.6)) +
      spark(14, 14, 5.5, K.yellow) + spark(52, 52, 4, K.yellow) + spark(24, 8, 3, K.orange);
  }];

  I.trophy = ["yellow", function () {
    return P("M20 15 H13 Q10 15 11 20 C12 26 16 29 21 29") + P("M44 15 H51 Q54 15 53 20 C52 26 48 29 43 29") +
      P("M19 9 H45 V21 C45 32 39 38 32 38 C25 38 19 32 19 21 Z", K.yellow) +
      star(32, 22, 7, 3.2, K.white) + R(28, 38, 8, 7, 1, K.yellow) +
      R(20, 45, 24, 10, 2.5, K.brown) + Rn(25, 48.5, 14, 3, 1.5, K.wood);
  }];

  I.abc = ["green", function () {
    var tf = ' font-family="Arial Rounded MT Bold,Nunito,Verdana,Arial,sans-serif" font-weight="800" font-size="15" text-anchor="middle" fill="#FFFFFF"';
    function blk(x, y, c, ch) {
      return R(x, y, 17, 17, 3.5, c) + '<text x="' + (x + 8.5) + '" y="' + (y + 13) + '"' + tf + ">" + ch + "</text>";
    }
    return blk(6, 33, K.red, "a") + blk(23.5, 17, K.blue, "b") + blk(41, 33, K.green, "c") + R(4, 50, 56, 5, 2.5, K.wood);
  }];

  I.proofread = ["red", function () {
    return R(11, 7, 42, 50, 4, K.white) +
      L(17, 17, 46, 17, K.grey, 3) + L(17, 26, 30, 26, K.grey, 3) + L(36, 26, 46, 26, K.grey, 3) +
      L(17, 35, 46, 35, K.grey, 3) + L(17, 44, 38, 44, K.grey, 3) +
      '<ellipse cx="38" cy="17" rx="10" ry="5.5" fill="none" stroke="' + K.red + '" stroke-width="2.5"/>' +
      S("M30 31 L33 25 L36 31", K.red, 2.5) +
      S("M17 39 Q19.5 37 22 39 T27 39 T32 39", K.red, 2.5) +
      S("M41 48 L44 51 L50 43", K.red, 3);
  }];

  I.bank = ["yellow", function () {
    return P("M12 30 L15 8 H49 L52 30 Z", K.lbrown) + Rn(29, 8, 6, 22, 0, K.yellow) + P("M29 8 V30 M35 8 V30") +
      P("M11 33 C12 25 19 22 24 26 C28 19 37 19 40 25 C45 21 52 25 53 33 Z", K.yellow) +
      C(24, 27, 3.5, K.yellow) + C(40, 26, 3.5, K.yellow) +
      R(8, 32, 48, 22, 3, K.brown) + R(16, 32, 6, 22, 0, K.yellow) + R(42, 32, 6, 22, 0, K.yellow) +
      R(27, 36, 10, 10, 2, K.yellow) + D(32, 40.5, 1.6) +
      spark(9, 14, 4.5, K.orange) + spark(56, 18, 3.5, K.orange) + spark(32, 6, 3, K.white);
  }];

  I.book = ["blue", function () {
    return P("M5 18 V52 C16 50 26 51 32 55 C38 51 48 50 59 52 V18 Z", K.blue) +
      P("M32 18 C26 13 17 12 9 14 V48 C17 46 26 47 32 52 Z", K.white) +
      P("M32 18 C38 13 47 12 55 14 V48 C47 46 38 47 32 52 Z", K.white) +
      L(14, 22, 27, 23, K.grey, 2.6) + L(14, 29, 27, 30, K.grey, 2.6) + L(14, 36, 27, 37, K.grey, 2.6) +
      L(37, 23, 50, 22, K.grey, 2.6) + L(37, 30, 50, 29, K.grey, 2.6) + L(37, 37, 46, 36.5, K.grey, 2.6) +
      P("M46 12.5 V24 L49 21 L52 24 V12.8", K.red) + P("M32 18 V52");
  }];

  I.books = ["orange", function () {
    return R(8, 18, 10, 36, 2, K.red) + L(10.5, 24, 15.5, 24, K.white, 2.5) + L(10.5, 47, 15.5, 47, K.white, 2.5) +
      R(18, 12, 11, 42, 2, K.blue) + L(21, 19, 26, 19, K.yellow, 2.5) + L(21, 46, 26, 46, K.yellow, 2.5) +
      R(29, 20, 9, 34, 2, K.green) + L(31.5, 30, 35.5, 30, K.white, 2.5) +
      G("rotate(16 42 54)", R(39, 17, 10, 37, 2, K.yellow) + L(41.5, 24, 46.5, 24, K.orange, 2.5) + L(41.5, 47, 46.5, 47, K.orange, 2.5)) +
      R(4, 54, 56, 5, 2, K.brown);
  }];

  I.upgrade = ["green", function () {
    return P("M32 7 L51 28 H41 V55 H23 V28 H13 Z", K.green) + L(32, 19, 32, 44, K.white, 3) +
      sparkO(13, 14, 6, K.yellow) + sparkO(52, 44, 5.5, K.yellow) + spark(53, 12, 3.5, K.orange);
  }];

  I.seedling = ["green", function () {
    return P("M32 37 C32 30 31 26 32 20", "none") +
      P("M31.5 29 C23 30 16 24 15 16 C23 15 31 19 31.5 29 Z", K.grass) +
      P("M32.5 24 C33 15 41 9 50 10 C51 19 43 25 32.5 24 Z", K.green) +
      L(19, 19, 28, 26, INK, 1.8) + L(46, 13.5, 36, 21.5, INK, 1.8) +
      P("M17 42 H47 L43 57 H21 Z", K.orange) + R(14, 35, 36, 8, 3, K.stripe);
  }];

  I.chat = ["teal", function () {
    return R(17, 5, 30, 54, 7, K.navy) + R(21, 12, 22, 38, 2, K.white) +
      Rn(23, 15, 13, 7, 3.5, K.sky) + Rn(28, 25, 13, 7, 3.5, K.grass) + Rn(23, 35, 10, 7, 3.5, K.sky) +
      D(28, 38.5, 1, K.blue) + D(31, 38.5, 1, K.blue) + D(25.5, 38.5, 1, K.blue) +
      D(32, 54.5, 2, K.white) +
      spark(53, 16, 4.5, K.yellow) + spark(11, 46, 4, K.yellow);
  }];

  I.brush = ["red", function () {
    return P("M8 53 C18 44 30 55 47 46 C42 53 27 60 8 53 Z", INK) +
      G("rotate(-48 32 32)",
        R(28, 28, 30, 8, 4, K.wood) + L(37, 28.5, 37, 35.5, K.lbrown, 2) + L(47, 28.5, 47, 35.5, K.lbrown, 2) +
        R(24, 27.5, 6, 9, 1.5, K.red) +
        P("M24 28 C17 28 10 30 4 32 C10 34 17 36 24 36 Z", INK) + P("M58 32 h4", "none")) +
      C(52, 10, 3, "none");
  }];

  I.scale = ["teal", function () {
    return R(30, 15, 4, 36, 1.5, K.brown) + P("M19 55 H45 L41 49 H23 Z", K.brown) +
      L(14, 16, 7, 37, INK, 2) + L(14, 16, 21, 37, INK, 2) + L(50, 16, 43, 37, INK, 2) + L(50, 16, 57, 37, INK, 2) +
      tube("M12 16 H52", K.yellow, 3) + C(32, 15, 3.8, K.yellow) +
      C(14, 32.5, 4, K.red) + R(46, 29, 8, 8, 1.5, K.blue) +
      P("M5 37 H23 C23 43 19 45 14 45 C9 45 5 43 5 37 Z", K.yellow) +
      P("M41 37 H59 C59 43 55 45 50 45 C45 45 41 43 41 37 Z", K.yellow);
  }];

  I.ruler = ["yellow", function () {
    var t = "";
    for (var i = 0; i < 9; i++) { var x = 12 + i * 5; t += L(x, 24, x, i % 2 ? 29 : 32, INK, 2); }
    return G("rotate(-35 32 32)", R(5, 23, 54, 18, 3, K.yellow) + t);
  }];

  I.ear = ["pink", function () {
    return G("translate(-5 0)",
      P("M27 54 C21 54 19 48 21 44 C23 40 17 35 17 25 C17 14 25 8 34 8 C43 8 49 15 49 25 C49 33 43 37 41 43 C39 51 34 54 27 54 Z", K.tan) +
      P("M27 25 C27 18 36 16 39.5 22 C42 28 35 31 34 35 C33 40 29 40 29 37", "none")) +
      S("M49 19 Q54 26 49 33", K.blue, 2.8) + S("M54 14 Q61 26 54 38", K.blue, 2.8);
  }];

  I.nose = ["purple", function () {
    var outline = "M28 9 C28 21 16 30 16 39 C16 45 21 48 25 46 C27 49 33 49 35 46 C39 48 44 45 44 39 C44 30 36 21 36 9";
    return N(outline + " Z", K.tan) + P(outline) +
      E(25.5, 41, 2.6, 2, INK) + E(34.5, 41, 2.6, 2, INK) +
      S("M51 56 C47 52 55 49 51 45 C47 41 55 38 51 34", K.purple, 2.5) +
      S("M58 50 C55 47 61 44 58 41", K.purple, 2.5) +
      C(51, 56, 0.1, "none");
  }];


  var ICONS = Object.keys(I);
  var warned = {};

  function icon(name, opts) {
    opts = opts || {};
    var def = I[name];
    if (!def) {
      if (!warned[name] && typeof console !== "undefined") { warned[name] = 1; console.warn("ART.icon: unknown icon '" + name + "'"); }
      def = I.pencil;
    }
    var tint = T[def[0]] || T.cream;
    var sz = opts.size ? ' width="' + opts.size + '" height="' + opts.size + '"' : "";
    var a11y = opts.label ? ' role="img" aria-label="' + String(opts.label).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }) + '"' : ' aria-hidden="true"';
    var tile = opts.tile === false ? "" : '<rect x="2" y="2" width="60" height="60" rx="15" fill="' + tint + '"/>';
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"' + sz + a11y + ' focusable="false">' + tile + def[1]() + "</svg>";
  }

  window.ART = Object.assign(window.ART || {}, { icon: icon, ICONS: ICONS });
})();
