// Coding Rainbow
// Daniel Shiffman
// http://patreon.com/codingtrain
// Code for: https://youtu.be/fcdNSZ9IzJM

var tree = [];
var leaves = [];

var count = 0;
var c = 15;
var radius = 15;
var angle = 0;
var strWgh;

var overallHue;
var favAngle;
var seed;
var seedStr;
var inc = 0.01;

var txtSize;

let downloadButton;
let nameInput;
let genSeed;
let genRandom;

var cnv;


function setup() {
  cnv = createCanvas(800, 800, P2D);
  cnv.id("myCanvas");
  cnv.parent('sketchDiv');
  colorMode(HSB);
  angleMode(RADIANS);

  nameInput = createInput();
  nameInput.parent("nameInputDiv")
  nameInput.class("form-control form-control-sm");

  if(nameInput.value() != ""){
    seedStr = nameInput.value();
    seed = hashCode(seedStr);
    randomSeed(seed);
  }

  makeTree();
}

function makeTreeSeed(){

  clear();
  leaves = [];
  tree = [];

  if(nameInput.value() != ""){
    seedStr = nameInput.value();
    seed = hashCode(str(seedStr));
    randomSeed(seed);


    overallHue = random(0, 360);
    favAngle = random(137.5, 137.7);
    strWgh = 4 + random(-2, 10);

    background(overallHue, 5, 100);

    txtSize = measureText(seedStr, 50);

    push();
    translate(width/2, height/2);
    rotate(angle+=0.005);
    for (var i = 0; i < 2000+3*width; i++) {
      drawPhylo(i);
    }
    pop();

    var a = createVector(width / 2, height);
    var b = createVector(width / 2, 3*height/4);
    var root = new Branch(a, b);

    tree[0] = root;

    for(var i = 0;i < 8;i++)
      generate();

    for (var i = 0; i < tree.length; i++) {
      tree[i].show();
    }

    for (var i = 0; i < leaves.length; i++) {
      leaves[i].show();
    }

    rect(32, height - txtSize.height - 10, txtSize.width + 15, txtSize.height - 20);
    fill(overallHue, 200, 20);
    textSize(50);
    textFont("Avenir");
    text(seedStr, 40, height - 40);

    let jrSize = measureText("by jrascon_", 20);
    fill(0);
    rect(width - jrSize.width - 31 , height - jrSize.height - 10, jrSize.width + 5, jrSize.height - 10);
    fill(255);
    textSize(20);
    textFont("Avenir");
    text("by jrascon_", width - jrSize.width - 30, height - jrSize.height + 6);
  }
  else {
    makeTree();
  }

}

function makeTree(){

  clear();
  leaves = [];
  tree = [];

  overallHue = random(0, 360);
  favAngle = random(137.5, 137.7);
  strWgh = 4 + random(-2, 10);

  background(overallHue, 5, 100);

  push();
  translate(width/2, height/2);
  rotate(angle+=0.005);
  for (var i = 0; i < 2000+3*width; i++) {
    drawPhylo(i);
  }
  pop();

  var a = createVector(width / 2, height);
  var b = createVector(width / 2, 3*height/4);
  var root = new Branch(a, b);

  tree[0] = root;

  for(var i = 0;i < 8;i++)
    generate();

  for (var i = 0; i < tree.length; i++) {
    tree[i].show();
  }

  for (var i = 0; i < leaves.length; i++) {
    leaves[i].show();
  }

  let jrSize = measureText("by jrascon_", 15);
  fill(0);
  rect(width - jrSize.width - 31 , height - jrSize.height - 10, jrSize.width + 5, jrSize.height);
  fill(255);
  textSize(15);
  textFont("Avenir");
  text("by jrascon_", width - jrSize.width - 30, height - jrSize.height + 6);
}

function generate() {
  for (var i = tree.length - 1; i >= 0; i--) {
    if (!tree[i].finished) {
      tree.push(tree[i].branchA());
      tree.push(tree[i].branchB());
    }

    tree[i].finished = true;

  }
  count++;

  if (count % 4 === 0 && count != 0) {
    for (var i = 0; i < tree.length; i++) {
      if (!tree[i].finished) {
        var leaf = new Leaf(tree[i].end.x, tree[i].end.y);
				leaf.assignColor();
        leaves.push(leaf);
        tree[i].growFactor = 4;
      }else
			  tree[i].growFactor = 2;
    }
  }
}

function hashCode(str) {
  return str.split('').reduce((prevHash, currVal) =>
    (((prevHash << 5) - prevHash) + currVal.charCodeAt(0))|0, 5);
}

function measureText(pText, pFontSize, pStyle) {
    var lDiv = document.createElement('div');

    document.body.appendChild(lDiv);

    if (pStyle != null) {
        lDiv.style = pStyle;
    }
    lDiv.style.fontSize = "" + pFontSize + "px";
    lDiv.style.fontFamily = "Avenir";
    lDiv.style.position = "absolute";
    lDiv.style.left = -1000;
    lDiv.style.top = -1000;

    lDiv.innerHTML = pText;

    var lResult = {
        width: lDiv.clientWidth,
        height: lDiv.clientHeight
    };

    document.body.removeChild(lDiv);
    lDiv = null;

    return lResult;
}

function drawPhylo(n){

  push();
  translate(-width/2, -height/2);
  var a = n * favAngle; //137.5

  var r = c * sqrt(n);

  var x = r * cos(a) + width/2;
  var y = r * sin(a) + height/2;

  // var feather = 10*Math.E*Math.log(n);
  var feather = 8*sqrt(n);
  // var feather = .02 ^ .1*n;

  stroke(overallHue + .01*n, 20 + .01*feather, 255 - feather, 9); //0.009*n // 0.25*n
  strokeWeight(strWgh);
  // noStroke();

  fill(overallHue + .01*n, 20 + .01*feather, 255 - feather, 9);
  ellipse(x, y, radius, radius);
  pop();
}

function download(){
  save("flower_"+int(overallHue)+"_"+seedStr);
}

// function draw() {





  // if(nameInput.value() != ""){

  // }


  // noLoop();


// }
