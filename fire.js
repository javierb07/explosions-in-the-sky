class Fire{
  constructor(x, y, r = 50) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.vx = 0;
    this.vy = 0;
    this.speed = 5;
    this.brightness = 0;
    this.particles = [];
  }
  move() {
    this.vx = random(-this.speed, this.speed);
    this.vy = random(-this.speed, this.speed);
    return this.updatePos();
  }
  moveTowards() {
    let posX = this.x > mouseX;
    let posY = this.y > mouseY;
    if(posX) {
      this.vx = random(-this.speed,0);
    } else {
      this.vx = random(0,this.speed);
    }
    if(posY) {
      this.vy = random(-this.speed,0);
    } else {
      this.vy = random(0,this.speed)
    }
    return this.updatePos();
  }
  intersects(other) {
    let d = dist(this.x, this.y, other.x, other.y);
    return d < (this.r + other.r)/4;
  }
  changeColor(bright) {
    this.brightness = bright;
  }
	showParticles(){
		for (let i = this.particles.length - 1; i >= 0; i--) {
			this.particles[i].update();
			this.particles[i].show();
			this.particles[i].move(this.x, this.y);
			if (this.particles[i].extinguished()) {
				this.particles[i].reset();
			}
		}
	}
  updatePos(){
    this.x = this.x + this.vx;
    this.y = this.y + this.vy;
    return (this.x > windowWidth || this.x < 0 || this.y > windowHeight || this.y < 0);
  }
}
