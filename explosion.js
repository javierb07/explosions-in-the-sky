class Explosion {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.color = color(color('hsl(' + floor(random(349)) + ', 100%, 50%)'));
        this.flakes = [];
    }
    generate(){
        let i = 100;
        while(i--) {
          this.flakes.push({
            color: this.color,
            pos: createVector(this.x, this.y),
            vel: p5.Vector.fromAngle(random(2*PI)).mult(random(10)),
            size: random(50)
          });
        }
    }
    explode(){
        for(let i = 0; i < this.flakes.length; i++) {
        this.flakes[i].pos.add(this.flakes[i].vel);
        this.flakes[i].size--;
          if(this.flakes[i].size > 0) {
            stroke(this.flakes[i].color);
            strokeWeight(this.flakes[i].size);
            point(this.flakes[i].pos.x, this.flakes[i].pos.y);
          } else {
            this.flakes.splice(i, 1);
          }
        }
    }
}