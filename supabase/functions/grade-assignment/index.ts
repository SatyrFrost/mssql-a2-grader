import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

/**
 * Executes an MS SQL query by making a fetch call to a Dyad-provided internal service.
 * This function assumes Dyad exposes an endpoint for executing MS SQL queries.
 * The service is expected to return results in a format like { columns: string[], values: any[][] } for SELECT
 * queries, and { status: 'success' } or similar for non-SELECT (DDL/DML) queries.
 */
async function executeMsSqlQuery(sqlQuery: string) {
  // This environment variable needs to be configured in your Supabase project settings.
  // It should point to the URL of Dyad's internal MS SQL execution service.
  const DYAD_MS_SQL_EXECUTION_ENDPOINT = Deno.env.get('DYAD_MS_SQL_EXECUTION_ENDPOINT');
  
  if (!DYAD_MS_SQL_EXECUTION_ENDPOINT) {
    return { 
      error: "DYAD_MS_SQL_EXECUTION_ENDPOINT environment variable is not set. Please configure it with the URL of Dyad's internal MS SQL execution service." 
    };
  }

  try {
    const response = await fetch(DYAD_MS_SQL_EXECUTION_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // If Dyad's internal service requires authentication (e.g., an API key),
        // you would add it here, potentially from another environment variable.
        // Example: 'Authorization': `Bearer ${Deno.env.get('DYAD_INTERNAL_API_KEY')}`
      },
      body: JSON.stringify({ sql: sqlQuery }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      // Assuming the Dyad service returns an error object on failure
      return { 
        error: responseData.message || `Dyad MS SQL service error: ${response.statusText}` 
      };
    }

    // The service is expected to return { columns: string[], values: any[][] } for SELECT
    // and { status: 'success' } or similar for non-SELECT queries.
    return responseData;
  } catch (err: any) {
    return { 
      error: `Failed to communicate with Dyad MS SQL service: ${err.message}` 
    };
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { studentSql, modelAnswersSql, initialSqlSetup } = await req.json();

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
              statements.push({
                question: currentQuestion,
                sql: currentSqlBlock.join('\n').trim()
              });
            }
            currentQuestion = trimmedLine;
            currentSqlBlock = [];
          } else if (trimmedLine && !trimmedLine.startsWith('--')) { // Ignore other comments
            currentSqlBlock.push(line);
          }
        }
        
        if (currentSqlBlock.length > 0) {
          statements.push({
            question: currentQuestion || `Question ${questionCounter++}`,
            sql: currentSqlBlock.join('\n').trim()
          });
        }
      }
      
      return statements;
    };

    // Execute initial setup SQL
    const initialSetupStatements = splitMsSqlStatements(initialSqlSetup);
    
    for (const stmt of initialSetupStatements) {
      const setupResult = await executeMsSqlQuery(stmt.sql);
      
      if (setupResult && (setupResult as any).error) {
        console.error('Initial setup error:', setupResult);
        return new Response(
          JSON.stringify({ 
            error: 'Failed to set up initial database schema.',
            details: setupResult 
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 500,
          }
        );
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
        studentResult = await executeMsSqlQuery(studentQuery.sql);
      }
      
      if (modelQuery) {
        modelResult = await executeMsSqlQuery(modelQuery.sql);
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

    return new Response(
      JSON.stringify({ results }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error: any) {
    console.error('Edge Function error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});