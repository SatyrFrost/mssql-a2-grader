import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

/**
 * Mock SQL execution function for testing purposes
 * In a real implementation, this would connect to an MS SQL database
 */
async function executeMsSqlQuery(sqlQuery: string) {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 100));
  
  try {
    // Basic validation
    if (!sqlQuery || sqlQuery.trim().length === 0) {
      return { error: "Empty SQL query provided" };
    }
    
    // Mock response based on query type
    const trimmedQuery = sqlQuery.trim().toLowerCase();
    
    if (trimmedQuery.startsWith('select')) {
      // Mock SELECT response
      return {
        columns: ['ID', 'Name', 'Value'],
        values: [
          [1, 'Test1', 100],
          [2, 'Test2', 200],
          [3, 'Test3', 300]
        ]
      };
    } else if (trimmedQuery.startsWith('insert') || trimmedQuery.startsWith('update') || trimmedQuery.startsWith('delete')) {
      // Mock DML response
      return { status: 'success', rowsAffected: 1 };
    } else {
      // Mock DDL response
      return { status: 'success' };
    }
  } catch (err: any) {
    return { error: `Query execution failed: ${err.message}` };
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

    // Helper to split SQL into individual statements, handling --Q comments
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

    // Validate inputs
    if (!studentSql && !modelAnswersSql) {
      return new Response(
        JSON.stringify({ 
          error: 'Either student SQL or model answers SQL must be provided'
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      );
    }

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