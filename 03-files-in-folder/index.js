const path = require('path');
const fs = require('fs');
const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, { withFileTypes: true }, (error, data) => {
  error ? 
    console.log(error) :
    data.forEach((file) => {
      if (file.isFile()) {
        fs.stat(path.join(folderPath, file.name), (error, stats) => {
          error ? 
            console.log(error) : 
            console.log(`${file.name.split('.')[0]} - ${path.extname(file.name)} - ${stats.size}`);
        });
      };
    });
});
