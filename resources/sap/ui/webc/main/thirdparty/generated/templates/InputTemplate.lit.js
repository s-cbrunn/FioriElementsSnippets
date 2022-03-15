sap.ui.define(["sap/ui/webc/common/thirdparty/base/renderer/LitRenderer"],function(i){"use strict";const e=(e,s,o)=>i.html`<div class="ui5-input-root" @focusin="${e._onfocusin}" @focusout="${e._onfocusout}"><div class="ui5-input-content"><input id="${i.ifDefined(e._id)}-inner" class="ui5-input-inner" style="${i.styleMap(e.styles.innerInput)}" type="${i.ifDefined(e.inputType)}" inner-input ?inner-input-with-icon="${e.icon.length}" ?disabled="${e.disabled}" ?readonly="${e._readonly}" .value="${i.ifDefined(e.value)}" placeholder="${i.ifDefined(e._placeholder)}" maxlength="${i.ifDefined(e.maxlength)}" role="${i.ifDefined(e.accInfo.input.role)}" aria-controls="${i.ifDefined(e.accInfo.input.ariaControls)}" ?aria-invalid="${e.accInfo.input.ariaInvalid}" aria-haspopup="${i.ifDefined(e.accInfo.input.ariaHasPopup)}" aria-describedby="${i.ifDefined(e.accInfo.input.ariaDescribedBy)}" aria-roledescription="${i.ifDefined(e.accInfo.input.ariaRoledescription)}" aria-autocomplete="${i.ifDefined(e.accInfo.input.ariaAutoComplete)}" aria-expanded="${i.ifDefined(e.accInfo.input.ariaExpanded)}" aria-label="${i.ifDefined(e.accInfo.input.ariaLabel)}" aria-required="${i.ifDefined(e.required)}" @input="${e._handleInput}" @change="${e._handleChange}" @keydown="${e._onkeydown}" @keyup="${e._onkeyup}" @click=${e._click} @focusin=${e.innerFocusIn} data-sap-no-tab-ref data-sap-focus-ref step="${i.ifDefined(e.nativeInputAttributes.step)}" min="${i.ifDefined(e.nativeInputAttributes.min)}" max="${i.ifDefined(e.nativeInputAttributes.max)}" />${e.icon.length?n():undefined}${e.showSuggestions?a(e):undefined}${e.accInfo.input.ariaDescription?t(e):undefined}${e.hasValueState?d(e):undefined}</div><slot name="formSupport"></slot></div>`;const n=(e,n,a)=>i.html`<div class="ui5-input-icon-root"><slot name="icon"></slot></div>`;const a=(e,n,a)=>i.html`<span id="${i.ifDefined(e._id)}-suggestionsText" class="ui5-hidden-text">${i.ifDefined(e.suggestionsText)}</span><span id="${i.ifDefined(e._id)}-selectionText" class="ui5-hidden-text" aria-live="polite" role="status"></span><span id="${i.ifDefined(e._id)}-suggestionsCount" class="ui5-hidden-text" aria-live="polite">${i.ifDefined(e.availableSuggestionsCount)}</span>`;const t=(e,n,a)=>i.html`<span id="${i.ifDefined(e._id)}-descr" class="ui5-hidden-text">${i.ifDefined(e.accInfo.input.ariaDescription)}</span>`;const d=(e,n,a)=>i.html`<span id="${i.ifDefined(e._id)}-valueStateDesc" class="ui5-hidden-text">${i.ifDefined(e.ariaValueStateHiddenText)}</span>`;return e});