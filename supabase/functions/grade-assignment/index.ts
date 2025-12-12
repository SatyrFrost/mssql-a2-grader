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
    } else if (trimmedQuery.startsWith('exec') || trimmedQuery.startsWith('declare') || trimmedQuery.startsWith('print')) {
      // For stored procedures, functions, etc., just return success for now
      return { status: 'success', message: 'Procedure/Function executed (mock)' };
    } else {
      return { status: 'success' }; // Default for other statements
    }
  } catch (err: any) {
    return { error: `Mock query execution failed: ${err.message}` };
  }
}

interface SqlStatementPart {
  sql: string;
  type: 'select' | 'dml' | 'ddl' | 'proc_func' | 'other';
}

interface QuestionBlock {
  questionId: string;
  fullSql: string; // The complete SQL for the question, including GOs
  sqlParts: SqlStatementPart[]; // Individual GO-separated parts
}

// Helper to split SQL into individual statements, handling --Q comments and GO
const splitMsSqlStatements = (sqlContent: string): QuestionBlock[] => {
  if (!sqlContent) return [];

  const questionBlocks: QuestionBlock[] = [];
  const lines = sqlContent.split('\n');
  let currentQuestionId = '';
  let currentSqlBuffer: string[] = [];
  let statementCounter = 1; // For generic question IDs if --Q is missing

  const processBuffer = () => {
    if (currentSqlBuffer.length > 0) {
      const fullSqlForQuestion = currentSqlBuffer.join('\n').trim();
      if (fullSqlForQuestion.length > 0) {
        const goSeparatedParts = fullSqlForQuestion.split(/(?:\r?\n)GO(?:\r?\n)/i);
        const sqlParts: SqlStatementPart[] = goSeparatedParts
          .map(part => part.trim())
          .filter(part => part.length > 0)
          .map(part => {
            const lowerPart = part.toLowerCase();
            let type: SqlStatementPart['type'] = 'other';
            if (lowerPart.startsWith('select')) type = 'select';
            else if (lowerPart.startsWith('insert') || lowerPart.startsWith('update') || lowerPart.startsWith('delete')) type = 'dml';
            else if (lowerPart.startsWith('create') || lowerPart.startsWith('drop') || lowerPart.startsWith('alter')) type = 'ddl';
            else if (lowerPart.startsWith('exec') || lowerPart.startsWith('declare') || lowerPart.startsWith('print')) type = 'proc_func';
            return { sql: part, type };
          });

        if (sqlParts.length > 0) {
          questionBlocks.push({
            questionId: currentQuestionId || `Statement ${statementCounter++}`,
            fullSql: fullSqlForQuestion,
            sqlParts: sqlParts,
          });
        }
      }
    }
    currentSqlBuffer = [];
  };

  for (const line of lines) {
    const trimmedLine = line.trim();
    // FIX: Update regex to match both --Q# and --Question#
    const questionMatch = trimmedLine.match(/^(?:--Q\d+|--Question\d+)$/i); 

    if (questionMatch) {
      processBuffer(); // Process the previous question's buffer
      currentQuestionId = questionMatch[0]; // Use match[0] to get the full matched string (--Q1 or --Question1)
    } else {
      currentSqlBuffer.push(line);
    }
  }
  processBuffer(); // Process the last question's buffer

  return questionBlocks;
};


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

    // Process initial setup if provided
    if (initialSqlSetup) {
      const initialSetupBlocks = splitMsSqlStatements(initialSqlSetup);
      console.log(`Processing ${initialSetupBlocks.length} initial setup blocks`);
      
      for (const block of initialSetupBlocks) {
        for (const stmtPart of block.sqlParts) {
          const setupResult = await executeMsSqlQuery(stmtPart.sql);
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
    }

    // Process student and model queries
    const studentQuestionBlocks = studentSql ? splitMsSqlStatements(studentSql) : [];
    const modelQuestionBlocks = modelAnswersSql ? splitMsSqlStatements(modelAnswersSql) : [];
    
    console.log(`Processing ${studentQuestionBlocks.length} student questions and ${modelQuestionBlocks.length} model questions`);

    const results: any[] = [];
    
    const maxQuestionBlocks = Math.max(studentQuestionBlocks.length, modelQuestionBlocks.length);
    
    for (let i = 0; i < maxQuestionBlocks; i++) {
      const studentBlock = studentQuestionBlocks[i];
      const modelBlock = modelQuestionBlocks[i];
      
      const studentResultsForQuestion: any[] = [];
      const modelResultsForQuestion: any[] = [];

      // Execute all parts for student's question
      if (studentBlock) {
        for (const part of studentBlock.sqlParts) {
          const partResult = await executeMsSqlQuery(part.sql);
          studentResultsForQuestion.push(partResult);
        }
      }

      // Execute all parts for model's question
      if (modelBlock) {
        for (const part of modelBlock.sqlParts) {
          const partResult = await executeMsSqlQuery(part.sql);
          modelResultsForQuestion.push(partResult);
        }
      }
      
      results.push({
        question: studentBlock?.questionId || modelBlock?.questionId || `Question ${i + 1}`,
        student: {
          sql: studentBlock?.fullSql || 'N/A', // Use fullSql for display
          result: studentResultsForQuestion, // Now an array of results
        },
        model: {
          sql: modelBlock?.fullSql || 'N/A', // Use fullSql for display
          result: modelResultsForQuestion, // Now an array of results
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