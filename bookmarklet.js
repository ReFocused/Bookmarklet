javascript:"use strict";void function(){if(document.querySelector("div.student-gb-grades-main")){const a=[],b=a=>90<=a?"A":80<=a?"B":70<=a?"C":60<=a?"D":"F",c=()=>{let c=0,d=0;const e=a=>0>a?0:a;for(const b of a)c+=e(b.earned),d+=e(b.possible);const f=Math.round(100*(c/d));console.log(c,d,`${f}% ${b(f)}`),document.querySelector("div.gradebook-grid-title.wide").textContent=`Current Grade in Class: ${f}% ${b(f)}`},d=Array.from(document.querySelectorAll("table.grades-grid > tbody > tr > td.primary-grade-cell"));for(const b of d){const d=b.querySelector("span.data-field-points_earned"),e=b.querySelector("span.data-field-points_possible");if(!d||!e||!d.textContent||!e.textContent)continue;const f=(a,b)=>{if("X"===a)return b;const c=parseFloat(a);return isNaN(c)?0:c},g=parseFloat(e.textContent),h=f(d.textContent,g),i=a.push({earned:h,possible:g}),j=document.createElement("input");j.type="number",j.value=h.toString(),j.style.display="block",d.replaceWith(j),j.addEventListener("change",()=>{a[i-1].earned=f(j.value,g),c()})}c()}else if(document.querySelector("div.communication-container > div.communication"));else alert("ReFocused is not supported on this page.")}();
