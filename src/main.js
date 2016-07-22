var s = Snap(800, 400),
	Matrix = Snap.Matrix();

s.attr({
	style:'background-color:lightgray'
});

var position = {
	x:50,
	y:50,
	r:100,
	rotation:60
}

var UI = {stateLabel:s.text(10, 10, 'stop')}

var bigCircle = s.circle(position.x,position.y,position.r);

bigCircle.attr({
    fill: 'yellow',
    stroke: "#000",
    strokeWidth: 5
});

var directLine = s.path("M"+position.x+" "+position.y+" h "+ 1.5*position.r);
directLine.attr({
	stroke:'#000',
	strokeWidth:5,
	transform:rotate(-60, position.x, position.y)
});

function rotate (a, x, y) {
	return 'rotate('+a+','+x+','+y+')';
}

var flower = s.group(bigCircle, directLine);

// flower.drag();

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
    console.log('data:'+ this.transform().local);
}