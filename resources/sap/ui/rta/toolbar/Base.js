/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/HBox","sap/ui/dt/util/ZIndexManager","sap/ui/model/resource/ResourceModel","sap/ui/rta/util/Animation"],function(H,Z,R,A){"use strict";var B=H.extend("sap.ui.rta.toolbar.Base",{metadata:{library:"sap.ui.rta",properties:{color:{type:"string",defaultValue:"default"},zIndex:{type:"int"},rtaInformation:{type:"object",defaultValue:{flexSettings:{}}},textResources:"object"}},constructor:function(){H.apply(this,arguments);this._oExtensions={};this.setAlignItems("Center");this.setVisible(false);this.placeToContainer();},type:null,animation:false});B.prototype.init=function(){this._oResourceModel=new R({bundle:sap.ui.getCore().getLibraryResourceBundle("sap.ui.rta")});H.prototype.init.apply(this,arguments);this.setModel(this._oResourceModel,"i18n");return this.buildContent();};B.prototype.exit=function(){Object.values(this._oExtensions).forEach(function(e){e.destroy();});this._oExtensions={};H.prototype.exit.apply(this,arguments);};B.prototype.addExtension=function(n,E){if(!Object.keys(this._oExtensions).includes(n)){this._oExtensions[n]=new E({context:this});}return this._oExtensions[n];};B.prototype.getExtension=function(n){return this._oExtensions[n];};B.prototype.setTextResources=function(t){this.setProperty("textResources",t);this._oResourceModel=new R({bundle:sap.ui.getCore().getLibraryResourceBundle("sap.ui.rta")});};B.prototype.onFragmentLoaded=function(){return Promise.resolve();};B.prototype.eventHandler=function(e,E){this["fire"+e](E.getParameters());};B.prototype.buildControls=function(){return Promise.resolve([]);};B.prototype.placeToContainer=function(){this.placeAt(sap.ui.getCore().getStaticAreaRef());};B.prototype.buildContent=function(){return this.buildControls().then(function(c){c.forEach(this.addItem,this);}.bind(this));};B.prototype.show=function(){return new Promise(function(r){var d={onAfterRendering:function(){this.removeEventDelegate(d);r();}};this.addEventDelegate(d,this);this.bringToFront();this.setVisible(true);}.bind(this)).then(function(){return this.animation?A.waitTransition(this.$(),this.addStyleClass.bind(this,"is_visible")):Promise.resolve();}.bind(this)).then(function(){this.focus();}.bind(this));};B.prototype.hide=function(s){var p=Promise.resolve();if(this.animation){if(s){this.removeStyleClass("is_visible");}else{p=A.waitTransition(this.$(),this.removeStyleClass.bind(this,"is_visible"));}}return p.then(function(){this.setVisible(false);}.bind(this));};B.prototype.getControl=function(n){return sap.ui.getCore().byId("sapUiRta_"+n);};B.prototype.bringToFront=function(){this.setZIndex(Z.getNextZIndex());};return B;});