sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function (JSONModel, Device) {
	"use strict";

	return {

		getJSONModel: function () {
			this.oJsonModel = new JSONModel();
			
			return this.oJsonModel
		},
		getFolderStructure: function () {
			this.folderStructure = {};
			this.folderRequest = new XMLHttpRequest();
			this.sendRequest('content/');

		},

		sendRequest: function (sPath, sModelPath) {

			this.folderRequest.open('GET', sPath, true);
			this.folderRequest.send();

			this.folderRequest.onreadystatechange = function () {
				this.aTreeStructure = [];
				if (this.folderRequest.readyState === 4) {

					var element = document.createElement('html');
					element.innerHTML = this.folderRequest.responseText;
					var directoryElements = element.getElementsByTagName('a');


					for (var i = 2; i < directoryElements.length; i++) {

						if (directoryElements[i].className === 'icon icon-directory') {
							debugger;
							var sFolderName = directoryElements[i].title.substring(0, directoryElements[i].title.length - 1);
							var sUrl = directoryElements[i].href.replace('http://','').replace(directoryElements[i].host,'');
							var oFolderObject = {
								text: sFolderName,
								childUrl: sUrl,
								nodes: [{ text: "", }]
							};
							this.aTreeStructure.push(oFolderObject);
						} else if (directoryElements[i].className === 'icon icon icon-md icon-text') {
							var sFileName = directoryElements[i].title.substring(0, directoryElements[i].title.length);
							var oFileObject = {
								text: sFileName,
							};
							this.aTreeStructure.push(oFileObject);
						}
					}

					this.oJsonModel.setProperty(sModelPath ? sModelPath + "/nodes" : "/", this.aTreeStructure);


				}
			}.bind(this);

		}

	};
});