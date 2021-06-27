const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const ndjson = require('ndjson');

const drawingsArray = [];

const fileName = ['anvil']

// let window={}

const ndjsonFileName = () => {
    return fileName[0]
}

fs.createReadStream(`./drawings/${ndjsonFileName()}.ndjson`).pipe(ndjson.parse()).on('data', function (obj) {
    console.log(obj)
    setTimeout(function() {drawingsArray.push(obj)}, 2000)
})

app.listen(port, () => {
   console.log(`Listening on port ${port}. Take a look!`) 
});

app.get('/app', (req, res) => {
    const index = Math.floor(Math.random() * drawingsArray.length);
    res.send(drawingsArray[index]);
});

app.use(express.static('public'))




