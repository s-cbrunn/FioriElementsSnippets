/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/core/Component","sap/ui/core/util/reflection/BaseTreeModifier","sap/ui/thirdparty/hasher","sap/base/Log","sap/base/util/UriParameters","sap/base/util/uid","sap/base/strings/formatMessage","sap/ui/base/ManagedObject","sap/ui/core/mvc/View","sap/ui/base/SyncPromise"],function(q,C,B,h,L,U,u,f,M,V,S){"use strict";function a(c){if(c.length>0&&c.indexOf(".Component")<0){c+=".Component";}return c;}var b={APP_ID_AT_DESIGN_TIME:"${pro"+"ject.art"+"ifactId}",VARIANT_MODEL_NAME:"$FlexVariants",formatAndLogMessage:function(l,m,v,c){var s=m.join(' ');s=f(s,v);L[l](s,c||"");},getXSRFTokenFromControl:function(c){var m;if(!c){return"";}if(c&&typeof c.getModel==="function"){m=c.getModel();return b._getXSRFTokenFromModel(m);}return"";},_getXSRFTokenFromModel:function(m){var H;if(!m){return"";}if(typeof m.getHeaders==="function"){H=m.getHeaders();if(H){return H["x-csrf-token"];}}return"";},getComponentClassName:function(c){var A;if(c){A=this.getAppComponentForControl(c);if(A){var v=this._getComponentStartUpParameter(A,"sap-app-id");if(v){return v;}if(A.getManifestEntry("sap.ui5")&&A.getManifestEntry("sap.ui5").appVariantId){return A.getManifestEntry("sap.ui5").appVariantId;}}}return b.getComponentName(A);},isVariantByStartupParameter:function(c){if(c){var A=this.getAppComponentForControl(c);if(A){return!!this._getComponentStartUpParameter(A,"sap-app-id");}}return false;},getAppComponentClassNameForComponent:function(c){return b.getComponentClassName(c);},getAppDescriptor:function(c){var m=null;var o=null;var d=null;if(c){o=this.getAppComponentForControl(c);if(o&&o.getMetadata){d=o.getMetadata();if(d&&d.getManifest){m=d.getManifest();}}}return m;},getSiteId:function(c){var s=null;var A=null;if(c){A=this.getAppComponentForControl(c);if(A){s=this._getComponentStartUpParameter(A,"hcpApplicationId");}}return s;},getSiteIdByComponentData:function(c){return this._getStartUpParameter(c,"hcpApplicationId");},isBinding:function(p){var i=false;if(p&&typeof p==="string"&&p.substring(0,1)==="{"&&p.slice(-1)==="}"){i=true;}return i;},isApplicationVariant:function(c){var F=b.getComponentClassName(c);var A=b.getAppComponentForControl(c);var s=b.getComponentName(A);return F!==s;},isChangeRelatedToVariants:function(c){return c.getFileType()==="ctrl_variant_change"||c.getFileType()==="ctrl_variant_management_change"||c.getFileType()==="ctrl_variant"||c.getVariantReference();},isChangeRelatedToCompVariant:function(F){return F.getFileType()==="variant"||!!F.getSelector().persistencyKey;},_getComponentStartUpParameter:function(c,p){var s=null;if(p){if(c&&c.getComponentData){s=this._getStartUpParameter(c.getComponentData(),p);}}return s;},_getStartUpParameter:function(c,p){if(c&&c.startupParameters&&p){if(Array.isArray(c.startupParameters[p])){return c.startupParameters[p][0];}}},getComponentName:function(c){var s="";if(c){s=c.getMetadata().getName();}return a(s);},_getComponent:function(c){var o;if(c){o=C.get(c);}return o;},_getComponentIdForControl:function(c){var s=b._getOwnerIdForControl(c);if(!s){if(c&&typeof c.getParent==="function"){var p=c.getParent();if(p){return b._getComponentIdForControl(p);}}}return s||"";},getComponentForControl:function(c){return b._getComponentForControl(c);},getAppComponentForControl:function(c){var o=c instanceof C?c:this._getComponentForControl(c);return this._getAppComponentForComponent(o);},getAppDescriptorComponentObjectForControl:function(c){var A=this.getAppComponentForControl(c);var m=A.getManifest();return{name:this.getAppIdFromManifest(m)};},_getComponentForControl:function(c){var o=null;var s=null;if(c){s=b._getComponentIdForControl(c);if(s){o=b._getComponent(s);}}return o;},_getAppComponentForComponent:function(c){var s=null;if(c&&c.getAppComponent&&c.getAppComponent()instanceof C){return c.getAppComponent();}if(c&&c.oComponentData&&c.oComponentData.appComponent){return c.oComponentData.appComponent;}if(c&&c.getManifestEntry){s=c.getManifestEntry("sap.app");}else{return c;}if(s&&s.type&&s.type!=="application"){if(c instanceof C){c=this._getComponentForControl(c);}return this.getAppComponentForControl(c);}return c;},getViewForControl:function(c){return b.getFirstAncestorOfControlWithControlType(c,sap.ui.core.mvc.View);},getFirstAncestorOfControlWithControlType:function(c,d){if(c instanceof d){return c;}if(c&&typeof c.getParent==="function"){c=c.getParent();return b.getFirstAncestorOfControlWithControlType(c,d);}},hasControlAncestorWithId:function(c,A){var o;if(c===A){return true;}o=sap.ui.getCore().byId(c);while(o){if(o.getId()===A){return true;}if(typeof o.getParent==="function"){o=o.getParent();}else{return false;}}return false;},_isView:function(c){return c instanceof V;},_getOwnerIdForControl:function(c){return C.getOwnerIdFor(c);},getClient:function(){var o;var c;o=this._getUriParameters();c=o.get("sap-client");return c||undefined;},_getUriParameters:function(){return U.fromQuery(window.location.search);},isHotfixMode:function(){var o;var i;o=this._getUriParameters();i=o.get("hotfix");return(i==="true");},convertBrowserLanguageToISO639_1:function(s){if(!s||typeof s!=="string"){return"";}var n=s.indexOf("-");if((n<0)&&(s.length<=2)){return s.toUpperCase();}if(n>0&&n<=2){return s.substring(0,n).toUpperCase();}return"";},getLrepUrl:function(){var F=sap.ui.getCore().getConfiguration().getFlexibilityServices();var l=F.find(function(s){return s.connector==="LrepConnector";});return l?l.url:"";},getCurrentLanguage:function(){var l=sap.ui.getCore().getConfiguration().getLanguage();return b.convertBrowserLanguageToISO639_1(l);},getControlType:function(c){var m;if(c&&typeof c.getMetadata==="function"){m=c.getMetadata();if(m&&typeof m.getElementName==="function"){return m.getElementName();}}},asciiToString:function(c){var d=c.split(",");var p="";q.each(d,function(i,e){p+=String.fromCharCode(e);});return p;},stringToAscii:function(s){var c="";for(var i=0;i<s.length;i++){c+=s.charCodeAt(i)+",";}c=c.substring(0,c.length-1);return c;},checkControlId:function(c,A){if(!A){c=c instanceof M?c:sap.ui.getCore().byId(c);A=b.getAppComponentForControl(c);}return B.checkControlId(c,A);},hasLocalIdSuffix:B.hasLocalIdSuffix,_getAllUrlParameters:function(){return window.location.search.substring(1);},getTechnicalParametersForComponent:function(c){return c&&c.getComponentData&&c.getComponentData()&&c.getComponentData().technicalParameters;},getParsedURLHash:function(){return b.ifUShellContainerThen(function(s){var p=s[0].parseShellHash(h.getHash());return p||{};},["URLParsing"])||{};},ifUShellContainerThen:function(c,s){var o=b.getUshellContainer();if(o){var d=s.map(function(e){return o.getService(e);});return c(d);}},isDebugEnabled:function(){var o=this._getUriParameters();var d=o.get("sap-ui-debug")||"";if(sap.ui.getCore().getConfiguration().getDebug()||d==="true"){return true;}var D=d.split(",");return D.indexOf("sap/ui/fl")!==-1||D.indexOf("sap/ui/fl/")!==-1;},getUrlParameter:function(p){return U.fromQuery(window.location.search).get(p);},getUshellContainer:function(){return sap.ushell&&sap.ushell.Container;},createDefaultFileName:function(n){var F=u().replace(/-/g,"_");if(n){F+='_'+n;}return F;},createNamespace:function(p,s){var r=p.reference.replace('.Component','');var n='apps/'+r+"/"+s+"/";return n;},buildLrepRootNamespace:function(s,c,p){var r="apps/";var e=new Error("Error in sap.ui.fl.Utils#buildLrepRootNamespace: ");if(!s){e.message+="for every scenario you need a base ID";throw e;}switch(c){case sap.ui.fl.Scenario.VersionedAppVariant:if(!p){e.message+="in a versioned app variant scenario you additionally need a project ID";throw e;}r+=s+"/appVariants/"+p+"/";break;case sap.ui.fl.Scenario.AppVariant:if(!p){e.message+="in an app variant scenario you additionally need a project ID";throw e;}r+=s+"/appVariants/"+p+"/";break;case sap.ui.fl.Scenario.AdaptationProject:if(!p){e.message+="in a adaptation project scenario you additionally need a project ID";throw e;}r+=s+"/adapt/"+p+"/";break;case sap.ui.fl.Scenario.FioriElementsFromScratch:case sap.ui.fl.Scenario.UiAdaptation:default:r+=s+"/";}return r;},_getComponentTypeFromManifest:function(m){return m&&m.getEntry&&m.getEntry("sap.app")&&m.getEntry("sap.app").type;},_getComponentTypeFromRawManifest:function(m){return m&&m["sap.app"]&&m["sap.app"].type;},isApplication:function(m,i){var c=i?b._getComponentTypeFromRawManifest(m):b._getComponentTypeFromManifest(m);return c==="application";},isApplicationComponent:function(c){return c instanceof C&&b.isApplication(c.getManifestObject());},isEmbeddedComponent:function(c){return c instanceof C&&b._getComponentTypeFromManifest(c.getManifestObject())==="component";},getFlexReference:function(m){if(m){if(m.getEntry("sap.ui5")){if(m.getEntry("sap.ui5").appVariantId){return m.getEntry("sap.ui5").appVariantId;}if(m.getEntry("sap.ui5").componentName){return a(m.getEntry("sap.ui5").componentName);}}if(m.getEntry("sap.app")&&m.getEntry("sap.app").id){return a(b.getAppIdFromManifest(m));}}L.warning("No Manifest received.");return"";},getAppIdFromManifest:function(m){if(m){var s=(m.getEntry)?m.getEntry("sap.app"):m["sap.app"];var A=s&&s.id;if(A===b.APP_ID_AT_DESIGN_TIME&&m.getComponentName){A=m.getComponentName();}return A;}throw new Error("No Manifest received, descriptor changes are not possible");},getODataServiceUriFromManifest:function(m){var s="";if(m){var o=(m.getEntry)?m.getEntry("sap.app"):m["sap.app"];if(o&&o.dataSources&&o.dataSources.mainService&&o.dataSources.mainService.uri){s=o.dataSources.mainService.uri;}}else{L.warning("No Manifest received.");}return s;},indexOfObject:function(A,o){var O=-1;A.some(function(c,i){var k;var K;if(!c){k=[];}else{k=Object.keys(c);}if(!o){K=[];}else{K=Object.keys(o);}var s=k.length===K.length;var d=s&&!k.some(function(e){return c[e]!==o[e];});if(d){O=i;}return d;});return O;},execPromiseQueueSequentially:function(p,t,A){if(p.length===0){if(A){return Promise.resolve();}return new b.FakePromise();}var P=p.shift();if(typeof P==="function"){try{var r=P();}catch(e){r=Promise.reject(e);}return r.then(function(){if(!A&&r instanceof Promise){A=true;}}).catch(function(e){var E="Error during execPromiseQueueSequentially processing occured";E+=e?": "+e.message:"";L.error(E);if(t){throw new Error(E);}}).then(function(){return this.execPromiseQueueSequentially(p,t,A);}.bind(this));}L.error("Changes could not be applied, promise not wrapped inside function.");return this.execPromiseQueueSequentially(p,t,A);},FakePromise:function(i,e,I){b.FakePromise.fakePromiseIdentifier="sap.ui.fl.Utils.FakePromise";this.vValue=i;this.vError=e;this.bContinueWithFakePromise=arguments.length<3||(I===b.FakePromise.fakePromiseIdentifier);var r=function(p,c){try{var R=c(p,b.FakePromise.fakePromiseIdentifier);if(S.isThenable(R)){return R;}return new b.FakePromise(R);}catch(E){var v=E;return new b.FakePromise(undefined,v);}};b.FakePromise.prototype.then=function(c){if(!this.bContinueWithFakePromise){return Promise.resolve(c(this.vValue));}if(!this.vError){return r(this.vValue,c);}return this;};b.FakePromise.prototype.catch=function(c){if(!this.bContinueWithFakePromise){return Promise.reject(c(this.vError));}if(this.vError){return r(this.vError,c);}return this;};if(this.vValue instanceof Promise||this.vValue instanceof b.FakePromise){return this.vValue;}},getChangeFromChangesMap:function(c,s){var r;Object.keys(c).forEach(function(d){c[d].some(function(o){if(o.getId()===s){r=o;return true;}});});return r;},requireAsync:function(m){return new Promise(function(r,R){sap.ui.require([m],function(o){r(o);},function(e){R(e);});});},normalizeReference:function(r){return r.replace(/(.Component)$/g,"");},handleUrlParameters:function(p,P,s){if(this.hasParameterAndValue(P,s)){if(p.startsWith("?")){p=p.substr(1,p.length);}var F=p.split("&").filter(function(c){return c!==P+"="+s;});p="";if(F.length>0){p="?"+F.toString();}}else{p+=(p.length>0?'&':'?')+P+"="+s;}return p;},hasParameterAndValue:function(p,P){return this.getParameter(p)===P;},getParameter:function(p){var o=this.getUshellContainer();if(o){var P=this.getParsedURLHash();return P.params&&P.params[p]&&P.params[p][0];}var c=U.fromQuery(document.location.search);if(!c){return false;}return c.get(p);}};return b;},true);
