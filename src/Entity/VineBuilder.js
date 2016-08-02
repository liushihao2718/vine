class VineBuilder {
	static makeVine(startPoint, flowerEntity) {
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
				x:(startPoint.pedicel.end.x + flowerPedicel.end.x)/2,
				y:(startPoint.pedicel.end.y + flowerPedicel.end.y)/2
			};

		return `M${flowerPedicel.end.x} ${flowerPedicel.end.y} `
				+`Q${t1.x} ${t1.y} `
				+`${m.x} ${m.y} `
				+`T${startPoint.pedicel.end.x} ${startPoint.pedicel.end.y}`;
	}
}

module.exports = VineBuilder;