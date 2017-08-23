var segs = []
var length = 40;

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	frameRate(25);

	segs.push(new Segment(0, 0, 
		random([-length, length, 0]), 
		random([-length, length, 0])));
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
		strokecol -= 2;
	}

	if (segs.length > 100) {
		segs.shift();
	}

	var last_seg = segs.slice(-1)[0];

	var last_x = last_seg.x2;
	var last_y = last_seg.y2;

	var pen_x = last_seg.x1;
	var pen_y = last_seg.y1;

	var x_poss = [last_x];
	var y_poss = [last_y];
	
	if (last_x < width/2 - 80) {
		x_poss.push(last_x + length);
	}

	if (last_x > -width/2 + 80) {
		x_poss.push(last_x - length);
	}

	if (last_y < height/2 - 80) {
		y_poss.push(last_y + length);
	}

	if (last_y > -height/2 + 80) {
		y_poss.push(last_y - length);
	}
	
	var new_x = random(x_poss);
	var new_y = random(y_poss);

	while ((new_x === last_x && new_y === last_y) || (new_x === pen_x && new_y === pen_y)) {
		new_x = random(x_poss);
		new_y = random(y_poss);
	}
	
	segs.push(new Segment(last_x, last_y, new_x, new_y));

}

class Segment {
	constructor(x1, y1, x2, y2) {
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
	}
}
