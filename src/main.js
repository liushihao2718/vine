var Snap = require('snapsvg'),
	svg = Snap(800, 400),
	FlowerProto = require('./ViewModel/FlowerProto.js'),
	FlowerBuilder = require('./Entity/FlowerBuilder.js'),
	Vine = require('./Entity/Vine.js'),
	VineProto = require('./ViewModel/VineProto'),
	VineBuilder = require('./Entity/VineBuilder.js'),
	UI = require('./ViewModel/UI.js');

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


UI.onSetVine = function(){
	flowerProtos.sort((a, b)=>{
		return (a.entity.position.x < b.entity.position.x) ? 1 : -1;
	});
	cleanVine();
	setVines(flowerProtos, svg);
};
UI.setVineButton();


function cleanVine() {
	vines.forEach((x)=>{
		x.remove();
	});

	while(vines.length > 0) {
		let vine = vines.pop();
		vine.remove;
	}
}
function setVines(flowerProtos, parent) {
	if(flowerProtos.length === 0 || parent === undefined) return;
	
	makeStartVine(parent);

	for (var i = 0; i < flowerProtos.length-1; i++) {
		makeVine( flowerProtos[i].entity, flowerProtos[i+1].entity, parent);
	}
}

function makeStartVine(parent) {
	let startEntity = FlowerBuilder.startEntity();
	makeVine( startEntity, flowerProtos[0].entity, parent);
}

function makeVine(entity1, entity2, parent) {
	if(entity1 === undefined || entity2 === undefined || parent === undefined) return;

	let vine = new Vine(entity1, entity2);
	vine.pathString = VineBuilder.makeVine(entity1, entity2);
	let vineProto = new VineProto(vine, parent);
	vines.push(vineProto); 
}