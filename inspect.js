const fs = require('fs');
const js = fs.readFileSync('site.js', 'utf8');

// Search for navigation items
const navMatch = js.match(/\[\{id:[^\]]*label:[^\]]*\}\]/g);
console.log('Nav match:', navMatch);

// Look around 'why-choose-me'
const idx = js.indexOf('why-choose-me');
if (idx !== -1) {
    console.log('Around why-choose-me:', js.substring(Math.max(0, idx - 300), idx + 300));
}
