/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides control sap.ui.webc.main.Select.
sap.ui.define([
	"sap/ui/webc/common/WebComponent",
	"./library",
	"sap/ui/core/library",
	"./thirdparty/Select"
], function(WebComponent, library, coreLibrary) {
	"use strict";

	var ValueState = coreLibrary.ValueState;

	/**
	 * Constructor for a new <code>Select</code>.
	 *
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 *
	 * @extends sap.ui.webc.common.WebComponent
	 * @class
	 *
	 * <h3>Overview</h3> The <code>sap.ui.webc.main.Select</code> component is used to create a drop-down list. The items inside the <code>sap.ui.webc.main.Select</code> define the available options by using the <code>sap.ui.webc.main.Option</code> component.
	 *
	 * <h3>Keyboard Handling</h3> The <code>sap.ui.webc.main.Select</code> provides advanced keyboard handling. <br>
	 *
	 * <ul>
	 *     <li>[F4, ALT+UP, ALT+DOWN, SPACE, ENTER] - Opens/closes the drop-down.</li>
	 *     <li>[UP, DOWN] - If the drop-down is closed - changes selection to the next or the previous option. If the drop-down is opened - moves focus to the next or the previous option.</li>
	 *     <li>[SPACE, ENTER] - If the drop-down is opened - selects the focused option.</li>
	 *     <li>[ESC] - Closes the drop-down without changing the selection.</li>
	 *     <li>[HOME] - Navigates to first option</li>
	 *     <li>[END] - Navigates to the last option</li>
	 * </ul> <br>
	 *
	 *
	 * <h3>Stable DOM Refs</h3>
	 *
	 * In the context of <code>sap.ui.webc.main.Select</code>, you can provide a custom stable DOM ref for:
	 * <ul>
	 *     <li>Every <code>sap.ui.webc.main.Option</code> that you provide. Example: <code>
	 *             <ui5-option stable-dom-ref="option1"></ui5-option>
	 *         </code></li>
	 * </ul>
	 *
	 * @author SAP SE
	 * @version 1.96.6
	 *
	 * @constructor
	 * @public
	 * @since 1.92.0
	 * @experimental Since 1.92.0 This control is experimental and its API might change significantly.
	 * @alias sap.ui.webc.main.Select
	 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
	 */
	var Select = WebComponent.extend("sap.ui.webc.main.Select", {
		metadata: {
			library: "sap.ui.webc.main",
			tag: "ui5-select-ui5",
			properties: {

				/**
				 * Sets the accessible aria name of the component.
				 */
				accessibleName: {
					type: "string"
				},

				/**
				 * Receives id(or many ids) of the elements that label the select.
				 */
				accessibleNameRef: {
					type: "string",
					defaultValue: ""
				},

				/**
				 * Defines whether the component is in disabled state. <br>
				 * <br>
				 * <b>Note:</b> A disabled component is noninteractive.
				 */
				disabled: {
					type: "boolean",
					defaultValue: false
				},

				/**
				 * Determines the name with which the component will be submitted in an HTML form. The value of the component will be the value of the currently selected <code>sap.ui.webc.main.Option</code>.
				 *
				 *
				 * <br>
				 * <br>
				 * <b>Note:</b> When set, a native <code>input</code> HTML element will be created inside the <code>sap.ui.webc.main.Select</code> so that it can be submitted as part of an HTML form. Do not use this property unless you need to submit a form.
				 */
				name: {
					type: "string",
					defaultValue: ""
				},

				/**
				 * Defines whether the component is required.
				 */
				required: {
					type: "boolean",
					defaultValue: false
				},

				/**
				 * Defines the value state of the component. <br>
				 * <br>
				 * Available options are:
				 * <ul>
				 *     <li><code>None</code></li>
				 *     <li><code>Error</code></li>
				 *     <li><code>Warning</code></li>
				 *     <li><code>Success</code></li>
				 *     <li><code>Information</code></li>
				 * </ul>
				 */
				valueState: {
					type: "sap.ui.core.ValueState",
					defaultValue: ValueState.None
				},

				/**
				 * Defines the value state message that will be displayed as pop up under the contorl.
				 * <br>
				 * <br>
				 *
				 *
				 * <b>Note:</b> If not specified, a default text (in the respective language) will be displayed.
				 */
				valueStateMessage: {
					type: "string",
					defaultValue: "",
					mapping: {
						type: "slot",
						to: "div"
					}
				}
			},
			defaultAggregation: "options",
			aggregations: {

				/**
				 * Defines the component options.
				 *
				 * <br>
				 * <br>
				 * <b>Note:</b> Only one selected option is allowed. If more than one option is defined as selected, the last one would be considered as the selected one.
				 *
				 * <br>
				 * <br>
				 * <b>Note:</b> Use the <code>sap.ui.webc.main.Option</code> component to define the desired options.
				 */
				options: {
					type: "sap.ui.webc.main.ISelectOption",
					multiple: true
				}
			},
			events: {

				/**
				 * Fired when the selected option changes.
				 */
				change: {
					parameters: {
						/**
						 * the selected option.
						 */
						selectedOption: {
							type: "HTMLElement"
						}
					}
				}
			},
			getters: ["selectedOption"]
		}
	});

	/**
	 * Returns the currently selected option.
	 * @public
	 * @name sap.ui.webc.main.Select#getSelectedOption
	 * @function
	 */

	return Select;
});