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
			this.folderRequest = new XMLHttpRequest();

			if (window.location.hostname === "localhost") {
				this.sendRequest('content/', '')
			} else {

				this.folderRequest.open('GET', "https://api.github.com/repos/s-cbrunn/FioriElementsSnippets/contents/", true);
			    this.folderRequest.send();    
	
				this.folderRequest.onreadystatechange = function () {
				
					if (this.folderRequest.readyState === 4) {
						
						var aGitHubObject = JSON.parse(this.folderRequest.responseText);	
						for(var i=0; i < aGitHubObject.length; i++){
							if(aGitHubObject[i].name === "content"){
								this._sendRequestGitHub(aGitHubObject[i].git_url, '');
								return;
							}

						}
	
					}
				}.bind(this);
			}

		},

		sendRequest: function (sPath, sModelPath) {
			if (window.location.hostname === "localhost") {
				debugger;
				this._sendRequestLocalHost(sPath, sModelPath);
			} else {
				this._sendRequestGitHub(sPath, sModelPath)
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

						if (directoryElements[i].className === 'icon icon-directory') {	// Folder
							var sFolderName = directoryElements[i].title.substring(0, directoryElements[i].title.length - 1);
							var sFullName = sFolderName;
							var aOrderName = sFolderName.split("_");
							var index = aOrderName[0];
							    sFolderName = aOrderName[1];
							var sUrl = directoryElements[i].href.replace('http://', '').replace(directoryElements[i].host, '');
							var oFolderObject = {
								text: sFolderName,
								fullName: sFullName,
								childUrl: sUrl,
								nodes: [{ text: "", }]
							};
							this._aTreeStructure.splice(index,0,oFolderObject);
						} else if (directoryElements[i].className === 'icon icon icon-md icon-text' ||
							directoryElements[i].className === 'logo logo-img-1x') {	// File
							var sFileName = directoryElements[i].title.substring(0, directoryElements[i].title.length);
							var sFullName = sFileName;
							var aOrderName = sFileName.split("_");
							var index = aOrderName[0];
							sFileName = aOrderName[1];
							var oFileObject = {
								directLink: sPath + sFullName,
								text: sFileName.replace(/\.[^/.]+$/, "")
							};
							this._aTreeStructure.splice(index,0,oFileObject);
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
							var sFullName = oGitHubObjectTree[i].path
							var aOrderName = oGitHubObjectTree[i].path.split("_");
							var index = aOrderName[0];
							var sFolderName = aOrderName[1];
							var oFolderObject = {
								text: sFolderName,
								fullName: sFullName,
								childUrl: oGitHubObjectTree[i].url,
								nodes: [{ text: "", }]
							};
							this._aTreeStructure.splice(index,0,oFolderObject);
						} else {                                          // File
							var sText = oGitHubObjectTree[i].path.replace(/\.[^/.]+$/, "");
							var aOrderName = sText.split("_");
							var index = aOrderName[0];
							var sFileName = aOrderName[1];								  
							var oFileObject = {
								directLink: oGitHubObjectTree[i].url,
								text: sFileName
							};
							this._aTreeStructure.splice(index,0,oFileObject);
						}

					}

					this.oJsonModel.setProperty(sModelPath ? sModelPath + "/nodes" : "/", this._aTreeStructure);
				}
			}.bind(this);

		},

		getDocument: async function (sPath) {
			var oPromise = new Promise(function (resolve, reject) {
				var documentRequest = new XMLHttpRequest();
				documentRequest.onreadystatechange = function () {
					if (documentRequest.readyState == 4 && documentRequest.status == 200) {
						if (window.location.hostname === "localhost") {
							
							var content = documentRequest.responseText;
							resolve(content);
						}
						else {
							var oGitHubObject = JSON.parse(documentRequest.responseText);
							var decodedString= decodeURIComponent(atob(oGitHubObject.content).split('').map(function(c) {
								return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
							}).join(''));

							resolve(decodedString);
						}
						return
					}
				}
				documentRequest.open('GET', sPath);
				documentRequest.send();
			});
			return oPromise;
		}

	};
});