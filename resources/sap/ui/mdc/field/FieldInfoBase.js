/*
 * ! OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/Device','sap/ui/mdc/Element','sap/m/library','sap/m/ResponsivePopover'],function(D,E,m,R){"use strict";var P=m.PlacementType;var F=E.extend("sap.ui.mdc.field.FieldInfoBase",{metadata:{library:"sap.ui.mdc",events:{dataUpdate:{},popoverAfterOpen:{}}}});F.prototype.isTriggerable=function(){throw new Error("sap.ui.mdc.field.FieldInfoBase: method isTriggerable must be redefined");};F.prototype.getTriggerHref=function(){throw new Error("sap.ui.mdc.field.FieldInfoBase: method getTriggerHref must be redefined");};F.prototype.getDirectLinkHrefAndTarget=function(){throw new Error("sap.ui.mdc.field.FieldInfoBase: method getDirectLinkHrefAndTarget must be redefined");};F.prototype.open=function(c){var p=this.getParent();if(!p){throw new Error("sap.ui.mdc.field.FieldInfoBase: popover can not be open because the control is undefined");}if(this._oPopover&&this._oPopover.isOpen()){return Promise.resolve();}return this.createPopover().then(function(o){this._oPopover=o;this.addDependent(this._oPopover);this._oPopover.openBy(c||p);this._oPopover.attachAfterOpen(function(){this.firePopoverAfterOpen();}.bind(this));}.bind(this));};F.prototype.getContent=function(g){throw new Error("sap.ui.mdc.field.FieldInfoBase: method getContent must be redefined");};F.prototype.getSourceControl=function(){return this.getParent();};F.prototype.createPopover=function(){var p;return this.getContent(function(){return p;}).then(function(o){p=new R(this.getId()+"-popover",{contentWidth:"380px",horizontalScrolling:false,showHeader:D.system.phone,placement:P.Auto,content:[o],afterClose:function(){if(this._oPopover){this._oPopover.destroy();}}.bind(this)});sap.ui.require(['sap/ui/fl/apply/api/FlexRuntimeInfoAPI'],function(a){if(a.isFlexSupported({element:o})){a.waitForChanges({element:o}).then(function(){p.addAriaLabelledBy(o.getContentTitle?o.getContentTitle():"");});}else{p.addAriaLabelledBy(o.getContentTitle?o.getContentTitle():"");}});return p;}.bind(this));};return F;});