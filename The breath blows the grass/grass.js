let grassy;
let mic;

function setup() {
  createCanvas(windowWidth, windowHeight);
  grass = new yard();
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  background(255);
  grass.update();
}
function yard() {
 this.grass = [];
  this.roff = [];
  this.rwave = [];
  this.size = [];
  this.seg = [];
  
  this.index = 0;
  this.population = 150;

  
  for (let x = 0; x < width; x += width / this.population) {
   this.index += 1;
   this.grass.push(x);
   this.roff.push((this.index * 0.065) + 0.015);
    this.rwave.push(0);
    this.size.push(random(35, 55));
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
     micLevel = mic.getLevel();
     let vol = map(micLevel,0,0.8,0,0.02);
     
    this.roff[ind] += vol;
     
    stroke(0, 255 - (len * 1.5), len * 1.5, 255);
     
    rot = map(noise(this.roff[ind]), 0, 1,
        -PI/4 * 0.75, PI/4 * 0.75);
    }
       //secound layer of grass
 if (ind / 2 != int(ind / 2)) {
   
      micLevel = mic.getLevel();
     let vol = map(micLevel,0,0.8,0,0.02);
     //console.log(vol);
      this.roff[ind] -= vol;


      stroke(255 - (len * 2.5), len * 2.5, 10, 255);
      rot = map(-sin(this.roff[ind]), -1, 1,
        -QUARTER_PI * 0.25, QUARTER_PI * 0.25);
    }

    strokeWeight(len * 2 * random(0.07, 0.11));

    rotate(rot);
    line(0, 0, 0, -len);
    translate(0, -len);
   
    if (len > 20) {
      this.blade(len * this.seg[ind], ind);
    }
  }

}