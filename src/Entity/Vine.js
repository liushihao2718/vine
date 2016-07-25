let FlowerEntity = require('./FlowerEntity.js');

class Vine{
	constructor(p1, p2){

		if (!(p1 instanceof FlowerEntity) 
			&& !(p1 instanceof FlowerEntity) )
		{
			console.error('Vine construct error');
		}

		this.start = p1.pedicel.end;
		this.end = p2.pedicel.end;
		this.pathString = this.defaultString();
	}

	defaultString(){
		let x1 = this.start.x,
			y1 = this.start.y,
			x2 = this.end.x,
			y2 = this.end.y;

		return `M${x1} ${y1} L${x2} ${y2}`;
	}
}

module.exports = Vine;