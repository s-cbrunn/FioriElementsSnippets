sap.ui.define(["sap/ui/webc/common/thirdparty/base/renderer/LitRenderer"],function(i){"use strict";const e=(e,c,d)=>i.html`<div class="ui5-wiz-step-root" role="listitem" tabindex="${i.ifDefined(e.tabIndex)}" aria-current="${i.ifDefined(e.accInfo.ariaCurrent)}" aria-setsize="${i.ifDefined(e.accInfo.ariaSetsize)}" aria-posinset="${i.ifDefined(e.accInfo.ariaPosinset)}" aria-disabled="${i.ifDefined(e.accInfo.ariaDisabled)}" aria-label="${i.ifDefined(e.accInfo.ariaLabel)}" @click="${e._onclick}" @keydown="${e._onkeydown}" @keyup="${e._onkeyup}" @focusin="${e._onfocusin}"><div class="ui5-wiz-step-main"><div class="ui5-wiz-step-icon-circle">${e.icon?s(e,c,d):n(e)}</div>${e.hasTexts?t(e):undefined}</div>${!e.hideSeparator?a():undefined}</div>`;const s=(e,s,n)=>i.html`<${i.scopeTag("ui5-icon",s,n)} class="ui5-wiz-step-icon" name="${i.ifDefined(e.icon)}"></${i.scopeTag("ui5-icon",s,n)}>`;const n=(e,s,n)=>i.html`<span class="ui5-wiz-step-number">${i.ifDefined(e.number)}</span>`;const t=(e,s,n)=>i.html`<div class="ui5-wiz-step-texts"><div class="ui5-wiz-step-title-text">${i.ifDefined(e.titleText)}</div><div class="ui5-wiz-step-subtitle-text">${i.ifDefined(e.subtitleText)}</div></div>`;const a=(e,s,n)=>i.html`<div class="ui5-wiz-step-hr"></div>`;return e});