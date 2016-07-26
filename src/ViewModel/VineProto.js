let Vine = require('../Entity/Vine.js');

class VineProto {
	constructor(vineEntity, parent){
		this._checkArgument(vineEntity);

		this.parent = parent;
		this.entity = vineEntity;

		this.svg = this._createPath();
	}

	_checkArgument(vineEntity) {
		if (!vineEntity instanceof Vine) {
			console.error('vineEntity is not instance of Vine');
		}
	}

	_createPath() {
		let svg = this.parent.path(this.entity.pathString);
		svg.attr({
			stroke:'#000',
			strokeWidth:5,
			fill:'transparent'
		});
		return svg;
	}

	remove(){
		this.svg.remove();
	}
}

module.exports = VineProto;