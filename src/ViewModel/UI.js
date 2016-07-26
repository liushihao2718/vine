let UI = {
	setVineButton : function() {
		let button = document.createElement('button');
		button.onclick = this.onSetVine;
		button.textContent = '長藤蔓';
		let body = document.getElementsByTagName('body')[0];
		body.appendChild(button);
	},

	onSetVine: function () {}
};

module.exports = UI;