/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.getCore().loadLibrary("sap.ui.unified");sap.ui.define(['sap/ui/thirdparty/jquery','sap/ui/Device',"sap/ui/core/Element",'./InputBase','./DateTimeField','./Button','./ResponsivePopover','sap/ui/core/date/UniversalDate','./library','sap/ui/core/Control','sap/ui/core/library',"./DatePickerRenderer","sap/base/util/deepEqual","sap/base/assert","sap/base/Log","sap/ui/core/IconPool","./InstanceManager","sap/ui/unified/Calendar","sap/ui/unified/DateRange",'sap/ui/unified/DateTypeRange',"sap/ui/unified/calendar/CustomMonthPicker","sap/ui/unified/calendar/CustomYearPicker","sap/ui/core/LabelEnablement","sap/ui/unified/library","sap/ui/dom/jquery/cursorPos"],function(q,D,E,I,a,B,R,U,l,C,c,b,d,e,L,f,g,h,j,k,m,n,o,u){"use strict";var p=c.CalendarType;var r=sap.ui.getCore().getLibraryResourceBundle("sap.m");var s=a.extend("sap.m.DatePicker",{metadata:{library:"sap.m",properties:{displayFormatType:{type:"string",group:"Appearance",defaultValue:""},secondaryCalendarType:{type:"sap.ui.core.CalendarType",group:"Appearance",defaultValue:null},minDate:{type:"object",group:"Misc",defaultValue:null},maxDate:{type:"object",group:"Misc",defaultValue:null},showFooter:{type:"boolean",group:"Misc",defaultValue:false}},aggregations:{specialDates:{type:"sap.ui.core.Element",multiple:true,singularName:"specialDate"},_popup:{type:"sap.m.ResponsivePopover",multiple:false,visibility:"hidden"}},associations:{legend:{type:"sap.ui.core.Control",multiple:false}},events:{navigate:{parameters:{dateRange:{type:"sap.ui.unified.DateRange"},afterPopupOpened:{type:"boolean"}}}},designtime:"sap/m/designtime/DatePicker.designtime",dnd:{draggable:false,droppable:true}}});s.prototype.init=function(){a.prototype.init.apply(this,arguments);this._bIntervalSelection=false;this._bOnlyCalendar=true;this._bValid=true;this._oMinDate=new Date(1,0,1);this._oMinDate.setFullYear(1);this._oMaxDate=new Date(9999,11,31,23,59,59,999);var i=this.addEndIcon({id:this.getId()+"-icon",src:this.getIconSrc(),noTabStop:true,tooltip:r.getText("OPEN_PICKER_TEXT")});this._bShouldClosePicker=false;i.addEventDelegate({onmousedown:function(A){this._bShouldClosePicker=!!this.isOpen();}},this);i.attachPress(function(){this.toggleOpen(this._bShouldClosePicker);},this);};s.prototype.isValidValue=function(){return this._bValid;};s.prototype.isOpen=function(){return this._oPopup&&this._oPopup.isOpen();};s.prototype.toggleOpen=function(O){if(this.getEditable()&&this.getEnabled()){if(O){t.call(this);}else{_.call(this);}}};s.prototype.getIconSrc=function(){return f.getIconURI("appointment-2");};s.prototype.exit=function(){I.prototype.exit.apply(this,arguments);if(this._oPopup){if(this._oPopup.isOpen()){this._oPopup.close();}delete this._oPopup;}if(this._getCalendar()){this._getCalendar().destroy();delete this._getCalendar();}if(this._iInvalidateCalendar){clearTimeout(this._iInvalidateCalendar);}this._sUsedDisplayPattern=undefined;this._sUsedDisplayCalendarType=undefined;this._oDisplayFormat=undefined;this._sUsedValuePattern=undefined;this._sUsedValueCalendarType=undefined;this._oValueFormat=undefined;};s.prototype.invalidate=function(O){if(!O||O!=this._getCalendar()){C.prototype.invalidate.apply(this,arguments);this._iInvalidateCalendar=setTimeout(z.bind(this),0);}};s.prototype.onBeforeRendering=function(){a.prototype.onBeforeRendering.apply(this,arguments);this._checkMinMaxDate();var V=this._getValueHelpIcon();if(V){V.setProperty("visible",this.getEditable(),true);}};s.prototype.setWidth=function(W){return I.prototype.setWidth.call(this,W||"100%");};s.prototype.getWidth=function(W){return this.getProperty("width")||"100%";};s.prototype.applyFocusInfo=function(F){this._bFocusNoPopup=true;if(!D.support.touch||D.system.desktop){I.prototype.applyFocusInfo.apply(this,arguments);}};s.prototype.onfocusin=function(i){if(!q(i.target).hasClass("sapUiIcon")){I.prototype.onfocusin.apply(this,arguments);}this._bFocusNoPopup=undefined;};s.prototype.onsapshow=function(i){this.toggleOpen(this.isOpen());i.preventDefault();};s.prototype.onsaphide=s.prototype.onsapshow;s.prototype.onsappageup=function(i){var A=this._getCalendarConstructor().getMetadata().getName();i.preventDefault();if(A!="sap.ui.unified.Calendar"){return;}this._increaseDate(1,"day");};s.prototype.onsappageupmodifiers=function(i){var A=this._getCalendarConstructor().getMetadata().getName();i.preventDefault();if(!i.ctrlKey&&i.shiftKey){if(A=="sap.ui.unified.internal.CustomYearPicker"){return;}this._increaseDate(1,"month");}else{this._increaseDate(1,"year");}};s.prototype.onsappagedown=function(i){var A=this._getCalendarConstructor().getMetadata().getName();i.preventDefault();if(A!="sap.ui.unified.Calendar"){return;}this._increaseDate(-1,"day");};s.prototype.onsappagedownmodifiers=function(i){var A=this._getCalendarConstructor().getMetadata().getName();i.preventDefault();if(!i.ctrlKey&&i.shiftKey){if(A=="sap.ui.unified.internal.CustomYearPicker"){return;}this._increaseDate(-1,"month");}else{this._increaseDate(-1,"year");}};s.prototype.onkeypress=function(i){if(!i.charCode||i.metaKey||i.ctrlKey){return;}var F=this._getFormatter(true);var A=String.fromCharCode(i.charCode);if(A&&F.sAllowedCharacters&&F.sAllowedCharacters.indexOf(A)<0){i.preventDefault();}};s.prototype._getValueHelpIcon=function(){var V=this.getAggregation("_endIcon");return V&&V[0];};s.prototype._dateValidation=function(i){this._bValid=true;if(i&&(i.getTime()<this._oMinDate.getTime()||i.getTime()>this._oMaxDate.getTime())){this._bValid=false;e(this._bValid,"Date must be in valid range");}this.setProperty("dateValue",i);return i;};s.prototype.setMinDate=function(i){if(!this._isValidDate(i)){throw new Error("Date must be a JavaScript date object; "+this);}if(d(this.getMinDate(),i)){return this;}if(i){var Y=i.getFullYear();if(Y<1||Y>9999){throw new Error("Date must be between 0001-01-01 and 9999-12-31; "+this);}this._oMinDate=new Date(i.getTime());var A=this.getDateValue();if(A&&A.getTime()<i.getTime()){this._bValid=false;L.warning("DateValue not in valid date range",this);}}else{this._oMinDate=new Date(1,0,1);this._oMinDate.setFullYear(1);}this.setProperty("minDate",i);if(this._getCalendar()){this._getCalendar().setMinDate(i);}this._oMinDate.setHours(0,0,0,0);return this;};s.prototype.setMaxDate=function(i){if(!this._isValidDate(i)){throw new Error("Date must be a JavaScript date object; "+this);}if(d(this.getMaxDate(),i)){return this;}if(i){var Y=i.getFullYear();if(Y<1||Y>9999){throw new Error("Date must be between 0001-01-01 and 9999-12-31; "+this);}this._oMaxDate=new Date(i.getTime());var A=this.getDateValue();if(A&&A.getTime()>i.getTime()){this._bValid=false;L.warning("DateValue not in valid date",this);}}else{this._oMaxDate=new Date(9999,11,31,23,59,59,999);}this.setProperty("maxDate",i);if(this._getCalendar()){this._getCalendar().setMaxDate(i);}this._oMaxDate.setHours(23,59,59,999);return this;};s.prototype._checkMinMaxDate=function(){if(this._oMinDate.getTime()>this._oMaxDate.getTime()){L.warning("minDate > MaxDate -> dates switched",this);var M=new Date(this._oMinDate.getTime());var i=new Date(this._oMaxDate.getTime());this._oMinDate=new Date(i.getTime());this._oMaxDate=new Date(M.getTime());this.setProperty("minDate",i,true);this.setProperty("maxDate",M,true);if(this._getCalendar()){this._getCalendar().setMinDate(i);this._getCalendar().setMaxDate(M);}}var A=this.getDateValue();if(A&&(A.getTime()<this._oMinDate.getTime()||A.getTime()>this._oMaxDate.getTime())){this._bValid=false;L.error("dateValue "+A.toString()+"(value="+this.getValue()+") does not match "+"min/max date range("+this._oMinDate.toString()+" - "+this._oMaxDate.toString()+"). App. "+"developers should take care to maintain dateValue/value accordingly.",this);}};s.prototype.getDisplayFormatType=function(){return this.getProperty("displayFormatType");};s.prototype._handleDateValidation=function(i){this._bValid=true;if(!i||i.getTime()<this._oMinDate.getTime()||i.getTime()>this._oMaxDate.getTime()){this._bValid=false;L.warning("Value can not be converted to a valid date",this);}var V=this._formatValue(i,true);if(V!==this.getValue()){this.setLastValue(V);}this.setProperty("value",V);this.setProperty("dateValue",i);};s.prototype.setDisplayFormatType=function(i){if(i){var F=false;for(var T in p){if(T==i){F=true;break;}}if(!F){throw new Error(i+" is not a valid calendar type"+this);}}this.setProperty("displayFormatType",i,true);this.setDisplayFormat(this.getDisplayFormat());return this;};s.prototype.setSecondaryCalendarType=function(i){this._bSecondaryCalendarTypeSet=true;this.setProperty("secondaryCalendarType",i,true);if(this._getCalendar()){this._getCalendar().setSecondaryCalendarType(i);}return this;};s.prototype.setShowFooter=function(F){var P=this._oPopup,i=this._getCalendar();this.setProperty("showFooter",F);if(!P||!i){return this;}P._getButtonFooter().setVisible(F);return this;};s.prototype.addSpecialDate=function(S){y.call(this,S);this.addAggregation("specialDates",S,true);z.call(this);return this;};s.prototype.insertSpecialDate=function(S,i){y.call(this,S);this.insertAggregation("specialDates",S,i,true);z.call(this);return this;};s.prototype.removeSpecialDate=function(S){var i=this.removeAggregation("specialDates",S,true);z.call(this);return i;};s.prototype.removeAllSpecialDates=function(){var i=this.removeAllAggregation("specialDates",true);z.call(this);return i;};s.prototype.destroySpecialDates=function(){this.destroyAggregation("specialDates",true);z.call(this);return this;};s.prototype.setLegend=function(i){this.setAssociation("legend",i,true);var A=this.getLegend();if(A){var F=sap.ui.require("sap/ui/unified/CalendarLegend");i=sap.ui.getCore().byId(A);if(i&&!(typeof F=="function"&&i instanceof F)){throw new Error(i+" is not an sap.ui.unified.CalendarLegend. "+this);}}if(this._getCalendar()){this._getCalendar().setLegend(A);}return this;};s.prototype.onChange=function(i){if(!this.getEditable()||!this.getEnabled()){return;}var V=this._$input.val(),O=this._formatValue(this.getDateValue()),A;if(V==O&&this._bValid){return;}if(this.getShowFooter()&&this._oPopup&&!V){this._oPopup.getBeginButton().setEnabled(false);}this._bValid=true;if(V!=""){A=this._parseValue(V,true);if(!A||A.getTime()<this._oMinDate.getTime()||A.getTime()>this._oMaxDate.getTime()){this._bValid=false;A=undefined;}else{V=this._formatValue(A);}}if(this.getDomRef()&&(this._$input.val()!==V)){this._$input.val(V);this._curpos=this._$input.cursorPos();}if(A){V=this._formatValue(A,true);}if(this.getLastValue()!==V||(A&&this.getDateValue()&&A.getFullYear()!==this.getDateValue().getFullYear())){this.setLastValue(V);this.setProperty("value",V,true);var N=this.getValue();if(this._bValid&&V==N){this.setProperty("dateValue",A,true);}V=N;if(this.isOpen()){if(this._bValid){A=this.getDateValue();}this._getCalendar().focusDate(A);var S=this._oDateRange.getStartDate();if((!S&&A)||(S&&A&&S.getTime()!=A.getTime())){this._oDateRange.setStartDate(new Date(A.getTime()));}else if(S&&!A){this._oDateRange.setStartDate(undefined);}}this.fireChangeEvent(V,{valid:this._bValid});}};s.prototype._getInputValue=function(V){V=(typeof V=="undefined")?this._$input.val():V.toString();var i=this._parseValue(V,true);V=this._formatValue(i,true);return V;};s.prototype.updateDomValue=function(V){if(this.isActive()&&(this._$input.val()!==V)){this._bCheckDomValue=true;V=(typeof V=="undefined")?this._$input.val():V.toString();this._curpos=this._$input.cursorPos();var i=this._parseValue(V,true);V=this._formatValue(i);this._$input.val(V);if(document.activeElement===this._$input[0]){this._$input.cursorPos(this._curpos);}}return this;};s.prototype._storeInputSelection=function(i){if((D.browser.msie||D.browser.edge)&&!D.support.touch){this._oInputSelBeforePopupOpen={iStart:i.selectionStart,iEnd:i.selectionEnd};i.selectionStart=0;i.selectionEnd=0;}};s.prototype._restoreInputSelection=function(i){if((D.browser.msie||D.browser.edge)&&!D.support.touch){i.selectionStart=this._oInputSelBeforePopupOpen.iStart;i.selectionEnd=this._oInputSelBeforePopupOpen.iEnd;}};function _(){this._createPopup();this._createPopupContent();var i;var A=this.getBinding("value");if(A&&A.oType&&A.oType.oOutputFormat){i=A.oType.oOutputFormat.oFormatOptions.calendarType;}else if(A&&A.oType&&A.oType.oFormat){i=A.oType.oFormat.oFormatOptions.calendarType;}if(!i){i=this.getDisplayFormatType();}if(i){this._getCalendar().setPrimaryCalendarType(i);}var V=this._bValid?this._formatValue(this.getDateValue()):this.getValue();if(V!=this._$input.val()){this.onChange();}this._fillDateRange();this._openPopup();this.fireNavigate({dateRange:this._getVisibleDatesRange(this._getCalendar()),afterPopupOpened:true});}s.prototype._createPopup=function(){var T="";if(!this._oPopup){this._oPopup=new R(this.getId()+"-RP",{showCloseButton:false,showArrow:false,showHeader:false,placement:l.PlacementType.VerticalPreferedBottom,beginButton:new B({type:l.ButtonType.Emphasized,text:r.getText("DATEPICKER_SELECTION_CONFIRM"),press:this._handleOKButton.bind(this)}),afterOpen:v.bind(this),afterClose:w.bind(this)}).addStyleClass("sapMRPCalendar");if(this.getShowFooter()){this._oPopup.addStyleClass("sapMLandscapePadding");}this._oPopup._getPopup().setAutoClose(true);if(D.system.phone){T=o.getReferencingLabels(this).concat(this.getAriaLabelledBy()).reduce(function(A,i){var F=E.registry.get(i);return A+" "+(F.getText?F.getText():"");},"").trim();this._oPopup.setTitle(T);this._oPopup.setShowHeader(true);this._oPopup.setShowCloseButton(true);}else{this._oPopup._getPopup().setDurations(0,0);this._oPopup.setEndButton(new B({text:r.getText("DATEPICKER_SELECTION_CANCEL"),press:this._handleCancelButton.bind(this)}));}this.setAggregation("_popup",this._oPopup,true);}};s.prototype._openPopup=function(){if(!this._oPopup){return;}this._storeInputSelection(this._$input.get(0));this._oPopup._getPopup().setAutoCloseAreas([this.getDomRef()]);this._oPopup.openBy(this);};s.prototype._getVisibleDatesRange=function(i){var V=i._getVisibleDays();return new j({startDate:V[0].toLocalJSDate(),endDate:V[V.length-1].toLocalJSDate()});};s.prototype._createPopupContent=function(){var i=this._getCalendarConstructor();if(!this._getCalendar()){this._oCalendar=new i(this.getId()+"-cal",{intervalSelection:this._bIntervalSelection,minDate:this.getMinDate(),maxDate:this.getMaxDate(),legend:this.getLegend(),startDateChange:function(){this.fireNavigate({dateRange:this._getVisibleDatesRange(this._getCalendar())});}.bind(this)});this._oDateRange=new j();this._getCalendar().addSelectedDate(this._oDateRange);this._getCalendar()._setSpecialDatesControlOrigin(this);this._getCalendar().attachCancel(t,this);this._getCalendar().setPopupMode(true);if(this.$().closest(".sapUiSizeCompact").length>0){this._getCalendar().addStyleClass("sapUiSizeCompact");}if(this._bSecondaryCalendarTypeSet){this._getCalendar().setSecondaryCalendarType(this.getSecondaryCalendarType());}if(this._bOnlyCalendar){this._getCalendar().attachSelect(this._handleCalendarSelect,this);this._getCalendar().attachEvent("_renderMonth",x,this);this._oPopup._getButtonFooter().setVisible(this.getShowFooter());this._getCalendar()._bSkipCancelButtonRendering=true;this._oPopup.addContent(this._getCalendar());if(!this.getDateValue()){this._oPopup.getBeginButton().setEnabled(false);}}}};s.prototype._getCalendarConstructor=function(){var P=this._getFormatter(true).aFormatArray.map(function(A){return A.type.toLowerCase();}),i=P.indexOf("day")>=0,M=P.indexOf("month")>=0,Y=P.indexOf("year")>=0;if(i&&M&&Y){return h;}else if(M&&Y){return m;}else if(Y){return n;}else{L.warning("Not valid date pattern! Default Calendar constructor function is returned",this);return h;}};s.prototype._fillDateRange=function(){var i=this.getDateValue();if(i&&i.getTime()>=this._oMinDate.getTime()&&i.getTime()<=this._oMaxDate.getTime()){this._getCalendar().focusDate(new Date(i.getTime()));if(!this._oDateRange.getStartDate()||this._oDateRange.getStartDate().getTime()!=i.getTime()){this._oDateRange.setStartDate(new Date(i.getTime()));}}else{var A=this.getInitialFocusedDateValue();var F=A?A:new Date();var M=this._oMaxDate.getTime();if(F.getTime()<this._oMinDate.getTime()||F.getTime()>M){F=this._oMinDate;}this._getCalendar().focusDate(F);if(this._oDateRange.getStartDate()){this._oDateRange.setStartDate(undefined);}}};s.prototype.getAccessibilityInfo=function(){var i=this.getRenderer();var A=I.prototype.getAccessibilityInfo.apply(this,arguments);var V=this.getValue()||"";if(this._bValid){var F=this.getDateValue();if(F){V=this._formatValue(F);}}A.type=r.getText("ACC_CTR_TYPE_DATEINPUT");A.description=[V,i.getLabelledByAnnouncement(this),i.getDescribedByAnnouncement(this)].join(" ").trim();return A;};s.prototype._selectDate=function(){var i=this.getDateValue(),A=this._getSelectedDate(),V="";if(!d(A,i)){this.setDateValue(new Date(A.getTime()));V=this.getValue();this.fireChangeEvent(V,{valid:true});this._focusInput();}else if(!this._bValid){V=this._formatValue(A);if(V!=this._$input.val()){this._bValid=true;if(this.getDomRef()){this._$input.val(V);this.setLastValue(V);}V=this._formatValue(A,true);this.setProperty("value",V,true);this.fireChangeEvent(V,{valid:true});this._focusInput();}}else if(D.system.desktop||!D.support.touch){this.focus();}this._oPopup.close();};s.prototype._handleCalendarSelect=function(){if(this.getShowFooter()){this._oPopup.getBeginButton().setEnabled(true);return;}this._selectDate();};s.prototype._focusInput=function(){if(this.getDomRef()&&(D.system.desktop||!D.support.touch)){this._curpos=this._$input.val().length;this._$input.cursorPos(this._curpos);}return this;};s.prototype._getCalendar=function(){return this._oCalendar;};s.prototype._getSelectedDate=function(){var S=this._getCalendar().getSelectedDates(),i;if(S.length>0){i=S[0].getStartDate();}return i;};s.prototype._handleOKButton=function(){this._selectDate();};s.prototype._handleCancelButton=function(){if(!this.getDateValue()){this._oPopup.getBeginButton().setEnabled(false);}this._oPopup.close();};function t(i){if(this.isOpen()){this._oPopup.close();if((D.system.desktop||!D.support.touch)){this.focus();}}}s.prototype._increaseDate=function(N,i){var O=this.getDateValue();var A=this._$input.cursorPos();if(O&&this.getEditable()&&this.getEnabled()){var F;var G=this.getBinding("value");if(G&&G.oType&&G.oType.oOutputFormat){F=G.oType.oOutputFormat.oFormatOptions.calendarType;}else if(G&&G.oType&&G.oType.oFormat){F=G.oType.oFormat.oFormatOptions.calendarType;}if(!F){F=this.getDisplayFormatType();}var H=U.getInstance(new Date(O.getTime()),F);O=U.getInstance(new Date(O.getTime()),F);switch(i){case"day":H.setDate(H.getDate()+N);break;case"month":H.setMonth(H.getMonth()+N);var M=(O.getMonth()+N)%12;if(M<0){M=12+M;}while(H.getMonth()!=M){H.setDate(H.getDate()-1);}break;case"year":H.setFullYear(H.getFullYear()+N);while(H.getMonth()!=O.getMonth()){H.setDate(H.getDate()-1);}break;default:break;}if(H.getTime()<this._oMinDate.getTime()){H=new U(this._oMinDate.getTime());}else if(H.getTime()>this._oMaxDate.getTime()){H=new U(this._oMaxDate.getTime());}if(!d(this.getDateValue(),H.getJSDate())){this.setDateValue(new Date(H.getTime()));this._curpos=A;this._$input.cursorPos(this._curpos);var V=this.getValue();this.fireChangeEvent(V,{valid:true});}}};s.prototype._getSpecialDates=function(){var A=this.getSpecialDates();for(var i=0;i<A.length;i++){var N=A[i].getSecondaryType()===u.CalendarDayType.NonWorking&&A[i].getType()!==u.CalendarDayType.NonWorking;if(N){var F=new k();F.setType(A[i].getSecondaryType());F.setStartDate(A[i].getStartDate());if(A[i].getEndDate()){F.setEndDate(A[i].getEndDate());}A.push(F);}}return A;};function v(){this.addStyleClass(I.ICON_PRESSED_CSS_CLASS);this._renderedDays=this._getCalendar().$("-Month0-days").find(".sapUiCalItem").length;this.$("inner").attr("aria-owns",this.getId()+"-cal");this.$("inner").attr("aria-expanded",true);g.addPopoverInstance(this._oPopup);this._getCalendar().focus();}function w(){if(!this.getDateValue()){this._oPopup.getBeginButton().setEnabled(false);}this.removeStyleClass(I.ICON_PRESSED_CSS_CLASS);this.$("inner").attr("aria-expanded",false);this._restoreInputSelection(this._$input.get(0));this._getCalendar()._closedPickers();g.removePopoverInstance(this._oPopup);}function x(i){var A=i.getParameter("days"),P=this._oPopup._getPopup();if(A>this._renderedDays){this._renderedDays=A;P._applyPosition(P._oLastPosition);}}function y(S){var k=sap.ui.require("sap/ui/unified/DateTypeRange");if(S&&!(k&&S instanceof k)){throw new Error(S+"is not valid for aggregation \"specialDates\" of "+this);}}function z(){if(this.isOpen()){this._getCalendar()._bDateRangeChanged=false;this._getCalendar().invalidate();}}return s;});
