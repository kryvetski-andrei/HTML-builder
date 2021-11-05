const path = require('path');
const fs = require('fs')
const filePath = path.join(__dirname, 'text.txt');
const readStream = fs.createReadStream(filePath);

readStream.on('data', (chunk) => {
  console.log(chunk.toString())
})

const fs = require("fs");

fs.readFile("./test.txt", 'utf-8', (error, data) => {
  console.log(data, 'readerd data')

  fs.mkdirSync("./files", () => {});

  fs.writeFileSync("./files/test2.txt", `${data}New text!`, (error) => {
    console.log(data, 'writed data')
    error ? console.log(error) : null;
  });

});