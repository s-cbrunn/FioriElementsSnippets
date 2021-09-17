/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/rta/plugin/Plugin","sap/ui/rta/plugin/RenameHandler","sap/ui/rta/Utils","sap/ui/dt/ElementOverlay","sap/ui/dt/OverlayRegistry","sap/ui/dt/OverlayUtil","sap/ui/dt/Util","sap/ui/fl/Utils","sap/ui/fl/Layer","sap/ui/fl/variants/VariantManagement","sap/ui/base/ManagedObject","sap/ui/rta/command/CompositeCommand","sap/base/Log"],function(P,R,U,E,O,a,D,f,L,V,M,C,b){"use strict";E.prototype._variantManagement=undefined;E.prototype.getVariantManagement=function(){return this._variantManagement;};E.prototype.setVariantManagement=function(k){this._variantManagement=k;};E.prototype.hasVariantManagement=function(){return!!this._variantManagement;};function d(o){var m=o.getElement().getManageDialog();if(m&&!m.bIsDestroyed){m.destroy();}}var c=P.extend("sap.ui.rta.plugin.ControlVariant",{metadata:{library:"sap.ui.rta",properties:{oldValue:"string",variantManagementControlOverlay:{type:"any"}},associations:{},events:{}}});c.prototype.registerElementOverlay=function(o){var e=o.getElement();var v;P.prototype.registerElementOverlay.apply(this,arguments);if(e instanceof V){var A=e.getFor();var g;var h=f.getAppComponentForControl(e);var s=e.getId();v=h.getLocalId(s)||s;o.setVariantManagement(v);if(!A||(Array.isArray(A)&&A.length===0)){return;}g=!Array.isArray(A)?[A]:A;g.forEach(function(i){var j=i instanceof M?i:sap.ui.getCore().byId(i);var k=O.getOverlay(j);this._propagateVariantManagement(k,v);}.bind(this));o.attachEvent("editableChange",R._manageClickEvent,this);d(o);}else if(!o.getVariantManagement()){v=this._getVariantManagementFromParent(o);if(v){o.setVariantManagement(v);o.attachEvent("editableChange",R._manageClickEvent,this);}}};c.prototype._isPersonalizationMode=function(){return this.getCommandFactory().getFlexSettings().layer===L.USER;};c.prototype._propagateVariantManagement=function(p,v){var e=[];p.setVariantManagement(v);e=a.getAllChildOverlays(p);e.forEach(function(o){e=e.concat(this._propagateVariantManagement(o,v));}.bind(this));return e;};c.prototype._getVariantManagementFromParent=function(o){var v=o.getVariantManagement();if(!v&&o.getParentElementOverlay()){return this._getVariantManagementFromParent(o.getParentElementOverlay());}return v;};c.prototype.deregisterElementOverlay=function(o){if(this._isVariantManagementControl(o)){d(o);}o.detachEvent("editableChange",R._manageClickEvent,this);o.detachBrowserEvent("click",R._onClick,this);this.removeFromPluginsList(o);P.prototype.deregisterElementOverlay.apply(this,arguments);};c.prototype._getVariantModel=function(e){var A=f.getAppComponentForControl(e);return A?A.getModel(f.VARIANT_MODEL_NAME):undefined;};c.prototype._isEditable=function(o){if(this._isPersonalizationMode()){return false;}return this._isVariantManagementControl(o)&&this.hasStableId(o);};c.prototype._isVariantManagementControl=function(o){var e=o.getElement();var A=e.getAssociation("for");return!!(A&&e instanceof V);};c.prototype.isVariantSwitchAvailable=function(e){return this._isVariantManagementControl(e);};c.prototype.isVariantSwitchEnabled=function(e){var o=e[0];var v=[];if(this._isVariantManagementControl(o)){var g=o.getElement();var s=o.getVariantManagement?o.getVariantManagement():undefined;if(!s){return false;}var m=this._getVariantModel(g);if(m){v=m.getData()[s].variants.reduce(function(r,i){if(i.visible){return r.concat(i);}return r;},[]);}var h=v.length>1;return h;}return false;};c.prototype.setDesignTime=function(o){R._setDesignTime.call(this,o);};c.prototype.isRenameAvailable=function(e){return this._isVariantManagementControl(e);};c.prototype.isRenameEnabled=function(e){return this._isVariantManagementControl(e[0]);};c.prototype.isVariantDuplicateAvailable=function(e){return this._isVariantManagementControl(e);};c.prototype.isVariantDuplicateEnabled=function(e){var o=e[0];var v=o.getVariantManagement?o.getVariantManagement():undefined;if(!v||!this._isVariantManagementControl(o)){return false;}return true;};c.prototype.isVariantConfigureAvailable=function(e){return this._isVariantManagementControl(e);};c.prototype.isVariantConfigureEnabled=function(e){return this._isVariantManagementControl(e[0]);};c.prototype.switchVariant=function(t,n,s){var o=t.getDesignTimeMetadata();var T=t.getElement();this.getCommandFactory().getCommandFor(T,"switch",{targetVariantReference:n,sourceVariantReference:s},o).then(function(S){this.fireElementModified({command:S});}.bind(this)).catch(function(m){throw D.createError("ControlVariant#switchVariant",m,"sap.ui.rta");});};c.prototype.renameVariant=function(e){var o=e[0];this.setVariantManagementControlOverlay(o);this.startEdit(o);};c.prototype.startEdit=function(v){var o=v.getElement();var e=v.getDesignTimeMetadata().getData().variantRenameDomRef;var g=o.getTitle();var p=g.getText();var h=R.startEdit.bind(this,{overlay:v,domRef:e,pluginMethodName:"plugin.ControlVariant.startEdit"});if(v._triggerDuplicate){var s=this._getVariantTitleForCopy(p,v.getVariantManagement(),this._getVariantModel(o).getData());o.getTitle().setText(s);if(v.hasStyleClass(R.errorStyleClass)){h();}else{v.attachEventOnce("geometryChanged",function(){h();},this);}}else{h();}};c.prototype.stopEdit=function(r){if(this._oEditedOverlay._triggerDuplicate){if(!this._oEditedOverlay.hasStyleClass(R.errorStyleClass)){delete this._oEditedOverlay._triggerDuplicate;}}R._stopEdit.call(this,r,"plugin.ControlVariant.stopEdit");};c.prototype._createDuplicateCommand=function(p){return this.getCommandFactory().getCommandFor(p.element,"duplicate",{sourceVariantReference:p.currentVariantReference,newVariantTitle:p.newVariantTitle},p.designTimeMetadata,p.variantManagementReference);};c.prototype._emitLabelChangeEvent=function(){var t=R._getCurrentEditableFieldText.call(this);var o=this._oEditedOverlay;var e=o.getDesignTimeMetadata();var r=o.getElement();var m=this._getVariantModel(r);var s;var v=o.getVariantManagement();var T=this.getOldValue()!==t;var n=T||o._triggerDuplicate;var i=n?m._getVariantTitleCount(t,v):0;var g=sap.ui.getCore().getLibraryResourceBundle("sap.ui.rta");var h=m.getCurrentVariantReference(v);o.removeStyleClass(R.errorStyleClass);if(t==='\xa0'){s="BLANK_ERROR_TEXT";}else if(i>0){s="DUPLICATE_ERROR_TEXT";}else if(n){return this._createSetTitleCommand({text:t,element:r,designTimeMetadata:e,variantManagementReference:v}).then(function(S){if(o._triggerDuplicate){return this._createDuplicateCommand({currentVariantReference:h,designTimeMetadata:e,variantManagementReference:v,element:r,newVariantTitle:this.getOldValue()}).then(function(k){return new C({commands:[k]});}).then(function(k){return T?k.addCommand(S):k;});}return S;}.bind(this)).then(function(k){this.fireElementModified({command:k});}.bind(this)).catch(function(k){throw D.createError("ControlVariant#_emitLabelChangeEvent",k,"sap.ui.rta");});}else{b.info("Control Variant title unchanged");return Promise.resolve();}if(s){var j=g.getText(s);this._prepareOverlayForValueState(o,j);o.addStyleClass(R.errorStyleClass);return U.showMessageBox("error",s,{titleKey:"BLANK_DUPLICATE_TITLE_TEXT"}).then(function(){return function(){this.startEdit(o);}.bind(this);}.bind(this));}};c.prototype._getVariantTitleForCopy=function(s,v,o){var r=sap.ui.getCore().getLibraryResourceBundle("sap.ui.fl");var e=r.getText("VARIANT_COPY_SINGLE_TEXT").replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&").replace("\\{0\\}","(.*)");var g=r.getText("VARIANT_COPY_MULTIPLE_TEXT").replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&").replace("\\{0\\}","(.*)").replace("\\{1\\}","([0-9]+)");var h=new RegExp(e+"+");var i=new RegExp(g);var t;var I=g.lastIndexOf("(.*)")>g.lastIndexOf("([0-9]+)")?1:2;var j=(I===1)?2:1;var T=0;if(i.test(s)){t=i.exec(s)[j];}else{t=h.test(s)?h.exec(s)[1]:s;}var k=[];o[v].variants.forEach(function(l){if(l.visible){k=i.test(l.title)?i.exec(l.title):h.exec(l.title);if(!k){return;}if(k.length===3&&t===k[j]&&T<=parseInt(k[I])){T=k[I]?(parseInt(k[I])+1):T;}else if(k.length===2&&t===k[1]){T=T===0?1:T;}}});return T>0?r.getText("VARIANT_COPY_MULTIPLE_TEXT",[t,T]):r.getText("VARIANT_COPY_SINGLE_TEXT",[t]);};c.prototype._createSetTitleCommand=function(p){this._$oEditableControlDomRef.text(p.text);return this.getCommandFactory().getCommandFor(p.element,"setTitle",{newText:p.text},p.designTimeMetadata,p.variantManagementReference).catch(function(m){b.error("Error during rename : ",m);});};c.prototype._prepareOverlayForValueState=function(o,v){o.getValueState=function(){return"Error";};o.getValueStateText=function(){return v;};o.getDomRefForValueStateMessage=function(){return this.$();};};c.prototype.configureVariants=function(e){var o=e[0];var v=o.getElement();var s=o.getVariantManagement();var m=this._getVariantModel(v);var g=o.getDesignTimeMetadata();m.manageVariants(v,s,this.getCommandFactory().getFlexSettings().layer,U.getRtaStyleClassName()).then(function(h){return this.getCommandFactory().getCommandFor(v,"configure",{control:v,changes:h},g,s);}.bind(this)).then(function(h){this.fireElementModified({command:h});}.bind(this)).catch(function(h){throw D.createError("ControlVariant#configureVariants",h,"sap.ui.rta");});};c.prototype.getMenuItems=function(e){var o=e[0];var m=[];if(this.isRenameAvailable(o)){m.push({id:"CTX_VARIANT_SET_TITLE",text:sap.ui.getCore().getLibraryResourceBundle('sap.ui.rta').getText('CTX_RENAME'),handler:this.renameVariant.bind(this),enabled:this.isRenameEnabled.bind(this),rank:210,icon:"sap-icon://edit"});}if(this.isVariantDuplicateAvailable(o)){m.push({id:"CTX_VARIANT_DUPLICATE",text:sap.ui.getCore().getLibraryResourceBundle('sap.ui.rta').getText('CTX_VARIANT_DUPLICATE'),handler:function(e){e[0]._triggerDuplicate=true;this.renameVariant(e);}.bind(this),enabled:this.isVariantDuplicateEnabled.bind(this),rank:220,icon:"sap-icon://duplicate"});}if(this.isVariantConfigureAvailable(o)){m.push({id:"CTX_VARIANT_MANAGE",text:sap.ui.getCore().getLibraryResourceBundle('sap.ui.rta').getText('CTX_VARIANT_MANAGE'),handler:this.configureVariants.bind(this),enabled:this.isVariantConfigureEnabled.bind(this),startSection:true,rank:230,icon:"sap-icon://action-settings"});}if(this.isVariantSwitchAvailable(o)){var g=this._getVariantModel(o.getElement());var s=o.getVariantManagement();var S=g.getData()[s].variants.reduce(function(r,v){if(v.visible){var h=g.getData()[s].currentVariant===v.key;var i={id:v.key,text:v.title,icon:h?"sap-icon://accept":"blank",enabled:!h};return r.concat(i);}return r;},[]);m.push({id:"CTX_VARIANT_SWITCH_SUBMENU",text:sap.ui.getCore().getLibraryResourceBundle('sap.ui.rta').getText('CTX_VARIANT_SWITCH'),handler:function(e,p){var h=p.eventItem.data();var t=e[0];var n=h.key;var i=g.getData()[s].currentVariant;return this.switchVariant(t,n,i);}.bind(this),enabled:this.isVariantSwitchEnabled.bind(this),submenu:S,rank:240,icon:"sap-icon://switch-views"});}return m;};return c;});
