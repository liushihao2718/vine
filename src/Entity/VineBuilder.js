let math = require('mathjs');


class VineBuilder {
	static makeStartVine(startPoint, flowerEntity) {
		let flowerPedicel = flowerEntity.pedicel;
		let vectorQE = {
				x : flowerPedicel.end.x - flowerPedicel.Q.x,
				y : flowerPedicel.end.y - flowerPedicel.Q.y
			},
			t1 = {
				x: flowerPedicel.end.x + vectorQE.x,
				y: flowerPedicel.end.y + vectorQE.y
			},
			m = {
				x:(startPoint.position.x + flowerPedicel.end.x)/2,
				y:(startPoint.position.y + flowerPedicel.end.y)/2
			};

		return `M${flowerPedicel.end.x} ${flowerPedicel.end.y} `
				+`Q${t1.x} ${t1.y} `
				+`${m.x} ${m.y} `
				+`T${startPoint.position.x} ${startPoint.position.y}`;
	}

	static makeVine(entity1, entity2) {

		if ( Math.sign(entity1.position.rotation) !== Math.sign(entity2.position.rotation) )
		{
			let L1 = {
					p1: entity1.pedicel.end,
					p2: entity1.pedicel.Q 
				},
				L2 = {
					p1: entity2.pedicel.end,
					p2: entity2.pedicel.Q
				};

			let Q = math.intersect([L1.p1.x, L1.p1.y], [L1.p2.x, L1.p2.y], [L2.p1.x, L2.p1.y], [L2.p2.x, L2.p2.y]);

			return `M${L1.p1.x} ${L1.p1.y} `
				+`Q${Q[0]} ${Q[1]} `
				+`${L2.p1.x} ${L2.p1.y}`;
		}

		return '';
	}
}

module.exports = VineBuilder;