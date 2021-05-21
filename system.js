class System {
  constructor(maxFires=20){
    this.fires = [];
    this.maxFires = maxFires;
  }
  drawBG(){
	background(0,0,35,25); 
	let galaxy = { 
		locationX : random(width),
		locationY : random(height),
		size : random(1,6)
	}
	ellipse(mouseX ,mouseY, galaxy.size, galaxy.size);
	ellipse(galaxy.locationX ,galaxy.locationY, galaxy.size, galaxy.size);
  }
  spawnFires(){
    let r;
    while(this.fires.length < this.maxFires){
      let x = random(windowWidth);
      let y = random(windowHeight);
      r = random(40, 200);
      this.fires.unshift(new Fire(x, y, r));
      let numPart = Math.pow(r,1.23)/10;
	  let color = {
		  r: random(255),
		  g: random(255),
		  b: random(255),
	  }
      for (let i = 0; i < numPart; i++) {
        this.fires[0].particles.push(new Particle(this.fires[0].x, this.fires[0].y, this.fires[0].r, 20, color));
      }
    }
  }
	moveFires(){
		let removeFires = [];
		for (let i = this.fires.length - 1; i >= 0; i--) {
			let isOut;
			if(!mouseIsPressed){
				isOut = this.fires[i].move();
			} else {
				isOut = this.fires[i].moveTowards();
			}
			if(isOut){
				this.fires.splice(i, 1);
				this.spawnFires();
				continue;
			}
			this.fires[i].showParticles();
			let overlapping = false;
			for (let j = this.fires.length - 1; j >= 0; j--) {
				if(j!==i){  
					if (this.fires[i].intersects(this.fires[j])) {
						overlapping = true;
						removeFires.push(i,j);
					}
				}
			}
			if (overlapping) {
				let fire1 =this.fires[removeFires[removeFires.length-1]];
				let fire2 =this.fires[removeFires[removeFires.length-2]];
				let distance = dist(fire1.x, fire1.y, fire2.x, fire2.y)
				let exp = {};
				if(fire1.x > fire2.x) { exp.x = fire2.x + distance*0.707; }
				else {exp.x = fire1.x + distance*0.707; }
				if(fire1.y > fire2.y) { exp.y = fire2.y + distance*0.707; }
				else {exp.x = fire1.y + distance*0.707; }
				let explosion = new Explosion(exp.x, exp.y);
				explosion.generate();
				while(explosion.flakes.length > 0){
					explosion.explode();
				}
			} 
		}
		removeFires.sort();
		 for(let i = removeFires.length - 1; i >= 0; i--){
			this.fires.splice(removeFires[i], 1);
		 }
		 this.spawnFires();
	}
}
