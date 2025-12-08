import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { studentSql, modelAnswersSql, initialSqlSetup } = await req.json();

    // Create a Supabase client with the service role key
    // This client bypasses RLS, allowing it to perform schema setup and execute any query.
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Helper to split SQL into individual statements, handling --Q comments
    const splitSqlStatements = (sqlContent: string) => {
      const statements: { question: string; sql: string }[] = [];
      const lines = sqlContent.split('\n');
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
      if (currentQuestion && currentSqlBlock.length > 0) {
        statements.push({ question: currentQuestion, sql: currentSqlBlock.join('\n').trim() });
      }
      return statements;
    };

    // Execute initial setup SQL
    const initialSetupResult = await supabaseAdmin.rpc('execute_sql_query', { sql_query: initialSqlSetup });
    if (initialSetupResult.error) {
      console.error('Initial setup error:', initialSetupResult.error);
      return new Response(JSON.stringify({ error: 'Failed to set up initial database schema.', details: initialSetupResult.error }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      });
    }

    const studentQueries = splitSqlStatements(studentSql);
    const modelQueries = splitSqlStatements(modelAnswersSql);

    const results: any[] = [];

    for (let i = 0; i < Math.max(studentQueries.length, modelQueries.length); i++) {
      const studentQuery = studentQueries[i];
      const modelQuery = modelQueries[i];

      let studentResult = null;
      let modelResult = null;

      if (studentQuery) {
        const { data, error } = await supabaseAdmin.rpc('execute_sql_query', { sql_query: studentQuery.sql });
        studentResult = error ? { error: error.message, sqlstate: error.code } : data;
      }

      if (modelQuery) {
        const { data, error } = await supabaseAdmin.rpc('execute_sql_query', { sql_query: modelQuery.sql });
        modelResult = error ? { error: error.message, sqlstate: error.code } : data;
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