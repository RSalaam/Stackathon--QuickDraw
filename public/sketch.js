function setup() {
  createCanvas(400, 400);

  loadJSON('/rainbow', gotPopsicle);
}

function draw() {
  background('rgba(255,0,255,0.1)');
}

function gotPopsicle(data) {
  background('rgba(255,0,255,0.1)');
  let drawing = data.drawing;
  console.log(drawing)
  
  for(let path of drawing) {
    noFill();
    stroke(0)
    strokeWeight(7);
    beginShape();
    for(let i = 0; i < path[0].length; i++) {
      let x = path[0][i];
      let y = path[1][i];
      vertex(x, y);
    }
    endShape()
  }
  loadJSON('/rainbow', gotPopsicle)
}
