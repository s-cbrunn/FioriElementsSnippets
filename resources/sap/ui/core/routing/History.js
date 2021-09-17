/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/core/library','./HashChanger',"sap/base/Log","sap/ui/thirdparty/URI","sap/ui/Device","sap/base/util/ObjectPath","sap/ui/thirdparty/hasher"],function(l,H,L,U,D,O,h){"use strict";var a=l.routing.HistoryDirection;var b="Direction_Unchanged";var c=function(o){this._iHistoryLength=window.history.length;this.aHistory=[];this._bIsInitial=true;if(c._bUsePushState&&!c.getInstance()){var s=window.history.state===null?{}:window.history.state;if(typeof s==="object"){var d=h.getHash();s.sap=s.sap?s.sap:{};if(s.sap.history&&Array.isArray(s.sap.history)&&s.sap.history[s.sap.history.length-1]===d){c._aStateHistory=s.sap.history;}else{c._aStateHistory.push(d);s.sap.history=c._aStateHistory;window.history.replaceState(s,window.document.title);}}else{L.debug("Unable to determine HistoryDirection as history.state is already set: "+window.history.state,"sap.ui.core.routing.History");}}if(!o){L.error("sap.ui.core.routing.History constructor was called and it did not get a hashChanger as parameter");}this._setHashChanger(o);this._reset();};c._aStateHistory=[];c._bUsePushState=!D.browser.msie&&(window.self===window.top);c.prototype.getHistoryStateOffset=function(){if(!c._bUsePushState){return undefined;}var s=O.get("history.state.sap.history");if(!Array.isArray(s)){return undefined;}return s.length-c._aStateHistory.length;};c.prototype.destroy=function(){this._unRegisterHashChanger();};c.prototype.getDirection=function(n){if(n!==undefined&&this._bIsInitial){return undefined;}if(n===undefined){return this._sCurrentDirection;}return this._getDirection(n);};c.prototype.getPreviousHash=function(){return this.aHistory[this.iHistoryPosition-1];};c.prototype._setHashChanger=function(o){if(this._oHashChanger){this._unRegisterHashChanger();}this._oHashChanger=o;this._mEventListeners={};o.getRelevantEventsInfo().forEach(function(e){var E=e.name,p=e.paramMapping||{},f=this._onHashChange.bind(this,p);this._mEventListeners[E]=f;this._oHashChanger.attachEvent(E,f,this);}.bind(this));this._oHashChanger.attachEvent("hashReplaced",this._hashReplaced,this);this._oHashChanger.attachEvent("hashSet",this._hashSet,this);};c.prototype._unRegisterHashChanger=function(){if(this._mEventListeners){var e=Object.keys(this._mEventListeners);e.forEach(function(E){this._oHashChanger.detachEvent(E,this._mEventListeners[E],this);}.bind(this));delete this._mEventListeners;}this._oHashChanger.detachEvent("hashReplaced",this._hashReplaced,this);this._oHashChanger.detachEvent("hashSet",this._hashSet,this);this._oHashChanger=null;};c.prototype._reset=function(){this.aHistory.length=0;this.iHistoryPosition=0;this._bUnknown=true;this.aHistory[0]=this._oHashChanger.getHash();};c.prototype._getDirection=function(n,d,C){if(C&&this._oNextHash&&this._oNextHash.sHash===n){return a.NewEntry;}if(d){return a.NewEntry;}if(this._bUnknown){return a.Unknown;}if(this.aHistory[this.iHistoryPosition+1]===n&&this.aHistory[this.iHistoryPosition-1]===n){return a.Unknown;}if(this.aHistory[this.iHistoryPosition-1]===n){return a.Backwards;}if(this.aHistory[this.iHistoryPosition+1]===n){return a.Forwards;}return a.Unknown;};c.prototype._getDirectionWithState=function(s){var S=window.history.state===null?{}:window.history.state,B,d;if(typeof S==="object"){if(S.sap===undefined){c._aStateHistory.push(s);S.sap={};S.sap.history=c._aStateHistory;history.replaceState(S,document.title);d=a.NewEntry;}else{B=S.sap.history.every(function(u,e){return u===c._aStateHistory[e];});if(B&&S.sap.history.length===c._aStateHistory.length){d=b;}else{d=B?a.Backwards:a.Forwards;c._aStateHistory=S.sap.history;}}}else{L.debug("Unable to determine HistoryDirection as history.state is already set: "+window.history.state,"sap.ui.core.routing.History");}return d;};c.prototype._onHashChange=function(p,e){var n=p.newHash||"newHash",o=p.oldHash||"oldHash",f=p.fullHash||"fullHash";this._hashChange(e.getParameter(n),e.getParameter(o),e.getParameter(f));};c.prototype._hashChange=function(n,o,f){var d=window.history.length,s;if(this._oNextHash&&this._oNextHash.bWasReplaced&&this._oNextHash.sHash===n){this.aHistory[this.iHistoryPosition]=n;if(f!==undefined&&c._bUsePushState&&this===c.getInstance()){c._aStateHistory[c._aStateHistory.length-1]=f;window.history.replaceState({sap:{history:c._aStateHistory}},window.document.title);}this._oNextHash=null;if(!this._bIsInitial){this._sCurrentDirection=a.Unknown;}return;}this._bIsInitial=false;if(f!==undefined&&c._bUsePushState&&this===c.getInstance()){s=this._getDirectionWithState(f);}if(s===b){return;}if(!s){s=this._getDirection(n,this._iHistoryLength<window.history.length,true);}this._sCurrentDirection=s;this._iHistoryLength=d;if(this._oNextHash){this._oNextHash=null;}if(s===a.Unknown){this._reset();return;}this._bUnknown=false;if(s===a.NewEntry){if(this.iHistoryPosition+1<this.aHistory.length){this.aHistory=this.aHistory.slice(0,this.iHistoryPosition+1);}this.aHistory.push(n);this.iHistoryPosition+=1;return;}if(s===a.Forwards){this.iHistoryPosition++;return;}if(s===a.Backwards){this.iHistoryPosition--;}};c.prototype._hashSet=function(e){this._hashChangedByApp(e.getParameter("sHash"),false);};c.prototype._hashReplaced=function(e){this._hashChangedByApp(e.getParameter("sHash"),true);};c.prototype._hashChangedByApp=function(n,w){this._oNextHash={sHash:n,bWasReplaced:w};};var i;c.getInstance=function(){return i;};i=new c(H.getInstance());return c;},true);
