/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/base/util/defineLazyProperty","sap/ui/thirdparty/jquery"],function(L,d,q){"use strict";q.sap=q.sap||{};var s={"jQuery.sap.":{target:q.sap,stubs:{"jquery.sap.act":["act"],"jquery.sap.dom":["domById","byId","focus","pxToRem","remToPx","containsOrEquals","denormalizeScrollLeftRTL","denormalizeScrollBeginRTL","ownerWindow","scrollbarSize","syncStyleClass"],"jquery.sap.encoder":["encodeHTML","encodeXML","escapeHTML","encodeJS","escapeJS","encodeURL","encodeURLParameters","encodeCSS","clearUrlWhitelist","addUrlWhitelist","removeUrlWhitelist","getUrlWhitelist","validateUrl","_sanitizeHTML"],"jquery.sap.events":["PseudoEvents","ControlEvents","disableTouchToMouseHandling","touchEventMode","bindAnyEvent","unbindAnyEvent","checkMouseEnterOrLeave","isSpecialKey","handleF6GroupNavigation","_FASTNAVIGATIONKEY","_refreshMouseEventDelayedFlag","isMouseEventDelayed"],"jquery.sap.global":["Version","now","debug","setReboot","statistics","log","assert","factory","newObject","getter","getObject","setObject","measure","getModulePath","getResourcePath","registerModulePath","registerResourcePath","registerModuleShims","isDeclared","isResourceLoaded","getAllDeclaredModules","declare","require","preloadModules","registerPreloadedModules","unloadResources","getResourceName","loadResource","_loadJSResourceAsync","includeScript","includeStyleSheet","FrameOptions","globalEval"],"jquery.sap.history":["history"],"jquery.sap.keycodes":["KeyCodes"],"jquery.sap.mobile":["initMobile","setIcons","setMobileWebAppCapable"],"jquery.sap.properties":["properties"],"jquery.sap.resources":["resources"],"jquery.sap.script":["uid","hashCode","unique","equal","each","arraySymbolDiff","_createJSTokenizer","parseJS","extend","getUriParameters","delayedCall","clearDelayedCall","intervalCall","clearIntervalCall","forIn","arrayDiff"],"jquery.sap.sjax":["sjaxSettings","sjax","syncHead","syncGet","syncPost","syncGetText","syncGetJSON"],"jquery.sap.storage":["storage"],"jquery.sap.strings":["endsWith","endsWithIgnoreCase","startsWith","startsWithIgnoreCase","charToUpperCase","padLeft","padRight","camelCase","hyphen","escapeRegExp","formatMessage"],"jquery.sap.trace":["interaction","fesr","passport"],"jquery.sap.xml":["parseXML","serializeXML","isEqualNode","getParseError"]}},"jQuery.":{target:q,stubs:{"jquery.sap.mobile":["os","device"]}},"jQuery Plugin ":{target:q.fn,stubs:{"jquery.sap.ui":["root","uiarea","sapui"],"jquery.sap.dom":["outerHTML"],"sap/ui/dom/jquery/Aria":["addAriaLabelledBy","removeAriaLabelledBy","addAriaDescribedBy","removeAriaDescribedBy"],"sap/ui/dom/jquery/control":["control"],"sap/ui/dom/jquery/cursorPos":["cursorPos"],"sap/ui/dom/jquery/Focusable":["firstFocusableDomRef","lastFocusableDomRef"],"sap/ui/dom/jquery/getSelectedText":["getSelectedText"],"sap/ui/dom/jquery/hasTabIndex":["hasTabIndex"],"sap/ui/dom/jquery/parentByAttribute":["parentByAttribute"],"sap/ui/dom/jquery/rect":["rect"],"sap/ui/dom/jquery/rectContains":["rectContains"],"sap/ui/dom/jquery/scrollLeftRTL":["scrollLeftRTL"],"sap/ui/dom/jquery/scrollRightRTL":["scrollRightRTL"],"sap/ui/dom/jquery/selectText":["selectText"],"sap/ui/dom/jquery/zIndex":["zIndex"],"sap/ui/dom/jquery/Selection":["disableSelection","enableSelection"]}},"jQuery Selector :":{target:q.expr.pseudos,stubs:{"sap/ui/dom/jquery/Selectors":["focusable","sapTabbable","sapFocusable"]}}};function l(m,t,p,T){return function(){L.warning("Sync loading of module '"+m+"' due to usage of deprecated API '"+T+p+"'","jquery.sap.stubs",null,function(){return{type:"jquery.sap.stubs",name:T+p};});sap.ui.requireSync(m);return t[p];};}function a(t,T,m){if(!T){return;}Object.keys(m).forEach(function(M){var p=m[M];p.forEach(function(P){if(T&&!T[P]){d(T,P,l(M,T,P,t),"jquery.sap.stubs");}});});}L.debug("Applying lazy loading stubs for legacy APIs","jquery.sap.stubs");Object.keys(s).forEach(function(S){var o=s[S];a(S,o.target,o.stubs);});if(typeof window==="object"&&window["jquery.sap.stubs-test"]){window["jquery.sap.stubs-test"]=s;}return q;});
