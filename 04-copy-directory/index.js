const path = require('path');
const fs = require('fs');
const folderPath = path.join(__dirname, 'files');

fs.mkdir(path.join(__dirname, 'files-copy'), () => {});

fs.readdir(folderPath, (error, data) => {
  error ? 
    console.log(error) :
    data.forEach(file => {
      fs.readFile(path.join(folderPath, file),  (error, data) => {
        error ?
          console.log(error) :
          fs.writeFile(path.join(__dirname, 'files-copy', file), `${data}`, (error) => {
            error ? console.log(error) : null;
          });
      })
    })
});

