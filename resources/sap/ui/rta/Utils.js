/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/fl/Utils","sap/ui/fl/Layer","sap/ui/fl/LayerUtils","sap/ui/fl/registry/Settings","sap/ui/dt/OverlayUtil","sap/ui/dt/DOMUtil","sap/m/MessageBox","sap/ui/rta/util/BindingsExtractor","sap/base/Log","sap/base/util/UriParameters","sap/base/util/restricted/_omit","sap/ui/model/json/JSONModel"],function(q,F,L,a,S,O,D,M,B,b,U,_,J){"use strict";var c={};c.RESOLVED_PROMISE=Promise.resolve(true);c._sFocusableOverlayClass=".sapUiDtOverlaySelectable";c._sRtaStyleClassName='';c.getRtaStyleClassName=function(){return c._sRtaStyleClassName;};c.setRtaStyleClassName=function(l){if(l===L.USER){c._sRtaStyleClassName="";}else if(a.getLayerIndex(l)>-1){c._sRtaStyleClassName="sapUiRTABorder";}};c.isExtensibilityEnabledInSystem=function(C){var s=F.getComponentClassName(C);if(!s||s===""){return Promise.resolve(false);}return S.getInstance(s).then(function(o){if(o.isModelS){return o.isModelS();}return false;});};c.isServiceUpToDate=function(C){return this.isExtensibilityEnabledInSystem(C).then(function(e){if(e){return new Promise(function(r,R){sap.ui.require(["sap/ui/fl/fieldExt/Access"],function(A){var o=C.getModel();if(o){var s=A.isServiceOutdated(o.sServiceUrl);if(s){A.setServiceValid(o.sServiceUrl);sap.ui.getCore().getEventBus().publish("sap.ui.core.UnrecoverableClientStateCorruption","RequestReload",{});return R();}}return r();});});}});};function g(o,p){return o.oMetadata&&o.oMetadata._getEntityTypeByPath(p);}function d(e,o){o||(o=e.getModel());var f=e.getBindingContext();if(f){return g(o,f.getPath())||{};}return{};}c.isCustomFieldAvailable=function(C){return this.isExtensibilityEnabledInSystem(C).then(function(s){if(!s||!C.getModel()){return false;}return new Promise(function(r,R){sap.ui.require(["sap/ui/fl/fieldExt/Access"],function(A){var e=C.getModel().sServiceUrl;var E=d(C).name;var $;try{$=A.getBusinessContexts(e,E);}catch(o){b.error("exception occured in sap.ui.fl.fieldExt.Access.getBusinessContexts",o);r(false);}return Promise.resolve($).then(function(f){if(f&&Array.isArray(f.BusinessContexts)&&f.BusinessContexts.length>0){f.EntityType=E;return r(f);}return r(false);}).catch(function(o){if(o){if(Array.isArray(o.errorMessages)){for(var i=0;i<o.errorMessages.length;i++){b.error(o.errorMessages[i].text);}}}return r(false);});},R);});});};c.openRemoveConfirmationDialog=function(e,t){var T=sap.ui.getCore().getLibraryResourceBundle("sap.ui.rta");var s;return new Promise(function(r){s=T.getText("CTX_REMOVE_TITLE");var f={messageText:t,titleText:s,icon:"sap-icon://question-mark",removeText:T.getText("BTN_FREP_REMOVE"),cancelText:T.getText("BTN_FREP_CANCEL")};var o=new J();o.setData(f);var h;var C=function(){if(h){h.close();h.destroy();h=null;}};var i={removeField:function(){C();r(true);},closeDialog:function(){C();r(false);}};if(!h){h=sap.ui.xmlfragment("sap.ui.rta.view.RemoveElementDialog",i);h.setModel(o);}h.addStyleClass(c.getRtaStyleClassName());h.open();});};c.isOverlaySelectable=function(o){return o.isSelectable()&&D.isVisible(o.getDomRef());};c.getPropertyValue=function(e,p){var o=e.getMetadata().getPropertyLikeSetting(p);var P=o._sGetter;return e[P]();};c.getOverlayInstanceForDom=function(o){var i=q(o).attr("id");if(i){return sap.ui.getCore().byId(i);}};c.getFocusedOverlay=function(){if(document.activeElement){var e=sap.ui.getCore().byId(document.activeElement.id);if(e instanceof sap.ui.dt.ElementOverlay){return e;}}};c.getFocusableParentOverlay=function(o){if(!o){return undefined;}var f=o.getParentElementOverlay();while(f&&!f.getSelectable()){f=f.getParentElementOverlay();}return f;};c.getFirstFocusableDescendantOverlay=function(o){return O.getFirstDescendantByCondition(o,this.isOverlaySelectable);};c.getLastFocusableDescendantOverlay=function(o){return O.getLastDescendantByCondition(o,this.isOverlaySelectable);};c.getNextFocusableSiblingOverlay=function(o){var N=true;var n=O.getNextSiblingOverlay(o);while(n&&!this.isOverlaySelectable(n)){n=O.getNextSiblingOverlay(n);}if(!n){n=this._findSiblingOverlay(o,N);}return n;};c.getPreviousFocusableSiblingOverlay=function(o){var P=false;var p=O.getPreviousSiblingOverlay(o);while(p&&!this.isOverlaySelectable(p)){p=O.getPreviousSiblingOverlay(p);}if(!p){p=this._findSiblingOverlay(o,P);}return p;};c._findSiblingOverlay=function(o,n){var p=o.getParentElementOverlay();if(p){var s=n?O.getNextSiblingOverlay(p):O.getPreviousSiblingOverlay(p);if(!s){return this._findSiblingOverlay(p,n);}var e=n?this.getFirstFocusableDescendantOverlay(s):this.getLastFocusableDescendantOverlay(s);return e;}return undefined;};c.getIndex=function(p,C,A,G){var i;if(G&&typeof G==="function"){i=G(p,C);}else{var o=p.getMetadata();var e=o.getAggregation(A);var s=e._sGetter;var f=p[s]();if(Array.isArray(f)&&C){i=f.indexOf(C)+1;}else{i=0;}}return i;};c.createFieldLabelId=function(p,e,s){return(p.getId()+"_"+e+"_"+s).replace("/","_");};c.openNewWindow=function(u){window.open(u,"_blank","noopener noreferrer");};c.getElementBindingPaths=function(e){var p={};if(e.mBindingInfos){for(var i in e.mBindingInfos){var P=e.mBindingInfos[i].parts[0].path?e.mBindingInfos[i].parts[0].path:"";P=P.split("/")[P.split("/").length-1];p[P]={valueProperty:i};}}return p;};c.isOriginalFioriToolbarAccessible=function(){var r=c.getFiori2Renderer();return r&&r.getRootControl&&r.getRootControl().getOUnifiedShell().getHeader();};c.getFiori2Renderer=function(){var C=F.getUshellContainer()||{};return typeof C.getRenderer==="function"?C.getRenderer("fiori2"):undefined;};c.extendWith=function(e,s,C){if(!(typeof C==="function")){throw new Error('In order to use extendWith() utility function fnCustomizer should be provided!');}for(var f in s){if(s.hasOwnProperty(f)){if(C(e[f],s[f],f,e,s)){e[f]=s[f];}}}};c.isElementInViewport=function(o){if(o instanceof q){o=o.get(0);}var r=o.getBoundingClientRect();return(r.top>=0&&r.left>=0&&r.bottom<=(window.innerHeight||document.documentElement.clientHeight)&&r.right<=(window.innerWidth||document.documentElement.clientWidth));};c.showMessageBox=function(s,e,p){return sap.ui.getCore().getLibraryResourceBundle("sap.ui.rta",true).then(function(r){p=p||{};var f=r.getText(e,p.error?[p.error.userMessage||p.error.message||p.error]:undefined);var t=r.getText(p.titleKey);var o=_(p,["titleKey","error"]);o.title=t;o.styleClass=c.getRtaStyleClassName();return m(s,f,o);});};function m(s,e,o){return new Promise(function(r){o.onClose=r;M[s](e,o);});}c.checkSourceTargetBindingCompatibility=function(s,t,o){o=o||s.getModel();var e=B.collectBindingPaths(s,o);var f;var T;if(e.bindingPaths.length===0){return true;}f=B.getBindingContextPath(s);T=B.getBindingContextPath(t);if(f===T){return true;}return false;};c.doIfAllControlsAreAvailable=function(C,f){if(C.every(function(o){return o&&!o._bIsBeingDestroyed;})){return f();}};c.buildHashMapFromArray=function(A,k,v){return A.reduce(function(e,i){e[i[k]]=i[v];return e;},{});};return c;},true);
