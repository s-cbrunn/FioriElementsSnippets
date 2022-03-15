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

				this._theme = { "light": false };
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
					debugger;
					FolderStructure.getDocument(sDirectUrl).then(function (sMarkdownText) {

						var oConverter = new showdown.Converter();
						var oOptions = showdown.getOptions();

						oConverter.setOption('tables', true);
						oConverter.setOption('completeHTMLDocument', true);

						if (window.location.hostname !== "localhost") {
							sMarkdownText = sMarkdownText.replace("/img/", "https://raw.githubusercontent.com/s-cbrunn/FioriElementsSnippets/main/img/");
						}
						

						var sHTML = oConverter.makeHtml(sMarkdownText);
						sHTML = sHTML.replace(new RegExp("<pre>", 'g'), "<pre style=\"padding: 16px; overflow: auto; font-size: 85%; line-height: 1.45; color: #8fb774; background-color: #2f3843; border-radius: 6px; border-left: .6rem solid #6bd3ff; border-left-width: 0.6rem; border-left-style: solid; border-left-color: rgb(107, 211, 255); \">");
						sHTML = sHTML.replace(new RegExp("<blockquote>", 'g'), "<blockquote style=\"padding: 16px; overflow: auto; font-size: 85%; line-height: 1.45; color: #8fb774; background-color: #2f3843; border-radius: 6px; border-left: .6rem solid #d6dc74; border-left-width: 0.6rem; border-left-style: solid; border-left-color: rgb(214, 220, 116); \">");
						sHTML = sHTML.replace(new RegExp("</head>", 'g'), "<style>table, th, td { border: 1px solid black; border-collapse: collapse; border-color: #345564 } </style></head>");
						sHTML = sHTML.replace(new RegExp("<table>", 'g'), "<table style=\"border: 1px solid black\">");
						var oHTML = this.byId("idHTMLContent");

						oHTML.setContent("");
						oHTML.setContent(sHTML);

					}.bind(this)
					);

				}

			},

			onChangeTheme: function (oEvent) {

				if (this._theme.light === true) {
					sap.ui.getCore().applyTheme("sap_fiori_3_dark");
					this._theme.light = false;
				}
				else {
					sap.ui.getCore().applyTheme("sap_fiori_3");
					this._theme.light = true;
				}

			}
		});
	});
