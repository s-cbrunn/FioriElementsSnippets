/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides control sap.ui.mdc.filterbar.FilterItemLayout.
sap.ui.define([
	'sap/ui/mdc/filterbar/IFilterContainer','sap/m/Table', 'sap/m/Column', 'sap/m/Text', 'sap/m/VBox'
], function(IFilterContainer, Table, Column, Text, VBox) {
	"use strict";

	/**
	 * Constructor for a new filterBar/p13n/TableContainer.
     * Used for a simple FilterBar table like view, should be used in combination with <code>FilterCellLayout</code>
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @class The TableContainer is a IFilterContainer implementation for <code>sap.m.Table</code>
	 * @extends sap.ui.mdc.filterbar.IFilterContainer
	 * @constructor
	 * @private
	 * @since 1.80.0
	 * @alias sap.ui.mdc.filterbar.p13n.TableContainer
	 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
	 */
	var TableContainer = IFilterContainer.extend("sap.ui.mdc.filterbar.p13n.TableContainer");

	TableContainer.prototype.init = function() {
		IFilterContainer.prototype.init.apply(this, arguments);
		var oRB = sap.ui.getCore().getLibraryResourceBundle("sap.ui.mdc");
		this._oTable = new Table({
			sticky: ["ColumnHeaders"],
			growing: true,
			columns: [
				new Column({
					header: new Text({
						text: oRB.getText("filter.AdaptationFilterBar_FIELD_COLUMN")
					})
				}),
				new Column({
					header: new Text({
						text: oRB.getText("filter.AdaptationFilterBar_FIELD_VALUE_COLUMN")
					})
				})
			]
		});

		this._oMessageStripContainer = new VBox(this.getId() + "-messageStripContainer");

		this.oLayout = new VBox({
			items: [
				this._oMessageStripContainer,
				this._oTable
			]
		});
	};

	TableContainer.prototype.insertFilterField = function(oControl, iIndex) {
		this._oTable.insertItem(oControl, iIndex);
	};

	TableContainer.prototype.removeFilterField = function(oControl) {
		this._oTable.removeItem(oControl);
	};

	TableContainer.prototype.setMessageStrip = function(oStrip) {
		this._oMessageStripContainer.removeAllItems();
		this._oMessageStripContainer.addItem(oStrip);
	};

	TableContainer.prototype.getFilterFields = function() {
		return this._oTable.getItems();
	};

	TableContainer.prototype.update = function() {
		//Called when the UI model is being set - trigger update logic here
	};

	TableContainer.prototype.exit = function() {
		this._oTable = null;
		this._oMessageStripContainer = null;
	};

	return TableContainer;
});