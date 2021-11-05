sap.ui.define(["sap/ui/model/json/JSONModel","sap/ui/Device"],function(e,t){"use strict";return{getJSONModel:function(){this.oJsonModel=new e;return this.oJsonModel},getFolderStructure:function(){this.folderRequest=new XMLHttpRequest;if(window.location.hostname==="localhost"){this.sendRequest("content/","")}else{this.sendRequest("https://api.github.com/repos/s-cbrunn/FioriElementsSnippets/git/trees/b067e5ee58baafdfb6f4576eb4b0325f472c596f","")}},sendRequest:function(e,t){if(window.location.hostname==="localhost"){this._sendRequestLocalHost(e,t)}else{this._sendRequestGitHub(e,t)}},_sendRequestLocalHost:function(e,t){this.folderRequest.open("GET",e,true);this.folderRequest.send();this.folderRequest.onreadystatechange=function(){this._aTreeStructure=[];if(this.folderRequest.readyState===4){var s=document.createElement("html");s.innerHTML=this.folderRequest.responseText;var r=s.getElementsByTagName("a");for(var n=2;n<r.length;n++){if(r[n].className==="icon icon-directory"){var o=r[n].title.substring(0,r[n].title.length-1);var i=r[n].href.replace("http://","").replace(r[n].host,"");var a={text:o,childUrl:i,nodes:[{text:""}]};this._aTreeStructure.push(a)}else if(r[n].className==="icon icon icon-md icon-text"||r[n].className==="logo logo-img-1x"){var u=r[n].title.substring(0,r[n].title.length);var l={directLink:e+u,text:u};this._aTreeStructure.push(l)}}this.oJsonModel.setProperty(t?t+"/nodes":"/",this._aTreeStructure)}}.bind(this)},_sendRequestGitHub:function(e,t){this.folderRequest.open("GET",e,true);this.folderRequest.send();this.folderRequest.onreadystatechange=function(){this._aTreeStructure=[];if(this.folderRequest.readyState===4){var e=JSON.parse(this.folderRequest.responseText);var s=e.tree;for(var r=0;r<s.length;r++){if(s[r].type==="tree"){var n={text:s[r].path,childUrl:s[r].url,nodes:[{text:""}]};this._aTreeStructure.push(n)}else{var o={directLink:s[r].url,text:s[r].path};this._aTreeStructure.push(o)}}this.oJsonModel.setProperty(t?t+"/nodes":"/",this._aTreeStructure)}}.bind(this)},getDocument:async function(e){var t=new Promise(function(t,s){var r=new XMLHttpRequest;r.onreadystatechange=function(){if(r.readyState==4&&r.status==200){if(window.location.hostname==="localhost"){var e=r.responseText;t(e)}else{var s=JSON.parse(r.responseText);var n=atob(s.content);t(n)}return}};r.open("GET",e);r.send()});return t}}});