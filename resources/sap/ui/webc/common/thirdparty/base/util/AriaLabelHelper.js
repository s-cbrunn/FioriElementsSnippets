sap.ui.define(["exports","./findNodeOwner"],function(e,t){"use strict";const s=e=>{if(!e.accessibleNameRef){if(e.accessibleName){return e.accessibleName}return undefined}return i(e)};const i=(e,s,i="")=>{const n=i&&i.split(" ")||e.accessibleNameRef.split(" ");const c=s||t(e);let r="";n.forEach((e,t)=>{const s=c.querySelector(`[id='${e}']`);r+=`${s?s.textContent:""}`;if(t<n.length-1){r+=" "}});return r};e.getAriaLabelledByTexts=i;e.getEffectiveAriaLabelText=s;Object.defineProperty(e,"__esModule",{value:true})});