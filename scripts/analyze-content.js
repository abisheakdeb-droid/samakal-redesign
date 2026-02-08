const { loadEnvConfig } = require('@next/env');
const { cwd } = require('process');
const { db } = require('@vercel/postgres');

loadEnvConfig(cwd());

async function analyzeContent() {
  const targets = {
    'অর্থনীতি': 'Economics',
    'মতামত': 'Opinion',
    'Feature': 'Feature', // English key
    'ফিচার': 'Feature',   // Bangla key
    'Opinion': 'Opinion', // English key
    'Literature': 'Literature', // Old
    'সাহিত্য': 'Literature',    // Old key
    'সাহিত্য ও সংস্কৃতি': 'Lit & Culture' // New Target
  };
  const client = await db.connect();
  try {
    const res = await client.sql`
      SELECT category, COUNT(*) as count 
      FROM articles 
      GROUP BY category 
      ORDER BY count DESC
    `;
    
    console.log('--- DB Content Distribution ---');
    res.rows.forEach(r => {
      console.log(`${r.category}: ${r.count}`);
    });
    
    // Check total
    const total = await client.sql`SELECT COUNT(*) FROM articles`;
    console.log(`\nTotal Articles: ${total.rows[0].count}`);

  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

analyzeContent();
