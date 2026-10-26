const fs = require('fs');
const https = require('https');
const path = require('path');

const assets = [
  '/assets/mushahid_hero_portrait_1790420656343-BEtq58uk.jpg',
  '/assets/pin2_new-Bapzdv2X.jpg',
  '/assets/biztop_full_web_1790852703068-OX1_x6MJ.jpg',
  '/assets/meer_royal_decor_full_web_1791025431587-BlbZ316I.jpg',
  '/assets/mba_academy_full_web_1790428843333-BXUJBQCo.jpg',
  '/assets/aqsa_ramzan_full_web_1790428861081-CTD-CVY0.jpg',
  '/assets/raheem_rehab_full_web_1790428879741-BExd8uyQ.jpg',
  '/assets/grand_pavilion_full_web_1790428751763-DuVQTIti.jpg',
  '/assets/quaid_tribute_full_web_1790428772996-C73Kpksu.jpg',
  '/assets/al_quran_full_web_1790428789923-BS_T3Com.jpg',
  '/assets/novara_store_full_web_1790428808211-_nEICDVa.jpg',
  '/assets/al_noor_textile_full_web_1790428824308-BtrpPObr.jpg',
  '/assets/claude_badge_dev_1790595243034-k1FiUWcS.jpg',
  '/assets/claude_badge_ai_1790595259009-D47gZfmH.jpg',
  '/assets/weversity_badge_1790595272249-BAKnyEpB.jpg',
  '/assets/real_estate_web_1791805973161-CDSq1L3W.jpg',
  '/assets/restaurant_web_1791805986623-BnqhWtbT.jpg',
  '/assets/fintech_web_1791806009333-zd1l9gR7.jpg',
  '/assets/cloud_api_web_1791806022294-DGRYx2a7.jpg',
  '/assets/project_ai_platform_1790256957586-DAWukGvV.jpg',
  '/assets/cv_portrait_new-DH-5lWAd.jpg',
  '/assets/pin1_new-vCGFNOG7.jpg'
];

const destDir = path.join(__dirname, 'downloaded_assets');
if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

const baseUrl = 'https://mushahid-hussain-web-developer-port-seven.vercel.app';

function downloadFile(urlPath) {
  return new Promise((resolve, reject) => {
    const filename = path.basename(urlPath);
    const dest = path.join(destDir, filename);
    const file = fs.createWriteStream(dest);
    
    https.get(`${baseUrl}${urlPath}`, res => {
      if (res.statusCode !== 200) {
        console.error(`Failed ${urlPath}: status ${res.statusCode}`);
        file.close();
        return resolve();
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          console.log(`Downloaded ${filename} (${fs.statSync(dest).size} bytes)`);
          resolve();
        });
      });
    }).on('error', err => {
      fs.unlink(dest, () => {});
      console.error(`Error downloading ${urlPath}:`, err.message);
      resolve();
    });
  });
}

async function run() {
  for (const a of assets) {
    await downloadFile(a);
  }
  console.log('All downloads done!');
}

run();
