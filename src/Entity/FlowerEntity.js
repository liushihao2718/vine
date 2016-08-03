
class FlowerEntity {
	constructor(position, size) {
		this.position = position;
		this.size = size;
	}

	get pedicel() {

		const self = this,
			sign = getSign(self.position.rotation);
		return {
			Q:{
				// x : self.position.x + (sign* -1)*Math.tan(self.position.rotation) * self.size,
				// y : self.position.y + (sign* -1) * self.size
				x : self.position.x + (sign* -1)*Math.sin(self.position.rotation) * self.size,
				y : self.position.y + (sign* -1) *Math.cos(self.position.rotation) * 2*self.size
			},
			end:{
				x : self.position.x,
				y : self.position.y + (sign* -1) * 2 * self.size
			}
		};

		function getSign(x) {
			x = +x; // convert to a number
			if (x === 0 || isNaN(x)) {
				return x;
			}
			return x > 0 ? 1 : -1;
		}
	}

	get pathString() {

		let Q = this.pedicel.Q,
			end = this.pedicel.end,
			cx = this.position.x,
			cy = this.position.y;

		return `M${cx} ${cy} Q${Q.x} ${Q.y} ${end.x} ${end.y}`;
	}
}

module.exports = FlowerEntity;