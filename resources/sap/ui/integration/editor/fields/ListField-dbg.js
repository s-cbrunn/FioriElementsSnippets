/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([
	"sap/ui/integration/editor/fields/BaseField",
	"sap/m/Input",
	"sap/m/Text",
	"sap/m/MultiComboBox",
	"sap/ui/core/ListItem",
	"sap/base/util/each",
	"sap/base/util/restricted/_debounce",
	"sap/base/util/restricted/_isEqual",
	"sap/base/util/ObjectPath",
	"sap/base/util/includes",
	"sap/ui/core/SeparatorItem",
	"sap/ui/core/Core",
	"sap/ui/model/Sorter",
	"sap/base/util/deepClone"
], function (
	BaseField, Input, Text, MultiComboBox, ListItem, each, _debounce, _isEqual, ObjectPath, includes, SeparatorItem, Core, Sorter, deepClone
) {
	"use strict";
	var sDefaultSeperator = "#";
	var oResourceBundle = Core.getLibraryResourceBundle("sap.ui.integration");

	/**
	 * @class
	 * @extends sap.ui.integration.editor.fields.BaseField
	 * @alias sap.ui.integration.editor.fields.ListField
	 * @author SAP SE
	 * @since 1.83.0
	 * @version 1.96.6
	 * @private
	 * @experimental since 1.83.0
	 * @ui5-restricted
	 */
	var ListField = BaseField.extend("sap.ui.integration.editor.fields.ListField", {
		metadata: {
			library: "sap.ui.integration"
		},
		renderer: BaseField.getMetadata().getRenderer()
	});

	ListField.prototype.initVisualization = function (oConfig) {
		if (oResourceBundle && oResourceBundle.sLocale !== Core.getConfiguration().getLanguage()) {
			oResourceBundle = Core.getLibraryResourceBundle("sap.ui.integration");
		}
		var that = this;
		var oVisualization = oConfig.visualization;
		if (!oVisualization) {
			if (oConfig.values) {
				var oItem = this.formatListItem(oConfig.values.item);
				oVisualization = {
					type: MultiComboBox,
					settings: {
						selectedKeys: {
							path: 'currentSettings>value'
						},
						busy: { path: 'currentSettings>_loading' },
						editable: oConfig.editable,
						visible: oConfig.visible,
						showSecondaryValues: true,
						width: "100%",
						items: {
							path: "", //empty, because the bindingContext for the undefined model already points to the path
							template: oItem,
							sorter: [new Sorter({
								path: 'Selected',
								descending: false,
								group: true
							})],
							groupHeaderFactory: that.getGroupHeader
						}
					}
				};
				if (this.isFilterBackend()) {
					oVisualization.settings.selectedKeys = {
						parts: [
							'currentSettings>value',
							'currentSettings>suggestValue'
						],
						formatter: function(sValue, sSuggestValue) {
							if (sSuggestValue) {
								//set suggest value in the input field of the MultiComboBox
								that.setSuggestValue();
							}
							return sValue;
						}
					};
				}
			} else {
				oVisualization = {
					type: Input,
					settings: {
						value: {
							path: 'currentSettings>value',
							formatter: function (a) {
								a = a || [];
								return a.join(",");
							}
						},
						change: function (oEvent) {
							var oSource = oEvent.getSource();
							oSource.getBinding("value").setRawValue(oSource.getValue().split(","));
						},
						editable: oConfig.editable,
						visible: oConfig.visible,
						placeholder: oConfig.placeholder
					}
				};
			}
		}
		this._visualization = oVisualization;
		this.attachAfterInit(this._afterInit);
	};

	ListField.prototype._afterInit = function () {
		var oControl = this.getAggregation("_field");
		if (oControl instanceof MultiComboBox) {
			var oConfig = this.getConfiguration();
			var oModel = this.getModel();
			this.prepareFieldsInKey(oConfig);
			if (this.isFilterBackend()) {
				this.onInput = _debounce(this.onInput, 500);
				//if need to filter backend by input value, need to hook the onInput function which only support filter locally.
				oControl.oninput = this.onInput;
				//listen to the selectionChange event of MultiComboBox
				oControl.attachSelectionChange(this.onSelectionChangeForFilterBackend);
				//listen to the selectionFinish event of MultiComboBox
				oControl.attachSelectionFinish(this.onSelectionFinishForFilterBackend);
				//merge the previous selected items with new items got from request
				oModel.attachPropertyChange(this.onPropertyChangeForFilterBackend, this);
			} else {
				//listen to the selectionChange event of MultiComboBox
				oControl.attachSelectionChange(this.onSelectionChange);
				//clean the selected keys with the items got from request
				oModel.attachPropertyChange(this.onPropertyChange, this);
			}
		}
	};

	ListField.prototype.prepareFieldsInKey = function(oConfig) {
		//get field names in the item key
		this._sKeySeparator = oConfig.values.keySeparator;
		if (!this._sKeySeparator) {
			this._sKeySeparator = sDefaultSeperator;
		}
		var sKey = oConfig.values.item.key;
		this._aFields = sKey.split(this._sKeySeparator);
		for (var n in this._aFields) {
			//remove the {} in the field
			if (this._aFields[n].startsWith("{")) {
				this._aFields[n] = this._aFields[n].substring(1);
			}
			if (this._aFields[n].endsWith("}")) {
				this._aFields[n] = this._aFields[n].substring(0, this._aFields[n].length - 1);
			}
		}
	};

	ListField.prototype.getKeyFromItem = function(oItem) {
		var sItemKey = "";
		this._aFields.forEach(function (field) {
			sItemKey += oItem[field].toString() + this._sKeySeparator;
		}.bind(this));
		if (sItemKey.endsWith(this._sKeySeparator)) {
			sItemKey = sItemKey.substring(0, sItemKey.length - this._sKeySeparator.length);
		}
		return sItemKey;
	};

	ListField.prototype.onPropertyChangeForFilterBackend = function(oEvent) {
		var oConfig = this.getConfiguration();
		if (!oConfig.valueItems) {
			oConfig.valueItems = [];
		}
		var sPath = oConfig.values.data.path || "/";
		var oValueModel = this.getModel();
		var oData = oValueModel.getData();

		if (sPath !== "/") {
			//get data path
			if (sPath.startsWith("/")) {
				sPath = sPath.substring(1);
			}
			if (sPath.endsWith("/")) {
				sPath = sPath.substring(0, sPath.length - 1);
			}
			var aPath = sPath.split("/");
			//get new items
			var oResult = ObjectPath.get(aPath, oData);
			oResult = this.mergeSelectedItems(oConfig, oResult);
			ObjectPath.set(aPath, oResult, oData);
		} else {
			oData = this.mergeSelectedItems(oConfig, oData);
		}
		oValueModel.setData(oData);
		this.setSuggestValue();
	};

	ListField.prototype.onPropertyChange = function(oEvent) {
		var oControl = this.getAggregation("_field");
		//get the keys of the selected items
		var aSelectedItemKeys = oControl.getSelectedItems().map(function (oSelectedItem) {
			return oSelectedItem.getKey();
		});

		var sSettingspath = this.getBindingContext("currentSettings").sPath;
		var oSettingsModel = this.getModel("currentSettings");
		//save the selected keys as field value
		oSettingsModel.setProperty(sSettingspath + "/value", aSelectedItemKeys);
	};

	ListField.prototype.mergeSelectedItems = function(oConfig, oData) {
		if (Array.isArray(oData)) {
			//get keys of previous selected items
			var aSelectedItemKeys = oConfig.valueItems.map(function (oSelectedItem) {
				return this.getKeyFromItem(oSelectedItem);
			}.bind(this));
			//get the items which are in selectedItems list
			var oItemsNotInSelectedItemsList = oData.filter(function (item) {
				var sItemKey = this.getKeyFromItem(item);
				return !includes(aSelectedItemKeys, sItemKey);
			}.bind(this));
			//get the items which are selected and not in selectedItems list, for example, the selected items defined in manifest value
			var oSelectedItemsMissedInSelectedItemsList = oItemsNotInSelectedItemsList.filter(function (item) {
				return item.Selected === oResourceBundle.getText("EDITOR_ITEM_SELECTED");
			});
			//add the selected items which are not in selectedItems list into selectedItems list
			oConfig.valueItems = oConfig.valueItems.concat(oSelectedItemsMissedInSelectedItemsList);
			//get the items which are not selected
			var oNotSelectedItems = oItemsNotInSelectedItemsList.filter(function (item) {
				return item.Selected !== oResourceBundle.getText("EDITOR_ITEM_SELECTED");
			});
			//concat the filtered items to the selectedItems list as new data
			oData = oConfig.valueItems.concat(oNotSelectedItems);
			var oControl = this.getAggregation("_field");
			if (oControl.isOpen()) {
				aSelectedItemKeys = oConfig.valueItems.map(function (oSelectedItem) {
					return this.getKeyFromItem(oSelectedItem);
				}.bind(this));
				var aSelectedKeysInControl = oControl.getSelectedKeys();
				// if the selected items not match, update the control
				if (!_isEqual(aSelectedItemKeys, aSelectedKeysInControl)) {
					oControl.setSelectedKeys(aSelectedItemKeys);
				}
			}
		} else {
			oData = oConfig.valueItems;
		}
		return oData;
	};

	ListField.prototype.setSuggestValue = function() {
		var oControl = this.getAggregation("_field");
		var sSettingspath = this.getBindingContext("currentSettings").sPath;
		var oSettingsModel = this.getModel("currentSettings");
		var sSuggestValue = oSettingsModel.getProperty(sSettingspath + "/suggestValue");
		if (sSuggestValue && sSuggestValue !== "") {
			//set the input field value to the suggest value of the MultiComboBox
			oControl.setValue(sSuggestValue.replaceAll("\'\'", "'"));
		}
	};

	ListField.prototype.getSuggestValue = function() {
		var sSettingspath = this.getBindingContext("currentSettings").sPath;
		var oSettingsModel = this.getModel("currentSettings");
		return oSettingsModel.getProperty(sSettingspath + "/suggestValue");
	};

	ListField.prototype.getGroupHeader = function(oGroup) {
		return new SeparatorItem( {
			text: oGroup.key
		});
	};

	ListField.prototype.onSelectionChangeForFilterBackend = function(oEvent) {
		var oField = oEvent.oSource.getParent();
		var oConfig = oField.getConfiguration();
		var oListItem = oEvent.getParameter("changedItem");
		var sChangedItemKey = oListItem.getKey();
		var bIsSelected = oEvent.getParameter("selected");

		//get items in data model
		var oData = this.getModel().getData();
		var sPath = oConfig.values.data.path || "/";
		var aPath, oItems;
		if (sPath !== "/") {
			if (sPath.startsWith("/")) {
				sPath = sPath.substring(1);
			}
			if (sPath.endsWith("/")) {
				sPath = sPath.substring(0, sPath.length - 1);
			}
			aPath = sPath.split("/");
			oItems = ObjectPath.get(aPath, oData);
		} else {
			oItems = oData;
		}

		if (oItems) {
			if (!oConfig.valueItems) {
				//initial the selected item list
				oConfig.valueItems = [];
			}
			//add the selected item into selected item list
			var oNewItems = [];
			oItems.forEach(function (oItem) {
				//clone the current item since sometimes the item is readonly
				var oNewItem = deepClone(oItem, 500);
				var sItemKey = oField.getKeyFromItem(oNewItem);
				if (sItemKey === sChangedItemKey) {
					if (bIsSelected) {
						oNewItem.Selected = oResourceBundle.getText("EDITOR_ITEM_SELECTED");
						oConfig.valueItems = oConfig.valueItems.concat([oNewItem]);
					} else {
						oNewItem.Selected = oResourceBundle.getText("EDITOR_ITEM_UNSELECTED");
						oConfig.valueItems = oConfig.valueItems.filter(function (oSelectedItem) {
							var sItemKey = oField.getKeyFromItem(oSelectedItem);
							return sItemKey !== sChangedItemKey;
						});
					}
				}
				oNewItems.push(oNewItem);
			});
			if (aPath !== undefined) {
				ObjectPath.set(aPath, oNewItems, oData);
				this.getModel().checkUpdate(true);
			} else {
				this.getModel().setData(oNewItems);
			}
		}
	};

	ListField.prototype.onSelectionChange = function(oEvent) {
		var oField = oEvent.oSource.getParent();
		var oConfig = oField.getConfiguration();
		var oListItem = oEvent.getParameter("changedItem");
		var sChangedItemKey = oListItem.getKey();
		var bIsSelected = oEvent.getParameter("selected");

		//get items in data model
		var oData = this.getModel().getData();
		var sPath = oConfig.values.data.path || "/";
		if (sPath !== "/") {
			if (sPath.startsWith("/")) {
				sPath = sPath.substring(1);
			}
			if (sPath.endsWith("/")) {
				sPath = sPath.substring(0, sPath.length - 1);
			}
			var aPath = sPath.split("/");
			var oResult = ObjectPath.get(aPath, oData);
			if (Array.isArray(oResult)) {
				for (var n in oResult) {
					var sItemKey = oField.getKeyFromItem(oResult[n]);
					if (sItemKey === sChangedItemKey) {
						if (bIsSelected) {
							oResult[n].Selected = oResourceBundle.getText("EDITOR_ITEM_SELECTED");
						} else {
							oResult[n].Selected = oResourceBundle.getText("EDITOR_ITEM_UNSELECTED");
						}
					}
				}
				ObjectPath.set(aPath, oResult, oData);
			}
		} else if (Array.isArray(oData)) {
			for (var n in oData) {
				var sItemKey = oField.getKeyFromItem(oData[n]);
				if (sItemKey === sChangedItemKey) {
					if (bIsSelected) {
						oData[n].Selected = oResourceBundle.getText("EDITOR_ITEM_SELECTED");
					} else {
						oData[n].Selected = oResourceBundle.getText("EDITOR_ITEM_UNSELECTED");
					}
				}
			}
		}
		this.getModel().setData(oData);
		this.getModel().checkUpdate(true);
	};

	ListField.prototype.onSelectionFinishForFilterBackend = function(oEvent) {
		var oField = this.getParent();
		var oConfig = oField.getConfiguration();

		//get the keys of the selected items
		var aSelectedItemKeys = oEvent.getParameter("selectedItems").map(function (oSelectedItem) {
			return oSelectedItem.getKey();
		});

		//get the selected items in the data model by the keys
		var oData = this.getModel().getData();
		var sPath = oConfig.values.data.path || "/";
		if (sPath !== "/") {
			if (sPath.startsWith("/")) {
				sPath = sPath.substring(1);
			}
			if (sPath.endsWith("/")) {
				sPath = sPath.substring(0, sPath.length - 1);
			}
			var aPath = sPath.split("/");
			oData = ObjectPath.get(aPath, oData);
		}
		if (oData) {
			oConfig.valueItems = oData.filter(function (oItem) {
				var sItemKey = oField.getKeyFromItem(oItem);
				return includes(aSelectedItemKeys, sItemKey);
			});
		}

		var sSettingspath = this.getBindingContext("currentSettings").sPath;
		var oSettingsModel = this.getModel("currentSettings");
		//save the selected keys as field value
		oSettingsModel.setProperty(sSettingspath + "/value", aSelectedItemKeys);
		//clean the suggestion value if current suggestion value exist
		var oSuggestValue = oField.getSuggestValue();
		if (oSuggestValue && oSuggestValue !== "") {
			oSettingsModel.setProperty(sSettingspath + "/suggestValue", "");
		}
	};

	ListField.prototype.onInput = function (oEvent) {
		//get the suggestion value
		var sTerm = oEvent.target.value;
		var sSettingspath = this.getBindingContext("currentSettings").sPath;
		var oSettingsModel = this.getModel("currentSettings");
		//set the suggestion value into data model property "suggestValue" for filter backend
		oSettingsModel.setProperty(sSettingspath + "/suggestValue", sTerm.replaceAll("'", "\'\'"));
		oSettingsModel.setProperty(sSettingspath + "/_loading", true);
		oEvent.srcControl.open();
		oEvent.srcControl._getSuggestionsPopover()._sTypedInValue = sTerm;
	};

	return ListField;
});