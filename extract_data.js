const fs = require('fs');
const js = fs.readFileSync('site.js', 'utf8');

// The data is located from `Tt={name:`
const startIdx = js.indexOf('Tt={name:');
// Find where At finishes
const atIdx = js.indexOf('At=[', startIdx);
// Find end of At
let depth = 0;
let endAtIdx = atIdx;
for (let i = atIdx + 3; i < js.length; i++) {
  if (js[i] === '[') depth++;
  else if (js[i] === ']') {
    if (depth === 0) {
      endAtIdx = i + 1;
      break;
    }
    depth--;
  }
}

console.log('Start Tt:', startIdx, 'Start At:', atIdx, 'End At:', endAtIdx);

// Let's create an evaluation environment where image variables point to local paths!
const assetMapping = `
const at = '/assets/mushahid_hero_portrait_1790420656343-BEtq58uk.jpg';
const ot = '/assets/pin2_new-Bapzdv2X.jpg';
const st = '/assets/biztop_full_web_1790852703068-OX1_x6MJ.jpg';
const ct = '/assets/meer_royal_decor_full_web_1791025431587-BlbZ316I.jpg';
const lt = '/assets/mba_academy_full_web_1790428843333-BXUJBQCo.jpg';
const ut = '/assets/aqsa_ramzan_full_web_1790428861081-CTD-CVY0.jpg';
const dt = '/assets/raheem_rehab_full_web_1790428879741-BExd8uyQ.jpg';
const ft = '/assets/grand_pavilion_full_web_1790428751763-DuVQTIti.jpg';
const pt = '/assets/quaid_tribute_full_web_1790428772996-C73Kpksu.jpg';
const mt = '/assets/al_quran_full_web_1790428789923-BS_T3Com.jpg';
const ht = '/assets/novara_store_full_web_1790428808211-_nEICDVa.jpg';
const gt = '/assets/al_noor_textile_full_web_1790428824308-BtrpPObr.jpg';
const _t = '/assets/claude_badge_dev_1790595243034-k1FiUWcS.jpg';
const vt = '/assets/claude_badge_ai_1790595259009-D47gZfmH.jpg';
const yt = '/assets/weversity_badge_1790595272249-BAKnyEpB.jpg';
const bt = '/assets/real_estate_web_1791805973161-CDSq1L3W.jpg';
const xt = '/assets/restaurant_web_1791805986623-BnqhWtbT.jpg';
const St = '/assets/fintech_web_1791806009333-zd1l9gR7.jpg';
const Ct = '/assets/cloud_api_web_1791806022294-DGRYx2a7.jpg';
const wt = '/assets/project_ai_platform_1790256957586-DAWukGvV.jpg';
const Ft = '/assets/cv_portrait_new-DH-5lWAd.jpg';
const Lt = '/assets/pin1_new-vCGFNOG7.jpg';
const Rt = '/assets/pin2_new-Bapzdv2X.jpg';
`;

const rawDataCode = js.substring(startIdx, endAtIdx);

const evalCode = `
${assetMapping}
let ${rawDataCode};
module.exports = {
  profile: Tt,
  services: Et,
  skills: Dt,
  projects: Ot,
  courses: kt,
  testimonials: At
};
`;

fs.writeFileSync('temp_data_eval.js', evalCode, 'utf8');

try {
  const data = require('./temp_data_eval.js');
  console.log('Successfully evaluated data!');
  console.log('Profile:', data.profile.name);
  console.log('Services count:', data.services.length);
  console.log('Skills categories:', data.skills.length);
  console.log('Projects count:', data.projects.length);
  console.log('Courses count:', data.courses.length);
  console.log('Testimonials count:', data.testimonials.length);
  
  fs.writeFileSync('extracted_portfolio_data.json', JSON.stringify(data, null, 2), 'utf8');
  console.log('Saved extracted_portfolio_data.json!');
} catch (e) {
  console.error('Eval error:', e);
}
