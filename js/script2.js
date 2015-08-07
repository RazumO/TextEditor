//common parametres for font
fontSize = 3;
isBold = false;
isCursive = false;
isUnderlined = false;

// ------------------Processing clipboard-----------

function pasteFunction(e) {
	var types = e.clipboardData.types;
	console.log(types);
	//Якшо у буфері текст, то форматую його під налаштування
	var isText = false;
	var length = types.length;
	for (var i = 0; i < length; i++) {
		if (types[i] == 'text/plain') {
			isText = true;
		}
	}
	if (isText) {
		e.preventDefault();
		var data = e.clipboardData.getData('text/plain');
		var text = prepareText(data);
		window.focus();
		window.document.execCommand("insertHTML", false, text);
	}
	//Якщо ні, то залишається дія по замовчуванню (виявилось, що браузери підтримують вставку картинок по замовчуванню)
}



function prepareText(text) {
	var text = '<font size="' + fontSize + '">' + text + '</font>';
	if (isBold) {
		text = '<b>' + text + '</b>';
	}
	if (isCursive) {
		text = '<i>' + text + '</i>';
	}
	if (isUnderlined) {
		text = '<u>' + text + '</u>';
	}
	return text;
}

// ----------------------------drag&drop-------------------------

function cancel(e) {
	e.preventDefault();
}

var drop   = document.getElementById('drop');
drop.addEventListener('dragover', cancel);
drop.addEventListener('dragenter', cancel);
drop.addEventListener('drop', dropProessing);

function dropProessing(e) {
	var dt    = e.dataTransfer;
  	var files = dt.files;
  	console.log(files);
  	var length = files.length;
  	for (var i = 0; i < length; i++) {
  		var file = files[i];
  		if (('' + file.type).match(/image.*/)) {
  			var reader = new FileReader();
  			reader.readAsDataURL(file);
  			reader.onload = function(event){
				var imgUrl = event.target.result;
				console.log(imgUrl);
				window.focus();
	  			window.document.execCommand("insertImage", true, imgUrl);
			};
  		}
  	}

}

window.onload = function (e) {
	window.focus();
	window.document.execCommand("insertHTML", false, '<span style="width: 1px;></span> ');;
}
