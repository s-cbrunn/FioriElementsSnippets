/*!
* OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
*/
sap.ui.define(['./NavContainer','./library','sap/ui/core/Control','sap/ui/core/CustomData','sap/ui/core/IconPool','sap/ui/core/delegate/ItemNavigation','sap/ui/core/InvisibleText','sap/ui/core/IntervalTrigger','sap/ui/Device','sap/ui/base/ManagedObject','sap/ui/core/Icon','sap/ui/model/Filter','sap/ui/model/FilterOperator','sap/ui/model/json/JSONModel','./FacetFilterRenderer',"sap/ui/events/KeyCodes","sap/base/assert","sap/base/Log","sap/ui/events/jquery/EventSimulation","sap/ui/thirdparty/jquery","sap/m/Button","sap/m/ToolbarSpacer","sap/m/OverflowToolbar","sap/m/Text","sap/m/Toolbar","sap/m/Popover","sap/m/SearchField","sap/m/Bar","sap/m/Dialog","sap/m/List","sap/m/StandardListItem","sap/m/CheckBox","sap/m/Page","sap/ui/dom/jquery/scrollRightRTL","sap/ui/dom/jquery/scrollLeftRTL","sap/ui/dom/jquery/Selectors"],function(N,l,C,a,I,b,c,d,D,M,e,F,f,J,g,K,h,L,E,q,B,T,O,m,n,P,S,o,p,r,s,t,u){"use strict";var v=l.ToolbarDesign;var w=l.ListType;var x=l.ListMode;var y=l.FacetFilterListDataType;var z=l.ButtonType;var A=l.PlacementType;var G=l.FacetFilterType;var H=C.extend("sap.m.FacetFilter",{metadata:{interfaces:["sap.ui.core.IShrinkable"],library:"sap.m",properties:{showPersonalization:{type:"boolean",group:"Appearance",defaultValue:false},type:{type:"sap.m.FacetFilterType",group:"Appearance",defaultValue:G.Simple},liveSearch:{type:"boolean",group:"Behavior",defaultValue:true},showSummaryBar:{type:"boolean",group:"Behavior",defaultValue:false},showReset:{type:"boolean",group:"Behavior",defaultValue:true},showPopoverOKButton:{type:"boolean",group:"Appearance",defaultValue:false}},defaultAggregation:"lists",aggregations:{lists:{type:"sap.m.FacetFilterList",multiple:true,singularName:"list"},buttons:{type:"sap.m.Button",multiple:true,singularName:"button",visibility:"hidden"},removeFacetIcons:{type:"sap.ui.core.Icon",multiple:true,singularName:"removeFacetIcon",visibility:"hidden"},popover:{type:"sap.m.Popover",multiple:false,visibility:"hidden"},addFacetButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"},dialog:{type:"sap.m.Dialog",multiple:false,visibility:"hidden"},summaryBar:{type:"sap.m.Toolbar",multiple:false,visibility:"hidden"},resetButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"},arrowLeft:{type:"sap.ui.core.Icon",multiple:false,visibility:"hidden"},arrowRight:{type:"sap.ui.core.Icon",multiple:false,visibility:"hidden"}},events:{reset:{},confirm:{}}}});H.SCROLL_STEP=264;H.prototype.setType=function(i){var j,k;if(D.system.phone){this.setProperty("type",G.Light);k=true;}else{this.setProperty("type",i);k=(i===G.Light);}j=this._getSummaryBar();j.setActive(k);if(i===G.Light){if(this.getShowReset()){this._addResetToSummary(j);}else{this._removeResetFromSummary(j);}}return this;};H.prototype.setShowReset=function(V){this.setProperty("showReset",V);var i=this._getSummaryBar();if(V){if(this.getShowSummaryBar()||this.getType()===G.Light){this._addResetToSummary(i);}}else{if(this.getShowSummaryBar()||this.getType()===G.Light){this._removeResetFromSummary(i);}}return this;};H.prototype.setShowSummaryBar=function(V){this.setProperty("showSummaryBar",V);if(V){var i=this._getSummaryBar();if(this.getShowReset()){this._addResetToSummary(i);}else{this._removeResetFromSummary(i);}i.setActive(this.getType()===G.Light);}return this;};H.prototype.setLiveSearch=function(V){this.setProperty("liveSearch",V);if(this._displayedList){var i=this._displayedList;var j=sap.ui.getCore().byId(i.getAssociation("search"));j.detachLiveChange(i._handleSearchEvent,i);if(V){j.attachLiveChange(i._handleSearchEvent,i);}}return this;};H.prototype.getLists=function(){var i=this.getAggregation("lists");if(!i){i=[];}if(this._displayedList){i.splice(this._listAggrIndex,0,this._displayedList);}i.forEach(function(j){if(!j.hasListeners("listItemsChange")){j.attachEvent("listItemsChange",_.bind(this));}}.bind(this));return i;};function _(i){var j=i.getSource();if(this._oAllCheckBoxBar){this._oAllCheckBoxBar.setVisible(Boolean(j.getItems(true).length));}}H.prototype.removeList=function(i){var j=M.prototype.removeAggregation.call(this,"lists",i);this._removeList(j);return j;};H.prototype.removeAggregation=function(){var i=M.prototype.removeAggregation.apply(this,arguments);if(arguments[0]==="lists"){this._removeList(i);}return i;};H.prototype.openFilterDialog=function(){var i=this._getFacetDialog();var j=this._getFacetDialogNavContainer();i.addContent(j);this.getLists().forEach(function(k){if(k.getMode()===x.MultiSelect){k._preserveOriginalActiveState();}});i.setInitialFocus(j.getPages()[0].getContent()[0].getItems()[0]);i.open();return this;};H.prototype.init=function(){this._pageSize=5;this._addDelegateFlag=false;this._invalidateFlag=false;this._lastCategoryFocusIndex=0;this._aDomRefs=null;this._previousTarget=null;this._addTarget=null;this._aRows=null;this._bundle=sap.ui.getCore().getLibraryResourceBundle("sap.m");this.data("sap-ui-fastnavgroup","true",true);this._buttons={};this._aOwnedLabels=[];this._removeFacetIcons={};this._listAggrIndex=-1;this._displayedList=null;this._lastScrolling=false;this._bPreviousScrollForward=false;this._bPreviousScrollBack=false;this._popoverClosing=false;this._getAddFacetButton();this.setAggregation("resetButton",this._createResetButton());if(E.touchEventMode==="ON"&&!D.system.phone){this._enableTouchSupport();}if(D.system.phone){this.setType(G.Light);}};H.prototype.exit=function(){var i;d.removeListener(this._checkOverflow,this);if(this.oItemNavigation){this.removeDelegate(this.oItemNavigation);this.oItemNavigation.destroy();}if(this._aOwnedLabels){this._aOwnedLabels.forEach(function(j){i=sap.ui.getCore().byId(j);if(i){i.destroy();}});this._aOwnedLabels=null;}if(this._oAllCheckBoxBar){this._oAllCheckBoxBar=undefined;}};H.prototype.onBeforeRendering=function(){if(this.getShowSummaryBar()||this.getType()===G.Light){var i=this._getSummaryBar();var j=i.getContent()[0];j.setText(this._getSummaryText());}d.removeListener(this._checkOverflow,this);};H.prototype.onAfterRendering=function(){var i=this.getShowSummaryBar(),j=this.getType(),k=this._getSummaryBar().$();if(j!==G.Light&&!D.system.phone){d.addListener(this._checkOverflow,this);}if(j!==G.Light){this._startItemNavigation();}if(j===G.Light){k.attr("aria-roledescription",this._bundle.getText("FACETFILTER_ACTIVE_TITLE"));k.attr("role","group");}else if(i){k.attr("aria-roledescription",this._bundle.getText("FACETFILTER_TITLE"));}};H.prototype._startItemNavigation=function(){var j=this.getDomRef(),R=j.getElementsByClassName("sapMFFHead"),k=[];if(R.length>0){for(var i=0;i<R[0].childNodes.length;i++){if(R[0].childNodes[i].id.indexOf("ff")<0&&R[0].childNodes[i].id.indexOf("icon")<0&&R[0].childNodes[i].id.indexOf("add")<0){k.push(R[0].childNodes[i]);}if(R[0].childNodes[i].id.indexOf("add")>=0){k.push(R[0].childNodes[i]);}}}if(k!=""){this._aDomRefs=k;}if((!this.oItemNavigation)||this._addDelegateFlag==true){this.oItemNavigation=new b();this.addDelegate(this.oItemNavigation);this._addDelegateFlag=false;}this._aRows=R;for(var i=0;i<this.$().find(":sapTabbable").length;i++){if(this.$().find(":sapTabbable")[i].id.indexOf("add")>=0){this._addTarget=this.$().find(":sapTabbable")[i];break;}}this.oItemNavigation.setRootDomRef(j);this.oItemNavigation.setItemDomRefs(k);this.oItemNavigation.setCycling(false);this.oItemNavigation.setPageSize(this._pageSize);};H.prototype.onsapdelete=function(i){var j,Q;if(this.getType()===G.Light){return;}if(!this.getShowPersonalization()){return;}j=sap.ui.getCore().byId(i.target.id);if(!j){return;}Q=sap.ui.getCore().byId(j.getAssociation("list"));if(!Q){return;}if(!Q.getShowRemoveFacetIcon()){return;}Q.removeSelections(true);Q.setSelectedKeys();Q.setProperty("active",false,true);this.invalidate();var $=this.$().find(":sapTabbable");q($[$.length-1]).trigger("focus");var R=this.oItemNavigation.getFocusedIndex();q(i.target).trigger("blur");this.oItemNavigation.setFocusedIndex(R+1);this.focus();if(this.oItemNavigation.getFocusedIndex()==0){for(var k=0;k<this.$().find(":sapTabbable").length-1;k++){if($[k].id.indexOf("add")>=0){q($[k]).trigger("focus");}}}};H.prototype.onsaptabnext=function(j){if(this.getType()===G.Light){return;}this._previousTarget=j.target;if(j.target.parentNode.className=="sapMFFHead"){for(var i=0;i<this.$().find(":sapTabbable").length;i++){if(this.$().find(":sapTabbable")[i].parentNode.className=="sapMFFResetDiv"){q(this.$().find(":sapTabbable")[i]).trigger("focus");this._invalidateFlag=false;j.preventDefault();j.setMarked();return;}}}this._lastCategoryFocusIndex=this.oItemNavigation.getFocusedIndex();if(this._invalidateFlag==true){this.oItemNavigation.setFocusedIndex(-1);this.focus();this._invalidateFlag=false;}};H.prototype.onsaptabprevious=function(i){if(this.getType()===G.Light){return;}if(i.target.parentNode.className=="sapMFFResetDiv"&&this._previousTarget==null){q(this.$().find(":sapTabbable")[0]).trigger("focus");i.preventDefault();i.setMarked();return;}if(i.target.parentNode.className=="sapMFFResetDiv"&&this._previousTarget!=null&&this._previousTarget.id!=i.target.id){q(this._previousTarget).trigger("focus");i.preventDefault();i.setMarked();return;}if(i.target.id.indexOf("add")>=0||i.target.parentNode.className=="sapMFFHead"){this._previousTarget=i.target;q(this.$().find(":sapTabbable")[0]).trigger("focus");}};H.prototype.onsapend=function(i){if(this.getType()===G.Light){return;}if(this._addTarget!=null){q(this._addTarget).trigger("focus");i.preventDefault();i.setMarked();}else{q(this._aRows[this._aRows.length-1]).trigger("focus");i.preventDefault();i.setMarked();}this._previousTarget=i.target;};H.prototype.onsaphome=function(i){if(this.getType()===G.Light){return;}q(this._aRows[0]).trigger("focus");i.preventDefault();i.setMarked();this._previousTarget=i.target;};H.prototype.onsappageup=function(i){this._previousTarget=i.target;};H.prototype.onsappagedown=function(i){this._previousTarget=i.target;};H.prototype.onsapincreasemodifiers=function(i){if(this.getType()===G.Light){return;}if(i.which==K.ARROW_RIGHT){this._previousTarget=i.target;var j=this.oItemNavigation.getFocusedIndex()-1;var k=j+this._pageSize;q(i.target).trigger("blur");this.oItemNavigation.setFocusedIndex(k);this.focus();}};H.prototype.onsapdecreasemodifiers=function(i){if(this.getType()===G.Light){return;}var j=0;if(i.which==K.ARROW_LEFT){this._previousTarget=i.target;j=this.oItemNavigation.getFocusedIndex()+1;var k=j-this._pageSize;q(i.target).trigger("blur");this.oItemNavigation.setFocusedIndex(k);this.focus();}};H.prototype.onsapdownmodifiers=function(i){if(this.getType()===G.Light){return;}this._previousTarget=i.target;var j=0;j=this.oItemNavigation.getFocusedIndex()-1;var k=j+this._pageSize;q(i.target).trigger("blur");this.oItemNavigation.setFocusedIndex(k);this.focus();};H.prototype.onsapupmodifiers=function(i){if(this.getType()===G.Light){return;}this._previousTarget=i.target;var j=0;j=this.oItemNavigation.getFocusedIndex();if(j!=0){j=j+1;}var k=j-this._pageSize;q(i.target).trigger("blur");this.oItemNavigation.setFocusedIndex(k);this.focus();};H.prototype.onsapexpand=function(i){if(this.getType()===G.Light){return;}this._previousTarget=i.target;var j=this.oItemNavigation.getFocusedIndex()+1;q(i.target).trigger("blur");this.oItemNavigation.setFocusedIndex(j);this.focus();};H.prototype.onsapcollapse=function(i){if(this.getType()===G.Light){return;}this._previousTarget=i.target;var j=this.oItemNavigation.getFocusedIndex()-1;q(i.target).trigger("blur");this.oItemNavigation.setFocusedIndex(j);this.focus();};H.prototype.onsapdown=function(i){if(this.getType()===G.Light){return;}this._previousTarget=i.target;if(i.target.parentNode.className=="sapMFFResetDiv"){q(i.target).trigger("focus");i.preventDefault();i.setMarked();return;}};H.prototype.onsapup=function(i){if(this.getType()===G.Light){return;}this._previousTarget=i.target;if(i.target.parentNode.className=="sapMFFResetDiv"){q(i.target).trigger("focus");i.preventDefault();i.setMarked();}};H.prototype.onsapleft=function(i){if(this.getType()===G.Light){return;}this._previousTarget=i.target;if(i.target.parentNode.className=="sapMFFResetDiv"){q(i.target).trigger("focus");i.preventDefault();i.setMarked();}};H.prototype.onsapright=function(i){if(this.getType()===G.Light){return;}this._previousTarget=i.target;if(i.target.parentNode.className=="sapMFFResetDiv"){q(i.target).trigger("focus");i.preventDefault();i.setMarked();}};H.prototype.onsapescape=function(i){if(this.getType()===G.Light){return;}if(i.target.parentNode.className=="sapMFFResetDiv"){return;}var j=this._lastCategoryFocusIndex;q(i.target).trigger("blur");this.oItemNavigation.setFocusedIndex(j);this.focus();};H.prototype._getPopover=function(){var i=this.getAggregation("popover");if(!i){var j=this;i=new P({placement:A.Bottom,beforeOpen:function(Q){if(j._displayedList){j._displayedList._bSearchEventDefaultBehavior&&j._displayedList._setSearchValue("");}this.setCustomHeader(j._createFilterItemsSearchFieldBar(j._displayedList));var R=this.getSubHeader();if(!R){this.setSubHeader(j._createSelectAllCheckboxBar(j._displayedList));}k(j._displayedList);},beforeClose:function(){j._popoverClosing=true;},afterClose:function(Q){j._addDelegateFlag=true;this._popoverClosing=false;j._handlePopoverAfterClose();},horizontalScrolling:false});this.setAggregation("popover",i,true);i.setContentWidth("30%");i.addStyleClass("sapMFFPop");var k=function(Q){if(!Q){return;}var R=j._getFacetRemoveIcon(Q);if(R){R._bTouchStarted=false;}};}if(this.getShowPopoverOKButton()){this._addOKButtonToPopover(i);}else{i.destroyAggregation("footer");}return i;};H.prototype._handlePopoverAfterClose=function(){var i=this.getAggregation("popover"),j=this._displayedList;if(!i){return;}var k=this._getFacetRemoveIcon(j);if(k&&k._bTouchStarted){return;}this._restoreListFromDisplayContainer(i);this._displayRemoveIcon(false,j);j._fireListCloseEvent();this._fireConfirmEvent();this.destroyAggregation("popover");if(this._oOpenPopoverDeferred){setTimeout(function(){this._oOpenPopoverDeferred.resolve();this._oOpenPopoverDeferred=undefined;}.bind(this),0);}};H.prototype._fireConfirmEvent=function(){this.fireEvent('confirm');};H.prototype._openPopover=function(i,j){var k;if(!i.isOpen()){var Q=sap.ui.getCore().byId(j.getAssociation("list"));h(Q,"The facet filter button should be associated with a list.");k=!Q.fireListOpen({});this._moveListToDisplayContainer(Q,i);i.openBy(j);if(Q.getShowRemoveFacetIcon()){this._displayRemoveIcon(true,Q);}if(Q.getWordWrap()){i.setContentWidth("30%");}if(!k){Q._applySearch();}}return this;};H.prototype._getAddFacetButton=function(){var i=this.getAggregation("addFacetButton");if(!i){i=new B(this.getId()+"-add",{icon:I.getIconURI("add-filter"),type:z.Transparent,tooltip:this._bundle.getText("FACETFILTER_ADDFACET"),press:function(j){this.openFilterDialog();}.bind(this)});this.setAggregation("addFacetButton",i,true);}return i;};H.prototype._getButtonForList=function(i){if(this._buttons[i.getId()]){this._setButtonText(i);return this._buttons[i.getId()];}var j=this;var k=new B({type:z.Transparent,press:function(Q){var R=this;var U=function(){var V=j._getPopover();j._openPopover(V,R);};if(i.getMode()===x.MultiSelect){i._preserveOriginalActiveState();}var V=j._getPopover();if(V.isOpen()){setTimeout(function(){if(V.isOpen()){return;}j._oOpenPopoverDeferred=q.Deferred();j._oOpenPopoverDeferred.promise().done(U);},100);}else{setTimeout(U.bind(this),100);}}});this._buttons[i.getId()]=k;this.addAggregation("buttons",k);k.setAssociation("list",i.getId(),true);this._setButtonText(i);return k;};H.prototype._setButtonText=function(i){var j=this._buttons[i.getId()];if(i._iAllItemsCount===undefined&&i.getMaxItemsCount()||!i._bSearchEventDefaultBehavior){i._iAllItemsCount=i.getMaxItemsCount();}if(j){var k="";var Q=Object.getOwnPropertyNames(i._oSelectedKeys);var R=Q.length;if(R===1){var U=i._oSelectedKeys[Q[0]];k=this._bundle.getText("FACETFILTER_ITEM_SELECTION",[i.getTitle(),U]);}else if(R>0&&R===(i._iAllItemsCount?i._iAllItemsCount:0)){k=this._bundle.getText("FACETFILTER_ALL_SELECTED",[i.getTitle()]);}else if(R>0){k=this._bundle.getText("FACETFILTER_ITEM_SELECTION",[i.getTitle(),R]);}else{k=i.getTitle();}j.setText(k);}};H.prototype._getFacetRemoveIcon=function(i){var j=this,k=this._removeFacetIcons[i.getId()];if(!k){k=new e({src:I.getIconURI("decline"),tooltip:this._bundle.getText("FACETFILTER_REMOVE"),press:function(){k._bPressed=true;}});k.addDelegate({ontouchstart:function(){k._bTouchStarted=true;k._bPressed=false;},ontouchend:function(){j._displayRemoveIcon(false,i);k._bTouchStarted=false;setTimeout(Q.bind(this),100);}},true);var Q=function(){if(k._bPressed){i.removeSelections(true);i.setSelectedKeys();i.setProperty("active",false,true);}j._handlePopoverAfterClose();};k.setAssociation("list",i.getId(),true);k.addStyleClass("sapMFFLRemoveIcon");this._removeFacetIcons[i.getId()]=k;this.addAggregation("removeFacetIcons",k);this._displayRemoveIcon(false,i);}return k;};H.prototype._displayRemoveIcon=function(i,j){if(this.getShowPersonalization()){var k=this._removeFacetIcons[j.getId()];if(i){k.removeStyleClass("sapMFFLHiddenRemoveIcon");k.addStyleClass("sapMFFLVisibleRemoveIcon");}else{k.removeStyleClass("sapMFFLVisibleRemoveIcon");k.addStyleClass("sapMFFLHiddenRemoveIcon");}}};H.prototype._getFacetDialogNavContainer=function(){var i=new N({autoFocus:false});var j=this._createFacetPage();i.addPage(j);i.setInitialPage(j);i.attachAfterNavigate(function(k){var Q=k.getParameters()["to"];var R=k.getParameters()['from'];if(R===j){var U=(this._displayedList.getMode()===x.MultiSelect)?Q.getContent(0)[1].getItems()[0]:Q.getContent(0)[0].getItems()[0];if(U){U.focus();}}if(Q===j){R.destroySubHeader();h(this._displayedList===null,"Filter items list should have been placed back in the FacetFilter aggregation before page content is destroyed.");R.destroyContent();this._selectedFacetItem.invalidate();Q.invalidate();this._selectedFacetItem.focus();this._selectedFacetItem=null;}}.bind(this));return i;};H.prototype._createFacetPage=function(){var i=this._createFacetList();var j=new S({width:"100%",tooltip:this._bundle.getText("FACETFILTER_SEARCH"),liveChange:function(Q){var R=i.getBinding("items");if(R){var U=new F("text",f.Contains,Q.getParameters()["newValue"]);R.filter([U]);}}});var k=new u({enableScrolling:true,title:this._bundle.getText("FACETFILTER_TITLE"),subHeader:new o({contentMiddle:j}),content:[i]});return k;};H.prototype._createFilterItemsPage=function(){var i=new u({showNavButton:true,enableScrolling:true,navButtonPress:function(j){var k=j.getSource().getParent();this._navFromFilterItemsPage(k);}.bind(this)});return i;};H.prototype._getFilterItemsPage=function(i){var j=i.getPages()[1];if(j){i.removePage(j);j.destroy();}var k=this._createFilterItemsPage();i.addPage(k);return k;};H.prototype._createFilterItemsSearchFieldBar=function(i){var j=true;if(i.getDataType()!=y.String){j=false;}var k=new S({value:i._getSearchValue(),width:"100%",enabled:j,tooltip:this._bundle.getText("FACETFILTER_SEARCH"),search:function(R){this._displayedList._handleSearchEvent(R);}.bind(this)});if(this.getLiveSearch()){k.attachLiveChange(i._handleSearchEvent,i);}var Q=new o({contentMiddle:k});i.setAssociation("search",k);return Q;};H.prototype._getFacetDialog=function(){var i=this.getAggregation("dialog");if(!i){var j=this;i=new p({showHeader:false,stretch:D.system.phone?true:false,afterClose:function(){j._addDelegateFlag=true;j._invalidateFlag=true;var k=this.getContent()[0];var Q=k.getPages()[1];if(k.getCurrentPage()===Q){var R=j._restoreListFromDisplayContainer(Q);if(R.getMode()===x.MultiSelect){R._updateActiveState();j._bCheckForAddListBtn=true;}R._fireListCloseEvent();R._bSearchEventDefaultBehavior&&R._search("");}this.destroyAggregation("content",true);j.invalidate();},beginButton:new B({text:this._bundle.getText("FACETFILTER_ACCEPT"),tooltip:this._bundle.getText("FACETFILTER_ACCEPT"),press:function(){j._closeDialog();}}),contentHeight:"500px",ariaLabelledBy:[c.getStaticId("sap.m","FACETFILTER_AVAILABLE_FILTER_NAMES")]});i.addStyleClass("sapMFFDialog");i.onsapentermodifiers=function(k){if(k.shiftKey&&!k.ctrlKey&&!k.altKey){var Q=this.getContent()[0];j._navFromFilterItemsPage(Q);}};this.setAggregation("dialog",i,true);}return i;};H.prototype._closeDialog=function(){var i=this.getAggregation("dialog");if(i&&i.isOpen()){i.close();this._fireConfirmEvent();}};H.prototype._closePopover=function(){var i=this.getAggregation("popover");if(i&&i.isOpen()){i.close();}};H.prototype._createFacetList=function(){var j=this._oFacetList=new r({mode:x.None,items:{path:"/items",template:new s({title:"{text}",counter:"{count}",type:w.Navigation,customData:[new a({key:"index",value:"{index}"})]})}});var k=this._getMapFacetLists();var Q=new J({items:k});if(k.length>100){Q.setSizeLimit(k.length);}var R=this;j.attachUpdateFinished(function(){for(var i=0;i<j.getItems().length;i++){var U=this.getItems()[i];U.detachPress(R._handleFacetListItemPress,R);U.attachPress(R._handleFacetListItemPress,R);}});j.setModel(Q);return j;};H.prototype.refreshFacetList=function(){this._oFacetList.getModel().setData({items:this._getMapFacetLists()});return this;};H.prototype._getMapFacetLists=function(){return this.getLists().map(function(i,j){return{text:i.getTitle(),count:i.getAllCount(),index:j};});};H.prototype._createSelectAllCheckboxBar=function(i){if(!i.getMultiSelect()){return null;}var j=i.getActive()&&i.getItems().length>0&&Object.getOwnPropertyNames(i._oSelectedKeys).length===i.getItems().length;var k=new t(i.getId()+"-selectAll",{text:this._bundle.getText("FACETFILTER_CHECKBOX_ALL"),tooltip:this._bundle.getText("FACETFILTER_CHECKBOX_ALL"),selected:j,select:function(R){k.setSelected(R.getParameter("selected"));i._handleSelectAllClick(R.getParameter("selected"));}});i.setAssociation("allcheckbox",k);var Q=new o({visible:Boolean(i.getItems(true).length)});Q.addEventDelegate({ontap:function(R){if(R.srcControl===this){i._handleSelectAllClick(k.getSelected());}}},Q);Q.addContentLeft(k);Q.addStyleClass("sapMFFCheckbar");this._oAllCheckBoxBar=Q;return Q;};H.prototype._handleFacetListItemPress=function(i){this._navToFilterItemsPage(i.getSource());};H.prototype._navToFilterItemsPage=function(i){this._selectedFacetItem=i;var j=this.getAggregation("dialog").getContent()[0];var k=i.getCustomData();h(k.length===1,"There should be exactly one custom data for the original facet list item index");var Q=k[0].getValue();var R=this.getLists()[Q];this._listIndexAgg=this.indexOfAggregation("lists",R);if(this._listIndexAgg==Q){var U=this._getFilterItemsPage(j);R.fireListOpen({});this._moveListToDisplayContainer(R,U);U.setSubHeader(this._createFilterItemsSearchFieldBar(R));var V=this._createSelectAllCheckboxBar(R);if(V){U.insertContent(V,0);}U.setTitle(R.getTitle());j.to(U);}};H.prototype._navFromFilterItemsPage=function(i){var j=i.getPages()[1];var k=this._restoreListFromDisplayContainer(j);if(k.getMode()===x.MultiSelect){k._updateActiveState();}k._fireListCloseEvent();k._bSearchEventDefaultBehavior&&k._search("");this._selectedFacetItem.setCounter(k.getAllCount());i.backToTop();};H.prototype._moveListToDisplayContainer=function(i,j){this._listAggrIndex=this.indexOfAggregation("lists",i);h(this._listAggrIndex>-1,"The lists index should be valid.");M.prototype.removeAggregation.call(this,"lists",i,true);j.addAggregation("content",i,false);i.setAssociation("facetFilter",this,true);this._displayedList=i;};H.prototype._restoreListFromDisplayContainer=function(i){var j=i.removeAggregation("content",this._displayedList,true);this.insertAggregation("lists",j,this._listAggrIndex,j.getActive());this._listAggrIndex=-1;this._displayedList=null;return j;};H.prototype._getSequencedLists=function(){var k=-1;var Q=[];var R=this.getLists();if(R.length>0){for(var i=0;i<R.length;i++){if(R[i].getActive()){if(R[i].getSequence()<-1){R[i].setSequence(-1);}else if(R[i].getSequence()>k){k=R[i].getSequence();}Q.push(R[i]);}else if(!R[i].getRetainListSequence()){R[i].setSequence(-1);}}for(var j=0;j<Q.length;j++){if(Q[j].getSequence()<=-1){k+=1;Q[j].setSequence(k);}}if(Q.length>1){Q.sort(function(U,V){return U.getSequence()-V.getSequence();});}}return Q;};H.prototype._getSummaryBar=function(){var i=this.getAggregation("summaryBar"),j=this.getType();if(!i){var k=new m({maxLines:1});i=new n({content:[k],active:j===G.Light?true:false,design:v.Info,ariaLabelledBy:k,press:function(Q){this.openFilterDialog();}.bind(this)});i._setRootAccessibilityRole("group");this.setAggregation("summaryBar",i);}return i;};H.prototype._createResetButton=function(){var j=new B({type:z.Transparent,icon:I.getIconURI("undo"),tooltip:this._bundle.getText("FACETFILTER_RESET"),press:function(k){this._addDelegateFlag=true;this._invalidateFlag=true;if(this._popoverClosing){setTimeout(this.fireReset.bind(this),P.prototype._getAnimationDuration());}else{this.fireReset();}var Q=this.getLists();for(var i=0;i<Q.length;i++){Q[i]._setSearchValue("");Q[i]._applySearch();var R=Q[i].getItems()[0];if(R){R.focus();}}this.invalidate();}.bind(this)});return j;};H.prototype._addOKButtonToPopover=function(i){var j=i.getFooter(),k;if(!j){k=new B({text:this._bundle.getText("FACETFILTER_ACCEPT"),tooltip:this._bundle.getText("FACETFILTER_ACCEPT"),press:function(){this._closePopover();}.bind(this)});j=new O({content:[new T(),k]});i.setFooter(j);}};H.prototype._getSummaryText=function(){var k=", ";var Q=" ";var R="";var U=true;var V=this.getLists();if(V.length>0){for(var i=0;i<V.length;i++){var W=V[i];if(W.getActive()){var X=this._getSelectedItemsText(W);var Y="";for(var j=0;j<X.length;j++){Y=Y+X[j]+k;}if(Y){Y=Y.substring(0,Y.lastIndexOf(k)).trim();if(U){R=this._bundle.getText("FACETFILTER_INFOBAR_FILTERED_BY",[W.getTitle(),Y]);U=false;}else{R=R+Q+this._bundle.getText("FACETFILTER_INFOBAR_AND")+Q+this._bundle.getText("FACETFILTER_INFOBAR_AFTER_AND",[W.getTitle(),Y]);}}}}}if(!R){R=this._bundle.getText("FACETFILTER_INFOBAR_NO_FILTERS");}return R;};H.prototype._getSelectedItemsText=function(i){var j=i.getSelectedItems().map(function(k){return k.getText();});i._oSelectedKeys&&Object.getOwnPropertyNames(i._oSelectedKeys).forEach(function(k){j.indexOf(i._oSelectedKeys[k])===-1&&j.push(i._oSelectedKeys[k]);});return j;};H.prototype._addResetToSummary=function(i){if(i.getContent().length===1){i.addContent(new T({width:""}));var j=this._createResetButton();i.addContent(j);j.addStyleClass("sapUiSizeCompact");j.addStyleClass("sapMFFRefresh");j.addStyleClass("sapMFFBtnHoverable");}};H.prototype._removeResetFromSummary=function(i){if(i.getContent().length===3){var j=i.removeAggregation("content",1);j.destroy();var k=i.removeAggregation("content",1);k.destroy();}};H.prototype._removeList=function(i){if(i){var j=this._buttons[i.getId()];if(j){this.removeAggregation("buttons",j);j.destroy();}var R=this._removeFacetIcons[i.getId()];if(R){this.removeAggregation("removeIcons",R);R.destroy();}delete this._buttons[i.getId()];delete this._removeFacetIcons[i.getId()];}};H.prototype._getScrollingArrow=function(j){var k=null;var Q={src:"sap-icon://navigation-"+j+"-arrow"};if(j==="left"){k=this.getAggregation("arrowLeft");if(!k){Q.id=this.getId()+"-arrowScrollLeft";k=I.createControlByURI(Q);var R=["sapMPointer","sapMFFArrowScroll","sapMFFArrowScrollLeft"];for(var i=0;i<R.length;i++){k.addStyleClass(R[i]);k.setTooltip(this._bundle.getText("FACETFILTER_PREVIOUS"));}this.setAggregation("arrowLeft",k);}}else if(j==="right"){k=this.getAggregation("arrowRight");if(!k){Q.id=this.getId()+"-arrowScrollRight";k=I.createControlByURI(Q);var U=["sapMPointer","sapMFFArrowScroll","sapMFFArrowScrollRight"];for(var i=0;i<U.length;i++){k.addStyleClass(U[i]);k.setTooltip(this._bundle.getText("FACETFILTER_NEXT"));}this.setAggregation("arrowRight",k);}}else{L.error("Scrolling arrow name "+j+" is not valid");}return k;};H.prototype._checkOverflow=function(){var i=this.getDomRef("head"),$=q(i),j=this.$(),k=false,Q=false,R=false,U=null,V=null,W=null;if(i){U=i.scrollLeft;V=i.scrollWidth;W=i.clientWidth;if(V>W){if(V-W==1){V=W;}else{R=true;}}j.toggleClass("sapMFFScrolling",R);j.toggleClass("sapMFFNoScrolling",!R);this._lastScrolling=R;if(!this._bRtl){k=U>0;Q=(V>W)&&(V>U+W);}else{Q=$.scrollLeftRTL()>0;k=$.scrollRightRTL()>0;}if((Q!=this._bPreviousScrollForward)||(k!=this._bPreviousScrollBack)){j.toggleClass("sapMFFNoScrollBack",!k);j.toggleClass("sapMFFNoScrollForward",!Q);}}};H.prototype.onclick=function(i){var j=i.target.id;if(j){var k=this.getId(),Q=i.target;i.preventDefault();if(j==k+"-arrowScrollLeft"){Q.tabIndex=-1;Q.focus();this._scroll(-H.SCROLL_STEP,500);}else if(j==k+"-arrowScrollRight"){Q.tabIndex=-1;Q.focus();this._scroll(H.SCROLL_STEP,500);}}};H.prototype._scroll=function(i,j){var k=this.getDomRef("head");var Q=k.scrollLeft;if(!D.browser.internet_explorer&&this._bRtl){i=-i;}var R=Q+i;q(k).stop(true,true).animate({scrollLeft:R},j);};H.prototype._enableTouchSupport=function(){var i=function(Q){var R=this.getType();if(R===G.Light){return;}Q.preventDefault();if(this._iInertiaIntervalId){window.clearInterval(this._iInertiaIntervalId);}this.startScrollX=this.getDomRef("head").scrollLeft;this.startTouchX=Q.touches[0].pageX;this._bTouchNotMoved=true;this._lastMoveTime=new Date().getTime();}.bind(this);var j=function(Q){var R=this.getType();if(R===G.Light){return;}var U=Q.touches[0].pageX-this.startTouchX;var V=this.getDomRef("head");var W=V.scrollLeft;var X=this.startScrollX-U;V.scrollLeft=X;this._bTouchNotMoved=false;var Y=new Date().getTime()-this._lastMoveTime;this._lastMoveTime=new Date().getTime();if(Y>0){this._velocity=(X-W)/Y;}Q.preventDefault();}.bind(this);var k=function(Q){var R=this.getType();if(R===G.Light){return;}if(this._bTouchNotMoved===false){Q.preventDefault();var U=this.getDomRef("head");var V=50;var W=Math.abs(this._velocity/10);this._iInertiaIntervalId=window.setInterval(function(){this._velocity=this._velocity*0.80;var X=this._velocity*V;U.scrollLeft=U.scrollLeft+X;if(Math.abs(this._velocity)<W){window.clearInterval(this._iInertiaIntervalId);this._iInertiaIntervalId=undefined;}},V);}else if(this._bTouchNotMoved===true){this.onclick(Q);Q.preventDefault();}this._bTouchNotMoved=undefined;this._lastMoveTime=undefined;}.bind(this);this.addEventDelegate({ontouchstart:i},this);this.addEventDelegate({ontouchend:k},this);this.addEventDelegate({ontouchmove:j},this);};return H;});
