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

				this._theme = {"light":false};
				this.getView().setModel(FolderStructure.getJSONModel());
				FolderStructure.getFolderStructure();

			},

			onToggleOpenState: function (oEvent) {
				var iItemIndex = oEvent.getParameter("itemIndex");
				var oItemContext = oEvent.getParameter("itemContext");
				var sPath = oItemContext.getPath();
				var oNodeObject = this.getView().getModel().getObject(sPath);

				var oTree = this.byId("idNavTree");

				FolderStructure.sendRequest(oNodeObject.childUrl, sPath);
			},

			onSelectTopic: function (oEvent, sDirectUrl, sTitel) {
				if (sDirectUrl !== undefined) {
					var oDetailPage = this.byId("idDetailPage");
					oDetailPage.setTitle(sTitel);

					FolderStructure.getDocument(sDirectUrl).then(function (sMarkdownText) {
						
						var oConverter = new showdown.Converter();
						var oOptions = showdown.getOptions();
					
						oConverter.setOption('tables', true);
						oConverter.setOption('completeHTMLDocument',true);
						sMarkdownText = sMarkdownText.replace("/img/", "https://raw.githubusercontent.com/s-cbrunn/FioriElementsSnippets/main/img/");
					    var sHTML = oConverter.makeHtml(sMarkdownText);
						
						
						
						var oHTML = this.byId("idHTMLContent");
						
						oHTML.setContent("");
				        oHTML.setContent(sHTML);

					}.bind(this)
					);
				
				}

			},

			onChangeTheme: function(oEvent){
				
				if (this._theme.light === true){
					sap.ui.getCore().applyTheme("sap_fiori_3_dark");
					this._theme.light = false;
				}
				else{
					sap.ui.getCore().applyTheme("sap_fiori_3");
					this._theme.light = true;
				}
				
			}
		});
	});
