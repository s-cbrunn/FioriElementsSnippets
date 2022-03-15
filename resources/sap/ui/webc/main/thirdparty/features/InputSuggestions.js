sap.ui.define(["sap/ui/webc/common/thirdparty/base/FeaturesRegistry","sap/ui/webc/common/thirdparty/base/i18nBundle","../List","../ResponsivePopover","../SuggestionItem","../SuggestionGroupItem","../Button","../GroupHeaderListItem","../SuggestionListItem","../generated/i18n/i18n-defaults"],function(e,t,s,n,i,o,r,h,c,u){"use strict";class l{constructor(e,s,n,i){this.component=e;this.slotName=s;this.handleFocus=i;this.highlight=n;this.fnOnSuggestionItemPress=this.onItemPress.bind(this);this.fnOnSuggestionItemFocus=this.onItemFocused.bind(this);this.fnOnSuggestionItemMouseOver=this.onItemMouseOver.bind(this);this.fnOnSuggestionItemMouseOut=this.onItemMouseOut.bind(this);this.selectedItemIndex=null;this.i18nBundle=t.getI18nBundle("@ui5/webcomponents");this.accInfo={}}defaultSlotProperties(e){const t=this._getComponent().suggestionItems;const s=this.highlight&&!!e;const n=[];t.map((t,i)=>{const o=s?this.getHighlightedText(t,e):this.getRowText(t);const r=s?this.getHighlightedDesc(t,e):this.getRowDesc(t);return n.push({text:o,description:r,image:t.image||undefined,icon:t.icon||undefined,type:t.type||undefined,additionalText:t.additionalText||undefined,additionalTextState:t.additionalTextState,groupItem:t.groupItem,key:i})});return n}onUp(e){e.preventDefault();this._handleItemNavigation(false);return true}onDown(e){e.preventDefault();this._handleItemNavigation(true);return true}onSpace(e){if(this._isItemOnTarget()){e.preventDefault();this.onItemSelected(null,true);return true}return false}onEnter(e){if(this._isItemOnTarget()){this.onItemSelected(null,true);return true}return false}onTab(e){if(this._isItemOnTarget()){this.onItemSelected(null,true);return true}return false}toggle(e,{preventFocusRestore:t}){const s=e!==undefined?e:!this.isOpened();if(s){this.open()}else{this.close(t)}}async _isScrollable(){const e=await this._getScrollContainer();return e.offsetHeight<e.scrollHeight}async open(){this.responsivePopover=await this._respPopover();this._beforeOpen();if(this._getItems().length){this.responsivePopover.showAt(this._getComponent())}}async close(e=false){this.responsivePopover=await this._respPopover();this.responsivePopover.close(false,false,e)}updateSelectedItemPosition(e){this.selectedItemIndex=e}onItemFocused(){this._getComponent().onItemFocused()}onItemMouseOver(e){this._getComponent().onItemMouseOver(e)}onItemMouseOut(e){this._getComponent().onItemMouseOut(e)}onItemSelected(e,t){const s=this._getItems();const n=e||s[this.selectedItemIndex];this.selectedItemIndex=s.indexOf(n);this.accInfo={currentPos:this.selectedItemIndex+1,listSize:s.length,itemText:n.textContent};if(n.type==="Inactive"){return}if(n.group){return}this._getComponent().onItemSelected(this._getRealItems()[this.selectedItemIndex],t);n.selected=false;this.close()}onItemPreviewed(e){this._getComponent().onItemPreviewed(e)}onItemPress(e){this.onItemSelected(e.detail.item,false)}_beforeOpen(){this._attachItemsListeners();this._attachPopupListeners()}async _attachItemsListeners(){const e=await this._getList();e.removeEventListener("ui5-item-press",this.fnOnSuggestionItemPress);e.addEventListener("ui5-item-press",this.fnOnSuggestionItemPress);e.removeEventListener("ui5-item-focused",this.fnOnSuggestionItemFocus);e.addEventListener("ui5-item-focused",this.fnOnSuggestionItemFocus);e.removeEventListener("mouseover",this.fnOnSuggestionItemMouseOver);e.addEventListener("mouseover",this.fnOnSuggestionItemMouseOver);e.removeEventListener("mouseout",this.fnOnSuggestionItemMouseOut);e.addEventListener("mouseout",this.fnOnSuggestionItemMouseOut)}_attachPopupListeners(){if(!this.handleFocus){return}if(!this.attachedAfterOpened){this._respPopover.addEventListener("ui5-after-open",this._onOpen.bind(this));this.attachedAfterOpened=true}if(!this.attachedAfterClose){this._respPopover.addEventListener("ui5-after-close",this._onClose.bind(this));this.attachedAfterClose=true}}_onOpen(){this._applyFocus();this._getComponent().onOpen()}_onClose(){this._getComponent().onClose()}_applyFocus(){if(this.selectedItemIndex){this._getItems()[this.selectedItemIndex].focus()}}_isItemOnTarget(){return this.isOpened()&&this.selectedItemIndex!==null}isOpened(){return!!(this.responsivePopover&&this.responsivePopover.opened)}_handleItemNavigation(e){if(!this._getItems().length){return}if(e){this._selectNextItem()}else{this._selectPreviousItem()}}_selectNextItem(){const e=this._getItems().length;const t=this.selectedItemIndex;if(this.selectedItemIndex===null||++this.selectedItemIndex>e-1){this.selectedItemIndex=0}this._moveItemSelection(t,this.selectedItemIndex)}_selectPreviousItem(){const e=this._getItems().length;const t=this.selectedItemIndex;if(this.selectedItemIndex===null||--this.selectedItemIndex<0){this.selectedItemIndex=e-1}this._moveItemSelection(t,this.selectedItemIndex)}_moveItemSelection(e,t){const s=this._getItems();const n=s[t];const i=s[e];this.accInfo={currentPos:t+1,listSize:s.length,itemText:n.textContent};if(i){i.selected=false}if(n){n.selected=true;if(this.handleFocus){n.focus()}}this.onItemPreviewed(n);if(!this._isItemIntoView(n)){this._scrollItemIntoView(n)}}_deselectItems(){const e=this._getItems();e.forEach(e=>{e.selected=false})}_isItemIntoView(e){const t=e.getDomRef().getBoundingClientRect();const s=this._getComponent().getDomRef().getBoundingClientRect();const n=window.innerHeight||document.documentElement.clientHeight;return t.top+l.SCROLL_STEP<=n&&t.top>=s.top}async _scrollItemIntoView(e){const t=e.getDomRef().offsetTop;const s=await this._getScrollContainer();s.scrollTop=t}async _getScrollContainer(){if(!this._scrollContainer){await this._respPopover();this._scrollContainer=this.responsivePopover.shadowRoot.querySelector(".ui5-popup-content")}return this._scrollContainer}_getItems(){return[...this.responsivePopover.querySelector("[ui5-list]").children]}_getComponent(){return this.component}async _getList(){this.responsivePopover=await this._respPopover();return this.responsivePopover.querySelector("[ui5-list]")}async _getListWidth(){const e=await this._getList();return e.offsetWidth}_getRealItems(){return this._getComponent().getSlottedNodes(this.slotName)}async _respPopover(){if(this.responsivePopover){return this.responsivePopover}const e=await this._getComponent().getStaticAreaItemDomRef();this.responsivePopover=e.querySelector("[ui5-responsive-popover]");return this.responsivePopover}get itemSelectionAnnounce(){const e=this.i18nBundle,t=e.getText(u.LIST_ITEM_POSITION,[this.accInfo.currentPos],[this.accInfo.listSize]),s=e.getText(u.LIST_ITEM_SELECTED);return`${t} ${this.accInfo.itemText} ${s}`}getRowText(e){return this.sanitizeText(e.text||e.textContent)}getRowDesc(e){if(e.description){return this.sanitizeText(e.description)}}getHighlightedText(e,t){let s=e.text||e.textContent;s=this.sanitizeText(s);return this.hightlightInput(s,t)}getHighlightedDesc(e,t){let s=e.description;s=this.sanitizeText(s);return this.hightlightInput(s,t)}hightlightInput(e,t){if(!e){return e}const s=t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");const n=new RegExp(s,"ig");return e.replace(n,e=>`<b>${e}</b>`)}sanitizeText(e){return e&&e.replace("<","&lt")}static get dependencies(){return[i,o,n,s,c,h,r]}}l.SCROLL_STEP=60;e.registerFeature("InputSuggestions",l);return l});