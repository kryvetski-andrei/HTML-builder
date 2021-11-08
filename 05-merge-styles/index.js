const path = require('path');
const fs = require('fs');

fs.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), '', (error) => null);
fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true }, (error, data) => {
  error ?
    console.log(error) :
    data.forEach((file) => {
      file.isFile() && path.extname(file.name) === '.css' ?
        fs.readFile(path.join(__dirname, 'styles', file.name),  (error, data) => {
          error ?
            console.log(error) :
            fs.appendFile(path.join(__dirname, 'project-dist', 'bundle.css'), `${data}`, (error) => {
              error ? console.log(error) : null;
            });
        }) : null;
    })
}) 