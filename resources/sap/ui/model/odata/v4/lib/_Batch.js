/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./_Helper","sap/base/strings/escapeRegExp"],function(_,e){"use strict";var a={"POST":true,"PUT":true,"PATCH":true,"DELETE":true},b,r=/^\$\d+/,c=/(\S*?)=(?:"(.+)"|(\S+))/;function g(C){var B=d(C,"boundary"),m=C.trim().indexOf("multipart/mixed");if(m!==0||!B){throw new Error('Invalid $batch response header "Content-Type": '+C);}B=e(B);return new RegExp('--'+B+'(?:[ \t]*\r\n|--)');}function d(H,p){var P,i=H.split(";"),m;p=p.toLowerCase();for(P=1;P<i.length;P+=1){m=c.exec(i[P]);if(m[1].toLowerCase()===p){return m[2]||m[3];}}}function f(m){var C=j(m,"content-type");return C.startsWith("multipart/mixed;")?C:undefined;}function h(m){var C=j(m,"content-id"),R;if(!C){throw new Error("Content-ID MIME header missing for the change set response.");}R=parseInt(C);if(isNaN(R)){throw new Error("Invalid Content-ID value in change set response.");}return R;}function j(H,m){var i,n,o=H.split("\r\n");for(i=0;i<o.length;i+=1){n=o[i].split(":");if(n[0].toLowerCase().trim()===m){return n[1].trim();}}}function k(C,R,I){var B=R.split(g(C)),m=[];B=B.slice(1,-1);B.forEach(function(n){var o,p,q,H,t,u,v,w,x,y,i,M,z,A={},D;z=n.indexOf("\r\n\r\n");M=n.slice(0,z);x=n.indexOf("\r\n\r\n",z+4);w=n.slice(z+4,x);o=f(M);if(o){m.push(k(o,n.slice(z+4),true));return;}v=w.split("\r\n");y=v[0].split(" ");A.status=parseInt(y[1]);A.statusText=y.slice(2).join(' ');A.headers={};for(i=1;i<v.length;i+=1){H=v[i];q=H.indexOf(':');t=H.slice(0,q).trim();u=H.slice(q+1).trim();A.headers[t]=u;if(t.toLowerCase()==="content-type"){p=d(u,"charset");if(p&&p.toLowerCase()!=="utf-8"){throw new Error('Unsupported "Content-Type" charset: '+p);}}}A.responseText=n.slice(x+4,-2);if(I){D=h(M);m[D]=A;}else{m.push(A);}});return m;}function s(H){var i,m=[];for(i in H){m=m.concat(i,":",H[i],"\r\n");}return m;}function l(R,C){var B=(C!==undefined?"changeset_":"batch_")+_.uid(),i=C!==undefined,m=[];if(i){m=m.concat("Content-Type: multipart/mixed;boundary=",B,"\r\n\r\n");}R.forEach(function(o,n){var p="",u=o.url;if(i){o.$ContentID=n+"."+C;p="Content-ID:"+o.$ContentID+"\r\n";}m=m.concat("--",B,"\r\n");if(Array.isArray(o)){if(i){throw new Error('Change set must not contain a nested change set.');}m=m.concat(l(o,n).body);}else{if(i&&!a[o.method]){throw new Error("Invalid HTTP request method: "+o.method+". Change set must contain only POST, PUT, PATCH or DELETE requests.");}if(C!==undefined&&u[0]==="$"){u=u.replace(r,"$&."+C);}m=m.concat("Content-Type:application/http\r\n","Content-Transfer-Encoding:binary\r\n",p,"\r\n",o.method," ",u," HTTP/1.1\r\n",s(_.resolveIfMatchHeader(o.headers)),"\r\n",JSON.stringify(o.body)||"","\r\n");}});m=m.concat("--",B,"--\r\n");return{body:m,batchBoundary:B};}b={deserializeBatchResponse:function(C,R){return k(C,R,false);},serializeBatchRequest:function(R){var B=l(R);return{body:B.body.join(""),headers:{"Content-Type":"multipart/mixed; boundary="+B.batchBoundary,"MIME-Version":"1.0"}};}};return b;},false);
