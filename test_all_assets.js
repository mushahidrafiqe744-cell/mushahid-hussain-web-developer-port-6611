const http = require('http');
const fs = require('fs');
const server = require('./local-server.js');

setTimeout(async () => {
  const images = fs.readdirSync('downloaded_assets');
  let errors = 0;
  for (const img of images) {
    await new Promise((resolve) => {
      http.get(`http://localhost:3456/assets/${img}`, (res) => {
        if (res.statusCode !== 200) {
          console.error(`Failed: ${img} (${res.statusCode})`);
          errors++;
        }
        resolve();
      });
    });
  }
  console.log(`Checked ${images.length} images. Errors: ${errors}`);
  process.exit(errors > 0 ? 1 : 0);
}, 500);
