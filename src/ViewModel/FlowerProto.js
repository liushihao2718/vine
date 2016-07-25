class FlowerProto {
	//Position with x, y, rotate
	//size circle r
	constructor(entity, parent) {
		this._parent = parent;
		this.entity = entity;

		let circle = this._createCircle(),
			directLine = this._createLine(),
			pedicel = this._createPedicel();
		this._groupComponents( circle, directLine, pedicel);
	}

	updatePostion(cx, cy) {
		this.entity.position.x = cx;
		this.entity.position.y = cy;
	}
//prefix '_' means private
	_createCircle() {
		let bigCircle = this._parent.circle(
			this.entity.position.x,
			this.entity.position.y,
			this.entity.size);

		bigCircle.attr({
			fill: 'yellow',
			stroke: '#000',
			strokeWidth: 5
		});

		return bigCircle;
	}

	_createLine() {
		var directLine = this._parent.path(
			'M'+this.entity.position.x+' '+this.entity.position.y
			+' h '+ 1.5*this.entity.size);

		directLine.attr({
			stroke:'#000',
			strokeWidth:5,
			transform:rotate(this.entity.position.rotation, this.entity.position.x, this.entity.position.y)
		});

		return directLine;
	}

	_createPedicel() {
		let pedicelPath = this._parent.path(this.entity.pathString);

		pedicelPath.attr({
			stroke:'#000',
			strokeWidth:5,
			fill:'transparent'
		});

		return pedicelPath;
		
	}
	_groupComponents(circle, directLine, pedicel ) {

		var flower = this._parent.group(circle, directLine, pedicel);
		this._drag(flower);
	}

	_drag(el) {
		const self = this;

		el.drag(move, start, stop);

		function move(dx,dy) {
			this.attr({
				'transform': this.data('origTransform') + (this.data('origTransform') ? 'T' : 't') + [dx, dy]
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
		}
	}
}
module.exports = FlowerProto;

function rotate (a, x, y) {
	return 'rotate('+a+','+x+','+y+')';
}