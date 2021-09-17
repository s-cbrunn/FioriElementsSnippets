/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/commons/ListBox','sap/ui/core/Control','./library','./FacetFilterListRenderer','sap/ui/core/ListItem'],function(L,C,l,F,a){"use strict";var b=C.extend("sap.ui.ux3.FacetFilterList",{metadata:{library:"sap.ui.ux3",properties:{title:{type:"string",group:"Misc",defaultValue:null},multiSelect:{type:"boolean",group:"Behavior",defaultValue:true},displaySecondaryValues:{type:"boolean",group:"Misc",defaultValue:false},selectedKeys:{type:"string[]",group:"Misc",defaultValue:null},showCounter:{type:"boolean",group:"Behavior",defaultValue:true}},aggregations:{items:{type:"sap.ui.core.ListItem",multiple:true,singularName:"item"},controls:{type:"sap.ui.commons.ListBox",multiple:true,singularName:"control",visibility:"hidden"}},events:{select:{parameters:{id:{type:"string"},selectedIndices:{type:"int[]"},selectedItems:{type:"sap.ui.core.ListItem[]"},all:{type:"boolean"}}}}}});b.prototype.init=function(){this._oResBundle=sap.ui.getCore().getLibraryResourceBundle("sap.ui.ux3");this._oListBox=new L(this.getId()+"-lb");this._oListBox.setScrollTop(0);this._oListBox.setValueTextAlign("Begin");this._oListBox.setDisplaySecondaryValues(this.getDisplaySecondaryValues());this._oListBox.setDisplayIcons(false);this._oListBox.setEditable(true);this._oListBox.setEnabled(true);this._oListBox.setVisible(true);this._oListBox.setAllowMultiSelect(this.getMultiSelect());this._oListBox.addAriaLabelledBy(this.getId()+"-head-txt");var t=this;this._oListBox.attachSelect(function(e){t.onSelect(t,e);});this.addAggregation("controls",this._oListBox);this._oItemAll=new a({text:this._oResBundle.getText("FACETFILTER_ALL",[0]),key:"sapUiFacetFilter_ALL"});this._oListBox.addItem(this._oItemAll);};b.prototype.setMultiSelect=function(m){this._oListBox.setAllowMultiSelect(m);this.setProperty("multiSelect",m,true);return this;};b.prototype.setDisplaySecondaryValues=function(d){this._oListBox.setDisplaySecondaryValues(d);this.setProperty("displaySecondaryValues",d,true);return this;};b.prototype.addItem=function(i){this._oListBox.addItem(i);if(!i.getKey()||i.getKey().trim()==""){i.setKey("generatedkey"+this.indexOfItem(i));}this.updateText4All();return this;};b.prototype.insertItem=function(i,I){this._oListBox.insertItem(i,I+1);if(!i.getKey()||i.getKey().trim()==""){i.setKey("generatedkey"+this.indexOfItem(i));}this.updateText4All();return this;};b.prototype.removeItem=function(i){var r=this._oListBox.removeItem(i);this.updateText4All();return r;};b.prototype.removeAllItems=function(){this._oListBox.removeAllItems();this._oListBox.addItem(this._oItemAll);this.updateText4All();};b.prototype.destroyItems=function(){this._oListBox.removeItem(this._oItemAll);this._oListBox.destroyItems();this._oListBox.addItem(this._oItemAll);this.updateText4All();return this;};b.prototype.indexOfItem=function(i){var I=this._oListBox.indexOfItem(i);if(I>-1){I=I-1;}return I;};b.prototype.getItems=function(){var c=this._oListBox.getItems();var I=[];for(var i=1;i<c.length;i++){I.push(c[i]);}return I;};b.prototype.setSelectedKeys=function(s){this.setProperty("selectedKeys",s);this.invalidate();return this;};b.prototype.setShowCounter=function(s){this.setProperty("showCounter",s);this.updateText4All();return this;};b.prototype.updateText4All=function(){if(this.getShowCounter()){this._oItemAll.setText(this._oResBundle.getText("FACETFILTER_ALL",[this._oListBox.getItems().length-1]));}else{this._oItemAll.setText(this._oResBundle.getText("FACETFILTER_NO_COUNT"));}};b.prototype.onBeforeRendering=function(){if(!this.bFullHeight){this._oListBox.setVisibleItems(5);}var k=this.getSelectedKeys();if(k&&k.length>0){this._oListBox.setSelectedKeys(k);this._bAllOnly=false;}else{this._oListBox.setSelectedKeys(["sapUiFacetFilter_ALL"]);this._bAllOnly=true;}};b.prototype.updateItems=function(){this.updateAggregation("items");var s=this._oListBox.getSelectedKeys();if(s.length==0){s=["sapUiFacetFilter_ALL"];this._bAllOnly=true;this._oListBox.setSelectedKeys(s);}};b.prototype.onSelect=function(f,e){var s=this._oListBox.getSelectedKeys();if(s.length==0){s=["sapUiFacetFilter_ALL"];this._bAllOnly=true;this._oListBox.setSelectedKeys(s);}var I=s.indexOf("sapUiFacetFilter_ALL");if(I>-1){if(s.length==1){this._bAllOnly=true;}else{if(this._bAllOnly){s.splice(I,1);this._bAllOnly=false;}else{s=["sapUiFacetFilter_ALL"];this._bAllOnly=true;}this._oListBox.setSelectedKeys(s);}}else{this._bAllOnly=false;}this.setProperty("selectedKeys",s,true);var S=[];var c=[];var A=this._oListBox.getSelectedItems();if(!this._bAllOnly){for(var i=0;i<A.length;i++){if(A[i]!=this._oItemAll){S.push(this.indexOfItem(A[i]));c.push(A[i]);}}}this.fireSelect({id:f.getId(),all:this._bAllOnly,selectedIndices:S,selectedItems:c});};return b;});
