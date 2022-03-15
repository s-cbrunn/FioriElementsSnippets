/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define([
], function(
) {
	"use strict";

	var RenameVisualization = {};

	/**
	 * Creates a localized description for rename changes based on the provided
	 * change handler payload or the current element label.
	 *
	 * @param {object} mPayload - Change visualization payload from the change handler
	 * @param {string} [mPayload.originalLabel] - Label before the change was applied
	 * @param {object} [mPayload.newLabel] - Label after the change was applied
	 * @param {string} sFallbackLabel - New label as a fallback if change handler provides no info
	 * @returns {string} Localized description
	 */
	RenameVisualization.getDescription = function (mPayload, sFallbackLabel) {
		var oRtaResourceBundle = sap.ui.getCore().getLibraryResourceBundle("sap.ui.rta");
		var sKey = mPayload.originalLabel
			? "TXT_CHANGEVISUALIZATION_CHANGE_RENAME_FROM_TO"
			: "TXT_CHANGEVISUALIZATION_CHANGE_RENAME_TO";
		return oRtaResourceBundle.getText(
			sKey,
			[
				mPayload.newLabel || sFallbackLabel,
				mPayload.originalLabel
			]
		);
	};

	return RenameVisualization;
});