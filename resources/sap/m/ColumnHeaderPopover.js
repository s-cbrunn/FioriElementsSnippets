/*
 * ! OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/core/Control','sap/m/Toolbar','sap/m/Button','sap/m/ResponsivePopover','sap/m/ToolbarSpacer','sap/ui/dom/containsOrEquals'],function(C,T,B,R,a,c){"use strict";var b=C.extend("sap.m.ColumnHeaderPopover",{library:"sap.m",metadata:{properties:{},aggregations:{items:{type:"sap.m.ColumnPopoverItem",multiple:true,singularName:"item",bindable:true},_popover:{type:"sap.m.ResponsivePopover",multiple:false,visibility:"hidden"}},defaultAggregation:"items",associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}}},renderer:null});b.prototype.init=function(){this._bPopoverCreated=false;this._oShownCustomContent=null;var t=this;this._minWidthDelegate=function(){this.$().css("min-width",t.minWidth);};};b.prototype.exit=function(){if(this._oToolbar){this._oToolbar.destroy();this._oToolbar=null;}this._closeBtn=null;this._spacer=null;this._aButtons=null;this._oShownCustomContent=null;};b.prototype._createPopover=function(){var t=this;this._oShownCustomContent=null;var o=sap.ui.getCore().getLibraryResourceBundle("sap.m"),s=o.getText("COLUMNHEADERPOPOVER_CLOSE_BUTTON");var p=new R(this.getId()+"-popover",{showArrow:false,showHeader:false,placement:"Bottom",verticalScrolling:true,horizontalScrolling:false,ariaLabelledBy:this.getAriaLabelledBy(),beforeClose:function(e){if(t._oShownCustomContent){t._oShownCustomContent.setVisible(false);t._oShownCustomContent=null;}t._cleanSelection();}});p._oControl.addDelegate({"onAfterRendering":this._minWidthDelegate},p._oControl);this.setAggregation("_popover",p);var d=new T(this.getId()+"-tb");this._spacer=new a();this._closeBtn=new B(d.getId()+"-closeBtn",{type:"Transparent",icon:"sap-icon://decline",tooltip:s,press:[p.close,p]});d.addContent(this._spacer);d.addContent(this._closeBtn);p.addContent(d);this._oToolbar=d;};b.prototype._cleanSelection=function(o){var d=this._aButtons;if(d){d.forEach(function(e){if((!o||e!==o)&&e.getPressed&&e.getPressed()){e.setPressed(false);}});}};b.prototype.openBy=function(o){if(!this._bPopoverCreated){this._createPopover();this._bPopoverCreated=true;}else{this._oToolbar.removeContent(this._spacer);this._oToolbar.removeContent(this._closeBtn);this._oToolbar.destroyContent();}var p=this.getAggregation("_popover");var d=[];var I=this.getItems();var m=5;for(var i=0;(i<I.length)&&(d.length<m);i++){var e=I[i];if(e.getVisible()){var f=e._createButton(this._oToolbar.getId()+"-btn_"+i,this);f._sContentId=e._sContentId;d.push(f);this._oToolbar.insertContent(f,i);}}if(d.length===0){return;}this._aButtons=d;this._oToolbar.addContent(this._spacer);this._oToolbar.addContent(this._closeBtn);if(!this._bAppendedToUIArea&&!this.getParent()){var s=sap.ui.getCore().getStaticAreaRef();s=sap.ui.getCore().getUIArea(s);s.addContent(this,true);this._bAppendedToUIArea=true;}var O=o.getFocusDomRef();if(O){p.setOffsetY(-O.clientHeight);this.minWidth=O.clientWidth;}p.openBy(o);};b.prototype.invalidate=function(o){var p=this.getAggregation("_popover");if(o===p){C.prototype.invalidate.apply(this,arguments);}return this;};b.prototype.addAriaLabelledBy=function(i){var r=this.getAggregation("_popover");if(r){r.addAriaLabelledBy(i);}return this.addAssociation("ariaLabelledBy",i);};b.prototype.removeAriaLabelledBy=function(o){var r=this.getAggregation("_popover");if(r){r.removeAriaLabelledBy(o);}return this.removeAssociation("ariaLabelledBy",o);};b.prototype.removeAllAssociation=function(A,s){if(A==="ariaLabelledBy"){var r=this.getAggregation("_popover");if(r){r.removeAllAssociation(A,s);}}return C.prototype.removeAllAssociation.apply(this,arguments);};return b;});
