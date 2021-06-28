const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const ndjson = require('ndjson');

const drawingsArray = [];

fs.createReadStream('./drawings/headphones.ndjson').pipe(ndjson.parse()).on('data', function (obj) {
    console.log(obj)
    drawingsArray.push(obj)
})

app.listen(port, () => {
   console.log(`Listening on port ${port}. Take a look!`) 
});

app.get('/app', (req, res) => {
    const index = Math.floor(Math.random() * drawingsArray.length);
    setTimeout(function() {res.send(drawingsArray[index])}, 900);
});

app.use(express.static('public'))




