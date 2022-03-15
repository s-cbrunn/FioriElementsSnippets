/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([
	"./SelectFilter",
	"./DateRangeFilter",
	"sap/ui/base/Object",
	"sap/m/library",
	"sap/m/HBox"
], function (
	SelectFilter,
	DateRangeFilter,
	BaseObject,
	mLibrary,
	HBox
) {
	"use strict";

	var FlexWrap = mLibrary.FlexWrap;

	var RenderType = mLibrary.FlexRendertype;

	/**
	 * Constructor for a card Filter bar.
	 *
	 * @class
	 *
	 * @extends sap.ui.base.Object
	 *
	 * @author SAP SE
	 * @version 1.96.6
	 *
	 * @constructor
	 * @private
	 * @since 1.84
	 * @alias sap.ui.integration.util.FilterBarFactory
	 */
	var FilterBarFactory = BaseObject.extend("sap.ui.integration.util.FilterBarFactory", {
		metadata: {
			library: "sap.ui.integration"
		},
		constructor: function (oCard) {
			BaseObject.call(this);

			this._oCard = oCard;
		}
	});

	/**
	 * Creates a new filter bar which holds fields for filtering.
	 * Each field is bound to the given model.
	 *
	 * @param {map} mFiltersConfig A map of the parameters config - the same that is defined in sap.card/configuration/filters.
	 * @param {sap.ui.model.json.JSONModel} oModel The model for filters.
	 * @returns {sap.m.HBox} The Filter bar.
	 */
	FilterBarFactory.prototype.create = function (mFiltersConfig, oModel) {
		var aFilters = [],
			aReadyPromises = [],
			mConfig,
			sKey,
			oFilter,
			oFilterBarStrip,
			FilterClass = null;

		for (sKey in mFiltersConfig) {
			mConfig = mFiltersConfig[sKey];
			FilterClass = this._getClass(mConfig.type);

			oFilter = new FilterClass({
				card: this._oCard,
				key: sKey,
				config: mConfig,
				value: {
					model: "filters",
					path: "/" + sKey
				}
			});

			oModel.setProperty("/" + sKey, oFilter.getValueForModel());

			this._awaitEvent(aReadyPromises, oFilter, "_ready");
			oFilter._setDataConfiguration(mConfig.data);

			aFilters.push(oFilter);
		}

		if (!aFilters.length) {
			return null;
		}

		for (var i = 0; i < aFilters.length - 1; i++) {
			aFilters[i].addStyleClass("sapUiTinyMarginEnd");
		}

		oFilterBarStrip = new HBox({
			wrap: FlexWrap.Wrap,
			renderType: RenderType.Bare,
			items: aFilters
		});

		Promise.all(aReadyPromises).then(function () {
			oFilterBarStrip.fireEvent("_filterBarDataReady");
		});

		return oFilterBarStrip;
	};

	/**
	 * Await for an event on a filter.
	 *
	 * @private
	 * @param {Promise[]} aPromises Array of promises that receives a new Promise
	 * @param {sap.ui.integration.cards.Filter} oFilter Filter instance that throws the event
	 * @param {string} sEvent Name of the event
	 */
	FilterBarFactory.prototype._awaitEvent = function (aPromises, oFilter, sEvent) {
		aPromises.push(new Promise(function (resolve) {
			oFilter.attachEventOnce(sEvent, function () {
				resolve();
			});
		}));
	};

	FilterBarFactory.prototype._getClass = function (sType) {
		sType = sType || "select";

		switch (sType.toLowerCase()) {
			case "string": // backwards compatibility
			case "integer": // backwards compatibility
			case "select":
				return SelectFilter;
			case "daterange":
				return DateRangeFilter;
			default:
				return undefined;
		}
	};

	return FilterBarFactory;
});