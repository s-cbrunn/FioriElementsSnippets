/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/base/Object','sap/base/assert','./CalendarType'],function(B,a,C){"use strict";var r=/^((?:[A-Z]{2,3}(?:-[A-Z]{3}){0,3})|[A-Z]{4}|[A-Z]{5,8})(?:-([A-Z]{4}))?(?:-([A-Z]{2}|[0-9]{3}))?((?:-[0-9A-Z]{5,8}|-[0-9][0-9A-Z]{3})*)((?:-[0-9A-WYZ](?:-[0-9A-Z]{2,8})+)*)(?:-(X(?:-[0-9A-Z]{1,8})+))?$/i;var L=B.extend("sap.ui.core.Locale",{constructor:function(l){B.apply(this);var R=r.exec(l.replace(/_/g,"-"));if(R===null){throw new TypeError("The given language '"+l+"' does not adhere to BCP-47.");}this.sLocaleId=l;this.sLanguage=R[1]||null;this.sScript=R[2]||null;this.sRegion=R[3]||null;this.sVariant=(R[4]&&R[4].slice(1))||null;this.sExtension=(R[5]&&R[5].slice(1))||null;this.sPrivateUse=R[6]||null;if(this.sLanguage){this.sLanguage=this.sLanguage.toLowerCase();}if(this.sScript){this.sScript=this.sScript.toLowerCase().replace(/^[a-z]/,function($){return $.toUpperCase();});}if(this.sRegion){this.sRegion=this.sRegion.toUpperCase();}},getLanguage:function(){return this.sLanguage;},getScript:function(){return this.sScript;},getRegion:function(){return this.sRegion;},getVariant:function(){return this.sVariant;},getVariantSubtags:function(){return this.sVariant?this.sVariant.split('-'):[];},getExtension:function(){return this.sExtension;},getExtensionSubtags:function(){return this.sExtension?this.sExtension.slice(2).split('-'):[];},getPrivateUse:function(){return this.sPrivateUse;},getPrivateUseSubtags:function(){return this.sPrivateUse?this.sPrivateUse.slice(2).split('-'):[];},hasPrivateUseSubtag:function(s){a(s&&s.match(/^[0-9A-Z]{1,8}$/i),"subtag must be a valid BCP47 private use tag");return this.getPrivateUseSubtags().indexOf(s)>=0;},toString:function(){return j(this.sLanguage,this.sScript,this.sRegion,this.sVariant,this.sExtension,this.sPrivateUse);},toLanguageTag:function(){var l=this.getModernLanguage();var s=this.sScript;if(l==="sr"&&s==="Latn"){l="sh";s=null;}return j(l,s,this.sRegion,this.sVariant,this.sExtension,this.sPrivateUse);},getModernLanguage:function(){return M[this.sLanguage]||this.sLanguage;},getSAPLogonLanguage:function(){var l=this.sLanguage||"";if(l.indexOf("-")>=0){l=l.slice(0,l.indexOf("-"));}l=M[l]||l;if(l==="zh"&&!this.sScript&&this.sRegion==="TW"){return"ZF";}return(c[j(l,this.sScript)]||c[j(l,this.sRegion)]||c[g(this.sPrivateUse)]||l.toUpperCase());},getPreferredCalendarType:function(){return L._mPreferredCalendar[this.getLanguage()+"-"+this.getRegion()]||L._mPreferredCalendar[this.getLanguage()]||L._mPreferredCalendar["default"];}});function g(p){if(p){var m=/-(saptrc|sappsd|saprigi)(?:-|$)/i.exec(p);return m&&"en-US-x-"+m[1].toLowerCase();}}var M={"iw":"he","ji":"yi"};var b={"ZH":"zh-Hans","ZF":"zh-Hant","SH":"sr-Latn","6N":"en-GB","1P":"pt-PT","1X":"es-MX","3F":"fr-CA","1Q":"en-US-x-saptrc","2Q":"en-US-x-sappsd","3Q":"en-US-x-saprigi"};var c=i(b);function d(v){var m=/\$([-a-z0-9A-Z._]+)(?::([^$]*))?\$/.exec(v);return(m&&m[2])?m[2].split(/,/):null;}var A=d("$cldr-rtl-locales:ar,fa,he$")||[];L._cldrLocales=d("$cldr-locales:ar,ar_EG,ar_SA,bg,ca,cy,cs,da,de,de_AT,de_CH,el,el_CY,en,en_AU,en_GB,en_HK,en_IE,en_IN,en_NZ,en_PG,en_SG,en_ZA,es,es_AR,es_BO,es_CL,es_CO,es_MX,es_PE,es_UY,es_VE,et,fa,fi,fr,fr_BE,fr_CA,fr_CH,fr_LU,he,hi,hr,hu,id,it,it_CH,ja,kk,ko,lt,lv,ms,nb,nl,nl_BE,pl,pt,pt_PT,ro,ru,ru_UA,sk,sl,sr,sr_Latn,sv,th,tr,uk,vi,zh_CN,zh_HK,zh_SG,zh_TW$");L._mPreferredCalendar={"ar-SA":C.Islamic,"fa":C.Persian,"th":C.Buddhist,"default":C.Gregorian};L._coreI18nLocales=d("$core-i18n-locales:,ar,bg,ca,cs,da,de,el,en,en_GB,es,es_MX,et,fi,fr,hi,hr,hu,it,iw,ja,kk,ko,lt,lv,ms,nl,no,pl,pt,ro,ru,sh,sk,sl,sv,th,tr,uk,vi,zh_CN,zh_TW$");L._impliesRTL=function(l){var o=l instanceof L?l:new L(l);var s=o.getLanguage()||"";s=(s&&M[s])||s;var R=o.getRegion()||"";if(R&&A.indexOf(s+"_"+R)>=0){return true;}return A.indexOf(s)>=0;};L.fromSAPLogonLanguage=function(s){if(s&&typeof s==='string'){s=b[s.toUpperCase()]||s;try{return new L(s);}catch(e){}}};function j(){return Array.prototype.filter.call(arguments,Boolean).join("-");}function i(o){return Object.keys(o).reduce(function(e,k){e[o[k]]=k;return e;},{});}return L;});
