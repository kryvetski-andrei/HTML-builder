const path = require('path');
const fs = require('fs');


fs.mkdir(path.join(__dirname, 'project-dist'), () => {});
fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), () => {});


fs.readFile(path.join(__dirname, 'template.html'), 'utf-8', (error, template) => {
  if (error) {
    console.log(error)
  } else {
    fs.readdir(path.join(__dirname, 'components'), { withFileTypes: true }, (error, data) => {
      if (error) {
        console.log(error)
      } else {
        let temp = template
        data.forEach((component) => {
          if (component.isFile() && path.extname(component.name) === '.html') {
            fs.readFile(path.join(__dirname, 'components', `${component.name}`), 'utf-8', (error, componentInner) => {
              if (error) {
                console.log(error)
              } else {
                let componentName = component.name.split('.')[0];
                temp = temp.replace(`{{${componentName}}}`, componentInner)
                
                fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), temp, (error) => {
                  if (error) {
                    console.log(error)
                  }
                })
              }
            }) 
          }
        }) 
      }
    })
  }
})


fs.readdir(path.join(__dirname, 'styles'),  { withFileTypes: true }, (error, files) => {
  error ?
    console.log(error) :
    // files.forEach((file) => {
    //   if (file.isFile() && path.extname(file.name) === '.css') {
    //     const readStream = fs.createReadStream(path.join(__dirname, 'styles', file.name))
    //     const writeStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'))
    //     readStream.on('data', (chunk) => {
    //       writeStream.write(chunk);
    //     })
    //   }
    // })
    fs.writeFile(path.join(__dirname, 'project-dist', 'style.css'), '', (error) => null)
    files.forEach((file) => {
      file.isFile() && path.extname(file.name) === '.css' ?
        fs.readFile(path.join(__dirname, 'styles', file.name), 'utf-8', (error, data) => {
          error ?
            console.log(error) :

            fs.appendFile(path.join(__dirname, 'project-dist', 'style.css'), data, (error) => {
              error ? console.log(error) : null;
            });
        }) : null;
    })
}) 

// var files = ['a.txt','b.txt','c.txt'];
// const readStream = fs.createReadStream('')
// var outStream = fs.createWriteStream('outfile.txt');
// for (file in files)
//    fs.createReadStream(file).pipe(outStream);

fs.readdir(path.join(__dirname, 'assets'), (error, data) => {
  error ? 
    console.log(error) :
    data.forEach((folder) => {
      fs.mkdir(path.join(__dirname, 'project-dist', 'assets', folder), () => {});
      fs.readdir(path.join(__dirname, 'assets', folder), (error, files) => {
        error ?
          console.log(error) :
          console.log(files)
          files.forEach((file) => {
            fs.readFile(path.join(__dirname, 'assets', folder, file), (error, filee) => {
            error ? 
              console.log(error) :
              console.log('nothing')
              fs.writeFile(path.join(__dirname, 'project-dist', 'assets', folder, file), filee, (error) => {
                error ? console.log(error) : console.log(file, 'file');
              })
            })
          })
          // console.log(file)
          
      })
    })
});



//посмоьреть что сделать можноб с этим блоком, т.к. изза него получается так, что 
//в сбилженом файле style.css появляется ошибка, но если его удалить, то всё в порядке 




// fs.readFile(path.join(__dirname, 'template.html'), 'utf8',  (error, template) => {
//   error ?
//     console.log(error) :

//     fs.readdir(path.join(__dirname, 'components'), { withFileTypes: true }, (error, data) => {
//       error ? 
//         console.log(error) :
//         data.forEach((file) => {
//           file.isFile() && path.extname(file.name) === '.html' ?
//             fs.readFile(path.join(__dirname, 'components', file.name), 'utf8', (error, data) => {
//               if (error) {
//                 console.log(error)
//               } else {
//                 let fileName = file.name.split('.')[0];
//                 const result = template.replace(fileName, 'OLOLOLO')
//                 console.log(result)
//               }
//             }) : null;
//         })
//     })
// });





// function enterTemplate(component, componentName, place) {
//   data.replace(/string to be replaced/g, 'replacement');
//   return 
// }