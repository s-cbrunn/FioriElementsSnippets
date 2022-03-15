/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([
	"sap/ui/base/Object",
	"sap/ui/integration/util/ServiceDataProvider",
	"sap/ui/integration/util/RequestDataProvider",
	"sap/ui/integration/util/CacheAndRequestDataProvider",
	"sap/ui/integration/util/DataProvider",
	"sap/ui/integration/util/ExtensionDataProvider",
	"sap/ui/integration/util/JSONBindingHelper",
	"sap/ui/integration/util/BindingHelper"
],
function (BaseObject, ServiceDataProvider, RequestDataProvider, CacheAndRequestDataProvider, DataProvider, ExtensionDataProvider, JSONBindingHelper, BindingHelper) {
"use strict";

	/**
	 * @class
	 * A factory class which creates a data provider based on data settings and stores the created instance.
	 * When destroyed, all data providers created by this class are also destroyed.
	 *
	 * @author SAP SE
	 * @version 1.96.6
	 *
	 * @private
	 * @ui5-restricted sap.ui.integration, shell-toolkit
	 * @since 1.65
	 * @alias sap.ui.integration.util.DataProviderFactory
	 */
	var DataProviderFactory = BaseObject.extend("sap.ui.integration.util.DataProviderFactory", {
		constructor: function (oDestinations, oExtension, oCard, oEditor, oHost) {
			BaseObject.call(this);
			this._oDestinations = oDestinations;
			this._oExtension = oExtension;
			this._oCard = oCard;
			this._oEditor = oEditor;
			this._oHost = oHost;

			this._aDataProviders = [];
			this._aFiltersProviders = [];
		}
	});

	/**
	 * @private
	 * @ui5-restricted sap.ui.integration, shell-toolkit
	 */
	DataProviderFactory.prototype.destroy = function () {
		BaseObject.prototype.destroy.apply(this, arguments);

		if (this._aDataProviders) {
			this._aDataProviders.forEach(function(oDataProvider) {
				if (!oDataProvider.bIsDestroyed) {
					oDataProvider.destroy();
				}
			});

			this._aDataProviders = null;
			this._aFiltersProviders = null;
		}

		this._oCard = null;
		this._oExtension = null;
		this._bIsDestroyed = true;
	};

	/**
	 * Returns if this factory is destroyed.
	 *
	 * @private
	 * @ui5-restricted sap.ui.integration, shell-toolkit
	 * @returns {boolean} if this manifest is destroyed
	 */
	DataProviderFactory.prototype.isDestroyed = function () {
		return this._bIsDestroyed;
	};

	/**
	 * Factory function which returns an instance of <code>DataProvider</code>.
	 *
	 * @param {Object} oDataSettings The data settings.
	 * @param {sap.ui.integration.util.ServiceManager} oServiceManager A reference to the service manager.
	 * @private
	 * @ui5-restricted sap.ui.integration, shell-toolkit
	 * @returns {sap.ui.integration.util.DataProvider|null} A data provider instance used for data retrieval.
	 */
	DataProviderFactory.prototype.create = function (oDataSettings, oServiceManager, bIsFilter) {
		var oCard = this._oCard,
			oEditor = this._oEditor,
			oHost = this._oHost || (oCard && oCard.getHostInstance()) || (oEditor && oEditor.getHostInstance()),
			bUseExperimentalCaching = oHost && oHost.bUseExperimentalCaching,
			oConfig,
			oDataProvider;

		if (!oDataSettings) {
			return null;
		}

		if (oCard) {
			oConfig = {
				"baseRuntimeUrl": oCard.getRuntimeUrl("/"),
				"settingsJson": JSONBindingHelper.createJsonWithBindingInfos(oDataSettings, oCard.getBindingNamespaces())
			};
		} else if (oEditor) {
			oConfig = {
				"baseRuntimeUrl": oEditor.getRuntimeUrl("/"),
				"settingsJson": JSONBindingHelper.createJsonWithBindingInfos(oDataSettings, oEditor.getBindingNamespaces())
			};
		} else {
			oConfig = {
				"settingsJson": JSONBindingHelper.createJsonWithBindingInfos(oDataSettings, {})
			};
		}

		if (oDataSettings.request && bUseExperimentalCaching) {
			oDataProvider = new CacheAndRequestDataProvider(oConfig);
			oDataProvider.setCard(oCard);
			oDataProvider.setHost(oHost);
		} else if (oDataSettings.request) {
			oDataProvider = new RequestDataProvider(oConfig);
		} else if (oDataSettings.service) {
			oDataProvider = new ServiceDataProvider(oConfig);
		} else if (oDataSettings.json) {
			oDataProvider = new DataProvider(oConfig);
		} else if (oDataSettings.extension) {
			oDataProvider = new ExtensionDataProvider(oConfig, this._oExtension);
		} else {
			return null;
		}

		if (oCard) {
			BindingHelper.propagateModels(oCard, oDataProvider);
		} else if (oEditor) {
			BindingHelper.propagateModels(oEditor, oDataProvider);
		}
		oDataProvider.bindObject("/");

		oDataProvider.setDestinations(this._oDestinations);

		if (oDataProvider.isA("sap.ui.integration.util.IServiceDataProvider")) {
			oDataProvider.createServiceInstances(oServiceManager);
		}

		this._aDataProviders.push(oDataProvider);

		if (bIsFilter) {
			this._aFiltersProviders.push(oDataProvider);
		} else {
			oDataProvider.setDependencies(this._aFiltersProviders);
		}

		return oDataProvider;
	};

	/**
	 * Removes a DataProvider from Factory's registry.
	 *
	 * @param oDataProvider {sap.ui.integration.util.DataProvider}
	 * @private
	 * @ui5-restricted sap.ui.integration, shell-toolkit
	 * @experimental
	 */
	DataProviderFactory.prototype.remove = function (oDataProvider) {
		var iProviderIndex = this._aDataProviders.indexOf(oDataProvider);

		if (iProviderIndex > -1) {
			this._aDataProviders.splice(iProviderIndex, 1);
		}

		if (oDataProvider && !oDataProvider.bDestroyed && oDataProvider._bIsDestroyed) {
			oDataProvider.destroy();
		}
	};

	return DataProviderFactory;
});