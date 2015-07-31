
var isGecko = navigator.userAgent.toLowerCase().indexOf("gecko") != -1;
var iframe = (isGecko) ? document.getElementById("frameId") : frames["frameId"];
var iWin = (isGecko) ? iframe.contentWindow : iframe.window;
var iDoc = (isGecko) ? iframe.contentDocument : iframe.document;

iHTML = "<html><head><link rel='stylesheet' type='text/css' href='css/style2.css'></head><body id='drop' onpaste='pasteFunction(event)'></body><script type='text/javascript' src='js/script2.js'></script></html>";
iDoc.open(); 
iDoc.write(iHTML); 
iDoc.close(); 
iDoc.designMode = "on"; 

function setBold() {
  iWin.focus();
  iWin.document.execCommand("bold", null, "");
  if (iWin.isBold == false) {
  	iWin.isBold = true;
  } else {
  	iWin.isBold = false;
  }
}

function setItal() {
  iWin.focus();
  iWin.document.execCommand("italic", null, "");
  console.log(iWin.isCursive);
  if (iWin.isCursive == false) {
  	iWin.isCursive = true;
  } else {
  	iWin.isCursive = false;
  }
}


function setOl() {
  iWin.focus();
  iWin.document.execCommand("insertOrderedList", null, "");
}

function setUl() {
  iWin.focus();
  iWin.document.execCommand("insertUnorderedList", null, "");
}

function setUnderline() {
  iWin.focus();
  iWin.document.execCommand("underline", null, "");
  if (iWin.isUnderlined == false) {
  	iWin.isUnderlined = true;
  } else {
  	iWin.isUnderlined = false;
  }
}

var frame = document.getElementById('frameId');
frame.addEventListener('onpaste', function (e) {
	e.preventDefault();
});

var fontButton = document.getElementById('Font');
fontButton.addEventListener('click', function (e) {
	var subMenu = document.getElementById('subMenu');
	var visibility = subMenu.style.visibility
	if (subMenu.style.visibility == 'visible') {
		subMenu.style.visibility = 'hidden';
	} else {
		subMenu.style.visibility = 'visible';
	}
});

var setFont = function(size) {
	iWin.focus();
  	iWin.document.execCommand("fontSize", null, size);
  	console.log(iWin.fontSize);
  	iWin.fontSize = size;
}