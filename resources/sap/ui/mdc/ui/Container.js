/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/m/Page"],function(C,P){"use strict";var a=C.extend("sap.ui.mdc.ui.Container",{metadata:{library:"sap.ui.mdc",defaultAggregation:"views",properties:{defaultView:{type:"string"}},aggregations:{header:{type:"sap.m.IBar",multiple:false,forwarding:{idSuffix:"-container",aggregation:"customHeader",forwardBinding:true}},subHeader:{type:"sap.m.IBar",multiple:false,forwarding:{idSuffix:"-container",aggregation:"subHeader",forwardBinding:true}},footer:{type:"sap.m.IBar",multiple:false,forwarding:{idSuffix:"-container",aggregation:"footer",forwardBinding:true}},views:{type:"sap.ui.mdc.ui.ContainerItem",multiple:true},_content:{type:"sap.ui.core.Control",multiple:false,hidden:true}}},renderer:{apiVersion:2,render:function(r,c){r.openStart("div",c);r.style("height","100%");r.openEnd();r.renderControl(c.getAggregation("_content"));r.close("div");}}});a.prototype.init=function(){C.prototype.init.apply(this,arguments);this._initializeContent();};a.prototype.applySettings=function(){C.prototype.applySettings.apply(this,arguments);this.switchView(this.getDefaultView());return this;};a.prototype._initializeContent=function(){this.oLayout=new P(this.getId()+"-container");this.setAggregation("_content",this.oLayout);};a.prototype.removeView=function(c,s){var o=typeof c=="string"?this.getView(c):c;o=this.removeAggregation("views",o,s);if(o&&o.getKey()===this.getCurrentViewKey()){this.switchView();}return this;};a.prototype.addView=function(v){if(v&&v.getContent()&&!v.getContent().hasStyleClass("sapUiMDCContainerContent")){v.getContent().addStyleClass("sapUiMDCContainerContent");}this.addAggregation("views",v);return this;};a.prototype.getCurrentViewKey=function(){return this._sCurrentView?this._sCurrentView:this.getDefaultView();};a.prototype.getCurrentViewContent=function(){return this.getView(this.getCurrentViewKey()).getContent();};a.prototype.switchView=function(k){var n=this.getView(k);if(!n){n=this.getViews()[0];if(!n){return;}}this._sCurrentView=n.getKey();this.oLayout.removeAllContent();this.oLayout.addContent(n.getContent());};a.prototype.getView=function(k){return this.getViews().find(function(v){if(v.getKey()===k){return v;}});};a.prototype.getViewMap=function(){return this.getViews().map(function(o){return{key:o.getKey(),content:o.getContent()};});};a.prototype._getResourceText=function(t){this.oResourceBundle=this.oResourceBundle?this.oResourceBundle:sap.ui.getCore().getLibraryResourceBundle("sap.ui.mdc");return t?this.oResourceBundle.getText(t):this.oResourceBundle;};a.prototype.exit=function(){C.prototype.exit.apply(this,arguments);this._sCurrentView=null;this.oResourceBundle=null;};return a;});