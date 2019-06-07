
var c = 12;
var radius = 14;



function setup(){
  createCanvas(800, 800);
  angleMode(DEGREES);
  colorMode(HSB);
  background(240);
  for (var i = 0; i < 1000; i++) {
    drawPhylo(i);
  }
}

function drawPhylo(n){

  var a = n * 137.5;
  var r = c * sqrt(n);

  var x = r * cos(a) + width/2;
  var y = r * sin(a) + height/2;

  noStroke();

  fill(100 + n % 200, 100, 100);
  ellipse(x, y, radius, radius);

}
