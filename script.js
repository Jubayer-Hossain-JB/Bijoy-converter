String.prototype.replaceAt=function(e,t){return this.substring(0,e)+t+this.substring(e+1,this.length)},String.prototype.middleAdd=function(e,t){return this.substring(0,e)+t+this.substring(e,this.length)},String.prototype.replaceAll=function(e,t,l){return this.replace(RegExp(e.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),l?"gi":"g"),"string"==typeof t?t.replace(/\$/g,"$$$$"):t)},fetch("./key.json").then(e=>e.json()).then(e=>{asyncCall(e)});var timer="";function asyncCall(e){let t=$('[name="Unicode"]'),l=$('[name="Classic"]');l.focus();let r="",n=0,a="";var i=0;function s(){value=t.val();var r="";new Promise(t=>{if(value){var l=e[0][1];for(var r of l)value=value.replaceAll(r.out,r.seq),r==l[l.length-1]&&t(value)}}).then(t=>new Promise(l=>{var n="";for(l of t){var a=transform(!1,l,e[0][0]);if(a){var i,s=transform(parseInt(a[0]),!1,e[1][0]);if(s)i=a[3]?s[2]:s[1];else{var o=["0","1","2","3","4","5","6","7","8","9","!","@","#","$","%","^","*","(",")","?",",","<",".",">","=","+",":",";","/"],c=["০","১","২","৩","৪","৫","৬","৭","৮","৯","!","@","#","৳","%","ৰ","*","(",")","?",",","<",".",">","=","+",":",";","/"];for(var f of c)l==f&&(i=o[c.indexOf(f)])}i+=n,n="","‰"==i||"w"==i||"‡"==i?"&"==r[r.length-2]?(r="&"==r[r.length-4]?r.middleAdd(r.length-5,i):r.middleAdd(r.length-3,i),i=""):"\xa9"==r[r.length-1]?(r=r.middleAdd(r.length-2,i),i=""):"&"!=r[r.length-1]&&(r=r.middleAdd(r.length-1,i),i=""):"&"==i&&"i"==r[r.length-1]&&("‍"!=n?(i="",r=r.replaceAt(r.length-1,""),n="\xa9"):n=""),r+=i}else if("়"==l){switch(r[r.length-1]){case"h":r+="q";break;case"W":r+="o";break;case"X":r+="p"}r=r.replaceAt(r.length-2,"")}else"‍"==l&&(n=l);l==t[t.length-1]&&l()}})).then(()=>{if(r.length>=2)for(var t of e[1][1])r=r.replaceAll(t.seq,t.out);l.val(r)})}function o(){value=l.val(),r="";var i="";new Promise(t=>{if(value){var l=e[1][1];for(var r of l)value=value.replaceAll(r.out,r.seq),r==l[l.length-1]&&t(value)}}).then(t=>new Promise(l=>{for(l of t){var s=transform(!1,l,e[1][0]);if(s){var o=transform(parseInt(s[0]),!1,e[0][0]),f=(s[3]?o[2]:o[1])+r,d=i[i.length-1];if("্"!=d)switch(f){case"ে":case"ৈ":case"ি":r=f,f="";break;case"র্":i=i.middleAdd(i.length-1,f),f="";break;case"্":("ে"==d||"ৈ"==d||"ি"==d)&&(a=d,n=i.length+1,i=i.replaceAt(i.length-1,""));break;default:r=""}i+=f,n&&i.length===n&&(i+=a,n=0,r="")}else{var _=["0","1","2","3","4","5","6","7","8","9","!","@","#","$","%","^","*","(",")","?",",","<",".",">","=","+",":",";","/","\n"],h=["০","১","২","৩","৪","৫","৬","৭","৮","৯","!","@","#","৳","%","ৰ","*","(",")","?",",","<",".",">","=","+",":",";","/","\n"];for(var g of _)l==g&&(i+=h[_.indexOf(g)])}i=c(i,e[0][1]),l==t[t.length-1]&&l()}})).then(()=>{t.val(i)})}function c(e,t){var l;for(var r of(l=e.length>=5?e.substring(e.length-5,e.length):e,t))l=l.replace(r.seq,r.out);return e.substring(0,e.length-5)+l}t.on("keydown",l=>{let o=l.keyCode,f=l.shiftKey,d=l.ctrlKey,_=l.altKey,h=transform(o,!1,e[0][0]);if(h){if(d||_)console.warn("Externel...");else{l.preventDefault();let g=t.val(),v=document.getElementsByName("Unicode")[0],p=v.selectionEnd;if(v.selectionStart!=p){var u,m=v.selectionStart;i-=p-m,g=g.substring(0,m)+g.substring(p,g.length),p=m}u=p>0?g[p-1]:"";let y=(f?h[2]:h[1])+r;if(r&&(g=g.replaceAt(p-1,""),p-=1,i-=1),"্"!=u)switch(y){case"ে":case"ৈ":case"ি":r=y;break;case"র্":g="ে"==u||"ৈ"==u||"ি"==u?g.middleAdd(p-2,y):g.middleAdd(p-1,y),y="";break;case"্র":case"্য":case"্":("ে"==u||"ৈ"==u||"ি"==u)&&(a=u,n=g.length+1,g=g.replaceAt(p-1,""));break;default:r=""}g=g.middleAdd(p,y),n&&g.length===n&&(console.log(p),g=g.middleAdd(p+1,a),n=0,r=""),t.val(c(g,e[0][1])),y&&(p+=(curlength=t.val().length)-i,i=curlength,v.selectionEnd=p)}clearTimeout(timer),timer=setTimeout(s,1e3)}else 8==o&&(i-=1,clearTimeout(timer),timer=setTimeout(s,1e3))}),l.on("keydown",t=>{let n=t.keyCode,a=t.shiftKey,i=t.ctrlKey,s=t.altKey,f=transform(n,!1,e[1][0]),d="";if(f){if(i||s)r="";else{t.preventDefault(),d=l.val();var _=document.getElementsByName("Classic")[0];let h=_.selectionEnd;if(_.selectionStart!=h){var g=_.selectionStart;d=d.substring(0,g)+d.substring(h,d.length),h=g}let v=a?f[2]:f[1];d=d.middleAdd(h,v),l.val(c(d,e[1][1])),_.selectionEnd=h+1}}clearTimeout(timer),timer=setTimeout(o,500)}),$("#copy1").click(()=>{navigator.clipboard.writeText(l.val()),l.focus(),$("#copy1").text("Copied!"),setTimeout(()=>{$("#copy1").text("Copy")},1e3)}),$("#copy2").click(()=>{navigator.clipboard.writeText(t.val()),t.focus(),$("#copy2").text("Copied!"),setTimeout(()=>{$("#copy2").text("Copy")},1e3)})}function transform(e=!1,t=!1,l){var r=e?"keycode":"nrml_txt";if(t)for(var n=0;n<l.length;n++){var a=l[n];if(t==a[r])return[a.keycode,a.nrml_txt,a.sft_txt,!1];if(t==a.sft_txt)return[a.keycode,a.nrml_txt,a.sft_txt,!0]}else for(var n=0;n<l.length;n++){var a=l[n];if(e==a[r])return[a.keycode,a.nrml_txt,a.sft_txt,!1]}}
