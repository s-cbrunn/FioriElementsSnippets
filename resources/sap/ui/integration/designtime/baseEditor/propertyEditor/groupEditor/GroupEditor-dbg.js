/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([
	"sap/ui/integration/designtime/baseEditor/propertyEditor/BasePropertyEditor",
	"sap/base/util/restricted/_isNil",
	"sap/base/util/isPlainObject"
], function (
	BasePropertyEditor,
	_isNil,
	isPlainObject
) {
	"use strict";

	/**
	 * @class
	 * Constructor for a new <code>GroupEditor</code>.
	 * This allows to set a group title or binding strings for a specified property of a JSON object.
	 * The editor is rendered as a {@link sap.m.Title}.
	 *
	 * <h3>Configuration</h3>
	 *
	 * <table style="width:100%;">
	 * <tr style="text-align:left">
	 * 	<th>Option</th>
	 * 	<th>Type</th>
	 * 	<th>Default</th>
	 * 	<th>Description</th>
	 * </tr>
	 * <tr>
	 * 	<td><code>allowBindings</code></td>
	 *  <td><code>boolean</code></td>
	 * 	<td><code>true</code></td>
	 * 	<td>Whether binding strings can be set instead of selecting items</td>
	 * </tr>
	 * <tr>
	 * 	<td><code>maxLength</code></td>
	 *  <td><code>number</code></td>
	 * 	<td></td>
	 * 	<td>Maximum number of characters</td>
	 * </tr>
	 * </table>
	 *
	 * @extends sap.ui.integration.designtime.baseEditor.propertyEditor.BasePropertyEditor
	 * @alias sap.ui.integration.designtime.baseEditor.propertyEditor.groupEditor.GroupEditor
	 * @author SAP SE
	 * @since 1.85
	 * @version 1.84.19
	 *
	 * @private
	 * @experimental 1.85
	 * @ui5-restricted
	 */
	var GroupEditor = BasePropertyEditor.extend("sap.ui.integration.designtime.baseEditor.propertyEditor.groupEditor.GroupEditor", {
		xmlFragment: "sap.ui.integration.designtime.baseEditor.propertyEditor.groupEditor.GroupEditor",
		metadata: {
			library: "sap.ui.integration"
		},
		renderer: BasePropertyEditor.getMetadata().getRenderer().render
	});

	GroupEditor.configMetadata = Object.assign({}, BasePropertyEditor.configMetadata, {
		allowBindings: {
			defaultValue: true,
			mergeStrategy: "mostRestrictiveWins"
		}
	});

	GroupEditor.prototype.getDefaultValidators = function () {
		var oConfig = this.getConfig();
		return Object.assign(
			{},
			BasePropertyEditor.prototype.getDefaultValidators.call(this),
			{
				isValidBinding: {
					type: "isValidBinding",
					isEnabled: oConfig.allowBindings
				},
				notABinding: {
					type: "notABinding",
					isEnabled: !oConfig.allowBindings
				},
				maxLength: {
					type: "maxLength",
					isEnabled: typeof oConfig.maxLength === "number",
					config: {
						maxLength: oConfig.maxLength
					}
				}
			}
		);
	};

	return GroupEditor;
});
