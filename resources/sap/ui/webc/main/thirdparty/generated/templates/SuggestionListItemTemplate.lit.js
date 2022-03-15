sap.ui.define(["sap/ui/webc/common/thirdparty/base/renderer/LitRenderer"],function(e){"use strict";const i=(i,t,d)=>e.html`<li tabindex="${e.ifDefined(i.tabIndex)}" class="${e.classMap(i.classes.main)}" dir="${e.ifDefined(i.effectiveDir)}" @focusin="${i._onfocusin}" @focusout="${i._onfocusout}" @keyup="${i._onkeyup}" @keydown="${i._onkeydown}" @mouseup="${i._onmouseup}" @mousedown="${i._onmousedown}" @touchstart="${i._ontouchstart}" @touchend="${i._ontouchend}" @click="${i._onclick}" aria-selected="${e.ifDefined(i.ariaSelected)}" role="${e.ifDefined(i._accInfo.role)}" aria-expanded="${e.ifDefined(i._accInfo.ariaExpanded)}" title="${e.ifDefined(i.title)}" aria-level="${e.ifDefined(i._accInfo.ariaLevel)}" aria-posinset="${e.ifDefined(i._accInfo.posinset)}" aria-setsize="${e.ifDefined(i._accInfo.setsize)}" aria-labelledby="${e.ifDefined(i._id)}-invisibleText ${e.ifDefined(i._id)}-content" aria-disabled="${e.ifDefined(i.ariaDisabled)}" style="list-style-type: none;">${i.placeSelectionElementBefore?n(i,t,d):undefined}<div id="${e.ifDefined(i._id)}-content" class="ui5-li-content">${i.displayImage?l(i,t,d):undefined}${i.displayIconBegin?s(i,t,d):undefined}<div class="ui5-li-text-wrapper">${i.hasTitle?c():undefined}${i.hasDescription?o(i):undefined}${!i.typeActive?p(i):undefined}</div>${!i.hasDescription?r(i):undefined}</div>${i.displayIconEnd?b(i,t,d):undefined}${i.typeDetail?D(i,t,d):undefined}${i.placeSelectionElementAfter?h(i,t,d):undefined}<span id="${e.ifDefined(i._id)}-invisibleText" class="ui5-hidden-text">${e.ifDefined(i._accInfo.listItemAriaLabel)}${e.ifDefined(i.accessibleName)}</span></li> `;const n=(i,n,l)=>e.html`${i.modeSingleSelect?t(i,n,l):undefined}${i.modeMultiSelect?d(i,n,l):undefined}${i.renderDeleteButton?a(i,n,l):undefined}`;const t=(i,n,t)=>e.html`<${e.scopeTag("ui5-radio-button",n,t)} ?disabled="${i.isInactive}" tabindex="-1" id="${e.ifDefined(i._id)}-singleSelectionElement" class="ui5-li-singlesel-radiobtn" ?checked="${i.selected}" @click="${i.onSingleSelectionComponentPress}"></${e.scopeTag("ui5-radio-button",n,t)}>`;const d=(i,n,t)=>e.html`<${e.scopeTag("ui5-checkbox",n,t)} ?disabled="${i.isInactive}" tabindex="-1" id="${e.ifDefined(i._id)}-multiSelectionElement" class="ui5-li-multisel-cb" ?checked="${i.selected}" aria-label="${e.ifDefined(i._accInfo.ariaLabel)}" @click="${i.onMultiSelectionComponentPress}"></${e.scopeTag("ui5-checkbox",n,t)}>`;const a=(i,n,t)=>e.html`<div class="ui5-li-deletebtn"><${e.scopeTag("ui5-button",n,t)} tabindex="-1" data-sap-no-tab-ref id="${e.ifDefined(i._id)}-deleteSelectionElement" design="Transparent" icon="decline" ?disabled="${i.disableDeleteButton}" @click="${i.onDelete}" title="${e.ifDefined(i.deleteText)}"></${e.scopeTag("ui5-button",n,t)}></div>`;const l=(i,n,t)=>e.html`<${e.scopeTag("ui5-avatar",n,t)} shape="Square" class="ui5-li-img"><img src="${e.ifDefined(i.image)}" class="ui5-li-img-inner" /></${e.scopeTag("ui5-avatar",n,t)}>`;const s=(i,n,t)=>e.html`<${e.scopeTag("ui5-icon",n,t)} part="icon" name="${e.ifDefined(i.icon)}" class="ui5-li-icon"></${e.scopeTag("ui5-icon",n,t)}>`;const c=(i,n,t)=>e.html`<span part="title" class="ui5-li-title"><slot></slot></span>`;const o=(i,n,t)=>e.html`<div class="ui5-li-description-info-wrapper"><span part="description" class="ui5-li-desc">${i.richDescription.length?f():u(i)}</span>${i.additionalText?$(i):undefined}</div>`;const f=(i,n,t)=>e.html`<slot name="richDescription"></slot>`;const u=(i,n,t)=>e.html`${e.ifDefined(i.description)}`;const $=(i,n,t)=>e.html`<span part="additional-text" class="ui5-li-additional-text">${e.ifDefined(i.additionalText)}</span>`;const p=(i,n,t)=>e.html`<span class="ui5-hidden-text">${e.ifDefined(i.type)}</span>`;const r=(i,n,t)=>e.html`${i.additionalText?m(i):undefined}`;const m=(i,n,t)=>e.html`<span part="additional-text" class="ui5-li-additional-text">${e.ifDefined(i.additionalText)}</span>`;const b=(i,n,t)=>e.html`<${e.scopeTag("ui5-icon",n,t)} part="icon" name="${e.ifDefined(i.icon)}" class="ui5-li-icon"></${e.scopeTag("ui5-icon",n,t)}>`;const D=(i,n,t)=>e.html`<div class="ui5-li-detailbtn"><${e.scopeTag("ui5-button",n,t)} design="Transparent" icon="edit" @click="${i.onDetailClick}"></${e.scopeTag("ui5-button",n,t)}></div>`;const h=(i,n,t)=>e.html`${i.modeSingleSelect?g(i,n,t):undefined}${i.modeMultiSelect?T(i,n,t):undefined}${i.renderDeleteButton?x(i,n,t):undefined}`;const g=(i,n,t)=>e.html`<${e.scopeTag("ui5-radio-button",n,t)} ?disabled="${i.isInactive}" tabindex="-1" id="${e.ifDefined(i._id)}-singleSelectionElement" class="ui5-li-singlesel-radiobtn" ?checked="${i.selected}" @click="${i.onSingleSelectionComponentPress}"></${e.scopeTag("ui5-radio-button",n,t)}>`;const T=(i,n,t)=>e.html`<${e.scopeTag("ui5-checkbox",n,t)} ?disabled="${i.isInactive}" tabindex="-1" id="${e.ifDefined(i._id)}-multiSelectionElement" class="ui5-li-multisel-cb" ?checked="${i.selected}" aria-label="${e.ifDefined(i._accInfo.ariaLabel)}" @click="${i.onMultiSelectionComponentPress}"></${e.scopeTag("ui5-checkbox",n,t)}>`;const x=(i,n,t)=>e.html`<div class="ui5-li-deletebtn"><${e.scopeTag("ui5-button",n,t)} tabindex="-1" data-sap-no-tab-ref id="${e.ifDefined(i._id)}-deleteSelectionElement" design="Transparent" icon="decline" ?disabled="${i.disableDeleteButton}" @click="${i.onDelete}" title="${e.ifDefined(i.deleteText)}"></${e.scopeTag("ui5-button",n,t)}></div>`;return i});