/* Shuffle multiple-choice options once at load (stable per question), so the right answer isn't usually first. */
(function(){var V=window.VG||[];function h(s){var x=2166136261;for(var i=0;i<s.length;i++){x^=s.charCodeAt(i);x=Math.imul(x,16777619)}return x>>>0}
V.forEach(function(u){(u.items||[]).forEach(function(it,j){if(it.t!=="mcq"||!it.o||it.o.some(function(o){return /above|both|neither|none of|all of|以上|都对|都不/i.test(o)}))return;
  var r=h(u.id+":"+j+":"+it.q),idx=it.o.map(function(_,i){return i});for(var i=idx.length-1;i>0;i--){r=Math.imul(r^(r>>>15),2246822507)>>>0;var k=r%(i+1);var t=idx[i];idx[i]=idx[k];idx[k]=t}
  var o=idx.map(function(i){return it.o[i]});it.a=idx.indexOf(it.a);it.o=o})})})();
