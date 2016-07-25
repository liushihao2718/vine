let FlowerEntity = require('./FlowerEntity.js');

var FlowerBuilder = {
	readWithAjax : readWithAjax
};
module.exports = FlowerBuilder;

let outCallback;

function readWithAjax(filePath, callback) {
	outCallback = callback;
	sendRequest(ajaxSuccess);
}

function sendRequest(callback) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'flower.json');
	xhr.send();

	xhr.onload = callback;
}

function ajaxSuccess() {
	readFromJSON(this.responseText, outCallback);
}

function readFromJSON(text, callback) {
	var jsonArray = JSON.parse(text);

	let flowers = [];

	for (var i = 0; i < jsonArray.length; i++) {
		let flower = makeFlower( jsonArray[i] );
		flowers.push(flower);
	}

	callback(flowers);
}

function makeFlower(obj) {
	if (obj.hasOwnProperty('position') 
		&& obj['position'].hasOwnProperty('x')
		&& obj['position'].hasOwnProperty('y')
		&& obj['position'].hasOwnProperty('rotation')
		&& obj.hasOwnProperty('size'))
	{
		return new FlowerEntity(obj.position, obj.size);
	}
}

