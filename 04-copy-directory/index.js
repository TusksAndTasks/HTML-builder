const fs = require('fs');
const path = require('path');
const fsPromise = require('fs/promises');

let copyDir = path.resolve(__dirname + '/files-copy');
let filesDir = path.resolve(__dirname + '/files'); 

fs.mkdir(copyDir, { recursive: true }, (err) =>{
    if (err) throw err;
});
// АССИНХРОННАЯ ФУНКЦИЯ, ASYNC !!!!!!! CNTRL + F на 'Sync' выдаст одно совпадение с 'aSYNC'.
async function copyFiles(){
    try {
        const files = await fsPromise.readdir(filesDir, {withFileTypes: true});
        for (const file of files){
            if (file.isFile()){
              fs.copyFile(path.resolve(filesDir + '/' + file.name), path.resolve(copyDir + '/' + file.name), (err) =>{ 
                  if (err) throw err;
                });
            }
        } 
        const copiedFiles = await fsPromise.readdir(copyDir, {withFileTypes: true});
        for (const copiedFile of copiedFiles){
            fs.access(filesDir + '/' + copiedFile.name, fs.constants.F_OK, (err) => {
                if (err){
                    fs.rm(copyDir + '/' + copiedFile.name, { recursive: true }, (err) =>{
                    if (err) throw err;
                });}
              });
        }
    } catch (err){
        throw err;
    }
    };

copyFiles();    