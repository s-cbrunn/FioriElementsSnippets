/*
* ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
*/
sap.ui.define([
	"sap/ui/base/Object",
	"sap/base/util/merge",
	"sap/ui/core/util/reflection/JsControlTreeModifier"
], function(BaseObject, merge, JsControlTreeModifier) {
	"use strict";

	var oModificationHandler;

	/**
	 *  @class Interface to implement different modification layers
	 *  (E.g. Flex-explicit, Flex-implicit, transient)
	 *
	 *
	 * @author SAP SE
	 * @private
	 * @since 1.87.0
	 * @experimental As of version 1.87.0
	 * @ui5-restricted sap.ui.mdc
	 * @alias sap.ui.mdc.p13n.modification.ModificationHandler
	 */
	var ModificationHandler = BaseObject.extend("sap.ui.mdc.p13n.modification.ModificationHandler");

	/**
	 * Should implement the appliance of changes
	 *
	 * @param {array} aChanges An array of changes
	 * @param {object} oModificationPayload An object providing a modification handler specific payload
	 * @returns {Promise} Returns a <code>Promise</code> reflecting change processing
	 */
	ModificationHandler.prototype.processChanges = function(aChanges, oModificationPayload){
		return Promise.resolve();
	};

	/**
	 * Should implement a function that returns a promise resolving
	 * after the current pending changes have been applied.
	 *
	 * @param {object} mPropertyBag A propertybag containing modification specific configuration
	 * @param {sap.ui.core.Element} mPropertyBag.element The according element which should be checked
	 * @param {object} oModificationPayload An object providing a modification handler specific payload
	 * @returns {Promise} Returns a <code>Promise</code> reflecting change appliance

	 */
	ModificationHandler.prototype.waitForChanges = function(mPropertyBag, oModificationPayload) {
		return Promise.resolve();
	};

	/**
	 * Should implement a function that returns a promise resolving
	 * after the current pending changes have been reset.
	 *
	 * @param {object} mPropertyBag A propertybag containing modification specific configuration
	 * @param {sap.ui.core.Element} mPropertyBag.selector The according element which should be checked
	 * @param {object} oModificationPayload An object providing a modification handler specific payload
	 * @returns {Promise} Returns a <code>Promise</code> reflecting the reset execution
	 */
	ModificationHandler.prototype.reset = function(mPropertyBag, oModificationPayload) {
		return Promise.resolve();
	};

	/**
	 * Should implement a function that returns information ont modification support
	 *
	 * @param {object} mPropertyBag A propertybag containing modification specific configuration
	 * @param {sap.ui.core.Element} mPropertyBag.selector The according element which should be checked
	 * @param {object} oModificationPayload An object providing a modification handler specific payload
 	 * @returns {boolean} reflects the modification support state
	 */
	ModificationHandler.prototype.isModificationSupported = function(mPropertyBag, oModificationPayload){
		return false;
	};

	/**
	 * Enhances the $aggregactionconfig object for a given mdc control instance.
	 *
	 * @param {sap.ui.core.Element} oControl The according element which should be checked
	 * @param {object} oModificationPayload An object providing a modification handler specific payload
	 * @param {object} oModificationPayload.name The affected property name
	 * @param {object} oModificationPayload.controlMeta Object describing which config is affected
	 * @param {object} oModificationPayload.controlMeta.aggregation The affected aggregation name (such as <code>columns</code> or <code>filterItems</code>)
	 * @param {object} oModificationPayload.controlMeta.property The affected property name (such as <code>width</code> or <code>lable</code>)
	 * @param {object} oModificationPayload.value The value that should be written in nthe xConfig
	 * @param {object} [oModificationPayload.propertyBag] Optional propertybag for different modification handler derivations
	 *
	 * @returns {Promise<object>} Promise resolving to the adapted xConfig object
	 */
	ModificationHandler.prototype.enhanceConfig = function(oControl, oModificationPayload) {
		var mPropertyBag = oModificationPayload.propertyBag;
		var oModifier = mPropertyBag ? mPropertyBag.modifier : JsControlTreeModifier;
		var sPropertyInfoKey = oModificationPayload.name;
		var mControlMeta = oModificationPayload.controlMeta;

		var sAffectedAggregation = mControlMeta.aggregation;
		var sAffectedProperty = mControlMeta.property;

		var vValue = oModificationPayload.value;
		var oControlMetadata;
		var sAggregationName;
		var oXConfig;

		return oModifier.getControlMetadata(oControl)
			.then(function(oRetrievedControlMetadata) {
				oControlMetadata = oRetrievedControlMetadata;
				sAggregationName = sAffectedAggregation ? sAffectedAggregation : oControlMetadata.getDefaultAggregation().name;
				return oModifier.getAggregation(oControl, "customData");
			})
			.then(function(aCustomData) {

				return Promise.all(aCustomData.map(function(oCustomData){
					return oModifier.getProperty(oCustomData, "key");
				})).then(function(aCustomDataKeys){
					return aCustomData.reduce(function(oResult, mCustomData, iIndex){
						return aCustomDataKeys[iIndex] === "xConfig" ? mCustomData : oResult;
					}, undefined);
				});
			})
			.then(function(oRetrievedXConfig) {
				oXConfig = oRetrievedXConfig;
				if (oXConfig) {
					return oModifier.getProperty(oXConfig, "value");
				}
				return {
					aggregations: {}
				};
			})
			.then(function(oConfig) {
				if (!oConfig.aggregations.hasOwnProperty(sAggregationName)) {
					if (oControlMetadata.hasAggregation(sAggregationName)) {
						oConfig.aggregations[sAggregationName] = {};
					} else {
						throw new Error("The aggregation " + sAggregationName + " does not exist for" + oControl);
					}
				}

				if (!oConfig.aggregations.hasOwnProperty(sPropertyInfoKey)) {
					oConfig.aggregations[sAggregationName][sPropertyInfoKey] = {};
				}

				if (vValue !== null) {
					oConfig.aggregations[sAggregationName][sPropertyInfoKey][sAffectedProperty] = vValue;
				} else {
					delete oConfig.aggregations[sAggregationName][sPropertyInfoKey][sAffectedProperty];

					//Delete empty property name object
					if (Object.keys(oConfig.aggregations[sAggregationName][sPropertyInfoKey]).length === 0) {
						delete oConfig.aggregations[sAggregationName][sPropertyInfoKey];

						//Delete empty aggregation name object
						if (Object.keys(oConfig.aggregations[sAggregationName]).length === 0) {
							delete oConfig.aggregations[sAggregationName];
						}
					}
				}

				var oAppComponent = mPropertyBag ? mPropertyBag.appComponent : undefined;

				if (!oControl._bHasXConfig) {
					oControl._bHasXConfig = true;
					return oModifier.createAndAddCustomData(oControl, "xConfig", oConfig, oAppComponent)
					.then(function() {
						return oConfig;
					});
				} else {
					oModifier.setProperty(oXConfig, "value", oConfig);
					return oConfig;
				}
			});
	};

	/**
	 * Returns a copy of the xConfig object
	 *
	 * @param {sap.ui.core.Element} oControl The according element which should be checked
	 * @param {object} [oModificationPayload] An object providing a modification handler specific payload
	 * @param {object} [oModificationPayload.propertyBag] Optional propertybag for different modification handler derivations
	 *
	 * @returns {Promise<object>|object} A promise resolving to the adapted xConfig object or the object directly
	 */
	ModificationHandler.prototype.readConfig = function(oControl, oModificationPayload) {
		var oConfig, oAggregationConfig;

		if (oModificationPayload) {
			var oModifier = oModificationPayload.propertyBag ? oModificationPayload.propertyBag.modifier : JsControlTreeModifier;
			return oModifier.getAggregation(oControl, "customData")
				.then(function(aCustomData) {
					return Promise.all(aCustomData.map(function(oCustomData){
						return oModifier.getProperty(oCustomData, "key");
					})).then(function(aCustomDataKeys){
						return aCustomData.reduce(function(oResult, mCustomData, iIndex){
							return aCustomDataKeys[iIndex] === "xConfig" ? mCustomData : oResult;
						}, undefined);
					});
				})
				.then(function(oAggregationConfig) {
					if (oAggregationConfig) {
						return oModifier.getProperty(oAggregationConfig, "value")
							.then(function(oValue) {
								return merge({}, oValue);
							});
					}
					return null;
				});
		}

		// These functions are used instead of the modifier to avoid that the
		// entire call stack is changed to async when it's not needed
		var fnGetAggregationSync = function(oParent, sAggregationName) {
			var fnFindAggregation = function(oControl, sAggregationName) {
				if (oControl) {
					if (oControl.getMetadata) {
						var oMetadata = oControl.getMetadata();
						var oAggregations = oMetadata.getAllAggregations();
						if (oAggregations) {
							return oAggregations[sAggregationName];
						}
					}
				}
				return undefined;
			};

			var oAggregation = fnFindAggregation(oParent, sAggregationName);
			if (oAggregation) {
				return oParent[oAggregation._sGetter]();
			}
			return undefined;
		};

		var fnGetPropertySync = function(oControl, sPropertyName) {
			var oMetadata = oControl.getMetadata().getPropertyLikeSetting(sPropertyName);
			if (oMetadata) {
				var sPropertyGetter = oMetadata._sGetter;
				return oControl[sPropertyGetter]();
			}
			return undefined;
		};

		oAggregationConfig = fnGetAggregationSync(oControl, "customData").find(function(oCustomData){
			return fnGetPropertySync(oCustomData, "key") == "xConfig";
		});
		oConfig = oAggregationConfig ? merge({}, fnGetPropertySync(oAggregationConfig, "value")) : null;
		return oConfig;
	};

	ModificationHandler.getInstance = function() {
		if (!oModificationHandler){
			oModificationHandler = new ModificationHandler();
		}
		return oModificationHandler;
	};

	return ModificationHandler;
});
