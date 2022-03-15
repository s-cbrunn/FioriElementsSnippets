/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./BaseListContent","./TableContentRenderer","sap/ui/integration/library","sap/m/Table","sap/m/Column","sap/m/ColumnListItem","sap/m/Text","sap/m/Link","sap/m/ProgressIndicator","sap/m/ObjectIdentifier","sap/m/ObjectStatus","sap/m/Avatar","sap/ui/core/library","sap/m/library","sap/ui/integration/util/BindingResolver","sap/ui/integration/util/BindingHelper","sap/base/Log"],function(B,T,l,R,C,a,b,L,P,O,c,A,d,m,e,f,g){"use strict";var h=m.AvatarSize;var i=m.AvatarColor;var V=d.VerticalAlign;var k=m.ListSeparators;var n=m.ListType;var o=l.CardActionArea;var p=B.extend("sap.ui.integration.cards.TableContent",{metadata:{library:"sap.ui.integration"},renderer:T});p.prototype.exit=function(){B.prototype.exit.apply(this,arguments);if(this._oItemTemplate){this._oItemTemplate.destroy();this._oItemTemplate=null;}};p.prototype._getTable=function(){if(this._bIsBeingDestroyed){return null;}var t=this.getAggregation("_content");if(!t){t=new R({id:this.getId()+"-Table",showSeparators:k.None});this.setAggregation("_content",t);}return t;};p.prototype.setConfiguration=function(j){B.prototype.setConfiguration.apply(this,arguments);if(!j){return this;}if(j.rows&&j.columns){this._setStaticColumns(j.rows,j.columns);return this;}if(j.row&&j.row.columns){this._setColumns(j.row);}return this;};p.prototype.onDataChanged=function(){this._checkHiddenNavigationItems(this.getConfiguration().row);};p.prototype._setColumns=function(r){var j=[],t=this._getTable(),q=r.columns;q.forEach(function(u){t.addColumn(new C({header:new b({text:u.title}),width:u.width,hAlign:u.hAlign,visible:u.visible}));j.push(this._createCell(u));}.bind(this));this._oItemTemplate=new a({cells:j,vAlign:V.Middle});this._oActions.attach({area:o.ContentItem,actions:r.actions,control:this,actionControl:this._oItemTemplate,enabledPropertyName:"type",enabledPropertyValue:n.Navigation,disabledPropertyValue:n.Inactive});var G=this.getConfiguration().group;if(G){this._oSorter=this._getGroupSorter(G);}var s={template:this._oItemTemplate,sorter:this._oSorter};this._bindAggregationToControl("items",t,s);};p.prototype._setStaticColumns=function(r,q){var t=this._getTable();q.forEach(function(j){t.addColumn(new C({header:new b({text:j.title}),width:j.width,hAlign:j.hAlign}));});r.forEach(function(s){var I=new a({vAlign:V.Middle});if(s.cells&&Array.isArray(s.cells)){for(var j=0;j<s.cells.length;j++){I.addCell(this._createCell(s.cells[j]));}}if(s.actions&&Array.isArray(s.actions)){this._oActions.attach({area:o.ContentItem,actions:s.actions,control:this,actionControl:I,enabledPropertyName:"type",enabledPropertyValue:n.Navigation,disabledPropertyValue:n.Inactive});}t.addItem(I);}.bind(this));this.fireEvent("_actionContentReady");};p.prototype._createCell=function(j){var q;if(j.identifier){if(typeof j.identifier=="object"){if(!e.isBindingInfo(j.identifier)){g.warning("Usage of object type for column property 'identifier' is deprecated.",null,"sap.ui.integration.widgets.Card");}if(j.identifier.url){j.actions=[{type:"Navigation",parameters:{url:j.identifier.url,target:j.identifier.target}}];}}q=new O({title:j.value});if(j.actions){q.setTitleActive(true);this._oActions.attach({area:o.ContentItemDetail,actions:j.actions,control:this,actionControl:q,enabledPropertyName:"titleActive",eventName:"titlePress"});}return q;}if(j.url){g.warning("Usage of column property 'url' is deprecated. Use card actions for navigation.",null,"sap.ui.integration.widgets.Card");j.actions=[{type:"Navigation",parameters:{url:j.url,target:j.target}}];}if(j.actions){q=new L({text:j.value});this._oActions.attach({area:o.ContentItemDetail,actions:j.actions,control:this,actionControl:q,enabledPropertyName:"enabled"});return q;}if(j.state){return new c({text:j.value,state:j.state});}if(j.value){return new b({text:j.value});}if(j.icon){var s=f.formattedProperty(j.icon.src,function(v){return this._oIconFormatter.formatSrc(v);}.bind(this));return new A({src:s,displayShape:j.icon.shape,displaySize:j.icon.size||h.XS,tooltip:j.icon.alt,initials:j.icon.text,backgroundColor:j.icon.backgroundColor||(j.icon.text?undefined:i.Transparent)}).addStyleClass("sapFCardIcon");}if(j.progressIndicator){return new P({percentValue:j.progressIndicator.percent,displayValue:j.progressIndicator.text,state:j.progressIndicator.state});}};p.prototype.getInnerList=function(){return this._getTable();};return p;});
