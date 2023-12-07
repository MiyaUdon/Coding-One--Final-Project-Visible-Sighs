let grassy;
let mic;

function setup() {
  createCanvas(windowWidth, 800);
  mySize = min(windowWidth, 800);
  margin = mySize / 100;
  grass = new yard();
  mic = new p5.AudioIn();
  mic.start();
  pixelDensity(1);
}

function draw() {
  background(255);
  blendMode(BLEND);
  grass.update();
  micLevel = mic.getLevel();
  
  //rain
  for (let i = 0; i < 40; i++){
    let gap =5;
    
    overAllTexture = createGraphics(200, 200);
    image(overAllTexture, 0, 0);
    
    let vol = map(micLevel,0,0.8,0,20);
    fill(16+i*20, 201-i, 130);
    stroke(16+i*20, 201, 13,0.5);
    strokeWeight(10);
    rectMode(CORNER);
    
    push();
    translate(1200/2, 800/2)
  //if (micLevel > 0.66) {}
    rotate(10*-vol*0.2);
    rect((-10-i*10+random(-200,windowWidth))+vol*10, -10-i*10+random(0,400), 3, 10); 
    stroke(16+i*20, 201, 135);
    rect((-10-i*10+random(-200,windowWidth))+vol*10, -10-i*10+random(0,400), 3, 10);
   pop()
  }
  fill(255);
  rect(0,600,windowWidth,400);  
}

function yard() {
  // Array storing horizontal coordinates of each blade of grass
  this.grass = [];
  // Array storing offsets for generating noise and affecting grass movement
  this.roff = [];
  //Array storing curvature values for each blade of grass
  this.rwave = [];
  // Array storing the length of each blade of grass
  this.size = [];    
  // Array storing a scaling factor for controlling variation in grass length
  this.seg = [];     
  
  this.index = 0;
  this.population = 200;

  
  for (let x = 0; x < width*6; x += width / this.population) {
    this.index += 1;
    this.grass.push(x);
    this.roff.push((this.index * 0.065) + 0.015);
    this.rwave.push(10);
    this.size.push(random(35, 80));
    //草的高低
    this.seg.push(0.85);
  }
 this.update = function() {
    for (let i = 0; i < this.index; i++) { // draw many blades
      let len = this.size[i];
      push();
      translate(this.grass[i], height * 0.65);
      this.blade(len, i);
      pop();
    }
  }
 this.blade = function(len, ind) {
   //first layer of grass
   if (ind / 2 === int(ind / 2)) {
     //音量控制草的摇摆
     micLevel = mic.getLevel();
     let vol = map(micLevel,0,0.8,0,0.02);
     this.roff[ind] += vol;
     
     //音量控制草的颜色
     let r = map (micLevel,0,0.8,0,255);
     //console.log(r);
     let g = map (micLevel,0,0.8,10,0);
     let b = map (micLevel,0,0.8,0,10);
     let a = map (micLevel,0,0.8,0,255);
     
     stroke(200+r*10, 110 + (len * 1.5), 52-len * 2, 255);
    
     
     rot = map(noise(this.roff[ind]), 0, 1,
        -PI/4 * 0.75, PI/4 * 0.75);
    }
       //secound layer of grass
   if (ind / 2 != int(ind / 2)) {
     micLevel = mic.getLevel();
     let vol = map(micLevel,0,0.8,0,0.02);
     //console.log(vol);
     this.roff[ind] -= vol;

     //音量控制草的颜色
     let r = map (micLevel,0,0.8,0,255);
     //console.log(r);
     let g = map (micLevel,0,0.8,10,0);
     let b = map (micLevel,0,0.8,0,10);
     stroke(7 - (r * 10), len * 2.5, 160, 255);

     rot = map(-sin(this.roff[ind]), -1, 1,
          -PI/4 * 0.25, PI/4 * 0.25);
    }

   strokeWeight(len * 2 * random(0.07, 0.11));

   rotate(rot);
   ellipse(1, 4, 5, -len);
   translate(0, -len);
   
   if (len > 20) {
     this.blade(len * this.seg[ind], ind);
    }
  }

}