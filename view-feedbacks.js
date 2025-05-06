// view-feedbacks.js
const Database = require('better-sqlite3');
const db = new Database('venille.db');

const feedbacks = db.prepare(`
  SELECT f.id, f.jid, u.wa_name, f.response1, f.response2, f.submitted_at
  FROM feedback f
  LEFT JOIN users u ON f.jid = u.jid
  ORDER BY f.submitted_at DESC
`).all();

if (!feedbacks.length) {
  console.log('No feedbacks found.');
} else {
  console.log(`\n=== Venille Feedbacks (${feedbacks.length}) ===\n`);
  for (const fb of feedbacks) {
    console.log(`🆔 ${fb.id}`);
    console.log(`👤 JID: ${fb.jid}`);
    console.log(`📛 Name: ${fb.wa_name || 'Unknown'}`);
    console.log(`📍 Response 1: ${fb.response1}`);
    console.log(`📝 Response 2: ${fb.response2}`);
    console.log(`🕒 Submitted At: ${fb.submitted_at}`);
    console.log('───────────────────────────────');
  }
}
const fs = require('fs');
const csvRows = [
  ['ID', 'JID', 'Name', 'Response 1', 'Response 2', 'Submitted At']
];

feedbacks.forEach(fb => {
  csvRows.push([fb.id, fb.jid, fb.wa_name || '', fb.response1, fb.response2, fb.submitted_at]);
});

fs.writeFileSync('feedbacks.csv', csvRows.map(r => r.join(',')).join('\n'));
console.log('✅ Exported to feedbacks.csv');
