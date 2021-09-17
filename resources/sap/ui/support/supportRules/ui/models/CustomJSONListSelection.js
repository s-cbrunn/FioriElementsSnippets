/*
 * ! OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./CustomListSelection","sap/ui/support/supportRules/Storage","sap/ui/support/supportRules/ui/models/SelectionUtils","sap/ui/support/supportRules/Constants"],function(C,S,a,b){"use strict";var c=C.extend("sap.ui.support.supportRules.ui.models.CustomJSONListSelection",{constructor:function(o,d,k){C.call(this,o,k);this._dependent=d;},_updateModelAfterSelectionChange:function(e){var B=this._getBinding();var m=B.getModel();var d=e.getParameter("rowIndices")||[];var s=this._getSelectionModel();var t=this;function f(p,g,h){var n=m.getProperty(p+"/nodes");if(t._isTree()&&t._dependent){if(n&&n.length){for(var j=0;j<n.length;j++){f(p+"/nodes/"+j+"",g,true);t.updateModelAfterChangedSelection(m,p,g);}}else{if(!g&&!h){var P=p.split("/");P.pop();P.pop();var k=P.join("/");t._setSelectionForContext(m,m.createBindingContext(k),g);}}}t.updateModelAfterChangedSelection(m,p,g);t._setSelectionForContext(m,m.createBindingContext(p),g);}for(var i=0;i<d.length;i++){var o=this._getContextByIndex(d[i]);if(o){f(o.getPath(),s.isSelectedIndex(d[i]));}}this.syncParentNodeSelectionWithChildren(B.getModel("ruleSets"));this._finalizeSelectionUpdate();a.getSelectedRules();if(S.readPersistenceCookie(b.COOKIE_NAME)){a.persistSelection();var T=S.getRules();a.getRulesSelectionState().forEach(function(r){if(r.libName==="temporary"){T.forEach(function(g){if(r.ruleId===g.id){g.selected=r.selected;}});}});S.setRules(T);}}});return c;});
