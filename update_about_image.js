const fs = require('fs');

function updateFile(filePath) {
  let js = fs.readFileSync(filePath, 'utf8');
  const target = "Lt=`./assets/pin1_new-vCGFNOG7.jpg`,Rt=`./assets/pin2_new-Bapzdv2X.jpg`";
  const replacement = "Lt=`./assets/mushahid_about_phoenix_gold.jpg`,Rt=`./assets/mushahid_about_phoenix_gold.jpg`";
  
  if (js.includes(target)) {
    js = js.replace(target, replacement);
    fs.writeFileSync(filePath, js, 'utf8');
    console.log(`Updated ${filePath} successfully!`);
  } else {
    // Check if it has /assets/
    const target2 = "Lt=`/assets/pin1_new-vCGFNOG7.jpg`,Rt=`/assets/pin2_new-Bapzdv2X.jpg`";
    if (js.includes(target2)) {
      js = js.replace(target2, replacement);
      fs.writeFileSync(filePath, js, 'utf8');
      console.log(`Updated ${filePath} (target2) successfully!`);
    } else {
      console.log(`Target not found in ${filePath}`);
    }
  }
}

updateFile('assets/index-ieVbqdqj.js');
if (fs.existsSync('site.js')) {
  updateFile('site.js');
}
