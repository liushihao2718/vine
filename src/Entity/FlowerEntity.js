
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
				x : self.position.x + (sign* -1)*Math.tan(self.position.rotation) * self.size,
				y : self.position.y + (sign* -1) * self.size
			},
			end:{
				x : self.position.x,
				y : self.position.y + (sign* -1) * 2 * self.size
			}
		}

		function getSign(x) {
			x = +x; // convert to a number
			if (x === 0 || isNaN(x)) {
				return x;
			}
				return x > 0 ? 1 : -1;
		}
	}
}

module.exports = FlowerEntity;