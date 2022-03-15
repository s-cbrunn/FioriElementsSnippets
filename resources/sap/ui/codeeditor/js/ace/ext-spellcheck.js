ace.define("ace/ext/spellcheck",[],function(a,b,m){"use strict";var d=a("../lib/event");b.contextMenuHandler=function(e){var h=e.target;var t=h.textInput.getElement();if(!h.selection.isEmpty())return;var c=h.getCursorPosition();var r=h.session.getWordRange(c.row,c.column);var w=h.session.getTextRange(r);h.session.tokenRe.lastIndex=0;if(!h.session.tokenRe.test(w))return;var P="\x01\x01";var v=w+" "+P;t.value=v;t.setSelectionRange(w.length,w.length+1);t.setSelectionRange(0,0);t.setSelectionRange(0,w.length);var f=false;d.addListener(t,"keydown",function o(){d.removeListener(t,"keydown",o);f=true;});h.textInput.setInputHandler(function(n){if(n==v)return'';if(n.lastIndexOf(v,0)===0)return n.slice(v.length);if(n.substr(t.selectionEnd)==v)return n.slice(0,-v.length);if(n.slice(-2)==P){var g=n.slice(0,-2);if(g.slice(-1)==" "){if(f)return g.substring(0,t.selectionEnd);g=g.slice(0,-1);h.session.replace(r,g);return"";}}return n;});};var E=a("../editor").Editor;a("../config").defineOptions(E.prototype,"editor",{spellcheck:{set:function(v){var t=this.textInput.getElement();t.spellcheck=!!v;if(!v)this.removeListener("nativecontextmenu",b.contextMenuHandler);else this.on("nativecontextmenu",b.contextMenuHandler);},value:true}});});(function(){ace.require(["ace/ext/spellcheck"],function(m){if(typeof module=="object"&&typeof exports=="object"&&module){module.exports=m;}});})();
