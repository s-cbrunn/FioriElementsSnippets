sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"de/scbrunn/fesnippet/model/FolderStructure"
], function (UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("de.scbrunn.fesnippet.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// enable routing
			this.getRouter().initialize();

			// set the device model
			
			// at the moment, not relevant!
			//this.setModel(FolderStructure.createDeviceModel(), "device");
		}
	});
});
