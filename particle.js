class Particle {
  constructor(x, y, r=100, s=20, color) {
    this.color = {
      r: color.r,
      g: color.g,
      b: color.b,
    }
    this.center = {
        x: x,
        y: y,
    }
    this.x = x;
    this.y = y;
    this.r = r;
    this.s = s;
    this.vx = random(-1, 1);
    this.vy = random(1, -1);
    this.alpha = 255;
  }
  finished() {
    return this.alpha < 0;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 1;
  }
  reset() {
    this.x = this.center.x;
    this.y = this.center.y;
    this.alpha =255;
	}
	move(x,y){
		this.center.x = x;
		this.center.y = y;
	}
  extinguished() {
    let d = dist(this.center.x, this.center.y,this.x, this.y);
    if(d > this.r/2 + random(-2,2)) {
      this.alpha = 0;
      return true;
    } else {
      return false;
    }
  }
  show() {
    noStroke();
    fill(this.color.r, this.color.g, this.color.b, this.alpha);
    ellipse(this.x, this.y, random(this.s-10, this.s+10));
  }
}
