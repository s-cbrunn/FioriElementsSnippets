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
			debugger;
			if (window.location.hostname === "localhost") {
				this.sendRequest('content/', '')
			} else {
				this.sendRequest('https://api.github.com/repos/s-cbrunn/FioriElementsSnippets/git/trees/b067e5ee58baafdfb6f4576eb4b0325f472c596f', '')
			}

		},

		sendRequest: function (sPath, sModelPath) {
			if (window.location.hostname === "localhost") {
				this._sendRequestLocalHost(sPath, sModelPath);
			} else {
				this._sendRequestGitHub(sPath, sModelPath);
			}
		},

		_sendRequestLocalHost: function (sPath, sModelPath) {

			this.folderRequest.open('GET', sPath, true);
			this.folderRequest.send();

			this.folderRequest.onreadystatechange = function () {
				this._aTreeStructure = [];
				if (this.folderRequest.readyState === 4) {

					var element = document.createElement('html');
					element.innerHTML = this.folderRequest.responseText;
					var directoryElements = element.getElementsByTagName('a');


					for (var i = 2; i < directoryElements.length; i++) {

						if (directoryElements[i].className === 'icon icon-directory') {	// File
							debugger;
							var sFolderName = directoryElements[i].title.substring(0, directoryElements[i].title.length - 1);
							var sUrl = directoryElements[i].href.replace('http://', '').replace(directoryElements[i].host, '');
							var oFolderObject = {
								text: sFolderName,
								childUrl: sUrl,
								nodes: [{ text: "", }]
							};
							this._aTreeStructure.push(oFolderObject);
						} else if (directoryElements[i].className === 'icon icon icon-md icon-text' ||
							directoryElements[i].className === 'logo logo-img-1x') {	// Folder
							var sFileName = directoryElements[i].title.substring(0, directoryElements[i].title.length);
							var oFileObject = {
								text: sFileName,
							};
							this._aTreeStructure.push(oFileObject);
						}
					}

					this.oJsonModel.setProperty(sModelPath ? sModelPath + "/nodes" : "/", this._aTreeStructure);


				}
			}.bind(this);

		},


		_sendRequestGitHub: function (sPath, sModelPath) {

			this.folderRequest.open('GET', sPath, true);
			this.folderRequest.send();

			this.folderRequest.onreadystatechange = function () {
				this._aTreeStructure = [];
				if (this.folderRequest.readyState === 4) {


					var oGitHubObject = JSON.parse(this.folderRequest.responseText);
					var oGitHubObjectTree = oGitHubObject.tree;

					for (var i = 0; i < oGitHubObjectTree.length; i++) {

						if (oGitHubObjectTree[i].type === "tree") {  // Folder
							var oFolderObject = {
								text: oGitHubObjectTree[i].path,
								childUrl: oGitHubObjectTree[i].url,
								nodes: [{ text: "", }]
							};
							this._aTreeStructure.push(oFolderObject);
						} else {								   // File
							var oFileObject = {
								text: oGitHubObjectTree[i].path,
							};
							this._aTreeStructure.push(oFileObject);
						}

					}

					this.oJsonModel.setProperty(sModelPath ? sModelPath + "/nodes" : "/", this._aTreeStructure);
				}
			}.bind(this);

		}

	};
});