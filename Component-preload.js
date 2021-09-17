//@ui5-bundle de/scbrunn/fesnippet/Component-preload.js
jQuery.sap.registerPreloadedModules({
"version":"2.0",
"modules":{
	"de/scbrunn/fesnippet/Component.js":function(){sap.ui.define(["sap/ui/core/UIComponent","sap/ui/Device","de/scbrunn/fesnippet/model/models"],function(e,t,i){"use strict";return e.extend("de.scbrunn.fesnippet.Component",{metadata:{manifest:"json"},init:function(){e.prototype.init.apply(this,arguments);this.getRouter().initialize();this.setModel(i.createDeviceModel(),"device")}})});
},
	"de/scbrunn/fesnippet/controller/App.controller.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller"],function(n){"use strict";return n.extend("de.scbrunn.fesnippet.controller.App",{onInit:function(){}})});
},
	"de/scbrunn/fesnippet/i18n/i18n.properties":'title=Title\nappTitle=App\nappDescription=App Description\n',
	"de/scbrunn/fesnippet/localService/mockserver.js":function(){sap.ui.define(["sap/ui/core/util/MockServer","sap/ui/model/json/JSONModel","sap/base/util/UriParameters","sap/base/Log"],function(e,t,r,a){"use strict";var o,i="de.scbrunn.fesnippet/",n=i+"localService/mockdata";var s={init:function(s){var u=s||{};return new Promise(function(s,c){var p=sap.ui.require.toUrl(i+"manifest.json"),f=new t(p);f.attachRequestCompleted(function(){var t=new r(window.location.href),c=sap.ui.require.toUrl(n),p=f.getProperty("/sap.app/dataSources/mainService"),l=sap.ui.require.toUrl(i+p.settings.localUri),d=p.uri&&new URI(p.uri).absoluteTo(sap.ui.require.toUrl(i)).toString();if(!o){o=new e({rootUri:d})}else{o.stop()}e.config({autoRespond:true,autoRespondAfter:u.delay||t.get("serverDelay")||500});o.simulate(l,{sMockdataBaseUrl:c,bGenerateMissingMockData:true});var m=o.getRequests();var v=function(e,t,r){r.response=function(r){r.respond(e,{"Content-Type":"text/plain;charset=utf-8"},t)}};if(u.metadataError||t.get("metadataError")){m.forEach(function(e){if(e.path.toString().indexOf("$metadata")>-1){v(500,"metadata Error",e)}})}var g=u.errorType||t.get("errorType"),h=g==="badRequest"?400:500;if(g){m.forEach(function(e){v(h,g,e)})}o.setRequests(m);o.start();a.info("Running the app with mock data");s()});f.attachRequestFailed(function(){var e="Failed to load application manifest";a.error(e);c(new Error(e))})})},getMockServer:function(){return o}};return s});
},
	"de/scbrunn/fesnippet/manifest.json":'{"_version":"1.32.0","sap.app":{"id":"de.scbrunn.fesnippet","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"1.0.0"},"title":"{{appTitle}}","description":"{{appDescription}}","resources":"resources.json","ach":"ach"},"sap.ui":{"technology":"UI5","icons":{"icon":"sap-icon://task","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"flexEnabled":false,"rootView":{"viewName":"de.scbrunn.fesnippet.view.App","type":"XML","async":true,"id":"App"},"dependencies":{"minUI5Version":"1.94.0","libs":{"sap.ui.core":{},"sap.m":{},"sap.ui.layout":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"de.scbrunn.fesnippet.i18n.i18n"}}},"resources":{"css":[{"uri":"css/style.css"}]},"routing":{"config":{"routerClass":"sap.m.routing.Router","viewType":"XML","async":true,"viewPath":"de.scbrunn.fesnippet.view","controlAggregation":"pages","controlId":"app","clearControlAggregation":false},"routes":[{"name":"RouteApp","pattern":"RouteApp","target":["TargetApp"]}],"targets":{"TargetApp":{"viewType":"XML","transition":"slide","clearControlAggregation":false,"viewId":"App","viewName":"App"}}}}}',
	"de/scbrunn/fesnippet/model/models.js":function(){sap.ui.define(["sap/ui/model/json/JSONModel","sap/ui/Device"],function(e,n){"use strict";return{createDeviceModel:function(){var i=new e(n);i.setDefaultBindingMode("OneWay");return i}}});
},
	"de/scbrunn/fesnippet/view/App.view.xml":'<mvc:View\n    controllerName="de.scbrunn.fesnippet.controller.App"\n    xmlns:mvc="sap.ui.core.mvc"\n    displayBlock="true"\n    xmlns="sap.m"\n><Shell id="shell"><App id="app"><pages><Page id="page" title="{i18n>title}"><content /></Page></pages></App></Shell></mvc:View>\n'
}});
