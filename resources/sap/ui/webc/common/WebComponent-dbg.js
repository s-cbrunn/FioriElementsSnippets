/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides the base class for all Web Component wrappers.
sap.ui.define([
		"sap/ui/core/Control",
		"sap/ui/core/Element",
		"./WebComponentMetadata",
		"./WebComponentRenderer",
		"sap/ui/core/Core",
		"sap/base/strings/hyphenate",
		"sap/base/strings/camelize",
		"sap/ui/core/library"
	],
	function(
		Control,
		Element,
		WebComponentMetadata,
		WebComponentRenderer,
		Core,
		hyphenate,
		camelize,
		coreLibrary
	) {
		"use strict";

		var TextDirection = coreLibrary.TextDirection;

		/**
		 * Returns the sap.ui.core.Element instance for an arbitrary HTML Element, or undefined, if the HTML element is not a sap.ui.core.Element
		 *
		 * @private
		 * @param obj
		 * @returns {sap.ui.core.Element|undefined}
		 */
		var fnGetControlFor = function(obj) {
			if (obj.id && Core.byId(obj.id)) {
				return Core.byId(obj.id);
			}
		};

		/**
		 * Takes an object as an argument and returns another object, where all fields in the original object, that are HTML Elements, are deeply replaced with their sap.ui.core.Element counterparts, where applicable
		 *
		 * @private
		 * @param obj
		 * @param level
		 * @param maxLevel
		 * @returns {Object}
		 */
		var fnConvert = function(obj, level, maxLevel) {
			if (level === undefined) {
				level = 0;
			}
			if (maxLevel === undefined) {
				maxLevel = 2;
			}

			// Null
			if (obj == null) {
				return obj;
			}

			// HTML Element - if represents a control, return the control. Otherwise return the HTML Element and stop.
			if (obj instanceof window.HTMLElement) {
				var oControl = fnGetControlFor(obj);
				return oControl ? oControl : obj;
			}

			if (level < maxLevel) {
				// Array
				if (Array.isArray(obj)) {
					return obj.map(fnConvert, level + 1, maxLevel);
				}

				// Object
				if (typeof obj === "object") {
					var oResult = {};
					for (var i in obj) {
						if (obj.hasOwnProperty(i)) {
							oResult[i] = fnConvert(obj[i], level + 1, maxLevel);
						}
					}
					return oResult;
				}
			}

			// Anything else
			return obj;
		};

		/**
		 * Constructs and initializes a Web Component Wrapper with the given <code>sId</code> and settings.
		 *
		 * @class Base Class for Web Components.
		 * Web Components are agnostic UI elements which can be integrated into the UI5
		 * programming model by using this wrapper control. This wrapper control takes
		 * care to propagate the properties, the aggregations and the events. It also
		 * ensures to render the control and put the aggregated controls in the dedicated
		 * slots of the Web Component.
		 *
		 * @extends sap.ui.core.Control
		 * @author SAP SE
		 * @version 1.96.6
		 * @public
		 * @since 1.92.0
		 * @alias sap.ui.webc.common.WebComponent
		 * @experimental Since 1.92.0 The API might change. It is not intended for productive usage yet!
		 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
		 */
		var WebComponent = Control.extend("sap.ui.webc.common.WebComponent", {

			metadata : {
				stereotype : "webcomponent",
				"abstract" : true,
				library : "sap.ui.core"
			},

			constructor : function(sId, mSettings) {
				Control.apply(this, arguments);

				this.__onInvalidationBound = this.__onInvalidation.bind(this);

				// After the DOM element is rendered for the first time, attach the invalidation callback (in __onAfterRenderingDelegate)
				this.__delegates = {
					onAfterRendering: this.__onAfterRenderingDelegate
				};
				this.addDelegate(this.__delegates, true, this, false);

				// Listen for all DOM events, described in the Component Wrapper's metadata
				this.__attachCustomEventsListeners();
			},

			renderer: WebComponentRenderer

		}, /* Metadata constructor */ WebComponentMetadata);

		/**
		 * Assigns the __slot property which tells RenderManager to render the sap.ui.core.Element (oElement) with a "slot" attribute
		 *
		 * @param oElement
		 * @param sAggregationName
		 * @private
		 */
		WebComponent.prototype._setSlot = function(oElement, sAggregationName) {
			if (oElement) {
				var sSlot = this.getMetadata().getAggregationSlot(sAggregationName);
				oElement.__slot = sSlot;
			}
		};

		/**
		 * Removes the __slot property from the sap.ui.core.Element instance
		 *
		 * @param oElement
		 * @private
		 */
		WebComponent.prototype._unsetSlot = function(oElement) {
			if (oElement) {
				delete oElement.__slot;
			}
		};

		/**
		 * Set the slot for each newly added child control, based on its aggregation
		 *
		 * @override
		 * @param sAggregationName
		 * @param oObject
		 * @param bSuppressInvalidate
		 * @returns {this}
		 */
		WebComponent.prototype.setAggregation = function(sAggregationName, oObject, bSuppressInvalidate) {
			var vResult = Control.prototype.setAggregation.apply(this, arguments);
			this._setSlot(oObject, sAggregationName);
			return vResult;
		};

		/**
		 * Set the slot for each newly added child control, based on its aggregation
		 *
		 * @override
		 * @param sAggregationName
		 * @param oObject
		 * @param iIndex
		 * @param bSuppressInvalidate
		 * @returns {this}
		 */
		WebComponent.prototype.insertAggregation = function(sAggregationName, oObject, iIndex, bSuppressInvalidate) {
			var vResult = Control.prototype.insertAggregation.apply(this, arguments);
			this._setSlot(oObject, sAggregationName);
			return vResult;
		};

		/**
		 * Set the slot for each newly added child control, based on its aggregation
		 *
		 * @override
		 * @param sAggregationName
		 * @param oObject
		 * @param bSuppressInvalidate
		 * @returns {this}
		 */
		WebComponent.prototype.addAggregation = function(sAggregationName, oObject, bSuppressInvalidate) {
			var vResult = Control.prototype.addAggregation.apply(this, arguments);
			this._setSlot(oObject, sAggregationName);
			return vResult;
		};

		/**
		 * Remove the slot for each removed child control
		 *
		 * @override
		 * @param sAggregationName
		 * @param vObject
		 * @param bSuppressInvalidate
		 * @returns {sap.ui.base.ManagedObject}
		 */
		WebComponent.prototype.removeAggregation = function(sAggregationName, vObject, bSuppressInvalidate) {
			var oChild = Control.prototype.removeAggregation.apply(this, arguments);
			this._unsetSlot(oChild);
			return oChild;
		};

		/**
		 * Remove the slot for each removed child control
		 *
		 * @override
		 * @param sAggregationName
		 * @param bSuppressInvalidate
		 * @returns {*}
		 */
		WebComponent.prototype.removeAllAggregation = function(sAggregationName, bSuppressInvalidate) {
			var aChildren = Control.prototype.removeAllAggregation.apply(this, arguments);
			aChildren.forEach(function(oChild) {
				this._unsetSlot(oChild);
			}, this);

			return aChildren;
		};

		/**
		 * Implement the onInvalidation hook for each UI5 Web Component, and update __slot, if the component has an individual slot
		 * @private
		 */
		WebComponent.prototype.__onAfterRenderingDelegate = function() {
			var oDomRef = this.getDomRef();

			window.customElements.whenDefined(oDomRef.localName).then(function() {
				oDomRef.attachInvalidate(this.__onInvalidationBound);

				if (oDomRef._individualSlot) {
					this.__slot = oDomRef._individualSlot; // If the component creates individual slots for children, f.e. columns-3 or default-1, update the __slot property, otherwise RenderManager will set the normal slot name, f.e. columns or ""
				}
				this.__updateObjectProperties(oDomRef);
			}.bind(this));
		};

		/**
		 * Updates all object properties (can't be done via the renderer)
		 * @param oDomRef
		 * @private
		 */
		WebComponent.prototype.__updateObjectProperties = function(oDomRef) {
			var oAttrProperties = this.getMetadata().getPropertiesByMapping("attribute");
			for (var sPropName in oAttrProperties) {
				var oPropData = oAttrProperties[sPropName];
				var vPropValue = oPropData.get(this);

				if (oPropData.type === "object" || typeof vPropValue === "object") {
					var sWebComponentPropName = oPropData._sMapTo ? oPropData._sMapTo : sPropName;
					oDomRef[sWebComponentPropName] = vPropValue;
				}
			}
		};

		/**
		 * Synchronize user-controlled properties (such as checked, value)
		 * @param oChangeInfo
		 * @private
		 */
		WebComponent.prototype.__onInvalidation = function(oChangeInfo) {
			if (oChangeInfo.type === "property") {
				var sPropName = oChangeInfo.name;
				var vNewValue = oChangeInfo.newValue;
				var oPropData = this.getMetadata().getProperty(sPropName);
				if (oPropData) {
					oPropData.set(this, vNewValue);
				}
			}
		};

		WebComponent.prototype.__attachCustomEventsListeners = function() {
			var oEvents = this.getMetadata().getEvents();
			for (var sEventName in oEvents) {
				var sCustomEventName = hyphenate(sEventName);
				this.attachBrowserEvent(sCustomEventName, this.__handleCustomEvent, this);
			}
		};

		WebComponent.prototype.__detachCustomEventsListeners = function() {
			var oEvents = this.getMetadata().getEvents();
			for (var sEventName in oEvents) {
				if (oEvents.hasOwnProperty(sEventName)) {
					var sCustomEventName = hyphenate(sEventName);
					this.detachBrowserEvent(sCustomEventName, this.__handleCustomEvent, this);
				}
			}
		};

		WebComponent.prototype.__handleCustomEvent = function(oEvent) {
			var sCustomEventName = oEvent.type;
			var sEventName = camelize(sCustomEventName);

			// Prepare the event data object
			var oEventData = this.__formatEventData(oEvent.detail);

			// Finally fire the semantic event on the control instance
			var oEventObj = this.getMetadata().getEvent(sEventName);
			var bPrevented = !oEventObj.fire(this, oEventData);
			if (bPrevented) {
				oEvent.preventDefault();
			}
		};

		WebComponent.prototype.__formatEventData = function(vDetail) {
			// If the event data is an object, recursively convert all object dom element properties to control references
			if (typeof vDetail === "object") {
				return fnConvert(vDetail);
			}

			// If not an object, this is a DOM event such as click, just return an empty object
			return {};
		};

		WebComponent.prototype.__callPublicMethod = function(name, args) {
			if (!this.getDomRef()) {
				throw new Error("Method called before custom element has been created by: " + this.getId());
			}

			var converted = Array.from(args).map(function(arg) { //  convert any public method parameter that is a Control instance to a DOM Ref
				if (arg instanceof Element) {
					return arg.getDomRef();
				}
				return arg;
			});

			return this.getDomRef()[name].apply(this.getDomRef(), converted);
		};

		WebComponent.prototype.__callPublicGetter = function(name) {
			if (!this.getDomRef()) {
				throw new Error("Getter called before custom element has been created by: " + this.getId());
			}

			return this.getDomRef()[name];
		};


		WebComponent.prototype.destroy = function() {
			var oDomRef = this.getDomRef();
			this.__detachCustomEventsListeners();
			if (oDomRef && typeof oDomRef.detachInvalidate === "function") {
				oDomRef.detachInvalidate(this.__onInvalidationBound);
			}

			return Control.prototype.destroy.call(this, arguments);
		};


		/**
		 * Maps the "textDirection" property to the "dir" attribute
		 * @param sTextDirection
		 * @returns {string}
		 * @private
		 */
		WebComponent.prototype._mapTextDirection = function(sTextDirection) {
			if (sTextDirection === TextDirection.Inherit) {
				return null;
			}

			return sTextDirection.toLowerCase();
		};

		return WebComponent;
	});
