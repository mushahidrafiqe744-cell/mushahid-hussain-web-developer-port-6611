const fs = require('fs');
const js = fs.readFileSync('site.js', 'utf8');

// Let's inspect everything between Pos 234000 and Pos 266000
const dataBlock = js.substring(234000, 267000);
fs.writeFileSync('datablock.js', dataBlock, 'utf8');
console.log('Saved datablock.js, length:', dataBlock.length);
