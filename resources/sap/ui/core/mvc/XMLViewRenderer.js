/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./ViewRenderer','../RenderManager',"sap/ui/thirdparty/jquery"],function(V,R,q){"use strict";var P=R.RenderPrefixes.Dummy,a=R.RenderPrefixes.Invisible,b=R.RenderPrefixes.Temporary;var X={apiVersion:2};X.render=function(r,c){var p=c._aParsedContent;var $=c._$oldContent=R.findPreservedContent(c.getId());if($.length===0){var s=c.isSubView();if(!s){r.openStart("div",c);r.class("sapUiView");r.class("sapUiXMLView");V.addDisplayClass(r,c);if(!c.oAsyncState||!c.oAsyncState.suppressPreserve){r.attr("data-sap-ui-preserve",c.getId());}r.style("width",c.getWidth());r.style("height",c.getHeight());r.openEnd();}if(p){for(var i=0;i<p.length;i++){var v=p[i];if(Array.isArray(v)){r[v[0]].apply(r,v[1]);}else{r.renderControl(v);if(!v.bOutput){r.openStart("div",P+v.getId());r.class("sapUiHidden");r.openEnd();r.close("div");}}}}if(!s){r.close("div");}}else{r.renderControl(c.oAfterRenderingNotifier);r.openStart("div",b+c.getId());r.class("sapUiHidden");r.openEnd();for(var i=0;i<p.length;i++){var f=p[i];if(!Array.isArray(f)){r.renderControl(f);var F=f.getId(),d=q(document.getElementById(F));if(d.length==0){d=q(document.getElementById(a+F));}if(!R.isPreservedContent(d[0])){d.replaceWith('<div id="'+P+F+'" class="sapUiHidden"></div>');}}}r.close("div");}};return X;},true);