sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"de/scbrunn/fesnippet/model/FolderStructure",
	"de/scbrunn/fesnippet/libs/showdown"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller, FolderStructure) {
		"use strict";

		return Controller.extend("de.scbrunn.fesnippet.controller.App", {
			onInit: function () {
				
				this.getView().setModel(FolderStructure.getJSONModel());
				FolderStructure.getFolderStructure();

				//
				//

				var converter = new showdown.Converter(),
				text      = '# Hello, Fiori Elements World',
				html      = converter.makeHtml(text);
	
				var oHTML = this.byId("idHTMLContent");
				oHTML.setContent(html);
			},

			onToggleOpenState: function (oEvent) {
				var iItemIndex = oEvent.getParameter("itemIndex");
				var oItemContext = oEvent.getParameter("itemContext");
				var sPath = oItemContext.getPath();
				var oNodeObject = this.getView().getModel().getObject(sPath);

				var oTree = this.byId("idNavTree");

				FolderStructure.sendRequest(oNodeObject.childUrl,sPath);
			},

			onSelectTopic: function(oEvent, sDirectUrl){
				if(sDirectUrl !== undefined){ 
					debugger;
					var content = FolderStructure.getDocument(sDirectUrl);
					debugger;
				}
				
			}
		});
	});
