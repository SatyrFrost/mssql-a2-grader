import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createHash } from "https://deno.land/std@0.190.0/hash/mod.ts"; // Import createHash

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

/**
 * Simulates MS SQL query execution.
 * For SELECT queries, it returns a hash of the query for comparison.
 * For other queries, it returns a success status.
 */
async function executeMsSqlQuery(sqlQuery: string) {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 50));
  
  try {
    if (!sqlQuery || sqlQuery.trim().length === 0) {
      return { error: "Empty SQL query provided" };
    }
    
    const trimmedQuery = sqlQuery.trim().toLowerCase();
    
    if (trimmedQuery.startsWith('select')) {
      // For SELECT queries, return a hash of the query for comparison
      const hash = createHash("sha256");
      hash.update(sqlQuery);
      const queryHash = hash.toString('hex'); // Get hex string of the hash

      // Return mock columns/values for display, and the hash for comparison
      return {
        columns: ['QueryHash', 'SimulatedOutput'],
        values: [[queryHash, 'Mock data based on query hash']],
        hash: queryHash // Include hash for easier comparison
      };
    } else if (trimmedQuery.startsWith('insert') || trimmedQuery.startsWith('update') || trimmedQuery.startsWith('delete')) {
      return { status: 'success', rowsAffected: 1 };
    } else if (trimmedQuery.startsWith('create') || trimmedQuery.startsWith('drop') || trimmedQuery.startsWith('alter')) {
      return { status: 'success' };
    } else if (trimmedQuery.startsWith('exec') || trimmedQuery.startsWith('go') || trimmedQuery.startsWith('declare') || trimmedQuery.startsWith('print')) {
      // For stored procedures, functions, etc., just return success for now
      return { status: 'success', message: 'Procedure/Function executed (mock)' };
    } else {
      return { status: 'success' }; // Default for other statements
    }
  } catch (err: any) {
    return { error: `Mock query execution failed: ${err.message}` };
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { studentSql, modelAnswersSql, initialSqlSetup } = await req.json();
    
    console.log('Received grading request with:', {
      studentSqlLength: studentSql?.length || 0,
      modelAnswersSqlLength: modelAnswersSql?.length || 0,
      initialSqlSetupLength: initialSqlSetup?.length || 0
    });

    // Helper to split SQL into individual statements, handling --Q comments and GO
    const splitMsSqlStatements = (sqlContent: string) => {
      if (!sqlContent) return [];
      
      const statements: { question: string; sql: string }[] = [];
      const blocks = sqlContent.split(/(?:\r?\n|\r)GO(?:\r?\n|\r|$)/i);
      
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
          } else if (trimmedLine && !trimmedLine.startsWith('--')) {
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

    // Process initial setup if provided
    if (initialSqlSetup) {
      const initialSetupStatements = splitMsSqlStatements(initialSqlSetup);
      console.log(`Processing ${initialSetupStatements.length} initial setup statements`);
      
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
    }

    // Process student and model queries
    const studentQueries = studentSql ? splitMsSqlStatements(studentSql) : [];
    const modelQueries = modelAnswersSql ? splitMsSqlStatements(modelAnswersSql) : [];
    
    console.log(`Processing ${studentQueries.length} student queries and ${modelQueries.length} model queries`);

    const results: any[] = [];
    
    const maxQueries = Math.max(studentQueries.length, modelQueries.length);
    
    for (let i = 0; i < maxQueries; i++) {
      const studentQuery = studentQueries[i];
      const modelQuery = modelQueries[i];
      
      let studentResult = null;
      let modelResult = null;
      
      if (studentQuery) {
        console.log(`Executing student query ${i+1}:`, studentQuery.question);
        studentResult = await executeMsSqlQuery(studentQuery.sql);
      }
      
      if (modelQuery) {
        console.log(`Executing model query ${i+1}:`, modelQuery.question);
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

    console.log(`Returning ${results.length} results`);
    
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
      JSON.stringify({ 
        error: 'Internal server error',
        message: error.message,
        stack: error.stack
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});