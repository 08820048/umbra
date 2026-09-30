import{s as C}from"./messaging-DSq-4YP6.js";import{t as d,L as pe}from"./i18n-CDGIzRKC.js";const ye="國語體學時間長門開關車東們說什麼後萬點個書臺灣華讀寫聽權利現實網絡與爲專業處發現經過聯繫體驗選擇講義",Ee="国语体学时间长门开关车东们说什么是后万点个书台湾华读写听权利现实网络与为专业处发现经过联系体验选择讲义",Se={en:["the","is","are","was","were","and","of","to","in","that","it","for","with","as","on","this","be","by","from","or","an","at","not","you","we","have","has","will","can"],fr:["le","la","les","de","des","et","est","en","un","une","du","dans","que","qui","pour","par","sur","avec","au","ce","il","ne","pas","plus","vous","nous","très","être","mais"],de:["der","die","das","und","ist","ein","eine","nicht","mit","sich","auf","für","den","dem","zu","von","im","auch","als","nach","über","ich","sie","wir","nicht","noch","werden"],es:["el","la","los","las","de","del","que","en","un","una","y","es","por","con","para","no","se","al","lo","como","más","pero","muy","está","son","este"],pt:["o","a","os","as","de","do","da","dos","das","que","em","um","uma","não","para","com","por","mais","ao","se","como","também","você","está","são","isso"]};function O(e,t){return(e.match(t)??[]).length}function se(e,t){let n=0;for(const o of e)t.includes(o)&&n++;return n}function Te(e){const t=e.toLowerCase().match(/[\p{L}]+/gu)??[];if(t.length<3)return null;const n={en:0,fr:0,de:0,es:0,pt:0};for(const l of t)Object.keys(n).forEach(a=>{Se[a].includes(l)&&n[a]++});const o=Object.keys(n).map(l=>[l,n[l]]);o.sort((l,a)=>a[1]-l[1]);const[r,i]=o[0],s=o[1][1];return i<2||i<s*1.3?null:r}function le(e){return e==="zh-TW"?"zh":e}function ve(e){const t=e.trim();if(!t)return null;const n=O(t,/[\u4e00-\u9fff]/g),o=O(t,/[\u3040-\u30ff]/g),r=O(t,/[\uac00-\ud7af]/g),i=O(t,/[\u0400-\u04ff]/g),s=O(t,/[a-zA-Z]/g),l=n+o+r+i+s;if(l<3)return null;if(o>=2||o>0&&o>=n*.15)return"ja";if(r>=2||r>=l*.3)return"ko";if(n>=l*.5){const a=se(t,ye),c=se(t,Ee);return a>c?"zh-TW":"zh"}return i>=l*.5?"ru":s>=l*.5?Te(t):null}const b="web-translator-bubble";let F=null,ce=0,T=null,Z=null,P=null;function ne(){F!==null&&(window.clearInterval(F),F=null)}function ke(e){ne(),ce=performance.now();const t=e.querySelector(".wt-timer");t&&(F=window.setInterval(()=>{const n=((performance.now()-ce)/1e3).toFixed(1);t.textContent=`${n}s`},100))}function de(){const e=document.createElement("span");return e.className="wt-cursor",e}function Ce(){if(document.getElementById("web-translator-bubble-style"))return;const e=document.createElement("style");e.id="web-translator-bubble-style",e.textContent=`
    #${b} {
      position: fixed;
      z-index: 2147483647;
      max-width: 360px;
      min-width: 160px;
      background: #f5f4ed;
      color: #141413;
      border: 1px solid #e8e6dc;
      border-radius: 10px;
      box-shadow: 0 10px 28px rgba(20,20,19,.16);
      font: 13px/1.65 Charter, Georgia, Palatino, "TsangerJinKai02", "Source Han Serif SC", "Songti SC", "SimSun", serif;
      letter-spacing: .05em;
      padding: 12px 14px;
      box-sizing: border-box;
    }
    #${b} .wt-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
      color: #1b365d;
      font-size: 12px;
      font-weight: 500;
      letter-spacing: .18em;
    }
    #${b} .wt-timer {
      margin-left: auto;
      color: #6b6a64;
      font-weight: 400;
      letter-spacing: .05em;
      font-variant-numeric: tabular-nums;
    }
    #${b} .wt-close {
      background: transparent;
      border: none;
      color: #6b6a64;
      cursor: pointer;
      font-size: 16px;
      line-height: 1;
      padding: 0 2px;
    }
    #${b} .wt-close:hover { color: #141413; }
    #${b} .wt-body {
      white-space: pre-wrap;
      word-break: break-word;
      color: #3d3d3a;
    }
    #${b} .wt-loading {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #504e49;
    }
    #${b} .wt-spinner {
      width: 14px;
      height: 14px;
      border: 2px solid rgba(27,54,93,.18);
      border-top-color: #1b365d;
      border-radius: 50%;
      animation: wt-spin .7s linear infinite;
    }
    @keyframes wt-spin { to { transform: rotate(360deg); } }
    #${b} .wt-cursor {
      display: inline-block;
      width: 2px;
      height: 1em;
      margin-left: 2px;
      vertical-align: text-bottom;
      background: #1b365d;
      animation: wt-blink 1s steps(2) infinite;
    }
    @keyframes wt-blink { 50% { opacity: 0; } }
    #${b} .wt-error { color: #b03a32; }
    #${b} .wt-actions {
      margin-top: 10px;
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    #${b} .wt-btn {
      appearance: none;
      border: none;
      border-radius: 999px;
      padding: 5px 14px;
      font-family: inherit;
      font-size: 12px;
      font-weight: 500;
      letter-spacing: .05em;
      cursor: pointer;
      background: #1b365d;
      color: #faf9f5;
    }
    #${b} .wt-btn.secondary {
      background: #e8e6dc;
      color: #3d3d3a;
    }
    #${b} .wt-btn:hover { background: #2d5a8a; }
    #${b} .wt-btn.secondary:hover { background: #e5e3d8; }
  `,document.documentElement.appendChild(e)}function Y(e,t,n){const r=e.getBoundingClientRect();let i=t,s=n+12;i+r.width>window.innerWidth-8&&(i=window.innerWidth-r.width-8),i<8&&(i=8),s+r.height>window.innerHeight-8&&(s=n-r.height-12),s<8&&(s=8),e.style.left=`${Math.round(i)}px`,e.style.top=`${Math.round(s)}px`}function z(){if(ne(),T==null||T.remove(),T=null,Z=null,P){const e=P;P=null,e()}}function w(e,t,n){if(Ce(),e==="stream"&&Z==="stream"&&T){const a=T.querySelector(".wt-body");return a&&(a.textContent="",a.append(document.createTextNode(t),de())),Y(T,n.x,n.y),T}ne(),P=null,z();const o=document.createElement("div");o.id=b,o.setAttribute("role","dialog"),o.setAttribute("aria-live","polite");const r=document.createElement("div");r.className="wt-header";const i=document.createElement("span");if(i.textContent=e==="loading"||e==="stream"?d("bubbleTranslating"):e==="error"||e==="missing-key"?d("bubbleFailed"):d("bubbleResult"),r.append(i),e==="loading"||e==="stream"){const a=document.createElement("span");a.className="wt-timer",a.textContent="0.0s",r.append(a)}const s=document.createElement("button");s.className="wt-close",s.type="button",s.setAttribute("aria-label",d("bubbleClose")),s.textContent="×",s.addEventListener("click",a=>{a.stopPropagation(),z()}),r.append(s);const l=document.createElement("div");if(l.className="wt-body",e==="loading")l.innerHTML=`<div class="wt-loading"><span class="wt-spinner"></span><span>${d("bubbleWorking")}</span></div>`;else if(e==="stream")l.append(document.createTextNode(t),de());else if(e==="missing-key"){l.innerHTML=`<div class="wt-error">${d("bubbleNoKey")}</div>`;const a=document.createElement("div");a.className="wt-actions";const c=document.createElement("button");c.className="wt-btn",c.type="button",c.textContent=d("actOpenOptions"),c.addEventListener("click",p=>{var f;p.stopPropagation(),(f=n.onOpenOptions)==null||f.call(n)}),a.appendChild(c),l.appendChild(a)}else if(e==="error"){const a=document.createElement("div");a.className="wt-error",a.textContent=t||d("bubbleFailed"),l.appendChild(a);const c=document.createElement("div");if(c.className="wt-actions",n.onRetry){const f=document.createElement("button");f.className="wt-btn",f.type="button",f.textContent=d("bubbleRetry"),f.addEventListener("click",N=>{var M;N.stopPropagation(),(M=n.onRetry)==null||M.call(n)}),c.appendChild(f)}const p=document.createElement("button");p.className="wt-btn secondary",p.type="button",p.textContent=d("actOpenOptions"),p.addEventListener("click",f=>{var N;f.stopPropagation(),(N=n.onOpenOptions)==null||N.call(n)}),c.appendChild(p),l.appendChild(c)}else l.textContent=t;return o.append(r,l),document.documentElement.appendChild(o),Y(o,n.x,n.y),T=o,Z=e,P=n.onDismiss??null,(e==="loading"||e==="stream")&&ke(o),requestAnimationFrame(()=>Y(o,n.x,n.y)),o}function fe(e){var t;return e instanceof Node?!!((t=document.getElementById(b))!=null&&t.contains(e)):!1}const E="web-translator-selection-toolbar";let k=null;function Ne(){if(document.getElementById("web-translator-selection-toolbar-style"))return;const e=document.createElement("style");e.id="web-translator-selection-toolbar-style",e.textContent=`
    #${E} {
      position: fixed;
      z-index: 2147483647;
      display: flex;
      gap: 4px;
      padding: 4px;
      background: #f5f4ed;
      border: 1px solid #e8e6dc;
      border-radius: 8px;
      box-shadow: 0 6px 20px rgba(20,20,19,.18);
      box-sizing: border-box;
    }
    #${E} .wt-toolbar-btn {
      appearance: none;
      border: none;
      cursor: pointer;
      padding: 5px 12px;
      border-radius: 6px;
      background: #1b365d;
      color: #faf9f5;
      font: 500 12px/1.4 Charter, Georgia, Palatino, "TsangerJinKai02", "Source Han Serif SC", "Songti SC", "SimSun", serif;
      letter-spacing: .08em;
      white-space: nowrap;
    }
    #${E} .wt-toolbar-btn:hover { background: #2d5a8a; }
    #${E} .wt-toolbar-btn:disabled {
      opacity: .5;
      cursor: not-allowed;
      background: #1b365d;
    }
    #${E} .wt-toolbar-btn.secondary {
      background: #e8e6dc;
      color: #3d3d3a;
    }
    #${E} .wt-toolbar-btn.secondary:hover { background: #e5e3d8; }
    #${E} .wt-toolbar-btn.icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 5px 8px;
      margin-left: auto;
    }
    #${E} .wt-toolbar-btn.icon svg {
      display: block;
      width: 14px;
      height: 14px;
    }
  `,document.documentElement.appendChild(e)}function ue(e,t,n,o=!1){const r=document.createElement("button");return r.type="button",r.className=t?"wt-toolbar-btn secondary":"wt-toolbar-btn",r.textContent=e,o?(r.disabled=!0,r.title=d("noTranslateNeeded")||"Already in the target language",r):(r.addEventListener("mousedown",i=>i.preventDefault()),r.addEventListener("click",i=>{i.stopPropagation(),h(),n()}),r)}function Ae(e){const t=document.createElement("button");t.type="button",t.className="wt-toolbar-btn secondary icon",t.setAttribute("aria-label",d("actOpenOptions")||"Settings"),t.title=d("actOpenOptions")||"Settings";const n=document.createElementNS("http://www.w3.org/2000/svg","svg");return n.setAttribute("viewBox","0 0 24 24"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2"),n.setAttribute("stroke-linecap","round"),n.setAttribute("stroke-linejoin","round"),["M11 10.27 7 3.34","m11 13.73-4 6.93","M12 22v-2","M12 2v2","M14 12h8","m17 20.66-1-1.73","m17 3.34-1 1.73","M2 12h2","m20.66 17-1.73-1","m20.66 7-1.73 1","m3.34 17 1.73-1","m3.34 7 1.73 1"].forEach(r=>{const i=document.createElementNS("http://www.w3.org/2000/svg","path");i.setAttribute("d",r),n.appendChild(i)}),[2,8].forEach(r=>{const i=document.createElementNS("http://www.w3.org/2000/svg","circle");i.setAttribute("cx","12"),i.setAttribute("cy","12"),i.setAttribute("r",String(r)),n.appendChild(i)}),t.appendChild(n),t.addEventListener("mousedown",r=>r.preventDefault()),t.addEventListener("click",r=>{r.stopPropagation(),h(),e()}),t}function Le(e,t){Ne(),h();const n=document.createElement("div");n.id=E,n.setAttribute("role","toolbar"),n.append(ue(d("toolbarTranslate")||"Translate",!1,t.onTranslate,t.translateDisabled??!1),ue(d("toolbarRewrite")||"Translate to",!0,t.onRewrite),Ae(t.onOpenSettings)),document.documentElement.appendChild(n),k=n;const o=n.offsetWidth,r=n.offsetHeight;let i=e.left+e.width/2-o/2,s=e.top-r-8;s<8&&(s=e.bottom+8),i<8&&(i=8),i+o>window.innerWidth-8&&(i=window.innerWidth-o-8),n.style.left=`${Math.round(i)}px`,n.style.top=`${Math.round(s)}px`}function h(){k==null||k.remove(),k=null}function me(e){return e instanceof Node?!!(k!=null&&k.contains(e)):!1}const u="web-translator-rewrite-panel",B='Charter, Georgia, Palatino, "TsangerJinKai02", "Source Han Serif SC", "Songti SC", "SimSun", serif';let x=null,re=null,Q="",_="zh";function $e(){if(document.getElementById("web-translator-rewrite-style"))return;const e=document.createElement("style");e.id="web-translator-rewrite-style",e.textContent=`
    #${u} {
      position: fixed;
      z-index: 2147483647;
      width: 340px;
      background: #f5f4ed;
      color: #141413;
      border: 1px solid #e8e6dc;
      border-radius: 8px;
      box-shadow: 0 12px 32px rgba(20,20,19,.2);
      padding: 14px;
      box-sizing: border-box;
      font: 13px/1.6 ${B};
      letter-spacing: .05em;
    }
    #${u} .rw-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
    }
    #${u} .rw-title {
      color: #1b365d;
      font-size: 13px;
      font-weight: 500;
      letter-spacing: .18em;
    }
    #${u} .rw-close {
      background: transparent;
      border: none;
      color: #6b6a64;
      cursor: pointer;
      font-size: 16px;
      line-height: 1;
      padding: 0 2px;
    }
    #${u} .rw-close:hover { color: #141413; }
    #${u} .rw-label {
      font-size: 11px;
      color: #6b6a64;
      letter-spacing: .15em;
      margin-bottom: 4px;
    }
    #${u} .rw-source,
    #${u} .rw-result {
      background: #f0eee6;
      border: 1px solid #e8e6dc;
      border-radius: 6px;
      padding: 8px 10px;
      max-height: 110px;
      overflow-y: auto;
      white-space: pre-wrap;
      word-break: break-word;
      color: #3d3d3a;
      font-size: 12px;
      min-height: 34px;
    }
    #${u} .rw-result.error { color: #b03a32; }
    #${u} .rw-block { margin-bottom: 10px; }
    #${u} .rw-lang {
      position: relative;
      margin-bottom: 8px;
    }
    #${u} .rw-lang-trigger {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 7px 10px;
      border: 1px solid #e8e6dc;
      border-radius: 6px;
      background: #faf9f5;
      color: #141413;
      font: 500 12px/1.4 ${B};
      letter-spacing: .05em;
      cursor: pointer;
    }
    #${u} .rw-lang-trigger[aria-expanded="true"] {
      border-color: #1b365d;
      box-shadow: 0 0 0 3px #eef2f7;
    }
    #${u} .rw-lang-menu {
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      right: 0;
      z-index: 2;
      background: #faf9f5;
      border: 1px solid #e8e6dc;
      border-radius: 6px;
      box-shadow: 0 10px 24px rgba(20,20,19,.16);
      padding: 4px;
      max-height: 180px;
      overflow-y: auto;
    }
    #${u} .rw-lang-option {
      display: block;
      width: 100%;
      text-align: left;
      padding: 6px 8px;
      border: none;
      border-radius: 4px;
      background: transparent;
      color: #3d3d3a;
      font: 400 12px/1.4 ${B};
      cursor: pointer;
    }
    #${u} .rw-lang-option:hover { background: #f0eee6; }
    #${u} .rw-lang-option.selected {
      background: #eef2f7;
      color: #1b365d;
      font-weight: 500;
    }
    #${u} .rw-actions {
      display: flex;
      gap: 8px;
    }
    #${u} .rw-btn {
      appearance: none;
      border: none;
      cursor: pointer;
      flex: 1;
      padding: 8px 12px;
      border-radius: 999px;
      background: #1b365d;
      color: #faf9f5;
      font: 500 12px/1.4 ${B};
      letter-spacing: .08em;
    }
    #${u} .rw-btn:hover { background: #2d5a8a; }
    #${u} .rw-btn:disabled { opacity: .55; cursor: not-allowed; }
    #${u} .rw-btn.confirm { background: #2f7d52; }
    #${u} .rw-btn.confirm:hover { background: #3a9563; }
    #${u} .rw-btn[hidden] { display: none !important; }
  `,document.documentElement.appendChild(e)}function ee(e){return`${d(`lang_${e.replace("-","")}`)||pe[e]} (${e})`}function Re(){const e=document.createElement("div");e.className="rw-lang";const t=document.createElement("button");t.type="button",t.className="rw-lang-trigger",t.setAttribute("aria-expanded","false");const n=document.createElement("span"),o=document.createElement("span");o.textContent="▾",t.append(n,o);const r=document.createElement("div");r.className="rw-lang-menu",r.hidden=!0;const i=()=>{n.textContent=ee(_)},s=()=>{r.hidden=!0,t.setAttribute("aria-expanded","false"),document.removeEventListener("mousedown",l,!0)},l=a=>{e.contains(a.target)||s()};return Object.keys(pe).forEach(a=>{const c=document.createElement("button");c.type="button",c.className="rw-lang-option",c.textContent=ee(a),c.addEventListener("mousedown",p=>p.preventDefault()),c.addEventListener("click",()=>{_=a,i(),s()}),r.appendChild(c)}),t.addEventListener("click",()=>{r.hidden?(r.hidden=!1,t.setAttribute("aria-expanded","true"),document.addEventListener("mousedown",l,!0)):s()}),i(),e.append(t,r),e}function I(e,t=!1){const n=x==null?void 0:x.querySelector(".rw-result");n&&(n.textContent=e,n.classList.toggle("error",t))}function Oe(e){const t=re;if(!t||!t.startContainer.isConnected)return!1;try{return t.deleteContents(),t.insertNode(document.createTextNode(e)),!0}catch{return!1}}function Ie(e,t,n){$e(),$(),Q=e,re=t?t.cloneRange():null;const o=document.createElement("div");o.id=u,o.setAttribute("role","dialog"),o.setAttribute("aria-live","polite");const r=document.createElement("div");r.className="rw-head";const i=document.createElement("span");i.className="rw-title",i.textContent=d("rwTitle")||"Rewrite";const s=document.createElement("button");s.type="button",s.className="rw-close",s.setAttribute("aria-label",d("bubbleClose")),s.textContent="×",s.addEventListener("click",()=>$()),r.append(i,s);const l=document.createElement("div");l.className="rw-block";const a=document.createElement("div");a.className="rw-label",a.textContent=d("rwSourceLabel")||"Source";const c=document.createElement("div");c.className="rw-source",c.textContent=e,l.append(a,c);const p=document.createElement("div");p.className="rw-block";const f=document.createElement("div");f.className="rw-label",f.textContent=d("rwResultLabel")||"Result";const N=document.createElement("div");N.className="rw-result",p.append(f,N);const M=Re(),H=document.createElement("div");H.className="rw-label",H.textContent=d("rwLangLabel")||"Rewrite as";const K=document.createElement("div");K.className="rw-actions";const A=document.createElement("button");A.type="button",A.className="rw-btn",A.textContent=d("rwStart")||"Rewrite";const v=document.createElement("button");v.type="button",v.className="rw-btn confirm",v.textContent=d("rwConfirm")||"Confirm & replace",v.hidden=!0,K.append(A,v),A.addEventListener("click",()=>{(async()=>{A.disabled=!0,v.hidden=!0,I(d("rwLoading")||"…");try{const g=await C({type:"TRANSLATE_TEXT",text:Q,targetLanguage:_});if(!g.ok){I(g.error,!0);return}"text"in g&&(I(g.text),v.hidden=!1)}catch(g){const y=g instanceof Error?g.message:String(g);I(y.includes("Extension context invalidated")&&d("errRefreshPage")||y,!0)}finally{A.disabled=!1}})()}),v.addEventListener("click",()=>{const g=x==null?void 0:x.querySelector(".rw-result"),y=(g==null?void 0:g.textContent)??"";if(!y||!Oe(y)){I(d("rwReplaceFail"),!0);return}$()}),o.append(r,l,H,M,p,K),document.documentElement.appendChild(o),x=o;const j=o.offsetWidth,ae=o.offsetHeight;let R=n.left+n.width/2-j/2,X=n.top-ae-8;X<8&&(X=Math.min(n.bottom+8,window.innerHeight-ae-8)),R<8&&(R=8),R+j>window.innerWidth-8&&(R=window.innerWidth-j-8),o.style.left=`${Math.round(R)}px`,o.style.top=`${Math.round(Math.max(8,X))}px`,(async()=>{try{const g=await C({type:"GET_SETTINGS"});if(g.ok&&"settings"in g){_=g.settings.targetLanguage;const y=o.querySelector(".rw-lang-trigger span");y&&(y.textContent=ee(_))}}catch{}})()}function $(){x==null||x.remove(),x=null,re=null,Q=""}function be(e){return e instanceof Node?!!(x!=null&&x.contains(e)):!1}const ge="data-wt-original",W="data-wt-translated",Pe=new Set(["SCRIPT","STYLE","NOSCRIPT","TEXTAREA","INPUT","SELECT","OPTION","CODE","PRE","KBD","SAMP","SVG","MATH","IFRAME","CANVAS","VIDEO","AUDIO"]);function _e(e){var n,o;return!!(!e||Pe.has(e.tagName)||e.id==="web-translator-bubble"||(n=e.closest)!=null&&n.call(e,"#web-translator-bubble")||((o=e.getAttribute)==null?void 0:o.call(e,"role"))==="textbox"||e instanceof HTMLElement&&e.isContentEditable)}function Me(e=document.body){if(!e)return[];const t=[],n=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,{acceptNode(r){const i=r.nodeValue||"";if(!i.trim())return NodeFilter.FILTER_REJECT;const s=r.parentElement;return _e(s)||!/[\p{L}\p{N}]/u.test(i)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}});let o;for(;o=n.nextNode();){const r=o;t.push({node:r,text:r.nodeValue||""})}return t}function Be(e,t){const n=[];for(let o=0;o<e.length;o+=t)n.push(e.slice(o,o+t));return n}async function Fe(e,t){we();const n=Me();if(n.length===0)return{translated:0,skipped:0};const o=Be(n,20);let r=0;for(const i of o){const s=i.map(a=>a.text);let l;try{l=await e(s)}catch(a){throw a}for(let a=0;a<i.length;a++){const c=i[a],p=l[a];if(!c.node.isConnected||typeof p!="string"||p===c.text)continue;const f=c.node.parentElement;f&&f.hasAttribute(ge),f&&(f.hasAttribute(W)||f.setAttribute(W,"1")),ze(c.node,c.text),c.node.nodeValue=p,r++}}return{translated:r,skipped:n.length-r}}const D=new WeakMap,G=new Set;function ze(e,t){D.has(e)||(D.set(e,t),G.add(e))}function we(){let e=0;for(const t of Array.from(G)){const n=D.get(t);n!==void 0&&t.isConnected&&(t.nodeValue=n,e++),D.delete(t),G.delete(t)}return document.querySelectorAll(`[${W}]`).forEach(t=>{t.removeAttribute(W),t.removeAttribute(ge)}),e}function We(){return G.size>0}let S=null,V=!1,J=!1,m=null;function te(e){e.timer!==null&&(window.clearInterval(e.timer),e.timer=null)}function xe(e){e.timer===null&&(e.timer=window.setInterval(()=>{if(m!==e){te(e);return}const t=e.finalText??e.text;if(e.shown<t.length){const n=Math.max(3,Math.ceil((t.length-e.shown)*.18));e.shown=Math.min(t.length,e.shown+n),w("stream",t.slice(0,e.shown),e.opts)}else e.finalText!==null&&(te(e),m=null,w("result",e.finalText,e.opts))},40))}function U(e){e&&(te(e),m===e&&(m=null))}function L(){C({type:"OPEN_OPTIONS"}).catch(e=>{w("error",oe(e),{x:window.innerWidth-40,y:24})})}function oe(e){const t=e instanceof Error?e.message:String(e);return t.includes("Extension context invalidated")&&d("errRefreshPage")||t}async function q(e,t,n){const o=e.trim();if(!o||o.length>5e3||V)return;V=!0,h();const r=Math.random().toString(36).slice(2),i={x:t,y:n,onOpenOptions:L,onRetry:()=>{q(o,t,n)},onDismiss:()=>{(m==null?void 0:m.requestId)===r&&U(m)}};w("loading","",i);try{if(!await He()){const p=await C({type:"TRANSLATE_TEXT",text:o});if(!p.ok){w(p.code==="MISSING_API_KEY"?"missing-key":"error",p.error,i);return}"text"in p&&w("result",p.text,i);return}const l={requestId:r,text:"",shown:0,timer:null,finalText:null,opts:i};m=l;const a=await C({type:"TRANSLATE_TEXT_STREAM",requestId:r,text:o});if(!a.ok){U(l),w(a.code==="MISSING_API_KEY"?"missing-key":"error",a.error,i);return}const c="text"in a&&a.text?a.text:l.text;m===l?(l.finalText=c,xe(l)):w("result",c,i)}catch(s){(m==null?void 0:m.requestId)===r&&U(m),w("error",oe(s),i)}finally{V=!1}}function ie(){const e=window.getSelection();return!e||e.isCollapsed?"":e.toString()}function De(){const e=window.getSelection();return!e||e.rangeCount===0||!e.toString().trim()?null:e.getRangeAt(0).getBoundingClientRect()}function Ge(){const e=window.getSelection();return!e||e.rangeCount===0||!e.toString().trim()?null:e.getRangeAt(0).cloneRange()}async function qe(){try{const e=await C({type:"GET_SETTINGS"});return e.ok&&"settings"in e?e.settings:null}catch{return null}}async function He(){try{const e=await C({type:"GET_SETTINGS"});return e.ok&&"settings"in e?e.settings.streamingEnabled!==!1:!0}catch{return!0}}function Ke(e,t){if(!t)return!1;const n=ve(e);return n!==null&&le(n)===le(t)}function je(e){e.button===0&&(fe(e.target)||me(e.target)||be(e.target)||(S={x:e.clientX,y:e.clientY},setTimeout(()=>{(async()=>{const t=ie();if(!t.trim()||!S){h();return}const n=De(),o=Ge();if(!n)return;const{x:r,y:i}=S,s=await qe(),l=Ke(t,s==null?void 0:s.targetLanguage);if(s!=null&&s.autoTranslateOnSelect){h(),$(),l||q(t,r,i);return}$(),Le(n,{onTranslate:()=>{q(t,r,i)},onRewrite:()=>{Ie(t,o,n)},onOpenSettings:L,translateDisabled:l})})()},10)))}function Xe(e){e.key==="Escape"&&(h(),$(),z())}function Ye(e){if(me(e.target)||fe(e.target)||be(e.target))return;$(),ie().trim()||(h(),z())}async function he(){if(J)return;J=!0;const e=Math.min(window.innerWidth-40,window.innerWidth-200),t=24;w("loading","",{x:e,y:t,onOpenOptions:L});try{const n=await Fe(async o=>{const r=await C({type:"TRANSLATE_BATCH",texts:o});if(!r.ok){const i=new Error(r.error);throw i.code=r.code,i}if(!("texts"in r))throw new Error(d("msgInvalidBatch"));return r.texts});w("result",d("pageTranslateDone",String(n.translated)),{x:e,y:t,onOpenOptions:L})}catch(n){const o=oe(n);n.code==="MISSING_API_KEY"?w("missing-key",o,{x:e,y:t,onOpenOptions:L}):w("error",o,{x:e,y:t,onOpenOptions:L,onRetry:()=>{he()}})}finally{J=!1}}function Ve(){const e=we(),t=Math.min(window.innerWidth-40,window.innerWidth-200);w("result",e>0?d("bubbleRestored",String(e)):d("bubbleNothing"),{x:t,y:24,onOpenOptions:L})}chrome.runtime.onMessage.addListener((e,t,n)=>{const o=e.type;if(o==="FULL_PAGE_TRANSLATE")return he().then(()=>n({ok:!0,translated:We()})),!0;if(o==="FULL_PAGE_RESTORE")return Ve(),n({ok:!0}),!1;if(o==="TRANSLATE_SELECTION_FROM_MENU"){const r=e.text||ie(),i=(S==null?void 0:S.x)??window.innerWidth/2,s=(S==null?void 0:S.y)??80;return h(),q(r,i,s),n({ok:!0}),!1}if(o==="TRANSLATE_STREAM_CHUNK"){const{requestId:r,chunk:i}=e;return m&&m.requestId===r&&(m.text+=i,xe(m)),n({ok:!0}),!1}return o==="PING"&&n({ok:!0}),!1});document.addEventListener("mouseup",je,!0);document.addEventListener("keydown",Xe,!0);document.addEventListener("mousedown",Ye,!0);window.addEventListener("scroll",h,!0);window.addEventListener("resize",h);
