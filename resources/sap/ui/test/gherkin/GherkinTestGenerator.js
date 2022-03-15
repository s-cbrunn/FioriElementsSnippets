/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/ui/test/gherkin/dataTableUtils","sap/ui/test/gherkin/simpleGherkinParser","sap/base/strings/escapeRegExp","sap/ui/thirdparty/jquery"],function(U,d,s,e,q){"use strict";var G=U.extend("sap.ui.test.gherkin.GherkinTestGenerator",{constructor:function(f,S,a){U.apply(this,arguments);if(typeof f==="string"||f instanceof String){f=s.parseFile(f);}else if(!f||(typeof f!=="object")||!f.scenarios){throw new Error("GherkinTestGenerator constructor: parameter 'vFeature' must be a valid String or a valid Feature object");}if((typeof S!=="function")||!((new S())._generateTestStep)){throw new Error("GherkinTestGenerator constructor: parameter 'fnStepDefsConstructor' must be a valid StepDefinitions constructor");}if(a&&typeof a!=="function"){throw new Error("GherkinTestGenerator constructor: if specified, parameter 'fnAlternateTestStepGenerator' must be a valid Function");}this._oFeature=f;this._fnStepDefsConstructor=S;this._oStepDefs=null;this._fnAlternateTestStepGenerator=a||null;},setUp:function(){this._oStepDefs=new this._fnStepDefsConstructor();},tearDown:function(){if(this._oStepDefs&&this._oStepDefs._needsTearDown){this._oStepDefs.closeApplication();}this._oStepDefs=null;},generate:function(){if(!this._oStepDefs){this.setUp();}return this._generateFeatureTest();},execute:function(t,a){if(!this._oStepDefs){throw new Error("Run 'generate' before calling 'execute'");}if(!t||(!t.skip&&((typeof t.func!=="function")||!Array.isArray(t.parameters)))){throw new Error("Input parameter 'oTestStep' is not a valid TestStep object.");}if(!t.skip){this._oStepDefs.assert=a;t.func.apply(this._oStepDefs,t.parameters);this._oStepDefs._needsTearDown=true;}return(!t.skip);},_generateFeatureTest:function(){var E=[];this._oFeature.scenarios.forEach(function(S){E=E.concat(this._expandScenarioOutline(S));},this);var t=E.map(function(S){return this._generateTestScenario(S,this._oFeature.background);},this);var f=this._isWip(this._oFeature);var a=t.every(function(T){return T.skip;});return{name:((f)?"(WIP) ":"")+"Feature: "+this._oFeature.name,skip:f||a,wip:f,testScenarios:t};},_expandScenarioOutline:function(S){if(!this._isScenarioOutlineWithExamples(S)){return[S];}var c=[];S.examples.filter(this._isNotWip).forEach(function(E,i){var C=this._convertScenarioExamplesToListOfObjects(E.data);c=c.concat(C.map(function(o,i){var a=q.extend(true,{},S);a.name+=(E.name)?": "+E.name:"";a.name+=" #"+(i+1);q.each(o,function(v,V){a.steps.forEach(function(b){var f=e(v);b.text=b.text.replace(new RegExp("<"+f+">","g"),V);});});return a;},this));},this);return c;},_generateTestScenario:function(S,b){var w=this._isWip(S);var a=this._isScenarioOutline(S)?"Scenario Outline: ":"Scenario: ";var c=(w?"(WIP) ":"")+a+S.name;var t=(b)?this._generateTestSteps(w,b,false):[];var n=this._isScenarioOutline(S)&&!this._isScenarioOutlineWithExamples(S);var f=n||t.some(function(o){return!o.isMatch;});t=t.concat(this._generateTestSteps(w,S,f));return{name:c,skip:w||n||t.every(function(o){return o.skip&&o.isMatch;}),wip:w,testSteps:t};},_generateTestSteps:function(I,S,b){var t=[];for(var i=0;i<S.steps.length;++i){var o=S.steps[i];var T=this._oStepDefs._generateTestStep(o);if(!T.isMatch&&this._fnAlternateTestStepGenerator){T=this._fnAlternateTestStepGenerator(o);}if(!T.isMatch){b=true;}T.skip=b||I;if(T.isMatch&&T.skip){T.text="(SKIPPED) "+T.text;}t.push(T);}return t;},_convertScenarioExamplesToListOfObjects:function(E){E=E.map(function(i){return(typeof i==="string"||i instanceof String)?[i]:i;});return d.toTable(E);},_isScenarioOutline:function(S){return!!S.examples;},_isScenarioOutlineWithExamples:function(S){return!!S.examples&&(S.examples.length!==0)&&S.examples.some(this._isNotWip);},_isNotWip:function(o){return(q.inArray("@wip",o.tags)===-1);},_isWip:function(o){return!this._isNotWip(o);}});return G;});
