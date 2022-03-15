/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Toolbar","./Button","./Dialog","./Popover","./SuggestionsList","./SuggestionItem","sap/ui/Device","sap/m/library","sap/ui/core/Core","sap/ui/core/InvisibleText"],function(T,B,D,P,S,a,b,l,C,I){"use strict";var c=l.PlacementType;function d(i){var p=i,e,f,g,u=b.system.phone,s=this;function o(E){var n=E.srcControl;var v;if(n instanceof a){v=n.getSuggestionText();s._suggestionItemTapped=true;e.close();window.setTimeout(function(){i._updateValue(v);i._fireChangeEvent();i.fireSearch({query:v,suggestionItem:n,refreshButtonPressed:false,clearButtonPressed:false});},0);}}function h(){var n,q,r,t,v,w;r=new(sap.ui.require('sap/m/SearchField'))({liveChange:function(E){var x=E.getParameter("newValue");i._updateValue(x);i.fireLiveChange({newValue:x});i.fireSuggest({suggestValue:x});s.update();},search:function(E){if(!E.getParameter("clearButtonPressed")){n.close();}}});w=new B({icon:"sap-icon://decline",press:function(){s._cancelButtonTapped=true;n._oCloseTrigger=true;n.close();i._updateValue(q);}});t=new T({content:[r,w]});v=new B({text:C.getLibraryResourceBundle("sap.m").getText("MSGBOX_OK"),press:function(){n.close();}});n=new D({stretch:true,customHeader:t,content:k(),beginButton:v,beforeClose:function(){i._bSuggestionSuppressed=true;},beforeOpen:function(){q=i.getValue();r._updateValue(q);},afterClose:function(E){if(!s._cancelButtonTapped&&!s._suggestionItemTapped){i._fireChangeEvent();i.fireSearch({query:i.getValue(),refreshButtonPressed:false,clearButtonPressed:false});}}});n.addEventDelegate({ontap:o},i);return n;}function j(){var n=s._oPopover=new P({showArrow:false,showHeader:false,horizontalScrolling:false,placement:c.Vertical,offsetX:0,offsetY:0,initialFocus:p,bounce:false,ariaLabelledBy:I.getStaticId("sap.m","INPUT_AVALIABLE_VALUES"),afterOpen:function(){i._applySuggestionAcc();},beforeClose:function(){i.$("I").removeAttr("aria-activedescendant");i.$("SuggDescr").text("");},content:k()}).addStyleClass("sapMSltPicker").addStyleClass("sapMSltPicker-CTX");n.open=function(){return this.openBy(p);};n.addEventDelegate({onAfterRendering:s.setPopoverMinWidth.bind(s),ontap:o},i);return n;}function k(){if(!f){f=new S({parentInput:p});}return f;}function m(){if(e===undefined){e=u?h():j();}return e;}this.setPopoverMinWidth=function(){var n=s._oPopover.getDomRef();if(n){var w=(i.$().outerWidth()/parseFloat(l.BaseFontSize))+"rem";n.style.minWidth=w;}};this.destroy=function(){if(e){e.close();e.destroy();e=null;}if(f){f.destroy();f=null;}};this.close=function(){if(!u&&this.isOpen()){e.close();}};this.open=function(){if(!this.isOpen()){this.setSelected(-1);this._suggestionItemTapped=false;this._cancelButtonTapped=false;m().open();}};this.update=function(){var f=k();window.clearTimeout(g);if(this.isOpen()){g=window.setTimeout(f.update.bind(f),50);i._applySuggestionAcc();}};this.isOpen=function(){return!!e&&e.isOpen();};this.getSelected=function(){return k().getSelectedItemIndex();};this.setSelected=function(n,r){return k().selectByIndex(n,r);};}return d;},true);