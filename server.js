const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const ndjson = require('ndjson');

const drawings = [];

fs.createReadStream('./drawings/popsicle.ndjson').pipe(ndjson.parse()).on('data', function (obj) {
    //obj is a javascript object
    // console.log(obj)
    drawings.push(obj);
})

app.listen(port, () => {
   console.log(`Listening on port ${port}. Take a look!`) 
});

app.get('/rainbow', (req, res) => {
    const index = Math.floor(Math.random() * drawings.length);
    res.send(drawings[index]);
});

app.use(express.static('public'))

