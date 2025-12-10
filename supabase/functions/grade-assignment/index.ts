import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
// Correct import for crypto in Deno
import { crypto } from "https://deno.land/std@0.190.0/crypto/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

/**
 * Creates a SHA-256 hash of a string
 */
async function createHash(message: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Normalizes a SQL query string for consistent hashing.
 * Removes extra whitespace and standardizes line endings.
 */
function normalizeSqlQuery(sql: string): string {
  // Standardize line endings to \n
  let normalized = sql.replace(/\r\n/g, '\n');
  // Replace all newlines with a single space
  normalized = normalized.replace(/\n/g, ' ');
  // Replace multiple spaces with a single space
  normalized = normalized.replace(/\s+/g, ' ');
  // Trim leading/trailing whitespace
  normalized = normalized.trim();
  return normalized;
}

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
      // For SELECT queries, normalize the query string before hashing for consistent comparison
      const normalizedQuery = normalizeSqlQuery(sqlQuery);
      const queryHash = await createHash(normalizedQuery);

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
      
      // Split the entire content by --Q<number> to identify distinct questions
      // This regex captures the question marker (--Q1, --Q2, etc.) and the content following it.
      const questionBlocks = sqlContent.split(/(--Q\d+)/g);
      
      let currentQuestionId = '';
      let globalStatementCounter = 1; // To assign unique IDs if --Q is missing

      for (let i = 0; i < questionBlocks.length; i++) {
        const block = questionBlocks[i].trim();

        if (block.startsWith('--Q')) {
          currentQuestionId = block; // e.g., "--Q1", "--Q11"
        } else if (block.length > 0) {
          // This block contains SQL for the currentQuestionId (or the previous one if no --Q was found)
          // Now, split this SQL block by 'GO' to get individual statements
          const goSeparatedStatements = block.split(/(?:\r?\n)GO(?:\r?\n)/i);

          for (const stmtPart of goSeparatedStatements) {
            const trimmedStmt = stmtPart.trim();
            if (trimmedStmt.length > 0) {
              // If we have a currentQuestionId from a --Q comment, use it.
              // Otherwise, assign a generic "Statement X"
              const questionLabel = currentQuestionId || `Statement ${globalStatementCounter}`;
              statements.push({
                question: questionLabel,
                sql: trimmedStmt
              });
              globalStatementCounter++; // Increment for next generic statement
            }
          }
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