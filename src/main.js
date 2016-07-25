var Snap = require('snapsvg'),
	svg = Snap(800, 400),
	FlowerProto = require('./ViewModel/FlowerProto.js'),
	FlowerBuilder = require('./Entity/FlowerBuilder.js'),
	Vine = require('./Entity/Vine.js'),
	VineProto = require('./ViewModel/VineProto'),
	math = require('mathjs');

svg.attr({
	style:'background-color:lightgray'
});

const
	flowerProtos = [],
	vines = [];

FlowerBuilder.target = svg;

readFile(function(){
	try{
		let jsonArray = JSON.parse( this.responseText );
		let flowers = FlowerBuilder.buildWithArray(jsonArray);
		setFlowers(flowers, svg);
		setVines(flowerProtos, svg);
	}catch(e){
		console.error(e);
	}
});

function setFlowers(flowers, parent) {
	for (var i = flowers.length - 1; i >= 0; i--) {
		flowerProtos.push( new FlowerProto(flowers[i], parent) );
	}
}

function setVines(flowerProtos, parent) {
	if(flowerProtos.length === 0 || parent === undefined) return;
	
	for (var i = 0; i < flowerProtos.length-1; i++) {
		let vine = new Vine( flowerProtos[i].entity, flowerProtos[i+1].entity );
		let vineProto = new VineProto(vine, parent);
		vines.push(vineProto);
	}
}

function readFile(callback) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'flower.json');
	xhr.send();

	xhr.onload = callback;
}