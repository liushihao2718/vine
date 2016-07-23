
class FlowerEntity {
	constructor(position, size) {
		this.position = position;
		this.size = size;
	}

	get pedicel() {

		const self = this;
		return {
			Q:{
				x : self.position.x + Math.tan(self.position.rotation) * self.size,
				y : self.position.y + self.size
			},
			end:{
				x : self.position.x,
				y : self.position.y + (getSign(self.position.rotation) * -1) * self.size
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