const fs = require('fs');
const path = require('path');

let fileDirection = path.resolve(__dirname, 'text.txt');

let readingStream = fs.createReadStream(fileDirection, "utf-8");

let data = '';

readingStream.on('data', (part) => data += part);
readingStream.on('end',() => console.log(data));