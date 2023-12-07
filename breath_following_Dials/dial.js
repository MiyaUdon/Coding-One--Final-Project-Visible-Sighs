class Dial{
  constructor(x, y, size){
    this.x = x;
    this.y = y;
    this.size = size;
  }
  moveDial(){
    push();
    translate(this. x,this. y);
    let vol = map(micLevel,0,0.8,0,width);
    //console.log(vol);
    let angle = atan2(vol - this.y, width/2-this.y);
    rotate(angle);
    //console.log(angle);//-110-110
    rect(0,0,this.size/2,this.size);
    pop();
  }
}