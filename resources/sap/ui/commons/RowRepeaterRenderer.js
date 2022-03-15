/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./Button','./Paginator','./Toolbar','./library'],function(B,P,T,l){"use strict";var R=l.RowRepeaterDesign;var a={};a.render=function(r,c){r.write("<div");r.writeControlData(c);r.addClass("sapUiRrDesign"+c.getDesign());r.writeClasses();r.write(">");if(c.getDesign()!==R.BareShell){this.renderHeader(r,c);}this.renderBody(r,c);if(c.getDesign()!==R.BareShell){this.renderFooter(r,c);}r.write("</div>");};a.renderHeader=function(r,c){this.renderPrimaryToolbar(r,c);if(c.getSorters().length>1&&c.isBound()){this.renderSecondaryToolbar(r,c);}};a.renderPrimaryToolbar=function(r,c){r.write("<div");r.addClass("sapUiRrPtb");r.writeClasses();r.write(">");if(c.getTitle()!==null){this.renderTitle(r,c);}this.renderFilterToolbar(r,c);this.renderController(r,c);r.write("</div>");};a.renderTitle=function(r,c){var t=c.getTitle();var s=t.getTooltip_AsString();if(t.getIcon()){r.write("<div");r.addClass("sapUiRrLogo");r.writeClasses();if(s!==undefined){r.writeAttributeEscaped("title",s);}r.write(">");if(t.getIcon()){r.write("<img");r.writeAttributeEscaped("src",t.getIcon());r.write(">");}r.write("</div>");}if(t.getText()){r.write("<div");r.addClass("sapUiRrTitle");r.writeClasses();r.writeAttribute("role","heading");r.write(">");r.writeEscaped(t.getText());r.write("</div>");}};a.renderFilterToolbar=function(r,c){var f=c.getFilters();if(f.length>0){r.write("<div");r.addClass("sapUiRrFilters");r.writeClasses();r.write(">");if(f.length>1&&c.isBound()){r.renderControl(c.getAggregation("filterToolbar"));}r.write("</div>");}};a.renderController=function(r,c){if(!c.bPagingMode){r.write("<div");r.addClass("sapUiRrCtrl");r.writeClasses();r.write(">");r.renderControl(c.getAggregation("headerShowMoreButton"));r.write("</div>");}};a.renderSecondaryToolbar=function(r,c){r.write("<div");r.addClass("sapUiRrStb");r.writeClasses();r.write(">");r.write("<div");r.addClass("sapUiRrSortBy");r.writeClasses();r.write(">");r.writeEscaped(c.oResourceBundle.getText("SORT_BY")+":");r.write("</div>");r.write("<div");r.addClass("sapUiRrSorters");r.writeClasses();r.write(">");r.renderControl(c.getAggregation("sorterToolbar"));r.write("</div>");r.write("</div>");};a.renderBody=function(r,c){var i=c.getId();var s=c.getShowMoreSteps();var C=c.getCurrentPage();var n=c.getNumberOfRows();var S=(C-1)*n;var b=c.getRows();var d=c._getRowCount();var m=d-S;var e=c._getRowCount()>n?n:m;var L=Math.ceil(d/n);var f;e=Math.min(e,m);if(s>0){S=0;}r.write("<div");r.writeAttribute("id",i+"-body");r.addClass("sapUiRrBody");r.writeClasses();r.write(">");r.write("<ul");r.writeAttribute("id",i+"-page_"+C);r.addClass("sapUiRrPage");r.writeClasses();r.write(">");if(b.length===0||L<C){r.write("<li");r.addClass("sapUiRrNoData");r.writeClasses();r.write(">");var N=c.getNoData();if(N){r.renderControl(N);}else{r.writeEscaped(c.oResourceBundle.getText("NO_DATA"));}r.write("</li>");}else{var g;if(c.getFixedRowHeight()!==""){g="height:"+c.getFixedRowHeight()+";overflow:hidden;";}if(c.getBinding("rows")){S=c._bSecondPage?n:0;}for(f=S;f<S+e;f++){r.write("<li");r.writeAttribute("id",i+"-row_"+f);if(g){r.writeAttribute("style",g);}r.addClass("sapUiRrRow");r.writeClasses();r.write(">");r.renderControl(b[f]);r.write("</li>");}}r.write("</ul>");r.write("</div>");};a.renderFooter=function(r,c){r.write("<div");r.addClass("sapUiRrFtr");r.writeClasses();r.write(">");if(c.bPagingMode){r.renderControl(c.getAggregation("footerPager"));}else{r.renderControl(c.getAggregation("footerShowMoreButton"));}r.write("</div>");};return a;},true);
