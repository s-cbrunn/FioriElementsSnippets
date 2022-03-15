/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./TextFieldRenderer','sap/ui/core/Renderer','sap/ui/core/library','sap/ui/Device'],function(T,R,c,D){"use strict";var V=c.ValueState;var W=c.Wrapping;var a=R.extend(T);a.getInnerTagName=function(){return('textarea');};a.renderInnerAttributes=function(r,t){r.addClass("sapUiTxtA");r.addStyle('overflow','auto');if(t.getWidth()&&t.getWidth()!=''){}else{if(t.getCols()&&t.getCols()!=''){r.writeAttribute('cols',t.getCols());}}if(t.getHeight()&&t.getHeight()!=''){r.addStyle('height',t.getHeight());r.addStyle('margin-top','0');r.addStyle('margin-bottom','0');}else{if(t.getRows()&&t.getRows()!=''){r.writeAttribute('rows',t.getRows());}}switch(t.getWrapping()){case(W.Soft):r.writeAttribute('wrap','soft');break;case(W.Hard):r.writeAttribute('wrap','hard');break;case(W.Off):r.writeAttribute('wrap','off');break;}};a.renderARIAInfo=function(r,t){r.writeAccessibilityState(t,{role:t.getAccessibleRole().toLowerCase()||'textbox',labelledby:t.getLabeledBy()?(t.getLabeledBy()+" "+t.getAriaDescribedBy().join(" ")):undefined,required:t.getRequired(),readonly:!t.getEditable(),multiline:true,autocomplete:"none",invalid:t.getValueState()==V.Error});};a.renderInnerContent=function(r,t){var v=t.getValue();var p=t.getPlaceholder();if(v.length>t.getMaxLength()&&t.getMaxLength()>0){v=v.substring(0,t.getMaxLength());}if(!D.support.input.placeholder&&p&&!v){r.writeEscaped(p);}else{r.writeEscaped(v);}};return a;},true);
