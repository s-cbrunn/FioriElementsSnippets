sap.ui.define(["sap/ui/model/json/JSONModel","sap/ui/Device"],function(e,t){"use strict";return{getJSONModel:function(){this.oJsonModel=new e;return this.oJsonModel},getFolderStructure:function(){this.folderRequest=new XMLHttpRequest;if(window.location.hostname==="localhost"){this.sendRequest("content/","")}else{this.folderRequest.open("GET","https://api.github.com/repos/s-cbrunn/FioriElementsSnippets/contents/",true);this.folderRequest.send();this.folderRequest.onreadystatechange=function(){if(this.folderRequest.readyState===4){var e=JSON.parse(this.folderRequest.responseText);for(var t=0;t<e.length;t++){if(e[t].name==="content"){this._sendRequestGitHub(e[t].git_url,"");return}}}}.bind(this)}},sendRequest:function(e,t){if(window.location.hostname==="localhost"){debugger;this._sendRequestLocalHost(e,t)}else{this._sendRequestGitHub(e,t)}},_sendRequestLocalHost:function(e,t){this.folderRequest.open("GET",e,true);this.folderRequest.send();this.folderRequest.onreadystatechange=function(){this._aTreeStructure=[];if(this.folderRequest.readyState===4){var s=document.createElement("html");s.innerHTML=this.folderRequest.responseText;var r=s.getElementsByTagName("a");for(var n=2;n<r.length;n++){if(r[n].className==="icon icon-directory"){var o=r[n].title.substring(0,r[n].title.length-1);var i=o;var a=o.split("_");var u=a[0];o=a[1];var l=r[n].href.replace("http://","").replace(r[n].host,"");var c={text:o,fullName:i,childUrl:l,nodes:[{text:""}]};this._aTreeStructure.splice(u,0,c)}else if(r[n].className==="icon icon icon-md icon-text"||r[n].className==="logo logo-img-1x"){var d=r[n].title.substring(0,r[n].title.length);var i=d;var a=d.split("_");var u=a[0];d=a[1];var h={directLink:e+i,text:d.replace(/\.[^/.]+$/,"")};this._aTreeStructure.splice(u,0,h)}}this.oJsonModel.setProperty(t?t+"/nodes":"/",this._aTreeStructure)}}.bind(this)},_sendRequestGitHub:function(e,t){this.folderRequest.open("GET",e,true);this.folderRequest.send();this.folderRequest.onreadystatechange=function(){this._aTreeStructure=[];if(this.folderRequest.readyState===4){var e=JSON.parse(this.folderRequest.responseText);var s=e.tree;for(var r=0;r<s.length;r++){if(s[r].type==="tree"){var n=s[r].path;var o=s[r].path.split("_");var i=o[0];var a=o[1];var u={text:a,fullName:n,childUrl:s[r].url,nodes:[{text:""}]};this._aTreeStructure.splice(i,0,u)}else{var l=s[r].path.replace(/\.[^/.]+$/,"");var o=l.split("_");var i=o[0];var c=o[1];var d={directLink:s[r].url,text:c};this._aTreeStructure.splice(i,0,d)}}this.oJsonModel.setProperty(t?t+"/nodes":"/",this._aTreeStructure)}}.bind(this)},getDocument:async function(e){var t=new Promise(function(t,s){var r=new XMLHttpRequest;r.onreadystatechange=function(){if(r.readyState==4&&r.status==200){if(window.location.hostname==="localhost"){var e=r.responseText;t(e)}else{var s=JSON.parse(r.responseText);var n=decodeURIComponent(atob(s.content).split("").map(function(e){return"%"+("00"+e.charCodeAt(0).toString(16)).slice(-2)}).join(""));t(n)}return}};r.open("GET",e);r.send()});return t}}});