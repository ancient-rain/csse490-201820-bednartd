const fs = require('fs');

let content;

console.log('start reading a file...');

try {
    content = fs.readFileSync('readFileSync.js', 'utf-8');
} catch (ex) {
    console.log('error happened during reading the file');
    console.log(ex);
}

console.log(content);

console.log('end of the file');