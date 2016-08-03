class VineBuilder {
	static makeVine(entity1, entity2) {
		let flowerPedicel = entity2.pedicel;
		let vectorQE = {
				x : flowerPedicel.end.x - flowerPedicel.Q.x,
				y : flowerPedicel.end.y - flowerPedicel.Q.y
			},
			t1 = {
				x: flowerPedicel.end.x + vectorQE.x,
				y: flowerPedicel.end.y + vectorQE.y
			},
			m = makeMiddlePoint(entity1, entity2);

		return `M${flowerPedicel.end.x} ${flowerPedicel.end.y} `
				+`Q${t1.x} ${t1.y} `
				+`${m.x} ${m.y} `
				+`T${entity1.pedicel.end.x} ${entity1.pedicel.end.y}`;
	}


}

module.exports = VineBuilder;

function makeMiddlePoint(entity1, entity2) {
	if(entity1.size === 0 || entity2.size === 0 || entity1.size === entity2.size) {
		return {
			x:(entity1.pedicel.end.x + entity2.pedicel.end.x)/2,
			y:(entity1.pedicel.end.y + entity2.pedicel.end.y)/2
		};
	}
	else{
		let long = entity1.size + entity2.size;
		return {
			x:(entity1.pedicel.end.x * entity2.size + entity2.pedicel.end.x * entity1.size)/long,
			y:(entity1.pedicel.end.y * entity2.size + entity2.pedicel.end.y * entity1.size)/long
		};	
	}
}