sap.ui.define(["sap/ui/webc/common/thirdparty/base/asset-registries/Themes","sap/ui/webc/common/thirdparty/theme-base/generated/themes/sap_fiori_3/parameters-bundle.css","./sap_fiori_3/parameters-bundle.css"],function(e,t,r){"use strict";function i(e){return e&&typeof e==="object"&&"default"in e?e["default"]:e}var o=i(t);e.registerThemePropertiesLoader("@ui5/webcomponents-theme-base","sap_fiori_3",()=>o);e.registerThemePropertiesLoader("@ui5/webcomponents","sap_fiori_3",()=>r);var a=':host(:not([hidden])){display:inline-block;width:100%}.ui5-tc-root{display:flex;flex-direction:column;width:100%;height:100%;font-family:"72override",var(--sapFontFamily);font-size:1rem}.ui5-tc__header{position:relative;padding:0 1rem;display:flex;align-items:center;height:var(--_ui5_tc_header_height);background-color:var(--sapObjectHeader_Background);box-shadow:var(--sapContent_HeaderShadow);box-sizing:border-box}.ui5-tc__headerInnerContainer{position:relative;flex:1 1 100%;min-width:0}:host([tabs-placement=Bottom]) .ui5-tc__header{border-top:var(--_ui5_tc_header_border_bottom)}.ui5-tc-root.ui5-tc--textOnly .ui5-tc__header{height:var(--_ui5_tc_header_height_text_only)}.ui-tc__headerScrollContainer{box-sizing:border-box;overflow:hidden;flex:1 1 100%}.ui5-tc__headerList{position:relative;display:flex;margin:0;padding:0;list-style:none}.ui5-tc__separator{width:0;border-left:2px solid var(--sapList_BorderColor);margin:.5rem .25rem}.ui5-tc__separator:focus{outline:none}.ui5-tc__headerArrow{position:absolute;top:0;bottom:1px;z-index:1;display:flex;align-items:center;color:var(--sapContent_IconColor);background-color:var(--sapObjectHeader_Background);padding:0 .25rem;visibility:hidden}.ui5-tc__headerArrowLeft{left:0}.ui5-tc__headerArrowRight{right:0}.ui5-tc__headerArrow:active,.ui5-tc__headerArrow:hover{color:var(--sapHighlightColor)}.ui5-tc__headerArrow--visible{visibility:visible}.ui-tc__overflowButton{margin-left:auto;margin-right:.25rem}.ui5-tc-root.ui5-tc--textOnly .ui5-tc__content{height:calc(100% - var(--_ui5_tc_header_height_text_only))}.ui5-tc__content{position:relative;display:flex;height:calc(100% - var(--_ui5_tc_header_height));padding:1rem 2rem;background-color:var(--sapGroup_ContentBackground);border-bottom:var(--_ui5_tc_content_border_bottom);box-sizing:border-box}:host([tabs-placement=Bottom]) .ui5-tc__content{border-top:var(--_ui5_tc_content_border_bottom)}.ui5-tc__content--collapsed{display:none}.ui5-tc--transparent .ui5-tc__content{background-color:transparent}.ui5-tc__contentItem{max-height:100%;display:flex;flex-grow:1;overflow:auto}.ui5-tc__contentItem[hidden]{display:none}:host([media-range=S]) .ui5-tc__header{padding:0}:host([media-range=S]) .ui5-tc__content{padding:1rem}:host([media-range=XL]) .ui5-tc__header{padding:0 2rem}:host([media-range=XL]) .ui5-tc__content{padding:1rem 3rem}[dir=rtl] .ui-tc__overflowButton{margin-right:auto;margin-left:.25rem}';return a});