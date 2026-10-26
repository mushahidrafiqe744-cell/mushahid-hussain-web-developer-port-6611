const fs = require('fs');
const js = fs.readFileSync('assets/index-ieVbqdqj.js', 'utf8');
const assetMatches = Array.from(new Set(js.match(/[`"']\/assets\/[^`"']+[`"']/g) || []));
console.log('Matches:', assetMatches);

