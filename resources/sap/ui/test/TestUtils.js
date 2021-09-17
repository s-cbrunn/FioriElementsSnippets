/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.sjax","sap/base/Log","sap/base/util/merge","sap/base/util/UriParameters","sap/ui/core/Core","sap/ui/thirdparty/URI"],function(q,L,m,U,C,a){"use strict";var r=/\/\$batch($|\?)/,b=/(?:^|\r\n)Content-Id\s*:\s*(\S+)/i,c=/^(.*)?:\s*(.*)$/,j="application/json;charset=UTF-8;IEEE754Compatible=true",M={},s="\r\nContent-Type: application/http\r\n"+"Content-Transfer-Encoding: binary\r\n",d=/^Content-Type:\s*multipart\/mixed;\s*boundary=/i,u=U.fromQuery(window.location.search),A=u.get("autoRespondAfter"),R=u.get("realOData"),e=/^(\S+) (\S+)$/,f=/^(GET|DELETE|MERGE|PATCH|POST) (\S+) HTTP\/1\.1$/,D={},g=/^(OData-Version|DataServiceVersion)$/,p=R==="true"||R==="proxy",h=p||R==="direct",k=0,S=u.get("supportAssistant")==="true",T;if(h){document.title=document.title+" (real OData)";}function l(o,E,P){var i=QUnit.objectType(o),t=QUnit.objectType(E),N;if(i==="string"&&t==="regexp"){if(!E.test(o)){throw new Error(P+": actual value "+o+" does not match expected regular expression "+E);}return;}if(i!==t){throw new Error(P+": actual type "+i+" does not match expected type "+t);}if(i==="array"){if(o.length<E.length){throw new Error(P+": array length: "+o.length+" < "+E.length);}}if(i==="array"||i==="object"){for(N in E){l(o[N],E[N],P==="/"?P+N:P+"/"+N);}}else if(o!==E){throw new Error(P+": actual value "+o+" does not match expected value "+E);}}function n(o,E,i,t){try{l(o,E,"/");QUnit.assert.pushResult({result:t,actual:o,expected:E,message:i});}catch(v){QUnit.assert.pushResult({result:!t,actual:o,expected:E,message:(i||"")+" failed because of "+v.message});}}T={awaitRendering:function(){if(sap.ui.getCore().getUIDirty()){return new Promise(function(i){function o(){if(sap.ui.getCore().getUIDirty()){setTimeout(o,1);}else{i();}}o();});}},deepContains:function(o,E,i){n(o,E,i,true);},notDeepContains:function(o,E,i){n(o,E,i,false);},useFakeServer:function(o,B,F,i){var t,v;function w(Y,Z){var $=O(Y,Z.requestBody),_=K(Z);k+=1;Z.respond(200,q.extend({},_,{"Content-Type":"multipart/mixed;boundary="+$.boundary}),H($,_));}function x(Y){var Z={buildResponse:Y.buildResponse,code:Y.code||200,headers:Y.headers||{},ifMatch:Y.ifMatch};if(Y.source){Z.message=V(B+Y.source);Z.headers["Content-Type"]=Z.headers["Content-Type"]||z(Y.source);}else if(typeof Y.message==="object"){Z.headers["Content-Type"]=j;Z.message=JSON.stringify(Y.message);}else{Z.message=Y.message;}return Z;}function y(){var Y,Z,$={};for(Z in F){Y=F[Z];if(!Z.includes(" ")){Z="GET "+Z;}if(Array.isArray(Y)){$[Z]=Y.map(x);}else{$[Z]=[x(Y)];}}return $;}function z(Y){if(/\.xml$/.test(Y)){return"application/xml";}if(/\.json$/.test(Y)){return j;}return"application/x-octet-stream";}function E(Y,Z,$){L.error(Z.requestLine,$,"sap.ui.test.TestUtils");return{code:Y,headers:{"Content-Type":"text/plain"},message:$};}function G(Y){return Y.slice(0,Y.indexOf("\r\n"));}function H(Y,Z){var $=[""];Y.parts.forEach(function(_){$.push(_.boundary?"\r\nContent-Type: multipart/mixed;boundary="+_.boundary+"\r\n\r\n"+H(_,Z):I(_,Z));});$.push("--\r\n");return $.join("--"+Y.boundary);}function I(Y,Z){var $=q.extend({},Z,Y.headers);return s+(Y.contentId?"Content-ID: "+Y.contentId+"\r\n":"")+"\r\nHTTP/1.1 "+Y.code+" \r\n"+Object.keys($).map(function(_){return _+": "+$[_];}).join("\r\n")+"\r\n\r\n"+(Y.message||"")+"\r\n";}function J(Y,Z){var $,_,a1=Y+" "+Z;if(v[a1]){return{responses:v[a1]};}if(!t){return undefined;}$=[];_=t.filter(function(b1){var c1=a1.match(b1.regExp);if(c1){$.push(c1);}return c1;});if(_.length>1){L.warning("Multiple matches found for "+a1,undefined,"sap.ui.test.TestUtils");return undefined;}return _.length?{responses:_[0].response,match:$[0]}:undefined;}function K(Y){var Z,$={};for(Z in Y.requestHeaders){if(g.test(Z)){$[Z]=Y.requestHeaders[Z];}}return $;}function N(Y,Z){var $=J(Y.method,Y.url),_,a1=$&&$.responses;a1=(a1||[]).filter(function(_){if(typeof _.ifMatch==="function"){return _.ifMatch(Y);}return!_.ifMatch||_.ifMatch.test(Y.requestBody);});if(a1.length){_=a1[0];if(typeof _.buildResponse==="function"){_=m({},_);_.buildResponse($.match,_);}}else{switch(Y.method){case"HEAD":_={code:200};break;case"DELETE":case"MERGE":case"PATCH":_={code:204};break;case"POST":_={code:200,headers:{"Content-Type":j},message:Y.requestBody};break;}}if(_){L.info(Y.method+" "+Y.url,'{"If-Match":'+JSON.stringify(Y.requestHeaders["If-Match"])+'}',"sap.ui.test.TestUtils");}else{_=E(404,Y,"No mock data found");}_.headers=q.extend({},K(Y),_.headers);if(Z&&_.code<300){_.contentId=Z;}return _;}function O(Y,Z){var $;Z=Z.replace(/^\s+/,"");$=G(Z);return{boundary:G(Z).slice(2),parts:Z.split($).slice(1,-1).map(function(_){var a1,b1,c1,d1,e1,f1;_=_.slice(2);b1=G(_);if(d.test(b1)){d1=O(Y,_.slice(b1.length+4));a1=d1.parts.filter(function(g1){return g1.code>=300;});return a1.length?a1[0]:d1;}f1=_.indexOf("\r\n\r\n")+4;e1=P(Y,_.slice(f1));c1=b.exec(_.slice(0,f1));return N(e1,c1&&c1[1]);})};}function P(Y,Z){var $=Z.indexOf("\r\n\r\n"),_,a1,b1={requestHeaders:{}};b1.requestBody=Z.slice($+4,Z.length-2);Z=Z.slice(0,$);_=Z.split("\r\n");b1.requestLine=_.shift();a1=f.exec(b1.requestLine);if(a1){b1.method=a1[1];b1.url=Y+a1[2];_.forEach(function(c1){var a1=c.exec(c1);if(a1){b1.requestHeaders[a1[1]]=a1[2];}});}return b1;}function Q(Y){var Z=Y.url;if(r.test(Z)){w(Z.slice(0,Z.indexOf("/$batch")+1),Y);}else{W(Y);}}function V(Y){var Z=M[Y];if(!Z){q.ajax({async:false,url:Y,dataType:"text",success:function($){Z=$;}});if(!Z){throw new Error(Y+": resource not found");}M[Y]=Z;}return Z;}function W(Y){var Z=N(Y);k+=1;Y.respond(Z.code,Z.headers,Z.message);}function X(){var Y,Z;v=y();if(i){t=i.map(function($){return{regExp:$.regExp,response:Array.isArray($.response)?$.response.map(x):[x($.response)]};});}Z=sinon.fakeServer.create();o.add(Z);Z.autoRespond=true;if(A){Z.autoRespondAfter=parseInt(A);}Z.respondWith("GET",/./,W);Z.respondWith("DELETE",/./,W);Z.respondWith("HEAD",/./,W);Z.respondWith("PATCH",/./,W);Z.respondWith("MERGE",/./,W);Z.respondWith("POST",/./,Q);Y=Z.restore;Z.restore=function(){sinon.FakeXMLHttpRequest.filters=[];Y.apply(this,arguments);};sinon.xhr.supportsCORS=q.support.cors;sinon.FakeXMLHttpRequest.useFilters=true;sinon.FakeXMLHttpRequest.addFilter(function($,_){return $!=="DELETE"&&$!=="HEAD"&&$!=="MERGE"&&$!=="PATCH"&&$!=="POST"&&!J($,_);});}B=sap.ui.require.toUrl(B).replace(/(^|\/)resources\/(~[-a-zA-Z0-9_.]*~\/)?/,"$1test-resources/")+"/";X();},withNormalizedMessages:function(o){var t=sinon.sandbox.create();try{var v=sap.ui.getCore(),G=v.getLibraryResourceBundle;t.stub(v,"getLibraryResourceBundle").returns({getText:function(K,w){var x=K,y=G.call(v).getText(K),i;for(i=0;i<10;i+=1){if(y.indexOf("{"+i+"}")>=0){x+=" "+(i>=w.length?"{"+i+"}":w[i]);}}return x;}});o.apply(this);}finally{t.verifyAndRestore();}},isRealOData:function(){return h;},isSupportAssistant:function(){return S;},getRealOData:function(){return R?"&realOData="+R:"";},getRequestCount:function(){return k;},proxy:function(i){var P,Q;if(!p){return i;}Q=i.indexOf("?");P=sap.ui.require.toUrl("sap/ui").replace("resources/sap/ui","proxy");return new a(P+i,document.baseURI).pathname().toString()+(Q>=0?i.slice(Q):"");},resetRequestCount:function(){k=0;},retrieveData:function(K){var v=D[K];delete D[K];return v;},setData:function(K,v){D[K]=v;},setupODataV4Server:function(o,F,i,t,v){var w={};if(h){return;}if(!t){t="/";}else if(t.slice(-1)!=="/"){t+="/";}Object.keys(F).forEach(function(x){var y=e.exec(x),z,B;if(y){z=y[1]||"GET";B=y[2];}else{z="GET";B=x;}if(!B.startsWith("/")){B=t+B;}w[z+" "+B]=F[x];});T.useFakeServer(o,i||"sap/ui/core/qunit/odata/v4/data",w,v);}};return T;},true);
