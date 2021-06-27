function setup() {
  createCanvas(400, 400);

  loadJSON('/app', gotPopsicle);
}

function draw() {
  background('rgba(255,0,255,0.1)');
}

function gotPopsicle(data) {
  background('rgba(255,0,255,0.1)');
  let drawing = data.drawing;
  console.log(drawing)
  
  //Each path is 2 arrays (the x and y values for each drawing)
  //For demo purposes, set the form field type as password, so no one can see what you're typing!!!
  //You can do a simple onClick even to call gotPopsicle when submit is pressed, and take the value of the input as the first argument in server.js's fs call
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
  loadJSON('/app', gotPopsicle)
}
