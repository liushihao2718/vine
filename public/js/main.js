(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}]},{},[1]);
