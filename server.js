const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const ndjson = require('ndjson');

const drawingsArray = [];

// const fileNames = ['anvil', 'apple', 'arm', 'asparagus', 'axe']

// const ndjsonFileName = () => {
//     return fileNames[Math.floor(Math.random() * fileNames.length)]
// }

fs.createReadStream("./drawings/axe.ndjson").pipe(ndjson.parse()).on('data', function (obj) {
    console.log(obj)
    drawingsArray.push(obj);  
})

app.listen(port, () => {
   console.log(`Listening on port ${port}. Take a look!`) 
});

app.get('/app', (req, res) => {
    const index = Math.floor(Math.random() * drawingsArray.length);
    res.send(drawingsArray[index]);
});

app.use(express.static('public'))



