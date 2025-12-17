"use client";
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { initialSqlSetup } from "@/data/initialSqlSetup";
import { modelAnswersSql } from "@/data/modelAnswersSql";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { showSuccess, showError } from "@/utils/toast";
import { supabase } from "@/integrations/supabase/client";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { markingSchedule } from "@/data/markingSchedule"; // Import the new marking schedule object
 // Import MadeWithDyad

interface QueryResult {
  question: string;
  student: {
    sql: string;
    result: any; // This can now be an array of results
  };
  model: {
    sql: string;
    result: any; // This can now be an array of results
  };
  grade?: {
    score: number;
    maxScore: number;
    feedback: string[];
  };
}

const AssignmentGrader = () => {
  const [studentSql, setStudentSql] = useState<string>(""); // Full content of the uploaded file (for display)
  const [studentAnswersForGrading, setStudentAnswersForGrading] = useState<string>(""); // Only the question parts for grading
  const [fileName, setFileName] = useState<string>("");
  const [gradingResults, setGradingResults] = useState<QueryResult[] | null>(null);
  const [isGrading, setIsGrading] = useState<boolean>(false);
  const [totalScore, setTotalScore] = useState<number>(0);
  const [totalMaxScore, setTotalMaxScore] = useState<number>(0);

  // Helper function to count occurrences of a keyword in SQL
  const countKeywordOccurrences = (sql: string, keyword: string): number => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
    const matches = sql.match(regex);
    return matches ? matches.length : 0;
  };

  // Helper function to normalize SQL for comparison (removes extra whitespace, standardizes line endings)
  const normalizeSqlForComparison = (sql: string): string => {
    return sql.replace(/\r\n/g, '\n').replace(/\n/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase();
  };

  // Helper function to format question titles for display
  const displayQuestionTitle = (questionText: string) => {
    const match = questionText.match(/--(?:Q|Question)\s*(\d+)/i); // Match --Q# or --Question# and capture the number
    if (match && match[1]) {
      return `Question ${match[1]}`; // Use the captured number
    }
    return questionText; // Fallback if format doesn't match
  };

  // Function to calculate grade for a single question
  const calculateQuestionGrade = (
    rawQuestionId: string,
    studentSql: string,
    modelSql: string,
    studentResult: any,
    modelResult: any
  ): { score: number; maxScore: number; feedback: string[] } => {
    let score = 0;
    let maxScore = 0;
    const feedback: string[] = [];

    const questionId = rawQuestionId; 
    const questionMarking = markingSchedule[questionId];

    if (!questionMarking) {
      feedback.push(`No marking schedule found for ${questionId}.`);
      return { score: 0, maxScore: 0, feedback };
    }

    const studentSqlLower = studentSql.toLowerCase();
    const normalizedStudentSql = normalizeSqlForComparison(studentSql);

    // Debugging for Q14
    if (questionId === 'Q14') {
      console.log(`--- Debugging Q14 ---`);
      console.log(`Student SQL for Q14 (raw): "${studentSql}"`);
      console.log(`Student SQL for Q14 (JSON stringified): ${JSON.stringify(studentSql)}`);
    }

    for (const [ruleName, ruleDefinition] of Object.entries(questionMarking)) {
      if (typeof ruleDefinition === 'number') {
        maxScore += ruleDefinition; 

        if (ruleName === '[labels]') {
          if (questionId === 'Q5') {
            const selectClauseMatch = studentSql.match(/SELECT\s+(.*?)\s+FROM/is);
            if (selectClauseMatch && selectClauseMatch[1]) {
              const selectContent = selectClauseMatch[1];
              const asCount = (selectContent.match(/\bAS\b/gi) || []).length;
              if (asCount >= 5) { 
                score += ruleDefinition;
                feedback.push(`+${ruleDefinition} for correctly including aliases for aggregate functions.`);
              } else {
                feedback.push(`-0 for missing or insufficient aliases for aggregate functions.`);
              }
            } else {
              feedback.push(`-0 for labels (could not parse SELECT clause for alias check).`);
            }
          } else {
            const studentHasError = Array.isArray(studentResult) ? studentResult.some(r => r?.error) : studentResult?.error;
            if (!studentHasError) {
               score += ruleDefinition;
               feedback.push(`+${ruleDefinition} for labels (query executed successfully).`);
            } else {
               feedback.push(`-0 for labels (query execution failed).`);
            }
          }
        } else if (ruleName === 'JOIN' && questionId === 'Q4') { 
          const joinCount = countKeywordOccurrences(studentSqlLower, 'join');
          if (joinCount >= 1) { 
            score += ruleDefinition;
            feedback.push(`+${ruleDefinition} for including a 'JOIN' clause.`);
          } else {
            feedback.push(`-0 for missing a 'JOIN' clause.`);
          }
        } else if (ruleName.startsWith('JOIN ')) {
          const joinNumber = parseInt(ruleName.split(' ')[1]);
          const joinCount = countKeywordOccurrences(studentSqlLower, 'join');
          if (joinCount >= joinNumber) {
            score += ruleDefinition;
            feedback.push(`+${ruleDefinition} for including at least ${joinNumber} 'JOIN' clause(s).`);
          } else {
            feedback.push(`-0 for missing the ${joinNumber}${joinNumber === 1 ? 'st' : joinNumber === 2 ? 'nd' : 'th'} 'JOIN' clause.`);
          }
        } else if (ruleName.startsWith('AND ')) {
          const andNumber = parseInt(ruleName.split(' ')[1]);
          const andCount = countKeywordOccurrences(studentSqlLower, 'and');
          if (andCount >= andNumber) {
            score += ruleDefinition;
            feedback.push(`+${ruleDefinition} for including at least ${andNumber} 'AND' clause(s).`);
          } else {
            feedback.push(`-0 for missing the ${andNumber}${andNumber === 1 ? 'st' : andNumber === 2 ? 'nd' : 'th'} 'AND' clause.`);
          }
        } else if (ruleName === 'WHERE .. NOT IN') {
          if (studentSqlLower.includes('where') && studentSqlLower.includes('not in')) {
            score += ruleDefinition;
            feedback.push(`+${ruleDefinition} for 'WHERE ... NOT IN' clause.`);
          } else {
            feedback.push(`-0 for missing 'WHERE ... NOT IN' clause.`);
          }
        } else if (ruleName === 'Subquery') {
          const expectedSubquery = normalizeSqlForComparison('SELECT ProductID FROM OrdersProduct');
          if (normalizedStudentSql.includes(expectedSubquery)) {
            score += ruleDefinition;
            feedback.push(`+${ruleDefinition} for correct subquery '${expectedSubquery}'.`);
          } else {
            feedback.push(`-0 for missing or incorrect subquery '${expectedSubquery}'.`);
          }
        } else if (ruleDefinition > 0 && studentSqlLower.includes(ruleName.toLowerCase())) { 
          score += ruleDefinition;
          feedback.push(`+${ruleDefinition} for '${ruleName}'.`);
        } else if (ruleDefinition === 0) {
          // No score, no feedback for 0-weight rules.
        } else {
          feedback.push(`-0 for missing '${ruleName}'.`);
        }
      } else if (typeof ruleDefinition === 'object' && ruleDefinition !== null && 'regex' in ruleDefinition && 'weight' in ruleDefinition) {
        maxScore += ruleDefinition.weight; 
        try {
          const regex = new RegExp(ruleDefinition.regex, 'gis'); 

          if (ruleName.includes('FETCH_NEXT_COUNT')) {
            const matches = studentSql.match(regex);
            const expectedCount = 2; // All these questions (Q11-Q14) expect two FETCH NEXT statements

            if (matches && matches.length >= expectedCount) {
              score += ruleDefinition.weight;
              feedback.push(`+${ruleDefinition.weight} for including ${expectedCount} 'FETCH NEXT' statements.`);
            } else {
              feedback.push(`-0 for missing or insufficient 'FETCH NEXT' statements (found ${matches ? matches.length : 0}, expected ${expectedCount}).`);
            }
          } else if (regex.test(studentSql)) { 
            score += ruleDefinition.weight;
            feedback.push(`+${ruleDefinition.weight} for matching pattern: \`${ruleName}\`.`);
          } else {
            feedback.push(`-0 for not matching pattern: \`${ruleName}\`.`);
          }
        } catch (e: any) {
          feedback.push(`Error in regex pattern '${ruleDefinition.regex}' for rule '${ruleName}': ${e.message}`);
        }
      }
    }

    // Specific check for Q12 parameter name mismatch
    if (questionId === 'Q12') {
      const paramMatch = studentSql.match(/CREATE\s+(?:PROCEDURE|PROC)\s+CarDetails\s*\(\s*@(\w+)\s+(?:AS\s+)?VARCHAR/i);
      const declaredParamName = paramMatch && paramMatch[1] ? paramMatch[1] : null;

      const whereClauseMatch = studentSql.match(/(?:AND|WHERE)\s+(?:Car\.)?RegistrationID\s*=\s*@(\w+)/i);
      const usedParamName = whereClauseMatch && whereClauseMatch[1] ? whereClauseMatch[1] : null;

      if (declaredParamName && usedParamName) {
        if (usedParamName !== declaredParamName) {
          const deduction = 0.5; 
          score = Math.max(0, score - deduction); 
          feedback.push(`-0.5 for parameter name mismatch: Declared '@${declaredParamName}' but used '@${usedParamName}' in WHERE clause.`);
        }
      } else {
        // These debug messages are helpful for understanding why the check might fail
        // feedback.push(`Debug: Q12 param check - Declared: ${declaredParamName}, Used: ${usedParamName}`);
      }
    }

    return { score, maxScore, feedback };
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        const fullContent = e.target?.result as string;
        setStudentSql(fullContent); // Store full content for display

        // Find the start of the actual questions (e.g., --Q1 or --Question1)
        // Made regex more robust to handle potential whitespace variations
        const questionStartRegex = /(^--\s*(?:Q|Question)\s*\d+)/im; 
        const match = fullContent.match(questionStartRegex);

        let answersOnlyContent = fullContent;
        if (match && match.index !== undefined) {
          answersOnlyContent = fullContent.substring(match.index);
        }
        setStudentAnswersForGrading(answersOnlyContent); // Store only answers for grading
        console.log("Student answers for grading (first 500 chars):", answersOnlyContent.substring(0, 500)); // Debug log

        showSuccess("Student SQL file uploaded successfully!");
        setGradingResults(null); // Clear previous results on new upload
        setTotalScore(0);
        setTotalMaxScore(0);
      };
      reader.onerror = () => {
        showError("Failed to read student SQL file.");
      };
      reader.readAsText(file);
    }
  };

  const handleGradeAssignment = async () => {
    if (!studentAnswersForGrading) { // Check if answers for grading exist
      showError("Please upload a student SQL file before grading.");
      return;
    }
    
    setIsGrading(true);
    setGradingResults(null); // Clear previous results
    setTotalScore(0);
    setTotalMaxScore(0);
    
    try {
      console.log("Calling edge function with payload sizes:", {
        studentSqlLength: studentAnswersForGrading.length, // Use answers for grading
        modelAnswersSqlLength: modelAnswersSql.length,
        initialSqlSetupLength: initialSqlSetup.length
      });
      
      const { data, error } = await supabase.functions.invoke('grade-assignment', {
        body: {
          studentSql: studentAnswersForGrading, // Pass only the extracted answers
          modelAnswersSql,
          initialSqlSetup, // This is the canonical setup from src/data/initialSqlSetup.ts
        },
      });

      if (error) {
        console.error("Edge Function error:", error);
        showError(`Grading failed: ${error.message}`);
        // Still show results if we have them
        if (data && data.results) {
          setGradingResults(data.results);
        } else {
          setGradingResults([{
            question: "Overall Grading Error",
            student: {
              sql: studentSql,
              result: [{ error: error.message }] // Wrap in array for consistency
            },
            model: {
              sql: modelAnswersSql,
              result: [{ error: "N/A" }] // Wrap in array for consistency
            }
          }]);
        }
      } else {
        showSuccess("Assignment graded successfully!");
        const gradedResults = data.results.map((item: QueryResult) => {
          // The edge function now returns question IDs in 'Q#' format, so no further normalization needed here.
          const grade = calculateQuestionGrade(
            item.question, // item.question should now be 'Q1', 'Q2', etc.
            item.student.sql,
            item.model.sql,
            item.student.result,
            item.model.result
          );
          return { ...item, grade };
        });
        setGradingResults(gradedResults);

        // Calculate total score
        let currentTotalScore = 0;
        let currentTotalMaxScore = 0;
        gradedResults.forEach((item: QueryResult) => {
          if (item.grade) {
            currentTotalScore += item.grade.score;
            currentTotalMaxScore += item.grade.maxScore;
          }
        });
        setTotalScore(currentTotalScore);
        setTotalMaxScore(currentTotalMaxScore);
      }
    } catch (error: any) {
      console.error("Client-side grading error:", error);
      showError(`An unexpected error occurred: ${error.message}`);
      setGradingResults([{
        question: "Overall Grading Error",
        student: {
          sql: studentSql,
          result: [{ error: error.message }] // Wrap in array for consistency
        },
        model: {
          sql: modelAnswersSql,
          result: [{ error: "N/A" }] // Wrap in array for consistency
        }
      }]);
    } finally {
      setIsGrading(false);
    }
  };

  const percentage = totalMaxScore > 0 ? ((totalScore / totalMaxScore) * 100).toFixed(1) : "0.0";

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-4 md:p-8">
      <h1 className="text-4xl font-bold text-center mb-8">SQL Assignment 2 Grader</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Upload Student SQL File</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Label htmlFor="student-sql-file">Choose a .txt or .sql file</Label>
          <Input
            id="student-sql-file"
            type="file"
            accept=".txt,.sql"
            onChange={handleFileUpload}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-primary file:text-primary-foreground
              hover:file:bg-primary/90"
          />
          {fileName && <p className="text-sm text-muted-foreground">Uploaded: {fileName}</p>}
          
          <Textarea
            placeholder="Student's SQL will appear here after upload..."
            value={studentSql}
            onChange={(e) => setStudentSql(e.target.value)} // Changed from setSqlInput
            rows={7}
            className="font-mono text-sm"
          />
          
          <Button 
            onClick={handleGradeAssignment} 
            className="w-full" 
            disabled={isGrading}
          >
            {isGrading ? "Grading..." : "Grade Assignment"}
          </Button>
        </CardContent>
      </Card>

      {gradingResults && (
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              Grading Results
              <Badge variant="default" className="text-lg px-4 py-2">
                Total Score: {totalScore.toFixed(1)} / {totalMaxScore.toFixed(1)} = {percentage}%
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {gradingResults.map((item, index) => (
              <div 
                key={index} 
                className="border p-4 rounded-md" 
                style={{ backgroundColor: 'white' }}
              >
                <h3 className="text-lg font-semibold mb-2 flex justify-between items-center">
                  {displayQuestionTitle(item.question)}
                  {item.grade && (
                    <Badge variant="outline" className="text-md px-3 py-1">
                      Score: {item.grade.score.toFixed(1)} / {item.grade.maxScore.toFixed(1)}
                    </Badge>
                  )}
                </h3>
                
                {item.grade && (
                  <div className="mb-4">
                    <h4 className="font-medium text-md mb-1">Feedback:</h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground">
                      {item.grade.feedback.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium mt-2">Student's SQL:</h5>
                    <Textarea
                      value={item.student.sql}
                      readOnly
                      rows={10}
                      className="font-mono text-sm bg-background resize"
                    />
                  </div>
                  
                  <div>
                    <h5 className="font-medium mt-2">Model Answer SQL:</h5>
                    <Textarea
                      value={item.model.sql}
                      readOnly
                      rows={10}
                      className="font-mono text-sm bg-background resize"
                    />
                  </div>
                </div>
                
                {index < gradingResults.length - 1 && <Separator className="my-4" />}
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AssignmentGrader;