function Branch(begin, end) {
  this.begin = begin;
  this.end = end;
  this.finished = false;
  this.growFactor = 0.6;
  this.angle = PI / 6;
  this.str = 10 + int(width * 0.003);

  this.show = function() {
    strokeWeight(this.str);
    stroke(109, 85, 39);
    line(this.begin.x, this.begin.y, this.end.x, this.end.y);
  }

  this.branchA = function() {
    var dir = p5.Vector.sub(this.end, this.begin);
    dir.rotate(this.angle);
    dir.mult(this.growFactor);
    dir.mult(random(0.7, 1));
    var newEnd = p5.Vector.add(this.end, dir);
    var b = new Branch(this.end, newEnd);

    return b;
  }

  this.branchB = function() {
    var dir = p5.Vector.sub(this.end, this.begin);
    dir.rotate(-this.angle);
    dir.mult(this.growFactor);
    dir.mult(random(0.7, 1));
    var newEnd = p5.Vector.add(this.end, dir);
    var b = new Branch(this.end, newEnd);
    return b;
  }
}
