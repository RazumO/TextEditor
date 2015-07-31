//common parametres for font
fontSize = 3;
isBold = false;
isCursive = false;
isUnderlined = false

// ------------------Processing clipboard-----------

function pasteFunction(e) {
	e.preventDefault();

	var images = [];
	var text = '';
	var items = e.clipboardData.items;
	var types = e.clipboardData.types;
	var length = items.length;
	//Вибираю картинки з буферу
	for (var i = 0; i < length; i++) {
		curItem = items[i];
		if (('' + curItem.type).match(/image.*/)) {
			images.push(i);
		} else if (curItem.type == 'text/plain') {
			text = e.clipboardData.getData('text/plain');
			text = prepareText(text);
			console.log(text);
			window.focus();
			window.document.execCommand("insertHTML", false, text);
		}
	}

	console.log(types, images);
	var imgCount = images.length;
	for (var j = 0; j < imgCount; j++) {
		var items = e.clipboardData.items;
		var curImgIndex = images[j];
		console.log(items[curImgIndex].type);
		var blob = items[curImgIndex].getAsFile();
		var reader = new FileReader();
		reader.readAsDataURL(blob);
		reader.onload = function(event){
			var imgUrl = event.target.result;
			console.log(imgUrl);
			window.focus();
  			window.document.execCommand("insertImage", true, imgUrl);
		};

	}


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

