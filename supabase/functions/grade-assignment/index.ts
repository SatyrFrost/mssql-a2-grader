import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { ConnectionPool } from "https://deno.land/x/deno_mssql@1.0.0/mod.ts"; // Import deno-mssql

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Helper to execute MS SQL queries
async function executeMsSqlQuery(pool: ConnectionPool, sqlQuery: string) {
  try {
    const request = pool.request();
    // Check if it's a SELECT query
    if (sqlQuery.trim().toUpperCase().startsWith('SELECT')) {
      const result = await request.query(sqlQuery);
      return result.recordset; // Return the data rows
    } else {
      // For non-SELECT queries (INSERT, UPDATE, DELETE, DDL, etc.)
      await request.query(sqlQuery);
      return { status: 'success', message: 'Query executed successfully.' };
    }
  } catch (err: any) {
    return { error: err.message, sqlstate: err.code || 'UNKNOWN_SQLSTATE' };
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { studentSql, modelAnswersSql, initialSqlSetup } = await req.json();

    // Get MS SQL Server connection details from environment variables
    const mssqlConfig = {
      server: Deno.env.get('MSSQL_SERVER') ?? '',
      database: Deno.env.get('MSSQL_DATABASE') ?? '',
      user: Deno.env.get('MSSQL_USER') ?? '',
      password: Deno.env.get('MSSQL_PASSWORD') ?? '',
      options: {
        encrypt: false, // Use true for Azure SQL Database, false for local SQL Server
        trustServerCertificate: true, // Change to false for production with valid SSL cert
      },
    };

    if (!mssqlConfig.server || !mssqlConfig.database || !mssqlConfig.user || !mssqlConfig.password) {
      return new Response(JSON.stringify({ error: 'Missing MS SQL Server connection environment variables.' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      });
    }

    const pool = new ConnectionPool(mssqlConfig);
    await pool.connect();

    // Helper to split SQL into individual statements, handling --Q comments and GO
    const splitMsSqlStatements = (sqlContent: string) => {
      const statements: { question: string; sql: string }[] = [];
      const blocks = sqlContent.split(/(?:\r?\n|\r)GO(?:\r?\n|\r|$)/i); // Split by GO keyword
      let questionCounter = 1;

      for (const block of blocks) {
        const lines = block.split('\n');
        let currentQuestion = '';
        let currentSqlBlock: string[] = [];

        for (const line of lines) {
          const trimmedLine = line.trim();
          if (trimmedLine.startsWith('--Q')) {
            if (currentQuestion && currentSqlBlock.length > 0) {
              statements.push({ question: currentQuestion, sql: currentSqlBlock.join('\n').trim() });
            }
            currentQuestion = trimmedLine;
            currentSqlBlock = [];
          } else if (trimmedLine && !trimmedLine.startsWith('--')) { // Ignore other comments
            currentSqlBlock.push(line);
          }
        }
        if (currentSqlBlock.length > 0) {
          statements.push({ question: currentQuestion || `Question ${questionCounter++}`, sql: currentSqlBlock.join('\n').trim() });
        }
      }
      return statements;
    };

    // Execute initial setup SQL
    const initialSetupStatements = splitMsSqlStatements(initialSqlSetup);
    for (const stmt of initialSetupStatements) {
      const setupResult = await executeMsSqlQuery(pool, stmt.sql);
      if (setupResult && (setupResult as any).error) {
        console.error('Initial setup error:', setupResult);
        await pool.close();
        return new Response(JSON.stringify({ error: 'Failed to set up initial database schema.', details: setupResult }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500,
        });
      }
    }

    const studentQueries = splitMsSqlStatements(studentSql);
    const modelQueries = splitMsSqlStatements(modelAnswersSql);

    const results: any[] = [];

    for (let i = 0; i < Math.max(studentQueries.length, modelQueries.length); i++) {
      const studentQuery = studentQueries[i];
      const modelQuery = modelQueries[i];

      let studentResult = null;
      let modelResult = null;

      if (studentQuery) {
        studentResult = await executeMsSqlQuery(pool, studentQuery.sql);
      }

      if (modelQuery) {
        modelResult = await executeMsSqlQuery(pool, modelQuery.sql);
      }

      results.push({
        question: studentQuery?.question || modelQuery?.question || `Question ${i + 1}`,
        student: {
          sql: studentQuery?.sql || 'N/A',
          result: studentResult,
        },
        model: {
          sql: modelQuery?.sql || 'N/A',
          result: modelResult,
        },
      });
    }

    await pool.close();

    return new Response(JSON.stringify({ results }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error('Edge Function error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});