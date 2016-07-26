var Snap = require('snapsvg'),
	svg = Snap(800, 400),
	FlowerProto = require('./ViewModel/FlowerProto.js'),
	FlowerBuilder = require('./Entity/FlowerBuilder.js'),
	Vine = require('./Entity/Vine.js'),
	VineProto = require('./ViewModel/VineProto'),
	VineBuilder = require('./Entity/VineBuilder.js');

svg.attr({
	style:'background-color:lightgray'
});

const
	flowerProtos = [],
	vines = [];

FlowerBuilder.target = svg;

readFile(function(){
	
	let jsonArray = JSON.parse( this.responseText );
	let flowers = FlowerBuilder.buildWithArray(jsonArray);
	setFlowers(flowers, svg);
	setVines(flowerProtos, svg);

});
function readFile(callback) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'flower.json');
	xhr.send();

	xhr.onload = callback;
}
function setFlowers(flowers, parent) {
	for (var i = 0; i < flowers.length; i++) {
		flowerProtos.push( new FlowerProto(flowers[i], parent) );
	}
}

function setVines(flowerProtos, parent) {
	if(flowerProtos.length === 0 || parent === undefined) return;
	
	let startVine = makeStartVine();
	let vineProto = new VineProto(startVine, parent);
	vines.push(vineProto); 

	for (var i = 0; i < flowerProtos.length-1; i++) {
		let vine = makeVine( flowerProtos[i].entity, flowerProtos[i+1].entity );
		let vineProto = new VineProto(vine, parent);
		vines.push(vineProto);
	}
}

function makeStartVine() {
	let startEntity = FlowerBuilder.startEntity();
	let startVine = new Vine( startEntity, flowerProtos[0].entity );
	startVine.pathString = VineBuilder.makeStartVine(startEntity, flowerProtos[0].entity);

	return startVine;
}

function makeVine(entity1, entity2) {
	let vine = new Vine(entity1, entity2);
	vine.pathString = VineBuilder.makeVine(entity1, entity2);
	return vine;
}