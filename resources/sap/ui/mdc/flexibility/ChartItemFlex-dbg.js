/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define([
	'./ItemBaseFlex'
], function(ItemBaseFlex) {
	"use strict";

	var oChartItemFlex = Object.assign({}, ItemBaseFlex);

	oChartItemFlex.beforeAddItem = function(Delegate, sDataPropertyName, oControl, mPropertyBag, oChangeContent) {
		return Delegate.addItem.call(Delegate, sDataPropertyName, oControl, mPropertyBag, oChangeContent.role);
	};

	oChartItemFlex.findItem = function(oModifier, aItems, sName) {
		return aItems.reduce(function(oPreviousPromise, oItem) {
			return oPreviousPromise
				.then(function(oFoundItem) {
					if (!oFoundItem) {
						return Promise.all([
							oModifier.getProperty(oItem, "key"),
							oModifier.getProperty(oItem, "name") // for chart remake
						])
						.then(function(aProperties) {
							if (aProperties[0] === sName || aProperties[1] === sName) {
								return oItem;
							}
						});
					}
					return oFoundItem;
				});
		}, Promise.resolve());
	};

	oChartItemFlex.addItem = oChartItemFlex.createAddChangeHandler();
	oChartItemFlex.removeItem = oChartItemFlex.createRemoveChangeHandler();
	oChartItemFlex.moveItem = oChartItemFlex.createMoveChangeHandler();

	return oChartItemFlex;

});