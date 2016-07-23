const FlowerEntity = require('./FlowerEntity.js');

var FlowerBuilder = {
	readFromJSON : readFromJSON,
	readWithAjax : readWithAjax
};
module.exports = FlowerBuilder;

let outCallback;

function ajaxSuccess(argument) {
	readFromJSON(this.responseText, outCallback);
}

function readWithAjax(filePath, callback) {
	outCallback = callback;
	sendRequest(ajaxSuccess);
}



function readFromJSON(text, callback) {
	var jsonArray = JSON.parse(text);

	let flowers = [];


	jsonArray.forEach( (obj)=>{
		flowers.push( makeFlower(obj) );
	});

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

function sendRequest(callback) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'flower.json');
	xhr.send();

	xhr.onload = callback;
}