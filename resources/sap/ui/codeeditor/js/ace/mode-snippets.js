ace.define("ace/mode/folding/coffee",[],function(r,e,m){"use strict";var o=r("../../lib/oop");var B=r("./fold_mode").FoldMode;var R=r("../../range").Range;var F=e.FoldMode=function(){};o.inherits(F,B);(function(){this.getFoldWidgetRange=function(s,f,a){var b=this.indentationBlock(s,a);if(b)return b;var c=/\S/;var l=s.getLine(a);var d=l.search(c);if(d==-1||l[d]!="#")return;var g=l.length;var h=s.getLength();var i=a;var j=a;while(++a<h){l=s.getLine(a);var k=l.search(c);if(k==-1)continue;if(l[k]!="#")break;j=a;}if(j>i){var n=s.getLine(j).length;return new R(i,g,j,n);}};this.getFoldWidget=function(s,f,a){var l=s.getLine(a);var i=l.search(/\S/);var n=s.getLine(a+1);var p=s.getLine(a-1);var b=p.search(/\S/);var c=n.search(/\S/);if(i==-1){s.foldWidgets[a-1]=b!=-1&&b<c?"start":"";return"";}if(b==-1){if(i==c&&l[i]=="#"&&n[i]=="#"){s.foldWidgets[a-1]="";s.foldWidgets[a+1]="";return"start";}}else if(b==i&&l[i]=="#"&&p[i]=="#"){if(s.getLine(a-2).search(/\S/)==-1){s.foldWidgets[a-1]="start";s.foldWidgets[a+1]="";return"";}}if(b!=-1&&b<i)s.foldWidgets[a-1]="start";else s.foldWidgets[a-1]="";if(i<c)return"start";else return"";};}).call(F.prototype);});ace.define("ace/mode/snippets",[],function(r,e,m){"use strict";var o=r("../lib/oop");var T=r("./text").Mode;var a=r("./text_highlight_rules").TextHighlightRules;var S=function(){var c="SELECTION|CURRENT_WORD|SELECTED_TEXT|CURRENT_LINE|LINE_INDEX|"+"LINE_NUMBER|SOFT_TABS|TAB_SIZE|FILENAME|FILEPATH|FULLNAME";this.$rules={"start":[{token:"constant.language.escape",regex:/\\[\$}`\\]/},{token:"keyword",regex:"\\$(?:TM_)?(?:"+c+")\\b"},{token:"variable",regex:"\\$\\w+"},{onMatch:function(v,s,d){if(d[1])d[1]++;else d.unshift(s,1);return this.tokenName;},tokenName:"markup.list",regex:"\\${",next:"varDecl"},{onMatch:function(v,s,d){if(!d[1])return"text";d[1]--;if(!d[1])d.splice(0,2);return this.tokenName;},tokenName:"markup.list",regex:"}"},{token:"doc.comment",regex:/^\${2}-{5,}$/}],"varDecl":[{regex:/\d+\b/,token:"constant.numeric"},{token:"keyword",regex:"(?:TM_)?(?:"+c+")\\b"},{token:"variable",regex:"\\w+"},{regex:/:/,token:"punctuation.operator",next:"start"},{regex:/\//,token:"string.regex",next:"regexp"},{regex:"",next:"start"}],"regexp":[{regex:/\\./,token:"escape"},{regex:/\[/,token:"regex.start",next:"charClass"},{regex:"/",token:"string.regex",next:"format"},{"token":"string.regex",regex:"."}],charClass:[{regex:"\\.",token:"escape"},{regex:"\\]",token:"regex.end",next:"regexp"},{"token":"string.regex",regex:"."}],"format":[{regex:/\\[ulULE]/,token:"keyword"},{regex:/\$\d+/,token:"variable"},{regex:"/[gim]*:?",token:"string.regex",next:"start"},{"token":"string",regex:"."}]};};o.inherits(S,a);e.SnippetHighlightRules=S;var b=function(){this.$rules={"start":[{token:"text",regex:"^\\t",next:"sn-start"},{token:"invalid",regex:/^ \s*/},{token:"comment",regex:/^#.*/},{token:"constant.language.escape",regex:"^regex ",next:"regex"},{token:"constant.language.escape",regex:"^(trigger|endTrigger|name|snippet|guard|endGuard|tabTrigger|key)\\b"}],"regex":[{token:"text",regex:"\\."},{token:"keyword",regex:"/"},{token:"empty",regex:"$",next:"start"}]};this.embedRules(S,"sn-",[{token:"text",regex:"^\\t",next:"sn-start"},{onMatch:function(v,s,c){c.splice(c.length);return this.tokenName;},tokenName:"text",regex:"^(?!\t)",next:"start"}]);};o.inherits(b,a);e.SnippetGroupHighlightRules=b;var F=r("./folding/coffee").FoldMode;var M=function(){this.HighlightRules=b;this.foldingRules=new F();this.$behaviour=this.$defaultBehaviour;};o.inherits(M,T);(function(){this.$indentWithTabs=true;this.lineCommentStart="#";this.$id="ace/mode/snippets";this.snippetFileId="ace/snippets/snippets";}).call(M.prototype);e.Mode=M;});(function(){ace.require(["ace/mode/snippets"],function(m){if(typeof module=="object"&&typeof exports=="object"&&module){module.exports=m;}});})();