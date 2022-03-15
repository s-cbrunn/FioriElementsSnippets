/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/assert","sap/base/Log","sap/base/util/deepExtend","sap/base/util/each","sap/base/util/includes","sap/base/util/isEmptyObject","sap/ui/model/ChangeReason","sap/ui/model/Context","sap/ui/model/Filter","sap/ui/model/FilterProcessor","sap/ui/model/FilterType","sap/ui/model/Sorter","sap/ui/model/SorterProcessor","sap/ui/model/TreeBinding","sap/ui/model/TreeBindingUtils","sap/ui/model/odata/CountMode","sap/ui/model/odata/ODataUtils","sap/ui/model/odata/OperationMode"],function(a,L,d,e,b,c,C,f,F,g,h,S,l,T,m,n,O,o){"use strict";var p=T.extend("sap.ui.model.odata.v2.ODataTreeBinding",{constructor:function(M,P,i,v,j,s){T.apply(this,arguments);this.mParameters=this.mParameters||j||{};this.sGroupId;this.sRefreshGroupId;this.oFinalLengths={};this.oLengths={};this.oKeys={};this.bNeedsUpdate=false;this._bRootMissing=false;this.bSkipDataEvents=false;if(s instanceof S){s=[s];}this.aSorters=s||[];this.sFilterParams="";this.mNormalizeCache={};if(v instanceof F){v=[v];}this.aApplicationFilters=v;this.oModel.checkFilterOperation(this.aApplicationFilters);this.mRequestHandles={};this.oRootContext=null;this.iNumberOfExpandedLevels=(j&&j.numberOfExpandedLevels)||0;this.iRootLevel=(j&&j.rootLevel)||0;this.sCountMode=(j&&j.countMode)||this.oModel.sDefaultCountMode;if(this.sCountMode==n.None){L.fatal("To use an ODataTreeBinding at least one CountMode must be supported by the service!");}if(j){this.sGroupId=j.groupId||j.batchGroupId;}this.bInitial=true;this._mLoadedSections={};this._iPageSize=0;this.sOperationMode=(j&&j.operationMode)||this.oModel.sDefaultOperationMode;if(this.sOperationMode===o.Default){this.sOperationMode=o.Server;}this.bClientOperation=false;switch(this.sOperationMode){case o.Server:this.bClientOperation=false;break;case o.Client:this.bClientOperation=true;break;case o.Auto:this.bClientOperation=false;break;}this.iThreshold=(j&&j.threshold)||0;this.bThresholdRejected=false;this.iTotalCollectionCount=null;this.bUseServersideApplicationFilters=(j&&j.useServersideApplicationFilters)||false;this.bUsePreliminaryContext=this.mParameters.usePreliminaryContext||M.bPreliminaryContext;this.oAllKeys=null;this.oAllLengths=null;this.oAllFinalLengths=null;}});p.DRILLSTATES={Collapsed:"collapsed",Expanded:"expanded",Leaf:"leaf"};p.prototype._getNodeFilterParams=function(P){var s=P.isRoot?this.oTreeProperties["hierarchy-node-for"]:this.oTreeProperties["hierarchy-parent-node-for"];var E=this._getEntityType();return O._createFilterParams(new F(s,"EQ",P.id),this.oModel.oMetadata,E);};p.prototype._getLevelFilterParams=function(s,i){var E=this._getEntityType();return O._createFilterParams(new F(this.oTreeProperties["hierarchy-level-for"],s,i),this.oModel.oMetadata,E);};p.prototype._loadSingleRootNodeByNavigationProperties=function(N,r){var t=this,G;if(this.mRequestHandles[r]){this.mRequestHandles[r].abort();}G=this.sRefreshGroupId?this.sRefreshGroupId:this.sGroupId;var A=this.getResolvedPath();if(A){this.mRequestHandles[r]=this.oModel.read(A,{groupId:G,success:function(D){var s=t._getNavPath(t.getPath());if(D){var E=D;var k=t.oModel._getKey(E);var i=t.oModel.getContext('/'+k);t.oRootContext=i;t._processODataObject(i.getObject(),N,s);}else{t._bRootMissing=true;}t.bNeedsUpdate=true;delete t.mRequestHandles[r];t.oModel.callAfterUpdate(function(){t.fireDataReceived({data:D});});},error:function(E){if(E&&E.statusCode!=0&&E.statusText!="abort"){t.bNeedsUpdate=true;t._bRootMissing=true;delete t.mRequestHandles[r];t.fireDataReceived();}}});}};p.prototype.getRootContexts=function(s,i,t){var N=null,r={numberOfExpandedLevels:this.iNumberOfExpandedLevels},R=[];if(this.isInitial()){return R;}s=s||0;i=i||this.oModel.sizeLimit;t=t||0;var j=""+N+"-"+s+"-"+this._iPageSize+"-"+t;if(this.bHasTreeAnnotations){this.bDisplayRootNode=true;R=this._getContextsForNodeId(null,s,i,t);}else{N=this.getResolvedPath();var I=this.oModel.isList(this.sPath,this.getContext());if(I){this.bDisplayRootNode=true;}if(this.bDisplayRootNode&&!I){if(this.oRootContext){return[this.oRootContext];}else if(this._bRootMissing){return[];}else{this._loadSingleRootNodeByNavigationProperties(N,j);}}else{r.navPath=this._getNavPath(this.getPath());if(!this.bDisplayRootNode){N+="/"+r.navPath;}R=this._getContextsForNodeId(N,s,i,t,r);}}return R;};p.prototype.getNodeContexts=function(i,s,j,t){var N,r={};if(this.isInitial()){return[];}if(this.bHasTreeAnnotations){N=this.oModel.getKey(i);r.level=parseInt(i.getProperty(this.oTreeProperties["hierarchy-level-for"]))+1;}else{var k=this._getNavPath(i.getPath());if(!k){return[];}N=this.oModel.resolve(k,i);r.navPath=this.oNavigationPaths[k];}return this._getContextsForNodeId(N,s,j,t,r);};p.prototype.hasChildren=function(i){if(this.bHasTreeAnnotations){if(!i){return false;}var D=i.getProperty(this.oTreeProperties["hierarchy-drill-state-for"]);var N=this.oModel.getKey(i);var j=this.oLengths[N];if(j===0&&this.oFinalLengths[N]){return false;}if(D==="expanded"||D==="collapsed"){return true;}else if(D==="leaf"){return false;}else{L.warning("The entity '"+i.getPath()+"' has not specified Drilldown State property value.");if(D===undefined||D===""){return true;}return false;}}else{if(!i){return this.oLengths[this.getPath()]>0;}var j=this.oLengths[i.getPath()+"/"+this._getNavPath(i.getPath())];return j!==0;}};p.prototype.getChildCount=function(i){if(this.bHasTreeAnnotations){var H;if(!i){H=null;}else{H=this.oModel.getKey(i);}return this.oLengths[H];}else{if(!i){if(!this.bDisplayRootNode){return this.oLengths[this.getPath()+"/"+this._getNavPath(this.getPath())];}else{return this.oLengths[this.getPath()];}}return this.oLengths[i.getPath()+"/"+this._getNavPath(i.getPath())];}};p.prototype._getContextsForNodeId=function(N,s,j,t,r){var k=[],K;if(this.sOperationMode==o.Auto){if(this.iTotalCollectionCount==null){if(!this.bCollectionCountRequested){this._getCountForCollection();this.bCollectionCountRequested=true;}return[];}}s=s||0;j=j||this.oModel.iSizeLimit;t=t||0;if(this.sOperationMode==o.Auto){if(this.iThreshold>=0){t=Math.max(this.iThreshold,t);}}if(!this._mLoadedSections[N]){this._mLoadedSections[N]=[];}if(this.oFinalLengths[N]&&this.oLengths[N]<s+j){j=Math.max(this.oLengths[N]-s,0);}var q=this;var u=function(s){for(var i=0;i<q._mLoadedSections[N].length;i++){var Q=q._mLoadedSections[N][i];if(s>=Q.startIndex&&s<Q.startIndex+Q.length){return true;}}};var M=[];var i=Math.max((s-t-this._iPageSize),0);if(this.oKeys[N]){var v=s+j+(t);if(this.oLengths[N]){v=Math.min(v,this.oLengths[N]);}for(i;i<v;i++){K=this.oKeys[N][i];if(!K){if(!this.bClientOperation&&!u(i)){M=m.mergeSections(M,{startIndex:i,length:1});}}if(i>=s&&i<s+j){if(K){k.push(this.oModel.getContext('/'+K));}else{k.push(undefined);}}}var B=Math.max((s-t-this._iPageSize),0);var E=s+j+(t);var w=M[0]&&M[0].startIndex===B&&M[0].startIndex+M[0].length===E;if(M.length>0&&!w){i=Math.max((M[0].startIndex-t-this._iPageSize),0);var x=M[0].startIndex;for(i;i<x;i++){var K=this.oKeys[N][i];if(!K){if(!u(i)){M=m.mergeSections(M,{startIndex:i,length:1});}}}i=M[M.length-1].startIndex+M[M.length-1].length;var y=i+t+this._iPageSize;if(this.oLengths[N]){y=Math.min(y,this.oLengths[N]);}for(i;i<y;i++){var K=this.oKeys[N][i];if(!K){if(!u(i)){M=m.mergeSections(M,{startIndex:i,length:1});}}}}}else{if(!u(s)){var z=s-i;M=m.mergeSections(M,{startIndex:i,length:j+z+t});}}if(this.oModel.getServiceMetadata()){if(M.length>0){var P=[];var A="";if(this.bHasTreeAnnotations){if(this.sOperationMode=="Server"||this.bUseServersideApplicationFilters){A=this.getFilterParams();}if(N){A=A?"%20and%20"+A:"";var D=this.oModel.getContext("/"+N);var G=D.getProperty(this.oTreeProperties["hierarchy-node-for"]);var H=this._getNodeFilterParams({id:G});P.push("$filter="+H+A);}else if(N==null){var I="";if(!this.bClientOperation||this.iRootLevel>0){var J=this.bClientOperation?"GE":"EQ";I=this._getLevelFilterParams(J,this.iRootLevel);}if(I||A){if(A&&I){A="%20and%20"+A;}P.push("$filter="+I+A);}}}else{A=this.getFilterParams();if(A){P.push("$filter="+A);}}if(this.sCustomParams){P.push(this.sCustomParams);}if(!this.bClientOperation){for(i=0;i<M.length;i++){var R=M[i];this._mLoadedSections[N]=m.mergeSections(this._mLoadedSections[N],{startIndex:R.startIndex,length:R.length});this._loadSubNodes(N,R.startIndex,R.length,0,P,r,R);}}else{if(!this.oAllKeys&&!this.mRequestHandles[p.REQUEST_KEY_CLIENT]){this._loadCompleteTreeWithAnnotations(P);}}}}return k;};p.prototype._getCountForCollection=function(){if(!this.bHasTreeAnnotations||this.sOperationMode!=o.Auto){L.error("The Count for the collection can only be retrieved with Hierarchy Annotations and in OperationMode.Auto.");return;}var P=[];function _(D){var q=D.__count?parseInt(D.__count):parseInt(D);this.iTotalCollectionCount=q;if(this.sOperationMode==o.Auto){if(this.iTotalCollectionCount<=this.iThreshold){this.bClientOperation=true;this.bThresholdRejected=false;}else{this.bClientOperation=false;this.bThresholdRejected=true;}this._fireChange({reason:C.Change});}}function i(E){if(E&&E.statusCode===0&&E.statusText==="abort"){return;}var q="Request for $count failed: "+E.message;if(E.response){q+=", "+E.response.statusCode+", "+E.response.statusText+", "+E.response.body;}L.warning(q);}var A=this.getResolvedPath();var s="";if(this.iRootLevel>0){s=this._getLevelFilterParams("GE",this.getRootLevel());}var j="";if(this.bUseServersideApplicationFilters){var j=this.getFilterParams();}if(s||j){if(j&&s){j="%20and%20"+j;}P.push("$filter="+s+j);}var k="";if(this.sCountMode==n.Request||this.sCountMode==n.Both){k="/$count";}else if(this.sCountMode==n.Inline||this.sCountMode==n.InlineRepeat){P.push("$top=0");P.push("$inlinecount=allpages");}if(A){this.oModel.read(A+k,{urlParameters:P,success:_.bind(this),error:i.bind(this),groupId:this.sRefreshGroupId?this.sRefreshGroupId:this.sGroupId});}};p.prototype._getCountForNodeId=function(N,s,i,t,P){var j=this,G;var k=[];function _(D){j.oFinalLengths[N]=true;j.oLengths[N]=parseInt(D);}function q(E){if(E&&E.statusCode===0&&E.statusText==="abort"){return;}var x="Request for $count failed: "+E.message;if(E.response){x+=", "+E.response.statusCode+", "+E.response.statusText+", "+E.response.body;}L.warning(x);}var A;var r=this.getFilterParams()||"";var u="";if(this.bHasTreeAnnotations){var v=this.oModel.getContext("/"+N);var H=v.getProperty(this.oTreeProperties["hierarchy-node-for"]);A=this.getResolvedPath();if(N!=null){u=this._getNodeFilterParams({id:H});}else{u=this._getLevelFilterParams("EQ",this.getRootLevel());}}else{A=N;}if(u||r){var w="";if(u&&r){w="%20and%20";}r="$filter="+r+w+u;k.push(r);}if(A){G=this.sRefreshGroupId?this.sRefreshGroupId:this.sGroupId;this.oModel.read(A+"/$count",{urlParameters:k,success:_,error:q,sorters:this.aSorters,groupId:G});}};p.prototype._getParentMap=function(D){var P={};for(var i=0;i<D.length;i++){var I=D[i][this.oTreeProperties["hierarchy-node-for"]];if(P[I]){L.warning("ODataTreeBinding: Duplicate key: "+I+"!");}P[I]=this.oModel._getKey(D[i]);}return P;};p.prototype._createKeyMap=function(D,s){if(D&&D.length>0){var P=this._getParentMap(D),k={};for(var i=s?1:0;i<D.length;i++){var j=D[i][this.oTreeProperties["hierarchy-parent-node-for"]],q=P[j];if(parseInt(D[i][this.oTreeProperties["hierarchy-level-for"]])===this.iRootLevel){q="null";}if(!k[q]){k[q]=[];}k[q].push(this.oModel._getKey(D[i]));}return k;}};p.prototype._importCompleteKeysHierarchy=function(k){var i,K;for(K in k){i=k[K].length||0;this.oKeys[K]=k[K];this.oLengths[K]=i;this.oFinalLengths[K]=true;this._mLoadedSections[K]=[{startIndex:0,length:i}];}};p.prototype._updateNodeKey=function(N,s){var i=this.oModel.getKey(N.context),P,j;if(parseInt(N.context.getProperty(this.oTreeProperties["hierarchy-level-for"]))===this.iRootLevel){P="null";}else{P=this.oModel.getKey(N.parent.context);}j=this.oKeys[P].indexOf(i);if(j!==-1){this.oKeys[P][j]=s;}else{this.oKeys[P].push(s);}};p.prototype._loadSubTree=function(N,P){return new Promise(function(r,i){var R,G,A;if(!this.bHasTreeAnnotations){i(new Error("_loadSubTree: doesn't support hierarchies without tree annotations"));return;}R="loadSubTree-"+P.join("-");if(this.mRequestHandles[R]){this.mRequestHandles[R].abort();}var s=function(D){if(D.results.length>0){var j=this.oModel.getKey(D.results[0]);this._updateNodeKey(N,j);var k=this._createKeyMap(D.results);this._importCompleteKeysHierarchy(k);}delete this.mRequestHandles[R];this.bNeedsUpdate=true;this.oModel.callAfterUpdate(function(){this.fireDataReceived({data:D});}.bind(this));r(D);}.bind(this);var E=function(j){delete this.mRequestHandles[R];if(j&&j.statusCode===0&&j.statusText==="abort"){return;}this.fireDataReceived();i();}.bind(this);if(!this.bSkipDataEvents){this.fireDataRequested();}this.bSkipDataEvents=false;A=this.getResolvedPath();if(A){G=this.sRefreshGroupId?this.sRefreshGroupId:this.sGroupId;this.mRequestHandles[R]=this.oModel.read(A,{urlParameters:P,success:s,error:E,sorters:this.aSorters,groupId:G});}}.bind(this));};p.prototype._loadSubNodes=function(N,s,j,t,P,k,r){var q=this,G,I=false;if((s||j)&&!this.bClientOperation){P.push("$skip="+s+"&$top="+(j+t));}if(!this.oFinalLengths[N]||this.sCountMode==n.InlineRepeat){if(this.sCountMode==n.Inline||this.sCountMode==n.InlineRepeat||this.sCountMode==n.Both){P.push("$inlinecount=allpages");I=true;}else if(this.sCountMode==n.Request){q._getCountForNodeId(N);}}var R=""+N+"-"+s+"-"+this._iPageSize+"-"+t;function u(D){if(D){q.oKeys[N]=q.oKeys[N]||[];if(I&&D.__count>=0){q.oLengths[N]=parseInt(D.__count);q.oFinalLengths[N]=true;}}if(Array.isArray(D.results)&&D.results.length>0){if(q.bHasTreeAnnotations){var v={};for(var i=0;i<D.results.length;i++){var w=D.results[i];if(i==0){v[N]=s;}else if(v[N]==undefined){v[N]=0;}q.oKeys[N][v[N]]=q.oModel._getKey(w);v[N]++;}}else{for(var i=0;i<D.results.length;i++){var w=D.results[i];var K=q.oModel._getKey(w);q._processODataObject(w,"/"+K,k.navPath);q.oKeys[N][i+s]=K;}}}else if(D&&!Array.isArray(D.results)){q.oKeys[null]=q.oModel._getKey(D);if(!q.bHasTreeAnnotations){q._processODataObject(D,N,k.navPath);}}delete q.mRequestHandles[R];q.bNeedsUpdate=true;q.oModel.callAfterUpdate(function(){q.fireDataReceived({data:D});});}function E(v){if(v&&v.statusCode===0&&v.statusText==="abort"){return;}q.fireDataReceived();delete q.mRequestHandles[R];if(r){var w=[];for(var i=0;i<q._mLoadedSections[N].length;i++){var x=q._mLoadedSections[N][i];if(r.startIndex>=x.startIndex&&r.startIndex+r.length<=x.startIndex+x.length){if(r.startIndex!==x.startIndex&&r.length!==x.length){w=m.mergeSections(w,{startIndex:x.startIndex,length:r.startIndex-x.startIndex});w=m.mergeSections(w,{startIndex:r.startIndex+r.length,length:(x.startIndex+x.length)-(r.startIndex+r.length)});}}else{w.push(x);}}q._mLoadedSections[N]=w;}}if(N!==undefined){if(!this.bSkipDataEvents){this.fireDataRequested();}this.bSkipDataEvents=false;var A;if(this.bHasTreeAnnotations){A=this.getResolvedPath();}else{A=N;}if(this.mRequestHandles[R]){this.mRequestHandles[R].abort();}if(A){G=this.sRefreshGroupId?this.sRefreshGroupId:this.sGroupId;this.mRequestHandles[R]=this.oModel.read(A,{urlParameters:P,success:u,error:E,sorters:this.aSorters,groupId:G});}}};p.REQUEST_KEY_CLIENT="_OPERATIONMODE_CLIENT_TREE_LOADING";p.prototype._loadCompleteTreeWithAnnotations=function(u){var t=this;var r=p.REQUEST_KEY_CLIENT;var s=function(D){if(D.results&&D.results.length>0){var P={};var j;for(var k=0;k<D.results.length;k++){j=D.results[k];var q=j[t.oTreeProperties["hierarchy-node-for"]];if(P[q]){L.warning("ODataTreeBinding - Duplicate data entry for key: "+q+"!");}P[q]=t.oModel._getKey(j);}for(var i=0;i<D.results.length;i++){j=D.results[i];var v=j[t.oTreeProperties["hierarchy-parent-node-for"]];var w=P[v];if(parseInt(j[t.oTreeProperties["hierarchy-level-for"]])===t.iRootLevel){w="null";}t.oKeys[w]=t.oKeys[w]||[];var K=t.oModel._getKey(j);t.oKeys[w].push(K);t.oLengths[w]=t.oLengths[w]||0;t.oLengths[w]++;t.oFinalLengths[w]=true;t._mLoadedSections[w]=t._mLoadedSections[w]||[];t._mLoadedSections[w][0]=t._mLoadedSections[w][0]||{startIndex:0,length:0};t._mLoadedSections[w][0].length++;}}else{t.oKeys["null"]=[];t.oLengths["null"]=0;t.oFinalLengths["null"]=true;}t.oAllKeys=d({},t.oKeys);t.oAllLengths=d({},t.oLengths);t.oAllFinalLengths=d({},t.oFinalLengths);delete t.mRequestHandles[r];t.bNeedsUpdate=true;if((t.aApplicationFilters&&t.aApplicationFilters.length>0)||(t.aFilters&&t.aFilters.length>0)){t._applyFilter();}if(t.aSorters&&t.aSorters.length>0){t._applySort();}t.oModel.callAfterUpdate(function(){t.fireDataReceived({data:D});});};var E=function(i){delete t.mRequestHandles[r];var j=i.statusCode==0;if(!j){t.oKeys={};t.oLengths={};t.oFinalLengths={};t.oAllKeys={};t.oAllLengths={};t.oAllFinalLengths={};t._fireChange({reason:C.Change});t.fireDataReceived();}};if(!this.bSkipDataEvents){this.fireDataRequested();}this.bSkipDataEvents=false;if(this.mRequestHandles[r]){this.mRequestHandles[r].abort();}var A=this.getResolvedPath();if(A){this.mRequestHandles[r]=this.oModel.read(A,{urlParameters:u,success:s,error:E,sorters:this.aSorters,groupId:this.sRefreshGroupId?this.sRefreshGroupId:this.sGroupId});}};p.prototype.resetData=function(v){var i,D=false;if(typeof v==="boolean"){D=v;}else{i=v;}if(i){var P=i.getPath();delete this.oKeys[P];delete this.oLengths[P];delete this.oFinalLengths[P];delete this._mLoadedSections[P];}else{this.oKeys={};this.bClientOperation=false;switch(this.sOperationMode){case o.Server:this.bClientOperation=false;break;case o.Client:this.bClientOperation=true;break;case o.Auto:this.bClientOperation=false;break;}this.bThresholdRejected=false;this.iTotalCollectionCount=null;this.bCollectionCountRequested=false;this.oAllKeys=null;this.oAllLengths=null;this.oAllFinalLengths=null;this.oLengths={};this.oFinalLengths={};this.oRootContext=null;this._bRootMissing=false;if(!D){this._abortPendingRequest();}this._mLoadedSections={};this._iPageSize=0;this.sFilterParams="";}};p.prototype.refresh=function(i,G){if(typeof i==="string"){G=i;}this.sRefreshGroupId=G;this._refresh(i);this.sRefreshGroupId=undefined;};p.prototype._refresh=function(i,j,E){var k=false;if(!i){if(E){var r=this.getResolvedPath();if(r){if(r.indexOf("?")!==-1){r=r.split("?")[0];}var q=this.oModel.oMetadata._getEntityTypeByPath(r);if(q&&(q.entityType in E)){k=true;}}}if(j&&!k){k=this._hasChangedEntity(j);}if(!j&&!E){k=true;}}if(i||k){this.resetData();this.bNeedsUpdate=false;this.bRefresh=true;this._fireRefresh({reason:C.Refresh});}};p.prototype._hasChangedEntity=function(i){var s,N;for(N in this.oKeys){for(s in i){if(b(this.oKeys[N],s)){return true;}}}return false;};p.prototype.filter=function(i,s,r){var j=false;s=s||h.Control;this.oModel.checkFilterOperation(i);if(s==h.Control&&(!this.bClientOperation||this.sOperationMode==o.Server)){L.warning("Filtering with ControlFilters is ONLY possible if the ODataTreeBinding is running in OperationMode.Client or "+"OperationMode.Auto, in case the given threshold is lower than the total number of tree nodes.");return;}if(!i){i=[];}if(i instanceof F){i=[i];}if(s===h.Control){this.aFilters=i;}else{this.aApplicationFilters=i;}if(!this.bInitial){if(this.bClientOperation&&(s===h.Control||(s===h.Application&&!this.bUseServersideApplicationFilters))){if(this.oAllKeys){this.oKeys=d({},this.oAllKeys);this.oLengths=d({},this.oAllLengths);this.oFinalLengths=d({},this.oAllFinalLengths);this._applyFilter();this._applySort();this._fireChange({reason:C.Filter});}else{this.sChangeReason=C.Filter;}}else{this.resetData();this.sChangeReason=C.Filter;this._fireRefresh({reason:this.sChangeReason});}j=true;}if(r){return j;}else{return this;}};p.prototype._applyFilter=function(){var t=this;var i;if(this.bUseServersideApplicationFilters){i=g.groupFilters(this.aFilters);}else{i=g.combineFilters(this.aFilters,this.aApplicationFilters);}var j=function(K){var q=g.apply([K],i,function(r,P){var s=t.oModel.getContext('/'+r);return t.oModel.getProperty(P,s);},t.mNormalizeCache);return q.length>0;};var k={};this._filterRecursive({id:"null"},k,j);this.oKeys=k;if(!this.oKeys["null"]){L.warning("Clientside filter did not match on any node!");}else{this.oLengths["null"]=this.oKeys["null"].length;this.oFinalLengths["null"]=true;}};p.prototype._filterRecursive=function(N,k,j){var q=this.oKeys[N.id];if(q){N.children=N.children||[];for(var i=0;i<q.length;i++){var r=this._filterRecursive({id:q[i]},k,j);if(r.isFiltered){k[N.id]=k[N.id]||[];k[N.id].push(r.id);N.children.push(r);}}if(N.children.length>0){N.isFiltered=true;}else{N.isFiltered=j(N.id);}if(N.isFiltered){this.oLengths[N.id]=N.children.length;this.oFinalLengths[N.id]=true;}return N;}else{N.isFiltered=j(N.id);return N;}};p.prototype.sort=function(s,r){var i=false;if(s instanceof S){s=[s];}this.aSorters=s||[];if(!this.bInitial){this._abortPendingRequest();if(this.bClientOperation){this.addSortComparators(s,this.oEntityType);if(this.oAllKeys){this._applySort();this._fireChange({reason:C.Sort});}else{this.sChangeReason=C.Sort;}}else{this.resetData(undefined,{reason:C.Sort});this.sChangeReason=C.Sort;this._fireRefresh({reason:this.sChangeReason});}i=true;}if(r){return i;}else{return this;}};p.prototype.addSortComparators=function(s,E){var P,t;if(!E){L.warning("Cannot determine sort comparators, as entitytype of the collection is unknown!");return;}e(s,function(i,j){if(!j.fnCompare){P=this.oModel.oMetadata._getPropertyMetadata(E,j.sPath);t=P&&P.type;a(P,"PropertyType for property "+j.sPath+" of EntityType "+E.name+" not found!");j.fnCompare=O.getComparator(t);}}.bind(this));};p.prototype._applySort=function(){var t=this,i;var G=function(k,P){i=t.oModel.getContext('/'+k);return t.oModel.getProperty(P,i);};for(var N in this.oKeys){l.apply(this.oKeys[N],this.aSorters,G);}};p.prototype.checkUpdate=function(j,k){var s=this.sChangeReason?this.sChangeReason:C.Change;var q=false;if(!j){if(this.bNeedsUpdate||!k){q=true;}else{e(this.oKeys,function(i,N){e(N,function(i,K){if(K in k){q=true;return false;}});if(q){return false;}});}}if(j||q){this.bNeedsUpdate=false;this._fireChange({reason:s});}this.sChangeReason=undefined;};p.prototype._getNavPath=function(P){var A=this.oModel.resolve(P,this.getContext());if(!A){return;}var i=A.split("/"),E=i[i.length-1],N;var s=E.split("(")[0];if(s&&this.oNavigationPaths[s]){N=this.oNavigationPaths[s];}return N;};p.prototype._processODataObject=function(i,P,N){var j=[],t=this;if(N&&N.indexOf("/")>-1){j=N.split("/");N=j[0];j.splice(0,1);}var r=this.oModel._getObject(P);if(Array.isArray(r)){this.oKeys[P]=r;this.oLengths[P]=r.length;this.oFinalLengths[P]=true;}else if(r){this.oLengths[P]=1;this.oFinalLengths[P]=true;}if(N&&i[N]){if(Array.isArray(r)){r.forEach(function(R){var i=t.getModel().getData("/"+R);t._processODataObject(i,"/"+R+"/"+N,j.join("/"));});}else if(typeof r==="object"){t._processODataObject(i,P+"/"+N,j.join("/"));}}};p.prototype._hasTreeAnnotations=function(){var M=this.oModel.oMetadata,A=this.getResolvedPath(),E,t=M.mNamespaces["sap"],i=this;this.oTreeProperties={"hierarchy-level-for":false,"hierarchy-parent-node-for":false,"hierarchy-node-for":false,"hierarchy-drill-state-for":false};var s=function(){var j=0;var k=0;e(i.oTreeProperties,function(P,q){k++;if(q){j+=1;}});if(j===k){return true;}else if(j>0&&j<k){L.warning("Incomplete hierarchy tree annotations. Please check your service metadata definition!");}return false;};if(this.mParameters&&this.mParameters.treeAnnotationProperties){this.oTreeProperties["hierarchy-level-for"]=this.mParameters.treeAnnotationProperties.hierarchyLevelFor;this.oTreeProperties["hierarchy-parent-node-for"]=this.mParameters.treeAnnotationProperties.hierarchyParentNodeFor;this.oTreeProperties["hierarchy-node-for"]=this.mParameters.treeAnnotationProperties.hierarchyNodeFor;this.oTreeProperties["hierarchy-drill-state-for"]=this.mParameters.treeAnnotationProperties.hierarchyDrillStateFor;return s();}if(A.indexOf("?")!==-1){A=A.split("?")[0];}E=M._getEntityTypeByPath(A);if(!E){L.fatal("EntityType for path "+A+" could not be found.");return false;}e(E.property,function(I,P){if(!P.extensions){return true;}e(P.extensions,function(I,j){var N=j.name;if(j.namespace===t&&N in i.oTreeProperties&&!i.oTreeProperties[N]){i.oTreeProperties[N]=P.name;}});});return s();};p.prototype.initialize=function(){if(this.oModel.oMetadata&&this.oModel.oMetadata.isLoaded()&&this.bInitial){if(this.isResolved()){this._initialize(this._fireRefresh.bind(this,{reason:C.Refresh}));}else{this._fireRefresh({reason:C.Refresh});}}return this;};p.prototype._initialize=function(i){this.bInitial=false;this.bHasTreeAnnotations=this._hasTreeAnnotations();this.oEntityType=this._getEntityType();this._processSelectParameters();this._applyAdapter(i);return this;};p.prototype.setContext=function(i){if(i&&i.isPreliminary()&&!this.bUsePreliminaryContext){return;}if(i&&i.isUpdated()&&this.bUsePreliminaryContext&&this.oContext===i){this._fireChange({reason:C.Context});return;}if(f.hasChanged(this.oContext,i)){this.oContext=i;if(!this.isRelative()){return;}if(this.getResolvedPath()){this.resetData();this._initialize(this._fireChange.bind(this,{reason:C.Context}));}else if(!c(this.oAllKeys)||!c(this.oKeys)||!c(this._aNodes)){this.resetData();this._fireChange({reason:C.Context});}}};p.prototype.applyAdapterInterface=function(){this.getContexts=this.getContexts||function(){return[];};this.getNodes=this.getNodes||function(){return[];};this.getLength=this.getLength||function(){return 0;};this.isLengthFinal=this.isLengthFinal||function(){return false;};this.getContextByIndex=this.getContextByIndex||function(){return;};this.attachSelectionChanged=this.attachSelectionChanged||function(D,i,j){this.attachEvent("selectionChanged",D,i,j);return this;};this.detachSelectionChanged=this.detachSelectionChanged||function(i,j){this.detachEvent("selectionChanged",i,j);return this;};this.fireSelectionChanged=this.fireSelectionChanged||function(P){this.fireEvent("selectionChanged",P);return this;};return this;};p.prototype._applyAdapter=function(k){var A,E,i,j,K,N,s="sap/ui/model/odata/ODataTreeBindingAdapter",M="hierarchy-node-descendant-count-for",P="hierarchy-preorder-rank-for",q="hierarchy-sibling-rank-for",t=this;if(!this.bHasTreeAnnotations&&!this.oNavigationPaths){L.error("Neither hierarchy annotations, "+"nor navigation properties are specified to build the tree.",this);return;}if(this.bHasTreeAnnotations){A=this.getResolvedPath();if(A.indexOf("?")!==-1){A=A.split("?")[0];}E=this.oModel.oMetadata._getEntityTypeByPath(A);e(E.property,function(I,r){if(!r.extensions){return true;}e(r.extensions,function(I,u){N=u.name;if(u.namespace===t.oModel.oMetadata.mNamespaces["sap"]&&(N==M||N==q||N==P)){t.oTreeProperties[N]=r.name;}});});this.oTreeProperties[M]=this.oTreeProperties[M]||(this.mParameters.treeAnnotationProperties&&this.mParameters.treeAnnotationProperties.hierarchyNodeDescendantCountFor);if(this.oTreeProperties[M]&&this.sOperationMode==o.Server){this.oTreeProperties[q]=this.oTreeProperties[q]||(this.mParameters.treeAnnotationProperties&&this.mParameters.treeAnnotationProperties.hierarchySiblingRankFor);this.oTreeProperties[P]=this.oTreeProperties[P]||(this.mParameters.treeAnnotationProperties&&this.mParameters.treeAnnotationProperties.hierarchyPreorderRankFor);if(this.mParameters.restoreTreeStateAfterChange){if(this.oTreeProperties[q]&&this.oTreeProperties[P]){this._bRestoreTreeStateAfterChange=true;this._aTreeKeyProperties=[];for(i=E.key.propertyRef.length-1;i>=0;i--){this._aTreeKeyProperties.push(E.key.propertyRef[i].name);}}else{L.warning("Tree state restoration not possible: Missing annotation "+"\"hierarchy-sibling-rank-for\" and/or "+"\"hierarchy-preorder-rank-for\"");this._bRestoreTreeStateAfterChange=false;}}else{this._bRestoreTreeStateAfterChange=false;}if(this.mParameters&&this.mParameters.select){if(this.mParameters.select.indexOf(this.oTreeProperties[M])===-1){this.mParameters.select+=","+this.oTreeProperties[M];}if(this._bRestoreTreeStateAfterChange){for(j=this._aTreeKeyProperties.length-1;j>=0;j--){K=this._aTreeKeyProperties[j];if(this.mParameters.select.indexOf(K)===-1){this.mParameters.select+=","+K;}}}this.sCustomParams=this.oModel.createCustomParams(this.mParameters);}s="sap/ui/model/odata/ODataTreeBindingFlat";}}sap.ui.require([s],function(r){r.apply(t);k();});};p.prototype._processSelectParameters=function(){if(this.mParameters){this.oNavigationPaths=this.mParameters.navigation;if(this.mParameters.select){var s=this.mParameters.select.split(",");var N=[];if(this.oNavigationPaths){e(this.oNavigationPaths,function(P,i){if(N.indexOf(i)==-1){N.push(i);}});}e(N,function(P,i){if(s.indexOf(i)==-1){s.push(i);}});if(this.bHasTreeAnnotations){e(this.oTreeProperties,function(A,t){if(t){if(s.indexOf(t)==-1){s.push(t);}}});}this.mParameters.select=s.join(",");}this.sCustomParams=this.oModel.createCustomParams(this.mParameters);}if(!this.bHasTreeAnnotations&&!this.oNavigationPaths){L.error("Neither navigation paths parameters, nor (complete/valid) tree hierarchy annotations where provided to the TreeBinding.");this.oNavigationPaths={};}};p.prototype.getTreeAnnotation=function(A){return this.bHasTreeAnnotations?this.oTreeProperties[A]:undefined;};p.prototype.getDownloadUrl=function(s){var P=[],i;if(s){P.push("$format="+encodeURIComponent(s));}if(this.aSorters&&this.aSorters.length>0){P.push(O.createSortParams(this.aSorters));}if(this.getFilterParams()){P.push("$filter="+this.getFilterParams());}if(this.sCustomParams){P.push(this.sCustomParams);}i=this.getResolvedPath();if(i){return this.oModel._createRequestUrl(i,null,P);}};p.prototype.setNumberOfExpandedLevels=function(i){i=i||0;if(i<0){L.warning("ODataTreeBinding: numberOfExpandedLevels was set to 0. Negative values are prohibited.");i=0;}this.iNumberOfExpandedLevels=i;this._fireChange();};p.prototype.getNumberOfExpandedLevels=function(){return this.iNumberOfExpandedLevels;};p.prototype.setRootLevel=function(r){r=parseInt(r||0);if(r<0){L.warning("ODataTreeBinding: rootLevels was set to 0. Negative values are prohibited.");r=0;}this.iRootLevel=r;this.refresh();};p.prototype.getRootLevel=function(){return parseInt(this.iRootLevel);};p.prototype._getEntityType=function(){var r=this.getResolvedPath();if(r){var E=this.oModel.oMetadata._getEntityTypeByPath(r);a(E,"EntityType for path "+r+" could not be found!");return E;}return undefined;};p.prototype.getFilterParams=function(){var G;if(this.aApplicationFilters){this.aApplicationFilters=Array.isArray(this.aApplicationFilters)?this.aApplicationFilters:[this.aApplicationFilters];if(this.aApplicationFilters.length>0&&!this.sFilterParams){G=g.groupFilters(this.aApplicationFilters);this.sFilterParams=O._createFilterParams(G,this.oModel.oMetadata,this.oEntityType);this.sFilterParams=this.sFilterParams?"("+this.sFilterParams+")":"";}}else{this.sFilterParams="";}return this.sFilterParams;};p.prototype._abortPendingRequest=function(){if(!c(this.mRequestHandles)){this.bSkipDataEvents=true;e(this.mRequestHandles,function(r,R){if(R){R.abort();}});this.mRequestHandles={};}};return p;});
