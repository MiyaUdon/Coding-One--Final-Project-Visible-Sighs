let mic;
let micLevel;
let minYchange = 10;
let maxYchange = 60;
let layers = 5;
let rotStripe = 90;
let lines = true;
let alph = 255;
let filling = true;
let colorLines = true;
let extraBlackAlph = 255;
let r, g, b;
let graphicGenerated = false;

function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  micLevel = mic.getLevel();
  let end = height / 2 + 500;

  for (let i = 0; i < layers; i++) {
    let y1 = (i == 0) ? -height / 2 - 300 : -height / 2 + (height / layers) * i;
    let rotThisStripe = micLevel * 100;

    while (y1 < end && -maxYchange < minYchange) {
      y1 += minYchange;
      r = random(40);
      g = random(40);
      b = random(200);

      if (filling) {
        fill(r, g, b, alph);
      } else {
        noFill();
      }

      if (colorLines) {
        stroke(r, g, b, alph);
      }

      push();
      translate(width / 2, height / 2);
      rotThisStripe += rotStripe;
      rotate(rotThisStripe);
      let xStart = -width / 2;

      beginShape();
      curveVertex(300, height / 2 + 500);
      for (let j = 1; j <= 4; j++) {
        curveVertex(xStart + (width / 5) * j, y1 + minYchange * j);
      }
      curveVertex(width / 2 + 300, y1 + minYchange * 5);
      curveVertex(width / 2 + 300, height / 2 + 500);
      endShape(CLOSE);

      pop();
    }
  }
}

function keyTyped() {
  if (key === "s") {
    save("myCanvas.jpg");
  }
}
