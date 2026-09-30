import{s as $}from"./messaging-BgBjn5MC.js";import{t as l,L as ae}from"./i18n-D5bnVaJo.js";const m="web-translator-bubble";let M=null,re=0,v=null,j=null,B=null;function Z(){M!==null&&(window.clearInterval(M),M=null)}function fe(e){Z(),re=performance.now();const n=e.querySelector(".wt-timer");n&&(M=window.setInterval(()=>{const t=((performance.now()-re)/1e3).toFixed(1);n.textContent=`${t}s`},100))}function oe(){const e=document.createElement("span");return e.className="wt-cursor",e}function me(){if(document.getElementById("web-translator-bubble-style"))return;const e=document.createElement("style");e.id="web-translator-bubble-style",e.textContent=`
    #${m} {
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
    #${m} .wt-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
      color: #1b365d;
      font-size: 12px;
      font-weight: 500;
      letter-spacing: .18em;
    }
    #${m} .wt-timer {
      margin-left: auto;
      color: #6b6a64;
      font-weight: 400;
      letter-spacing: .05em;
      font-variant-numeric: tabular-nums;
    }
    #${m} .wt-close {
      background: transparent;
      border: none;
      color: #6b6a64;
      cursor: pointer;
      font-size: 16px;
      line-height: 1;
      padding: 0 2px;
    }
    #${m} .wt-close:hover { color: #141413; }
    #${m} .wt-body {
      white-space: pre-wrap;
      word-break: break-word;
      color: #3d3d3a;
    }
    #${m} .wt-loading {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #504e49;
    }
    #${m} .wt-spinner {
      width: 14px;
      height: 14px;
      border: 2px solid rgba(27,54,93,.18);
      border-top-color: #1b365d;
      border-radius: 50%;
      animation: wt-spin .7s linear infinite;
    }
    @keyframes wt-spin { to { transform: rotate(360deg); } }
    #${m} .wt-cursor {
      display: inline-block;
      width: 2px;
      height: 1em;
      margin-left: 2px;
      vertical-align: text-bottom;
      background: #1b365d;
      animation: wt-blink 1s steps(2) infinite;
    }
    @keyframes wt-blink { 50% { opacity: 0; } }
    #${m} .wt-error { color: #b03a32; }
    #${m} .wt-actions {
      margin-top: 10px;
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    #${m} .wt-btn {
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
    #${m} .wt-btn.secondary {
      background: #e8e6dc;
      color: #3d3d3a;
    }
    #${m} .wt-btn:hover { background: #2d5a8a; }
    #${m} .wt-btn.secondary:hover { background: #e5e3d8; }
  `,document.documentElement.appendChild(e)}function X(e,n,t){const o=e.getBoundingClientRect();let i=n,a=t+12;i+o.width>window.innerWidth-8&&(i=window.innerWidth-o.width-8),i<8&&(i=8),a+o.height>window.innerHeight-8&&(a=t-o.height-12),a<8&&(a=8),e.style.left=`${Math.round(i)}px`,e.style.top=`${Math.round(a)}px`}function F(){if(Z(),v==null||v.remove(),v=null,j=null,B){const e=B;B=null,e()}}function x(e,n,t){if(me(),e==="stream"&&j==="stream"&&v){const s=v.querySelector(".wt-body");return s&&(s.textContent="",s.append(document.createTextNode(n),oe())),X(v,t.x,t.y),v}Z(),F();const r=document.createElement("div");r.id=m,r.setAttribute("role","dialog"),r.setAttribute("aria-live","polite");const o=document.createElement("div");o.className="wt-header";const i=document.createElement("span");if(i.textContent=e==="loading"||e==="stream"?l("bubbleTranslating"):e==="error"||e==="missing-key"?l("bubbleFailed"):l("bubbleResult"),o.append(i),e==="loading"||e==="stream"){const s=document.createElement("span");s.className="wt-timer",s.textContent="0.0s",o.append(s)}const a=document.createElement("button");a.className="wt-close",a.type="button",a.setAttribute("aria-label",l("bubbleClose")),a.textContent="×",a.addEventListener("click",s=>{s.stopPropagation(),F()}),o.append(a);const u=document.createElement("div");if(u.className="wt-body",e==="loading")u.innerHTML=`<div class="wt-loading"><span class="wt-spinner"></span><span>${l("bubbleWorking")}</span></div>`;else if(e==="stream")u.append(document.createTextNode(n),oe());else if(e==="missing-key"){u.innerHTML=`<div class="wt-error">${l("bubbleNoKey")}</div>`;const s=document.createElement("div");s.className="wt-actions";const c=document.createElement("button");c.className="wt-btn",c.type="button",c.textContent=l("actOpenOptions"),c.addEventListener("click",f=>{var p;f.stopPropagation(),(p=t.onOpenOptions)==null||p.call(t)}),s.appendChild(c),u.appendChild(s)}else if(e==="error"){const s=document.createElement("div");s.className="wt-error",s.textContent=n||l("bubbleFailed"),u.appendChild(s);const c=document.createElement("div");if(c.className="wt-actions",t.onRetry){const p=document.createElement("button");p.className="wt-btn",p.type="button",p.textContent=l("bubbleRetry"),p.addEventListener("click",C=>{var P;C.stopPropagation(),(P=t.onRetry)==null||P.call(t)}),c.appendChild(p)}const f=document.createElement("button");f.className="wt-btn secondary",f.type="button",f.textContent=l("actOpenOptions"),f.addEventListener("click",p=>{var C;p.stopPropagation(),(C=t.onOpenOptions)==null||C.call(t)}),c.appendChild(f),u.appendChild(c)}else u.textContent=n;return r.append(o,u),document.documentElement.appendChild(r),X(r,t.x,t.y),v=r,j=e,B=t.onDismiss??null,(e==="loading"||e==="stream")&&fe(r),requestAnimationFrame(()=>X(r,t.x,t.y)),r}function se(e){var n;return e instanceof Node?!!((n=document.getElementById(m))!=null&&n.contains(e)):!1}const k="web-translator-selection-toolbar";let T=null;function ge(){if(document.getElementById("web-translator-selection-toolbar-style"))return;const e=document.createElement("style");e.id="web-translator-selection-toolbar-style",e.textContent=`
    #${k} {
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
    #${k} .wt-toolbar-btn {
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
    #${k} .wt-toolbar-btn:hover { background: #2d5a8a; }
    #${k} .wt-toolbar-btn.secondary {
      background: #e8e6dc;
      color: #3d3d3a;
    }
    #${k} .wt-toolbar-btn.secondary:hover { background: #e5e3d8; }
    #${k} .wt-toolbar-btn.icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 5px 8px;
      margin-left: auto;
    }
    #${k} .wt-toolbar-btn.icon svg {
      display: block;
      width: 14px;
      height: 14px;
    }
  `,document.documentElement.appendChild(e)}function ie(e,n,t){const r=document.createElement("button");return r.type="button",r.className=n?"wt-toolbar-btn secondary":"wt-toolbar-btn",r.textContent=e,r.addEventListener("mousedown",o=>o.preventDefault()),r.addEventListener("click",o=>{o.stopPropagation(),h(),t()}),r}function we(e){const n=document.createElement("button");n.type="button",n.className="wt-toolbar-btn secondary icon",n.setAttribute("aria-label",l("actOpenOptions")||"Settings"),n.title=l("actOpenOptions")||"Settings";const t=document.createElementNS("http://www.w3.org/2000/svg","svg");return t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("fill","none"),t.setAttribute("stroke","currentColor"),t.setAttribute("stroke-width","2"),t.setAttribute("stroke-linecap","round"),t.setAttribute("stroke-linejoin","round"),["M11 10.27 7 3.34","m11 13.73-4 6.93","M12 22v-2","M12 2v2","M14 12h8","m17 20.66-1-1.73","m17 3.34-1 1.73","M2 12h2","m20.66 17-1.73-1","m20.66 7-1.73 1","m3.34 17 1.73-1","m3.34 7 1.73 1"].forEach(o=>{const i=document.createElementNS("http://www.w3.org/2000/svg","path");i.setAttribute("d",o),t.appendChild(i)}),[2,8].forEach(o=>{const i=document.createElementNS("http://www.w3.org/2000/svg","circle");i.setAttribute("cx","12"),i.setAttribute("cy","12"),i.setAttribute("r",String(o)),t.appendChild(i)}),n.appendChild(t),n.addEventListener("mousedown",o=>o.preventDefault()),n.addEventListener("click",o=>{o.stopPropagation(),h(),e()}),n}function xe(e,n){ge(),h();const t=document.createElement("div");t.id=k,t.setAttribute("role","toolbar"),t.append(ie(l("toolbarTranslate")||"Translate",!1,n.onTranslate),ie(l("toolbarRewrite")||"Translate to",!0,n.onRewrite),we(n.onOpenSettings)),document.documentElement.appendChild(t),T=t;const r=t.offsetWidth,o=t.offsetHeight;let i=e.left+e.width/2-r/2,a=e.top-o-8;a<8&&(a=e.bottom+8),i<8&&(i=8),i+r>window.innerWidth-8&&(i=window.innerWidth-r-8),t.style.left=`${Math.round(i)}px`,t.style.top=`${Math.round(a)}px`}function h(){T==null||T.remove(),T=null}function le(e){return e instanceof Node?!!(T!=null&&T.contains(e)):!1}const d="web-translator-rewrite-panel",_='Charter, Georgia, Palatino, "TsangerJinKai02", "Source Han Serif SC", "Songti SC", "SimSun", serif';let w=null,ee=null,Y="",I="zh";function he(){if(document.getElementById("web-translator-rewrite-style"))return;const e=document.createElement("style");e.id="web-translator-rewrite-style",e.textContent=`
    #${d} {
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
      font: 13px/1.6 ${_};
      letter-spacing: .05em;
    }
    #${d} .rw-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
    }
    #${d} .rw-title {
      color: #1b365d;
      font-size: 13px;
      font-weight: 500;
      letter-spacing: .18em;
    }
    #${d} .rw-close {
      background: transparent;
      border: none;
      color: #6b6a64;
      cursor: pointer;
      font-size: 16px;
      line-height: 1;
      padding: 0 2px;
    }
    #${d} .rw-close:hover { color: #141413; }
    #${d} .rw-label {
      font-size: 11px;
      color: #6b6a64;
      letter-spacing: .15em;
      margin-bottom: 4px;
    }
    #${d} .rw-source,
    #${d} .rw-result {
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
    #${d} .rw-result.error { color: #b03a32; }
    #${d} .rw-block { margin-bottom: 10px; }
    #${d} .rw-lang {
      position: relative;
      margin-bottom: 8px;
    }
    #${d} .rw-lang-trigger {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 7px 10px;
      border: 1px solid #e8e6dc;
      border-radius: 6px;
      background: #faf9f5;
      color: #141413;
      font: 500 12px/1.4 ${_};
      letter-spacing: .05em;
      cursor: pointer;
    }
    #${d} .rw-lang-trigger[aria-expanded="true"] {
      border-color: #1b365d;
      box-shadow: 0 0 0 3px #eef2f7;
    }
    #${d} .rw-lang-menu {
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
    #${d} .rw-lang-option {
      display: block;
      width: 100%;
      text-align: left;
      padding: 6px 8px;
      border: none;
      border-radius: 4px;
      background: transparent;
      color: #3d3d3a;
      font: 400 12px/1.4 ${_};
      cursor: pointer;
    }
    #${d} .rw-lang-option:hover { background: #f0eee6; }
    #${d} .rw-lang-option.selected {
      background: #eef2f7;
      color: #1b365d;
      font-weight: 500;
    }
    #${d} .rw-actions {
      display: flex;
      gap: 8px;
    }
    #${d} .rw-btn {
      appearance: none;
      border: none;
      cursor: pointer;
      flex: 1;
      padding: 8px 12px;
      border-radius: 999px;
      background: #1b365d;
      color: #faf9f5;
      font: 500 12px/1.4 ${_};
      letter-spacing: .08em;
    }
    #${d} .rw-btn:hover { background: #2d5a8a; }
    #${d} .rw-btn:disabled { opacity: .55; cursor: not-allowed; }
    #${d} .rw-btn.confirm { background: #2f7d52; }
    #${d} .rw-btn.confirm:hover { background: #3a9563; }
    #${d} .rw-btn[hidden] { display: none !important; }
  `,document.documentElement.appendChild(e)}function Q(e){return`${l(`lang_${e.replace("-","")}`)||ae[e]} (${e})`}function ye(){const e=document.createElement("div");e.className="rw-lang";const n=document.createElement("button");n.type="button",n.className="rw-lang-trigger",n.setAttribute("aria-expanded","false");const t=document.createElement("span"),r=document.createElement("span");r.textContent="▾",n.append(t,r);const o=document.createElement("div");o.className="rw-lang-menu",o.hidden=!0;const i=()=>{t.textContent=Q(I)},a=()=>{o.hidden=!0,n.setAttribute("aria-expanded","false"),document.removeEventListener("mousedown",u,!0)},u=s=>{e.contains(s.target)||a()};return Object.keys(ae).forEach(s=>{const c=document.createElement("button");c.type="button",c.className="rw-lang-option",c.textContent=Q(s),c.addEventListener("mousedown",f=>f.preventDefault()),c.addEventListener("click",()=>{I=s,i(),a()}),o.appendChild(c)}),n.addEventListener("click",()=>{o.hidden?(o.hidden=!1,n.setAttribute("aria-expanded","true"),document.addEventListener("mousedown",u,!0)):a()}),i(),e.append(n,o),e}function O(e,n=!1){const t=w==null?void 0:w.querySelector(".rw-result");t&&(t.textContent=e,t.classList.toggle("error",n))}function Ee(e){const n=ee;if(!n||!n.startContainer.isConnected)return!1;try{return n.deleteContents(),n.insertNode(document.createTextNode(e)),!0}catch{return!1}}function ve(e,n,t){he(),L(),Y=e,ee=n?n.cloneRange():null;const r=document.createElement("div");r.id=d,r.setAttribute("role","dialog"),r.setAttribute("aria-live","polite");const o=document.createElement("div");o.className="rw-head";const i=document.createElement("span");i.className="rw-title",i.textContent=l("rwTitle")||"Rewrite";const a=document.createElement("button");a.type="button",a.className="rw-close",a.setAttribute("aria-label",l("bubbleClose")),a.textContent="×",a.addEventListener("click",()=>L()),o.append(i,a);const u=document.createElement("div");u.className="rw-block";const s=document.createElement("div");s.className="rw-label",s.textContent=l("rwSourceLabel")||"Source";const c=document.createElement("div");c.className="rw-source",c.textContent=e,u.append(s,c);const f=document.createElement("div");f.className="rw-block";const p=document.createElement("div");p.className="rw-label",p.textContent=l("rwResultLabel")||"Result";const C=document.createElement("div");C.className="rw-result",f.append(p,C);const P=ye(),H=document.createElement("div");H.className="rw-label",H.textContent=l("rwLangLabel")||"Rewrite as";const q=document.createElement("div");q.className="rw-actions";const N=document.createElement("button");N.type="button",N.className="rw-btn",N.textContent=l("rwStart")||"Rewrite";const S=document.createElement("button");S.type="button",S.className="rw-btn confirm",S.textContent=l("rwConfirm")||"Confirm & replace",S.hidden=!0,q.append(N,S),N.addEventListener("click",()=>{(async()=>{N.disabled=!0,S.hidden=!0,O(l("rwLoading")||"…");try{const g=await $({type:"TRANSLATE_TEXT",text:Y,targetLanguage:I});if(!g.ok){O(g.error,!0);return}"text"in g&&(O(g.text),S.hidden=!1)}catch(g){const y=g instanceof Error?g.message:String(g);O(y.includes("Extension context invalidated")&&l("errRefreshPage")||y,!0)}finally{N.disabled=!1}})()}),S.addEventListener("click",()=>{const g=w==null?void 0:w.querySelector(".rw-result"),y=(g==null?void 0:g.textContent)??"";if(!y||!Ee(y)){O(l("rwReplaceFail"),!0);return}L()}),r.append(o,u,H,P,f,q),document.documentElement.appendChild(r),w=r;const K=r.offsetWidth,ne=r.offsetHeight;let R=t.left+t.width/2-K/2,V=t.top-ne-8;V<8&&(V=Math.min(t.bottom+8,window.innerHeight-ne-8)),R<8&&(R=8),R+K>window.innerWidth-8&&(R=window.innerWidth-K-8),r.style.left=`${Math.round(R)}px`,r.style.top=`${Math.round(Math.max(8,V))}px`,(async()=>{try{const g=await $({type:"GET_SETTINGS"});if(g.ok&&"settings"in g){I=g.settings.targetLanguage;const y=r.querySelector(".rw-lang-trigger span");y&&(y.textContent=Q(I))}}catch{}})()}function L(){w==null||w.remove(),w=null,ee=null,Y=""}function ce(e){return e instanceof Node?!!(w!=null&&w.contains(e)):!1}const de="data-wt-original",G="data-wt-translated",Se=new Set(["SCRIPT","STYLE","NOSCRIPT","TEXTAREA","INPUT","SELECT","OPTION","CODE","PRE","KBD","SAMP","SVG","MATH","IFRAME","CANVAS","VIDEO","AUDIO"]);function ke(e){var t,r;return!!(!e||Se.has(e.tagName)||e.id==="web-translator-bubble"||(t=e.closest)!=null&&t.call(e,"#web-translator-bubble")||((r=e.getAttribute)==null?void 0:r.call(e,"role"))==="textbox"||e instanceof HTMLElement&&e.isContentEditable)}function Te(e=document.body){if(!e)return[];const n=[],t=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,{acceptNode(o){const i=o.nodeValue||"";if(!i.trim())return NodeFilter.FILTER_REJECT;const a=o.parentElement;return ke(a)||!/[\p{L}\p{N}]/u.test(i)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}});let r;for(;r=t.nextNode();){const o=r;n.push({node:o,text:o.nodeValue||""})}return n}function Ce(e,n){const t=[];for(let r=0;r<e.length;r+=n)t.push(e.slice(r,r+n));return t}async function Ne(e,n){ue();const t=Te();if(t.length===0)return{translated:0,skipped:0};const r=Ce(t,20);let o=0;for(const i of r){const a=i.map(s=>s.text);let u;try{u=await e(a)}catch(s){throw s}for(let s=0;s<i.length;s++){const c=i[s],f=u[s];if(!c.node.isConnected||typeof f!="string"||f===c.text)continue;const p=c.node.parentElement;p&&p.hasAttribute(de),p&&(p.hasAttribute(G)||p.setAttribute(G,"1")),Ae(c.node,c.text),c.node.nodeValue=f,o++}}return{translated:o,skipped:t.length-o}}const W=new WeakMap,z=new Set;function Ae(e,n){W.has(e)||(W.set(e,n),z.add(e))}function ue(){let e=0;for(const n of Array.from(z)){const t=W.get(n);t!==void 0&&n.isConnected&&(n.nodeValue=t,e++),W.delete(n),z.delete(n)}return document.querySelectorAll(`[${G}]`).forEach(n=>{n.removeAttribute(G),n.removeAttribute(de)}),e}function Le(){return z.size>0}let E=null,J=!1,U=!1,b=null;function A(){$({type:"OPEN_OPTIONS"})}function pe(e){const n=e instanceof Error?e.message:String(e);return n.includes("Extension context invalidated")&&l("errRefreshPage")||n}async function D(e,n,t){const r=e.trim();if(!r||r.length>5e3||J)return;J=!0,h();const o=Math.random().toString(36).slice(2),i={x:n,y:t,onOpenOptions:A,onRetry:()=>{D(r,n,t)},onDismiss:()=>{(b==null?void 0:b.requestId)===o&&(b=null)}};b={requestId:o,text:"",opts:i},x("loading","",i);try{const a=await $({type:"TRANSLATE_TEXT_STREAM",requestId:o,text:r});if(!a.ok){b=null,a.code==="MISSING_API_KEY"?x("missing-key",a.error,i):x("error",a.error,i);return}const u="text"in a&&a.text?a.text:(b==null?void 0:b.text)||"";x("result",u,i)}catch(a){b=null,x("error",pe(a),i)}finally{(b==null?void 0:b.requestId)===o&&(b=null),J=!1}}function te(){const e=window.getSelection();return!e||e.isCollapsed?"":e.toString()}function $e(){const e=window.getSelection();return!e||e.rangeCount===0||!e.toString().trim()?null:e.getRangeAt(0).getBoundingClientRect()}function Re(){const e=window.getSelection();return!e||e.rangeCount===0||!e.toString().trim()?null:e.getRangeAt(0).cloneRange()}async function Oe(){try{const e=await $({type:"GET_SETTINGS"});return e.ok&&"settings"in e?!!e.settings.autoTranslateOnSelect:!1}catch{return!1}}function Ie(e){e.button===0&&(se(e.target)||le(e.target)||ce(e.target)||(E={x:e.clientX,y:e.clientY},setTimeout(()=>{(async()=>{const n=te();if(!n.trim()||!E){h();return}const t=$e(),r=Re();if(!t)return;const{x:o,y:i}=E;if(await Oe()){h(),L(),D(n,o,i);return}L(),xe(t,{onTranslate:()=>{D(n,o,i)},onRewrite:()=>{ve(n,r,t)},onOpenSettings:A})})()},10)))}function Pe(e){e.key==="Escape"&&(h(),L(),F())}function _e(e){if(le(e.target)||se(e.target)||ce(e.target))return;L(),te().trim()||(h(),F())}async function be(){if(U)return;U=!0;const e=Math.min(window.innerWidth-40,window.innerWidth-200),n=24;x("loading","",{x:e,y:n,onOpenOptions:A});try{const t=await Ne(async r=>{const o=await $({type:"TRANSLATE_BATCH",texts:r});if(!o.ok){const i=new Error(o.error);throw i.code=o.code,i}if(!("texts"in o))throw new Error(l("msgInvalidBatch"));return o.texts});x("result",l("pageTranslateDone",String(t.translated)),{x:e,y:n,onOpenOptions:A})}catch(t){const r=pe(t);t.code==="MISSING_API_KEY"?x("missing-key",r,{x:e,y:n,onOpenOptions:A}):x("error",r,{x:e,y:n,onOpenOptions:A,onRetry:()=>{be()}})}finally{U=!1}}function Me(){const e=ue(),n=Math.min(window.innerWidth-40,window.innerWidth-200);x("result",e>0?l("bubbleRestored",String(e)):l("bubbleNothing"),{x:n,y:24,onOpenOptions:A})}chrome.runtime.onMessage.addListener((e,n,t)=>{const r=e.type;if(r==="FULL_PAGE_TRANSLATE")return be().then(()=>t({ok:!0,translated:Le()})),!0;if(r==="FULL_PAGE_RESTORE")return Me(),t({ok:!0}),!1;if(r==="TRANSLATE_SELECTION_FROM_MENU"){const o=e.text||te(),i=(E==null?void 0:E.x)??window.innerWidth/2,a=(E==null?void 0:E.y)??80;return h(),D(o,i,a),t({ok:!0}),!1}if(r==="TRANSLATE_STREAM_CHUNK"){const{requestId:o,chunk:i}=e;return b&&b.requestId===o&&(b.text+=i,x("stream",b.text,b.opts)),t({ok:!0}),!1}return r==="PING"&&t({ok:!0}),!1});document.addEventListener("mouseup",Ie,!0);document.addEventListener("keydown",Pe,!0);document.addEventListener("mousedown",_e,!0);window.addEventListener("scroll",h,!0);window.addEventListener("resize",h);
