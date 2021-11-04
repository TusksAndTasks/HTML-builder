const fs = require('fs');
const path = require('path');

const stdout = process.stdout;
const stdin = process.stdin;

let fileDirection = path.resolve(__dirname, 'text.txt');

fs.writeFile(
    fileDirection,
    '',
    (err) => {
      if (err) throw err
  })

stdout.write('Пожалуйста, введите текст\n');

function writeText(data) {
   let arr = data.toString().split((/[\s, \r]+/)); 
   let exitMark = arr.find(exitMark => exitMark === 'exit');
   if(exitMark){
       process.exit();
   }
   else if (!exitMark){
    fs.appendFile(
        fileDirection,
        data,
        err => {
        if (err) throw err
    })
   }
}

stdin.on('data', (data) => writeText(data));
process.on('exit', () => stdout.write('Всего хорошего!'));
process.on('SIGINT', () => process.exit());