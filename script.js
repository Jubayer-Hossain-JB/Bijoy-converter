String.prototype.replaceAt=function(e,t){return this.substring(0,e)+t+this.substring(e+1,this.length)},String.prototype.middleAdd=function(e,t){return this.substring(0,e)+t+this.substring(e,this.length)},String.prototype.replaceAll=function(e,t,l){return this.replace(new RegExp(e.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),l?"gi":"g"),"string"==typeof t?t.replace(/\$/g,"$$$$"):t)},fetch("./key.json").then((e=>e.json())).then((e=>{asyncCall(e)}));var timer="";function asyncCall(e){const t=$('[name="Unicode"]'),a=$('[name="Classic"]');a.focus();let r="",n=0,s="";var o=0;function i(){value=t.val();var r="";new Promise((t=>{if(value){var l=e[0][1];for(var a of l)value=value.replaceAll(a.out,a.seq),a==l[l.length-1]&&t(value)}})).then((t=>new Promise((a=>{var n="";for(l of t){var s=transform(!1,l,e[0][0]);if(s){var o=transform(parseInt(s[0]),!1,e[1][0]),i="";if(o)i=s[3]?o[2]:o[1];else{var c=["0","1","2","3","4","5","6","7","8","9","!","@","#","$","%","^","*","(",")","?",",","<",".",">","=","+",":",";","/"],f=["০","১","২","৩","৪","৫","৬","৭","৮","৯","!","@","#","৳","%","ৰ","*","(",")","?",",","<",".",">","=","+",":",";","/"];for(var u of f)if(l==u){i=c[f.indexOf(u)];break}}"©"!=n||"‰"!=i&&"w"!=i&&"‡"!=i&&"v"!=i&&"x"!=i&&"y"!=i&&"~"!=i&&"Š"!=i&&"„"!=i?i+=n:i="i&"+i,n="","‰"==i||"w"==i||"‡"==i?"‍"==r[r.length-2]&&"&"==r[r.length-3]?(r=r.middleAdd(r.length-4,i),i=""):"&"==r[r.length-2]?(r="&"==r[r.length-4]?r.middleAdd(r.length-5,i):r.middleAdd(r.length-3,i),i=""):"©"==r[r.length-1]?(r=r.middleAdd(r.length-2,i),i=""):"&"!=r[r.length-1]&&(r=r.middleAdd(r.length-1,i),i=""):"&"==i&&"i"==r[r.length-1]&&("‍"!=n?(i="",r=r.replaceAt(r.length-1,""),n="©"):n=""),r+=i}else if("়"==l){switch(r[r.length-1]){case"h":r+="q";break;case"W":r+="o";break;case"X":r+="p"}r=r.replaceAt(r.length-2,"")}else"‍"==l?n=l:l.match(/[^a-zA-Z]/)&&(r+=l);l==t[t.length-1]&&a()}})))).then((()=>{if(r.length>=2){console.log(r);let l=e[1][1];for(var t of(r=r.replaceAll("y&i","&iy"),l))r=r.replaceAll(t.seq,t.out);for(var t of[{seq:"b&Î",out:"š¿"},{seq:"m&Î",out:"¯¿"},{seq:"&‍h",out:"¨"},{seq:"m&µ",out:"¯Œ"},{seq:"y‍&h",out:"y¨"}])r=r.replaceAll(t.seq,t.out);console.log(1,r)}a.val(r)}))}function c(){value=a.val(),r="";var o="";new Promise((t=>{if(value){let a=e[1][1];for(var l of[{seq:"†",out:"‡"},{seq:"¡",out:"&e"},{seq:"¯Œ",out:"m&K&i"}])value=value.replaceAll(l.seq,l.out);for(var l of a)value=value.replaceAll(l.out,l.seq),l==a[a.length-1]&&t(value)}})).then((t=>new Promise((a=>{for(l of t){var i=transform(!1,l,e[1][0]);if(i){var c=transform(parseInt(i[0]),!1,e[0][0]),u=(i[3]?c[2]:c[1])+r,d=o[o.length-1];if("্"!=d)switch(u){case"ে":case"ৈ":case"ি":r=u,u="";break;case"র্":o="ে"==d||"ৈ"==d||"ি"==d?o.middleAdd(o.length-2,u):o.middleAdd(o.length-1,u),u="";break;case"‍্য":"ে"!=d&&"ৈ"!=d&&"ি"!=d||(u+=d,o=o.replaceAt(o.length-1,""));break;case"্":"ে"!=d&&"ৈ"!=d&&"ি"!=d||(s=d,n=o.length+1,o=o.replaceAt(o.length-1,""));break;default:r=""}else switch(u){case"ে":case"ৈ":case"ি":case"ী":case"ু":case"ূ":case"ৃ":case"া":case"ৃ":case"ৗ":console.log(2),o=o.middleAdd(o.length-1,s),s="",n=void 0}o+=u,n&&o.length===n&&(o+=s,s="",r="",n=void 0)}else{var g=["0","1","2","3","4","5","6","7","8","9","$","^","š","¯","z","æ","¤"],h=["০","১","২","৩","৪","৫","৬","৭","৮","৯","৳","ৰ","ন","স","ু","ু","ম"];for(var v of g){if(l==v){o+=h[g.indexOf(v)]+r,r="";break}v==g[g.length-1]&&(o+=l)}}let m=e[0][1];o=f(o,m),l==t[t.length-1]&&a()}})))).then((()=>{t.val(o)}))}function f(e,t){var l;for(var a of(l=e.length>=5?e.substring(e.length-5,e.length):e,t))l=l.replace(a.seq,a.out);return e.substring(0,e.length-5)+l}t.on("keydown",(l=>{let c=l.keyCode,u=l.shiftKey,d=l.ctrlKey,g=l.altKey,h=transform(c,!1,e[0][0]);if(h){if(d||g)console.warn("Externel..."),d&&86==c&&setTimeout((()=>{t.val(t.val().replace(/(?<![র‍])্য/g,"‍্য"))}),200);else{l.preventDefault();let a=t.val(),i=document.getElementsByName("Unicode")[0],c=i.selectionEnd;if(i.selectionStart!=c){var v=i.selectionStart;o-=c-v,a=a.substring(0,v)+a.substring(c,a.length),c=v}var m;m=c>0?a[c-1]:"";let d=(u?h[2]:h[1])+r;if(r&&(a=a.replaceAt(c-1,""),c-=1,o-=1),"্"!=m)switch(d){case"ে":case"ৈ":case"ি":r=d;break;case"র্":a="ে"==m||"ৈ"==m||"ি"==m?a.middleAdd(c-2,d):a.middleAdd(c-1,d),d="";break;case"্র":case"‍্য":case"্":"ে"!=m&&"ৈ"!=m&&"ি"!=m||(a=a.replaceAt(c-1,""),"্"==d?(n=a.length+2,s=m):d+=m);break;default:r=""}else switch(d){case"ে":case"ৈ":case"ি":case"ী":case"ু":case"ূ":case"ৃ":case"া":case"ৃ":case"ৗ":n=void 0,a=a.middleAdd(c-1,s),c+=1,s=""}a=a.middleAdd(c,d),n&&a.length===n&&(a=a.middleAdd(c+1,s),n=0,r=""),t.val(f(a,e[0][1])),d&&(curlength=t.val().length,c+=curlength-o,o=curlength,i.selectionEnd=c)}clearTimeout(timer),timer=setTimeout(i,1e3)}else 8==c?(o-=1,clearTimeout(timer),timer=setTimeout(i,1e3)):9==c&&(l.preventDefault(),a.focus(),r="",n="",s="")})),a.on("keydown",(l=>{let o=l.keyCode,i=l.shiftKey,u=l.ctrlKey,d=l.altKey,g=transform(o,!1,e[1][0]),h="";if(g)if(u||d)r="",u&&86==o&&setTimeout((()=>{a.val(a.val().replace(/\u2022(?![LNg\u00ff(\u00ffy)(\u00ffz)(\u00ff~)(\u00ff\u201a)(\u00ff\u201e)(\u00ff\u2026)])/g,"·"))}),200);else{l.preventDefault(),h=a.val();var v=document.getElementsByName("Classic")[0];let t=v.selectionEnd;if(v.selectionStart!=t){var m=v.selectionStart;h=h.substring(0,m)+h.substring(t,h.length),t=m}let r=i?g[2]:g[1];h=h.middleAdd(t,r),a.val(f(h,e[1][1])),v.selectionEnd=t+1}else 9==o&&(l.preventDefault(),t.focus(),r="",n="",s="");clearTimeout(timer),timer=setTimeout(c,500)})),$("#copy1").click((()=>{navigator.clipboard.writeText(a.val()),a.focus(),$("#copy1").text("Copied!"),setTimeout((()=>{$("#copy1").text("Copy")}),1e3)})),$("#copy2").click((()=>{navigator.clipboard.writeText(t.val()),t.focus(),$("#copy2").text("Copied!"),setTimeout((()=>{$("#copy2").text("Copy")}),1e3)}))}function transform(e=!1,t=!1,l){var a=e?"keycode":"nrml_txt";if(t)for(var r=0;r<l.length;r++){if(t==(n=l[r])[a])return[n.keycode,n.nrml_txt,n.sft_txt,!1];if(t==n.sft_txt)return[n.keycode,n.nrml_txt,n.sft_txt,!0]}else for(r=0;r<l.length;r++){var n;if(e==(n=l[r])[a])return[n.keycode,n.nrml_txt,n.sft_txt,!1]}}
    //prevent spy copy site
    document.addEventListener('contextmenu', (e) => e.preventDefault());

function ctrlShiftKey(e, keyCode) {
  return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
}

document.onkeydown = (e) => {
  // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
  if (
    e.keyCode === 123 ||
    ctrlShiftKey(e, 'I') ||
    ctrlShiftKey(e, 'J') ||
    ctrlShiftKey(e, 'C') ||
    (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0))
  )
    return false;
};
