sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"de/scbrunn/fesnippet/model/FolderStructure",
	"de/scbrunn/fesnippet/libs/showdown"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller, FolderStructure, showdown) {
		"use strict";

		return Controller.extend("de.scbrunn.fesnippet.controller.App", {
			onInit: function () {
				debugger;
				this.getView().setModel(FolderStructure.getJSONModel());
				FolderStructure.getFolderStructure();


				/*	var converter = new showdown.Converter(),
					text      = '# hello, markdown!',
					html      = converter.makeHtml(text);
	
					this.getView().byId(idHTMLContent).setContent(html); */
			},

			onToggleOpenState: function (oEvent) {
				var iItemIndex = oEvent.getParameter("itemIndex");
				var oItemContext = oEvent.getParameter("itemContext");
				var bExpanded = oEvent.getParameter("expanded");
				var sPath = oItemContext.getPath();
				var oNodeObject = this.getView().getModel().getObject(sPath);
				var oTree = this.byId("idNavTree");

				FolderStructure.sendRequest(oNodeObject.childUrl,sPath);
			}
		});
	});
