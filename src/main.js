var s = Snap(800, 400),
	FlowerProto = require('./ViewModel/FlowerProto.js'),
	FlowerBuilder = require('./Entity/FlowerBuilder.js');

s.attr({
	style:'background-color:lightgray'
});


const flowerProtos = [];

FlowerBuilder.readWithAjax('flower.json', (obj)=>{
	obj.forEach((x)=>{
		flowerProtos.push( new FlowerProto(x, s) );
	});
});
