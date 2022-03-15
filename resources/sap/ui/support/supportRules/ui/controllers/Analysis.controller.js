/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/deepExtend","sap/ui/support/supportRules/ui/controllers/BaseController","sap/ui/model/json/JSONModel","sap/ui/core/Fragment","sap/m/MessageToast","sap/ui/support/supportRules/CommunicationBus","sap/ui/support/supportRules/WCBChannels","sap/ui/support/supportRules/ui/models/SharedModel","sap/ui/support/supportRules/RuleSerializer","sap/ui/support/supportRules/Constants","sap/ui/support/supportRules/Storage","sap/ui/support/supportRules/util/EvalUtils","sap/ui/support/supportRules/ui/models/SelectionUtils","sap/ui/support/supportRules/ui/controllers/PresetsController","sap/ui/support/supportRules/ui/models/PresetsUtils","sap/ui/support/supportRules/ui/models/CustomJSONListSelection"],function(d,B,J,F,M,C,c,S,R,a,b,E,e,P,f,g){"use strict";return B.extend("sap.ui.support.supportRules.ui.controllers.Analysis",{onInit:function(){this.model=S;this.setCommunicationSubscriptions();this.tempRulesLoaded=false;this.getView().setModel(this.model);this.treeTable=e.treeTable=this.byId("ruleList");this._oRuleSetsModel=new J();this.treeTable.setModel(this._oRuleSetsModel,"ruleSets");this.ruleSetView=this.byId("ruleSetsView");this.rulesViewContainer=this.byId("rulesNavContainer");this.bAdditionalViewLoaded=false;this.bAdditionalRulesetsLoaded=false;this.oApplicationinfo={};new g(this.treeTable,true,"id");C.subscribe(c.UPDATE_SUPPORT_RULES,function(){if(!this.bAdditionalViewLoaded){C.publish(c.RESIZE_FRAME,{bigger:true});this.bAdditionalViewLoaded=true;this.loadAdditionalUI();}},this);if(this.model.getProperty("/persistingSettings")){var h=b.getVisibleColumns()||[];if(h.length){this.setColumnVisibility(h,true);}}this.byId("presetVariant").addEventDelegate({onclick:this.onPresetVariantClick.bind(this)});this.treeTable.attachEvent("rowSelectionChange",function(o){if(o.getParameter("userInteraction")){f.syncCurrentSelectionPreset(e.getSelectedRules());}});this.byId("rowActionTemplate").setVisible(!this.model.getProperty("/tempRulesDisabled"));},loadAdditionalUI:function(){if(!this._ruleDetails){this._ruleDetails=F.load({name:"sap.ui.support.supportRules.ui.views.RuleDetails",controller:this}).then(function(r){this.byId("rulesDisplayPage").addContentArea(r);}.bind(this));}if(!this._ruleCreateUpdatePages){this._ruleCreateUpdatePages=F.load({name:"sap.ui.support.supportRules.ui.views.RuleUpdate",controller:this}).then(function(r){r.forEach(function(h){this.byId("rulesNavContainer").insertPage(h);},this);}.bind(this));}this._updateRuleList();},onAfterRendering:function(){var t=function(){C.publish(c.ON_INIT_ANALYSIS_CTRL);sap.ui.getCore().detachThemeChanged(t);};if(sap.ui.getCore().isThemeApplied()){C.publish(c.ON_INIT_ANALYSIS_CTRL);}else{sap.ui.getCore().attachThemeChanged(t);}},onAsyncSwitch:function(o){var s=o.getSource();if(o.getParameter("selected")){var A=s.getCustomData()[0].getValue()==="true";var r=s.getProperty("groupName")==="asyncContext"?"/newRule":"/editRule";this.model.setProperty(r+"/async",A);this._updateCheckFunction(r,A);}},_updateCheckFunction:function(r,A){var s=this.model.getProperty(r+"/check");if(!s){return;}var m=s.match(/function[^(]*\(([^)]*)\)/);if(!m){return;}var p=m[1].trim().split(/\W+/);p[0]=p[0]||"oIssueManager";p[1]=p[1]||"oCoreFacade";p[2]=p[2]||"oScope";if(A){p[3]=p[3]||"fnResolve";}else{p=p.slice(0,3);}var n=s.replace(/function[^(]*\(([^)]*)\)/,"function ("+p.join(", ")+")");this.model.setProperty(r+"/check",n);},getTemporaryLib:function(){var l=this.model.getProperty("/libraries");for(var i=0;i<l.length;i++){if(l[i].title==a.TEMP_RULESETS_NAME){return d({},l[i]);}}return null;},setTemporaryLib:function(D){var l=this.model.getProperty("/libraries");for(var i=0;i<l.length;i++){if(l[i].title==a.TEMP_RULESETS_NAME){this.model.setProperty("/libraries/"+i,D);return;}}},setCommunicationSubscriptions:function(){if(!this.model.getProperty("/tempRulesDisabled")){this._setTempRulesCommunicationSubscriptions();}C.subscribe(c.UPDATE_SUPPORT_RULES,this.updateSupportRules,this);C.subscribe(c.POST_AVAILABLE_LIBRARIES,function(h){this.bAdditionalRulesetsLoaded=true;this.model.setProperty("/availableLibrariesSet",h.libNames);this.rulesViewContainer.setBusy(false);},this);C.subscribe(c.POST_APPLICATION_INFORMATION,function(h){this.oApplicationinfo=h;},this);C.subscribe(c.POST_AVAILABLE_COMPONENTS,function(h){var i=[],m=this.model.getProperty("/executionScopeComponents"),s=b.getSelectedScopeComponents(),j;for(var k=0;k<h.length;k+=1){i.push({text:h[k]});}if(m&&m.length>0){for(j=0;j<i.length;j++){i[j].selected=this.checkIfComponentIsSelected(i[j],m);}}else if(s&&s.length>0){for(j=0;j<i.length;j++){i[j].selected=this.checkIfComponentIsSelected(i[j],s);}}this.model.setProperty("/executionScopeComponents",i);},this);C.subscribe(c.GET_RULES_MODEL,function(r){var p=b.readPersistenceCookie(a.COOKIE_NAME),l=this.model.getProperty("/loadingAdditionalRuleSets");if(l){e._syncSelectionAdditionalRuleSetsMainModel(r,this._oRuleSetsModel.getData());e._deselectAdditionalRuleSets(r,this.model.getProperty("/namesOfLoadedAdditionalRuleSets"));}if(p){this.initializeTempRules();var u=e.updateSelectedRulesFromLocalStorage(r);if(u){r=u;}f.loadCustomPresets();}this._oRuleSetsModel.setData(r);if(p||l){this.treeTable.updateSelectionFromModel();}else{this.treeTable.selectAll();}this.model.setProperty("/selectedRulesCount",e.getSelectedRules().length);f.initializeSelectionPresets(e.getSelectedRules());},this);C.subscribe(c.POST_MESSAGE,function(h){M.show(h.message);},this);C.subscribe(c.ON_ANALYZE_STARTED,function(h){this.model.setProperty("/showProgressIndicator",true);},this);},checkIfComponentIsSelected:function(h,s){for(var i=0;i<s.length;i+=1){if(s[i].text==h.text&&s[i].selected){return true;}}return false;},onAnalyze:function(){var h=this.model.getProperty("/selectionPresetsCurrent"),o=this._getExecutionContext();if(h.selections.length===0){M.show("Select some rules to be analyzed.");return;}if(o.type==="components"&&o.components.length===0){M.show("Please select some components to be analyzed.");return;}C.publish(c.ON_ANALYZE_REQUEST,{rulePreset:h,executionContext:o});},_getExecutionContext:function(){var h={type:this.model.getProperty("/analyzeContext/key")};if(h.type==="subtree"){h.parentId=this.model.getProperty("/subtreeExecutionContextId");}if(h.type==="components"){var s=sap.ui.getCore().byId("componentsSelectionContainer"),i=s.getContent();h.components=[];i.forEach(function(j){if(j.getSelected()){h.components.push(j.getText());}});}return h;},onSelectedRuleSets:function(o){var s=true,h=this.model.getProperty("/selectedRule"),A=o.getParameter("selectedKey")==="additionalRulesets";if(A||!h){s=false;}if(!this.bAdditionalRulesetsLoaded&&A){this.rulesViewContainer.setBusyIndicatorDelay(0);this.rulesViewContainer.setBusy(true);C.publish(c.GET_NON_LOADED_RULE_SETS,{loadedRulesets:this._getLoadedRulesets()});}this.getView().getModel().setProperty("/showRuleProperties",s);},_getLoadedRulesets:function(){var r=this.treeTable.getModel("ruleSets").getData(),l=[];Object.keys(r).forEach(function(k){var L=r[k].name;if(L&&L!=="temporary"){l.push(L);}});return l;},_applyTempRulesSelection:function(t){var r=d({},this._oRuleSetsModel.getData()),l,h,T,s,j,I,k=function(o){return o.id===h.id;};for(var i in r){l=r[i];T=r[i].nodes;if(l.name!==a.TEMP_RULESETS_NAME){continue;}r[i].nodes=[];for(var m in t.rules){h=t.rules[m];s=T[m]!==undefined?T[m].selected:true;if(this.tempRulesFromStorage){j=this.tempRulesFromStorage.filter(k);if(j.length>0){s=j[0].selected;I=this.tempRulesFromStorage.indexOf(j[0]);this.tempRulesFromStorage.splice(I,1);if(s===false){l.selected=false;}}if(this.tempRulesFromStorage.length===0){this.tempRulesFromStorage.length=null;}}l.nodes.push({name:h.title,description:h.description,id:h.id,audiences:h.audiences.toString(),categories:h.categories.toString(),minversion:h.minversion,resolution:h.resolution,title:h.title,selected:s,libName:l.name,check:h.check});}}this._oRuleSetsModel.setData(r);},_syncTreeTableVieModelTempRule:function(t,h){var r=this.model.getProperty("/editRuleSource");for(var i in h){if(h[i].name===a.TEMP_RULESETS_NAME){for(var j in h[i].nodes){if(h[i].nodes[j].id===r.id){h[i].nodes[j]={name:t.title,description:t.description,id:t.id,audiences:t.audiences,categories:t.categories,minversion:t.minversion,resolution:t.resolution,selected:h[i].nodes[j].selected,title:t.title,libName:h[i].name,check:t.check};}}}}},_hasSelectedComponent:function(){var A=sap.ui.getCore().byId("componentsSelectionContainer").getContent();function i(o){return o.getSelected();}return A.some(i);},onAnalyzeSettings:function(o){var s=o.getSource();C.publish(c.GET_AVAILABLE_COMPONENTS);if(!this._analyzeSettingsPopover){this._analyzeSettingsPopover=F.load({name:"sap.ui.support.supportRules.ui.views.AnalyzeSettings",controller:this}).then(function(h){this.getView().addDependent(h);return h;}.bind(this));}this._analyzeSettingsPopover.then(function(h){h.openBy(s);});},onContextSelect:function(o){if(o.getParameter("selected")){var s=o.getSource(),r=s.getCustomData()[0].getValue(),h=this.model.getProperty("/executionScopes")[r];if(r==="components"&&!this._hasSelectedComponent()){var i=sap.ui.getCore().byId("componentsSelectionContainer").getContent();if(i.length>0){i[0].setSelected(true);this.onScopeComponentSelect(null);}}this.model.setProperty("/analyzeContext",h);}if(b.readPersistenceCookie(a.COOKIE_NAME)){this.persistExecutionScope();}},onExecutionContextChange:function(h){var v=h.getSource().getValue();if(v){this.model.setProperty("/subtreeExecutionContextId",v);}if(b.readPersistenceCookie(a.COOKIE_NAME)){this.persistExecutionScope();}},onScopeComponentSelect:function(h){var s=this.model.getProperty("/executionScopeComponents");if(b.readPersistenceCookie(a.COOKIE_NAME)){b.setSelectedScopeComponents(s);}},onBeforePopoverOpen:function(){if(this.model.getProperty("/executionScopeComponents").length===0){C.publish(c.GET_AVAILABLE_COMPONENTS);}},createNewRulePress:function(o){var h=this.model.getProperty("/newEmptyRule");this.model.setProperty("/selectedSetPreviewKey","availableRules");this.model.setProperty("/newRule",d({},h));this.model.setProperty("/tempLink",{href:"",text:""});this.goToCreateRule();},goToRuleProperties:function(){var n=this.byId("rulesNavContainer");n.to(this.byId("rulesDisplayPage"),"show");},createRuleString:function(r){if(!r){return'';}var s="{\n",h=0,k=Object.keys(r).length;for(var i in r){var v=r[i];h++;s+="\t";s+=i+": ";if(i==="check"){s+=v.split("\n").join("\n\t");}else{s+=JSON.stringify(v);}if(h<k){s+=",";}s+="\n";}s+="}";return s;},updateRule:function(){var o=this.model.getProperty("/editRuleSource/id"),u=this.model.getProperty("/editRule");if(this.checkFunctionString(u.check)){C.publish(c.VERIFY_UPDATE_RULE,{oldId:o,updateObj:R.serialize(u)});}},updateSupportRules:function(h){h=R.deserialize(h.sRuleSet);C.publish(c.REQUEST_RULES_MODEL,h);var l=[],t=this;for(var i in h){var r=[],k=h[i].ruleset._mRules;for(var j in k){var m=k[j];m.libName=i;m.selected=true;r.push(m);}l.push({title:i,type:"library",rules:r,selected:true});}var n;if(l[0].rules[0]){n=l[0].rules[0];}else{n=l[1].rules[0];}t.placeTemporaryRulesetAtStart(l);t.model.setProperty("/selectedRuleStringify","");t.model.setProperty("/selectedRule",n);t.model.setProperty("/selectedRuleStringify",t.createRuleString(n));t.model.setProperty("/libraries",l);var o=t.model.getProperty("/loadingAdditionalRuleSets");if(o){M.show("Additional rule set(s) loaded!");this.ruleSetView.setSelectedKey("availableRules");}},initializeTempRules:function(){if(this.model.getProperty("/tempRulesDisabled")){return;}var t=b.getRules(),l=this.model.getProperty("/loadingAdditionalRuleSets");if(t&&!l&&!this.tempRulesLoaded){this.tempRulesFromStorage=t;this.tempRulesLoaded=true;t.forEach(function(h){C.publish(c.VERIFY_CREATE_RULE,R.serialize(h));});this.persistedTempRulesCount=t.length;}},placeTemporaryRulesetAtStart:function(l){for(var i=0;i<l.length;i++){var r=l[i];if(r.title===a.TEMP_RULESETS_NAME){var t=r;l.splice(i,1);l.unshift(t);return;}}},addLinkToRule:function(h){var t=this.model.getProperty("/tempLink"),i=d({},t),j=h.getSource().getProperty("text"),r=j==='Add'?"/newRule":"/editRule",u=this.model.getProperty(r+"/resolutionurls");if(u){u.push(i);}else{this.model.setProperty(r+"/resolutionurls","");u.push(i);}this.model.setProperty("/tempLink",{href:"",text:""});},goToCreateRule:function(){var n=this.byId("rulesNavContainer");n.to(sap.ui.getCore().byId("rulesCreatePage"),"show");},checkFunctionString:function(h){try{E.evalFunction(h);}catch(i){M.show("Your check function contains errors, and can't be evaluated:"+i);return false;}return true;},addNewRule:function(){var n=this.model.getProperty("/newRule");if(this.checkFunctionString(n.check)){this.showRuleCreatedToast=true;C.publish(c.VERIFY_CREATE_RULE,R.serialize(n));}},rulesToolbarITHSelect:function(o){if(o.getParameter("key")==="jsonOutput"){var n=this.model.getProperty("/newRule"),s=this.createRuleString(n);this.model.setProperty("/newRuleStringified",s);}},rulesToolbarEditITHSelect:function(o){if(o.getParameter("key")==="jsonOutput"){var n=this.model.getProperty("/editRule"),s=this.createRuleString(n);this.model.setProperty("/updateRuleStringified",s);}},loadMarkedSupportLibraries:function(){var l=this.byId("availableLibrariesSet"),L=[],A=this.model.getProperty("/availableLibrariesSet");L=l.getSelectedItems().map(function(i){return i.getTitle();});l.getItems().forEach(function(i){i.setSelected(false);});if(L.length>0){A=A.filter(function(s){return L.indexOf(s)<0;});this.model.setProperty("/availableLibrariesSet",A);this.model.setProperty("/namesOfLoadedAdditionalRuleSets",L);C.publish(c.LOAD_RULESETS,{aLibNames:{publicRules:L,internalRules:L}});this.model.setProperty("/loadingAdditionalRuleSets",true);this.model.setProperty("/showRuleProperties",true);}else{M.show("Select additional RuleSet to be loaded.");}},onCellClick:function(o){if(o.getParameter("rowBindingContext")){var s=o.getParameter("rowBindingContext").getObject(),h,r="",i=false;if(s.id&&s.type!=="lib"){h=this.getMainModelFromTreeViewModel(s);r=this.createRuleString(h);i=true;}this.model.setProperty("/selectedRuleStringify",r);this.model.setProperty("/selectedRule",h);this.model.setProperty("/showRuleProperties",i);}},getMainModelFromTreeViewModel:function(s){var h=this.model.getProperty("/libraries"),m=null;h.forEach(function(l,i){h[i].rules.forEach(function(j){if(s.id===j.id){m=j;}});});return m;},_generateRuleId:function(r){var i=0,t=this.getTemporaryLib(),T=t.rules,h,j=function(o){return o.id===r+i;};while(++i){h=T.some(j);if(!h){return r+i;}}},duplicateRule:function(o){var p=o.getSource().getBindingContext("ruleSets").getPath(),s=this.treeTable.getBinding().getModel().getProperty(p),h=this.getMainModelFromTreeViewModel(s),i=d({},h);i.id=this._generateRuleId(i.id);this.model.setProperty("/newRule",i);this.goToCreateRule();},editRule:function(h){var p=h.getSource().getBindingContext("ruleSets").getPath(),s=this.treeTable.getBinding().getModel().getProperty(p),i=this.getMainModelFromTreeViewModel(s);this.model.setProperty("/editRuleSource",i);this.model.setProperty("/editRule",d({},i));var n=this.byId("rulesNavContainer");n.to(sap.ui.getCore().byId("ruleUpdatePage"),"show");},deleteTemporaryRule:function(h){var s=this.getObjectOnTreeRow(h),r=d({},this._oRuleSetsModel.getData()),l=this.model.getProperty("/libraries"),i;l.forEach(function(L){if(L.title===a.TEMP_RULESETS_NAME){i=L.rules.filter(function(o){return o.id!==s.id;});L.rules=i;}});for(var L in r){if(r[L].name===a.TEMP_RULESETS_NAME){for(var j in r[L].nodes){if(r[L].nodes[j].id===s.id){r[L].nodes.splice(j,1);}}}}this._oRuleSetsModel.setData(r);C.publish(c.DELETE_RULE,R.serialize(s));this._updateRuleList();f.syncCurrentSelectionPreset(e.getSelectedRules());if(b.readPersistenceCookie(a.COOKIE_NAME)){b.removeSelectedRules(i);e.persistSelection();}},getObjectOnTreeRow:function(h){var p=h.getSource().getBindingContext("ruleSets").getPath(),s=this.treeTable.getBinding().getModel().getProperty(p),l=this.model.getProperty("/libraries");l.forEach(function(i,j){i.rules.forEach(function(r){if(r.id===s.id){s.check=r.check;}});});return s;},_updateRuleList:function(){var r=this.getView().byId("ruleList"),t=this.getTemporaryLib(),T=t?t["rules"]:[];if(!T.length){r.setRowActionCount(1);}else{r.setRowActionCount(2);}},setColumnVisibility:function(h,v){var i=this.treeTable.getColumns();i.forEach(function(o){o.setVisible(!v);h.forEach(function(r){if(o.sId.includes(r)){o.setVisible(v);}});});},onColumnVisibilityChange:function(o){var h=o.getParameter("column"),n=o.getParameter("newVisible");if(!this.model.getProperty("/persistingSettings")){return;}h.setVisible(n);this.persistVisibleColumns();},onPresetVariantClick:function(){if(!this._PresetsController){this._PresetsController=new P(this.model,this.getView());}this._PresetsController.openPresetVariant();},_setTempRulesCommunicationSubscriptions:function(){C.subscribe(c.VERIFY_RULE_CREATE_RESULT,function(h){var r=h.result,n=R.deserialize(h.newRule,true),t=this.getTemporaryLib();if(r=="success"){t.rules.push(n);this.setTemporaryLib(t);this._applyTempRulesSelection(t);f.syncCurrentSelectionPreset(e.getSelectedRules());if(b.readPersistenceCookie(a.COOKIE_NAME)){e.persistSelection();b.setRules(t.rules);if(this.showRuleCreatedToast){M.show('Your temporary rule "'+n.id+'" was persisted in the local storage');this.showRuleCreatedToast=false;}}var i=this.model.getProperty("/newEmptyRule");this.model.setProperty("/newRule",d({},i));this.goToRuleProperties();this.model.setProperty("/selectedRule",n);this._updateRuleList();this.treeTable.updateSelectionFromModel();}else{M.show("Add rule failed because: "+r);}},this);C.subscribe(c.VERIFY_RULE_UPDATE_RESULT,function(h){var r=h.result,u=R.deserialize(h.updateRule,true),t=this;if(r==="success"){var i=this.model.getProperty("/editRuleSource"),o=this._oRuleSetsModel.getData(),l=this.model.getProperty('/libraries');l.forEach(function(j,k){if(j.title===a.TEMP_RULESETS_NAME){j.rules.forEach(function(m,n){if(m.id===i.id){j.rules[n]=u;if(t.model.getProperty("/persistingSettings")){b.setRules(j.rules);}}});t._syncTreeTableVieModelTempRule(u,o);}});this._oRuleSetsModel.setData(o);this.model.setProperty('/selectedRule',u);e.getSelectedRules();this.treeTable.updateSelectionFromModel();this.goToRuleProperties();}else{M.show("Update rule failed because: "+r);}},this);}});});
