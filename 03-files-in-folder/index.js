const fsPromise = require('fs/promises');
const fs = require('fs');
const path = require('path');

const filesDirectory = path.resolve(__dirname + '/secret-folder');

// АССИНХРОННАЯ ФУНКЦИЯ, ASYNC !!!!!!! CNTRL + F на 'Sync' выдаст одно совпадение с 'aSYNC'.
async function listFiles(){
try {
    const files = await fsPromise.readdir(filesDirectory, {withFileTypes: true});
    for (const file of files){
        if (file.isFile()){
            fs.stat(path.resolve(filesDirectory + '/' + file.name), (err, stats) => {
                if (err) throw err;
                let extensionName = path.extname(filesDirectory + file.name);
                let fileName = path.basename(file.name, extensionName);
                let size = `${stats.size / 1024} KB`;
                // для сравнения размеров проверять свойства файлов, винда в папках размер округляет всегда в большую сторону.
                console.log(`${fileName} - ${extensionName} - ${size}`)
            })
        }
    }
} catch (err){
    throw err;
}
}

listFiles()