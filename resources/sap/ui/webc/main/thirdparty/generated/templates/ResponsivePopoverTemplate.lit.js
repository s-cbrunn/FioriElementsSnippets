sap.ui.define(["sap/ui/webc/common/thirdparty/base/renderer/LitRenderer"],function(e){"use strict";const o=(o,a,t)=>e.html`${o._isPhone?s(o,a,t):r(o)}`;const s=(o,s,t)=>e.html`<${e.scopeTag("ui5-dialog",s,t)} ?with-padding=${o.withPadding} stretch _disable-initial-focus @ui5-before-open="${e.ifDefined(o._propagateDialogEvent)}" @ui5-after-open="${e.ifDefined(o._afterDialogOpen)}" @ui5-before-close="${e.ifDefined(o._propagateDialogEvent)}" @ui5-after-close="${e.ifDefined(o._afterDialogClose)}">${!o._hideHeader?a(o,s,t):undefined}<slot></slot><slot slot="footer" name="footer"></slot></${e.scopeTag("ui5-dialog",s,t)}>`;const a=(o,s,a)=>e.html`${o.header.length?t():i(o,s,a)}`;const t=(o,s,a)=>e.html`<slot slot="header" name="header"></slot>`;const i=(o,s,a)=>e.html`<header class="${e.classMap(o.classes.header)}">${o.headerText?l(o,s,a):undefined}${!o._hideCloseButton?n(o,s,a):undefined}</header>`;const l=(o,s,a)=>e.html`<${e.scopeTag("ui5-title",s,a)} level="H2" class="ui5-popup-header-text ui5-responsive-popover-header-text">${e.ifDefined(o.headerText)}</${e.scopeTag("ui5-title",s,a)}>`;const n=(o,s,a)=>e.html`<${e.scopeTag("ui5-button",s,a)} icon="decline" design="Transparent" aria-label="${e.ifDefined(o._closeDialogAriaLabel)}" @click="${o.close}"></${e.scopeTag("ui5-button",s,a)}>`;const r=(o,s,a)=>e.html`<section style="${e.styleMap(o.styles.root)}" class="${e.classMap(o.classes.root)}" role="dialog" aria-modal="${e.ifDefined(o._ariaModal)}" aria-label="${e.ifDefined(o._ariaLabel)}" aria-labelledby="${e.ifDefined(o._ariaLabelledBy)}" dir="${e.ifDefined(o.effectiveDir)}" @keydown=${o._onkeydown} @focusout=${o._onfocusout} @mouseup=${o._onmouseup} @mousedown=${o._onmousedown}><span class="first-fe" data-ui5-focus-trap tabindex="0" @focusin=${o.forwardToLast}></span><span class="ui5-popover-arrow" style="${e.styleMap(o.styles.arrow)}"></span>${o._displayHeader?d(o):undefined}<div style="${e.styleMap(o.styles.content)}" class="${e.classMap(o.classes.content)}"  @scroll="${o._scroll}"><slot></slot></div>${o._displayFooter?p(o):undefined}<span class="last-fe" data-ui5-focus-trap tabindex="0" @focusin=${o.forwardToFirst}></span></section>`;const d=(o,s,a)=>e.html`<header class="ui5-popup-header-root" id="ui5-popup-header">${o.header.length?c():f(o)}</header>`;const c=(o,s,a)=>e.html`<slot name="header"></slot>`;const f=(o,s,a)=>e.html`<h2 class="ui5-popup-header-text">${e.ifDefined(o.headerText)}</h2>`;const p=(o,s,a)=>e.html`${o.footer.length?u():undefined}`;const u=(o,s,a)=>e.html`<footer class="ui5-popup-footer-root"><slot name="footer"></slot></footer>`;return o});