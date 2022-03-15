/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define([
	"../../ValueHelpDelegate",
	"sap/ui/model/FilterType"
], function(
	ValueHelpDelegate,
	FilterType
) {
	"use strict";

	var ODataV4ValueHelpDelegate = Object.assign({}, ValueHelpDelegate);

	ODataV4ValueHelpDelegate.isSearchSupported = function(oPayload, oListBinding) {
		return true; // only on V4
	};

	var _waitForBindingData = function (oBinding) {
		return new Promise(function (resolve) {
			var _bIsExecutionComplete = false;
			var fnHandleBindingEvent = function (oParameters) {
				if (oParameters.mParameters.detailedReason) { // do not consider virtualcontext events triggered during automatic determination of $expand and $select
					return;
				}

				if (!_bIsExecutionComplete) {
					_bIsExecutionComplete = true;
					oBinding.detachEvent("change", fnHandleBindingEvent);
					resolve(oBinding);
				}
			};
			oBinding.attachEvent("change", fnHandleBindingEvent); // Note: According to an earlier change the change event may not always be fired in some scenarios
			oBinding.attachEventOnce("dataReceived", fnHandleBindingEvent); // Note: According to an earlier change the dataReceived event may not always be fired in some caching scenarios
		});
	};

	ODataV4ValueHelpDelegate.executeSearch = function(oPayload, oListBinding, sSearch) {

		if (sSearch) {
			oListBinding.changeParameters({ $search: sSearch });
		} else {
			oListBinding.changeParameters({ $search: undefined });
		}

		return _waitForBindingData(oListBinding);

	};

	ODataV4ValueHelpDelegate.executeFilter = function(oPayload, oListBinding, oFilter, iRequestedItems) {

		oListBinding.initialize();
		oListBinding.filter(oFilter, FilterType.Application);
		oListBinding.getContexts(0, iRequestedItems); // trigger request. not all entries needed, we only need to know if there is one, none or more

		return _waitForBindingData(oListBinding);
	};

	ODataV4ValueHelpDelegate.checkBindingsPending = function(oPayload, aBindings) {

		var aPromises = [];

		for (var i = 0; i < aBindings.length; i++) {
			var oBinding = aBindings[i];
			if (oBinding && oBinding.requestValue) {
				aPromises.push(oBinding.requestValue());
			}
		}

		if (aPromises.length > 0) {
			return Promise.all(aPromises);
		}

		return null;

	};

	ODataV4ValueHelpDelegate.checkListBindingPending = function(oPayload, oListBinding, oListBindingInfo) {

		if (!oListBinding || oListBinding.isSuspended()) {
			return false;
		}

		return oListBinding.requestContexts(0, oListBindingInfo && oListBindingInfo.length).then(function(aContexts){	// TODO: never resolves for mdc.table and prevents loading??
			return aContexts.length === 0;
		});

	};

	return ODataV4ValueHelpDelegate;
});