var segs = []
var length = 40;
var chainlength = 48;

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	frameRate(8);

	segs.push(new Segment(0, 0, 
		random([-length, length, 0]), 
		random([-length, length, 0])));

	for (var i=0; i < chainlength/2; i++) {
		segs.push(nextSegment(segs));
	}
}

function draw() {
	background(0);
	
	translate(width/2, height/2);

	strokeWeight(6);
	strokeCap(SQUARE);

	var strokecol = 255;
	for (var i= segs.length-1; i > 0; i--) {
		stroke(strokecol);
		line(segs[i].x1, segs[i].y1, segs[i].x2, segs[i].y2);
		strokecol -= Math.floor(255/chainlength);
	}

	if (segs.length > chainlength) {
		segs.shift();
	}

	segs.push(nextSegment(segs));
}

class Segment {
	constructor(x1, y1, x2, y2) {
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
	}
}

function nextSegment(segs) {
	this.segs = segs;	
	
	this.last_seg = this.segs.slice(-1)[0];

	this.last_x = this.last_seg.x2;
	this.last_y = this.last_seg.y2;

	this.pen_x = this.last_seg.x1;
	this.pen_y = this.last_seg.y1;

	this.x_poss = [this.last_x];
	this.y_poss = [this.last_y];
	
	if (this.last_x < width/2 - 80) {
		this.x_poss.push(this.last_x + length);
	}

	if (this.last_x > -width/2 + 80) {
		this.x_poss.push(this.last_x - length);
	}

	if (this.last_y < height/2 - 80) {
		this.y_poss.push(this.last_y + length);
	}

	if (this.last_y > -height/2 + 80) {
		this.y_poss.push(this.last_y - length);
	}
	
	this.new_x = random(this.x_poss);
	this.new_y = random(this.y_poss);

	while ((this.new_x === this.last_x && this.new_y === this.last_y) || (this.new_x === this.pen_x && this.new_y === this.pen_y)) {
		this.new_x = random(this.x_poss);
		this.new_y = random(this.y_poss);
	}

	return new Segment(this.last_x, this.last_y, this.new_x, this.new_y);
}
