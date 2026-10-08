/* =====================================================================
   art.js — Write It Well illustration kit (original vector art, no external files)
   ---------------------------------------------------------------------
   API:  ART.scene(spec, {label}) -> '<svg viewBox="0 0 400 300">'   ART.face(key, {skin}) -> '<svg viewBox="0 0 120 120">'
         ART.BG / WHO / POSE / FACE / PROP / FX  (name lists, = art-vocab.json)
   CONVENTIONS FOR SCENE AUTHORS
   - Scene is 400 x 300. Ground baseline y = 250 everywhere (indoors the wall meets the floor at ~y 205,
     so actors standing at 250 are "in the room"). Keep actors x within ~40..360 and >= 70 apart.
   - Sizes at s = 1: child ~125 px tall, adult ~170, grandparent ~160 (stooped), toddler ~82.
     Props are drawn at natural size next to a child at s = 1 (wallet 18 px, bicycle 112 px, tree ~200 px,
     bus 230 px, door 170 px).  Use prop "s" only for perspective tweaks.
   - Actor x = body centre; default faces right; flip:true faces left (prop held moves with it).
   - Default face is "happy". Defaults per who: boy short hair/blue top/navy shorts; girl ponytail/pink/purple skirt;
     man short/teal/navy trousers; woman long/orange/navy skirt; grandpa grey hair, glasses, stoop (walking stick
     when standing/walking with free hands); grandma grey bun, glasses; teacher bob/teal + lanyard + glasses
     (hair short/spiky/bald = male teacher); toddler yellow romper. Grandparents' hair is always grey/white.
     uniform:true = white school shirt with badge + navy shorts (boy) / navy pinafore (girl).
   - hold: small things (wallet, phone, cup, letter, medal...) sit in the front hand; for pose stand/sit the arm is
     raised to show it. Two-handed things (box, cake, tray, plate, bowl, gift, books-pile, vase, ball, trophy, fishtank,
     flowerpot, plant, laptop, drum, clock, cat/kitten/puppy) are held in front of the chest with both hands
     (overhead with pose reach/jump/wave; held out with pose give; dropped on the floor with pose fall).
     Hanging things (shoppingbag, basket, bucket, firstaid) hang from the front hand. schoolbag is worn on the back.
     umbrella is held open above the head. dog = on a lead walking ahead. broom/mop = sweeping. kite = flying up-front.
     bicycle: pose sit = riding, otherwise pushing it.  scooter: riding (pose walk = pushing).
     With pose point/wave/think/cry/clap/shout a one-handed prop moves to the back hand.
     Furniture, vehicles and scenery (tree, bench, bus, car, desk, chair, table, bed, lamp, window, door, stairs, lift, bin,
     signboard, fence, whiteboard, shelf, puddle, spill, sandcastle) cannot be held: use them in props[] instead.
   - pose sit: sits on a chair/bench/bed prop within ~45 px (actor snaps onto it); otherwise the background provides a
     seat automatically (hawker stool, MRT seat, bus-stop bench, park bench, classroom chair, sofa, stone stool...)
     or the actor sits on the ground (playground, beach, field, street, corridor). desk/table props are drawn in front
     of a seated actor next to them (so "sitting at the table" reads), otherwise behind.
   - pose sleep lies down; next to a bed prop the actor lies on the bed under its blanket.
   - Props: y = bottom of the prop. Defaults: window y 175, clock y 95, kite y 120, everything else on the ground.
     Big furniture/vehicles/puddles are drawn behind actors; small objects in front (so a wallet at a foot is visible).
   - fx: x,y = anchor. thought: bubble up-right of x,y (up-left when x > 250) with optional prop drawn inside;
     put x,y just above the thinker's head. tears/sweat at the face; rain covers the whole scene.
     motion/speed lines trail to the LEFT of x (use flip:true for a left-moving actor).
   - time night darkens the background (lit windows, moon); evening is warm; weather only shows outdoors
     (void deck / bus stop / corridor show it in their open parts).  Unknown names are skipped with one console.warn.
   ===================================================================== */
(function(){
'use strict';
var INK='#2B2D42',SW=2.5,CNT=0,WARNED={};
function warn(m){if(!WARNED[m]){WARNED[m]=1;try{console.warn('ART: '+m);}catch(e){}}}
function n(v){return Math.round(v*10)/10;}
function h2(c){c=c.replace('#','');if(c.length===3)c=c[0]+c[0]+c[1]+c[1]+c[2]+c[2];return [parseInt(c.substr(0,2),16),parseInt(c.substr(2,2),16),parseInt(c.substr(4,2),16)];}
function mix(a,b,t){var x=h2(a),y=h2(b),s='#';for(var i=0;i<3;i++){var v=Math.round(x[i]+(y[i]-x[i])*t);s+=(v<16?'0':'')+v.toString(16);}return s;}
function st(sw){return sw===0?'':' stroke="'+INK+'" stroke-width="'+n(sw==null?SW:sw)+'"';}
function P(d,f,sw,ex){return '<path d="'+d+'" fill="'+(f||'none')+'"'+st(sw)+(ex||'')+'/>';}
function R(x,y,w,h,rx,f,sw,ex){return '<rect x="'+n(x)+'" y="'+n(y)+'" width="'+n(w)+'" height="'+n(h)+'"'+(rx?' rx="'+rx+'"':'')+' fill="'+(f||'none')+'"'+st(sw)+(ex||'')+'/>';}
function C(x,y,r,f,sw,ex){return '<circle cx="'+n(x)+'" cy="'+n(y)+'" r="'+n(r)+'" fill="'+(f||'none')+'"'+st(sw)+(ex||'')+'/>';}
function E(x,y,rx,ry,f,sw,ex){return '<ellipse cx="'+n(x)+'" cy="'+n(y)+'" rx="'+n(rx)+'" ry="'+n(ry)+'" fill="'+(f||'none')+'"'+st(sw)+(ex||'')+'/>';}
function L(d,c,w,ex){return '<path d="'+d+'" fill="none" stroke="'+(c||INK)+'" stroke-width="'+n(w==null?SW:w)+'"'+(ex||'')+'/>';}
function G(inner,tr,ex){return '<g'+(tr?' transform="'+tr+'"':'')+(ex||'')+'>'+inner+'</g>';}
function O(o){return ' opacity="'+o+'"';}
function pl(pts,close){var s='';for(var i=0;i<pts.length;i++)s+=(i?'L':'M')+n(pts[i][0])+' '+n(pts[i][1]);return s+(close?'Z':'');}
function T(x,y,s,r,fl){return 'translate('+n(x)+' '+n(y)+')'+(r?' rotate('+n(r)+')':'')+((s&&s!==1)||fl?' scale('+n((fl?-1:1)*(s||1)*100)/100+' '+n((s||1)*100)/100+')':'');}
/* union of circles with one clean outline */
function blob(cs,f,sw,ex){var a='',b='';for(var i=0;i<cs.length;i++){var c=cs[i];if(sw!==0)a+=C(c[0],c[1],c[2]+(sw==null?SW:sw)/2,INK,0);b+=C(c[0],c[1],c[2],f,0);}return '<g'+(ex||'')+'>'+a+b+'</g>';}
function star4(x,y,r,f,sw){var q=r*0.32;return P('M'+n(x)+' '+n(y-r)+'Q'+n(x+q)+' '+n(y-q)+' '+n(x+r)+' '+n(y)+'Q'+n(x+q)+' '+n(y+q)+' '+n(x)+' '+n(y+r)+'Q'+n(x-q)+' '+n(y+q)+' '+n(x-r)+' '+n(y)+'Q'+n(x-q)+' '+n(y-q)+' '+n(x)+' '+n(y-r)+'Z',f,sw==null?0:sw);}
function star5(x,y,r,f,sw){var p=[];for(var i=0;i<10;i++){var a=Math.PI/5*i-Math.PI/2,rr=i%2?r*0.45:r;p.push([x+Math.cos(a)*rr,y+Math.sin(a)*rr]);}return P(pl(p,1),f,sw==null?SW*0.7:sw);}
function heart(x,y,r,f,sw){return P('M'+n(x)+' '+n(y+r*0.9)+'C'+n(x-r*1.5)+' '+n(y-r*0.1)+' '+n(x-r*0.9)+' '+n(y-r*1.25)+' '+n(x)+' '+n(y-r*0.45)+'C'+n(x+r*0.9)+' '+n(y-r*1.25)+' '+n(x+r*1.5)+' '+n(y-r*0.1)+' '+n(x)+' '+n(y+r*0.9)+'Z',f,sw==null?SW*0.8:sw);}
function drop(x,y,r,f,sw){return P('M'+n(x)+' '+n(y-r*1.6)+'Q'+n(x+r*1.1)+' '+n(y-r*0.2)+' '+n(x+r)+' '+n(y+r*0.3)+'A'+n(r)+' '+n(r)+' 0 0 1 '+n(x-r)+' '+n(y+r*0.3)+'Q'+n(x-r*1.1)+' '+n(y-r*0.2)+' '+n(x)+' '+n(y-r*1.6)+'Z',f||'#7EC8F2',sw==null?SW*0.6:sw);}
function rng(seed){seed=(seed%2147483646)+1;return function(){seed=(seed*16807)%2147483647;return (seed-1)/2147483646;};}
function hash(s){var h=7;s=String(s);for(var i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))%1000003;return h;}

var COL={red:'#E5534B',orange:'#F2994A',yellow:'#F6C343',green:'#4CAF7A',teal:'#2BA6A0',blue:'#3E7CD6',navy:'#24407A',purple:'#8A6BD1',pink:'#F28DB2',white:'#FFFFFF',grey:'#9AA3B5',brown:'#8B5E3C',black:'#3E4157'};
var SKIN={light:'#F7D9C4',tan:'#E8B994',brown:'#C68B5E',dark:'#8D5A3B'};
var HAIRC='#3B2A24',GREYH='#DCDFE6',MOUTH='#7A2C3B',TONGUE='#F28DB2',TEAR='#7EC8F2',BLUSH='#F28DB2';

/* ---------------------------------------------------------------
   FACES — drawn in a 100-unit space (head radius 100), w = line width
   --------------------------------------------------------------- */
var EXPR={
 neutral:{e:'dot',b:'soft',m:'flat'},
 happy:{e:'dot',b:'soft',m:'smile',x:['blush']},
 laughing:{e:'happy',b:'up',m:'laugh',x:['blush'],tilt:-6},
 sad:{e:'dot',b:'worried',m:'frown',x:['tear']},
 crying:{e:'cry',b:'worried',m:'wail',x:['tears']},
 scared:{e:'tiny',b:'worried',m:'wobble',x:['sweat','pale']},
 angry:{e:'angry',b:'angry',m:'teethFrown',x:['red','anger']},
 surprised:{e:'big',b:'up',m:'O'},
 worried:{e:'dot',b:'worried',m:'wavy',x:['sweat']},
 proud:{e:'happy',b:'up',m:'smug',x:['blush','shine'],dy:-5,tilt:-8},
 shy:{e:'downside',b:'softUp',m:'small',x:['blush2']},
 thinking:{e:'lookup',b:'oneup',m:'side'},
 guilty:{e:'downside',b:'worried',m:'wavySmall',x:['sweat','sweat2'],dy:3},
 relieved:{e:'closed',b:'softUp',m:'openSmall',x:['puff','sweat']},
 determined:{e:'dot',b:'firm',m:'set',x:['gleam']},
 sleepy:{e:'half',b:'flat',m:'o',x:[]},
 hurt:{e:'wince',b:'worried',m:'grimace',x:['sweat']},
 asleep:{e:'closed',b:'flat',m:'smallO',x:['blush']},
 shout:{e:'dot',b:'up',m:'shoutO',x:[]},
 excited:{e:'star',b:'up',m:'bigGrin',x:['blush','sparkles']},
 grateful:{e:'happy',b:'softUp',m:'gentle',x:['blush','heart']},
 shocked:{e:'tiny',b:'high',m:'bigO',x:['pale','shock']},
 confused:{e:'odd',b:'oneup',m:'squiggle',x:['swirl']},
 curious:{e:'lookside',b:'oneupR',m:'oSide',tilt:9},
 hopeful:{e:'lookup2',b:'softUp',m:'small',x:['twinkle','blush']},
 calm:{e:'closed',b:'flat',m:'gentle'},
 nervous:{e:'dotSmall',b:'worried',m:'zigzag',x:['sweat','sweat2','shake']},
 lonely:{e:'down',b:'softSad',m:'smallFrown',dy:6,x:['gloomTint']},
 disappointed:{e:'flatLid',b:'flatSad',m:'flatFrown',x:['gloom','puff']},
 frustrated:{e:'angry',b:'angry',m:'teeth',x:['scribble','red2']},
 regretful:{e:'closedSad',b:'worried',m:'smallFrown',x:['tear']},
 embarrassed:{e:'squeeze',b:'worried',m:'wavyGrin',x:['blush3','sweat']},
 jealous:{e:'sideEye',b:'flatAngry',m:'pout',x:['green']},
 moved:{e:'teary',b:'softUp',m:'wobbleSmile',x:['blush','tear']},
 anxious:{e:'dart',b:'worried',m:'bite',x:['sweat','shake']},
 wronged:{e:'teary',b:'worried',m:'wobbleFrown',x:['blush','tear']}
};
function eye1(t,x,y,i,w,skin){
 var inn=x-i*12,out=x+i*12,s='';
 switch(t){
 case 'dot':return E(x,y,10,12.5,INK,0)+C(x+3.5,y-4.5,3.8,'#fff',0);
 case 'dotSmall':return E(x,y+2,7.5,9,INK,0)+C(x+2.5,y-1,2.6,'#fff',0);
 case 'big':return E(x,y,15,17,'#fff',w*0.75)+C(x+2,y+1,8.5,INK,0)+C(x+5,y-3,3,'#fff',0);
 case 'tiny':return E(x,y,16,18.5,'#fff',w*0.75)+C(x,y+1,4,INK,0);
 case 'happy':return L('M'+(x-12)+' '+(y+5)+'Q'+x+' '+(y-12)+' '+(x+12)+' '+(y+5),INK,w);
 case 'closed':return L('M'+(x-12)+' '+y+'Q'+x+' '+(y+10)+' '+(x+12)+' '+y,INK,w);
 case 'closedSad':return L('M'+inn+' '+(y-3)+'Q'+x+' '+(y+9)+' '+out+' '+(y+5),INK,w);
 case 'cry':return L('M'+out+' '+(y+4)+'Q'+x+' '+(y-9)+' '+inn+' '+(y+1),INK,w*1.1);
 case 'angry':return E(x,y+1,10,12,INK,0)+C(x+3,y-1,3,'#fff',0)+P(pl([[inn,y-4],[out,y-11],[out,y-24],[inn,y-24]],1),skin,0)+L('M'+inn+' '+(y-4)+'L'+out+' '+(y-11),INK,w);
 case 'half':return E(x,y+1,10,11,INK,0)+P(pl([[x-14,y-1],[x+14,y-1],[x+14,y-16],[x-14,y-16]],1),skin,0)+L('M'+(x-12)+' '+(y-1)+'L'+(x+12)+' '+(y-1),INK,w);
 case 'flatLid':return E(x,y+3,10,11,INK,0)+P(pl([[x-14,y+1],[x+14,y+1],[x+14,y-16],[x-14,y-16]],1),skin,0)+L('M'+(x-13)+' '+(y+2)+'Q'+x+' '+(y-1)+' '+(x+13)+' '+(y+2),INK,w);
 case 'down':return E(x,y+6,8,8,INK,0)+P(pl([[x-14,y+3],[x+14,y+3],[x+14,y-10],[x-14,y-10]],1),skin,0)+L('M'+(x-12)+' '+(y+4)+'Q'+x+' '+(y-4)+' '+(x+12)+' '+(y+4),INK,w);
 case 'downside':return E(x+4,y+6,8,8,INK,0)+P(pl([[x-14,y+3],[x+14,y+3],[x+14,y-10],[x-14,y-10]],1),skin,0)+L('M'+(x-12)+' '+(y+4)+'Q'+x+' '+(y-4)+' '+(x+12)+' '+(y+4),INK,w);
 case 'lookup':return E(x,y,13,15,'#fff',w*0.75)+C(x+4,y-5,7,INK,0)+C(x+6,y-8,2.4,'#fff',0);
 case 'lookup2':return E(x,y,13,15,'#fff',w*0.75)+C(x+1,y-5,8,INK,0)+C(x+3.5,y-8,3,'#fff',0)+C(x-2,y-2,1.6,'#fff',0);
 case 'lookside':return E(x,y,14,15,'#fff',w*0.75)+C(x+6,y,7.5,INK,0)+C(x+8,y-3,2.6,'#fff',0);
 case 'dart':return E(x,y,13,14,'#fff',w*0.75)+C(x-5,y+1,6.5,INK,0)+C(x-3,y-2,2.2,'#fff',0);
 case 'sideEye':return E(x,y+2,15,11,'#fff',w*0.75)+C(x+7,y+4,6.5,INK,0)+P(pl([[x-18,y-1],[x+18,y-1],[x+18,y-14],[x-18,y-14]],1),skin,0)+L('M'+(x-16)+' '+(y-1)+'L'+(x+16)+' '+(y-1),INK,w*1.2);
 case 'odd':return i<0?eye1('dotSmall',x,y+2,i,w,skin):eye1('big',x,y-2,i,w,skin);
 case 'star':return E(x,y,12,14,INK,0)+star4(x+1,y-1,9,'#fff')+C(x-5,y+6,2,'#fff',0);
 case 'squeeze':return i<0?L('M'+(x-10)+' '+(y-9)+'L'+(x+8)+' '+y+'L'+(x-10)+' '+(y+9),INK,w):L('M'+(x+10)+' '+(y-9)+'L'+(x-8)+' '+y+'L'+(x+10)+' '+(y+9),INK,w);
 case 'wince':return i<0?eye1('squeeze',x,y,i,w,skin):eye1('half',x,y,i,w,skin);
 case 'teary':return E(x,y,12,14,INK,0)+E(x,y+8,9,5,'#8FD3FF',0)+C(x+4,y-5,4,'#fff',0)+C(x-4,y+1,2,'#fff',0);
 }
 return E(x,y,10,12,INK,0);
}
function brow1(t,x,i,w){
 var inn=x-i*12,out=x+i*12,a;
 switch(t){
 case 'none':return '';
 case 'soft':a='M'+(x-11)+' -22Q'+x+' -29 '+(x+11)+' -23';break;
 case 'flat':a='M'+(x-11)+' -24L'+(x+11)+' -24';break;
 case 'up':a='M'+(x-12)+' -32Q'+x+' -42 '+(x+12)+' -33';break;
 case 'high':a='M'+(x-12)+' -40Q'+x+' -50 '+(x+12)+' -41';break;
 case 'worried':a='M'+out+' -21Q'+x+' -25 '+inn+' -34';break;
 case 'softUp':a='M'+out+' -24Q'+x+' -28 '+inn+' -31';break;
 case 'softSad':a='M'+out+' -18Q'+x+' -21 '+inn+' -28';break;
 case 'flatSad':a='M'+out+' -19L'+inn+' -26';break;
 case 'angry':a='M'+out+' -31L'+inn+' -15';break;
 case 'firm':a='M'+out+' -30L'+inn+' -19';break;
 case 'flatAngry':a='M'+out+' -27L'+inn+' -20';break;
 case 'oneup':a=i<0?'M'+(x-11)+' -18L'+(x+11)+' -20':'M'+(x-12)+' -36Q'+x+' -46 '+(x+12)+' -37';break;
 case 'oneupR':a=i<0?'M'+(x-11)+' -22Q'+x+' -28 '+(x+11)+' -23':'M'+(x-12)+' -36Q'+x+' -46 '+(x+12)+' -37';break;
 default:a='M'+(x-11)+' -22Q'+x+' -29 '+(x+11)+' -23';
 }
 return L(a,INK,w);
}
function mouth(t,w){
 var D=MOUTH,o=w*0.8;
 switch(t){
 case 'flat':return L('M-11 46L11 46',INK,w);
 case 'smile':return L('M-18 38Q0 57 18 38',INK,w);
 case 'small':return L('M-10 42Q0 50 10 42',INK,w);
 case 'gentle':return L('M-14 41Q0 51 14 41',INK,w);
 case 'openSmall':return P('M-13 39Q0 42 13 39Q11 55 0 55Q-11 55 -13 39Z',D,o)+E(0,50,6,3,TONGUE,0);
 case 'laugh':return P('M-24 33Q0 37 24 33Q22 68 0 68Q-22 68 -24 33Z',D,o)+P('M-12 62Q0 52 12 62Q6 67 0 67Q-6 67 -12 62Z',TONGUE,0);
 case 'bigGrin':return P('M-26 32Q0 36 26 32Q22 66 0 66Q-22 66 -26 32Z',D,o)+P('M-22 35Q0 38 22 35L20 43Q0 46 -20 43Z','#fff',0)+P('M-12 61Q0 51 12 61Q6 65 0 65Q-6 65 -12 61Z',TONGUE,0);
 case 'smug':return L('M-18 41Q2 54 20 34',INK,w)+L('M17 30L22 38',INK,w*0.7);
 case 'frown':return L('M-16 53Q0 38 16 53',INK,w);
 case 'smallFrown':return L('M-10 51Q0 43 10 51',INK,w);
 case 'flatFrown':return L('M-17 53L-12 48L12 48L17 53',INK,w);
 case 'wail':return P('M-19 56Q0 24 19 56Q0 62 -19 56Z',D,o)+P('M-10 56Q0 50 10 56Q0 60 -10 56Z',TONGUE,0);
 case 'wobble':return P('M-17 50Q-11 39 -5 45Q1 39 7 45Q13 39 17 50Q0 58 -17 50Z',D,o);
 case 'wobbleSmile':return L('M-19 40Q-12 48 -6 44Q0 52 6 44Q12 48 19 40',INK,w);
 case 'wobbleFrown':return L('M-14 53Q-8 44 -3 49Q2 43 7 49Q11 45 14 53',INK,w);
 case 'teethFrown':return P('M-19 56Q0 32 19 56Z','#fff',o)+L('M-14 50L14 50',INK,w*0.5);
 case 'teeth':return R(-20,37,40,16,6,'#fff',o)+L('M-19 45L19 45M-9 37L-9 53M0 37L0 53M9 37L9 53',INK,w*0.5);
 case 'grimace':return P('M-22 44Q0 34 22 44Q20 56 0 55Q-20 56 -22 44Z','#fff',o)+L('M-19 46Q0 41 19 46M-8 40L-8 55M6 39L6 55',INK,w*0.5);
 case 'O':return E(0,47,9,11,D,o);
 case 'bigO':return E(0,52,12,19,D,o)+E(0,62,7,4,TONGUE,0);
 case 'o':return E(0,47,5.5,6.5,D,o);
 case 'smallO':return E(0,47,4,4.5,D,0);
 case 'shoutO':return P('M-15 38Q0 34 15 38Q14 64 0 64Q-14 64 -15 38Z',D,o)+E(0,58,7,4,TONGUE,0);
 case 'oSide':return E(9,47,6,7,D,o);
 case 'side':return L('M0 47Q10 49 19 42',INK,w);
 case 'wavy':return L('M-16 47Q-8 40 0 47Q8 54 16 47',INK,w);
 case 'wavySmall':return L('M-11 47Q-5 42 0 47Q5 52 11 47',INK,w);
 case 'wavyGrin':return P('M-19 39Q-9 46 0 39Q9 46 19 39Q13 57 0 57Q-13 57 -19 39Z',D,o)+P('M-16 41Q-9 46 0 41Q9 46 16 41L15 45Q8 49 0 45Q-8 49 -15 45Z','#fff',0);
 case 'zigzag':return R(-19,37,38,16,6,'#fff',o)+L('M-16 46L-10 41L-4 50L2 41L8 50L14 42',INK,w*0.55);
 case 'squiggle':return L('M-17 47Q-9 36 -1 46Q6 55 15 42',INK,w);
 case 'set':return L('M-14 47Q0 44 14 47',INK,w*1.15);
 case 'pout':return P('M-7 47Q0 39 7 47Q0 54 -7 47Z','#E07A8B',o)+L('M-3 47L3 47',INK,w*0.4);
 case 'bite':return L('M-15 45Q0 52 15 45',INK,w)+R(-7,43,6,5,1.5,'#fff',w*0.4)+R(1,43,6,5,1.5,'#fff',w*0.4);
 }
 return L('M-12 46L12 46',INK,w);
}
var TINTS={red:1,red2:1,pale:1,green:1,gloomTint:1};
function extras(xs,w,isWB,mode){
 var s='';
 for(var j=0;j<xs.length;j++){if(mode===1&&!TINTS[xs[j]])continue;if(mode===2&&TINTS[xs[j]])continue;switch(xs[j]){
 case 'blush':s+=E(-52,30,13,7,BLUSH,0,O(0.55))+E(52,30,13,7,BLUSH,0,O(0.55));break;
 case 'blush2':s+=E(-50,29,17,9,'#F27A9E',0,O(0.7))+E(50,29,17,9,'#F27A9E',0,O(0.7))+L('M-58 26L-62 33M-49 26L-53 33M44 26L40 33M53 26L49 33',INK,w*0.4,O(0.45));break;
 case 'blush3':s+=E(0,27,72,15,'#F2607E',0,O(0.5))+L('M-58 22L-63 32M-47 22L-52 32M-36 22L-41 32M38 22L33 32M49 22L44 32M60 22L55 32',INK,w*0.4,O(0.5));break;
 case 'tear':s+=drop(44,32,7,TEAR,w*0.45);break;
 case 'tears':s+=L('M-34 18Q-40 48 -32 76M34 18Q40 48 32 76',TEAR,13)+L('M-34 18Q-40 48 -32 76M34 18Q40 48 32 76','#fff',3,O(0.6))+drop(-62,40,6,TEAR,w*0.4)+drop(64,36,6,TEAR,w*0.4);break;
 case 'sweat':s+=drop(80,-34,isWB?9:13,TEAR,w*0.5);break;
 case 'sweat2':s+=drop(-82,-22,isWB?8:11,TEAR,w*0.5);break;
 case 'pale':s+=P('M-96 -28A100 100 0 0 1 96 -28Z','#7E95D9',0,O(0.42))+L('M-30 -62L-30 -40M-12 -68L-12 -44M6 -68L6 -44M24 -62L24 -40','#4B5FA8',w*0.6,O(0.6));break;
 case 'red':s+=C(0,0,97,'#E5534B',0,O(0.28));break;
 case 'red2':s+=P('M-96 -28A100 100 0 0 1 96 -28Z','#E5534B',0,O(0.25));break;
 case 'green':s+=P('M-99 6A100 100 0 0 0 99 6Z','#6FB86E',0,O(0.32))+C(0,0,97,'#8CC98A',0,O(0.12));break;
 case 'gloomTint':s+=C(0,0,97,'#7E8CB0',0,O(0.22));break;
 case 'gloom':s+=L('M-40 -70L-40 -42M-20 -78L-20 -46M0 -80L0 -48M20 -78L20 -46M40 -70L40 -42','#6A5ACD',w*0.6,O(0.55));break;
 case 'anger':s+=anger(70,-64,isWB?22:30,w*0.8);break;
 case 'sparkles':s+=star4(-96,-66,isWB?16:18,'#F6C343',w*0.45)+star4(98,-50,isWB?12:14,'#F6C343',w*0.45)+star4(90,62,isWB?9:10,'#F6C343',w*0.4);break;
 case 'twinkle':s+=star4(84,-74,isWB?14:16,'#F6C343',w*0.45);break;
 case 'shine':s+=star4(-86,-78,isWB?13:15,'#F6C343',w*0.45);break;
 case 'gleam':s+=star4(46,-4,6,'#fff',0)+star4(-22,-4,6,'#fff',0);break;
 case 'heart':s+=heart(78,52,isWB?14:16,'#E5534B',w*0.5);break;
 case 'puff':s+=blob([[62,62,9],[74,56,11],[86,62,8]],'#fff',w*0.4);break;
 case 'shock':s+=L('M-104 -40L-122 -50M-108 -14L-128 -14M-104 12L-122 22M104 -40L122 -50M108 -14L128 -14M104 12L122 22',INK,w*0.6);break;
 case 'swirl':s+=L('M74 -78Q90 -84 92 -70Q92 -58 78 -60Q68 -63 72 -72Q76 -78 82 -72',INK,w*0.6);break;
 case 'scribble':s+=L('M48 -96L64 -108L60 -92L78 -104L74 -88L92 -98L86 -82',INK,w*0.6);break;
 case 'shake':s+=L('M-112 -10Q-118 0 -112 10M-124 -16Q-132 0 -124 16M112 -10Q118 0 112 10M124 -16Q132 0 124 16',INK,w*0.5);break;
 }}
 return s;
}
function anger(x,y,r,w){var a=r*0.28,b=r;return L('M'+n(x-a)+' '+n(y-b)+'Q'+n(x-a)+' '+n(y-a)+' '+n(x-b)+' '+n(y-a)+'M'+n(x+a)+' '+n(y-b)+'Q'+n(x+a)+' '+n(y-a)+' '+n(x+b)+' '+n(y-a)+'M'+n(x-a)+' '+n(y+b)+'Q'+n(x-a)+' '+n(y+a)+' '+n(x-b)+' '+n(y+a)+'M'+n(x+a)+' '+n(y+b)+'Q'+n(x+a)+' '+n(y+a)+' '+n(x+b)+' '+n(y+a),'#E5534B',w);}
/* features of a face in 100-space, centred at 0,0 */
function tints(key,w){var x=EXPR[key]||EXPR.neutral;return extras(x.x||[],w,false,1);}
function features(key,skin,w,isWB,fo,glasses,elder,noTint){
 var x=EXPR[key]||EXPR.neutral,s='',i,dy=x.dy||0;
 var inner='';
 for(i=-1;i<=1;i+=2)inner+=eye1(x.e,i*34,6,i,w,skin);
 for(i=-1;i<=1;i+=2)inner+=brow1(x.b,i*34,i,w*0.95);
 inner+=isWB?L('M-5 27Q0 31 5 27',INK,w*0.6,O(0.5)):L('M6 22Q13 28 6 32',INK,w*0.6,O(0.5));
 inner+=mouth(x.m,w);
 if(elder)inner+=L('M-62 6L-70 0M-62 12L-70 14M62 6L70 0M62 12L70 14',INK,w*0.4,O(0.5));
 if(glasses)inner+=C(-34,6,22,'#fff',w*0.6,O(0.18).replace('opacity','fill-opacity'))+C(34,6,22,'none',w*0.6)+C(-34,6,22,'none',w*0.6)+L('M-12 4Q0 -2 12 4',INK,w*0.6);
 s+=G(inner,'translate('+fo+' '+dy+')');
 s+=extras(x.x||[],w,isWB,noTint?2:0);
 return s;
}

/* ---------------------------------------------------------------
   HAIR (100-space, facing right). returns {b:behind-body, f:front}
   --------------------------------------------------------------- */
function hair(style,c,W,tod,tudC,skin){
 var b='',f='',d=mix(c,'#000000',0.25);
 switch(style){
 case 'short':
  if(tod){f=L('M-6 -96Q-14 -128 10 -124Q24 -118 10 -106',c==GREYH?INK:INK,W*0.9)+L('M-6 -96Q-14 -128 10 -124Q24 -118 10 -106',c,W*0.5);break;}
  f=P('M-98 14C-112 -62 -50 -118 8 -112C70 -108 108 -66 100 -6C90 -30 70 -44 44 -46C30 -36 8 -38 -6 -50C-24 -40 -46 -36 -62 -40C-74 -26 -84 -6 -98 14Z',c,W);break;
 case 'spiky':
  f=P('M-98 14L-112 -30L-94 -52L-106 -88L-66 -88L-58 -124L-26 -104L-2 -136L18 -108L52 -128L56 -96L94 -100L84 -66L108 -48L100 -10C88 -34 66 -46 40 -46C20 -40 0 -44 -14 -52C-34 -40 -56 -38 -66 -40C-78 -26 -88 -6 -98 14Z',c,W);break;
 case 'curly':
  f=blob([[-96,-6,28],[-92,-44,30],[-72,-80,30],[-38,-104,30],[0,-112,30],[38,-104,30],[70,-82,28],[90,-50,26],[98,-16,20],[-50,-62,26],[-12,-72,26],[26,-66,26],[56,-56,22]],c,W);break;
 case 'ponytail':
  b=P('M-70 -76C-120 -70 -138 -10 -118 52C-112 70 -96 72 -96 56C-104 10 -96 -30 -66 -50Z',c,W)+E(-74,-66,12,16,'#E5534B',W*0.7);
  f=P('M-100 20C-116 -64 -46 -120 10 -112C72 -106 110 -60 102 0C92 -24 76 -40 50 -44C20 -50 -10 -30 -40 -44C-60 -30 -84 -6 -100 20Z',c,W);break;
 case 'bob':
  b=P('M-110 70Q-128 -112 0 -118Q128 -112 110 70Q94 82 78 70L78 10L-78 10L-78 70Q-94 82 -110 70Z',c,W);
  f=P('M-104 40C-114 -78 -52 -118 4 -116C64 -114 108 -80 104 -6Q60 -36 0 -36Q-56 -36 -84 -2Q-92 18 -104 40Z',c,W);break;
 case 'long':
  b=P('M-110 150Q-130 -100 0 -118Q130 -100 110 150Q60 162 0 150Q-60 162 -110 150Z',c,W);
  f=P('M-102 30C-112 -74 -50 -118 6 -114C70 -110 110 -66 102 10C92 -30 60 -54 20 -64C-10 -40 -60 -36 -84 -10Q-94 8 -102 30Z',c,W);break;
 case 'bun':
  b=C(-30,-112,36,c,W)+L('M-52 -96Q-30 -84 -8 -94',d,W*0.6);
  f=P('M-100 20C-116 -64 -46 -120 10 -112C72 -106 110 -60 102 0C92 -24 76 -40 50 -44C20 -50 -10 -30 -40 -44C-60 -30 -84 -6 -100 20Z',c,W);break;
 case 'bald':
  f=P('M-100 10Q-112 -24 -94 -40Q-84 -18 -80 4Z',c,W*0.8)+E(30,-70,22,12,'#fff',0,O(0.35));break;
 case 'grey':
  f=blob([[-96,-2,20],[-94,-34,22],[-80,-64,22],[-52,-90,24],[-16,-104,24],[22,-100,24],[56,-84,22],[82,-58,20],[96,-28,16]],c,W);break;
 case 'tudung':
  b='';
  f=P('M-114 0C-120 -88 -60 -126 0 -126C60 -126 120 -88 114 0C118 62 128 104 150 150L-150 150C-128 104 -118 62 -114 0Z',tudC,W)+L('M-60 120Q0 140 60 120',mix(tudC,'#000000',0.2),W*0.5);
  break;
 }
 return {b:b,f:f};
}

/* ---------------------------------------------------------------
   PEOPLE
   --------------------------------------------------------------- */
var BODY={
 child:{hr:25,hy:-99,hx:2,shy:-73,hipy:-40,shw:13,hipw:11,ua:17,fa:16,th:19,sh:18,aw:8,lw:9.5,foot:9,hand:4.8},
 adult:{hr:23,hy:-146,hx:2,shy:-119,hipy:-76,shw:18,hipw:15,ua:26,fa:24,th:36,sh:36,aw:10,lw:12,foot:12,hand:5.4},
 elder:{hr:22.5,hy:-133,hx:7,shy:-107,hipy:-68,shw:17,hipw:15,ua:24,fa:22,th:32,sh:32,aw:10,lw:12,foot:12,hand:5.2,stoop:12},
 tod:{hr:21,hy:-62,hx:1,shy:-41,hipy:-21,shw:10.5,hipw:10,ua:11,fa:10,th:9.5,sh:8.5,aw:7,lw:8.5,foot:7,hand:4.2}
};
var WHODEF={
 boy:{t:'child',hair:'short',top:'blue',bottom:'navy',low:'shorts',sl:0.32,shoe:'#FFFFFF'},
 girl:{t:'child',hair:'ponytail',top:'pink',bottom:'purple',low:'skirt',sk:0.95,sl:0.32,shoe:'#FFFFFF',fem:1},
 man:{t:'adult',hair:'short',top:'teal',bottom:'navy',low:'pants',sl:0.3,shoe:'#4A3B35',collar:1},
 woman:{t:'adult',hair:'long',top:'orange',bottom:'navy',low:'skirt',sk:1.45,sl:0.3,shoe:'#7A4A3A',fem:1},
 grandpa:{t:'elder',hair:'grey',top:'white',bottom:'grey',low:'pants',sl:0.3,shoe:'#6E4A30',collar:1,glasses:1,pocket:1},
 grandma:{t:'elder',hair:'bun',top:'purple',bottom:'navy',low:'pants',sl:0.5,shoe:'#8B5E3C',fem:1,glasses:1,dots:1},
 teacher:{t:'adult',hair:'bob',top:'teal',bottom:'navy',low:'skirt',sk:1.35,sl:0.55,shoe:'#3E4157',fem:1,glasses:1,lanyard:1},
 toddler:{t:'tod',hair:'short',top:'yellow',bottom:'yellow',low:'shorts',sl:0.3,shoe:'#E5534B'}
};
var HAIRS=['short','spiky','curly','ponytail','bob','long','bun','bald','tudung','grey'];
/* pose table: arms n(ear)/f(ar): ['a',upperDeg,foreDeg] (0=down, 90=forward, 180=up) or ['t',landmark,dx,dy,pref] (offsets in head radii)
   legs [thighDeg, shinDeg|null(solve to ground)] */
var PD={
 stand:{n:['a',8,3],f:['a',-8,-3],ln:[3,1],lf:[-3,-1]},
 walk:{n:['a',26,44],f:['a',-28,-14],ln:[-18,-36],lf:[24,8],lean:3},
 run:{n:['a',-58,12],f:['a',58,128],ln:[72,8],lf:[-36,-96],lean:14},
 sit:{n:['a',22,86],f:['a',16,82],ln:[86,null],lf:[80,null],mode:'seat'},
 fall:{n:['a',150,190],f:['g',-1.25],ln:[118,160],lf:[78,24],lean:-40,tilt:-12,mode:'fall'},
 point:{n:['a',96,92],f:['a',-8,-3],ln:[3,1],lf:[-3,-1],lean:4,finger:1},
 wave:{n:['a',100,165],f:['a',-8,-3],ln:[3,1],lf:[-3,-1],wave:1,tilt:-4},
 give:{n:['a',74,90],f:['a',66,86],ln:[12,2],lf:[-6,-2],lean:8},
 hold:{n:['a',22,108],f:['a',18,104],ln:[3,1],lf:[-3,-1]},
 cry:{n:['t','H',0.5,0.16,'down'],f:['t','H',-0.2,0.2,'down'],ln:[3,1],lf:[-3,-1],tilt:6,ff:1},
 jump:{n:['a',128,160],f:['a',-128,-160],ln:[55,-25],lf:[25,-62],lift:1},
 kneel:{n:['a',62,40],f:['a',45,28],ln:[88,null],lf:[8,-88],lean:16,tilt:8,mode:'kneel'},
 hug:{n:['a',82,140],f:['a',76,126],ln:[6,2],lf:[-4,-1],lean:6},
 reach:{n:['a',122,150],f:['a',-22,-8],ln:[3,1],lf:[-3,-1],tilt:-14,lean:-2,tip:1},
 think:{n:['t','H',0.52,0.96,'down'],f:['t','C',0.55,0.75,'down'],ln:[3,1],lf:[-3,-1],tilt:-6,ff:1},
 shout:{n:['t','H',1.12,0.5,'down'],f:['a',-20,-8],ln:[10,2],lf:[-6,-2],lean:10,tilt:-8},
 sleep:{n:['a',4,2],f:['a',-4,-2],ln:[2,0],lf:[-2,0],mode:'lie'},
 clap:{n:['t','C',1.02,0.5,'down'],f:['t','C',0.9,0.42,'down'],ln:[3,1],lf:[-3,-1],ff:1,clap:1},
 carry:{n:['a',28,98],f:['a',22,94],ln:[5,1],lf:[-5,-1],lean:-5}
};
function rot(p,c,deg){var r=deg*Math.PI/180,cs=Math.cos(r),sn=Math.sin(r),x=p[0]-c[0],y=p[1]-c[1];return [c[0]+x*cs-y*sn,c[1]+x*sn+y*cs];}
function dv(a,l){var r=a*Math.PI/180;return [Math.sin(r)*l,Math.cos(r)*l];}
function add(p,q){return [p[0]+q[0],p[1]+q[1]];}
function dist(p,q){return Math.sqrt((p[0]-q[0])*(p[0]-q[0])+(p[1]-q[1])*(p[1]-q[1]));}
function ik(S,T,l1,l2,pref){
 var dx=T[0]-S[0],dy=T[1]-S[1],d=Math.sqrt(dx*dx+dy*dy)||0.01,mx=l1+l2-0.3,mn=Math.abs(l1-l2)+0.5;
 if(d>mx){T=[S[0]+dx/d*mx,S[1]+dy/d*mx];d=mx;}if(d<mn){T=[S[0]+dx/d*mn,S[1]+dy/d*mn];d=mn;}
 var base=Math.atan2(T[1]-S[1],T[0]-S[0]),a=Math.acos(Math.max(-1,Math.min(1,(l1*l1+d*d-l2*l2)/(2*l1*d))));
 var e1=[S[0]+Math.cos(base+a)*l1,S[1]+Math.sin(base+a)*l1],e2=[S[0]+Math.cos(base-a)*l1,S[1]+Math.sin(base-a)*l1],E2;
 if(pref==='out')E2=e1[0]>e2[0]?e1:e2;else if(pref==='back')E2=e1[0]<e2[0]?e1:e2;else if(pref==='up')E2=e1[1]<e2[1]?e1:e2;else E2=e1[1]>e2[1]?e1:e2;
 return [S,E2,T];
}
function solveShin(K,len,ank){var dy=ank-K[1];if(dy>=len)return 0;if(dy<=-len)return 180;return Math.acos(dy/len)*180/Math.PI;}
/* o: {mode, seatH, gy, lift, armsFn(lm)->{n,f}, legsFn} */
function solvePose(pd,b,o){
 var lean=(pd.lean||0)+(b.stoop||0)+(o.lean||0),hx=b.hipw*0.45,gy=o.gy||0,ank=gy-4,mode=o.mode||pd.mode||'stand';
 var ln=o.ln||pd.ln,lf=o.lf||pd.lf;
 function legs(hy){var r={};[['n',1,ln],['f',-1,lf]].forEach(function(q){var Hp=[q[1]*hx,hy],K=add(Hp,dv(q[2][0],b.th)),sa=q[2][1];if(sa==null)sa=solveShin(K,b.sh,ank);r[q[0]]=[Hp,K,add(K,dv(sa,b.sh))];});return r;}
 var hipY,lg;
 if(mode==='seat'){hipY=gy-o.seatH-b.lw*0.45;}
 else if(mode==='ground'||mode==='fall'){hipY=gy-b.lw*0.55;}
 else if(mode==='kneel'){hipY=gy-b.lw*0.5-b.th*Math.cos(lf[0]*Math.PI/180);}
 else {lg=legs(b.hipy);hipY=b.hipy+(ank-Math.max(lg.n[2][1],lg.f[2][1]));if(pd.lift)hipY-=b.th*1.1;if(pd.tip)hipY-=b.foot*0.35;}
 lg=legs(hipY);
 if(o.legsFn)o.legsFn(lg,hipY);
 var pv=[0,hipY],dU=hipY-b.hipy;
 var L0={pv:pv,lean:lean,Sn:rot([b.shw-3,b.shy+3+dU],pv,lean),Sf:rot([-b.shw+3,b.shy+3+dU],pv,lean),H:rot([b.hx,b.hy+dU],pv,lean),C:rot([0,b.shy+6+dU],pv,lean),hipY:hipY,dU:dU,b:b,gy:gy};
 var A={n:pd.n,f:pd.f};if(o.armsFn){var ov=o.armsFn(L0);if(ov.n)A.n=ov.n;if(ov.f)A.f=ov.f;}
 function arm(sp,S){
  if(sp[0]==='a'){var E1=add(S,dv(sp[1],b.ua));return [S,E1,add(E1,dv(sp[2],b.fa))];}
  var Tg;
  if(sp[0]==='t'){var lm=sp[1]==='H'?L0.H:sp[1]==='C'?L0.C:pv;Tg=[lm[0]+sp[2]*b.hr,lm[1]+sp[3]*b.hr];return ik(S,Tg,b.ua,b.fa,sp[4]);}
  if(sp[0]==='p')return ik(S,sp[1],b.ua,b.fa,sp[2]);
  if(sp[0]==='g')return ik(S,[sp[1]*b.hr,gy-b.hand-1],b.ua,b.fa,'up');
  return [S,S,S];
 }
 L0.an=arm(A.n,L0.Sn);L0.af=arm(A.f,L0.Sf);L0.lg=lg;
 return L0;
}
function along(pts,len){var out=[pts[0]],acc=0;for(var i=1;i<pts.length;i++){var d=dist(pts[i-1],pts[i]);if(acc+d>=len){var t=(len-acc)/(d||1);out.push([pts[i-1][0]+(pts[i][0]-pts[i-1][0])*t,pts[i-1][1]+(pts[i][1]-pts[i-1][1])*t]);return out;}acc+=d;out.push(pts[i]);}return out;}
function limb(pts,w,c){var d=pl(pts);return '<path d="'+d+'" fill="none" stroke="'+INK+'" stroke-width="'+n(w+SW*2)+'"/><path d="'+d+'" fill="none" stroke="'+c+'" stroke-width="'+n(w)+'"/>';}
function hull(pts){pts=pts.slice().sort(function(a,b){return a[0]-b[0]||a[1]-b[1];});function cr(o,a,b){return (a[0]-o[0])*(b[1]-o[1])-(a[1]-o[1])*(b[0]-o[0]);}var lo=[],up=[],i;for(i=0;i<pts.length;i++){while(lo.length>=2&&cr(lo[lo.length-2],lo[lo.length-1],pts[i])<=0)lo.pop();lo.push(pts[i]);}for(i=pts.length-1;i>=0;i--){while(up.length>=2&&cr(up[up.length-2],up[up.length-1],pts[i])<=0)up.pop();up.push(pts[i]);}up.pop();lo.pop();return lo.concat(up);}
function ang(a,b){return Math.atan2(b[0]-a[0],b[1]-a[1])*180/Math.PI;}

/* hold types: one(grip), two(gripYfrac), hang, back, leash, umb, long, kite, bike, scoot */
var HOLD={wallet:['one'],money:['one'],ball:['two',0.5],bicycle:['bike'],scooter:['scoot'],dog:['leash'],cat:['two',0.3],puppy:['two',0.3],kitten:['two',0.3],bird:['one'],vase:['two',0.4],'vase-broken':['two',0.5],umbrella:['umb'],schoolbag:['back'],phone:['one'],book:['one'],'books-pile':['two',0.4],cake:['two',0.05],plate:['two',0.1],bowl:['two',0.15],tray:['two',0.1],cup:['one'],trophy:['two',0.4],medal:['one'],kite:['kite'],letter:['one'],gift:['two',0.5],flowerpot:['two',0.3],bottle:['one'],toy:['one'],'banana-peel':['one'],fishtank:['two',0.35],basket:['hang'],broom:['long'],firstaid:['hang'],icecream:['one'],laptop:['two',0.1],drum:['two',0.5],shoppingbag:['hang'],mop:['long'],stone:['one'],box:['two',0.5],bucket:['hang'],clock:['two',0.5],plant:['two',0.25]};
var FREEHAND={point:1,wave:1,think:1,cry:1,clap:1,shout:1};

function headParts(wd,hs,hairC,tudC,skin,fk,k,elder,tod,kid){
 var W=SW/k,fo=16,hp=hair(hs,hairC,W,tod,tudC,skin),f='',ex=EXPR[fk]||EXPR.happy;
 var hasTint=(ex.x||[]).join(' ').match(/blush|red|pale|green|gloom/);
 if(hs==='tudung'){
  f+=hp.f+E(fo*0.45,12,76,80,skin,W*0.55)+G(tints(fk,7.5),'translate('+n(fo*0.45)+' 12) scale(0.76 0.8)');
 }else{
  if(!/^(bob|long|curly)$/.test(hs))f+=E(-90,14,15,19,skin,W)+L('M-94 6Q-84 14 -92 24',INK,W*0.5,O(0.5));
  f+=C(0,0,100,skin,W)+tints(fk,7.5)+hp.f;
 }
 if(kid&&!hasTint)f+=G(E(-52,30,12,6,BLUSH,0,O(0.35))+E(52,30,12,6,BLUSH,0,O(0.35)),'translate('+fo+' 0)');
 f+=features(fk,skin,7.5,false,fo,wd.glasses,elder,1);
 return {b:hp.b,f:f};
}

function drawActor(a,sc,ex){
 ex=ex||{};
 var wd=WHODEF[a.who];if(!wd){warn('unknown who "'+a.who+'"');return null;}
 var b=BODY[wd.t],tod=wd.t==='tod',elder=wd.t==='elder',kid=wd.t==='child'||tod;
 var hs=wd.hair;if(a.hair){if(HAIRS.indexOf(a.hair)>=0)hs=a.hair;else warn('unknown hair "'+a.hair+'"');}
 var fem=wd.fem,low=wd.low,sk=wd.sk||0.95;
 if(a.who==='teacher'&&/^(short|spiky|bald)$/.test(hs)){fem=0;low='pants';}
 if(a.skin&&!SKIN[a.skin])warn('unknown skin "'+a.skin+'"');
 var skin=SKIN[a.skin]||SKIN.tan;
 if(a.top&&!COL[a.top])warn('unknown colour "'+a.top+'"');if(a.bottom&&!COL[a.bottom])warn('unknown colour "'+a.bottom+'"');
 var top=COL[a.top]||COL[wd.top],bot=COL[a.bottom]||COL[wd.bottom],uni=!!a.uniform;
 if(uni){top='#FFFFFF';bot=COL.navy;if(a.who==='girl'){low='skirt';sk=0.95;}else if(a.who==='boy')low='shorts';}
 var hairC=(elder||hs==='grey')?GREYH:HAIRC;
 var tudC=top==='#FFFFFF'?'#FFFFFF':mix(top,'#FFFFFF',0.45);
 var pn='stand';if(a.pose){if(PD[a.pose])pn=a.pose;else warn('unknown pose "'+a.pose+'"');}
 var pd=PD[pn];
 var fk='happy';if(a.face){if(FACE_L.indexOf(a.face)>=0)fk=a.face;else warn('unknown face "'+a.face+'"');}
 if(pn==='sleep')fk='asleep';if(pn==='shout'&&(!a.face||a.face==='neutral'))fk='shout';
 var hk=a.hold||null;if(hk&&!PR[hk]){warn('unknown prop "'+hk+'"');hk=null;}if(hk&&!HOLD[hk]){warn('prop "'+hk+'" cannot be held; skipped');hk=null;}
 var hd=hk?HOLD[hk]||['none']:null,ht=hd?hd[0]:null,pr=hk?PR[hk]:null;
 if(pn==='sleep'||(pn==='fall'&&ht!=='two'&&ht!=='one'&&ht!=='hang'))hk=hk&&(ht==='bike'||ht==='scoot'||ht==='leash')?hk:hk;
 var o={},Bp=null,geo={},handPos='n',seatInfo=ex.seat;
 var bs=wd.t==='adult'||elder?1.45:tod?0.75:1;
 /* mode */
 if(pn==='sit'){
  if(ht==='bike'){o.mode='seat';o.seatH=44*bs;geo.bikeX=13*bs;o.lean=16;
   o.legsFn=function(lg){var cr=[geo.bikeX-2*bs,-18*bs];var pn1=[cr[0]+6*bs,cr[1]+5*bs],pf=[cr[0]-6*bs,cr[1]-5*bs];lg.n=ik(lg.n[0],pn1,b.th,b.sh,'out');lg.f=ik(lg.f[0],pf,b.th,b.sh,'out');};
  }else if(seatInfo&&seatInfo.h>0){o.mode='seat';o.seatH=seatInfo.h;}
  else {o.mode='ground';o.ln=[112,null];o.lf=[100,null];}
 }
 if(ht==='scoot'&&pn!=='walk'){o.gy=-9*bs;}
 /* arms for held things */
 var oneHold=ht==='one'||(ht==='none');
 if(hk&&pn!=='sleep'){
  if(oneHold){if(FREEHAND[pn])handPos='f';else if(pn==='stand'||pn==='sit')o.armsFn=function(){return {n:['a',24,104]};};}
  else if(ht==='two'&&pn!=='fall'){
   o.armsFn=function(L){var w=pr.w,h=pr.h,g=hd[1],y;
    if(pn==='give'){Bp=[b.shw*0.4+(b.ua+b.fa)*0.62,L.C[1]+b.hr*0.25+h*g];}
    else if(pn==='reach'||pn==='jump'||pn==='wave'){Bp=[L.H[0]+b.hr*0.1,L.H[1]-b.hr-4];}
    else{Bp=[b.shw*0.55+w*0.28,(L.C[1]+L.hipY)/2+h*0.45];y=L.H[1]+b.hr*0.6;if(Bp[1]-h<y)Bp[1]=y+h;if(pn==='sit'&&Bp[1]>L.hipY-3)Bp[1]=L.hipY-3;}
    geo.tn=[Bp[0]+w*0.47,Bp[1]-h*g];geo.tf=[Bp[0]-w*0.47,Bp[1]-h*g];
    return {n:['p',geo.tn,'down'],f:['p',geo.tf,'down']};};
  }
  else if(ht==='hang'&&!FREEHAND[pn]&&pn!=='give'&&pn!=='reach'&&pn!=='jump'&&pn!=='fall'){
   o.armsFn=function(L){var nat=L.Sn[1]+b.ua+b.fa-3,y=Math.min(nat,L.gy-5+pr.grip[1]);return {n:['p',[L.Sn[0]+(nat-y)*0.25+3,y],'back']};};
  }
  else if(ht==='leash'){o.armsFn=function(){return {n:['a',40,60]};};}
  else if(ht==='umb'){o.armsFn=function(L){return {n:['p',[L.H[0]+b.hr*1.0,L.Sn[1]-2],'down']};};}
  else if(ht==='kite'){o.armsFn=function(){return {n:['a',148,162]};};}
  else if(ht==='long'){o.armsFn=function(L){var Tn=[L.Sn[0]+b.ua*0.55,(L.C[1]+L.hipY)/2+2],Lg=pr.h*0.62,gy=L.gy,dyb=gy-Tn[1],dxb=Math.sqrt(Math.max(Lg*Lg-dyb*dyb,4));
    var Bt=[Tn[0]+dxb,gy],u=[(Tn[0]-Bt[0])/Lg,(Tn[1]-Bt[1])/Lg];geo.long={B:Bt,r:Math.atan2(u[0],-u[1])*180/Math.PI};
    return {n:['p',Tn,'down'],f:['p',[Bt[0]+u[0]*pr.h*0.92,Bt[1]+u[1]*pr.h*0.92],'down']};};}
  else if(ht==='bike'){
   if(pn==='sit')o.armsFn=function(){var g=[geo.bikeX+14*bs,-56*bs];return {n:['p',g,'down'],f:['p',[g[0]-2,g[1]+1],'down']};};
   else o.armsFn=function(L){var g=[L.Sn[0]+b.ua*0.7,-56*bs];geo.bikeX=g[0]-14*bs;return {n:['p',g,'down']};};
  }
  else if(ht==='scoot'){
   if(pn==='walk')o.armsFn=function(L){var g=[L.Sn[0]+b.ua*0.7,-60*bs];geo.scX=g[0]-13*bs;return {n:['p',g,'down']};};
   else {geo.scX=0;o.armsFn=function(){var g=[13*bs,-60*bs];return {n:['p',g,'down'],f:['p',[g[0]-3,g[1]+1],'down']};};}
  }
 }
 var cane=a.who==='grandpa'&&!hk&&(pn==='stand'||pn==='walk');
 if(cane)o.armsFn=function(){return {n:['a',20,14],f:pn==='walk'?['a',10,20]:null};};
 if(pn==='sleep')o.mode='stand';
 var Lm=solvePose(pd,b,o);
 /* two-handed: re-centre prop on where the hands actually are */
 if(Bp&&geo.tn){var mx=(Lm.an[2][0]+Lm.af[2][0])/2-(geo.tn[0]+geo.tf[0])/2,my=(Lm.an[2][1]+Lm.af[2][1])/2-(geo.tn[1]+geo.tf[1])/2;Bp=[Bp[0]+mx,Bp[1]+my];}
 var gy=o.gy||0,lean=Lm.lean,hipY=Lm.hipY,dU=Lm.dU,lie=pn==='sleep';
 var H=Lm.H.slice(),tilt=(pd.tilt||0)+(EXPR[fk].tilt||0)+lean*0.5;
 if(lie){H[0]+=b.hr-b.shw-3;tilt+=62;}
 var k=b.hr/100;
 var hp=headParts(wd,hs,hairC,tudC,skin,fk,k,elder,tod,kid);
 var headT='translate('+n(H[0])+' '+n(H[1])+') rotate('+n(tilt)+') scale('+n(k*1000)/1000+')';
 var torT='rotate('+n(lean)+' 0 '+n(hipY)+')';
 var s='',back='',front='';
 /* --- shadow --- */
 var shadow=E(lie?-8:4,0,lie?b.hr*2.6:b.hipw*2.4+(pn==='sit'&&o.mode==='ground'?14:0),3.6,'#1B1F3B',0,O(0.13));
 /* --- vehicles behind --- */
 if(ht==='bike'&&!lie)back+=G(PR.bicycle.d({}),T(geo.bikeX,0,bs));
 if(ht==='scoot'&&!lie)back+=G(PR.scooter.d({}),T(geo.scX,0,bs));
 /* back hair */
 if(hp.b)s+=G(hp.b,headT);
 if(ht==='back'&&!lie)s+=G(G(PR.schoolbag.d({}),T(-b.shw-3,(b.shy+b.hipy)/2+dU+17,tod?0.75:wd.t==='child'?1:1.1)),torT);
 /* far arm (behind) */
 function armSVG(A,isNear){
  var pts=A,r=limb(pts,b.aw,skin);
  var slen=wd.sl*(b.ua+b.fa);r+=limb(along(pts,slen),b.aw+2.6,top);
  if(isNear&&pd.finger&&pn==='point'){var d=dist(pts[1],pts[2])||1,u=[(pts[2][0]-pts[1][0])/d,(pts[2][1]-pts[1][1])/d];r+=limb([pts[2],[pts[2][0]+u[0]*b.hand*1.9,pts[2][1]+u[1]*b.hand*1.9]],2.6,skin);}
  r+=C(pts[2][0],pts[2][1],b.hand,skin,SW*0.9);
  return r;
 }
 var ff=pd.ff||ht==='long';
 if(!ff)s+=armSVG(Lm.af,false);
 /* legs */
 function legSVG(lg){
  var r=limb(lg,b.lw,skin);
  if(low==='pants')r+=limb(lg,b.lw+2,bot);else if(low==='shorts')r+=limb(along(lg,(b.th+b.sh)*(tod?0.36:0.42)),b.lw+2.5,bot);
  if(uni&&kid)r+=limb(along([lg[2],lg[1]],b.sh*0.32),b.lw+0.6,'#FFFFFF');
  var a1=-ang(lg[1],lg[2])+(pd.tip?38:0);
  var f=b.foot;r+=G(P('M-4 -3Q-6 4 -1 4L'+f+' 4Q'+(f+4)+' 4 '+(f+3)+' -1Q'+(f+1)+' -5 '+n(f*0.4)+' -4Q0 -6 -4 -3Z',wd.shoe,SW*0.9),'translate('+n(lg[2][0])+' '+n(lg[2][1])+') rotate('+n(a1)+')');
  return r;
 }
 s+=legSVG(Lm.lg.f)+legSVG(Lm.lg.n);
 /* lower clothes */
 var hw=b.hipw;
 if(low==='skirt'){
  var pts=[[-hw-1,hipY-5],[hw+1,hipY-5]];
  [Lm.lg.n,Lm.lg.f].forEach(function(lg){var p=along(lg,b.th*sk),q=p[p.length-1],r=p[p.length-2],d=dist(q,r)||1,pp=[-(q[1]-r[1])/d,(q[0]-r[0])/d],fl=b.lw*0.5+(sk>1.2?5:4);pts.push([q[0]+pp[0]*fl,q[1]+pp[1]*fl]);pts.push([q[0]-pp[0]*fl,q[1]-pp[1]*fl]);pts.push([r[0]+pp[0]*fl*0.6,r[1]+pp[1]*fl*0.6]);pts.push([r[0]-pp[0]*fl*0.6,r[1]-pp[1]*fl*0.6]);});
  s+=P(pl(hull(pts),1),bot,SW);
 }else s+=R(-hw-1,hipY-6,hw*2+2,12,4,bot,SW);
 /* torso */
 var y0=b.shy+dU,y1=b.hipy+dU+4,sw=b.shw,tor='';
 tor+=P('M'+n(-sw+4)+' '+n(y0-1)+'Q'+n(-sw-1)+' '+n(y0)+' '+n(-sw)+' '+n(y0+7)+'L'+n(-hw-1)+' '+n(y1-2)+'Q'+n(-hw-1)+' '+n(y1+1)+' '+n(-hw+3)+' '+n(y1+1)+'L'+n(hw-3)+' '+n(y1+1)+'Q'+n(hw+1)+' '+n(y1+1)+' '+n(hw+1)+' '+n(y1-2)+'L'+n(sw)+' '+n(y0+7)+'Q'+n(sw+1)+' '+n(y0)+' '+n(sw-4)+' '+n(y0-1)+'Z',top,SW);
 if(uni&&a.who==='girl')tor+=R(-sw+3,y0+1,4.5,y1-y0-1,0,COL.navy,1.5)+R(sw-7.5,y0+1,4.5,y1-y0-1,0,COL.navy,1.5);
 if(uni)tor+=P('M'+n(sw*0.15)+' '+n(y0+9)+'h7v5q-3.5 4 -7 0z',COL.red,1.2);
 if(wd.collar||(uni&&!tod))tor+=P('M-7 '+n(y0-2)+'L-1 '+n(y0+5)+'L0 '+n(y0-2)+'Z',mix(top,'#ffffff',0.5),1.5)+P('M7 '+n(y0-2)+'L1 '+n(y0+5)+'L0 '+n(y0-2)+'Z',mix(top,'#ffffff',0.5),1.5);
 if(wd.collar&&!uni)tor+=L('M0.5 '+n(y0+6)+'L0.5 '+n(y1-3),INK,1.2,O(0.45))+C(0.5,y0+12,1.1,INK,0)+C(0.5,y0+22,1.1,INK,0);
 if(wd.pocket)tor+=R(-sw+4,y0+10,8,7,1.5,mix(top,'#000',0.06),1.2);
 if(wd.dots)tor+=C(-6,y0+10,2,mix(top,'#fff',0.45),0)+C(5,y0+18,2,mix(top,'#fff',0.45),0)+C(-4,y0+27,2,mix(top,'#fff',0.45),0)+C(8,y0+31,2,mix(top,'#fff',0.45),0)+C(-9,y0+20,1.6,mix(top,'#fff',0.45),0);
 if(fem&&!kid&&hs!=='tudung')tor+=P('M-5 '+n(y0-1)+'L0 '+n(y0+6)+'L5 '+n(y0-1)+'Z',skin,1.3);
 if(wd.lanyard&&a.who==='teacher')tor+=L('M-7 '+n(y0)+'L-1 '+n(y0+19)+'M7 '+n(y0)+'L1 '+n(y0+19),COL.red,1.6)+R(-4,y0+18,8,10,1.5,'#fff',1.3)+R(-2.5,y0+20,5,3,0,COL.blue,0);
 if(ht==='back')tor+=limb([[sw-6,y0+1],[sw-5,y0+22]],3,'#E07D2E');
 s+=G(tor,torT);
 /* neck (adults) */
 /* head */
 s+=G(hp.f,headT);
 /* held props */
 var held='';
 if(hk&&!lie){
  if(oneHold){var A=handPos==='f'?Lm.af[2]:Lm.an[2],gp=pr.grip||[0,-pr.h/2];
   if(pn==='fall')held=G(pr.d({}),T(b.hr*2.4,gy,1,-15));
   else held=G(pr.d({}),T(A[0]-gp[0],A[1]-gp[1]));}
  else if(ht==='two'){if(pn==='fall'||!Bp)held=G(pr.d({}),T(b.hr*2.6,gy,1,pn==='fall'?-12:0));else held=G(pr.d({}),T(Bp[0],Bp[1]));}
  else if(ht==='hang'){var A2=Lm.an[2];if(FREEHAND[pn])A2=Lm.af[2];held=G(pr.d({}),T(A2[0]-pr.grip[0],A2[1]-pr.grip[1]));}
  else if(ht==='umb'){var A3=Lm.an[2],cx=A3[0]-b.hr*0.3,cy=H[1]-b.hr-12,rr=b.hr*2.1;held=umbrellaOpen(cx,cy,rr,A3);}
  else if(ht==='long'&&geo.long){held=G(pr.d({}),T(geo.long.B[0],geo.long.B[1],1,geo.long.r));}
  else if(ht==='kite'){var A4=Lm.an[2],kx=A4[0]+52,ky=A4[1]-62;held=L('M'+n(A4[0])+' '+n(A4[1])+'Q'+n(kx-20)+' '+n(ky+10)+' '+n(kx)+' '+n(ky-30),INK,1.1)+G(pr.d({}),T(kx,ky));}
  else if(ht==='leash'){var A5=Lm.an[2],dx=A5[0]+44;front+=G(pr.d({}),T(dx,gy));held=L('M'+n(A5[0])+' '+n(A5[1])+'Q'+n((A5[0]+dx+18)/2)+' '+n(Math.max(A5[1],gy-28)+8)+' '+n(dx+17)+' '+n(gy-33),COL.red,1.8);}
  else if(ht==='bike'&&pn==='sit'){}
 }
 if(ht==='two'&&Bp&&pn!=='fall')s+=armSVG(Lm.an,true);
 s+=held;
 if(ff)s+=armSVG(Lm.af,false);
 if(cane){var Ac=Lm.an[2];s+=limb([[Ac[0]-3,Ac[1]-3],[Ac[0]+4,gy-1]],2.6,'#8B5E3C')+L('M'+n(Ac[0]-3)+' '+n(Ac[1]-3)+'q-1 -6 -7 -3',INK,4.5)+L('M'+n(Ac[0]-3)+' '+n(Ac[1]-3)+'q-1 -6 -7 -3','#8B5E3C',2.6);}
 var two=ht==='two'&&Bp&&pn!=='fall';
 if(!two)s+=armSVG(Lm.an,true);
 if(two){s+=C(Lm.af[2][0],Lm.af[2][1],b.hand,skin,SW*0.9)+C(Lm.an[2][0],Lm.an[2][1],b.hand,skin,SW*0.9);}
 if(pd.wave){var Hw=Lm.an[2];s+=L('M'+n(Hw[0]+9)+' '+n(Hw[1]-7)+'q5 7 0 14M'+n(Hw[0]+15)+' '+n(Hw[1]-10)+'q7 10 0 20M'+n(Hw[0]-9)+' '+n(Hw[1]-7)+'q-5 7 0 14',INK,1.8);}
 if(pd.clap){var Hc=[(Lm.an[2][0]+Lm.af[2][0])/2+2,(Lm.an[2][1]+Lm.af[2][1])/2];s+=L('M'+n(Hc[0])+' '+n(Hc[1]-9)+'l0 -6M'+n(Hc[0]+7)+' '+n(Hc[1]-7)+'l5 -5M'+n(Hc[0]-7)+' '+n(Hc[1]-7)+'l-5 -5M'+n(Hc[0]+9)+' '+n(Hc[1])+'l6 0',INK,1.8);}
 s+=front;
 var body=s;
 if(lie){
  var minx=(b.hy-b.hipy)-b.hr,maxx=-hipY,ty=-(hipY+b.shw)-1;
  body=G(G(s,'rotate(-90 0 '+n(hipY)+')'),'translate('+n(-(minx+maxx)/2)+' '+n(ty+gy)+')');
  geo.lie={head:(b.hy-b.hipy)-(minx+maxx)/2,feet:maxx-(minx+maxx)/2,thick:b.shw*2+2,neck:(b.shy-b.hipy)-(minx+maxx)/2};
 }
 return {svg:back+body,shadow:shadow,geo:geo,b:b,pose:pn};
}

/* ---------------------------------------------------------------
   PROPS — origin = bottom centre, facing right, natural size (child = 125)
   --------------------------------------------------------------- */
var PR={};
function dp(k,w,h,z,f,x){var o={d:f,w:w,h:h,z:z};if(x)for(var e in x)o[e]=x[e];PR[k]=o;}
var WOOD='#C98B4F',DWOOD='#8B5E3C',MET='#B4BCC9',S2=2;
function wheel(x,y,r){return C(x,y,r,'none',0)+C(x,y,r,'#fff',0,O(0))+C(x,y,r-1,'none',4.2)+C(x,y,r*0.62,'none',1.2)+L('M'+n(x-r*0.62)+' '+n(y)+'L'+n(x+r*0.62)+' '+n(y)+'M'+n(x)+' '+n(y-r*0.62)+'L'+n(x)+' '+n(y+r*0.62),INK,1,O(0.5))+C(x,y,2.2,INK,0);}
function umbrellaOpen(cx,cy,r,hand){
 var s='',seg=4,i,x0,x1,top=cy-r*0.72;
 var d='M'+n(cx-r)+' '+n(cy)+'Q'+n(cx-r*0.95)+' '+n(top)+' '+n(cx)+' '+n(top)+'Q'+n(cx+r*0.95)+' '+n(top)+' '+n(cx+r)+' '+n(cy);
 for(i=seg;i>0;i--){x1=cx-r+2*r*(i-1)/seg;x0=cx-r+2*r*i/seg;d+='Q'+n((x0+x1)/2)+' '+n(cy-r*0.14)+' '+n(x1)+' '+n(cy);}
 s+=P(d+'Z',COL.red,SW);
 s+=P('M'+n(cx-r*0.5)+' '+n(cy)+'Q'+n(cx-r*0.32)+' '+n(top+r*0.15)+' '+n(cx)+' '+n(top)+'Q'+n(cx-r*0.12)+' '+n(top+r*0.2)+' '+n(cx)+' '+n(cy)+'Q'+n(cx-r*0.25)+' '+n(cy-r*0.14)+' '+n(cx-r*0.5)+' '+n(cy)+'Z',COL.yellow,1.4);
 s+=P('M'+n(cx+r*0.5)+' '+n(cy)+'Q'+n(cx+r*0.62)+' '+n(top+r*0.25)+' '+n(cx)+' '+n(top)+'Q'+n(cx+r*0.3)+' '+n(top+r*0.2)+' '+n(cx+r*0.5)+' '+n(cy)+'Z',COL.yellow,1.4);
 s+=L('M'+n(cx)+' '+n(top)+'l0 -5',INK,2.4);
 if(hand){s=limb([[cx,cy],[hand[0],hand[1]+6]],1.6,'#6B6F80')+s+L('M'+n(hand[0])+' '+n(hand[1]+6)+'q0 7 -5 7q-4 0 -4 -4',INK,2.6);}
 return s;
}
dp('wallet',20,13,'f',function(){return R(-10,-13,20,13,3,'#8B5E3C',S2)+P('M-10 -9L10 -9L10 -6Q0 -3 -10 -6Z','#A9744B',1.4)+R(3,-9,7,5,1.5,'#6E4A30',1.3)+C(7,-6.5,1.2,'#F6C343',0)+L('M-7 -11L6 -11',mix('#8B5E3C','#fff',0.3),1,O(0.8));},{grip:[-6,-4]});
dp('money',24,14,'f',function(){var g='#8FD19E';return G(R(-11,-12,22,11,1.5,g,1.6)+E(0,-6.5,3.4,3.4,'none',1.1)+L('M-8 -9L-5 -9M5 -4L8 -4',INK,1),'rotate(-10)')+G(R(-11,-12,22,11,1.5,'#7CC48C',1.6)+E(0,-6.5,3.4,3.4,'none',1.1),'translate(-1 3) rotate(4)')+C(10,-4,4.2,COL.yellow,1.4)+C(10,-4,2,'none',0.9);},{grip:[-8,-4]});
dp('ball',24,24,'f',function(){return C(0,-12,12,COL.red,S2)+P('M-11 -16Q0 -10 11 -16L11.5 -10Q0 -4 -11.5 -10Z','#fff',1.4)+E(-5,-17,3,2,'#fff',0,O(0.7));});
dp('bicycle',112,64,'b',function(){
 var s='',fr=COL.red;
 s+=wheel(-36,-18,17)+wheel(36,-18,17);
 s+=limb([[-36,-18],[-2,-18],[-12,-42],[-36,-18]],3.4,fr)+limb([[-12,-42],[24,-44],[28,-36],[-2,-18]],3.4,fr)+limb([[26,-40],[36,-18]],3,fr);
 s+=limb([[24,-44],[21,-55],[14,-56]],2.4,'#6B6F80')+limb([[14,-56],[10,-56]],3.4,INK);
 s+=limb([[-12,-42],[-13,-46]],2.4,'#6B6F80')+P('M-22 -47Q-13 -51 -5 -47Q-6 -44 -13 -44Q-21 -44 -22 -47Z',INK,1.2);
 s+=C(-2,-18,4.2,'#9AA3B5',1.6)+L('M4 -13L-8 -23',INK,2.2)+R(2,-14,6,2.6,1,INK,0)+R(-11,-24.5,6,2.6,1,INK,0);
 s+=P('M-30 -36Q-38 -36 -48 -30',COL.red,0,O(0))+L('M-26 -34L-48 -32',INK,2,O(0.0));
 return s;});
dp('scooter',46,62,'b',function(){return limb([[16,-8],[12,-58]],2.6,'#6B6F80')+limb([[6,-59],[19,-60]],3.2,INK)+R(-21,-11,38,5.5,2.5,COL.teal,1.8)+P('M14 -8L20 -3',INK,2)+C(-17,-4,4.5,INK,0)+C(-17,-4,1.6,'#fff',0)+C(18,-4,4.5,INK,0)+C(18,-4,1.6,'#fff',0);});
function dog(sc,col,head,spot){
 var s='',hx=20,hy=-30;
 s+=limb([[-13,-18],[-14,-3]],5.5,col)+limb([[12,-18],[13,-3]],5.5,col);
 s+=L('M-20 -26Q-31 -34 -26 -44',INK,7)+L('M-20 -26Q-31 -34 -26 -44',col,3.6);
 s+=E(-2,-23,21,11.5,col,S2);
 if(spot)s+=E(-8,-26,7,5,spot,0);
 s+=limb([[-8,-18],[-9,-3]],5.5,col)+limb([[7,-18],[8,-3]],5.5,col);
 s+=G(C(0,0,12*head,col,S2)+E(9,3,7.5,5.5,mix(col,'#fff',0.45),1.6)+E(15,1,2.6,2.2,INK,0)+C(3,-3,2,INK,0)+C(3.6,-3.7,0.7,'#fff',0)+P('M-9 -6Q-14 4 -7 9Q-3 6 -3 -2Z',mix(col,'#000',0.3),1.6)+L('M7 6.5Q10 8.5 13 6.5',INK,1.1),'translate('+hx+' '+hy+') scale('+head+')');
 s+=L('M'+(hx-9)+' '+(hy+8)+'Q'+hx+' '+(hy+13)+' '+(hx+5)+' '+(hy+9),COL.red,2.6);
 return G(s,sc!==1?'scale('+sc+')':'');
}
dp('dog',60,48,'f',function(){return dog(1,'#D9A066',1,'#8B5E3C');});
dp('puppy',36,32,'f',function(){return dog(0.62,'#E8C08A',1.35,null);});
function cat(sc,col,stripe,head){
 var s='';
 s+=L('M-10 -3Q-24 -4 -22 -14Q-21 -22 -14 -20',INK,6.5)+L('M-10 -3Q-24 -4 -22 -14Q-21 -22 -14 -20',col,3.2);
 s+=P('M-12 0Q-16 -20 -2 -24Q12 -24 10 -8Q10 0 -12 0Z',col,S2);
 s+=L('M-2 -2L-2 -10M4 -2L4 -9',INK,1.4,O(0.6));
 var hd=P('M-11 -2Q-12 -14 -9 -20L-4 -12Q0 -14 4 -12L9 -20Q12 -14 11 -2Q8 8 0 8Q-8 8 -11 -2Z',col,S2)+C(-4,-2,1.7,INK,0)+C(5,-2,1.7,INK,0)+P('M-1 2L1 2L0 3.5Z',COL.pink,0.8)+L('M-8 3L-15 1M-8 5L-15 6M8 3L15 1M8 5L15 6',INK,0.8,O(0.6))+L('M-2 5Q0 6.5 2 5',INK,0.9);
 if(stripe)hd+=L('M-3 -11L-2 -7M0 -12L0 -7.5M3 -11L2 -7',stripe,1.5);
 s+=G(hd,'translate(4 -26) scale('+head+')');
 return G(s,sc!==1?'scale('+sc+')':'');
}
dp('cat',36,38,'f',function(){return cat(1,'#F2A65A','#C46A22',1);});
dp('kitten',26,28,'f',function(){return cat(0.66,'#C5CAD6','#8C93A6',1.25);});
dp('bird',20,18,'f',function(){return L('M-2 -2L-3 0M2 -2L3 0',INK,1.2)+P('M-8 -9L-15 -11L-12 -6Z','#5C7FB8',1.2)+E(-1,-8,8,6,'#6E9BD8',1.6)+C(5,-13,4.6,'#6E9BD8',1.6)+P('M9 -14L13 -12.5L9 -11Z',COL.orange,1)+C(6,-14,1,INK,0)+P('M-6 -9Q-1 -5 3 -8',INK,0.9,O(0.6));},{grip:[0,0]});
function vaseBody(){return P('M-8 0Q-15 -14 -10 -26Q-6 -31 -6 -35L-7.5 -39L7.5 -39L6 -35Q6 -31 10 -26Q15 -14 8 0Z','#fff',S2)+P('M-11.5 -18Q0 -14 11.5 -18L12 -12Q0 -8 -12 -12Z','#3E7CD6',0)+L('M-6 -34L6 -34',COL.blue,1.6)+C(-3,-24,2,COL.blue,0)+C(3,-26,1.5,COL.blue,0)+C(0,-5,1.8,COL.blue,0);}
dp('vase',24,40,'f',vaseBody);
dp('vase-broken',54,16,'f',function(){return P('M-26 0L-20 -10L-12 -6L-14 0Z','#fff',1.6)+P('M-10 0L-6 -14L4 -12L6 0Z','#fff',1.6)+P('M-4 -11L5 -10L5 -7L-5 -7Z',COL.blue,0)+P('M10 0L16 -9L24 -2L22 0Z','#fff',1.6)+P('M-30 -2L-27 -6L-24 -2Z','#fff',1.2)+P('M26 -3L30 -6L31 -1Z','#fff',1.2)+P('M17 -7L21 -5L19 -3Z',COL.blue,0)+L('M-18 -8L-16 -4',COL.blue,1.4)+L('M-36 -7L-32 -9M34 -8L38 -10M0 -20L0 -24',INK,1.2,O(0.5));});
dp('umbrella',64,66,'f',function(){return umbrellaOpen(0,-44,32,null)+limb([[0,-44],[0,-6]],1.6,'#6B6F80')+L('M0 -6q0 6 -5 6q-4 0 -4 -4',INK,2.6);});
dp('schoolbag',30,36,'f',function(){return L('M-7 -34Q0 -42 7 -34',INK,3)+R(-14,-34,28,34,8,COL.orange,S2)+P('M-14 -26Q0 -18 14 -26L14 -20Q0 -12 -14 -20Z',mix(COL.orange,'#000',0.12),0)+R(-9,-15,18,12,4,'#E07D2E',1.6)+L('M-6 -11L6 -11',INK,1.2,O(0.6));},{grip:[0,-38]});
dp('phone',11,18,'f',function(){return R(-5.5,-18,11,18,2.5,INK,1)+R(-4,-16,8,13,1,'#7FD3F0',0)+C(0,-1.8,0.8,'#fff',0);},{grip:[0,-3]});
dp('book',26,30,'f',function(){return R(-11,-30,22,30,2.5,COL.red,S2)+R(-11,-30,5,30,2,mix(COL.red,'#000',0.22),1.4)+R(-2,-24,10,6,1,'#fff',0,O(0.85))+L('M9 -28L9 -2',INK,1,O(0.35));},{grip:[-9,-12]});
dp('books-pile',34,32,'f',function(){var s='',c=[COL.blue,COL.yellow,COL.green,COL.red],o=[0,-3,2,-1];for(var i=0;i<4;i++){var y=-8*(i+1);s+=R(-15+o[i],y,30,8,2,c[i],1.8)+R(10+o[i],y+2,4,4,1,'#fff',0);}return s;});
dp('cake',42,40,'f',function(){var s=E(0,-2,21,3.5,'#fff',S2)+R(-16,-24,32,21,4,'#F6E1C1',S2)+P('M-16 -18Q-16 -26 -12 -26L12 -26Q16 -26 16 -18Q12 -14 9 -19Q5 -13 1 -19Q-3 -13 -7 -19Q-11 -13 -16 -18Z',COL.pink,1.6)+R(-16,-11,32,3,0,'#D9A066',0);
 for(var i=-1;i<=1;i++)s+=R(i*8-1.6,-35,3.2,9,1,i?COL.blue:COL.yellow,1.2)+P('M'+(i*8)+' -42Q'+(i*8+3)+' -38 '+(i*8)+' -36Q'+(i*8-3)+' -38 '+(i*8)+' -42Z',COL.orange,0);
 return s;});
dp('plate',36,14,'f',function(){return E(0,-3.5,17,4.5,'#fff',S2)+P('M-10 -6Q-8 -15 0 -15Q8 -15 10 -6Z','#F6D27A',1.6)+C(-3,-10,1.6,COL.green,0)+C(3,-12,1.4,COL.red,0)+C(2,-8,1.4,COL.green,0);});
dp('bowl',30,26,'f',function(){return L('M4 -14L16 -26M8 -13L19 -24',DWOOD,2)+P('M-14 -13L14 -13Q13 0 0 0Q-13 0 -14 -13Z','#fff',S2)+P('M-13.5 -9L13.5 -9L13 -6L-13 -6Z',COL.blue,0)+P('M-12 -13Q-8 -17 -4 -13Q0 -17 4 -13Q8 -17 12 -13Z','#F6D27A',1.2);});
dp('tray',50,22,'f',function(){return R(-24,-5,48,5,2,'#E08A4A',S2)+P('M-17 -5L-15 -16L-7 -16L-5 -5Z','#fff',1.6)+R(-15.5,-15,7,3,1,DWOOD,0)+P('M2 -12L18 -12Q17 -5 10 -5Q3 -5 2 -12Z','#fff',1.6)+P('M3 -12Q6 -15 10 -12Q14 -15 17 -12Z','#F6D27A',1);});
dp('cup',15,16,'f',function(){return E(0,-1.5,8,2,'#fff',1.5)+L('M5 -11Q11 -11 10 -7Q9 -4 5 -5',INK,1.6)+P('M-6 -13L6 -13L5 -2Q0 0 -5 -2Z','#fff',1.8)+E(0,-12.5,5.5,1.4,DWOOD,0);},{grip:[-5,-7]});
dp('trophy',30,42,'f',function(){var g=COL.yellow;return L('M-11 -36Q-19 -36 -17 -29Q-15 -24 -9 -25M11 -36Q19 -36 17 -29Q15 -24 9 -25',INK,2.2)+P('M-12 -40L12 -40Q12 -24 0 -20Q-12 -24 -12 -40Z',g,S2)+R(-2.5,-21,5,8,1,g,1.5)+R(-8,-14,16,5,1.5,g,1.6)+R(-11,-9,22,9,2,DWOOD,1.8)+star5(0,-31,5,'#fff',1)+P('M-8 -38Q-8 -28 -3 -24',  'none',0)+L('M-8 -37Q-8 -29 -4 -25','#fff',1.6,O(0.7));});
dp('medal',18,36,'f',function(){return P('M-8 -36L-2 -36L3 -15L-1 -14Z',COL.blue,1.4)+P('M8 -36L2 -36L-3 -15L1 -14Z',COL.red,1.4)+C(0,-8,8,COL.yellow,S2)+star5(0,-8,4,'#fff',0.9);},{grip:[0,-35]});
dp('kite',44,60,'f',function(){return L('M0 -12Q-8 -6 -2 0',INK,1.2)+P('M-4 -6L0 -8L-1 -4Z',COL.yellow,1)+P('M-4 -1L0 -3L-1 1Z',COL.blue,1)+P('M0 -58L17 -35L0 -12L-17 -35Z',COL.red,S2)+P('M0 -58L17 -35L0 -35Z',COL.yellow,0)+P('M0 -12L-17 -35L0 -35Z',COL.yellow,0)+P('M0 -58L17 -35L0 -12L-17 -35Z','none',S2)+L('M0 -58L0 -12M-17 -35L17 -35',INK,1.2);},{y:120});
dp('puddle',72,10,'b',function(){return E(0,-4,35,5.5,'#9CCBEA',1.6)+E(-8,-5,14,2,'#fff',0,O(0.55))+L('M10 -4Q16 -6 22 -4',  '#fff',1.2,O(0.7));});
dp('tree',130,200,'b',function(){return P('M-8 0L-6 -70Q-20 -84 -30 -92M-6 -70L-4 -100M6 0L5 -76Q18 -86 30 -94',DWOOD,0)+P('M-9 0Q-6 -40 -7 -80L7 -80Q6 -40 9 0Z',DWOOD,S2)+L('M-5 -76Q-18 -86 -28 -92M5 -78Q16 -88 28 -96',INK,6)+L('M-5 -76Q-18 -86 -28 -92M5 -78Q16 -88 28 -96',DWOOD,3.4)+blob([[0,-150,40],[-38,-128,30],[38,-126,30],[-56,-104,20],[56,-104,20],[-20,-110,28],[22,-108,28],[-24,-170,26],[24,-170,26],[0,-176,22]],'#6BBF73',S2)+C(-20,-160,14,'#86CF8A',0)+C(26,-136,10,'#86CF8A',0)+C(-40,-122,8,'#86CF8A',0);});
dp('bench',92,48,'b',function(){return R(-38,-30,5,30,1.5,'#555B70',1.6)+R(33,-30,5,30,1.5,'#555B70',1.6)+R(-44,-48,88,6,2.5,WOOD,1.8)+R(-44,-40,88,6,2.5,WOOD,1.8)+L('M-36 -34L-36 -42M36 -34L36 -42',INK,2)+R(-46,-34,92,6,2.5,'#D99A5B',S2);},{seat:32});
dp('bus',232,124,'b',function(){var s='';
 s+=R(-114,-118,228,104,14,'#F4F1E8',S2)+P('M-114 -46L114 -46L114 -28Q114 -14 100 -14L-100 -14Q-114 -14 -114 -28Z',COL.green,0)+R(-114,-118,228,104,14,'none',S2)+L('M-114 -46L114 -46',INK,1.4);
 for(var i=0;i<5;i++)s+=R(-104+i*36,-104,30,36,4,'#9FD0EA',1.6)+L('M'+(-98+i*36)+' -98L'+(-90+i*36)+' -90',  '#fff',2,O(0.7));
 s+=R(78,-104,28,60,4,'#9FD0EA',1.8)+L('M92 -104L92 -44',INK,1.4)+R(-104,-118,140,8,3,COL.orange,0)+R(108,-110,8,62,3,'#9FD0EA',1.6)+R(106,-40,10,8,2,COL.yellow,1.4);
 s+=C(-70,-14,16,INK,0)+C(-70,-14,7,'#C9CED8',0)+C(70,-14,16,INK,0)+C(70,-14,7,'#C9CED8',0);
 return s;});
dp('car',152,62,'b',function(){return P('M-70 -14Q-74 -34 -60 -36L-40 -38Q-28 -60 -2 -60L22 -60Q40 -58 52 -38L66 -34Q76 -30 74 -14Z',COL.blue,S2)+P('M-34 -38Q-24 -54 -4 -54L-4 -38Z','#BFE3F5',1.6)+P('M2 -54L20 -54Q34 -52 44 -38L2 -38Z','#BFE3F5',1.6)+R(64,-32,8,6,2,COL.yellow,1.2)+R(-72,-30,6,6,2,COL.red,1.2)+L('M-10 -28L-2 -28M18 -28L26 -28',INK,1.6)+C(-44,-14,13,INK,0)+C(-44,-14,5.5,'#C9CED8',0)+C(46,-14,13,INK,0)+C(46,-14,5.5,'#C9CED8',0);});
dp('letter',22,15,'f',function(){return R(-11,-15,22,15,1.5,'#fff',1.8)+L('M-11 -15L0 -6L11 -15',INK,1.4)+R(5,-13,4,4.5,0.5,COL.red,0.8);},{grip:[-8,-4]});
dp('gift',32,36,'f',function(){return R(-14,-24,28,24,2,COL.purple,S2)+R(-3,-24,6,24,0,COL.yellow,1.2)+R(-16,-30,32,7,2,'#9E82DD',S2)+R(-3,-30,6,7,0,COL.yellow,1.2)+P('M0 -30Q-12 -40 -9 -31Z',COL.yellow,1.4)+P('M0 -30Q12 -40 9 -31Z',COL.yellow,1.4);});
dp('flowerpot',30,46,'f',function(){var s=L('M0 -20L0 -34M-1 -22L-9 -30M1 -22L9 -32',COL.green,2.4)+E(-6,-25,4,2,COL.green,0)+E(6,-26,4,2,COL.green,0);
 [[-9,-31,COL.red],[0,-38,COL.yellow],[9,-33,COL.pink]].forEach(function(f){s+=blob([[f[0]-3.5,f[1],3.2],[f[0]+3.5,f[1],3.2],[f[0],f[1]-3.5,3.2],[f[0],f[1]+3.5,3.2]],f[2],1.2)+C(f[0],f[1],2,COL.yellow,0.8);});
 return s+P('M-11 -20L11 -20L8 0L-8 0Z','#D9774E',S2)+R(-13,-22,26,5,2,'#E5885E',1.8);});
dp('bottle',12,32,'f',function(){return R(-5.5,-28,11,28,3.5,'#9FDAF2',1.8)+R(-3.5,-32,7,5,1.2,COL.blue,1.4)+R(-5.5,-18,11,7,0,'#fff',1.2)+L('M-2.5 -25L-2.5 -21',  '#fff',1.4);},{grip:[0,-14]});
dp('toy',28,34,'f',function(){var c='#C98B4F',l='#E8C08A';return C(-8,-31,4.5,c,1.6)+C(8,-31,4.5,c,1.6)+E(-9,-4,5,4,c,1.6)+E(9,-4,5,4,c,1.6)+E(0,-11,9,10,c,1.8)+E(0,-10,5,6,l,0)+E(-10,-14,3.5,5,c,1.4)+E(10,-14,3.5,5,c,1.4)+C(0,-27,9.5,c,1.8)+E(0,-24,4.5,3.4,l,1)+C(0,-25.5,1.3,INK,0)+C(-3.6,-29,1.2,INK,0)+C(3.6,-29,1.2,INK,0)+P('M-4 -19L0 -17L4 -19L4 -15L0 -16.5L-4 -15Z',COL.red,0.9);},{grip:[-9,-14]});
dp('banana-peel',28,10,'f',function(){var y=COL.yellow;return P('M-2 -4Q-12 -10 -14 -2Q-9 -6 -4 -2Z',y,1.5)+P('M2 -4Q12 -10 14 -1Q9 -5 4 -2Z',y,1.5)+P('M0 -3Q-4 2 -1 2Q4 2 0 -3Z','#E8B830',1.3)+P('M-3 -5Q-1 -12 2 -12Q4 -10 3 -5Z',y,1.5)+L('M1 -12L2 -14',INK,1.6);},{grip:[0,-9]});
dp('fishtank',62,48,'f',function(){return R(-30,-46,60,40,4,'#CDEFF9',S2)+R(-28,-38,56,30,2,'#8FD3EE',0,O(0.8))+R(-28,-12,56,5,0,'#EBD6A0',0)+P('M-18 -12Q-22 -22 -16 -30M-14 -12Q-12 -20 -16 -26M20 -12Q24 -22 18 -28',COL.green,0)+L('M-18 -12Q-22 -22 -16 -30M-14 -12Q-12 -20 -16 -26M20 -12Q24 -22 18 -28',COL.green,2.4)+P('M-2 -26Q4 -32 10 -26Q4 -20 -2 -26Z M-2 -26L-7 -30L-7 -22Z',COL.orange,1.2)+C(7,-27,0.9,INK,0)+P('M2 -16Q6 -20 10 -16Q6 -12 2 -16ZM2 -16L-1 -19L-1 -13Z',COL.yellow,1)+R(-30,-46,60,40,4,'none',S2)+R(-32,-7,64,7,2,'#555B70',1.8)+C(-10,-34,1.6,'#fff',0.6)+C(-8,-38,1.2,'#fff',0.6);});
dp('basket',40,44,'f',function(){var b='#D9A85E';return L('M-15 -22Q0 -48 15 -22',INK,5)+L('M-15 -22Q0 -48 15 -22',b,2.6)+E(-6,-24,5,5,COL.red,1.4)+P('M3 -22L9 -36L12 -35L7 -22Z',COL.green,1.3)+E(8,-23,6,4,COL.orange,1.3)+P('M-18 -22L18 -22L14 0L-14 0Z',b,S2)+L('M-17 -15L17 -15M-15.5 -8L15.5 -8M-8 -22L-7 0M0 -22L0 0M8 -22L7 0',mix(b,'#000',0.3),1.1);},{grip:[0,-40]});
dp('broom',20,84,'f',function(){return limb([[0,-84],[0,-18]],2.4,DWOOD)+P('M-4 -20L4 -20L11 0L-11 0Z','#E8C66A',S2)+L('M-6 -10L-8 -1M-2 -12L-3 -1M2 -12L3 -1M6 -10L8 -1',mix('#E8C66A','#000',0.3),1)+R(-5,-22,10,4,1,COL.red,1.4);});
dp('firstaid',32,30,'f',function(){return L('M-6 -22L-6 -27L6 -27L6 -22',INK,2.4)+R(-15,-22,30,22,3,'#fff',S2)+R(-15,-22,30,5,2,COL.green,1.2)+R(-3,-15,6,12,0.8,COL.green,0)+R(-6,-12,12,6,0.8,COL.green,0);},{grip:[0,-27]});
dp('icecream',16,34,'f',function(){return P('M-6 -16L6 -16L0 0Z','#E3A857',1.8)+L('M-4 -12L2 -4M0 -15L4 -9M4 -14L-2 -5',mix('#E3A857','#000',0.3),0.9)+C(0,-19,6.5,COL.pink,1.8)+C(0,-27,5.5,'#FFF4D6',1.8)+C(-2,-29,1.2,'#fff',0)+P('M-5 -16Q-5 -12 -3 -14Z',COL.pink,0);},{grip:[0,-5]});
dp('laptop',38,26,'f',function(){return P('M-14 -24L14 -24L16 -4L-16 -4Z','#9AA3B5',S2)+P('M-11.5 -21.5L11.5 -21.5L13 -7L-13 -7Z','#7FD3F0',0)+L('M-8 -17L3 -17M-8 -13L6 -13',  '#fff',1.4,O(0.8))+R(-19,-5,38,5,2,'#C9CED8',S2);});
dp('drum',32,34,'f',function(){var s=R(-14,-24,28,22,2,COL.red,S2)+L('M-14 -22L-6 -6L2 -22L10 -6L14 -14',  '#fff',1.4)+E(0,-24,14,4,'#F4F1E8',S2)+E(0,-2,14,3.5,'none',S2)+R(-14,-6,28,4,1,'#C9CED8',1.4)+R(-14,-24,28,3.5,1,'#C9CED8',1.4);return L('M-16 -36L4 -25M16 -36L-4 -25',DWOOD,2.8)+s;});
dp('desk',92,52,'b',function(){return R(-40,-44,4,44,1,'#3E7CD6',1.6)+R(36,-44,4,44,1,'#3E7CD6',1.6)+R(-38,-38,76,10,2,'#9FB6DA',1.6)+R(-46,-50,92,7,2.5,'#E1B987',S2)+R(-42,-3,10,3,1,INK,0)+R(32,-3,10,3,1,INK,0);});
dp('chair',40,64,'b',function(){return limb([[-18,-30],[-20,0]],2.6,'#6B6F80')+limb([[10,-30],[12,0]],2.6,'#6B6F80')+limb([[-20,-32],[-23,-60]],2.6,'#6B6F80')+R(-28,-62,9,24,3,'#D99A5B',1.8)+R(-24,-36,38,6,2.5,'#D99A5B',S2);},{seat:32});
dp('table',112,56,'b',function(){return R(-5,-48,10,44,2,'#9AA3B5',1.8)+P('M-20 0Q-20 -6 0 -6Q20 -6 20 0Z','#9AA3B5',1.8)+R(-54,-56,108,9,4,'#EDE7DB',S2)+R(-48,-48,96,4,1,'#C9C2B2',1.4);});
dp('bed',140,62,'b',function(){return R(-70,-62,10,62,3,'#B07A4F',S2)+R(60,-34,8,34,3,'#B07A4F',S2)+R(-62,-30,124,14,3,'#C98B4F',S2)+R(-60,-40,120,11,4,'#fff',S2)+P('M-58 -40Q-58 -52 -48 -52L-30 -52Q-24 -52 -24 -40Z','#fff',S2)+R(-62,-16,4,16,1,'#8B5E3C',0)+R(56,-16,4,16,1,'#8B5E3C',0);},{seat:40});
function blanket(x0,x1,ytop,ybot){return P('M'+n(x0)+' '+n(ybot)+'L'+n(x0)+' '+n(ytop+6)+'Q'+n(x0)+' '+n(ytop)+' '+n(x0+8)+' '+n(ytop)+'L'+n(x1-6)+' '+n(ytop)+'Q'+n(x1)+' '+n(ytop)+' '+n(x1)+' '+n(ytop+6)+'L'+n(x1)+' '+n(ybot)+'Z','#7FB8E6',SW)+L('M'+n(x0+4)+' '+n(ytop+6)+'L'+n(x1-4)+' '+n(ytop+6),'#fff',2,O(0.6))+L('M'+n(x0+4)+' '+n(ybot-5)+'L'+n(x1-4)+' '+n(ybot-5),'#5A96CC',2);}
dp('lamp',34,112,'b',function(ctx){return (ctx&&ctx.night?C(0,-92,34,'#FFE9A8',0,O(0.35)):'')+E(0,-3,13,3.5,'#6B6F80',S2)+limb([[0,-5],[0,-88]],2.4,'#6B6F80')+P('M-12 -86L12 -86L8 -110L-8 -110Z','#FFF0C8',S2)+L('M-10 -92L10 -92',COL.orange,1.6);});
dp('window',72,72,'b',function(ctx){return R(-36,-72,72,72,3,'#fff',S2)+winView(-31,-67,62,62,ctx||{})+L('M0 -67L0 -5M-31 -36L31 -36','#fff',4)+R(-36,-72,72,72,3,'none',S2)+R(-40,-4,80,5,2,'#E9E2D3',1.6);},{y:175});
dp('door',76,172,'b',function(){return R(-38,-172,76,172,3,'#B07A4F',S2)+R(-28,-160,56,66,3,'#C08B5C',1.6)+R(-28,-84,56,74,3,'#C08B5C',1.6)+C(26,-84,3.4,COL.yellow,1.6);});
dp('stairs',104,84,'b',function(){var s='',p=[[-52,0]],i;for(i=0;i<6;i++){p.push([-52+i*17,-(i+1)*14]);p.push([-52+(i+1)*17,-(i+1)*14]);}p.push([50,0]);s+=P(pl(p,1),'#D9D4C8',S2);for(i=0;i<6;i++)s+=L('M'+(-52+i*17)+' '+(-(i+1)*14+3)+'L'+(-35+i*17)+' '+(-(i+1)*14+3),'#fff',1.6,O(0.7));s+=limb([[-50,-40],[46,-112]],2.4,'#6B6F80')+limb([[-48,-40],[-48,-14]],2,'#6B6F80')+limb([[0,-76],[0,-56]],2,'#6B6F80');return s;});
dp('lift',96,166,'b',function(){return R(-42,-160,84,160,3,'#C9CED8',S2)+R(-34,-148,33,148,1,'#DCE1E8',1.6)+R(1,-148,33,148,1,'#DCE1E8',1.6)+L('M-10 -140L-10 -10M10 -140L10 -10','#fff',2,O(0.7))+R(46,-96,10,22,2,'#9AA3B5',1.6)+C(51,-90,2.4,COL.yellow,1)+C(51,-80,2.4,'#fff',1)+R(-14,-158,28,8,2,INK,0)+P('M-7 -151L-4 -156L-1 -151Z',COL.green,0)+P('M2 -156L5 -151L8 -156Z',COL.red,0);});
dp('bin',32,48,'b',function(){return P('M-13 -40L13 -40L11 -4L-11 -4Z',COL.green,S2)+L('M-6 -34L-5 -9M0 -34L0 -9M6 -34L5 -9',mix(COL.green,'#000',0.3),1.4)+R(-16,-46,32,7,3,'#3E9A68',S2)+R(-4,-49,8,3,1,INK,0)+C(-8,-3,3,INK,0)+C(8,-3,3,INK,0);});
dp('signboard',52,92,'b',function(){return limb([[0,0],[0,-56]],3,'#6B6F80')+R(-24,-90,48,36,5,COL.blue,S2)+R(-20,-86,40,28,3,'none',1.2,' stroke="#fff"')+P('M-12 -72L4 -72L4 -78L14 -71L4 -64L4 -70L-12 -70Z','#fff',0)+R(-6,-3,12,3,1,INK,0);});
dp('shoppingbag',30,40,'f',function(){var c='#F4F1E8';return P('M-4 -22L-6 -40L-2 -40L1 -22Z',COL.green,1.4)+E(6,-28,5,7,'#E1B987',1.4)+L('M-9 -26Q-9 -38 -3 -38Q2 -38 2 -26M-2 -26Q-2 -38 4 -38Q9 -38 9 -26',INK,1.8)+P('M-13 -26L13 -26L11 0L-11 0Z',c,S2)+R(-8,-17,16,8,2,COL.orange,0);},{grip:[0,-38]});
dp('mop',22,90,'f',function(){return limb([[0,-90],[0,-14]],2.4,COL.blue)+R(-5,-17,10,5,1.5,'#9AA3B5',1.4)+P('M-5 -12Q-12 -4 -11 0L11 0Q12 -4 5 -12Z','#EDEAE2',S2)+L('M-7 -6L-8 0M-3 -8L-3 0M2 -8L2 0M6 -6L7 0',INK,0.9,O(0.6));});
dp('spill',64,12,'b',function(){return P('M-30 -2Q-34 -8 -24 -9Q-16 -12 -6 -8Q4 -12 16 -9Q30 -10 30 -4Q32 0 20 0L-24 0Q-32 1 -30 -2Z','#B9773F',1.6,O(0.9))+E(-6,-6,8,1.6,'#fff',0,O(0.4))+C(36,-6,2,'#B9773F',1)+C(-38,-4,1.6,'#B9773F',1)+C(26,-14,1.6,'#B9773F',1);});
dp('stone',22,14,'f',function(){return P('M-11 0Q-12 -8 -6 -11Q0 -14 6 -12Q12 -9 11 0Z','#A3A9B5',1.8)+L('M-4 -9Q0 -11 4 -9','#fff',1.4,O(0.6));},{grip:[-6,-5]});
dp('fence',124,52,'b',function(){var s=R(-60,-38,120,6,1.5,'#E8D2AE',1.6)+R(-60,-18,120,6,1.5,'#E8D2AE',1.6);for(var i=0;i<6;i++){var x=-56+i*22;s+=P('M'+x+' 0L'+x+' -42L'+(x+6)+' -50L'+(x+12)+' -42L'+(x+12)+' 0Z','#F4E6CC',1.8);}return s;});
dp('box',42,38,'f',function(){var c='#D9A86C';return P('M-20 -30L-26 -38L-4 -38L0 -30Z',mix(c,'#fff',0.15),1.6)+P('M20 -30L26 -38L4 -38L0 -30Z',mix(c,'#000',0.08),1.6)+R(-20,-30,40,30,2,c,S2)+L('M-6 -30L-6 -20L6 -20L6 -30',mix(c,'#000',0.25),1.3)+L('M-14 -8L-6 -8',INK,1.2,O(0.4));});
dp('sandcastle',56,48,'f',function(){var c='#E8C98A';return P('M-26 0L-26 -20L-20 -20L-20 -16L-14 -16L-14 -20L14 -20L14 -16L20 -16L20 -20L26 -20L26 0Z',c,S2)+P('M-12 -20L-12 -36L-8 -36L-8 -32L-3 -32L-3 -36L3 -36L3 -32L8 -32L8 -36L12 -36L12 -20Z',c,S2)+L('M0 -36L0 -48',INK,1.3)+P('M0 -48L9 -45L0 -42Z',COL.red,1.1)+P('M-5 0L-5 -9Q0 -14 5 -9L5 0Z',mix(c,'#000',0.3),1.3)+C(-18,-8,1.2,'#B89350',0)+C(17,-10,1.2,'#B89350',0);});
dp('bucket',26,30,'f',function(){return L('M-11 -22Q0 -34 11 -22',INK,2.2)+P('M-11 -22L11 -22L8 0L-8 0Z',COL.blue,S2)+R(-12.5,-24,25,4,1.5,'#5A8FE0',1.6)+L('M-6 -12L6 -12',  '#fff',1.6,O(0.7));},{grip:[0,-29]});
dp('clock',32,32,'b',function(){return C(0,-16,15,'#fff',S2)+C(0,-16,15,'none',3,' stroke="'+COL.red+'"')+C(0,-16,15,'none',1.2)+L('M0 -27L0 -25M0 -7L0 -5M-11 -16L-9 -16M9 -16L11 -16',INK,1.4)+L('M0 -16L0 -24M0 -16L6 -13',INK,1.8)+C(0,-16,1.4,INK,0);},{y:95});
dp('whiteboard',112,112,'b',function(){return limb([[-40,-40],[-46,-2]],2.2,'#9AA3B5')+limb([[40,-40],[46,-2]],2.2,'#9AA3B5')+C(-46,-2,2.5,INK,0)+C(46,-2,2.5,INK,0)+R(-54,-112,108,68,3,'#fff',S2)+R(-54,-112,108,68,3,'none',4,' stroke="#9AA3B5"')+R(-54,-112,108,68,3,'none',1.4)+L('M-42 -96L-6 -96M-42 -86L10 -86M-42 -76L-14 -76',COL.blue,2.2)+L('M14 -98Q30 -78 44 -96',COL.red,2.2)+R(-30,-46,60,3,1,'#9AA3B5',1);});
dp('shelf',74,112,'b',function(){var s=R(-36,-112,72,112,3,'#B07A4F',S2)+R(-31,-107,62,102,1,'#8B5E3C',0),c=[COL.red,COL.blue,COL.yellow,COL.green,COL.purple,COL.teal,COL.orange,COL.pink],k=0;
 for(var r=0;r<4;r++){var y=-10-r*25,x=-30;s+=R(-33,y,66,4,1,'#C98B4F',1.2);while(x<26){var w=5+((k*7)%4),h=15+((k*5)%6);s+=R(x,y-h,w,h,1,c[k%8],1);x+=w+0.6;k++;}}
 return s;});
dp('plant',44,74,'f',function(){var g='#4CAF7A',g2='#6BBF73';return P('M0 -18Q-20 -30 -22 -54Q-6 -48 0 -22Z',g,1.8)+P('M0 -18Q20 -30 24 -56Q6 -48 0 -22Z',g2,1.8)+P('M0 -20Q-6 -50 4 -72Q14 -48 2 -20Z',g2,1.8)+P('M0 -18Q-16 -24 -24 -38Q-8 -38 0 -22Z',g2,1.6)+P('M0 -18Q16 -22 22 -34Q8 -36 0 -22Z',g,1.6)+P('M-13 -20L13 -20L10 0L-10 0Z','#F4F1E8',S2)+R(-14,-22,28,5,2,'#E1DCCF',1.6);});
/* seats used automatically under sitting actors */
var SEAT={
 chair:{h:32,d:function(){return PR.chair.d();}},
 stool:{h:30,d:function(){return R(-12,-30,24,6,3,COL.red,S2)+P('M-9 -24L-11 0L11 0L9 -24Z',mix(COL.red,'#000',0.1),1.8);}},
 stone:{h:28,d:function(){return P('M-14 -26Q-14 -28 0 -28Q14 -28 14 -26L12 0L-12 0Z','#C9C2B2',S2)+E(0,-26,14,3,'#DCD6C8',1.6);}},
 bench:{h:32,d:function(){return R(-28,-30,5,30,1.5,'#555B70',1.6)+R(23,-30,5,30,1.5,'#555B70',1.6)+R(-34,-48,62,6,2.5,WOOD,1.8)+R(-34,-40,62,6,2.5,WOOD,1.8)+R(-36,-34,70,6,2.5,'#D99A5B',S2);}},
 sofa:{h:30,d:function(){return R(-26,-56,40,30,8,'#5BB5A2',S2)+R(-24,-32,50,30,6,'#5BB5A2',S2)+R(-22,-36,46,8,4,'#7CC8B7',1.8)+R(18,-44,12,40,5,'#4BA592',S2);}},
 mrt:{h:32,d:function(){return R(-26,-58,8,30,4,'#3E7CD6',S2)+R(-26,-36,52,8,4,'#3E7CD6',S2)+R(-20,-28,4,28,1,'#9AA3B5',1.4)+R(16,-28,4,28,1,'#9AA3B5',1.4);}}
};

/* ---------------------------------------------------------------
   SKY, WINDOWS, BACKGROUND HELPERS
   --------------------------------------------------------------- */
var BS=1.5; /* background outline */
function wet(w){return w==='rain'||w==='storm';}
function skyCol(ctx){var t=ctx.time,w=ctx.weather;
 if(t==='night')return wet(w)?'#1E2640':'#24335F';
 if(t==='evening')return wet(w)?'#B9918C':'#F6BC8E';
 return {sun:'#A9DCF5',cloud:'#CBD9E3',rain:'#A9B6C4',storm:'#7F8A9E'}[w]||'#BFE3F5';}
function cloud(x,y,s,f,op){return blob([[x-14*s,y,10*s],[x,y-6*s,13*s],[x+14*s,y,10*s],[x-5*s,y+3*s,10*s],[x+6*s,y+3*s,10*s]],f,0,op?O(op):'');}
function bolt(x,y,s){return P('M'+n(x)+' '+n(y)+'l'+n(-10*s)+' '+n(22*s)+'l'+n(8*s)+' 0l'+n(-6*s)+' '+n(20*s)+'l'+n(16*s)+' '+n(-27*s)+'l'+n(-8*s)+' 0l'+n(6*s)+' '+n(-15*s)+'Z',COL.yellow,1.2);}
function skyDeco(ctx,x,y,w,h,sc){
 var s='',t=ctx.time,wt=ctx.weather,r=rng(hash(x+','+y+','+w)),i;
 if(t==='night'){
  if(!wet(wt)){for(i=0;i<Math.round(w*h/2600)+2;i++)s+=star4(x+8+r()*(w-16),y+6+r()*(h*0.6),(1.6+r()*1.8)*Math.max(sc,0.6),'#FFF3C4',0);
   s+=C(x+w*0.8,y+h*0.22,11*sc,'#FFF3C4',0)+C(x+w*0.8+5*sc,y+h*0.22-3*sc,9.5*sc,skyCol(ctx),0);}
  else s+=cloud(x+w*0.3,y+h*0.2,1.4*sc,'#39415E')+cloud(x+w*0.72,y+h*0.25,1.6*sc,'#39415E');
  if(wt==='storm')s+=bolt(x+w*0.55,y+h*0.25,sc);
  return s;}
 if(t==='evening'&&!wet(wt)){s+=C(x+w*0.78,y+h*0.72,24*sc,'#FFD27A',0,O(0.9))+cloud(x+w*0.25,y+h*0.25,1.3*sc,'#F9D3C0',0.9)+cloud(x+w*0.55,y+h*0.15,1*sc,'#F9D3C0',0.8);return s;}
 if(wt==='rain'||wt==='storm'){var cc=wt==='storm'?'#5D6578':'#8E99AA';s+=cloud(x+w*0.18,y+h*0.16,1.8*sc,cc)+cloud(x+w*0.5,y+h*0.12,2.2*sc,cc)+cloud(x+w*0.82,y+h*0.18,1.9*sc,cc);if(wt==='storm')s+=bolt(x+w*0.62,y+h*0.22,1.3*sc);return s;}
 if(wt==='cloud'){s+=cloud(x+w*0.2,y+h*0.2,1.7*sc,'#F2F4F7')+cloud(x+w*0.55,y+h*0.13,2*sc,'#E6EAF0')+cloud(x+w*0.85,y+h*0.25,1.6*sc,'#F2F4F7');return s;}
 if(wt==='sun'){var sx=x+w*0.86,sy=y+h*0.22,rr=15*sc,ry='';for(i=0;i<8;i++){var a=i*Math.PI/4;ry+='M'+n(sx+Math.cos(a)*rr*1.35)+' '+n(sy+Math.sin(a)*rr*1.35)+'L'+n(sx+Math.cos(a)*rr*1.8)+' '+n(sy+Math.sin(a)*rr*1.8);}s+=L(ry,COL.yellow,3*Math.max(sc,0.5))+C(sx,sy,rr,COL.yellow,0)+cloud(x+w*0.25,y+h*0.25,1.1*sc,'#fff',0.9);return s;}
 s+=cloud(x+w*0.22,y+h*0.22,1.2*sc,'#fff',0.95)+cloud(x+w*0.68,y+h*0.14,0.9*sc,'#fff',0.85);
 if(wt==='wind')s+=L('M'+n(x+w*0.1)+' '+n(y+h*0.45)+'q'+n(w*0.2)+' '+n(-10*sc)+' '+n(w*0.35)+' 0q'+n(10*sc)+' '+n(6*sc)+' 0 '+n(10*sc)+'M'+n(x+w*0.45)+' '+n(y+h*0.6)+'q'+n(w*0.2)+' '+n(-8*sc)+' '+n(w*0.35)+' 0','#fff',2.2*Math.max(sc,0.6),O(0.85));
 return s;}
function rainIn(x,y,w,h,dens,len,col,op,seed){var r=rng(seed||7),d='',nn=Math.round(w*h*dens/1000);for(var i=0;i<nn;i++){var px=x+r()*w,py=y+r()*(h-len);d+='M'+n(px)+' '+n(py)+'l'+n(-len*0.3)+' '+n(len);}return d?L(d,col,1.6,O(op)):'';}
function winView(x,y,w,h,ctx){
 var s=R(x,y,w,h,0,skyCol(ctx),0),sc=Math.min(w,h)/110,nt=ctx.time==='night',bc=nt?'#3A4670':mix(skyCol(ctx),'#7C8AA0',0.35);
 s+=skyDeco(ctx,x,y,w,h*0.7,sc*0.8);
 s+=R(x+w*0.08,y+h*0.62,w*0.3,h*0.38,0,bc,0)+R(x+w*0.55,y+h*0.5,w*0.32,h*0.5,0,mix(bc,'#fff',0.1),0);
 if(nt){var d='';for(var i=0;i<3;i++)d+='M'+n(x+w*0.6+i*w*0.08)+' '+n(y+h*0.6)+'h'+n(w*0.04)+'v'+n(h*0.05)+'h'+n(-w*0.04)+'z';s+=P(d,'#FFE08A',0);}
 if(wet(ctx.weather))s+=rainIn(x+3,y+2,w-3,h-4,9,8,'#fff',0.7,hash(x+'r'+y));
 return s;}
function wallC(y1,col){return R(0,0,400,y1,0,col,0)+R(0,y1-7,400,7,0,mix(col,'#000',0.1),0)+L('M0 '+y1+'L400 '+y1,INK,1.2,O(0.35));}
function floorT(y0,col,lc,h){var s=R(0,y0,400,(h||300)-y0,0,col,0),d='',i,yy=[12,28,50,80];for(i=0;i<yy.length;i++)if(y0+yy[i]<300)d+='M0 '+(y0+yy[i])+'L400 '+(y0+yy[i]);for(i=-6;i<=6;i++)d+='M'+(200+i*42)+' '+y0+'L'+(200+i*72)+' 300';return s+L(d,lc,1.2);}
function planks(y0,col){var s=R(0,y0,400,300-y0,0,col,0),lc=mix(col,'#000',0.13),d='',i,j,y=y0;var hs=[10,13,16,19,22,26];for(i=0;i<hs.length&&y<300;i++){y+=hs[i];d+='M0 '+y+'L400 '+y;for(j=0;j<4;j++){var x=((i*97+j*131)%400);d+='M'+x+' '+(y-hs[i])+'L'+x+' '+y;}}return s+L(d,lc,1.2);}
function hdb(x,y,w,h,col,stripe,ctx,lit){
 var s=R(x-3,y-7,w+6,9,2,mix(col,'#000',0.12),BS)+R(x,y,w,h,1,col,BS)+R(x+w*0.72,y,w*0.13,h,0,stripe,0);
 var d='',g='',r=rng(hash(x+':'+y)),cx,cy;
 for(cy=y+8;cy<y+h-10;cy+=13)for(cx=x+5;cx<x+w*0.7-6;cx+=12){if(ctx.time==='night'&&r()<0.45)g+='M'+n(cx)+' '+n(cy)+'h7v5h-7z';else d+='M'+n(cx)+' '+n(cy)+'h7v5h-7z';}
 s+=P(d,ctx.time==='night'?'#55607F':'#A9BCCB',0);
 if(g){if(lit)s+=P(g,'#FFE08A',0);else ctx.glow.push(P(g,'#FFE08A',0));}
 return s;}
function treeBg(x,y,r,col){col=col||'#7FC17F';return R(x-r*0.12,y-r*1.2,r*0.24,r*1.2,2,DWOOD,BS)+blob([[x,y-r*1.8,r*0.8],[x-r*0.6,y-r*1.4,r*0.6],[x+r*0.6,y-r*1.4,r*0.6],[x,y-r*1.3,r*0.6]],col,BS);}
function bushRow(y,h,col,seed,x0,x1){var r=rng(seed),cs=[];for(var x=(x0||-10);x<(x1||410);x+=h*0.9)cs.push([x,y-r()*h*0.3,h*(0.6+r()*0.3)]);cs.push([200,y+h,10]);return blob(cs,col,BS);}
function smallDesk(x,y){return R(x-4,y-40,16,4,1.5,'#3E7CD6',1.2)+R(x+10,y-40,3,40,0,'#6B6F80',0)+R(x-24,y-28,48,5,2,'#E1B987',1.2)+R(x-20,y-23,3,23,0,'#3E7CD6',0)+R(x+17,y-23,3,23,0,'#3E7CD6',0);}
function booksRows(x,y,w,rows,rh,seed){var r=rng(seed),cols=['#E58F65','#7FA7D9','#F2CF6B','#7CC29A','#A991DB','#5FBDB8','#F2A3C2'],paths={},i,s='';for(i=0;i<rows;i++){var by=y+(i+1)*rh,bx=x+4;s+=R(x,by,w,4,0,'#8B5E3C',0);while(bx<x+w-6){var bw=5+Math.floor(r()*5),bh=rh-6-Math.floor(r()*8),c=cols[Math.floor(r()*cols.length)];paths[c]=(paths[c]||'')+'M'+n(bx)+' '+n(by)+'v'+n(-bh)+'h'+bw+'v'+bh+'z';bx+=bw+1;if(r()<0.08)bx+=8;}}for(var c in paths)s+=P(paths[c],c,1);return s;}
function fan(x,y){return L('M'+x+' 0L'+x+' '+(y-3),INK,1.4)+E(x-14,y,13,3,'#9AA3B5',1.2)+E(x+14,y,13,3,'#9AA3B5',1.2)+C(x,y,3.4,'#6B6F80',1.2);}
function giraffe(x,y,s){var c='#E9B96E',sp='#B97A3A',k='';k+=limb([[x-14*s,y-40*s],[x-15*s,y]],4*s,c)+limb([[x+12*s,y-40*s],[x+13*s,y]],4*s,c);k+=E(x,y-46*s,22*s,11*s,c,1.4)+limb([[x+14*s,y-50*s],[x+26*s,y-88*s]],7*s,c)+E(x+30*s,y-90*s,9*s,5*s,c,1.4)+L('M'+n(x+24*s)+' '+n(y-95*s)+'l0 -6M'+n(x+28*s)+' '+n(y-96*s)+'l1 -6',INK,1.4)+C(x+31*s,y-92*s,1.1*s,INK,0)+C(x-6*s,y-48*s,3*s,sp,0)+C(x+6*s,y-44*s,3.5*s,sp,0)+C(x-14*s,y-44*s,2.5*s,sp,0)+C(x+20*s,y-66*s,2.2*s,sp,0)+C(x+23*s,y-78*s,2*s,sp,0);return k;}
function palm(x,y,s){var t='M'+x+' '+y+'Q'+(x+8*s)+' '+(y-70*s)+' '+(x+26*s)+' '+(y-130*s);var k=L(t,INK,12*s+3)+L(t,'#B07A4F',12*s);var cx=x+26*s,cy=y-130*s;[[-60,30],[-30,-10],[10,-24],[50,-6],[70,30],[-10,40]].forEach(function(f){k+=P('M'+n(cx)+' '+n(cy)+'Q'+n(cx+f[0]*0.5*s)+' '+n(cy+f[1]*0.5*s-22*s)+' '+n(cx+f[0]*s)+' '+n(cy+f[1]*s)+'Q'+n(cx+f[0]*0.5*s)+' '+n(cy+f[1]*0.5*s-6*s)+' '+n(cx)+' '+n(cy)+'Z','#5DAE6A',BS);});return k+C(cx+2,cy+4,5*s,'#8B5E3C',1.2)+C(cx-5,cy+3,5*s,'#8B5E3C',1.2);}

/* ---------------------------------------------------------------
   BACKGROUNDS (ground baseline y = 250)
   --------------------------------------------------------------- */
var BGS={};
BGS.classroom={seat:'chair',d:function(c){var s=wallC(205,'#F6EFDF')+floorT(205,'#E6E1D6','#D6CFC1');
 s+=R(118,28,164,94,4,'#B4BCC9',BS)+R(124,34,152,82,2,'#fff',0)+L('M140 54L196 54M140 68L222 68M140 82L182 82',COL.blue,2.2,O(0.3))+L('M232 52Q248 72 262 54',COL.red,2.2,O(0.3))+R(150,122,100,5,2,'#B4BCC9',1.2)+R(168,118,12,4,1,COL.red,0)+R(184,118,12,4,1,COL.blue,0);
 s+=R(14,44,86,68,3,'#D9A86C',BS)+R(22,52,20,24,1,'#fff',0)+R(48,50,22,16,1,'#FCE7A0',0)+R(76,56,16,22,1,'#BFE3F5',0)+R(46,72,24,28,1,'#F9C9D9',0)+R(20,82,20,22,1,'#CFE9C3',0)+R(76,84,18,20,1,'#fff',0)+C(32,53,1.6,COL.red,0)+C(59,51,1.6,COL.blue,0)+C(58,73,1.6,COL.green,0);
 s+=R(310,34,78,98,3,'#fff',BS)+winView(315,39,68,88,c)+L('M349 39L349 127M315 84L383 84','#fff',3)+R(310,34,78,98,3,'none',BS)+R(306,130,86,5,2,'#E9E2D3',1.2);
 s+=C(60,22,9,'#fff',BS)+L('M60 22L60 16M60 22L64 24',INK,1.4);
 s+=smallDesk(36,216)+smallDesk(370,216);return s;}};
BGS.voiddeck={seat:'stone',open:[48,24,304,181],d:function(c){var s=R(0,0,400,205,0,skyCol(c),0)+skyDeco(c,48,24,304,120,1);
 s+=hdb(150,52,130,140,'#EADCC2','#E8A585',c)+bushRow(178,26,'#8CC98A',3,40,360)+R(48,186,304,20,0,'#A8D69A',0);
 s+=floorT(205,'#DAD5CA','#C7C1B4');
 s+=R(0,0,400,24,0,'#EEE8DC',BS)+R(120,18,44,5,2,'#fff',1)+R(236,18,44,5,2,'#fff',1);
 s+=R(-2,24,50,280,0,'#F2E2C4',BS)+R(-2,150,50,14,0,'#E58F65',0)+R(352,24,50,280,0,'#F2E2C4',BS)+R(352,150,50,14,0,'#E58F65',0)+R(-2,196,50,10,0,'#E3D2B2',0)+R(352,196,50,10,0,'#E3D2B2',0);
 var lb=R(56,110,66,90,2,'#B8C0CC',BS),d='';for(var i=0;i<3;i++)for(var j=0;j<4;j++){lb+=R(60+i*20.5,114+j*21,18,18,1.5,'#D9DEE6',0.9);d+='M'+(64+i*20.5)+' '+(118+j*21)+'h10';}
 s+=lb+L(d,INK,1.2,O(0.6))+R(54,200,70,5,1,'#9AA3B5',0);
 s+=E(300,190,28,6,'#C9C2B2',BS)+P('M292 192L290 222L310 222L308 192Z','#BDB5A3',BS)+P('M262 204L260 224L276 224L274 204Z','#C9C2B2',BS)+E(268,204,8,2.5,'#D8D2C4',1.2)+P('M326 204L324 224L340 224L338 204Z','#C9C2B2',BS)+E(332,204,8,2.5,'#D8D2C4',1.2);
 return s;}};
BGS.hawker={seat:'stool',d:function(c){var s=wallC(205,'#F3E6CF')+floorT(205,'#E3DED2','#D1CBBD');
 var sc=['#E8A585','#86C49C','#8FB2E3'],ic=['bowl','chick','cup'];
 for(var i=0;i<3;i++){var x=12+i*128,w=120;
  s+=R(x,62,w,28,3,sc[i],BS);
  if(i===0)s+=P('M'+(x+46)+' 72L'+(x+74)+' 72Q'+(x+72)+' 84 '+(x+60)+' 84Q'+(x+48)+' 84 '+(x+46)+' 72Z','#fff',0)+L('M'+(x+64)+' 72L'+(x+72)+' 64',  '#fff',2);
  if(i===1)s+=E(x+56,76,10,7,'#fff',0)+R(x+64,74,10,4,2,'#fff',0)+C(x+76,74,2.5,'#fff',0)+C(x+76,79,2.5,'#fff',0);
  if(i===2)s+=P('M'+(x+50)+' 68L'+(x+70)+' 68L'+(x+67)+' 84L'+(x+53)+' 84Z','#fff',0)+L('M'+(x+70)+' 72Q'+(x+77)+' 72 '+(x+76)+' 78Q'+(x+75)+' 81 '+(x+69)+' 80',  '#fff',2);
  s+=R(x+6,90,w-12,60,0,'#EADBC4',BS)+R(x+12,100,w-24,6,1,'#C9B79A',0)+R(x+16,116,18,14,2,'#E6E1D6',1)+R(x+40,112,22,18,2,'#F4F1E8',1)+R(x+70,114,30,16,3,'#D9A86C',1);
  s+=R(x,150,w,55,2,'#C9CED8',BS)+R(x-2,146,w+4,7,2,'#E6E1D6',BS)+L('M'+(x+30)+' 153L'+(x+30)+' 205M'+(x+60)+' 153L'+(x+60)+' 205M'+(x+90)+' 153L'+(x+90)+' 205',mix('#C9CED8','#000',0.15),1.2);}
 s+=R(0,0,400,26,0,'#C4573A',BS)+L('M0 14L400 14',mix('#C4573A','#000',0.2),1.4)+R(0,26,400,6,0,'#E6E1D6',BS)+fan(110,48)+fan(290,48);
 return s;}};
BGS.playground={out:1,seat:null,d:function(c){var s=R(0,0,400,205,0,skyCol(c),0)+skyDeco(c,0,0,400,150,1);
 s+=hdb(170,74,64,130,'#EADCC2','#E8A585',c)+bushRow(186,30,'#8CC98A',11);
 s+=R(0,200,400,100,0,'#7CC4A8',0)+L('M0 200L400 200',INK,1.2,O(0.3));var r=rng(5),d='';for(var i=0;i<60;i++)d+='M'+n(r()*400)+' '+n(206+r()*92)+'h2';s+=L(d,'#fff',1.6,O(0.4));
 s+=R(30,92,6,116,1,'#3E7CD6',BS)+R(90,92,6,116,1,'#3E7CD6',BS)+L('M40 130L86 130M40 150L86 150M40 170L86 170M40 190L86 190',INK,1.4,O(0.6))+P('M22 94L63 64L104 94Z','#E5534B',BS)+R(26,122,74,8,2,'#F2994A',BS);
 s+=P('M98 122Q132 128 152 186Q156 198 172 198L172 208Q146 210 140 192Q122 138 98 134Z','#F6C343',BS);
 s+=L('M290 208L306 94L322 208M372 208L388 94L404 208',INK,5)+L('M290 208L306 94L322 208M372 208L388 94L404 208','#E5534B',3)+R(300,90,94,7,3,'#3E7CD6',BS)+L('M322 97L322 170M344 97L344 170M354 97L354 162M376 97L376 162',INK,1.4)+R(316,169,34,5,2,'#F6C343',1.4)+R(349,161,32,5,2,'#4CAF7A',1.4);
 return s;}};
BGS.park={out:1,seat:'bench',d:function(c){var s=R(0,0,400,200,0,skyCol(c),0)+skyDeco(c,0,0,400,140,1);
 s+=bushRow(178,34,'#86C784',21)+R(0,186,400,114,0,'#9ED48B',0);
 s+=E(328,210,62,14,'#8CC7E8',BS)+L('M300 208Q312 205 324 208M336 214Q348 211 360 214','#fff',1.6,O(0.8));
 s+=P('M0 234Q120 220 200 228Q300 238 400 226L400 274Q300 286 200 274Q100 264 0 280Z','#EAD9B5',0);
 var r=rng(9),d='';for(var i=0;i<26;i++){var x=r()*400,y=192+r()*100;if(y>224&&y<284)continue;d+='M'+n(x)+' '+n(y)+'l0 -4';}s+=L(d,'#6FAF64',1.6);
 s+=treeBg(26,222,46,'#6FB874')+treeBg(388,214,36,'#79BE7C');return s;}};
BGS.living={seat:'sofa',d:function(c){var s=wallC(205,'#F4EBDD')+planks(205,'#E9C99A');
 s+=R(14,170,108,36,3,'#B07A4F',BS)+L('M68 170L68 206',INK,1.2,O(0.5))+C(60,188,1.6,INK,0)+C(76,188,1.6,INK,0)+R(22,108,92,58,4,'#3E4157',BS)+R(27,113,82,48,2,c.time==='night'?'#7A8CC0':'#5B6B8C',0)+R(60,166,16,4,0,'#3E4157',0)+L('M32 120L52 120',  '#fff',2,O(0.25));
 s+=R(262,30,98,84,3,'#fff',BS)+winView(267,35,88,74,c)+L('M311 35L311 109','#fff',3)+R(262,30,98,84,3,'none',BS)+P('M256 24L276 24Q270 70 280 118L256 118Z','#E7A9B9',BS)+P('M366 24L346 24Q352 70 342 118L366 118Z','#E7A9B9',BS)+R(250,20,124,5,2,'#B07A4F',1.2);
 s+=R(236,146,156,40,12,'#5BB5A2',BS)+R(232,176,164,30,8,'#4BA592',BS)+R(226,162,20,46,8,'#5BB5A2',BS)+R(382,162,20,46,8,'#5BB5A2',BS)+R(254,156,40,24,8,'#F6C343',1.4);
 s+=R(172,48,52,38,2,'#fff',BS)+R(176,52,44,30,0,'#BFE3F5',0)+P('M176 82L192 64L204 76L210 70L220 82Z','#7CC29A',0)+C(208,60,4,COL.yellow,0);
 s+=G(PR.plant.d(),T(150,206,0.7));return s;}};
BGS.kitchen={seat:'chair',d:function(c){var s=R(0,0,400,205,0,'#F3F1EA',0),d='',i;for(i=20;i<205;i+=20)d+='M0 '+i+'L400 '+i;for(i=20;i<400;i+=20)d+='M'+i+' 0L'+i+' 205';s+=L(d,'#E3DFD3',1);
 s+=R(10,16,134,58,3,'#A9D3C8',BS)+L('M77 16L77 74',INK,1.2)+C(70,60,2,INK,0)+C(84,60,2,INK,0);
 s+=R(178,24,96,74,3,'#fff',BS)+winView(183,29,86,64,c)+L('M226 29L226 93','#fff',3)+R(178,24,96,74,3,'none',BS);
 s+=R(0,140,320,66,2,'#A9D3C8',BS)+L('M80 146L80 206M160 146L160 206M240 146L240 206',INK,1.2,O(0.6))+C(72,170,2,INK,0)+C(88,170,2,INK,0)+C(232,170,2,INK,0)+C(248,170,2,INK,0)+R(-2,132,324,10,2,'#E6E1D6',BS);
 s+=R(28,124,74,9,2,'#555B70',BS)+R(42,100,44,24,4,'#C9CED8',BS)+R(38,96,52,6,3,'#B4BCC9',BS)+R(60,90,8,6,2,INK,0)+L('M30 108L42 108M86 108L98 108',INK,3);
 s+=R(196,128,64,6,2,'#C9CED8',BS)+L('M232 128L232 112L246 112L246 118',INK,4)+L('M232 128L232 112L246 112L246 118','#C9CED8',2.2);
 s+=R(328,36,64,170,7,'#EDEFF3',BS)+L('M328 98L392 98',INK,1.4)+R(336,70,5,20,2,'#9AA3B5',1)+R(336,106,5,28,2,'#9AA3B5',1)+C(372,60,4,COL.red,1)+R(356,74,18,12,1,'#FCE7A0',0.8);
 s+=floorT(205,'#E6E1D6','#D3CCBE');var ck='';for(i=0;i<10;i++)ck+='M'+(i*40+((i%2)?0:0))+' 205h20v14h-20z';s+=P(ck,'#D7D0C2',0,O(0.6));return s;}};
BGS.bedroom={seat:'chair',d:function(c){var s=wallC(205,'#DDEBF5')+planks(205,'#E9C99A');
 s+=R(176,34,86,80,3,'#fff',BS)+winView(181,39,76,70,c)+L('M219 39L219 109','#fff',3)+R(176,34,86,80,3,'none',BS)+P('M170 28L188 28Q182 70 190 118L170 118Z','#F2D27E',BS)+P('M268 28L250 28Q256 70 248 118L268 118Z','#F2D27E',BS)+R(162,24,114,5,2,'#B07A4F',1.2);
 s+=R(30,54,52,40,2,'#FCE7A0',BS)+star5(56,74,11,COL.orange,1.2);
 s+=R(8,124,14,84,4,'#B07A4F',BS)+R(14,176,134,24,3,'#C98B4F',BS)+R(18,164,128,13,5,'#fff',BS)+P('M22 164Q22 150 34 150L56 150Q62 150 62 164Z','#fff',BS)+R(64,158,82,22,6,'#9EC9EE',BS)+L('M70 166L140 166','#fff',2,O(0.6));
 s+=R(290,150,100,8,2,'#E1B987',BS)+R(294,158,5,48,1,'#B07A4F',1.2)+R(381,158,5,48,1,'#B07A4F',1.2)+R(340,158,40,20,2,'#E1B987',1.2)+C(360,168,1.6,INK,0);
 s+=E(310,148,10,2.5,'#6B6F80',1.2)+L('M310 147L318 122L330 128',INK,4.2)+L('M310 147L318 122L330 128','#6B6F80',2.2)+P('M326 122L342 132L334 140Z',COL.yellow,1.2)+R(352,134,26,6,1,COL.red,1)+R(354,128,22,6,1,COL.blue,1);
 return s;}};
BGS.street={out:1,seat:null,d:function(c){var s=R(0,0,400,200,0,skyCol(c),0)+skyDeco(c,0,0,400,120,1);
 s+=hdb(12,46,92,154,'#F2E2C4','#E58F65',c)+hdb(148,78,100,122,'#E5ECF1','#8FB2E3',c)+hdb(292,34,96,166,'#F0E6D6','#86C49C',c);
 s+=bushRow(196,22,'#86C784',31);
 s+=R(0,196,400,46,0,'#8C93A3',0)+L('M0 219L400 219',  '#fff',3,' stroke-dasharray="22 18"')+R(0,240,400,6,0,'#C9C2B2',BS)+R(0,246,400,54,0,'#DCD6CA',0)+L('M60 246L50 300M140 246L134 300M220 246L218 300M300 246L302 300M380 246L386 300M0 270L400 270',  '#C9C2B2',1.2);
 s+=limb([[356,244],[356,118],[340,112]],3,'#6B6F80')+R(326,108,18,7,3,'#4A4E69',1.2);if(c.time!=='day')c.glow.push(E(335,118,8,4,'#FFE08A',0)+P('M327 116L310 200L362 200L343 116Z','#FFE08A',0,O(0.18)));
 return s;}};
BGS.busstop={out:1,seat:'bench',excl:[[14,70,252,182]],d:function(c){var s=R(0,0,400,200,0,skyCol(c),0)+skyDeco(c,0,0,400,120,1);
 s+=hdb(280,60,96,140,'#EADCC2','#E8A585',c)+bushRow(186,26,'#86C784',41)+R(0,190,400,12,0,'#A8D69A',0);
 s+=R(0,200,400,62,0,'#DCD6CA',0)+L('M40 200L36 262M120 200L118 262M200 200L200 262M280 200L282 262M360 200L364 262M0 230L400 230','#C9C2B2',1.2)+R(0,260,400,6,0,'#C9C2B2',BS)+R(0,266,400,34,0,'#8C93A3',0)+L('M0 286L400 286','#fff',3,' stroke-dasharray="22 18"');
 s+=R(40,96,200,98,3,'#D5E8F0',BS,O(0.9))+R(150,104,72,56,2,'#fff',1.2)+L('M158 116L214 116M158 126L200 140L214 140M158 150L180 134',COL.red,1.8,O(0.7))+L('M160 120L210 150',COL.green,1.8,O(0.7));
 s+=R(58,190,130,6,2,'#9AA3B5',BS)+R(64,196,5,14,0,'#6B6F80',0)+R(176,196,5,14,0,'#6B6F80',0);
 s+=R(28,84,6,174,1,'#9AA3B5',BS)+R(246,84,6,174,1,'#9AA3B5',BS)+P('M14 86L266 86L258 70L22 70Z','#5DA88A',BS)+R(12,84,256,5,1,'#4A8F74',1.2);
 s+=limb([[318,258],[318,104]],3,'#6B6F80')+R(298,84,40,28,4,'#E5534B',BS)+R(306,90,24,13,3,'#fff',0)+R(309,93,8,5,1,'#8FB2E3',0)+R(319,93,8,5,1,'#8FB2E3',0)+C(310,104,1.8,INK,0)+C(326,104,1.8,INK,0);
 return s;}};
BGS.mrt={seat:'mrt',d:function(c){var s=R(0,0,400,300,0,'#EEF1F5',0)+R(0,0,400,28,0,'#DDE2EA',BS)+R(40,10,320,7,3,'#fff',1);
 var nt=c.time==='night';
 [[30,128],[254,128]].forEach(function(w){s+=R(w[0],58,w[1]-12,70,12,'#fff',BS)+winView(w[0]+6,64,w[1]-24,58,c)+R(w[0],58,w[1]-12,70,12,'none',BS);});
 s+=R(164,44,72,166,3,'#D5DAE2',BS)+L('M200 44L200 210',INK,1.4)+R(172,64,22,40,4,nt?'#3A4670':'#BFE3F5',1.2)+R(206,64,22,40,4,nt?'#3A4670':'#BFE3F5',1.2);
 s+=L('M0 40L400 40',INK,5.5)+L('M0 40L400 40','#B4BCC9',3.5);[60,110,290,340].forEach(function(x){s+=L('M'+x+' 40L'+x+' 52',INK,1.4)+C(x,58,5.5,'none',2.4,' stroke="#9AA3B5"');});
 [[0,160],[240,160]].forEach(function(b){s+=R(b[0],138,b[1],34,6,'#3E7CD6',BS)+R(b[0],168,b[1],14,5,'#5A8FE0',BS)+R(b[0],182,b[1],28,0,'#C9CED8',BS);for(var i=1;i<4;i++)s+=L('M'+(b[0]+i*40)+' 140L'+(b[0]+i*40)+' 170',INK,1.2,O(0.4));});
 s+=R(0,210,400,90,0,'#BFC5D0',0)+L('M0 210L400 210',INK,1.2,O(0.4))+R(0,236,400,12,0,'#B2B9C6',0);
 s+=R(14,28,7,272,2,COL.yellow,BS)+R(379,28,7,272,2,COL.yellow,BS);
 return s;}};
BGS.beach={out:1,seat:null,d:function(c){var s=R(0,0,400,145,0,skyCol(c),0)+skyDeco(c,0,0,400,110,1);
 var sea=c.time==='night'?'#2E4A7A':c.time==='evening'?'#6FA6C8':'#5DB7DE';
 s+=R(0,140,400,62,0,sea,0)+L('M30 156q10 -5 20 0M120 168q10 -5 20 0M230 154q10 -5 20 0M320 172q10 -5 20 0M180 184q10 -5 20 0','#fff',1.6,O(0.7))+P('M84 138L112 138L108 132L88 132Z','#E6E1D6',1)+R(96,124,3,8,0,INK,0);
 s+=R(0,198,400,102,0,'#F3DDA6',0)+P('M0 198Q25 206 50 198Q75 206 100 198Q125 206 150 198Q175 206 200 198Q225 206 250 198Q275 206 300 198Q325 206 350 198Q375 206 400 198L400 196L0 196Z','#fff',0,O(0.85));
 var r=rng(4),d='';for(var i=0;i<30;i++)d+='M'+n(r()*400)+' '+n(212+r()*86)+'h2';s+=L(d,'#D9B97C',1.6);
 s+=palm(18,226,1)+P('M360 236Q364 228 372 232Q376 238 368 240Z','#F2A3C2',1);return s;}};
BGS.field={out:1,seat:null,d:function(c){var s=R(0,0,400,180,0,skyCol(c),0)+skyDeco(c,0,0,400,100,1);
 s+=bushRow(170,24,'#86C784',51)+R(80,112,200,62,2,'#F2E2C4',BS)+R(74,104,212,10,2,'#E58F65',BS);var d='';for(var x=90;x<270;x+=22)d+='M'+x+' 124h12v10h-12zM'+x+' 146h12v10h-12z';s+=P(d,'#A9BCCB',0)+P('M174 174L174 150L186 150L186 174Z','#8B5E3C',1.2)+limb([[180,104],[180,84]],1.2,'#6B6F80')+P('M180 84L192 88L180 92Z',COL.red,1);
 s+=R(0,174,400,26,0,'#D9785B',0)+L('M0 182L400 182M0 190L400 190','#fff',1.4,O(0.8));
 s+=R(0,200,400,100,0,'#8ACB7A',0);var st='';for(var i=0;i<8;i+=2)st+='M'+(i*50)+' 200h50v100h-50z';s+=P(st,'#97D487',0);
 s+=L('M300 214L300 140L392 140L392 214M300 140L310 150L382 150L392 140',INK,6)+L('M300 214L300 140L392 140L392 214','#fff',3.6);var nt='';for(var i2=0;i2<8;i2++)nt+='M'+(310+i2*10)+' 150L'+(304+i2*11)+' 212';s+=L(nt+'M304 170L390 170M304 190L390 190','#fff',1,O(0.8));
 return s;}};
BGS.library={seat:'chair',d:function(c){var s=wallC(205,'#F1E8D8')+R(0,205,400,95,0,'#B9C7D9',0)+L('M0 240L400 240M0 272L400 272',  '#AAB9CD',2);
 s+=R(0,34,132,172,3,'#B07A4F',BS)+R(6,40,120,160,0,'#8B5E3C',0)+booksRows(6,40,120,4,40,7);
 s+=R(268,34,132,172,3,'#B07A4F',BS)+R(274,40,120,160,0,'#8B5E3C',0)+booksRows(274,40,120,4,40,13);
 s+=P('M160 140L160 70Q160 36 200 36Q240 36 240 70L240 140Z','#fff',BS)+G(winView(166,42,68,92,c),'')+L('M200 40L200 138M166 92L234 92','#fff',3)+P('M160 140L160 70Q160 36 200 36Q240 36 240 70L240 140Z','none',BS)+P('M160 140L160 40L166 40L166 70Q166 42 200 42Q234 42 234 70L234 40L240 40L240 140Z','#F1E8D8',0,O(0))+R(154,138,92,6,2,'#E1D6C2',1.2);
 s+=G(PR.plant.d(),T(150,206,0.6))+G(PR.plant.d(),T(252,206,0.6));return s;}};
BGS.market={seat:'stool',d:function(c){var s=R(0,0,400,205,0,'#ECE8DE',0)+R(0,205,400,95,0,'#C9CDD3',0)+L('M0 230L400 230M0 262L400 262M60 205L50 300M150 205L148 300M250 205L252 300M340 205L350 300','#B8BDC6',1.2)+E(120,276,40,4,'#fff',0,O(0.35))+E(300,236,30,3,'#fff',0,O(0.35));
 s+=R(160,60,80,145,0,'#DDD8CC',0)+R(170,110,60,40,2,'#E8C99A',1)+R(170,150,60,55,0,'#CFC9BC',1);
 var aw=function(x,w,c1,c2){var k='',sw=w/8;for(var i=0;i<8;i++)k+=P('M'+(x+i*sw)+' 40L'+(x+(i+1)*sw)+' 40L'+(x+(i+1)*sw)+' 62Q'+(x+(i+0.5)*sw)+' 72 '+(x+i*sw)+' 62Z',i%2?c2:c1,1.2);return k;};
 s+=aw(0,168,'#E5534B','#fff')+aw(232,168,'#3E7CD6','#fff');
 s+=R(4,140,160,66,2,'#B4BCC9',BS)+R(0,130,168,12,2,'#B07A4F',BS)+R(10,108,46,24,2,'#C98B4F',1.2)+R(62,108,46,24,2,'#C98B4F',1.2)+R(114,108,46,24,2,'#C98B4F',1.2);
 s+=blob([[18,106,7],[30,104,7],[42,106,7],[24,98,7],[36,97,7]],'#E5534B',1.2)+blob([[72,106,8],[86,100,9],[98,106,8]],'#5DAE6A',1.2)+blob([[124,106,6.5],[136,105,6.5],[148,106,6.5],[130,98,6.5],[142,98,6.5]],'#F2994A',1.2);
 s+=R(236,140,160,66,2,'#B4BCC9',BS)+R(232,130,168,12,2,'#DDEFF6',BS)+L('M246 128Q262 120 280 128M296 126Q314 118 332 126M346 128Q362 120 380 128',INK,6)+L('M246 128Q262 120 280 128M296 126Q314 118 332 126M346 128Q362 120 380 128','#8FA5BF',4);
 s+=L('M316 72L316 86',INK,1.4)+C(316,94,8,'#fff',1.4)+L('M316 94L320 90',INK,1.2)+R(306,102,20,4,1,'#9AA3B5',1);
 s+=R(0,0,400,26,0,'#5DA88A',BS)+L('M0 9L400 9M0 18L400 18',mix('#5DA88A','#000',0.2),1.2)+L('M120 26L120 36M280 26L280 36',INK,1.2)+C(120,40,5,'#FFE9A8',1.2)+C(280,40,5,'#FFE9A8',1.2);
 return s;}};
BGS.hall={seat:'chair',d:function(c){var s=R(0,0,400,205,0,'#EADFCB',0)+planks(188,'#E3BE8A');
 s+=R(30,40,340,110,0,'#3A4F86',BS)+P('M200 62L220 70Q220 96 200 108Q180 96 180 70Z',COL.yellow,BS)+P('M200 70L212 75Q212 92 200 100Z',COL.red,0)+star5(192,82,5,'#fff',0.8);
 s+=P('M200 0L130 150L270 150Z','#FFF6D0',0,O(0.22));
 s+=R(16,148,368,42,2,'#C98B4F',BS)+R(12,144,376,8,2,'#B07A4F',BS)+L('M16 170L384 170',mix('#C98B4F','#000',0.15),1.4);
 var cur=function(x,w,fl){var k='',i,pw=w/4;for(i=0;i<4;i++)k+=R(x+i*pw,30,pw,120,0,i%2?'#C8463F':'#B83F38',0);return k+R(x,30,w,120,0,'none',BS)+P(fl?'M'+(x+w)+' 150Q'+(x+w-10)+' 100 '+x+' 150Z':'M'+x+' 150Q'+(x+10)+' 100 '+(x+w)+' 150Z','#EADFCB',0,O(0));};
 s+=cur(20,52,0)+cur(328,52,1)+R(14,20,372,22,0,'#B83F38',BS);var sc='';for(var i=0;i<12;i++)sc+='M'+(14+i*31)+' 42Q'+(29.5+i*31)+' 54 '+(45+i*31)+' 42Z';s+=P(sc,'#C8463F',1.2)+R(10,14,380,8,2,'#F6C343',1.2);
 return s;}};
BGS.zoo={out:1,seat:'bench',d:function(c){var s=R(0,0,400,200,0,skyCol(c),0)+skyDeco(c,0,0,400,110,1);
 s+=bushRow(160,40,'#7FC17F',61)+treeBg(60,200,40,'#6FB874');
 s+=R(0,186,400,114,0,'#A8D69A',0)+giraffe(318,192,1);
 var f='';for(var x=4;x<400;x+=44)f+=R(x,166,7,48,1,'#B07A4F',1.2);s+=f+R(0,174,400,6,1,'#C98B4F',1.2)+R(0,194,400,6,1,'#C98B4F',1.2);
 s+=P('M0 226Q140 214 200 222Q300 232 400 220L400 300L0 300Z','#E3D3B0',0)+P('M0 214Q8 196 30 200Q46 204 44 216Z','#A3A9B5',BS)+blob([[380,214,14],[394,208,14]],'#6FB874',BS);
 return s;}};
BGS.clinic={seat:'chair',d:function(c){var s=wallC(205,'#E4F2EE')+floorT(205,'#E6E1D6','#D6CFC1');
 s+=R(30,38,58,72,3,'#fff',BS)+R(51,52,16,40,1,COL.green,0)+R(39,64,40,16,1,COL.green,0)+heart(72,98,5,COL.red,0.8);
 s+=R(148,30,94,36,5,'#3E4157',BS)+R(158,40,28,16,3,COL.red,0)+R(196,40,36,16,3,'#4CAF7A',0);
 s+=R(270,54,124,64,3,'#CFEAF3',BS,O(0.8))+L('M332 54L332 118',INK,1.2)+R(262,118,138,88,4,'#F4F1E8',BS)+R(256,112,150,9,3,'#2BA6A0',BS)+L('M262 150L400 150',INK,1.2,O(0.3))+G(PR.plant.d(),T(380,113,0.45));
 for(var i=0;i<4;i++){var x=24+i*36;s+=R(x,170,30,8,3,'#5A8FE0',1.2)+R(x+2,148,26,22,4,'#3E7CD6',1.2)+R(x+4,178,3,30,0,'#9AA3B5',0)+R(x+23,178,3,30,0,'#9AA3B5',0);}
 return s;}};
BGS.garden={out:1,seat:'bench',d:function(c){var s=R(0,0,400,180,0,skyCol(c),0)+skyDeco(c,0,0,400,110,1);
 s+=bushRow(170,30,'#5DA36A',71)+R(0,176,400,30,0,'#5DA36A',0)+L('M0 176L400 176',INK,0,O(0));
 s+=R(0,204,400,14,0,'#9A6A44',0)+R(0,216,400,84,0,'#9ED48B',0);
 var r=rng(8),fl=['#E5534B','#F6C343','#F28DB2','#8A6BD1','#fff'];for(var x=10;x<400;x+=22){var y=200+r()*8,fc=fl[Math.floor(r()*5)];s+=L('M'+n(x)+' '+n(y+8)+'L'+n(x)+' '+n(y),'#3E8A55',1.6)+C(x,y,4.5,fc,1.2)+C(x,y,1.6,COL.yellow,0);}
 s+=E(150,262,16,5,'#C9C2B2',1.2)+E(196,278,16,5,'#C9C2B2',1.2)+E(250,262,16,5,'#C9C2B2',1.2)+E(300,280,16,5,'#C9C2B2',1.2);
 s+=P('M20 210L20 110Q20 70 60 70Q100 70 100 110L100 210L92 210L92 112Q92 80 60 80Q28 80 28 112L28 210Z','#fff',BS);
 var ad=[[24,120],[30,96],[44,78],[64,76],[82,86],[96,104],[96,140],[24,160],[96,176]];ad.forEach(function(p){s+=C(p[0],p[1],4.5,'#F28DB2',1)+E(p[0]+5,p[1]+4,3,2,'#4CAF7A',0);});
 s+=P('M300 80Q294 72 298 68Q304 72 300 80Q306 72 312 74Q308 82 300 80Z',COL.yellow,1)+P('M340 110Q334 102 338 98Q344 102 340 110Q346 102 352 104Q348 112 340 110Z',COL.pink,1);
 return s;}};
BGS.corridor={seat:null,open:[306,22,94,128],d:function(c){var s=R(0,0,400,205,0,skyCol(c),0)+skyDeco(c,306,22,94,110,0.6)+hdb(330,60,100,150,'#EADCC2','#E8A585',c);
 s+=R(0,22,300,184,0,'#F2E2C4',0)+R(0,186,300,20,0,'#E3D2B2',0)+L('M0 206L400 206',INK,1.2,O(0.35));
 var door=function(x,col){var k=R(x,70,70,136,2,col,BS)+R(x+8,80,54,52,2,mix(col,'#fff',0.12),1.2)+R(x+8,140,54,56,2,mix(col,'#fff',0.12),1.2)+C(x+60,140,2.6,COL.yellow,1.2);var g='';for(var i=1;i<7;i++)g+='M'+(x+i*10)+' 72L'+(x+i*10)+' 204';return k+L(g+'M'+x+' 100L'+(x+70)+' 100M'+x+' 170L'+(x+70)+' 170','#6B6F80',1.8,O(0.85))+R(x-4,66,78,6,1,'#D9C6A3',1.2);};
 s+=door(24,'#B07A4F')+door(196,'#8B5E3C');
 s+=R(112,90,70,58,2,'#BFD4E0',BS)+L('M124 90L124 148M136 90L136 148M148 90L148 148M160 90L160 148M172 90L172 148M112 119L182 119','#6B6F80',1.6);
 s+=G(PR.plant.d(),T(110,206,0.5))+R(146,190,32,16,2,'#B07A4F',1.2)+E(154,188,6,2.5,'#E5534B',1)+E(168,188,6,2.5,'#3E7CD6',1);
 s+=R(300,22,12,184,0,'#EADBC0',BS)+R(312,150,90,56,0,'#F2E2C4',BS)+R(312,150,90,8,0,'#E58F65',0)+R(312,134,90,4,1,'#9AA3B5',1.2)+L('M324 138L324 150M340 138L340 150M356 138L356 150M372 138L372 150M388 138L388 150','#9AA3B5',2);
 s+=floorT(206,'#D9D4C8','#C7C1B4');
 s+=R(0,0,400,22,0,'#E9E2D3',BS)+R(60,16,40,4,2,'#fff',1)+R(220,16,40,4,2,'#fff',1);
 return s;}};
var INDOOR={classroom:1,living:1,kitchen:1,bedroom:1,mrt:1,library:1,hall:1,clinic:1,hawker:1,market:1};

/* ---------------------------------------------------------------
   FX — drawn around (0,0), then placed at x,y with scale s
   --------------------------------------------------------------- */
var BLUE2='#8FA5E0',FXBIG={exclaim:1.35,question:1.35,lightbulb:1.3,hearts:1.25,sparkle:1.25,anger:1.3,zzz:1.3,notes:1.25,stars:1.15,sweat:1.2,tears:1.15};
function note(x,y,c){return L('M'+(x+5)+' '+y+'L'+(x+5)+' '+(y-20)+'Q'+(x+11)+' '+(y-16)+' '+(x+13)+' '+(y-10),INK,2.2)+G(E(0,0,6,4.4,c,1.8),'translate('+x+' '+y+') rotate(-20)');}
var FXD={
 motion:function(){return L('M-12 -26Q-30 -30 -48 -24M-14 -8Q-36 -10 -56 -4M-12 10Q-30 12 -46 18',INK,2.4)+blob([[-52,24,5],[-60,20,4]],'#fff',1.6);},
 speed:function(){return L('M-14 -24L-56 -24M-20 -10L-70 -10M-14 4L-52 4M-22 18L-62 18',INK,2.4);},
 sweat:function(){return drop(0,0,4.5,TEAR,1.6)+drop(9,8,3.4,TEAR,1.4);},
 tears:function(){return drop(-10,2,4,TEAR,1.5)+drop(10,0,4,TEAR,1.5)+drop(-16,12,3,TEAR,1.3)+drop(17,11,3,TEAR,1.3)+L('M-6 -4Q-10 -10 -15 -10M6 -4Q10 -10 15 -10',TEAR,2);},
 exclaim:function(){return L('M-14 -22L-20 -28M14 -22L20 -28M-18 -6L-26 -6M18 -6L26 -6',INK,2.2)+P('M-5 -26Q0 -29 5 -26L3 2Q0 4 -3 2Z',COL.red,2.2)+C(0,11,4,COL.red,2.2);},
 question:function(){var d='M-8 -12Q-8 -24 1 -24Q10 -24 10 -14Q10 -7 2 -4L2 2';return L(d,INK,9)+L(d,COL.blue,4.6)+C(2,12,4.2,COL.blue,2.2);},
 hearts:function(){return heart(0,0,8,COL.red,2)+heart(-16,-14,5.5,COL.pink,1.6)+heart(14,-20,4.5,COL.pink,1.4);},
 sparkle:function(){return star4(0,0,11,COL.yellow,1.8)+star4(-16,-12,6,COL.yellow,1.4)+star4(14,-16,5,'#fff',1.4)+star4(12,10,4,COL.yellow,1.2);},
 zzz:function(){var z=function(x,y,s){return 'M'+n(x)+' '+n(y)+'l'+n(4*s)+' '+n(-5*s)+'l'+n(4*s)+' '+n(5*s)+'l'+n(4*s)+' '+n(-5*s)+'l'+n(4*s)+' '+n(5*s);};var d=z(-14,6,0.7)+z(-4,-6,0.9)+z(8,-20,1.15);return L(d,INK,5)+L(d,BLUE2,2.4);},
 crack:function(){return L('M0 -20L4 -10L-2 -4L6 6L1 12L5 22M-2 -4L-10 2M6 6L13 4',INK,2.4);},
 stars:function(){return E(0,0,28,8,'none',1.6,' stroke-dasharray="4 4"')+star5(-24,2,6,COL.yellow,1.6)+star5(6,-8,5.5,COL.yellow,1.6)+star5(22,5,5,COL.yellow,1.6);},
 steam:function(){var d='M-10 0Q-16 -10 -10 -20Q-4 -30 -10 -40M2 0Q-4 -12 2 -24Q8 -34 2 -46M14 0Q8 -10 14 -20Q20 -30 14 -40';return L(d,'#9AA3B5',5,O(0.8))+L(d,'#fff',2.6);},
 notes:function(){return note(-10,0,COL.purple)+note(10,-16,COL.blue);},
 smoke:function(){return blob([[0,0,10],[-12,-8,8],[8,-14,9],[-4,-24,8],[10,-30,6]],'#C9CED8',1.6,O(0.95));},
 splash:function(){return E(0,0,22,4,'#9CCBEA',1.6)+drop(-14,-12,3.6,'#9CCBEA',1.3)+drop(0,-18,4,'#9CCBEA',1.3)+drop(14,-12,3.6,'#9CCBEA',1.3)+drop(-24,-4,2.6,'#9CCBEA',1.2)+drop(24,-4,2.6,'#9CCBEA',1.2);},
 anger:function(){return anger(0,0,13,3.4);},
 lightbulb:function(){return L('M-20 -10L-28 -14M20 -10L28 -14M0 -30L0 -38M-14 -24L-20 -30M14 -24L20 -30',COL.yellow,2.6)+C(0,-8,13,'#FFE680',2.2)+L('M-4 -4L-2 2L2 2L4 -4',COL.orange,1.6)+R(-6,4,12,9,2,'#9AA3B5',2)+L('M-6 8L6 8',INK,1.2)+E(-5,-13,3,4,'#fff',0,O(0.8));}
};
function thought(x,y,s,pk,ctx){
 var dir=x>250?-1:1,cx=Math.max(52*s,Math.min(400-52*s,x+dir*50*s)),cy=Math.max(42*s,y-46*s),r1=46*s,r2=33*s,cs=[],i;
 for(i=0;i<10;i++){var a=i*Math.PI/5;cs.push([cx+Math.cos(a)*r1*0.82,cy+Math.sin(a)*r2*0.82,(i%2?12:14)*s]);}
 cs.push([cx,cy,r2*0.85]);cs.push([cx-r1*0.4,cy,r2*0.7]);cs.push([cx+r1*0.4,cy,r2*0.7]);
 var s1=C(x+(cx-x)*0.16,y+(cy-y)*0.16,3.4*s,'#fff',1.8)+C(x+(cx-x)*0.36,y+(cy-y)*0.36,5.6*s,'#fff',1.8)+blob(cs,'#fff',2.2);
 if(pk&&PR[pk]){var p=PR[pk],sc=Math.min(60*s/p.w,44*s/p.h,2.4*s);s1+=G(p.d(ctx||{}),T(cx,cy+p.h*sc/2,sc));}
 else if(pk)warn('unknown prop "'+pk+'"');
 else s1+=C(cx-12*s,cy,2.6*s,'#9AA3B5',0)+C(cx,cy,2.6*s,'#9AA3B5',0)+C(cx+12*s,cy,2.6*s,'#9AA3B5',0);
 return s1;
}
function rainAll(dens,excl,op,seed,len){var r=rng(seed),d='',nn=Math.round(400*300*dens/1000);for(var i=0;i<nn;i++){var px=r()*420,py=r()*290-10,ok=true;if(excl)for(var j=0;j<excl.length;j++){var e=excl[j];if(px>e[0]-4&&px<e[0]+e[2]+4&&py>e[1]-14&&py<e[1]+e[3])ok=false;}if(ok)d+='M'+n(px)+' '+n(py)+'l-4 '+(len||13);}return L(d,'#EEF4FA',1.7,O(op))+L(d.replace(/l-4 /g,'l-1 ').replace(/M/g,'M'),'#7E95B8',0.8,O(op*0.35));}
function windFx(rect,seed){var r=rng(seed),s='',x=rect[0],y=rect[1],w=rect[2],h=rect[3];for(var i=0;i<6;i++){var px=x+r()*w,py=y+10+r()*(h-20);s+=G(E(0,0,5,2.6,i%2?'#7CC29A':'#E8B84A',1.2),T(px,py,1,r()*360));}s+=L('M'+n(x+w*0.08)+' '+n(y+h*0.3)+'q'+n(w*0.15)+' -14 '+n(w*0.3)+' 0q8 8 0 14M'+n(x+w*0.5)+' '+n(y+h*0.55)+'q'+n(w*0.15)+' -12 '+n(w*0.32)+' 0M'+n(x+w*0.2)+' '+n(y+h*0.75)+'q'+n(w*0.12)+' -10 '+n(w*0.26)+' 0','#fff',2.6,O(0.85));return s;}

/* ---------------------------------------------------------------
   SCENE
   --------------------------------------------------------------- */
var BG_L=["classroom","voiddeck","hawker","playground","park","living","kitchen","bedroom","street","busstop","mrt","beach","field","library","market","hall","zoo","clinic","garden","corridor"];
var TIME_L=["day","evening","night"],WEATHER_L=["sun","cloud","rain","storm","wind"];
var WHO_L=["boy","girl","man","woman","grandpa","grandma","teacher","toddler"];
var POSE_L=["stand","walk","run","sit","fall","point","wave","give","hold","cry","jump","kneel","hug","reach","think","shout","sleep","clap","carry"];
var FACE_L=["neutral","happy","laughing","sad","crying","scared","angry","surprised","worried","proud","shy","thinking","guilty","relieved","determined","sleepy","hurt"];
var PROP_L=["wallet","money","ball","bicycle","scooter","dog","cat","puppy","kitten","bird","vase","vase-broken","umbrella","schoolbag","phone","book","books-pile","cake","plate","bowl","tray","cup","trophy","medal","kite","puddle","tree","bench","bus","car","letter","gift","flowerpot","bottle","toy","banana-peel","fishtank","basket","broom","firstaid","icecream","laptop","drum","desk","chair","table","bed","lamp","window","door","stairs","lift","bin","signboard","shoppingbag","mop","spill","stone","fence","box","sandcastle","bucket","clock","whiteboard","shelf","plant"];
var FX_L=["rain","motion","sweat","tears","exclaim","question","hearts","sparkle","zzz","crack","stars","steam","notes","thought","smoke","splash","speed","anger","lightbulb"];
var FACEKEYS=["happy","excited","proud","grateful","relieved","surprised","shocked","confused","curious","determined","hopeful","calm","worried","nervous","scared","sad","lonely","disappointed","frustrated","regretful","guilty","embarrassed","jealous","angry","moved","anxious","wronged","shy"];
function num(v,d){return typeof v==='number'&&isFinite(v)?v:d;}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function scene(spec,opts){
 spec=spec||{};opts=opts||{};var id=++CNT;
 var bk=spec.bg,bg=BGS[bk];if(!bg){warn('unknown bg "'+bk+'"');bg=BGS.park;bk='park';}
 var time=spec.time||'day';if(TIME_L.indexOf(time)<0){warn('unknown time "'+time+'"');time='day';}
 var wt=spec.weather||null;if(wt&&WEATHER_L.indexOf(wt)<0){warn('unknown weather "'+wt+'"');wt=null;}
 var indoor=!!INDOOR[bk],out=!!bg.out;
 var ctx={time:time,weather:wt,night:time==='night',glow:[],id:id};
 var s='';
 try{s+=bg.d(ctx);}catch(e){warn('bg error '+e.message);}
 if(wt&&bg.open){var o=bg.open;if(wet(wt))s+=rainIn(o[0],o[1],o[2],o[3],wt==='storm'?14:9,13,'#EEF4FA',0.8,id*13+5);if(wt==='wind')s+=windFx(o,id);}
 if(time==='night')s+=R(0,0,400,300,0,indoor?'#1A2350':'#0E1A45',0,O(indoor?0.14:0.36));
 else if(time==='evening')s+=R(0,0,400,300,0,'#F2994A',0,O(indoor?0.06:0.12));
 if(wt==='storm'&&(out||bg.open))s+=R(0,0,400,300,0,'#2B2D42',0,O(0.12));
 s+=ctx.glow.join('');
 /* props */
 var props=[],actors=[],i,j;
 (spec.props||[]).forEach(function(p){if(!p||!PR[p.k]){warn('unknown prop "'+(p&&p.k)+'"');return;}var d=PR[p.k];props.push({k:p.k,x:num(p.x,200),y:num(p.y,d.y||250),s:num(p.s,1),flip:!!p.flip,rot:num(p.rot,0),d:d,front:d.z==='f',used:0});});
 (spec.actors||[]).forEach(function(a){if(!a||!WHODEF[a.who]){warn('unknown who "'+(a&&a.who)+'"');return;}actors.push({a:a,x:num(a.x,200),y:num(a.y,250),s:num(a.s,1),flip:!!a.flip});});
 var seats='',post='',frontTables={};
 actors.forEach(function(A){
  var a=A.a,ex={};
  if(a.pose==='sit'&&a.hold!=='bicycle'){
   var best=null,bd=1e9;props.forEach(function(p){if(p.k==='chair'||p.k==='bench'||p.k==='bed'){var lim=(p.k==='chair'?40:p.k==='bench'?56:70)*p.s,dd=Math.abs(p.x-A.x);if(dd<lim&&dd<bd){bd=dd;best=p;}}});
   if(best){var sh=best.d.seat*best.s;ex.seat={h:sh/A.s};A.y=best.y;if(best.k==='chair'){A.x=best.x;best.flip=A.flip;}else if(best.k==='bench')A.x=Math.max(best.x-40*best.s,Math.min(best.x+40*best.s,A.x));}
   else if(bg.seat){var st=SEAT[bg.seat];ex.seat={h:st.h};seats+=G(st.d(),T(A.x,A.y,A.s,0,A.flip));}
   props.forEach(function(p){if((p.k==='desk'||p.k==='table')&&Math.abs(p.x-A.x)<70*p.s)frontTables[props.indexOf(p)]=1;});
  }
  var r=null;try{r=drawActor(a,ctx,ex);}catch(e){warn('actor error '+e.message);}
  A.r=r;
  if(r&&r.pose==='sleep'){
   var bed=null;props.forEach(function(p){if(p.k==='bed'&&Math.abs(p.x-A.x)<90*p.s)bed=p;});
   if(bed){var dir=A.flip?-1:1,ps=bed.s;bed.flip=A.flip;A.y=bed.y-40*ps+2;A.x=bed.x+dir*(-42*ps)-dir*r.geo.lie.head*A.s;
    var x0=A.x+dir*(r.geo.lie.neck+4)*A.s,x1=bed.x+dir*62*ps;post+=blanket(Math.min(x0,x1),Math.max(x0,x1),A.y-r.geo.lie.thick*0.72*A.s,bed.y-17*ps);}
  }
 });
 function drawProp(p){return G(p.d.d(ctx),T(p.x,p.y,p.s,p.rot,p.flip));}
 var back='',front='',ft='';
 props.slice().sort(function(a,b){return a.y-b.y;}).forEach(function(p){var idx=props.indexOf(p);try{if(frontTables[idx])ft+=drawProp(p);else if(p.front)front+=drawProp(p);else back+=drawProp(p);}catch(e){warn('prop error '+e.message);}});
 s+=back+seats;
 var sh='',acts='';
 actors.slice().sort(function(a,b){return a.y-b.y;}).forEach(function(A){if(!A.r)return;var tr=T(A.x,A.y,A.s,0,A.flip);if(A.r.pose!=='sleep'||A.y>=245)sh+=G(A.r.shadow,tr);acts+=G(A.r.svg,tr);});
 s+=sh+acts+post+ft+front;
 /* fx */
 (spec.fx||[]).forEach(function(f){if(!f||FX_L.indexOf(f.k)<0){warn('unknown fx "'+(f&&f.k)+'"');return;}
  var x=num(f.x,200),y=num(f.y,100),sc=num(f.s,1);
  try{if(f.k==='rain')s+='@RAIN@';else if(f.k==='thought')s+=thought(x,y,sc,f.prop,ctx);else s+=G(FXD[f.k](),T(x,y,sc*(FXBIG[f.k]||1),0,!!f.flip));}catch(e){warn('fx error '+e.message);}});
 var rainSvg='';
 if(out&&wt){if(wet(wt))rainSvg=rainAll(wt==='storm'?9:6,bg.excl,0.8,id*7+3,wt==='storm'?16:13);if(wt==='wind')s+=windFx([0,0,400,105],id+2);}
 var fxRain=rainAll(6,null,0.8,id*11+1,13);
 s=s.replace('@RAIN@',rainSvg?'':fxRain).replace(/@RAIN@/g,'');
 s+=rainSvg;
 var lab=opts.label?' role="img" aria-label="'+esc(opts.label)+'"':' aria-hidden="true"';
 var cid='artc'+id+'_'+Math.floor(Math.random()*1e6).toString(36);
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"'+lab+' style="display:block;width:100%;height:auto"><defs><clipPath id="'+cid+'"><rect width="400" height="300" rx="14"/></clipPath></defs><g clip-path="url(#'+cid+')" stroke-linejoin="round" stroke-linecap="round">'+s+'</g><rect x="1.5" y="1.5" width="397" height="297" rx="13" fill="none" stroke="'+INK+'" stroke-width="3"/></svg>';
}
function face(key,opts){
 opts=opts||{};if(!EXPR[key]){warn('unknown face "'+key+'"');key='happy';}
 var skin=SKIN[opts.skin]||SKIN.tan,W=6;
 var s=E(-97,12,13,17,skin,W)+E(97,12,13,17,skin,W)+C(0,0,100,skin,W)+L('M-8 -99Q-20 -128 4 -126Q22 -122 10 -108',INK,W*2.4)+L('M-8 -99Q-20 -128 4 -126Q22 -122 10 -108',HAIRC,W*1.1)+features(key,skin,7.5,true,0,0,false);
 if(EXPR[key].tilt)s=G(s,'rotate('+EXPR[key].tilt+')');
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img" aria-label="'+esc(opts.label||key)+'" style="display:block;width:100%;height:auto"><g stroke-linejoin="round" stroke-linecap="round" transform="translate(60 64) scale(0.445)">'+s+'</g></svg>';
}
window.ART=Object.assign(window.ART||{},{scene:scene,face:face,BG:BG_L.slice(),WHO:WHO_L.slice(),POSE:POSE_L.slice(),FACE:FACE_L.slice(),PROP:PROP_L.slice(),FX:FX_L.slice()});
})();
