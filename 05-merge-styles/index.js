const fs = require('fs');
const path = require('path');
const fsPromise = require('fs/promises');

let fileDirection = path.resolve(__dirname + '/project-dist/bundle.css');
let stylesFolder = path.resolve(__dirname + '/styles');

fs.writeFile(
    fileDirection,
    '',
    (err) => {
      if (err) throw err
  })

  async function createBundle(){
    try {
        const files = await fsPromise.readdir(stylesFolder, {withFileTypes: true});
        for (const file of files){
            if (file.isFile() && path.extname(stylesFolder + file.name) === '.css'){
             fs.readFile(stylesFolder + '/' + file.name, "utf-8", (err, docData) => {
                 if (err) throw err;
                 fs.appendFile(
                    fileDirection,
                    docData,
                    err => {
                    if (err) throw err
                })
             })    
            }
        }
    } catch (err){
        throw err;
    }
    }

createBundle();   