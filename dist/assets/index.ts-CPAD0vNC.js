import{s as O}from"./messaging-5R6JVYIl.js";import{t as p}from"./i18n-DciqKMqZ.js";const d="web-translator-bubble";let E=null,F=0,g=null,I=null,y=null;function R(){E!==null&&(window.clearInterval(E),E=null)}function q(e){R(),F=performance.now();const n=e.querySelector(".wt-timer");n&&(E=window.setInterval(()=>{const t=((performance.now()-F)/1e3).toFixed(1);n.textContent=`${t}s`},100))}function $(){const e=document.createElement("span");return e.className="wt-cursor",e}function G(){if(document.getElementById("web-translator-bubble-style"))return;const e=document.createElement("style");e.id="web-translator-bubble-style",e.textContent=`
    #${d} {
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
    #${d} .wt-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
      color: #1b365d;
      font-size: 12px;
      font-weight: 500;
      letter-spacing: .18em;
    }
    #${d} .wt-timer {
      margin-left: auto;
      color: #6b6a64;
      font-weight: 400;
      letter-spacing: .05em;
      font-variant-numeric: tabular-nums;
    }
    #${d} .wt-close {
      background: transparent;
      border: none;
      color: #6b6a64;
      cursor: pointer;
      font-size: 16px;
      line-height: 1;
      padding: 0 2px;
    }
    #${d} .wt-close:hover { color: #141413; }
    #${d} .wt-body {
      white-space: pre-wrap;
      word-break: break-word;
      color: #3d3d3a;
    }
    #${d} .wt-loading {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #504e49;
    }
    #${d} .wt-spinner {
      width: 14px;
      height: 14px;
      border: 2px solid rgba(27,54,93,.18);
      border-top-color: #1b365d;
      border-radius: 50%;
      animation: wt-spin .7s linear infinite;
    }
    @keyframes wt-spin { to { transform: rotate(360deg); } }
    #${d} .wt-cursor {
      display: inline-block;
      width: 2px;
      height: 1em;
      margin-left: 2px;
      vertical-align: text-bottom;
      background: #1b365d;
      animation: wt-blink 1s steps(2) infinite;
    }
    @keyframes wt-blink { 50% { opacity: 0; } }
    #${d} .wt-error { color: #b03a32; }
    #${d} .wt-actions {
      margin-top: 10px;
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    #${d} .wt-btn {
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
    #${d} .wt-btn.secondary {
      background: #e8e6dc;
      color: #3d3d3a;
    }
    #${d} .wt-btn:hover { background: #2d5a8a; }
    #${d} .wt-btn.secondary:hover { background: #e5e3d8; }
  `,document.documentElement.appendChild(e)}function S(e,n,t){const o=e.getBoundingClientRect();let i=n,a=t+12;i+o.width>window.innerWidth-8&&(i=window.innerWidth-o.width-8),i<8&&(i=8),a+o.height>window.innerHeight-8&&(a=t-o.height-12),a<8&&(a=8),e.style.left=`${Math.round(i)}px`,e.style.top=`${Math.round(a)}px`}function T(){if(R(),g==null||g.remove(),g=null,I=null,y){const e=y;y=null,e()}}function b(e,n,t){if(G(),e==="stream"&&I==="stream"&&g){const s=g.querySelector(".wt-body");return s&&(s.textContent="",s.append(document.createTextNode(n),$())),S(g,t.x,t.y),g}R(),T();const r=document.createElement("div");r.id=d,r.setAttribute("role","dialog"),r.setAttribute("aria-live","polite");const o=document.createElement("div");o.className="wt-header";const i=document.createElement("span");if(i.textContent=e==="loading"||e==="stream"?p("bubbleTranslating"):e==="error"||e==="missing-key"?p("bubbleFailed"):p("bubbleResult"),o.append(i),e==="loading"||e==="stream"){const s=document.createElement("span");s.className="wt-timer",s.textContent="0.0s",o.append(s)}const a=document.createElement("button");a.className="wt-close",a.type="button",a.setAttribute("aria-label",p("bubbleClose")),a.textContent="×",a.addEventListener("click",s=>{s.stopPropagation(),T()}),o.append(a);const f=document.createElement("div");if(f.className="wt-body",e==="loading")f.innerHTML=`<div class="wt-loading"><span class="wt-spinner"></span><span>${p("bubbleWorking")}</span></div>`;else if(e==="stream")f.append(document.createTextNode(n),$());else if(e==="missing-key"){f.innerHTML=`<div class="wt-error">${p("bubbleNoKey")}</div>`;const s=document.createElement("div");s.className="wt-actions";const c=document.createElement("button");c.className="wt-btn",c.type="button",c.textContent=p("actOpenOptions"),c.addEventListener("click",m=>{var u;m.stopPropagation(),(u=t.onOpenOptions)==null||u.call(t)}),s.appendChild(c),f.appendChild(s)}else if(e==="error"){const s=document.createElement("div");s.className="wt-error",s.textContent=n||p("bubbleFailed"),f.appendChild(s);const c=document.createElement("div");if(c.className="wt-actions",t.onRetry){const u=document.createElement("button");u.className="wt-btn",u.type="button",u.textContent=p("bubbleRetry"),u.addEventListener("click",h=>{var _;h.stopPropagation(),(_=t.onRetry)==null||_.call(t)}),c.appendChild(u)}const m=document.createElement("button");m.className="wt-btn secondary",m.type="button",m.textContent=p("actOpenOptions"),m.addEventListener("click",u=>{var h;u.stopPropagation(),(h=t.onOpenOptions)==null||h.call(t)}),c.appendChild(m),f.appendChild(c)}else f.textContent=n;return r.append(o,f),document.documentElement.appendChild(r),S(r,t.x,t.y),g=r,I=e,y=t.onDismiss??null,(e==="loading"||e==="stream")&&q(r),requestAnimationFrame(()=>S(r,t.x,t.y)),r}function M(e){var n;return e instanceof Node?!!((n=document.getElementById(d))!=null&&n.contains(e)):!1}const B="data-wt-original",N="data-wt-translated",H=new Set(["SCRIPT","STYLE","NOSCRIPT","TEXTAREA","INPUT","SELECT","OPTION","CODE","PRE","KBD","SAMP","SVG","MATH","IFRAME","CANVAS","VIDEO","AUDIO"]);function K(e){var t,r;return!!(!e||H.has(e.tagName)||e.id==="web-translator-bubble"||(t=e.closest)!=null&&t.call(e,"#web-translator-bubble")||((r=e.getAttribute)==null?void 0:r.call(e,"role"))==="textbox"||e instanceof HTMLElement&&e.isContentEditable)}function V(e=document.body){if(!e)return[];const n=[],t=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,{acceptNode(o){const i=o.nodeValue||"";if(!i.trim())return NodeFilter.FILTER_REJECT;const a=o.parentElement;return K(a)||!/[\p{L}\p{N}]/u.test(i)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}});let r;for(;r=t.nextNode();){const o=r;n.push({node:o,text:o.nodeValue||""})}return n}function X(e,n){const t=[];for(let r=0;r<e.length;r+=n)t.push(e.slice(r,r+n));return t}async function z(e,n){D();const t=V();if(t.length===0)return{translated:0,skipped:0};const r=X(t,20);let o=0;for(const i of r){const a=i.map(s=>s.text);let f;try{f=await e(a)}catch(s){throw s}for(let s=0;s<i.length;s++){const c=i[s],m=f[s];if(!c.node.isConnected||typeof m!="string"||m===c.text)continue;const u=c.node.parentElement;u&&u.hasAttribute(B),u&&(u.hasAttribute(N)||u.setAttribute(N,"1")),U(c.node,c.text),c.node.nodeValue=m,o++}}return{translated:o,skipped:t.length-o}}const A=new WeakMap,C=new Set;function U(e,n){A.has(e)||(A.set(e,n),C.add(e))}function D(){let e=0;for(const n of Array.from(C)){const t=A.get(n);t!==void 0&&n.isConnected&&(n.nodeValue=t,e++),A.delete(n),C.delete(n)}return document.querySelectorAll(`[${N}]`).forEach(n=>{n.removeAttribute(N),n.removeAttribute(B)}),e}function Y(){return C.size>0}let w=null,k=!1,v=!1,l=null;function x(){O({type:"OPEN_OPTIONS"})}async function L(e,n,t){const r=e.trim();if(!r||r.length>5e3||k)return;k=!0;const o=Math.random().toString(36).slice(2),i={x:n,y:t,onOpenOptions:x,onRetry:()=>{L(r,n,t)},onDismiss:()=>{(l==null?void 0:l.requestId)===o&&(l=null)}};l={requestId:o,text:"",opts:i},b("loading","",i);try{const a=await O({type:"TRANSLATE_TEXT_STREAM",requestId:o,text:r});if(!a.ok){l=null,a.code==="MISSING_API_KEY"?b("missing-key",a.error,i):b("error",a.error,i);return}const f="text"in a&&a.text?a.text:(l==null?void 0:l.text)||"";b("result",f,i)}catch(a){l=null,b("error",a instanceof Error?a.message:p("bubbleFailed"),i)}finally{(l==null?void 0:l.requestId)===o&&(l=null),k=!1}}function P(){const e=window.getSelection();return!e||e.isCollapsed?"":e.toString()}function J(e){e.button===0&&(M(e.target)||(w={x:e.clientX,y:e.clientY},setTimeout(()=>{const n=P();n.trim()&&w&&L(n,w.x,w.y)},10)))}function j(e){e.key==="Escape"&&T()}function Q(e){if(M(e.target))return;P().trim()||T()}async function W(){if(v)return;v=!0;const e=Math.min(window.innerWidth-40,window.innerWidth-200),n=24;b("loading","",{x:e,y:n,onOpenOptions:x});try{const t=await z(async r=>{const o=await O({type:"TRANSLATE_BATCH",texts:r});if(!o.ok){const i=new Error(o.error);throw i.code=o.code,i}if(!("texts"in o))throw new Error(p("msgInvalidBatch"));return o.texts});b("result",p("pageTranslateDone",String(t.translated)),{x:e,y:n,onOpenOptions:x})}catch(t){const r=t instanceof Error?t.message:p("msgPageFailed");t.code==="MISSING_API_KEY"?b("missing-key",r,{x:e,y:n,onOpenOptions:x}):b("error",r,{x:e,y:n,onOpenOptions:x,onRetry:()=>{W()}})}finally{v=!1}}function Z(){const e=D(),n=Math.min(window.innerWidth-40,window.innerWidth-200);b("result",e>0?p("bubbleRestored",String(e)):p("bubbleNothing"),{x:n,y:24,onOpenOptions:x})}chrome.runtime.onMessage.addListener((e,n,t)=>{const r=e.type;if(r==="FULL_PAGE_TRANSLATE")return W().then(()=>t({ok:!0,translated:Y()})),!0;if(r==="FULL_PAGE_RESTORE")return Z(),t({ok:!0}),!1;if(r==="TRANSLATE_SELECTION_FROM_MENU"){const o=e.text||P(),i=(w==null?void 0:w.x)??window.innerWidth/2,a=(w==null?void 0:w.y)??80;return L(o,i,a),t({ok:!0}),!1}if(r==="TRANSLATE_STREAM_CHUNK"){const{requestId:o,chunk:i}=e;return l&&l.requestId===o&&(l.text+=i,b("stream",l.text,l.opts)),t({ok:!0}),!1}return r==="PING"&&t({ok:!0}),!1});document.addEventListener("mouseup",J,!0);document.addEventListener("keydown",j,!0);document.addEventListener("mousedown",Q,!0);
