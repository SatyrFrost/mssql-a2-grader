/**
 * Client-side SQL Grading Engine
 * Replaces the Supabase Edge Function with local parsing and hashing.
 */

// Pure JavaScript fallback for SHA-256 in environments where crypto.subtle is unavailable (e.g. non-HTTPS/HTTP hosting)
function sha256Fallback(str: string): string {
  function rightRotate(value: number, amount: number) {
    return (value >>> amount) | (value << (32 - amount));
  }

  const mathPow = Math.pow;
  const maxWord = mathPow(2, 32);
  const lengthProperty = 'length';
  let i = 0, j = 0;
  let result = '';

  const words: number[] = [];
  const asciiBitLength = str[lengthProperty] * 8;

  const hash: number[] = [];
  const k: number[] = [];
  let primeCounter = 0;

  const isComposite: { [key: number]: boolean } = {};
  for (let candidate = 2; primeCounter < 64; candidate++) {
    if (!isComposite[candidate]) {
      for (i = 0; i < 300; i += candidate) {
        isComposite[i] = true;
      }
      hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
      k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
    }
  }

  str += '\x80';
  while ((str[lengthProperty] % 64) - 56) str += '\x00';
  for (i = 0; i < str[lengthProperty]; i++) {
    j = str.charCodeAt(i);
    if (j >> 8) return ''; // only ASCII supported for normalized SQL
    words[i >> 2] |= j << (((3 - i) % 4) * 8);
  }
  words[words[lengthProperty]] = (asciiBitLength / maxWord) | 0;
  words[words[lengthProperty]] = asciiBitLength | 0;

  for (j = 0; j < words[lengthProperty]; ) {
    const w = words.slice(j, (j += 16));
    const oldHash = hash.slice(0);

    for (i = 0; i < 64; i++) {
      const w15 = w[i - 15],
        w2 = w[i - 2];
      const s0 = rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3);
      const s1 = rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10);
      w[i] =
        i < 16
          ? w[i]
          : ((w[i - 16] + s0 + w[i - 7] + s1) | 0);

      const s1_ch = rightRotate(hash[4], 6) ^ rightRotate(hash[4], 11) ^ rightRotate(hash[4], 25);
      const ch = (hash[4] & hash[5]) ^ (~hash[4] & hash[6]);
      const temp1 = (hash[7] + s1_ch + ch + k[i] + w[i]) | 0;
      const s0_maj = rightRotate(hash[0], 2) ^ rightRotate(hash[0], 13) ^ rightRotate(hash[0], 22);
      const maj = (hash[0] & hash[1]) ^ (hash[0] & hash[2]) ^ (hash[1] & hash[2]);
      const temp2 = (s0_maj + maj) | 0;

      hash[7] = hash[6];
      hash[6] = hash[5];
      hash[5] = hash[4];
      hash[4] = (hash[3] + temp1) | 0;
      hash[3] = hash[2];
      hash[2] = hash[1];
      hash[1] = hash[0];
      hash[0] = (temp1 + temp2) | 0;
    }

    for (i = 0; i < 8; i++) {
      hash[i] = (hash[i] + oldHash[i]) | 0;
    }
  }

  for (i = 0; i < 8; i++) {
    for (j = 3; j >= 0; j--) {
      const b = (hash[i] >> (8 * j)) & 255;
      result += (b < 16 ? '0' : '') + b.toString(16);
    }
  }
  return result;
}

/**
 * Creates a SHA-256 hash of a string using native Web Crypto where available,
 * with a fallback for insecure HTTP contexts.
 */
export async function createHash(message: string): Promise<string> {
  if (typeof crypto !== 'undefined' && crypto.subtle && crypto.subtle.digest) {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(message);
      const hashBuffer = await crypto.subtle.digest("SHA-256", data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } catch {
      // Fallback below
    }
  }
  return sha256Fallback(message);
}

/**
 * Normalizes a SQL query string for consistent hashing.
 * Removes extra whitespace and standardizes line endings.
 */
export function normalizeSqlQuery(sql: string): string {
  let normalized = sql.replace(/\r\n/g, '\n');
  normalized = normalized.replace(/\n/g, ' ');
  normalized = normalized.replace(/\s+/g, ' ');
  return normalized.trim();
}

/**
 * Simulates MS SQL query execution.
 * For SELECT queries, returns a hash of the query for comparison.
 * For other queries, returns a success status.
 */
export async function executeMsSqlQuery(sqlQuery: string) {
  if (!sqlQuery || sqlQuery.trim().length === 0) {
    return { error: "Empty SQL query provided" };
  }

  const trimmedQuery = sqlQuery.trim().toLowerCase();

  if (trimmedQuery.startsWith('select')) {
    const normalizedQuery = normalizeSqlQuery(sqlQuery);
    const queryHash = await createHash(normalizedQuery);
    return {
      columns: ['QueryHash', 'SimulatedOutput'],
      values: [[queryHash, 'Mock data based on query hash']],
      hash: queryHash,
    };
  } else {
    return { status: 'success', message: 'Mock execution successful' };
  }
}

export interface SqlStatementPart {
  sql: string;
  type: 'select' | 'dml' | 'ddl' | 'proc_func' | 'other';
}

export interface QuestionBlock {
  questionId: string;
  fullSql: string;
  sqlParts: SqlStatementPart[];
}

/**
 * Helper to split SQL into individual statements, handling --Q comments and GO
 */
export const splitMsSqlStatements = (sqlContent: string): QuestionBlock[] => {
  if (!sqlContent) return [];

  const normalizedSqlContent = sqlContent.replace(/\r\n/g, '\n');
  const lines = normalizedSqlContent.split('\n');
  let currentQuestionId = '';
  let currentSqlBuffer: string[] = [];

  const questionBlocks: QuestionBlock[] = [];

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

        if (sqlParts.length > 0 && currentQuestionId) {
          questionBlocks.push({
            questionId: currentQuestionId,
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
    const questionMatch = trimmedLine.match(/^--\s*(?:Q|Question)\s*(\d+)/i);

    if (questionMatch) {
      processBuffer();
      currentQuestionId = `Q${questionMatch[1]}`;
    } else {
      currentSqlBuffer.push(line);
    }
  }
  processBuffer();

  return questionBlocks;
};

export interface GradeAssignmentParams {
  studentSql: string;
  modelAnswersSql: string;
  initialSqlSetup?: string;
}

export interface EngineQueryResult {
  question: string;
  student: {
    sql: string;
    result: any[];
  };
  model: {
    sql: string;
    result: any[];
  };
}

/**
 * Pure client-side replacement for the grade-assignment Edge Function.
 */
export async function gradeAssignmentLocally({
  studentSql,
  modelAnswersSql,
  initialSqlSetup,
}: GradeAssignmentParams): Promise<{ results: EngineQueryResult[] }> {
  // Process initial setup if provided
  if (initialSqlSetup) {
    const initialSetupBlocks = splitMsSqlStatements(initialSqlSetup);
    for (const block of initialSetupBlocks) {
      for (const stmtPart of block.sqlParts) {
        const setupResult = await executeMsSqlQuery(stmtPart.sql);
        if (setupResult && (setupResult as any).error) {
          throw new Error(`Failed to set up initial database schema: ${(setupResult as any).error}`);
        }
      }
    }
  }

  const studentQuestionBlocks = studentSql ? splitMsSqlStatements(studentSql) : [];
  const modelQuestionBlocks = modelAnswersSql ? splitMsSqlStatements(modelAnswersSql) : [];

  const results: EngineQueryResult[] = [];
  const maxQuestionBlocks = Math.max(studentQuestionBlocks.length, modelQuestionBlocks.length);

  for (let i = 0; i < maxQuestionBlocks; i++) {
    const studentBlock = studentQuestionBlocks[i];
    const modelBlock = modelQuestionBlocks[i];

    const studentResultsForQuestion: any[] = [];
    const modelResultsForQuestion: any[] = [];

    if (studentBlock) {
      for (const part of studentBlock.sqlParts) {
        const partResult = await executeMsSqlQuery(part.sql);
        studentResultsForQuestion.push(partResult);
      }
    }

    if (modelBlock) {
      for (const part of modelBlock.sqlParts) {
        const partResult = await executeMsSqlQuery(part.sql);
        modelResultsForQuestion.push(partResult);
      }
    }

    results.push({
      question: studentBlock?.questionId || modelBlock?.questionId || `Q${i + 1}`,
      student: {
        sql: studentBlock?.fullSql || 'N/A',
        result: studentResultsForQuestion,
      },
      model: {
        sql: modelBlock?.fullSql || 'N/A',
        result: modelResultsForQuestion,
      },
    });
  }

  return { results };
}
