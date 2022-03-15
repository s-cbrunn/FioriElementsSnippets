/*!
* OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
*/
sap.ui.define(["sap/ui/integration/library","./ListContentItemRenderer","sap/m/Avatar","sap/m/AvatarShape","sap/m/AvatarSize","sap/m/StandardListItem"],function(l,L,A,a,b,S){"use strict";var c=l.AttributesLayoutType;var d=S.extend("sap.ui.integration.controls.ListContentItem",{metadata:{library:"sap.ui.integration",properties:{iconAlt:{type:"string",defaultValue:""},iconDisplayShape:{type:"sap.m.AvatarShape",defaultValue:a.Square},iconInitials:{type:"string",defaultValue:""},iconSize:{type:"sap.m.AvatarSize",defaultValue:b.XS},iconBackgroundColor:{type:"sap.m.AvatarColor"},attributesLayoutType:{type:"sap.ui.integration.AttributesLayoutType",defaultValue:c.TwoColumns}},aggregations:{microchart:{type:"sap.ui.integration.controls.Microchart",multiple:false},actionsStrip:{type:"sap.ui.integration.controls.ActionsStrip",multiple:false},attributes:{type:"sap.m.ObjectStatus",multiple:true},_avatar:{type:"sap.m.Avatar",multiple:false,visibility:"hidden"}}},renderer:L});d.prototype._getAvatar=function(){var o=this.getAggregation("_avatar");if(!o){o=new A().addStyleClass("sapFCardIcon");this.setAggregation("_avatar",o);}o.setSrc(this.getIcon()).setDisplayShape(this.getIconDisplayShape()).setTooltip(this.getIconAlt()).setInitials(this.getIconInitials()).setDisplaySize(this.getIconSize()).setBackgroundColor(this.getIconBackgroundColor());return o;};return d;});
