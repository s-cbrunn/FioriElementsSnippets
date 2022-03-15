sap.ui.define(["exports"],function(T){"use strict";var I={FCL_START_COLUMN_TXT:"⁪⁪⁪‌​​‍‌‌‍​‍​‍‍‌‌‌‍‌‍​​‍‍‍​‌‍‍‌‌‌‌‌‌‍‍​​​‌⁪First column⁪⁪",FCL_MIDDLE_COLUMN_TXT:"⁪⁪⁪‌​‍​‌‌​​‍‌‌‌‍‍‌‌‌‍‍‍‍​​​‍​‌​​‌​​​‌‌‍​‌‍​‍⁪Middle column⁪⁪",FCL_END_COLUMN_TXT:"⁪⁪⁪‌​​‍‍​‌​‌​‍‌​​​​‍​‍‍‌‍​‌‌‌​‌‍‌​​​‌‍‍‌​‍‍‍⁪Last column⁪⁪",FCL_START_COLUMN_EXPAND_BUTTON_TOOLTIP:"⁪⁪⁪‌‌‌​‌‌​‌​‌‍‌‍‌​‍​‍‍​‍​‍‌‌​‌‍‍‍‍‍​‍​​​​‌‌​⁪Expand the first column⁪⁪",FCL_START_COLUMN_COLLAPSE_BUTTON_TOOLTIP:"⁪⁪⁪‌‌​‌​​​‍‌‌‍​​​‍‍‌​‌‍​‌‌​‍‌‌​​​‌​​‌‌​‍‌‌‌‍⁪Collapse the first column⁪⁪",FCL_END_COLUMN_EXPAND_BUTTON_TOOLTIP:"⁪⁪⁪‍​​‍‌‌‌‌​‍‌‍‍​‍‌‍‍‌‌‍​‍‍‍‌​‌​​‌‌‍​‍‍‌‌‍‍⁪Expand the last column⁪⁪",FCL_END_COLUMN_COLLAPSE_BUTTON_TOOLTIP:"⁪⁪⁪‍‍‍‌‌‌​‌‍​‌‍​​‍‌​‍‌‍‌​‍‌‍​‍​‌​​​‍‍​​‌‌​⁪Collapse the last column⁪⁪",NOTIFICATION_LIST_ITEM_TXT:"⁪⁪⁪‌​‍​‌‍‌‍​‌‍‍​​‌‍‌​​‍‌‍‍‌​‌​​‍‍​‌‍‍​‌​‌‌​⁪Notification⁪⁪",NOTIFICATION_LIST_ITEM_SHOW_MORE:"⁪⁪⁪‍‍‍​​‌​​‌‌‍​​‍​​‌‌​‌‍‌​​‍​​‌‌‍‌‌‌​‌‍​​‍⁪Show More⁪⁪",NOTIFICATION_LIST_ITEM_SHOW_LESS:"⁪⁪⁪‌‌‌‍‍‍‌​‍‍​‍​​​‌‌‌‌​​‌‌‍​‍‌​‌​‍‌‍‍‍‍​‍‌‍⁪Show Less⁪⁪",NOTIFICATION_LIST_ITEM_OVERLOW_BTN_TITLE:"⁪⁪⁪‌‌​​‍‌‌‍​‍​​‍‍​​‍​‍‌​‍​‌​​‌‍‌‌​​​‍‌‌‌‌​‍‌⁪More⁪⁪",NOTIFICATION_LIST_ITEM_CLOSE_BTN_TITLE:"⁪⁪⁪‍‌‌​‍‍‍‌​​‌‍‌‍‍​‍‌​‌‌​‌‌‍‌​​‌‍‍‍‍‍‌‍​‍​‌⁪Close⁪⁪",NOTIFICATION_LIST_ITEM_READ:"⁪⁪⁪‌​‌​‍‌‌‍‌‌‌‍‍‍‌​‌​​‍‍​‍‌‌‌‍‍​‍‌‌‌‌‍​‍‍‌‍​⁪read⁪⁪",NOTIFICATION_LIST_ITEM_UNREAD:"⁪⁪⁪‌​‍‌​‍‍‌‌‌‍‍‍​‌​‌‌‍‌‌‍‌‌​​‍‍‍‌‌‌‍‍‍‍‌‌​​​⁪unread⁪⁪",NOTIFICATION_LIST_ITEM_HIGH_PRIORITY_TXT:"⁪⁪⁪‌‌​‍‍‍‌‍‍​​‍​‌​‌​‍​‌‍​‌​‍​​​​‌‍‍​‌‌​‍‍‍‌‌⁪High Priority⁪⁪",NOTIFICATION_LIST_ITEM_MEDIUM_PRIORITY_TXT:"⁪⁪⁪‌​​‌​‍‌​‍​‌‍‌‍‌‌‍‌​‍‌‌‌​‌​‍‌‍‌​‌‍‌​‌​‍‍‌​⁪Medium Priority⁪⁪",NOTIFICATION_LIST_ITEM_LOW_PRIORITY_TXT:"⁪⁪⁪‌​​​‍​‍‍‍​‍​‌‍‌​‌‌‍​​‌‌‍​‍​‍‌‍‌​‌​​‌‍‌‍​⁪Low Priority⁪⁪",NOTIFICATION_LIST_GROUP_ITEM_TXT:"⁪⁪⁪‌​‍​‌​‍‍​‌‌​‍‌‌‌‍​‍​‍​‍‍‍‌​‌​‌‌‌​‌​‍‌‍‍​‌⁪Notification group⁪⁪",NOTIFICATION_LIST_GROUP_ITEM_COUNTER_TXT:"⁪⁪⁪‍‌​‍​‍‌‍​​​​‍‌‍​‌‌‌‌​​‍​​‌​​‍‌‍​‍‌​‌​‌‌⁪Counter⁪⁪",NOTIFICATION_LIST_GROUP_ITEM_CLOSE_BTN_TITLE:"⁪⁪⁪‌​​‌‌​‌‍​​​​​‌‍​​‍‍‌‍‍‌‌‌‍‍‌‍‌‍‍‍‍​‍​‌⁪Close All⁪⁪",NOTIFICATION_LIST_GROUP_ITEM_TOGGLE_BTN_COLLAPSE_TITLE:"⁪⁪⁪‌​‍​‌‍‌​‍‍‍‍‌‍​‍‍​‌​‍‍​‌​‍‍‌‍​‍​‌‌‍‍‍‌‌​‍⁪Collapse Group⁪⁪",NOTIFICATION_LIST_GROUP_ITEM_TOGGLE_BTN_EXPAND_TITLE:"⁪⁪⁪‌‌​​‌‍‍‍​​‌‍‍​​​​​​​‍‌‍​‍‌​​​‍​​‌​‌‌‍‍‍​‍⁪Expand Group⁪⁪",TIMELINE_ARIA_LABEL:"⁪⁪⁪‌​‍‌‌‌​‍‌‍‌​‌‌‌‍‌​​​‍​‍​‍​‌​​‌​‌​‌‍‍‌‍​‌‌⁪Timeline⁪⁪",UPLOADCOLLECTIONITEM_CANCELBUTTON_TEXT:"⁪⁪⁪‌​‍‌‍‌‍​​‍​​‍‍‍‍​​‍‌​‍‌‌​​‍‌‍​​‌‍‌‌​‍‍‌‍‍⁪Cancel⁪⁪",UPLOADCOLLECTIONITEM_RENAMEBUTTON_TEXT:"⁪⁪⁪‌‍‍‍‍‍‌​‌​​‍‍‌‌‍​‌​‌‍‌​‌‌‌‌​​‌‍‌‌‍‍‌‍‌‌‍⁪Rename⁪⁪",UPLOADCOLLECTIONITEM_ERROR_STATE:"⁪⁪⁪‍‌​‌‌‌‍‍‍​‍‍​​‍‌​‍‌‍​​‌‌‌‍‍‍‍‌​​‌​‌‍‌‍​​⁪Terminated⁪⁪",UPLOADCOLLECTIONITEM_READY_STATE:"⁪⁪⁪‌​‍‍‌​‍‍‍​‌‍‍‍​‌​​​‌​‍​​​‌‍‌​‍‍‍‍‍‌‌​​‍‍​⁪Pending⁪⁪",UPLOADCOLLECTIONITEM_UPLOADING_STATE:"⁪⁪⁪‌​‌‍‌‌​‌‍‍‍‌​​‌​​‌‌‍‍‍​‌‌​​‍‍​‍‌‌‌​‍‍‍​‍​⁪Uploading⁪⁪",UPLOADCOLLECTIONITEM_TERMINATE_BUTTON_TEXT:"⁪⁪⁪‌​​‍‍‌​‍‍‌‌‌‌‍​‍‌‌‍‌​‍‌​‌​‌​‌​‍‍​​​‌‍‍‍‍‍⁪Terminate⁪⁪",UPLOADCOLLECTIONITEM_RETRY_BUTTON_TEXT:"⁪⁪⁪‌‌‌‍‍‍​​​‍​‍​‍‌‌‍​‍​​‌​‌‍‌‍​‍​​‌‍‌‍​‌‌⁪Retry⁪⁪",UPLOADCOLLECTIONITEM_EDIT_BUTTON_TEXT:"⁪⁪⁪‍​‌​‌‍‍‌‌‌​‌‍​‌‍‍‌​‍‍‍​​‌‍​​‍‌​‌‌‍‌‍‍​‍‍⁪Edit⁪⁪",UPLOADCOLLECTION_NO_DATA_TEXT:"⁪⁪⁪‍‌‍​‌‌​‍​‌‌​​​‌‍‌​‌‍‌‌​​‍​​​‌‍‌‍‍​‍​‌‌​⁪No files found.⁪⁪",UPLOADCOLLECTION_NO_DATA_DESCRIPTION:"⁪⁪⁪‌‍‌‍‌​‍‌‌​‌​‍‌‌‌‍‌‍‍‍​​‍​‍​‌‍‌​​‌​​​‍‍‌‍⁪Drop files to upload, or use the Upload button.⁪⁪",UPLOADCOLLECTION_ARIA_ROLE_DESCRIPTION:"⁪⁪⁪‌‌‌‌‍​​‍​‌​‍‌‌‍‍‌‌‍‍​‌‍‌‌‌​‌​‌‌‍‌​‌‍‌​‍‍‍⁪Upload collection⁪⁪",UPLOADCOLLECTION_DRAG_FILE_INDICATOR:"⁪⁪⁪‌‌‌‌‍‌​‍‍‌‍​‍‌‍‍‍‌‌‌‍‍‍‌‍‍‍‌‌‌​‌​​‌‌​​‌‍‌⁪Drag files here⁪⁪",UPLOADCOLLECTION_DROP_FILE_INDICATOR:"⁪⁪⁪‌​‌‍‍‍‌‍‍‍‌‍‍‌​​‍‌​​​​‍‍‍​‌‍​‍‌‍‍‍‌‍‍‌​‌⁪Drop files to upload⁪⁪",SHELLBAR_LABEL:"⁪⁪⁪‌‌​​‍‍​‍‍‍‍‍‍‍​‌​‍‌​​‍‌‌‌​‌‌​‌‌‍‌​​‌​‌‌​​⁪Shell Bar⁪⁪",SHELLBAR_LOGO:"⁪⁪⁪‌‍‌​‌‍‍‌‌​‍‍‌‌‌‍‍​‍​‍‌‌​‍​‌‌‍​​‍‌‍​​​‌⁪Logo⁪⁪",SHELLBAR_COPILOT:"⁪⁪⁪‌​‍​​‌‍‍‍‌‍‌‌‍‍​‌​‍‍​​​‍​‌‍‍‌‍‍‌‌‍​‌‍‍‍‍‌⁪CoPilot⁪⁪",SHELLBAR_NOTIFICATIONS:"⁪⁪⁪‌‍‍​​​​‍‌​‍‍​​​‌‌‌​​​‌‌‌‍​‍‌​​‍‍‍​‌‌​​‍⁪{0} Notifications⁪⁪",SHELLBAR_PROFILE:"⁪⁪⁪‌‍​‍‌‌​‍‍‌‍‍​​‌​‍​‌‌‌‍‌​​‌‍‌​‍‌‍‍​‌‌‌​⁪Profile⁪⁪",SHELLBAR_PRODUCTS:"⁪⁪⁪‌‌​‍​‌‌‌‌​​​‌​​‍‌​‍‍​‌​‍‌‍‍​‌‍‌​​​‌‌‍‌‌​‌⁪Products⁪⁪",PRODUCT_SWITCH_CONTAINER_LABEL:"⁪⁪⁪‍​​‌​​‌‍‌‍‌‌‌‌​‌‌‍​‍‌‌​​‍‍‌​‌‍‍‍​‌‍‍​‌‌‌⁪Products⁪⁪",SHELLBAR_SEARCH:"⁪⁪⁪‌​‌‍​‌‍‍‌‌​‌‍‌‍​‍‍​‍‌‍‌‌‌‍‌‌​‌​‍​​‍‍​‌‌‌​⁪Search⁪⁪",SHELLBAR_OVERFLOW:"⁪⁪⁪‍‌​‌‍‌‍‌‍​‌‍‌​‍‍‍​‌​‌‍‍‍‌‌​​‌‌‍‍‌‍‌​‍‌‌‌⁪More⁪⁪",SHELLBAR_CANCEL:"⁪⁪⁪‍‍​​​​‍‌‌​‌‍‍‍​​‌‍​‌​‍‍‌‍​‌​‍‍‌‍‌‍​‌‍‍⁪Cancel⁪⁪",WIZARD_NAV_ARIA_LABEL:"⁪⁪⁪‌​‌‍‍‌​‌‍‍‍​‍​​​‍​​​‍‍‍‌‍​‍​‌‍​‍​‌‌​​​​‍⁪Wizard Progress Bar⁪⁪",WIZARD_LIST_ARIA_LABEL:"⁪⁪⁪‌‌‍​‍‌​​‌​‍​‍‍‍​​‌‌​‍‍‌‍‍‍‌‍‌​‍‌‌‍‌​‍​‌⁪Wizard Steps⁪⁪",WIZARD_LIST_ARIA_DESCRIBEDBY:"⁪⁪⁪‌​‌‍‌​‍​​‍​​‍‌‌​‍‍​‍​‍​​‌‌‍‌​‍​‍​‍​​‌‌‍‍⁪To activate press space bar or enter⁪⁪",WIZARD_ACTIONSHEET_STEPS_ARIA_LABEL:"⁪⁪⁪‍‍‍‌‍‌‌‍‍‍‌‌‌​​​‌​‍​‌‍‌‍‌​‌‌‌‌‌‍‌​‌‌‍‍‌⁪Steps⁪⁪",WIZARD_OPTIONAL_STEP_ARIA_LABEL:"⁪⁪⁪‌‌‌‌​‍‌‍​​​​‍‍‌​‌‌‍‌​‌​‍‌‌‌​‍​​​‍​‍‍‌‍‍​⁪Optional⁪⁪",WIZARD_STEP_ACTIVE:"⁪⁪⁪‌‌​‍‌‍‍‌‌‍​‍‌​​​‌‍‍‌​‌‍‍‍​​‍‍‌‍‌​‌‌‌‍‍​‍⁪Active⁪⁪",WIZARD_STEP_INACTIVE:"⁪⁪⁪‌​‍‌‌‌​‍​‍‌‌​‍​‍‍​‌‍‌​​‍​​‌‌​‍​​​‌​‍‌‍​‌​⁪Inactive⁪⁪",WIZARD_STEP_ARIA_LABEL:"⁪⁪⁪‌‌​​‍‍‌‍​‍‌‌​‌‍‍‍​​​​‍‍‍​​‍‌‌​​‌​​‍​​‍‌‌⁪Step {0}⁪⁪",WIZARD_NAV_ARIA_ROLE_DESCRIPTION:"⁪⁪⁪‍‌‌‍‌‌‌‌​‍‍‌‌‌‍​‍‌‍‍‍‍‍‍‌‍​‌‍‍‌​‍‍​​​​‍​⁪Wizard⁪⁪",WIZARD_NAV_STEP_DEFAULT_HEADING:"⁪⁪⁪‌​​‍‌‍‍‌‌‌‍​‍‌‍​‍‌‍‍​​​‌‌‌‍‍‍‍‌‍‍​‌‌‌‍​​⁪Step⁪⁪",IM_TITLE_BEFORESEARCH:"⁪⁪⁪‍​‌​​​‌‌‍‍‍‌‌​‌‍​‍‍‌‌‌​​‌‍‌‍​‌‌‌‌​‍‌‍​​‌⁪Let's get some results⁪⁪",IM_SUBTITLE_BEFORESEARCH:"⁪⁪⁪‌‍​‌‌‌​‍‍​‌​‌‌‌‌‌‍‍‍​‌‌​‍‍​​​‌‌‍‍‌‌​​​‍‌⁪Start by providing your search criteria.⁪⁪",IM_TITLE_NOACTIVITIES:"⁪⁪⁪‍​​‌​‌​‍​‍‍‍​​‍‌‍‍‌‌‌​​​‍‍‌​‌​​‍‌​​​‍‍​​⁪You've not added any activities yet⁪⁪",IM_SUBTITLE_NOACTIVITIES:"⁪⁪⁪‌​‍‌‌​‌​​​‍​‌‍‍‌​‌​​‍‌​​​‌‍​‍‍​​‌​​​‍‌‌‍⁪Would you like to add one now?⁪⁪",IM_TITLE_NODATA:"⁪⁪⁪‌​‍‍‌‍​‌​​‌​‍‍​‌​‍​​​​​‌‌‌‌‍‌‍​​‌‍‍‌‍​​​​⁪There's no data yet⁪⁪",IM_SUBTITLE_NODATA:"⁪⁪⁪‌‌‌​‍​‌‌​​‍​‍‍​‌‍‌‍​‍​​‍‍‌‌‌‍‍‍​​‌‌‍‌​‌‌‌⁪When there is, you'll see it here.⁪⁪",IM_TITLE_NOMAIL:"⁪⁪⁪‌‍​‍‌‍‍‌​​​​‌‍​‍​‍​‍​​​‌‌‌‍​​‍​‌​‌​​‍​‍​⁪No new mail⁪⁪",IM_SUBTITLE_NOMAIL:"⁪⁪⁪‌​‌‍​‌‍​‌‌‌​​‍​​‍‍‍​​‌​‍​‌‌‌‌‍​‍‌‍‌⁪Check back again later.⁪⁪",IM_TITLE_NOENTRIES:"⁪⁪⁪‍‍​​‍‍‌​‍‌​‌‍‌‍‌​​​‌‌‌​‌‌​‍‌‍‌‍‌​‍​​​​‌​⁪There are no entries yet⁪⁪",IM_SUBTITLE_NOENTRIES:"⁪⁪⁪‌​‌​​‌​​‍‍​‌‍‌​‌‌‌​​‍​​​‍‍‌‌​‍​​‍‍‍​​​‌​​⁪When there are, you'll see them here.⁪⁪",IM_TITLE_NONOTIFICATIONS:"⁪⁪⁪‌​‌‌​‍‍​‍‌‌‌‌‌‌‍​‍​‍‌‌‍​‌‌‍‌​​​‍​‍‌​‍​‍​⁪You've no new notifications⁪⁪",IM_SUBTITLE_NONOTIFICATIONS:"⁪⁪⁪‌​​‍​‌‍‌‍‌‍‌‍‍‌​‍‍‍​‌‌​​‌​​‌‍‍‍​‍‌​‍​‌​‌‍⁪Check back again later.⁪⁪",IM_TITLE_NOSAVEDITEMS:"⁪⁪⁪‌‌​​​‍‌‍‌​​​‌​​​​​‍‍‍​‍‌‌‍​‍​‍‍‌​‍‌​‍‍​​‌⁪You've not added any favorites yet⁪⁪",IM_SUBTITLE_NOSAVEDITEMS:"⁪⁪⁪‌‍​​​​​​‍​​​‍‍‌​​‌​‌‍‍‍​‌​​‍‌​​​‌​​​‍‍‍‌⁪Would you like to create a list of your favorite items now?⁪⁪",IM_TITLE_NOSEARCHRESULTS:"⁪⁪⁪‌‍​‌‍‍​​​‍‌‍‍‌‍​‍‍‍‌‍​‌​‌‍​‍​‍​​‍‌‍‌‍​​⁪No results found⁪⁪",IM_SUBTITLE_NOSEARCHRESULTS:"⁪⁪⁪‌‌‌‌‌‍‌​‌​​​‍‌‍‍‌​​‍​​​‍‌‍​‍‍​​‍‌​‌‍‌​​‍⁪Try changing your search criteria.⁪⁪",IM_TITLE_NOTASKS:"⁪⁪⁪‌‍‍‍‍​​‌‌‌‌‍‌‌‌​‌‌​‌‍​​‌‍‌‌​‍​‍‌​‍​‌‌‍‌⁪You've no new tasks⁪⁪",IM_SUBTITLE_NOTASKS:"⁪⁪⁪‌‌‌​‌‌‍​‍‍‍​‍​‍​‍‍‍​‌‍‌​​‌​‍‍‍‌‍​‌‍‌‍‌‌‍​⁪When you do, you'll see them here.⁪⁪",IM_TITLE_UNABLETOLOAD:"⁪⁪⁪‌​​​‌‌‌‍‍‍​‍​​‌‌‍​‌‍‍‍​‍‍‌‍‌‍‌‌‍‌‍​‌‍​​‍‍⁪Unable to load data⁪⁪",IM_SUBTITLE_UNABLETOLOAD:"⁪⁪⁪‌‍‍‌‌‌‌‍‍​‍‍​​‍‍​‍‌​​‌‍​‌‌​‌‌​‌‍‍‍‌​​‌​‌⁪Check your internet connection. If that's not it, try reloading. If that still doesn't help, check with your administrator.⁪⁪",IM_TITLE_UNABLETOUPLOAD:"⁪⁪⁪‌‌​​​‍‍​‍‍​‌​​‍‍​‌​​‌‍‍‍‌‍​‌​‍‍‍​‍‌‌‍​‌‌​⁪Unable to upload data⁪⁪",IM_SUBTITLE_UNABLETOUPLOAD:"⁪⁪⁪‌​​​​‌‍‌‍​‍​‌‍‌​‍‍‌‌‍‍​‌​‌‌​‌‍‌​‌​​​​‌‍​‌⁪Check your internet connection. If that's not it, try reloading. If that still doesn't help, check with your administrator.⁪⁪"};T.default=I});