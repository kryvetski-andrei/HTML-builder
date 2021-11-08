const path = require('path');
const fs = require('fs');

fs.mkdir(path.join(__dirname, 'project-dist'), () => {});
fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), () => {});

fs.readFile(path.join(__dirname, 'template.html'), 'utf-8', (error, template) => {
  fs.readdir(path.join(__dirname, 'components'), { withFileTypes: true }, (error, data) => {
    let temp = template;

    data.forEach((component) => {
      if (component.isFile() && path.extname(component.name) === '.html') {
        fs.readFile(
          path.join(__dirname, 'components', `${component.name}`),
          'utf-8',
          (error, componentInner) => {

          let componentName = component.name.split('.')[0];
          temp = temp.replaceAll(`{{${componentName}}}`, componentInner);
          
          fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), temp, () => {})
        }) 
      }
    }) 
  })
})

fs.readdir(path.join(__dirname, 'styles'),  { withFileTypes: true }, (error, files) => {
  fs.writeFile(path.join(__dirname, 'project-dist', 'style.css'), '', () => {})
  
  files.forEach((file) => {
    file.isFile() && path.extname(file.name) === '.css' ?
      fs.readFile(path.join(__dirname, 'styles', file.name), 'utf-8', (error, data) => {
        fs.appendFile(path.join(__dirname, 'project-dist', 'style.css'), data, () => {});
      }) : null;
  })
}) 

fs.readdir(path.join(__dirname, 'assets'), (error, data) => {
  data.forEach((folder) => {
    fs.mkdir(path.join(__dirname, 'project-dist', 'assets', folder), () => {});
    
    fs.readdir(path.join(__dirname, 'assets', folder), (error, files) => {
      files.forEach((file) => {
        fs.readFile(path.join(__dirname, 'assets', folder, file), (error, readedFile) => {
          fs.writeFile(
            path.join(__dirname, 'project-dist', 'assets', folder, file),
            readedFile, 
            () => {}
          )
        })
      })
    })
  })
});
