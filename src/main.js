var s = Snap(800, 400),
	FlowerProto = require('./ViewModel/Flower.js');

s.attr({
	style:'background-color:lightgray'
});

var position = {
	x:50,
	y:50,
	rotation:60
}

let size = 80;

let flower = new FlowerProto(position, size, s);

console.log(flower);