function setup() {
  createCanvas(windowWidth, windowHeight);
  system = new System();
  system.spawnFires();
}

function draw() {
  system.drawBG();
  system.moveFires();
}
