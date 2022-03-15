/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/apply/_internal/changes/FlexCustomData","sap/ui/fl/initial/_internal/changeHandlers/ChangeHandlerStorage","sap/ui/fl/Utils"],function(F,C,a){"use strict";function i(c,h){if(h||c.hasApplyProcessStarted()){return false;}return true;}var U={getControlIfTemplateAffected:function(c,o,p){var m=p.modifier;var b=c.getDefinition();var d={originalControl:o};var O=b.dependentSelector&&b.dependentSelector.originalSelector;if(c.getContent().boundAggregation&&O){d.control=m.bySelector(O,p.appComponent,p.view);d.controlType=m.getControlType(d.control);d.bTemplateAffected=true;}else{d.control=o;d.controlType=m.getControlType(o);d.bTemplateAffected=false;}return d;},getChangeHandler:function(c,m,p){var l=p.modifier.getLibraryName(m.control);return a.requireAsync("sap/ui/fl/initial/_internal/changeHandlers/ChangeHandlerRegistration").then(function(b){return b.waitForChangeHandlerRegistration(l);}).then(function(){var s=c.getChangeType();var L=c.getLayer();return C.getChangeHandler(s,m.controlType,m.control,p.modifier,L);});},checkIfDependencyIsStillValidSync:function(A,m,c,s){var o=a.getChangeFromChangesMap(c.mChanges,s);var b=m.bySelector(o.getSelector(),A);var h=F.sync.hasChangeApplyFinishedCustomData(b,o);return i(o,h);},checkIfDependencyIsStillValid:function(A,m,c,s){var o=a.getChangeFromChangesMap(c.mChanges,s);var b=m.bySelector(o.getSelector(),A);return F.hasChangeApplyFinishedCustomData(b,o,m).then(i.bind(null,o));}};return U;});