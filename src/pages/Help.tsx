import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const Help = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4 md:p-8">
      <h1 className="text-4xl font-bold text-center mb-8">SQL Assignment Grader Help</h1>

      <Card>
        <CardHeader>
          <CardTitle>1. Introduction</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 dark:text-gray-300">
            The SQL Assignment Grader is a web-based application designed to assist teachers in automatically assessing SQL queries and scripts. Its primary goal is to streamline the grading process for SQL assignments by providing instant, objective feedback on the structural correctness and adherence to expected patterns in student submissions. Teachers upload student SQL files, and the grader provides a detailed report, including a score, highlighting areas of correctness and potential errors.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>2. How it Works</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            You upload each student’s SQL file (typically a .sql or .txt file) to the webpage. The grader then sends this SQL to a secure server-side Edge Function, which processes the student's SQL against a predefined model answer. For `SELECT` queries, it simulates execution and compares the normalized output (via hashing) with the model. For other SQL statements (like DDL, DML, procedures, and functions), it performs a structural analysis. It then generates a detailed report and a score based on a comprehensive marking schedule.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            There is also a separate "SQL Editor" page where students can test their queries against a pre-loaded SQLite database schema. This is for practice and immediate feedback, separate from the grading process.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>3. What it Checks</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            The grader thoroughly evaluates various aspects of a student's SQL submission, including:
          </p>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
            <li><strong>Core SQL Keywords and Clauses:</strong> Verifies the presence and correct usage of keywords like <code>SELECT</code>, <code>FROM</code>, <code>WHERE</code>, <code>JOIN</code>, <code>GROUP BY</code>, <code>ORDER BY</code>, and <code>AND</code>.</li>
            <li><strong>Aggregate Functions:</strong> Checks for the use of functions such as <code>MAX</code>, <code>MIN</code>, <code>COUNT</code>, <code>SUM</code>, and <code>AVG</code>, and their appropriate aliasing.</li>
            <li><strong>Complex Query Structures:</strong> Identifies specific patterns for subqueries (e.g., <code>WHERE ... NOT IN</code> or equivalent <code>LEFT JOIN ... IS NULL</code> constructs).</li>
            <li><strong>Database Definition Language (DDL):</strong> Assesses the creation of database objects like <code>VIEWS</code>, <code>PROCEDURES</code>, and <code>FUNCTIONS</code>.</li>
            <li><strong>Stored Procedures and Functions:</strong> Evaluates the structure of procedures and functions, including parameter declarations, variable declarations, cursor usage (<code>DECLARE CURSOR</code>, <code>OPEN</code>, <code>FETCH NEXT</code>, <code>WHILE @@FETCH_STATUS</code>, <code>CLOSE</code>, <code>DEALLOCATE</code>), <code>PRINT</code> statements for output, and correct return values for functions.</li>
            <li><strong>Parameter Usage:</strong> Checks for consistency in parameter naming and usage within stored procedures.</li>
            <li><strong>Output Consistency (for SELECT queries):</strong> For `SELECT` statements, the grader normalizes the query and generates a hash of its expected output. If the student's query produces the same hash, it indicates a correct result set.</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>4. How it Grades</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            The grading system awards points based on a detailed marking schedule for each question. Points are assigned across various criteria:
          </p>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
            <li><strong>Keyword Presence:</strong> Points for including essential SQL keywords and clauses.</li>
            <li><strong>Structural Patterns:</strong> Points for matching specific SQL patterns using regular expressions, ensuring correct syntax and logical structure for more complex constructs (e.g., joins, subqueries, procedure definitions).</li>
            <li><strong>Output Matching:</strong> For `SELECT` queries, points are awarded if the normalized output matches the model answer.</li>
            <li><strong>Specific Deductions:</strong> Certain common errors, like parameter name mismatches in procedures, may result in specific point deductions.</li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300 mt-4">
            The report provides a breakdown of marks for each criterion within each question, a total score for each question, and a final overall scaled score and percentage for the entire assignment.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>5. Limitations</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            It's important to be aware of the grader's current limitations:
          </p>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
            <li><strong>Strict Comparison:</strong> It grades against a single, predefined "correct" SQL model. Any valid alternative solutions that differ significantly in structure or approach from this model may be marked as incorrect, even if they produce the same logical result.</li>
            <li><strong>No Semantic Understanding:</strong> It primarily checks the structure and expected output patterns, not the underlying intent or efficiency of the SQL. It can't tell if the SQL is the most optimal solution, only if it matches the expected blueprint.</li>
            <li><strong>MS SQL Syntax Focus:</strong> The grading logic is tailored for MS SQL Server syntax, especially for advanced features like stored procedures, functions, and cursors. Submissions using significantly different SQL dialects may not be graded accurately.</li>
            <li><strong>Simulated Execution:</strong> While `SELECT` query outputs are compared via hashing, the Edge Function does not execute the SQL against a live, persistent database. DDL/DML statements are primarily checked for structural correctness rather than their actual effect on a database state.</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>6. How to Use</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 space-y-2">
            <li><strong>Prepare Student Files:</strong> Ensure students save their SQL assignments as `.sql` or `.txt` files.</li>
            <li><strong>Access the Grader:</strong> Navigate to the SQL Assignment Grader page in the application.</li>
            <li><strong>Upload Student File:</strong> Click the "Choose a .txt or .sql file" button and select the student's submission. The content will appear in the text area.</li>
            <li><strong>Grade Assignment:</strong> Click the "Grade Assignment" button. The application will process the SQL and display the grading results.</li>
            <li><strong>Review Results:</strong>
              <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                <li>The "Overall Assignment Score" card shows the total score and percentage.</li>
                <li>The "Mark Breakdown for Excel" text area provides individual marks for each rule, formatted for easy copying into an Excel spreadsheet for record-keeping.</li>
                <li>The "Detailed Grading Feedback" section provides a question-by-question breakdown, including the student's SQL, the model answer, and specific feedback points.</li>
              </ul>
            </li>
            <li><strong>Copy Marks to Excel:</strong> Use the "Copy to Clipboard" button under the "Mark Breakdown for Excel" section to quickly transfer the individual marks.</li>
            <li><strong>Clear Page:</strong> After grading an assignment, click the "Clear Page" button to reset the form for the next student.</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
};

export default Help;