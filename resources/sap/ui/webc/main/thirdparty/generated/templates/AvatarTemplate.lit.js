sap.ui.define(["sap/ui/webc/common/thirdparty/base/renderer/LitRenderer"],function(i){"use strict";const e=(e,s,o)=>i.html`<div class="ui5-avatar-root" tabindex="${i.ifDefined(e.tabindex)}" data-sap-focus-ref @keyup=${e._onkeyup} @keydown=${e._onkeydown} @focusout=${e._onfocusout} @focusin=${e._onfocusin} @click=${e._onclick} role="${i.ifDefined(e._role)}" aria-haspopup="${i.ifDefined(e._ariaHasPopup)}">${e.hasImage?n():a(e,s,o)}</div>`;const n=(e,n,a)=>i.html`<slot></slot>`;const a=(e,n,a)=>i.html`${e.icon?s(e,n,a):o(e)}`;const s=(e,n,a)=>i.html`<${i.scopeTag("ui5-icon",n,a)} class="ui5-avatar-icon" name="${i.ifDefined(e.icon)}" accessible-name="${i.ifDefined(e.accessibleNameText)}"></${i.scopeTag("ui5-icon",n,a)}>`;const o=(e,n,a)=>i.html`${e.initials?t(e):undefined}`;const t=(e,n,a)=>i.html`<span class="ui5-avatar-initials">${i.ifDefined(e.validInitials)}</span>`;return e});