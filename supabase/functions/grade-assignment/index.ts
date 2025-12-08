import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
// Removed external MS SQL driver import

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Placeholder for MS SQL query execution.
// This function will need to be replaced with Dyad's specific mechanism for running MS SQL queries.
async function executeMsSqlQuery(sqlQuery: string) {
  // In a Dyad-managed MS SQL environment, this would typically involve
  // calling an internal Dyad service or a specific API.
  // For now, we'll return an error to indicate that the actual execution
  // mechanism needs to be implemented based on Dyad's capabilities.
  console.warn("MS SQL execution placeholder called. Actual MS SQL execution logic needs to be implemented.");
  return { error: "MS SQL execution not yet implemented in this environment. Please consult Dyad's documentation or support for running MS SQL queries." };
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
      const setupResult = await executeMsSqlQuery(stmt.sql); // Using the placeholder function
      if (setupResult && (setupResult as any).error) {
        console.error('Initial setup error:', setupResult);
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
        studentResult = await executeMsSqlQuery(studentQuery.sql); // Using the placeholder function
      }

      if (modelQuery) {
        modelResult = await executeMsSqlQuery(modelQuery.sql); // Using the placeholder function
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