sap.ui.define(["sap/ui/webc/common/thirdparty/base/UI5Element","sap/ui/webc/common/thirdparty/base/renderer/LitRenderer","sap/ui/webc/common/thirdparty/base/i18nBundle","./generated/templates/BadgeTemplate.lit","./generated/i18n/i18n-defaults","./generated/themes/Badge.css"],function(e,t,n,a,r,i){"use strict";function s(e){return e&&typeof e==="object"&&"default"in e?e["default"]:e}var o=s(e);var c=s(t);const u={tag:"ui5-badge",languageAware:true,properties:{colorScheme:{type:String,defaultValue:"1"},_hasIcon:{type:Boolean},_iconOnly:{type:Boolean}},managedSlots:true,slots:{default:{type:Node},icon:{type:HTMLElement}}};class l extends o{constructor(){super();this.i18nBundle=n.getI18nBundle("@ui5/webcomponents")}static get metadata(){return u}static get render(){return c}static get template(){return a}static get styles(){return i}static async onDefine(){await n.fetchI18nBundle("@ui5/webcomponents")}onBeforeRendering(){this._hasIcon=this.hasIcon;this._iconOnly=this.iconOnly}get hasText(){return!!this.textContent.trim().length}get hasIcon(){return!!this.icon.length}get iconOnly(){return this.hasIcon&&!this.hasText}get badgeDescription(){return this.i18nBundle.getText(r.BADGE_DESCRIPTION)}}l.define();return l});