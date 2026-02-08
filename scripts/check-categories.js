const { loadEnvConfig } = require('@next/env');
const { cwd } = require('process');
const { db } = require('@vercel/postgres');

loadEnvConfig(cwd());

async function checkCategories() {
  const client = await db.connect();
  try {
    const res = await client.sql`
      SELECT category, parent_category, COUNT(*) as count 
      FROM articles 
      WHERE status = 'published'
      GROUP BY category, parent_category 
      ORDER BY category ASC;
    `;
    console.log("Existing Categories in DB (Category | Parent | Count):");
    res.rows.forEach(row => console.log(`${row.category} | ${row.parent_category} : ${row.count}`));
  } catch (e) {
    console.error(e);
  } finally {
    client.end();
  }
}

checkCategories();
