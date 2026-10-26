const fs = require('fs');
const code = fs.readFileSync('datablock.js', 'utf8');

// Find variable definitions like xx=
const varMatches = code.match(/([a-zA-Z0-9_$]+)=([\{\[][\s\S]*?)(?=,[a-zA-Z0-9_$]+=|\;)/g);
console.log('Var count:', varMatches ? varMatches.length : 0);

// Let's print the variable names and their types
const regex = /([a-zA-Z0-9_$]+)=([\{\[])/g;
let m;
while ((m = regex.exec(code)) !== null) {
    console.log(`Var: ${m[1]}, Type: ${m[2] === '{' ? 'Object' : 'Array'}, Pos: ${m.index}`);
}
