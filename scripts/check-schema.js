const { loadEnvConfig } = require('@next/env');
loadEnvConfig('.');
const { sql } = require('@vercel/postgres');

async function checkSchema() {
  try {
    const result = await sql`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'site_settings';
    `;
    console.table(result.rows);
  } catch (err) {
    console.error(err);
  }
}

checkSchema();
