let mic;
let dials= [];
let cols; let rows;
let size = 20;

function setup() {
  createCanvas(400, 400);
  cols = width/size;
  rows = height/size;
  for (let i = 0; i<cols; i++){
    dials[i] = [];
    for (let j = 0; j<rows; j++){
      dials[i][j] = new Dial(size/2 + i * size, size/2 + j* size, size);
    }
  }
  
  rectMode(CENTER);
  angleMode(DEGREES);

  mic = new p5.AudioIn();
  mic.start();
  
  d = new Dial(width/2, height/2);

}

function draw() {
  background(220);
  micLevel = mic.getLevel();
  //console.log(micLevel);
  
  for (let i = 0; i<cols; i++){
    for (let j = 0; j<rows; j++){
      
  dials[i][j].moveDial();
    }
  }
}
