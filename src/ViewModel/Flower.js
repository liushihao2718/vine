var Snap = require('snapsvg');

let parent;
class FlowerProto {
	//Position with x, y, rotate
	//size circle r
	constructor(position, size, parent) {
		this.position = position;
		this._parent = parent;

		let circle = this._createCircle( position, size);
		let directLine = this._createLine( position, size);
		this._createFlower( circle, directLine);
	}

	_createCircle(position, size) {
		let bigCircle = this._parent.circle(position.x,position.y,size);

		bigCircle.attr({
			fill: 'yellow',
			stroke: "#000",
			strokeWidth: 5
		});

		return bigCircle;
	}

	_createLine(position, size) {
		var directLine = this._parent.path("M"+position.x+" "+position.y+" h "+ 1.5*size);

		directLine.attr({
			stroke:'#000',
			strokeWidth:5,
			transform:rotate(-60, position.x, position.y)
		});

		return directLine;
	}

	

	_createFlower(circle, line) {

		const self = this;
		var flower = this._parent.group(circle, line);
		flower.drag(move, start, stop);

		function move(dx,dy) {
			this.attr({
					transform: this.data('origTransform') + (this.data('origTransform') ? "T" : "t") + [dx, dy]
			});
		}

		function start() {
			this.data('origTransform', this.transform().local );
		}
		function stop() {
			let matrix = this.transform().localMatrix,		
				old_x = this.select('circle').attr().cx,
				old_y = this.select('circle').attr().cy,
				cx = matrix.x(old_x, old_y),
				cy = matrix.y(old_x, old_y);
			self.updatePostion(cx, cy);
			console.log('position: '+JSON.stringify( self.position));
		}
	}

	updatePostion(cx, cy) {
		this.position.x = cx;
		this.position.y = cy;
	}
}
module.exports = FlowerProto;

function rotate (a, x, y) {
	return 'rotate('+a+','+x+','+y+')';
}