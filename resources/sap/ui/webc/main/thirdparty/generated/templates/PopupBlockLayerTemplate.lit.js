sap.ui.define(["sap/ui/webc/common/thirdparty/base/renderer/LitRenderer"],function(e){"use strict";const r=(r,n,s)=>e.html`<div class="ui5-block-layer" ?hidden=${r._blockLayerHidden} tabindex="1" style="${e.styleMap(r.styles.blockLayer)}" @keydown="${r._preventBlockLayerFocus}" @mousedown="${r._preventBlockLayerFocus}"></div>`;return r});