/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides control sap.ui.webc.main.Label.
sap.ui.define([
	"sap/ui/webc/common/WebComponent",
	"./library",
	"./thirdparty/Label"
], function(WebComponent, library) {
	"use strict";

	var WrappingType = library.WrappingType;

	/**
	 * Constructor for a new <code>Label</code>.
	 *
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 *
	 * @extends sap.ui.webc.common.WebComponent
	 * @class
	 *
	 * <h3>Overview</h3>
	 *
	 * The <code>sap.ui.webc.main.Label</code> is a component used to represent a label, providing valuable information to the user. Usually it is placed next to a value holder, such as a text field. It informs the user about what data is displayed or expected in the value holder. <br>
	 * <br>
	 * The <code>sap.ui.webc.main.Label</code> appearance can be influenced by properties, such as <code>required</code> and <code>wrappingType</code>. The appearance of the Label can be configured in a limited way by using the design property. For a broader choice of designs, you can use custom styles.
	 *
	 * @author SAP SE
	 * @version 1.96.6
	 *
	 * @constructor
	 * @public
	 * @since 1.92.0
	 * @experimental Since 1.92.0 This control is experimental and its API might change significantly.
	 * @alias sap.ui.webc.main.Label
	 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
	 */
	var Label = WebComponent.extend("sap.ui.webc.main.Label", {
		metadata: {
			library: "sap.ui.webc.main",
			tag: "ui5-label-ui5",
			properties: {

				/**
				 * Defines the labeled input by providing its ID. <br>
				 * <br>
				 * <b>Note:</b> Can be used with both <code>sap.ui.webc.main.Input</code> and native input.
				 */
				"for": {
					type: "string",
					defaultValue: ""
				},

				/**
				 * Defines whether an asterisk character is added to the component text. <br>
				 * <br>
				 * <b>Note:</b> Usually indicates that user input is required.
				 */
				required: {
					type: "boolean",
					defaultValue: false
				},

				/**
				 * Defines whether semi-colon is added to the component text. <br>
				 * <br>
				 * <b>Note:</b> Usually used in forms.
				 */
				showColon: {
					type: "boolean",
					defaultValue: false
				},

				/**
				 * Defines the content of the control
				 */
				text: {
					type: "string",
					defaultValue: "",
					mapping: "textContent"
				},

				/**
				 * Defines the width of the control
				 */
				width: {
					type: "sap.ui.core.CSSSize",
					defaultValue: null,
					mapping: "style"
				},

				/**
				 * Defines how the text of a component will be displayed when there is not enough space. Available options are:
				 * <ul>
				 *     <li><code>None</code> - The text will be truncated with an ellipsis.</li>
				 *     <li><code>Normal</code> - The text will wrap. The words will not be broken based on hyphenation.</li>
				 * </ul>
				 */
				wrappingType: {
					type: "sap.ui.webc.main.WrappingType",
					defaultValue: WrappingType.None
				}
			}
		}
	});

	return Label;
});