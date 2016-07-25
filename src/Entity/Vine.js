class Vine{
	constroctor(p1, p2){
		this.start = p1;
		this.end = p2;

	}

	get pathString() {
		return 'M${x1} ${y1} L${x2} ${y2}';
	}
}

module.exports = Vine;