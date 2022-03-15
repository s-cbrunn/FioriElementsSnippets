sap.ui.define(["./types/DataType","./util/isDescendantOf","./util/StringHelper","./util/SlotsHelper","./CustomElementsScope"],function(t,e,r,i,a){"use strict";class s{constructor(t){this.metadata=t}getInitialState(){if(Object.prototype.hasOwnProperty.call(this,"_initialState")){return this._initialState}const t={};const e=this.slotsAreManaged();const r=this.getProperties();for(const e in r){const i=r[e].type;const a=r[e].defaultValue;if(i===Boolean){t[e]=false;if(a!==undefined){console.warn("The 'defaultValue' metadata key is ignored for all booleans properties, they would be initialized with 'false' by default")}}else if(r[e].multiple){t[e]=[]}else if(i===Object){t[e]="defaultValue"in r[e]?r[e].defaultValue:{}}else if(i===String){t[e]="defaultValue"in r[e]?r[e].defaultValue:""}else{t[e]=a}}if(e){const e=this.getSlots();for(const[r,i]of Object.entries(e)){const e=i.propertyName||r;t[e]=[]}}this._initialState=t;return t}static validatePropertyValue(t,e){const r=e.multiple;if(r){return t.map(t=>n(t,e))}return n(t,e)}static validateSlotValue(t,e){return o(t,e)}getPureTag(){return this.metadata.tag}getTag(){const t=this.metadata.tag;const e=a.getEffectiveScopingSuffixForTag(t);if(!e){return t}return`${t}-${e}`}getAltTag(){const t=this.metadata.altTag;if(!t){return}const e=a.getEffectiveScopingSuffixForTag(t);if(!e){return t}return`${t}-${e}`}hasAttribute(t){const e=this.getProperties()[t];return e.type!==Object&&!e.noAttribute&&!e.multiple}getPropertiesList(){return Object.keys(this.getProperties())}getAttributesList(){return this.getPropertiesList().filter(this.hasAttribute,this).map(r.camelToKebabCase)}getSlots(){return this.metadata.slots||{}}canSlotText(){const t=this.getSlots().default;return t&&t.type===Node}hasSlots(){return!!Object.entries(this.getSlots()).length}hasIndividualSlots(){return this.slotsAreManaged()&&Object.entries(this.getSlots()).some(([t,e])=>e.individualSlots)}slotsAreManaged(){return!!this.metadata.managedSlots}getProperties(){return this.metadata.properties||{}}getEvents(){return this.metadata.events||{}}isLanguageAware(){return!!this.metadata.languageAware}shouldInvalidateOnChildChange(t,e,r){const i=this.getSlots()[t].invalidateOnChildChange;if(i===undefined){return false}if(typeof i==="boolean"){return i}if(typeof i==="object"){if(e==="property"){if(i.properties===undefined){return false}if(typeof i.properties==="boolean"){return i.properties}if(Array.isArray(i.properties)){return i.properties.includes(r)}throw new Error("Wrong format for invalidateOnChildChange.properties: boolean or array is expected")}if(e==="slot"){if(i.slots===undefined){return false}if(typeof i.slots==="boolean"){return i.slots}if(Array.isArray(i.slots)){return i.slots.includes(r)}throw new Error("Wrong format for invalidateOnChildChange.slots: boolean or array is expected")}}throw new Error("Wrong format for invalidateOnChildChange: boolean or object is expected")}}const n=(r,i)=>{const a=i.type;if(a===Boolean){return typeof r==="boolean"?r:false}if(a===String){return typeof r==="string"||typeof r==="undefined"||r===null?r:r.toString()}if(a===Object){return typeof r==="object"?r:i.defaultValue}if(e(a,t)){return a.isValid(r)?r:i.defaultValue}};const o=(t,e)=>{t&&i.getSlottedElements(t).forEach(t=>{if(!(t instanceof e.type)){throw new Error(`${t} is not of type ${e.type}`)}});return t};return s});