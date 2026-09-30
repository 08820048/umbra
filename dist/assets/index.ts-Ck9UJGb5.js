import{s as C}from"./messaging-DSq-4YP6.js";import{t as c,L as le}from"./i18n-CDGIzRKC.js";const b="web-translator-bubble";let B=null,ie=0,S=null,j=null,O=null;function te(){B!==null&&(window.clearInterval(B),B=null)}function we(e){te(),ie=performance.now();const t=e.querySelector(".wt-timer");t&&(B=window.setInterval(()=>{const n=((performance.now()-ie)/1e3).toFixed(1);t.textContent=`${n}s`},100))}function ae(){const e=document.createElement("span");return e.className="wt-cursor",e}function xe(){if(document.getElementById("web-translator-bubble-style"))return;const e=document.createElement("style");e.id="web-translator-bubble-style",e.textContent=`
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
  `,document.documentElement.appendChild(e)}function V(e,t,n){const o=e.getBoundingClientRect();let i=t,s=n+12;i+o.width>window.innerWidth-8&&(i=window.innerWidth-o.width-8),i<8&&(i=8),s+o.height>window.innerHeight-8&&(s=n-o.height-12),s<8&&(s=8),e.style.left=`${Math.round(i)}px`,e.style.top=`${Math.round(s)}px`}function F(){if(te(),S==null||S.remove(),S=null,j=null,O){const e=O;O=null,e()}}function x(e,t,n){if(xe(),e==="stream"&&j==="stream"&&S){const a=S.querySelector(".wt-body");return a&&(a.textContent="",a.append(document.createTextNode(t),ae())),V(S,n.x,n.y),S}te(),O=null,F();const r=document.createElement("div");r.id=b,r.setAttribute("role","dialog"),r.setAttribute("aria-live","polite");const o=document.createElement("div");o.className="wt-header";const i=document.createElement("span");if(i.textContent=e==="loading"||e==="stream"?c("bubbleTranslating"):e==="error"||e==="missing-key"?c("bubbleFailed"):c("bubbleResult"),o.append(i),e==="loading"||e==="stream"){const a=document.createElement("span");a.className="wt-timer",a.textContent="0.0s",o.append(a)}const s=document.createElement("button");s.className="wt-close",s.type="button",s.setAttribute("aria-label",c("bubbleClose")),s.textContent="×",s.addEventListener("click",a=>{a.stopPropagation(),F()}),o.append(s);const d=document.createElement("div");if(d.className="wt-body",e==="loading")d.innerHTML=`<div class="wt-loading"><span class="wt-spinner"></span><span>${c("bubbleWorking")}</span></div>`;else if(e==="stream")d.append(document.createTextNode(t),ae());else if(e==="missing-key"){d.innerHTML=`<div class="wt-error">${c("bubbleNoKey")}</div>`;const a=document.createElement("div");a.className="wt-actions";const l=document.createElement("button");l.className="wt-btn",l.type="button",l.textContent=c("actOpenOptions"),l.addEventListener("click",p=>{var f;p.stopPropagation(),(f=n.onOpenOptions)==null||f.call(n)}),a.appendChild(l),d.appendChild(a)}else if(e==="error"){const a=document.createElement("div");a.className="wt-error",a.textContent=t||c("bubbleFailed"),d.appendChild(a);const l=document.createElement("div");if(l.className="wt-actions",n.onRetry){const f=document.createElement("button");f.className="wt-btn",f.type="button",f.textContent=c("bubbleRetry"),f.addEventListener("click",N=>{var _;N.stopPropagation(),(_=n.onRetry)==null||_.call(n)}),l.appendChild(f)}const p=document.createElement("button");p.className="wt-btn secondary",p.type="button",p.textContent=c("actOpenOptions"),p.addEventListener("click",f=>{var N;f.stopPropagation(),(N=n.onOpenOptions)==null||N.call(n)}),l.appendChild(p),d.appendChild(l)}else d.textContent=t;return r.append(o,d),document.documentElement.appendChild(r),V(r,n.x,n.y),S=r,j=e,O=n.onDismiss??null,(e==="loading"||e==="stream")&&we(r),requestAnimationFrame(()=>V(r,n.x,n.y)),r}function ce(e){var t;return e instanceof Node?!!((t=document.getElementById(b))!=null&&t.contains(e)):!1}const v="web-translator-selection-toolbar";let k=null;function he(){if(document.getElementById("web-translator-selection-toolbar-style"))return;const e=document.createElement("style");e.id="web-translator-selection-toolbar-style",e.textContent=`
    #${v} {
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
    #${v} .wt-toolbar-btn {
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
    #${v} .wt-toolbar-btn:hover { background: #2d5a8a; }
    #${v} .wt-toolbar-btn.secondary {
      background: #e8e6dc;
      color: #3d3d3a;
    }
    #${v} .wt-toolbar-btn.secondary:hover { background: #e5e3d8; }
    #${v} .wt-toolbar-btn.icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 5px 8px;
      margin-left: auto;
    }
    #${v} .wt-toolbar-btn.icon svg {
      display: block;
      width: 14px;
      height: 14px;
    }
  `,document.documentElement.appendChild(e)}function se(e,t,n){const r=document.createElement("button");return r.type="button",r.className=t?"wt-toolbar-btn secondary":"wt-toolbar-btn",r.textContent=e,r.addEventListener("mousedown",o=>o.preventDefault()),r.addEventListener("click",o=>{o.stopPropagation(),h(),n()}),r}function ye(e){const t=document.createElement("button");t.type="button",t.className="wt-toolbar-btn secondary icon",t.setAttribute("aria-label",c("actOpenOptions")||"Settings"),t.title=c("actOpenOptions")||"Settings";const n=document.createElementNS("http://www.w3.org/2000/svg","svg");return n.setAttribute("viewBox","0 0 24 24"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2"),n.setAttribute("stroke-linecap","round"),n.setAttribute("stroke-linejoin","round"),["M11 10.27 7 3.34","m11 13.73-4 6.93","M12 22v-2","M12 2v2","M14 12h8","m17 20.66-1-1.73","m17 3.34-1 1.73","M2 12h2","m20.66 17-1.73-1","m20.66 7-1.73 1","m3.34 17 1.73-1","m3.34 7 1.73 1"].forEach(o=>{const i=document.createElementNS("http://www.w3.org/2000/svg","path");i.setAttribute("d",o),n.appendChild(i)}),[2,8].forEach(o=>{const i=document.createElementNS("http://www.w3.org/2000/svg","circle");i.setAttribute("cx","12"),i.setAttribute("cy","12"),i.setAttribute("r",String(o)),n.appendChild(i)}),t.appendChild(n),t.addEventListener("mousedown",o=>o.preventDefault()),t.addEventListener("click",o=>{o.stopPropagation(),h(),e()}),t}function Ee(e,t){he(),h();const n=document.createElement("div");n.id=v,n.setAttribute("role","toolbar"),n.append(se(c("toolbarTranslate")||"Translate",!1,t.onTranslate),se(c("toolbarRewrite")||"Translate to",!0,t.onRewrite),ye(t.onOpenSettings)),document.documentElement.appendChild(n),k=n;const r=n.offsetWidth,o=n.offsetHeight;let i=e.left+e.width/2-r/2,s=e.top-o-8;s<8&&(s=e.bottom+8),i<8&&(i=8),i+r>window.innerWidth-8&&(i=window.innerWidth-r-8),n.style.left=`${Math.round(i)}px`,n.style.top=`${Math.round(s)}px`}function h(){k==null||k.remove(),k=null}function de(e){return e instanceof Node?!!(k!=null&&k.contains(e)):!1}const u="web-translator-rewrite-panel",M='Charter, Georgia, Palatino, "TsangerJinKai02", "Source Han Serif SC", "Songti SC", "SimSun", serif';let w=null,ne=null,Q="",P="zh";function Se(){if(document.getElementById("web-translator-rewrite-style"))return;const e=document.createElement("style");e.id="web-translator-rewrite-style",e.textContent=`
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
      font: 13px/1.6 ${M};
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
      font: 500 12px/1.4 ${M};
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
      font: 400 12px/1.4 ${M};
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
      font: 500 12px/1.4 ${M};
      letter-spacing: .08em;
    }
    #${u} .rw-btn:hover { background: #2d5a8a; }
    #${u} .rw-btn:disabled { opacity: .55; cursor: not-allowed; }
    #${u} .rw-btn.confirm { background: #2f7d52; }
    #${u} .rw-btn.confirm:hover { background: #3a9563; }
    #${u} .rw-btn[hidden] { display: none !important; }
  `,document.documentElement.appendChild(e)}function Z(e){return`${c(`lang_${e.replace("-","")}`)||le[e]} (${e})`}function Te(){const e=document.createElement("div");e.className="rw-lang";const t=document.createElement("button");t.type="button",t.className="rw-lang-trigger",t.setAttribute("aria-expanded","false");const n=document.createElement("span"),r=document.createElement("span");r.textContent="▾",t.append(n,r);const o=document.createElement("div");o.className="rw-lang-menu",o.hidden=!0;const i=()=>{n.textContent=Z(P)},s=()=>{o.hidden=!0,t.setAttribute("aria-expanded","false"),document.removeEventListener("mousedown",d,!0)},d=a=>{e.contains(a.target)||s()};return Object.keys(le).forEach(a=>{const l=document.createElement("button");l.type="button",l.className="rw-lang-option",l.textContent=Z(a),l.addEventListener("mousedown",p=>p.preventDefault()),l.addEventListener("click",()=>{P=a,i(),s()}),o.appendChild(l)}),t.addEventListener("click",()=>{o.hidden?(o.hidden=!1,t.setAttribute("aria-expanded","true"),document.addEventListener("mousedown",d,!0)):s()}),i(),e.append(t,o),e}function I(e,t=!1){const n=w==null?void 0:w.querySelector(".rw-result");n&&(n.textContent=e,n.classList.toggle("error",t))}function ve(e){const t=ne;if(!t||!t.startContainer.isConnected)return!1;try{return t.deleteContents(),t.insertNode(document.createTextNode(e)),!0}catch{return!1}}function ke(e,t,n){Se(),$(),Q=e,ne=t?t.cloneRange():null;const r=document.createElement("div");r.id=u,r.setAttribute("role","dialog"),r.setAttribute("aria-live","polite");const o=document.createElement("div");o.className="rw-head";const i=document.createElement("span");i.className="rw-title",i.textContent=c("rwTitle")||"Rewrite";const s=document.createElement("button");s.type="button",s.className="rw-close",s.setAttribute("aria-label",c("bubbleClose")),s.textContent="×",s.addEventListener("click",()=>$()),o.append(i,s);const d=document.createElement("div");d.className="rw-block";const a=document.createElement("div");a.className="rw-label",a.textContent=c("rwSourceLabel")||"Source";const l=document.createElement("div");l.className="rw-source",l.textContent=e,d.append(a,l);const p=document.createElement("div");p.className="rw-block";const f=document.createElement("div");f.className="rw-label",f.textContent=c("rwResultLabel")||"Result";const N=document.createElement("div");N.className="rw-result",p.append(f,N);const _=Te(),H=document.createElement("div");H.className="rw-label",H.textContent=c("rwLangLabel")||"Rewrite as";const q=document.createElement("div");q.className="rw-actions";const A=document.createElement("button");A.type="button",A.className="rw-btn",A.textContent=c("rwStart")||"Rewrite";const T=document.createElement("button");T.type="button",T.className="rw-btn confirm",T.textContent=c("rwConfirm")||"Confirm & replace",T.hidden=!0,q.append(A,T),A.addEventListener("click",()=>{(async()=>{A.disabled=!0,T.hidden=!0,I(c("rwLoading")||"…");try{const g=await C({type:"TRANSLATE_TEXT",text:Q,targetLanguage:P});if(!g.ok){I(g.error,!0);return}"text"in g&&(I(g.text),T.hidden=!1)}catch(g){const y=g instanceof Error?g.message:String(g);I(y.includes("Extension context invalidated")&&c("errRefreshPage")||y,!0)}finally{A.disabled=!1}})()}),T.addEventListener("click",()=>{const g=w==null?void 0:w.querySelector(".rw-result"),y=(g==null?void 0:g.textContent)??"";if(!y||!ve(y)){I(c("rwReplaceFail"),!0);return}$()}),r.append(o,d,H,_,p,q),document.documentElement.appendChild(r),w=r;const K=r.offsetWidth,oe=r.offsetHeight;let R=n.left+n.width/2-K/2,X=n.top-oe-8;X<8&&(X=Math.min(n.bottom+8,window.innerHeight-oe-8)),R<8&&(R=8),R+K>window.innerWidth-8&&(R=window.innerWidth-K-8),r.style.left=`${Math.round(R)}px`,r.style.top=`${Math.round(Math.max(8,X))}px`,(async()=>{try{const g=await C({type:"GET_SETTINGS"});if(g.ok&&"settings"in g){P=g.settings.targetLanguage;const y=r.querySelector(".rw-lang-trigger span");y&&(y.textContent=Z(P))}}catch{}})()}function $(){w==null||w.remove(),w=null,ne=null,Q=""}function ue(e){return e instanceof Node?!!(w!=null&&w.contains(e)):!1}const pe="data-wt-original",G="data-wt-translated",Ce=new Set(["SCRIPT","STYLE","NOSCRIPT","TEXTAREA","INPUT","SELECT","OPTION","CODE","PRE","KBD","SAMP","SVG","MATH","IFRAME","CANVAS","VIDEO","AUDIO"]);function Ne(e){var n,r;return!!(!e||Ce.has(e.tagName)||e.id==="web-translator-bubble"||(n=e.closest)!=null&&n.call(e,"#web-translator-bubble")||((r=e.getAttribute)==null?void 0:r.call(e,"role"))==="textbox"||e instanceof HTMLElement&&e.isContentEditable)}function Ae(e=document.body){if(!e)return[];const t=[],n=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,{acceptNode(o){const i=o.nodeValue||"";if(!i.trim())return NodeFilter.FILTER_REJECT;const s=o.parentElement;return Ne(s)||!/[\p{L}\p{N}]/u.test(i)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}});let r;for(;r=n.nextNode();){const o=r;t.push({node:o,text:o.nodeValue||""})}return t}function Le(e,t){const n=[];for(let r=0;r<e.length;r+=t)n.push(e.slice(r,r+t));return n}async function $e(e,t){fe();const n=Ae();if(n.length===0)return{translated:0,skipped:0};const r=Le(n,20);let o=0;for(const i of r){const s=i.map(a=>a.text);let d;try{d=await e(s)}catch(a){throw a}for(let a=0;a<i.length;a++){const l=i[a],p=d[a];if(!l.node.isConnected||typeof p!="string"||p===l.text)continue;const f=l.node.parentElement;f&&f.hasAttribute(pe),f&&(f.hasAttribute(G)||f.setAttribute(G,"1")),Re(l.node,l.text),l.node.nodeValue=p,o++}}return{translated:o,skipped:n.length-o}}const W=new WeakMap,z=new Set;function Re(e,t){W.has(e)||(W.set(e,t),z.add(e))}function fe(){let e=0;for(const t of Array.from(z)){const n=W.get(t);n!==void 0&&t.isConnected&&(t.nodeValue=n,e++),W.delete(t),z.delete(t)}return document.querySelectorAll(`[${G}]`).forEach(t=>{t.removeAttribute(G),t.removeAttribute(pe)}),e}function Ie(){return z.size>0}let E=null,J=!1,U=!1,m=null;function ee(e){e.timer!==null&&(window.clearInterval(e.timer),e.timer=null)}function me(e){e.timer===null&&(e.timer=window.setInterval(()=>{if(m!==e){ee(e);return}const t=e.finalText??e.text;if(e.shown<t.length){const n=Math.max(3,Math.ceil((t.length-e.shown)*.18));e.shown=Math.min(t.length,e.shown+n),x("stream",t.slice(0,e.shown),e.opts)}else e.finalText!==null&&(ee(e),m=null,x("result",e.finalText,e.opts))},40))}function Y(e){e&&(ee(e),m===e&&(m=null))}function L(){C({type:"OPEN_OPTIONS"})}function be(e){const t=e instanceof Error?e.message:String(e);return t.includes("Extension context invalidated")&&c("errRefreshPage")||t}async function D(e,t,n){const r=e.trim();if(!r||r.length>5e3||J)return;J=!0,h();const o=Math.random().toString(36).slice(2),i={x:t,y:n,onOpenOptions:L,onRetry:()=>{D(r,t,n)},onDismiss:()=>{(m==null?void 0:m.requestId)===o&&Y(m)}};x("loading","",i);try{if(!await Me()){const p=await C({type:"TRANSLATE_TEXT",text:r});if(!p.ok){x(p.code==="MISSING_API_KEY"?"missing-key":"error",p.error,i);return}"text"in p&&x("result",p.text,i);return}const d={requestId:o,text:"",shown:0,timer:null,finalText:null,opts:i};m=d;const a=await C({type:"TRANSLATE_TEXT_STREAM",requestId:o,text:r});if(!a.ok){Y(d),x(a.code==="MISSING_API_KEY"?"missing-key":"error",a.error,i);return}const l="text"in a&&a.text?a.text:d.text;m===d?(d.finalText=l,me(d)):x("result",l,i)}catch(s){(m==null?void 0:m.requestId)===o&&Y(m),x("error",be(s),i)}finally{J=!1}}function re(){const e=window.getSelection();return!e||e.isCollapsed?"":e.toString()}function Oe(){const e=window.getSelection();return!e||e.rangeCount===0||!e.toString().trim()?null:e.getRangeAt(0).getBoundingClientRect()}function Pe(){const e=window.getSelection();return!e||e.rangeCount===0||!e.toString().trim()?null:e.getRangeAt(0).cloneRange()}async function _e(){try{const e=await C({type:"GET_SETTINGS"});return e.ok&&"settings"in e?!!e.settings.autoTranslateOnSelect:!1}catch{return!1}}async function Me(){try{const e=await C({type:"GET_SETTINGS"});return e.ok&&"settings"in e?e.settings.streamingEnabled!==!1:!0}catch{return!0}}function Be(e){e.button===0&&(ce(e.target)||de(e.target)||ue(e.target)||(E={x:e.clientX,y:e.clientY},setTimeout(()=>{(async()=>{const t=re();if(!t.trim()||!E){h();return}const n=Oe(),r=Pe();if(!n)return;const{x:o,y:i}=E;if(await _e()){h(),$(),D(t,o,i);return}$(),Ee(n,{onTranslate:()=>{D(t,o,i)},onRewrite:()=>{ke(t,r,n)},onOpenSettings:L})})()},10)))}function Fe(e){e.key==="Escape"&&(h(),$(),F())}function Ge(e){if(de(e.target)||ce(e.target)||ue(e.target))return;$(),re().trim()||(h(),F())}async function ge(){if(U)return;U=!0;const e=Math.min(window.innerWidth-40,window.innerWidth-200),t=24;x("loading","",{x:e,y:t,onOpenOptions:L});try{const n=await $e(async r=>{const o=await C({type:"TRANSLATE_BATCH",texts:r});if(!o.ok){const i=new Error(o.error);throw i.code=o.code,i}if(!("texts"in o))throw new Error(c("msgInvalidBatch"));return o.texts});x("result",c("pageTranslateDone",String(n.translated)),{x:e,y:t,onOpenOptions:L})}catch(n){const r=be(n);n.code==="MISSING_API_KEY"?x("missing-key",r,{x:e,y:t,onOpenOptions:L}):x("error",r,{x:e,y:t,onOpenOptions:L,onRetry:()=>{ge()}})}finally{U=!1}}function We(){const e=fe(),t=Math.min(window.innerWidth-40,window.innerWidth-200);x("result",e>0?c("bubbleRestored",String(e)):c("bubbleNothing"),{x:t,y:24,onOpenOptions:L})}chrome.runtime.onMessage.addListener((e,t,n)=>{const r=e.type;if(r==="FULL_PAGE_TRANSLATE")return ge().then(()=>n({ok:!0,translated:Ie()})),!0;if(r==="FULL_PAGE_RESTORE")return We(),n({ok:!0}),!1;if(r==="TRANSLATE_SELECTION_FROM_MENU"){const o=e.text||re(),i=(E==null?void 0:E.x)??window.innerWidth/2,s=(E==null?void 0:E.y)??80;return h(),D(o,i,s),n({ok:!0}),!1}if(r==="TRANSLATE_STREAM_CHUNK"){const{requestId:o,chunk:i}=e;return m&&m.requestId===o&&(m.text+=i,me(m)),n({ok:!0}),!1}return r==="PING"&&n({ok:!0}),!1});document.addEventListener("mouseup",Be,!0);document.addEventListener("keydown",Fe,!0);document.addEventListener("mousedown",Ge,!0);window.addEventListener("scroll",h,!0);window.addEventListener("resize",h);
