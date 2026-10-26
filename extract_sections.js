const fs = require('fs');
const js = fs.readFileSync('site.js', 'utf8');

// Let's locate all data exports or variables
// Tt = profile
// Et = services
// Dt = skills
// Ot = projects
// kt = courses/badges
// At = testimonials
// Let's find experience data, why-choose-me data, etc.

const searchTerms = ['experience', 'education', 'courses', 'why-choose-me', 'testimonials', 'resume', 'certificates'];
for (const term of searchTerms) {
    let pos = 0;
    console.log(`\n=== SEARCH: ${term} ===`);
    let count = 0;
    while ((pos = js.indexOf(term, pos)) !== -1 && count < 5) {
        console.log(`Pos ${pos}: ` + js.substring(Math.max(0, pos - 60), Math.min(js.length, pos + 120)).replace(/\n/g, ' '));
        pos += term.length;
        count++;
    }
}
