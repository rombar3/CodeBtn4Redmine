// ==UserScript==
// @name        CodeBtnForRedmine
// @namespace   https://github.com/Hi-Media
// @description Add a code button to redmine form
// @include     http://*redmine*/*
// @downloadURL https://github.com/rombar3/CodeBtnForRedmine/raw/master/CodeBtnForRedmine.user.js
// @updateURL https://github.com/rombar3/CodeBtnForRedmine/raw/master/CodeBtnForRedmine.meta.js
// @version     1
// @grant       none
// ==/UserScript==

//Allow to insert a text in a Textarea where the cursor is
function insertAtCaret(areaId,text) {
    var txtarea = document.getElementById(areaId);
    var scrollPos = txtarea.scrollTop;
    var strPos = 0;
    var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ? 
    	"ff" : (document.selection ? "ie" : false ) );
    if (br == "ie") { 
    	txtarea.focus();
    	var range = document.selection.createRange();
    	range.moveStart ('character', -txtarea.value.length);
    	strPos = range.text.length;
    }
    else if (br == "ff") strPos = txtarea.selectionStart;

    var front = (txtarea.value).substring(0,strPos);  
    var back = (txtarea.value).substring(strPos,txtarea.value.length); 
    txtarea.value=front+text+back;
    strPos = strPos + (text.length / 2);//Determine where the cursor will be after the insertion
    if (br == "ie") { 
    	txtarea.focus();
    	var range = document.selection.createRange();
    	range.moveStart ('character', -txtarea.value.length);
    	range.moveStart ('character', strPos);
    	range.moveEnd ('character', 0);
    	range.select();
    }
    else if (br == "ff") {
    	txtarea.selectionStart = strPos;
    	txtarea.selectionEnd = strPos;
    	txtarea.focus();
    }
    txtarea.scrollTop = scrollPos;
}

var newBtn = document.createElement('button');
newBtn.class = 'jstb_codeHighlight';
newBtn.type = 'button';
newBtn.tabindex = '200';
newBtn.title = 'Highlight code';
newBtn.style = 'width:40px;vertical-align:bottom;font-size: 0.8em;font-weight: bold;color: #505050;';

newBtn.appendChild(document.createTextNode('Code'));
newBtn.onclick = function(){
    var txtareas = this.parentNode.parentNode.getElementsByTagName('textarea');
    if(txtareas.length){
        insertAtCaret(txtareas[0].id, '<pre>\n<code class="">\n \n</code>\n</pre>');
    }
    
};

var refBtns = document.getElementsByClassName('jstb_pre');
for(var i = 0; i < refBtns.length;i++){
    refBtns[i].parentNode.insertBefore(newBtn, refBtns[i].nextSibling);
}

