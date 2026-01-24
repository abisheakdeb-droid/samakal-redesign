import { sql as vercelSql, createClient } from "@vercel/postgres";
import type { QueryResultRow, QueryResult } from "@vercel/postgres";

/**
 * A robust wrapper around Vercel Postgres `sql` that handles both pooled and direct connection strings.
 * 
 * The default `sql` export from @vercel/postgres expects a pooled connection string (e.g. for serverless).
 * If a direct connection string is provided (common in local dev or migrations), it throws a 'VercelPostgresError'.
 * This wrapper catches that specific error and falls back to `createClient` which supports direct connections.
 */
export async function sql<O extends QueryResultRow>(
  strings: TemplateStringsArray, 
  ...values: any[]
): Promise<QueryResult<O>> {
  try {
    // Attempt to use the standard pooled query
    return await vercelSql<O>(strings, ...values);
  } catch (error: any) {
    // Check if the error is due to an invalid connection string format (Direct vs Pooled)
    // The message usually suggests using `createClient()`
    const isConnectionError = 
        error.code === 'invalid_connection_string' || 
        error.message?.includes('createClient') ||
        error.message?.includes('pooled connection string');

    if (isConnectionError) {
      // In development or when using direct connections, we fallback to a fresh client
      // Note: In high-traffic production, this is less efficient than pooling, 
      // but it solves the crash when the standard pooler is not available.
      const client = createClient();
      await client.connect();
      try {
        return await client.sql<O>(strings, ...values);
      } finally {
        await client.end();
      }
    }
    
    // Re-throw other errors (syntax, constraints, etc.)
    throw error;
  }
}
