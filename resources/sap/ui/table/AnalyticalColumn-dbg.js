/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides control sap.ui.table.AnalyticalColumn.
sap.ui.define([
	'./Column',
	'./library',
	'sap/ui/core/Element',
	'sap/ui/model/type/Boolean',
	'sap/ui/model/type/DateTime',
	'sap/ui/model/type/Float',
	'sap/ui/model/type/Integer',
	'sap/ui/model/type/Time',
	'./utils/TableUtils',
	'./AnalyticalColumnMenu'
],
	function(
		Column,
		library,
		Element,
		BooleanType,
		DateTime,
		Float,
		Integer,
		Time,
		TableUtils,
		AnalyticalColumnMenu
	) {
	"use strict";

	function isInstanceOfAnalyticalTable(oControl) {
		return TableUtils.isA(oControl, "sap.ui.table.AnalyticalTable");
	}

	/**
	 * Constructor for a new AnalyticalColumn.
	 *
	 * @param {string} [sId] id for the new control, generated automatically if no id is given
	 * @param {object} [mSettings] initial settings for the new control
	 *
	 * @class
	 * This column adds additional properties to the table column which are needed for the analytical binding and table
	 * @extends sap.ui.table.Column
	 *
	 * @author SAP SE
	 * @version 1.84.19
	 *
	 * @constructor
	 * @public
	 * @experimental Since version 1.21.
	 * @alias sap.ui.table.AnalyticalColumn
	 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
	 */
	var AnalyticalColumn = Column.extend("sap.ui.table.AnalyticalColumn", /** @lends sap.ui.table.AnalyticalColumn.prototype */ { metadata : {

		library : "sap.ui.table",
		properties : {

			/**
			 * Defines the primary model property which is used inside the Column. In case of the analytical extension this means the property which is grouped by for dimensions or the property which is summed for measures.
			 */
			leadingProperty : {type : "string", group : "Misc", defaultValue : null},

			/**
			 * If defined a sum for this column is calculated
			 */
			summed : {type : "boolean", group : "Misc", defaultValue : false},

			/**
			 * Specifies that the dimension referred to by the column shall be included in the granularity of the data result. It allows a finer distinction between a visible/grouped/(included)inResult column.
			 */
			inResult : {type : "boolean", group : "Misc", defaultValue : false},

			/**
			 * Specifies whether the column is displayed within the table even if it is grouped or not. A grouped column has the same value for every rows within the group.
			 */
			showIfGrouped : {type : "boolean", group : "Appearance", defaultValue : false},

			/**
			 * If the column is grouped, this formatter is used to format the value in the group header
			 */
			groupHeaderFormatter : {type : "any", group : "Behavior", defaultValue : null}
		}
	}});

	/**
	 * map of filtertypes for re-use in getFilterType
	 * @private
	 */
	AnalyticalColumn._DEFAULT_FILTERTYPES = {
		"Time": new Time({UTC: true}),
		"DateTime": new DateTime({UTC: true}),
		"Float": new Float(),
		"Integer": new Integer(),
		"Boolean": new BooleanType()
	};

	/*
	 * Factory method. Creates the column menu.
	 *
	 * @returns {sap.ui.table.AnalyticalColumnMenu} The created column menu.
	 */
	AnalyticalColumn.prototype._createMenu = function() {
		return new AnalyticalColumnMenu(this.getId() + "-menu");
	};

	AnalyticalColumn.prototype.setGrouped = function(bGrouped, bSuppressInvalidate) {
		var oParent = this.getParent();

		if (isInstanceOfAnalyticalTable(oParent)) {
			if (bGrouped) {
				oParent._addGroupedColumn(this.getId());
			} else {
				oParent._removeGroupedColumn(this.getId());
			}
		}

		var bReturn = this.setProperty("grouped", bGrouped, bSuppressInvalidate);
		this._updateColumns();

		return bReturn;
	};

	AnalyticalColumn.prototype.setSummed = function(bSummed) {
		var bReturn = this.setProperty("summed", bSummed, true);
		this._updateTableAnalyticalInfo();
		return bReturn;
	};

	/*
	 * @see JSDoc generated by SAPUI5 control API generator
	 */
	AnalyticalColumn.prototype.setVisible = function(bVisible) {
		Column.prototype.setVisible.call(this, bVisible);
		this._updateColumns();
		return this;
	};

	/*
	 * @see JSDoc generated by SAPUI5 control API generator
	 */
	AnalyticalColumn.prototype.getLabel = function() {
		var oLabel = this.getAggregation("label");
		if (!oLabel) {
			if (!this._oBindingLabel) {
				var oParent = this.getParent();
				if (isInstanceOfAnalyticalTable(oParent)) {
					var oBinding = oParent.getBinding("rows");
					if (oBinding) {
						this._oBindingLabel = library.TableHelper.createLabel();
						this.addDependent(this._oBindingLabel);
						TableUtils.Binding.metadataLoaded(oParent).then(function() {
							this._oBindingLabel.setText(oBinding.getPropertyLabel(this.getLeadingProperty()));
						}.bind(this));
					}
				}
			}
			oLabel = this._oBindingLabel;
		}
		return oLabel;
	};

	/*
	 * @see JSDoc generated by SAPUI5 control API generator
	 */
	AnalyticalColumn.prototype.getFilterProperty = function() {
		var sProperty = this.getProperty("filterProperty");
		if (!sProperty) {
			var oParent = this.getParent();
			if (isInstanceOfAnalyticalTable(oParent)) {
				var oBinding = oParent.getBinding("rows");
				var sLeadingProperty = this.getLeadingProperty();
				if (oBinding && oBinding.getFilterablePropertyNames().indexOf(sLeadingProperty) > -1) {
					sProperty = sLeadingProperty;
				}
			}
		}
		return sProperty;
	};

	/*
	 * @see JSDoc generated by SAPUI5 control API generator
	 */
	AnalyticalColumn.prototype.getSortProperty = function() {
		var sProperty = this.getProperty("sortProperty");
		if (!sProperty) {
			var oParent = this.getParent();
			if (isInstanceOfAnalyticalTable(oParent)) {
				var oBinding = oParent.getBinding("rows");
				var sLeadingProperty = this.getLeadingProperty();
				if (oBinding && oBinding.getSortablePropertyNames().indexOf(sLeadingProperty) > -1) {
					sProperty = sLeadingProperty;
				}
			}
		}
		return sProperty;
	};

	/*
	 * @see JSDoc generated by SAPUI5 control API generator
	 */
	AnalyticalColumn.prototype.getFilterType = function() {
		var vFilterType = this.getProperty("filterType");
		if (!vFilterType) {
			var oParent = this.getParent();
			if (isInstanceOfAnalyticalTable(oParent)) {
				var oBinding = oParent.getBinding("rows");
				var sLeadingProperty = this.getLeadingProperty(),
					oProperty = oBinding && oBinding.getProperty(sLeadingProperty);
				if (oProperty) {
					switch (oProperty.type) {
						case "Edm.Time":
							vFilterType = AnalyticalColumn._DEFAULT_FILTERTYPES["Time"];
							break;
						case "Edm.DateTime":
						case "Edm.DateTimeOffset":
							vFilterType = AnalyticalColumn._DEFAULT_FILTERTYPES["DateTime"];
							break;
						case "Edm.Single":
						case "Edm.Double":
						case "Edm.Decimal":
							vFilterType = AnalyticalColumn._DEFAULT_FILTERTYPES["Float"];
							break;
						case "Edm.SByte":
						case "Edm.Int16":
						case "Edm.Int32":
						case "Edm.Int64":
							vFilterType = AnalyticalColumn._DEFAULT_FILTERTYPES["Integer"];
							break;
						case "Edm.Boolean":
							vFilterType = AnalyticalColumn._DEFAULT_FILTERTYPES["Boolean"];
							break;
					}
				}
			}
		}
		return vFilterType;
	};

	AnalyticalColumn.prototype._updateColumns = function(bSupressRefresh, bForceChange) {
		var oParent = this.getParent();
		if (isInstanceOfAnalyticalTable(oParent)) {
			oParent._updateColumns(bSupressRefresh, bForceChange);
		}
	};

	AnalyticalColumn.prototype._updateTableAnalyticalInfo = function(bSupressRefresh) {
		var oParent = this.getParent();
		if (oParent && isInstanceOfAnalyticalTable(oParent) && !oParent._bSuspendUpdateAnalyticalInfo) {
			oParent.updateAnalyticalInfo(bSupressRefresh);
		}
	};

	AnalyticalColumn.prototype._updateTableColumnDetails = function() {
		var oParent = this.getParent();
		if (oParent && isInstanceOfAnalyticalTable(oParent) && !oParent._bSuspendUpdateAnalyticalInfo) {
			oParent._updateTableColumnDetails();
		}
	};

	AnalyticalColumn.prototype.shouldRender = function() {
		if (!this.getVisible() || !this.getTemplate()) {
			return false;
		}
		return (!this.getGrouped() || this._bLastGroupAndGrouped || this.getShowIfGrouped()) && (!this._bDependendGrouped || this._bLastGroupAndGrouped);
	};

	AnalyticalColumn.prototype.getTooltip_AsString = function() {
		if (!this.getTooltip()) { // No tooltip at all, neither string nor TooltipBase
			return this._getDefaultTooltip();
		}
		return Element.prototype.getTooltip_AsString.apply(this);
	};

	AnalyticalColumn.prototype.getTooltip_Text = function() {
		var sTooltip = Element.prototype.getTooltip_Text.apply(this);
		if (!this.getTooltip() || !sTooltip) { // No tooltip at all, neither string nor TooltipBase, or no text in TooltipBase
			sTooltip = this._getDefaultTooltip();
		}
		return sTooltip;
	};

	AnalyticalColumn.prototype._getDefaultTooltip = function() {
		var oParent = this.getParent();
		if (isInstanceOfAnalyticalTable(oParent)) {
			var oBinding = oParent.getBinding("rows");
			if (oBinding && this.getLeadingProperty()) {
				return oBinding.getPropertyQuickInfo(this.getLeadingProperty());
			}
		}
		return null;
	};

	/**
	 * Checks whether or not the menu has items
	 * @returns {Boolean} True if the menu has or could have items.
	 */
	AnalyticalColumn.prototype._menuHasItems = function() {
		var fnMenuHasItems = function() {
			var oTable = this.getParent();
			var oBinding = oTable.getBinding("rows");
			var oResultSet = oBinding && oBinding.getAnalyticalQueryResult();
			return  (oTable && oResultSet && oResultSet.findMeasureByPropertyName(this.getLeadingProperty())); // totals menu entry
		}.bind(this);

		return Column.prototype._menuHasItems.apply(this) || fnMenuHasItems();
	};

	/**
	 * This function checks whether a filter column menu item will be created. This function considers
	 * several column properties and evaluates metadata to determine whether filtering for a column is applicable.
	 * Since for the AnalyticalBinding metadata is very important to determine whether the column can be filtered it
	 * is required to have a binding. If there is no binding, this function will return false.
	 *
	 * For Analytical Columns the following applies:
	 * - filterProperty must be defined or it must be possible to derive it from the leadingProperty + filterable = true in the metadata
	 * - showFilterMenuEntry must be true (which is the default)
	 * - The filter property must be a property of the bound collection however it may differ from the leading property
	 * - The analytical column must be a child of an AnalyticalTable
	 *
	 * @returns {boolean}
	 */
	AnalyticalColumn.prototype.isFilterableByMenu = function() {
		var sFilterProperty = this.getFilterProperty();
		if (!sFilterProperty || !this.getShowFilterMenuEntry()) {
			// not required to get binding and do addtional checks if there is no filterProperty set or derived
			// or if the filter menu entry shall not be displayed at all
			return false;
		}

		var oParent = this.getParent();
		if (isInstanceOfAnalyticalTable(oParent)) {
			var oBinding = oParent.getBinding("rows");
			// metadata must be evaluated which can only be done when the collection is known and the metadata is loaded
			// this is usually the case when a binding exists.
			if (oBinding) {
				// The OData4SAP specification defines in section 3.3.3.2.2.3 how a filter condition on a measure property has to be used for data selection at runtime:
				// “Conditions on measure properties refer to the aggregated measure value based on the selected dimensions”
				// Although the generic OData providers (BW, SADL) do not support filtering measures, there may be specialized implementations that do support it.
				// Conclusion for a fix therefore is to make sure that the AnalyticalTable solely checks sap:filterable=”false” for providing the filter function.
				// Check for measure is hence removed. For more details, see BCP: 1770355530
				if (oBinding.getFilterablePropertyNames().indexOf(sFilterProperty) > -1 &&
					oBinding.getProperty(sFilterProperty)) {
					return true;
				}
			}
		}

		return false;
	};

	/**
	 * Returns the information whether the column is groupable.
	 *
	 * The column is groupable only if the following conditions are fulfilled:
	 * <ul>
	 *   <li>The column must be child of an <code>AnalyticalTable</code>.</li>
	 *   <li>The <code>rows</code> aggregation of the table must be bound.</li>
	 *   <li>The metadata of the model must be loaded.</li>
	 *   <li>The column's <code>leadingProperty</code> must be a sortable and filterable dimension.</li>
	 * </ul>
	 *
	 * @protected
	 * @return {boolean} <code>true</code> if the column is groupable
	 */
	AnalyticalColumn.prototype.isGroupable = function() {
		var oParent = this.getParent();
		if (isInstanceOfAnalyticalTable(oParent)) {
			var oBinding = oParent.getBinding("rows");
			if (oBinding) {
				var oResultSet = oBinding.getAnalyticalQueryResult();
				if (oResultSet && oResultSet.findDimensionByPropertyName(this.getLeadingProperty())
					&& oBinding.getSortablePropertyNames().indexOf(this.getLeadingProperty()) > -1
					&& oBinding.getFilterablePropertyNames().indexOf(this.getLeadingProperty()) > -1) {
					return true;
				}
			}
		}

		return false;
	};

	AnalyticalColumn.ofCell = Column.ofCell;

	return AnalyticalColumn;

});