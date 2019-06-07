function Leaf(x, y){
  this.x = x;
  this.y = y;
  this.radius;
  this.centerColor;
  this.leafColor;


  this.assignColor = function(){
    if(random() < 0.5){
      this.centerColor = color((overallHue + random(-50, 50)) % 360, 223, 242); //blueish
      this.leafColor = color(overallHue, 50, 100);
    }
    else {
      this.centerColor = color((overallHue + random(-60, 70)) % 360, 50, 38);
      this.leafColor = color(overallHue, 102, 79);
    }

    this.radius = 20 + random(-10, 10);
  }

  this.show = function() {
    fill(this.centerColor);
    // strokeWeight(1);
    // stroke(255);
    noStroke();
    ellipse(this.x, this.y, this.radius, this.radius);
    fill(this.leafColor);
    push();
    translate(this.x , this.y);
    ellipse(this.radius*0.67, 0, this.radius*0.67, this.radius*0.67);
    ellipse(-this.radius*0.67, 0, this.radius*0.67, this.radius*0.67);
    ellipse(0, this.radius*0.67, this.radius*0.67, this.radius*0.67);
    ellipse(0, -this.radius*0.67, this.radius*0.67, this.radius*0.67);
    pop();
  }



}
