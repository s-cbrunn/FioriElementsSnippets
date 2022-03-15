/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/library","sap/ui/core/Control","sap/ui/model/type/Date","sap/ui/model/odata/type/ODataType","sap/ui/core/format/DateFormat","sap/ui/core/LocaleData","sap/ui/core/Locale",'./TimePickerInternalsRenderer'],function(c,C,S,O,D,L,a,T){"use strict";var b=1,d=c.CalendarType;var e=C.extend("sap.m.TimePickerInternals",{metadata:{library:"sap.m",properties:{localeId:{type:"string",group:"Data"},displayFormat:{name:"displayFormat",type:"string",group:"Appearance"},minutesStep:{type:"int",group:"Misc",defaultValue:b},secondsStep:{type:"int",group:"Misc",defaultValue:b},value:{type:"string",group:"Data",defaultValue:null},valueFormat:{type:"string",group:"Data",defaultValue:null},support2400:{type:"boolean",group:"Misc",defaultValue:false}},aggregations:{_buttonAmPm:{type:"sap.m.SegmentedButton",multiple:false,visibility:"hidden"}}}});e.prototype.init=function(){var l=sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale(),o=L.getInstance(l),p=o.getDayPeriods("abbreviated"),f=o.getTimePattern("medium");this._oResourceBundle=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._sAM=p[0];this._sPM=p[1];this._kbdBuffer="";this.setDisplayFormat(f);this._setTimeValues();this._sMinutes;this._sSeconds;this._clickAttached;this._setAriaLabel(this._oResourceBundle.getText("TIMEPICKER_CLOCK_DIAL_LABEL"));this._setAriaRoleDescription(this._oResourceBundle.getText("TIMEPICKER_INPUTS_ROLE_DESCRIPTION"));};e.prototype.exit=function(){this._destroyControls();this.destroyAggregation("_texts");};e.prototype.setDisplayFormat=function(f){this.setProperty("displayFormat",f,true);this._destroyControls();this._createControls();return this;};e.prototype.setLocaleId=function(l){var o,p;l=this.validateProperty("localeId",l);this.setProperty("localeId",l,true);if(l){o=new a(l);p=L.getInstance(o).getDayPeriods("abbreviated");this._sAM=p[0];this._sPM=p[1];this._destroyControls();this._createControls();}return this;};e.prototype.setSupport2400=function(f){this.setProperty("support2400",f,true);this._destroyControls();this._createControls();return this;};e.prototype.setMinutesStep=function(v){this.setProperty("minutesStep",v,true);this._destroyControls();this._createControls();return this;};e.prototype.setSecondsStep=function(v){this.setProperty("secondsStep",v,true);this._destroyControls();this._createControls();return this;};e.prototype._destroyControls=function(){};e.prototype._createControls=function(){};e.prototype._setTimeValues=function(o,h){};e.prototype._checkStyle=function(p){return(p==="short"||p==="medium"||p==="long"||p==="full");};e.prototype._getDisplayFormatPattern=function(){var p=this.getDisplayFormat();if(this._checkStyle(p)){p=this._getLocaleBasedPattern(p);}return p;};e.prototype._getValueFormatPattern=function(){var p=this._getBoundValueTypePattern()||this.getValueFormat()||"medium";if(this._checkStyle(p)){p=this._getLocaleBasedPattern(p);}return p;};e.prototype._getLocaleBasedPattern=function(p){return L.getInstance(sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale()).getTimePattern(p);};e.prototype._getFormatButton=function(){return this.getAggregation("_buttonAmPm");};e.prototype._parseValue=function(v){return this._getFormatter().parse(v);};e.prototype._getFormatter=function(){var p=this._getBoundValueTypePattern(),r=false,B=this.getBinding("value"),f;if(B&&B.oType&&B.oType.oOutputFormat){r=!!B.oType.oOutputFormat.oFormatOptions.relative;f=B.oType.oOutputFormat.oFormatOptions.calendarType;}if(!p){p=this.getValueFormat()||"medium";f=d.Gregorian;}if(!f){f=sap.ui.getCore().getConfiguration().getCalendarType();}return this._getFormatterInstance(p,r,f);};e.prototype._getBoundValueTypePattern=function(){var B=this.getBinding("value"),o=B&&B.getType&&B.getType();if(o instanceof S){return o.getOutputPattern();}if(o instanceof O&&o.oFormat){return o.oFormat.oFormatOptions.pattern;}return undefined;};e.prototype._getFormatterInstance=function(p,r,f,g){var F;if(this._checkStyle(p)){F=this._getFormatInstance({style:p,strictParsing:true,relative:r,calendarType:f});}else{F=this._getFormatInstance({pattern:p,strictParsing:true,relative:r,calendarType:f});}return F;};e.prototype._getFormatInstance=function(A,f){return D.getTimeInstance(A);};e.prototype._formatValue=function(o){if(o){return this._getFormatter().format(o);}return"";};e.prototype._getTimeSeparators=function(f){var F=sap.ui.core.format.DateFormat.getInstance({pattern:f}).aFormatArray,g=[],p,i;for(i=0;i<F.length;i++){if(F[i].type!=="text"){if(p){g.push("");}else{p=true;}}else{g.push(F[i].value);p=false;}}return g;};e.prototype._isFormatSupport24=function(){var f=this._getDisplayFormatPattern();return f.indexOf("HH")!==-1||f.indexOf("H")!==-1;};e.prototype._formatNumberToString=function(n,p,m,r){var N;if(p&&n<10){N="0"+n;}else if(n===m&&r!==""){N=r;}else{N=n.toString();}return N;};e.prototype._setAriaLabel=function(A){this._sAriaLabel=A;return this;};e.prototype._getAriaLabel=function(){return this._sAriaLabel;};e.prototype._setAriaRoleDescription=function(A){this._sAriaRoleDescription=A;return this;};e.prototype._getAriaRoleDescription=function(){return this._sAriaRoleDescription;};e._replaceZeroHoursWith24=function(v,i,I){var h=2,f=i;if(i===-1){h=1;f=I;}return v.substr(0,f)+"24"+v.substr(f+h);};e._replace24HoursWithZero=function(v,i,I){var h=2,f=i;if(i===-1){h=1;f=I;}return v.substr(0,f)+s(0,h)+v.substr(f+2);};e._isHoursValue24=function(v,i,I){if(i===-1&&I===-1){return false;}var f=i;if(i===-1){f=I;}return v.substr(f,2)==="24";};function s(f,g){var r="";for(var i=0;i<g;i++){r+=f;}return r;}return e;});