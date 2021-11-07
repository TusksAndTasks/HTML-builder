// ПРИ КРОСС-ЧЕКЕ И ДОБАВЛЕНИИ ФАЙЛОВ ИЗ TEST-FILES НЕ ЗАБУДЬТЕ ДОБВАТЬ {{about}} В template.html!!!!!!!!
const fs = require('fs');
const path = require('path');
const fsPromise = require('fs/promises');

let data = '';
let copyDir = path.resolve(__dirname + '/project-dist/assets');
let filesDir = path.resolve(__dirname + '/assets'); 
let fileDirection = path.resolve(__dirname + '/project-dist/style.css');
let stylesFolder = path.resolve(__dirname + '/styles');


fs.mkdir(__dirname + '/' + 'project-dist', { recursive: true }, (err) =>{
    if (err) throw err;
});

fs.mkdir(copyDir, { recursive: true }, (err) =>{
    if (err) throw err;
});


fs.readFile(__dirname +'/template.html', 'utf-8', (err, docData) => {
    if (err) throw err;
    data = docData.toString()
})

fs.writeFile(
    fileDirection,
    '',
    (err) => {
      if (err) throw err
  })


let htmlFolder = path.resolve(__dirname + '/components');

console.log(data);
// АССИНХРОННАЯ ФУНКЦИЯ, ASYNC !!!!!!! CNTRL + F на 'Sync' выдаст  совпадение с 'aSYNC'.
async function writeHtml(){
    try{
     const htmlFiles = await fsPromise.readdir(htmlFolder, {withFileTypes: true});
     const templateData = await fsPromise.readFile(__dirname + '/' + 'template.html');
     let htmlData = templateData.toString();
     let replacer = '';
     for (const htmlFile of htmlFiles){
        if (htmlFile.isFile() && path.extname(htmlFolder + htmlFile.name) === '.html'){
            replacer = await fsPromise.readFile(htmlFolder + '/' + htmlFile.name);
            htmlData = htmlData.replace(`{{${path.basename(htmlFile.name, '.html')}}}`, replacer.toString());
        }
    }
    fsPromise.writeFile(__dirname + '/project-dist/index.html', htmlData);
    }

    catch (err){
        throw err;
    }
}
// АССИНХРОННАЯ ФУНКЦИЯ, ASYNC !!!!!!! CNTRL + F на 'Sync' выдаст совпадение с 'aSYNC'.
async function copyFiles(){
    try {
        const folders = await fsPromise.readdir(filesDir, {withFileTypes: true});
        for (const folder of folders){
         fs.mkdir(copyDir + '/' + folder.name, { recursive: true }, (err) =>{
             if (err) throw err;
});   
        const files = await fsPromise.readdir(filesDir + '/' + folder.name, {withFileTypes: true});
        for (const file of files){
            if (file.isFile()){
              fsPromise.copyFile(path.resolve(filesDir + '/' + folder.name + '/' + file.name), path.resolve(copyDir + '/' + folder.name + '/' + file.name));
            }
        } 
    }
        const copiedFolders = await fsPromise.readdir(copyDir, {withFileTypes: true});
        for (const copiedFolder of copiedFolders){
            fs.access(filesDir + '/' + copiedFolder.name, fs.constants.F_OK, (err) => {
                if (err){
                    fsPromise.rm(copyDir + '/' + copiedFolder.name, { recursive: true });}
              });
        }
            
        for (const copiedFolder of copiedFolders){
        const copiedFiles = await fsPromise.readdir(copyDir + '/' + copiedFolder.name, {withFileTypes: true});
        for (const copiedFile of copiedFiles){
            fs.access(filesDir + '/' + copiedFolder.name +'/' + copiedFile.name, fs.constants.F_OK, (err) => {
                if (err){
                    fsPromise.rm(copyDir + '/' + copiedFolder.name + '/' + copiedFile.name, { recursive: true });}
              });
        }
    }
 } catch (err){
        throw err;
    }
    };

// АССИНХРОННАЯ ФУНКЦИЯ, ASYNC !!!!!!! CNTRL + F на 'Sync' выдаст совпадение с 'aSYNC'.
    async function mergeStyles(){
        try {
            const styleFiles = await fsPromise.readdir(stylesFolder, {withFileTypes: true});
            for (const styleFile of styleFiles){
                if (styleFile.isFile() && path.extname(stylesFolder + styleFile.name) === '.css'){
                 fs.readFile(stylesFolder + '/' + styleFile.name, "utf-8", (err, docData) => {
                     if (err) throw err;
                     fsPromise.appendFile(
                        fileDirection,
                        docData)
                 })    
                }
            }
        } catch (err){
            throw err;
        }
        }
    

writeHtml();
copyFiles();
mergeStyles();