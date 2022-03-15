/*
* ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
*/
sap.ui.define(['sap/base/util/array/diff','sap/base/util/deepEqual','sap/ui/mdc/condition/FilterOperatorUtil','sap/base/Log'],function(d,a,F,L){"use strict";var b={getArrayDeltaChanges:function(D){var e=D.existingState;var c=D.changedState;var C=D.control;var i=D.changeOperations.add;var r=D.changeOperations.remove;var m=D.changeOperations.move;var g=D.generator;var f=D.deltaAttributes||[];var s=function(o){var j="";f.forEach(function(A){j=j+o[A];});return j;};var R=d(e,c,s);var M=function(o,A){return A.filter(function(E){return E&&(E.name===o.name);})[0];};var h=[];var p=e.slice(0);R.forEach(function(o){if(o.type==="delete"&&p[o.index]===undefined){p.splice(o.index,1);return;}var P,E,l;if(o.type==="insert"){E=M(c[o.index],p);if(E){E.index=p.indexOf(E);p.splice(E.index,1,undefined);h.push(b.createAddRemoveChange(C,r,b._getChangeContent(E,f),g));}}P=o.type==="delete"?p[o.index]:c[o.index];P.index=o.index;if(o.type==="delete"){p.splice(P.index,1);}else{p.splice(P.index,0,P);}if(m){l=h.length;if(l){E=h[l-1];E=E?E.changeSpecificData.content:undefined;}if(E&&E.name===P.name&&o.index!=E.index){h.pop();h.push(b.createMoveChange(E.id,E.name,o.index,m,C,m!=="moveSort",g));return;}}h.push(b.createAddRemoveChange(C,o.type==="delete"?r:i,b._getChangeContent(P,f),g));});return h;},getPropertySetterChanges:function(D){var c=D.control;var e=D.existingState;var C=D.changedState;var o=D.operation;var s=D.deltaAttribute;var S=[];C.forEach(function(i){if(i.hasOwnProperty(s)){var E=e.find(function(f){return f.name==i.name;});var O=E&&E.hasOwnProperty(s)&&E[s];var n=i[s];var v=O!==n;if(v){S.push(this.createAddRemoveChange(c,o,{name:i.name,value:i[s]}));}}}.bind(this));return S;},_getChangeContent:function(p,D){var c={};if(p.index>=0){c.index=p.index;}D.forEach(function(A){if(p.hasOwnProperty(A)){c[A]=p[A];}});return c;},getConditionDeltaChanges:function(D){var c=[];var n=D.changedState;var p=D.existingState;var A=D.control;var P=D.propertyInfo;for(var f in n){var v=b._hasProperty(P,f);if(!v){L.warning("property '"+f+"' not supported");continue;}c=c.concat(b._diffConditionPath(f,n[f],p[f],A));}return c;},_hasProperty:function(p,n){return p.some(function(P){var v=P.name===n||n=="$search";v=v?v:P.path===n;return v;});},_diffConditionPath:function(f,o,O,c){var C,e=[];var g=o;var s=O?O:[];if(a(g,s)){return e;}var r=function(g,s){var R;do{R=false;for(var i=0;i<g.length;i++){var n=F.indexOfCondition(g[i],s);if(n>-1){g.splice(i,1);s.splice(n,1);R=true;break;}}}while(R);};r(g,s);if((g.length>0)||(s.length>0)){s.forEach(function(h){C=b.createConditionChange("removeCondition",c,f,h);if(C){e.push(C);}});g.forEach(function(h){C=b.createConditionChange("addCondition",c,f,h);if(C){e.push(C);}});}return e;},createAddRemoveChange:function(c,o,C){var A={selectorElement:c,changeSpecificData:{changeType:o,content:C}};return A;},createMoveChange:function(i,p,n,m,c,P){var M={selectorElement:c,changeSpecificData:{changeType:m,content:{id:i,name:p,index:n}}};if(!P){delete M.changeSpecificData.content.id;}return M;},createConditionChange:function(c,C,f,o){var e={selectorElement:C,changeSpecificData:{changeType:c,content:{name:f,condition:o}}};return e;},handleChanges:function(c,i,u){return new Promise(function(r,e){sap.ui.require(["sap/ui/fl/write/api/ControlPersonalizationWriteAPI"],function(C){C.add({changes:c,ignoreVariantManagement:i,useStaticArea:u}).then(function(D){r(D);},e);});});},saveChanges:function(c,D){return new Promise(function(r,e){sap.ui.require(["sap/ui/fl/write/api/ControlPersonalizationWriteAPI"],function(C){C.save({selector:c,changes:D}).then(r);});});},restore:function(p){return new Promise(function(r,c){sap.ui.require(["sap/ui/fl/write/api/ControlPersonalizationWriteAPI"],function(C){C.restore(p).then(function(){r();},c);});});},reset:function(p){return new Promise(function(r,c){sap.ui.require(["sap/ui/fl/write/api/ControlPersonalizationWriteAPI"],function(C){C.reset(p).then(function(){r();},c);});});}};return b;});
