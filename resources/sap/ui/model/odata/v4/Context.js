/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./lib/_Helper","sap/base/Log","sap/ui/base/SyncPromise","sap/ui/model/Context"],function(_,L,S,B){"use strict";var c="sap.ui.model.odata.v4.Context",g=0,m,v=-9007199254740991;function f(o,p,e,b){var E,P=[o.fetchValue(p,null,b)],r=o.oModel.resolve(p,o);if(e){P.push(o.oModel.getMetaModel().fetchUI5Type(r));}return S.all(P).then(function(R){var t=R[1],V=R[0];if(V&&typeof V==="object"){E=new Error("Accessed value is not primitive: "+r);E.isNotPrimitive=true;throw E;}return e?t.formatValue(V,"string"):V;});}var C=B.extend("sap.ui.model.odata.v4.Context",{constructor:function(M,b,p,i,o,G){if(p[0]!=="/"){throw new Error("Not an absolute path: "+p);}if(p.endsWith("/")){throw new Error("Unsupported trailing slash: "+p);}B.call(this,M,p);this.oBinding=b;this.oCreatedPromise=o&&Promise.resolve(o).then(function(){});this.oSyncCreatePromise=o;this.iGeneration=G||0;this.iIndex=i;this.bKeepAlive=false;this.fnOnBeforeDestroy=undefined;}});C.prototype._delete=function(G,e){var t=this;if(this.isTransient()){return this.oBinding._delete(G,"n/a",this);}return this.fetchCanonicalPath().then(function(s){return t.oBinding._delete(G,s.slice(1),t,e);});};C.prototype.adjustPredicate=function(t,p,P){var T=this.sPath;this.sPath=T.replace(t,p);if(P){P(T,this.sPath);}this.oModel.getDependentBindings(this).forEach(function(d){d.adjustPredicate(t,p);});};C.prototype.checkUpdate=function(){return S.all(this.oModel.getDependentBindings(this).map(function(d){return d.checkUpdate();}));};C.prototype.collapse=function(){switch(this.getProperty("@$ui5.node.level")===0?undefined:this.isExpanded()){case true:this.oBinding.collapse(this);break;case false:throw new Error("Already collapsed: "+this);default:throw new Error("Not expandable: "+this);}};C.prototype.created=function(){return this.oCreatedPromise;};C.prototype.delete=function(G){var o,M=this.oModel,t=this;M.checkGroupId(G);this.oBinding.checkSuspended();if(this.isTransient()){G=G||"$direct";}else if(this.hasPendingChanges()){throw new Error("Cannot delete due to pending changes");}o=this.oBinding.lockGroup(G,true,true);return this._delete(o).then(function(){var r=t.sPath.slice(1);M.getAllBindings().forEach(function(b){b.removeCachesAndMessages(r,true);});}).catch(function(e){o.unlock(true);M.reportError("Failed to delete "+t,c,e);throw e;});};C.prototype.destroy=function(){var o=this.fnOnBeforeDestroy;if(o){this.fnOnBeforeDestroy=undefined;o();}this.oModel.getDependentBindings(this).forEach(function(d){d.setContext(undefined);});this.oBinding=undefined;this.oModel=undefined;B.prototype.destroy.call(this);};C.prototype.doSetProperty=function(p,V,G,s){var M=this.oModel.getMetaModel(),t=this;if(this.oModel.bAutoExpandSelect){p=M.getReducedPath(_.buildPath(this.sPath,p),this.oBinding.getBaseForPathReduction());}return this.withCache(function(o,a,b){return b.doSetProperty(a,V,G)||M.fetchUpdateData(p,t,!G).then(function(r){var e=_.getRelativePath(r.entityPath,b.oReturnValueContext?b.oReturnValueContext.getPath():b.getResolvedPath()),F=false;function d(E){t.oModel.reportError("Failed to update path "+t.oModel.resolve(p,t),c,E);h(false);}function h(j){if(F){b.firePatchCompleted(j);F=false;}}function i(){F=true;b.firePatchSent();}if(!G){return o.setProperty(r.propertyPath,V,e);}return o.update(G,r.propertyPath,V,s?undefined:d,r.editUrl,e,M.getUnitOrCurrencyPath(t.oModel.resolve(p,t)),b.isPatchWithoutSideEffects(),i).then(function(){h(true);},function(E){h(false);throw E;});});},p,false,true);};C.prototype.expand=function(){var t=this;switch(this.isExpanded()){case false:this.oBinding.expand(this).catch(function(e){t.oModel.reportError("Failed to expand "+t,c,e);});break;case true:throw new Error("Already expanded: "+this);default:throw new Error("Not expandable: "+this);}};C.prototype.fetchCanonicalPath=function(){return this.oModel.getMetaModel().fetchCanonicalPath(this);};C.prototype.fetchValue=function(p,l,b){if(this.iIndex===v){return S.resolve();}if(!p||p[0]!=="/"){p=_.buildPath(this.sPath,p);if(this.oModel.bAutoExpandSelect){p=this.oModel.getMetaModel().getReducedPath(p,this.oBinding.getBaseForPathReduction());}}return this.oBinding.fetchValue(p,l,b);};C.prototype.getBinding=function(){return this.oBinding;};C.prototype.getCanonicalPath=_.createGetMethod("fetchCanonicalPath",true);C.prototype.getGeneration=function(o){if(this.iGeneration||o){return this.iGeneration;}return this.oBinding.getGeneration();};C.prototype.getGroupId=function(){return this.oBinding.getGroupId();};C.prototype.getIndex=function(){if(this.oBinding.bCreatedAtEnd){if(this.iIndex<0){return this.oBinding.bLengthFinal?this.oBinding.iMaxLength-this.iIndex-1:-this.iIndex-1;}return this.iIndex;}return this.getModelIndex();};C.prototype.getModelIndex=function(){if(this.iIndex!==undefined&&this.oBinding.iCreatedContexts){return this.iIndex+this.oBinding.iCreatedContexts;}return this.iIndex;};C.prototype.getObject=function(p){return _.publicClone(this.getValue(p));};C.prototype.getProperty=function(p,e){var E,s;this.oBinding.checkSuspended();s=f(this,p,e,true);if(s.isRejected()){s.caught();E=s.getResult();if(E.isNotPrimitive){throw E;}else if(!E.$cached){L.warning(E.message,p,c);}}return s.isFulfilled()?s.getResult():undefined;};C.prototype.getQueryOptionsForPath=function(p){return this.oBinding.getQueryOptionsForPath(p);};C.prototype.getUpdateGroupId=function(){return this.oBinding.getUpdateGroupId();};C.prototype.getValue=function(p){var s,t=this;this.oBinding.checkSuspended();s=this.fetchValue(p,null,true).catch(function(e){if(!e.$cached){t.oModel.reportError("Unexpected error",c,e);}});if(s.isFulfilled()){return s.getResult();}};C.prototype.hasPendingChanges=function(){return this.isTransient()||this.oModel.getDependentBindings(this).some(function(d){return d.hasPendingChanges();})||this.oModel.withUnresolvedBindings("hasPendingChangesInCaches",this.sPath.slice(1));};C.prototype.isExpanded=function(){return this.getProperty("@$ui5.node.isExpanded");};C.prototype.isKeepAlive=function(){return this.bKeepAlive;};C.prototype.isTransient=function(){return this.oSyncCreatePromise&&this.oSyncCreatePromise.isPending();};C.prototype.patch=function(d){return this.withCache(function(o,p){o.patch(p,d);},"");};C.prototype.refresh=function(G,a){this.requestRefresh.apply(this,arguments).catch(this.oModel.getReporter());};C.prototype.refreshDependentBindings=function(r,G,b,k){return S.all(this.oModel.getDependentBindings(this).map(function(d){return d.refreshInternal(r,G,b,k);}));};C.prototype.requestCanonicalPath=_.createRequestMethod("fetchCanonicalPath");C.prototype.requestObject=function(p){this.oBinding.checkSuspended();return Promise.resolve(this.fetchValue(p)).then(_.publicClone);};C.prototype.requestProperty=function(p,e){var P=Array.isArray(p)?p:[p],t=this;this.oBinding.checkSuspended();return Promise.all(P.map(function(s){return t.oBinding.fetchIfChildCanUseCache(t,s,S.resolve({})).then(function(r){if(r){return f(t,r,e);}L.error("Not a valid property path: "+s,undefined,c);});})).then(function(V){return Array.isArray(p)?V:V[0];});};C.prototype.requestRefresh=function(G,a){var p;this.oModel.checkGroupId(G);this.oBinding.checkSuspended();if(this.hasPendingChanges()){throw new Error("Cannot refresh entity due to pending changes: "+this);}if(this.oBinding.refreshSingle){p=this.oBinding.refreshSingle(this,this.oBinding.lockGroup(G,true),a);}else{if(arguments.length>1){throw new Error("Unsupported parameter bAllowRemoval: "+a);}p=this.oBinding.refreshReturnValueContext(this,G)||this.oBinding.requestRefresh(G);}this.oModel.withUnresolvedBindings("removeCachesAndMessages",this.sPath.slice(1));return Promise.resolve(p).then(function(){});};C.prototype.requestSideEffects=function(p,G){var e,M=this.oModel.getMetaModel(),P=[],a=[],r,R,t=this;function i(s){if(!s){return false;}if(s==="*"){return true;}if(s.endsWith("/*")){s=s.slice(0,-2);}return!s.includes("*");}this.oBinding.checkSuspended();this.oModel.checkGroupId(G);if(this.isTransient()){throw new Error("Unsupported context: "+this);}if(!p||!p.length){throw new Error("Missing edm:(Navigation)PropertyPath expressions");}if(!this.oBinding.isResolved()){throw new Error("Cannot request side effects of unresolved binding's context: "+this);}e=M.getObject("/$EntityContainer");if(!e){throw new Error("Missing metadata");}e="/"+e+"/";p.map(function(b){if(b&&typeof b==="object"){if(i(b.$PropertyPath)){return b.$PropertyPath;}if(typeof b.$NavigationPropertyPath==="string"&&!b.$NavigationPropertyPath.includes("*")){return b.$NavigationPropertyPath;}}else if(typeof b==="string"&&(!b||i(b))){return b;}throw new Error("Not an edm:(Navigation)PropertyPath expression: "+JSON.stringify(b));}).forEach(function(s){if(s[0]==="/"){if(!s.startsWith(e)){throw new Error("Path must start with '"+e+"': "+s);}a.push(s.slice(e.length-1));}else{P.push(s);}});r=this.oBinding.getRootBinding();R=r.getResolvedPath();P=P.reduce(function(b,s){return b.concat(M.getAllPathReductions(_.buildPath(t.getPath(),s),R));},[]);P=_.filterPaths(a,P);G=G||this.getUpdateGroupId();return Promise.resolve(S.resolve(this.oModel.isAutoGroup(G)&&this.oModel.oRequestor.waitForRunningChangeRequests(G).then(function(){t.oModel.oRequestor.relocateAll("$parked."+G,G);})).then(function(){return S.all([t.oModel.requestSideEffects(G,a),t.requestSideEffectsInternal(P,G)]);})).then(function(){});};C.prototype.requestSideEffectsInternal=function(a,G){var t=this,b,o=t,d,O=[],p,P=[],s,e=[];if(!a.length){return undefined;}for(;;){b=o.getBinding();s=b.getPath();p=b.getContext();if(b.oCache&&(!d||b.oCache.hasChangeListeners())){d=o;}if(d&&s){break;}if(!b.getBoundContext){throw new Error("Not a context binding: "+b);}o=p;}b=d.getBinding();a.forEach(function(A){var r=_.getRelativePath(A,d.getPath());if(r===undefined){P.push(A);}else{O.push(r);}});if(P.length){e.push(b.getContext().requestSideEffectsInternal(P,G));}if(O.length&&b.oCache!==undefined){e.push(b.requestSideEffects(G,O,d));}return S.all(e);};C.prototype.resetKeepAlive=function(){this.bKeepAlive=false;};C.prototype.setKeepAlive=function(k,o,r){var M,t=this;if(this.isTransient()){throw new Error("Unsupported transient context "+this);}if(!_.getPrivateAnnotation(this.getValue(),"predicate")){throw new Error("No key predicate known at "+this);}this.oBinding.checkKeepAlive(this);if(k&&r){if(!this.oModel.bAutoExpandSelect){throw new Error("Missing parameter autoExpandSelect at model");}M=this.oModel.getMetaModel().getObject(_.getMetaPath(this.sPath)+"/@com.sap.vocabularies.Common.v1.Messages/$Path");if(!M){throw new Error("Missing @com.sap.vocabularies.Common.v1.Messages");}this.oBinding.fetchIfChildCanUseCache(this,M,{}).then(function(R){return t.fetchValue(R);}).catch(this.oModel.getReporter());}this.bKeepAlive=k;this.fnOnBeforeDestroy=k?o:undefined;};C.prototype.setProperty=function(p,V,G,r){var o=null,t=this;this.oBinding.checkSuspended();if(typeof V==="function"||(V&&typeof V==="object")){throw new Error("Not a primitive value");}if(G!==null){this.oModel.checkGroupId(G);o=this.oBinding.lockGroup(G,true,true);}return Promise.resolve(this.doSetProperty(p,V,o,!r)).catch(function(e){if(o){o.unlock(true);}t.oModel.reportError("Failed to update path "+t.oModel.resolve(p,t),c,e);throw e;});};C.prototype.toString=function(){var i="";if(this.iIndex!==undefined){i="["+this.iIndex+(this.isTransient()?"|transient":"")+"]";}return this.sPath+i;};C.prototype.withCache=function(p,P,s,w){if(this.iIndex===v){return S.resolve();}return this.oBinding.withCache(p,P[0]==="/"?P:_.buildPath(this.sPath,P),s,w);};m={create:function(M,b,p,i,o){return new C(M,b,p,i,o);},createNewContext:function(M,b,p){g+=1;return new C(M,b,p,undefined,undefined,g);}};Object.defineProperty(m,"VIRTUAL",{value:v});return m;},false);
