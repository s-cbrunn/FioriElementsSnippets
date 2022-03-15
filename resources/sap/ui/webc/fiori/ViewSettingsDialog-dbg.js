/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides control sap.ui.webc.fiori.ViewSettingsDialog.
sap.ui.define([
	"sap/ui/webc/common/WebComponent",
	"./library",
	"./thirdparty/ViewSettingsDialog"
], function(WebComponent, library) {
	"use strict";

	/**
	 * Constructor for a new <code>ViewSettingsDialog</code>.
	 *
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 *
	 * @extends sap.ui.webc.common.WebComponent
	 * @class
	 *
	 * <h3>Overview</h3> The <code>sap.ui.webc.fiori.ViewSettingsDialog</code> component helps the user to sort data within a list or a table. It consists of several lists like <code>Sort order</code> which is built-in and <code>Sort By</code> which must be provided by the developer. The selected options can be used to create sorters for the table.
	 *
	 * The <code>sap.ui.webc.fiori.ViewSettingsDialog</code> interrupts the current application processing as it is the only focused UI element and the main screen is dimmed/blocked. The <code>sap.ui.webc.fiori.ViewSettingsDialog</code> is modal, which means that user action is required before returning to the parent window is possible.
	 *
	 * <h3>Structure</h3> A <code>sap.ui.webc.fiori.ViewSettingsDialog</code> consists of a header, content, and a footer for action buttons. The <code>sap.ui.webc.fiori.ViewSettingsDialog</code> is usually displayed at the center of the screen.
	 *
	 * <h3>Responsive Behavior</h3> <code>sap.ui.webc.fiori.ViewSettingsDialog</code> stretches on full screen on phones.
	 *
	 * @author SAP SE
	 * @version 1.96.6
	 *
	 * @constructor
	 * @public
	 * @since 1.92.0
	 * @experimental Since 1.92.0 This control is experimental and its API might change significantly.
	 * @alias sap.ui.webc.fiori.ViewSettingsDialog
	 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
	 */
	var ViewSettingsDialog = WebComponent.extend("sap.ui.webc.fiori.ViewSettingsDialog", {
		metadata: {
			library: "sap.ui.webc.fiori",
			tag: "ui5-view-settings-dialog-ui5",
			properties: {

				/**
				 * Defines the initial sort order.
				 */
				sortDescending: {
					type: "boolean",
					defaultValue: false
				}
			},
			aggregations: {

				/**
				 * Defines the <code>sortItems</code> list.
				 */
				sortItems: {
					type: "sap.ui.webc.main.IListItem",
					multiple: true,
					slot: "sortItems"
				}
			},
			events: {

				/**
				 * Fired when cancel button is activated.
				 */
				cancel: {
					parameters: {
						/**
						 * The current sort order selected.
						 */
						sortOrder: {
							type: "string"
						},

						/**
						 * The current sort by selected.
						 */
						sortBy: {
							type: "string"
						}
					}
				},

				/**
				 * Fired when confirmation button is activated.
				 */
				confirm: {
					parameters: {
						/**
						 * The current sort order selected.
						 */
						sortOrder: {
							type: "string"
						},

						/**
						 * The current sort by selected.
						 */
						sortBy: {
							type: "string"
						}
					}
				}
			},
			methods: ["show"]
		}
	});

	/**
	 * Shows the dialog.
	 * @public
	 * @name sap.ui.webc.fiori.ViewSettingsDialog#show
	 * @function
	 */

	return ViewSettingsDialog;
});