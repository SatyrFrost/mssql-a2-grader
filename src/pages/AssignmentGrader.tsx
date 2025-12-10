"use client";
import React, { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { initialSqlSetup } from "@/data/initialSqlSetup";
import { modelAnswersSql } from "@/data/modelAnswersSql";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { showSuccess, showError } from "@/utils/toast";
import { supabase } from "@/integrations/supabase/client";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { markingSchedule } from "@/data/markingSchedule"; // Import the parsed marking schedule

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
  const [studentSql, setStudentSql] = useState<string>("");
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
    const match = questionText.match(/--(Q\d+)/);
    if (match && match[1]) {
      return `Question ${match[1].substring(1)}`; // Extract just the number from Q1, Q2, etc.
    }
    return questionText; // Fallback if format doesn't match
  };

  // Function to calculate grade for a single question
  const calculateQuestionGrade = (
    questionId: string,
    studentSql: string,
    modelSql: string,
    studentResult: any, // This can now be an array
    modelResult: any // This can now be an array
  ): { score: number; maxScore: number; feedback: string[] } => {
    let score = 0;
    let maxScore = 0;
    const feedback: string[] = [];
    const questionMarking = markingSchedule[questionId];

    if (!questionMarking) {
      feedback.push(`No marking schedule found for ${questionId}.`);
      return { score: 0, maxScore: 0, feedback };
    }

    const studentSqlLower = studentSql.toLowerCase();
    const normalizedStudentSql = normalizeSqlForComparison(studentSql);

    for (const [keyword, points] of Object.entries(questionMarking)) {
      maxScore += points; // This is where maxScore is accumulated
      
      // Handle regex-based keywords with unique identifiers
      if (keyword.startsWith('REGEX::')) {
        const parts = keyword.split('::');
        // Extract the actual regex pattern, skipping the 'REGEX' prefix and the unique ID
        const regexPattern = parts.length > 2 ? parts.slice(2).join('::') : parts[1]; 
        try {
          const regex = new RegExp(regexPattern, 'is'); // 's' flag for dotall, 'i' for case-insensitive
          if (regex.test(studentSql)) { // Test against the full studentSql
            score += points;
            feedback.push(`+${points} for matching pattern: \`${regexPattern}\`.`);
          } else {
            feedback.push(`-0 for not matching pattern: \`${regexPattern}\`.`);
          }
        } catch (e: any) {
          feedback.push(`Error in regex pattern '${regexPattern}': ${e.message}`);
        }
        continue; // Move to the next keyword
      }

      // Existing logic for non-regex keywords (Q1-Q10)
      if (keyword === '[labels]') {
        // Special handling for Q5 aliases: check for presence of 'AS' keywords
        if (questionId === 'Q5') {
          const selectClauseMatch = studentSql.match(/SELECT\s+(.*?)\s+FROM/is);
          if (selectClauseMatch && selectClauseMatch[1]) {
            const selectContent = selectClauseMatch[1];
            const asCount = (selectContent.match(/\bAS\b/gi) || []).length;
            if (asCount >= 5) { // Expecting 5 aliases for Q5 aggregate functions
              score += points;
              feedback.push(`+${points} for correctly including aliases for aggregate functions.`);
            } else {
              feedback.push(`-0 for missing or insufficient aliases for aggregate functions.`);
            }
          } else {
            feedback.push(`-0 for labels (could not parse SELECT clause for alias check).`);
          }
        } else {
          // For other questions, if [labels] is used, it might still imply hash comparison
          // but for now, we'll treat it as a general output correctness check.
          // Given the user's feedback, we'll make this lenient.
          // For now, if it's not Q5, we'll just give the point if the query executed without error.
          const studentHasError = Array.isArray(studentResult) ? studentResult.some(r => r?.error) : studentResult?.error;
          if (!studentHasError) {
             score += points;
             feedback.push(`+${points} for labels (query executed successfully).`);
          } else {
             feedback.push(`-0 for labels (query execution failed).`);
          }
        }
      } else if (keyword.startsWith('JOIN ')) {
        const joinNumber = parseInt(keyword.split(' ')[1]);
        const joinCount = countKeywordOccurrences(studentSqlLower, 'join');
        if (joinCount >= joinNumber) {
          score += points;
          feedback.push(`+${points} for including at least ${joinNumber} 'JOIN' clause(s).`);
        } else {
          feedback.push(`-0 for missing the ${joinNumber}${joinNumber === 1 ? 'st' : joinNumber === 2 ? 'nd' : 'th'} 'JOIN' clause.`);
        }
      } else if (keyword.startsWith('AND ')) {
        const andNumber = parseInt(keyword.split(' ')[1]);
        const andCount = countKeywordOccurrences(studentSqlLower, 'and');
        if (andCount >= andNumber) {
          score += points;
          feedback.push(`+${points} for including at least ${andNumber} 'AND' clause(s).`);
        } else {
          feedback.push(`-0 for missing the ${andNumber}${andNumber === 1 ? 'st' : andNumber === 2 ? 'nd' : 'th'} 'AND' clause.`);
        }
      } else if (keyword === 'WHERE .. NOT IN') {
        if (studentSqlLower.includes('where') && studentSqlLower.includes('not in')) {
          score += points;
          feedback.push(`+${points} for 'WHERE ... NOT IN' clause.`);
        } else {
          feedback.push(`-0 for missing 'WHERE ... NOT IN' clause.`);
        }
      } else if (keyword === 'Subquery') {
        const expectedSubquery = normalizeSqlForComparison('SELECT ProductID FROM OrdersProduct');
        if (normalizedStudentSql.includes(expectedSubquery)) {
          score += points;
          feedback.push(`+${points} for correct subquery '${expectedSubquery}'.`);
        } else {
          feedback.push(`-0 for missing or incorrect subquery '${expectedSubquery}'.`);
        }
      }
      else if (studentSqlLower.includes(keyword.toLowerCase())) { // FIX: Changed keywordLower to keyword.toLowerCase()
        score += points;
        feedback.push(`+${points} for '${keyword}'.`);
      } else {
        feedback.push(`-0 for missing '${keyword}'.`);
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
        const content = e.target?.result as string;
        setStudentSql(content);
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
    if (!studentSql) {
      showError("Please upload a student SQL file before grading.");
      return;
    }
    
    setIsGrading(true);
    setGradingResults(null); // Clear previous results
    setTotalScore(0);
    setTotalMaxScore(0);
    
    try {
      console.log("Calling edge function with payload sizes:", {
        studentSqlLength: studentSql.length,
        modelAnswersSqlLength: modelAnswersSql.length,
        initialSqlSetupLength: initialSqlSetup.length
      });
      
      const { data, error } = await supabase.functions.invoke('grade-assignment', {
        body: {
          studentSql,
          modelAnswersSql,
          initialSqlSetup,
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
          // Extract question ID like "Q1", "Q2", etc. from "--Q1", "--Q2", etc.
          const questionIdMatch = item.question.match(/--(Q\d+)/);
          const questionId = questionIdMatch ? questionIdMatch[1] : item.question; // Fallback to full question text if no match
          
          const grade = calculateQuestionGrade(
            questionId,
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

  const renderResult = (resultsArray: any) => { // Renamed parameter to reflect it's an array
    if (!resultsArray || resultsArray.length === 0) {
      return <p className="text-muted-foreground">No query executed or result available.</p>;
    }
    
    // If it's a single result (e.g., for simple SELECTs), wrap it in an array for consistency
    const actualResults = Array.isArray(resultsArray) ? resultsArray : [resultsArray];

    return (
      <ScrollArea className="h-40 w-full border rounded-md p-2 bg-background space-y-2">
        {actualResults.map((result, idx) => (
          <div key={idx} className="pb-2 border-b last:border-b-0 border-muted-foreground/20">
            {result.error ? (
              <div className="text-red-500 text-sm">
                <p>Error (Part {idx + 1}): {result.error}</p>
                {result.sqlstate && <p>SQLSTATE: {result.sqlstate}</p>}
              </div>
            ) : result.status === 'success' ? (
              <p className="text-green-600 text-sm">Part {idx + 1}: Query executed successfully.</p>
            ) : result.hash ? (
              <div className="text-sm">
                <p>Part {idx + 1} Query Hash: <code className="font-mono text-xs">{result.hash.substring(0, 10)}...</code></p>
                <p className="text-muted-foreground">Simulated output based on query content.</p>
              </div>
            ) : (
              <pre className="text-xs whitespace-pre-wrap">Part {idx + 1}: {JSON.stringify(result, null, 2)}</pre>
            )}
          </div>
        ))}
      </ScrollArea>
    );
  };

  return (
    <ScrollArea className="h-screen w-full p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center mb-8">SQL Assignment Grader</h1>
        
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
              onChange={(e) => setStudentSql(e.target.value)}
              rows={15}
              className="font-mono text-sm"
            />
            
            <Button 
              onClick={handleGradeAssignment} 
              className="w-full" 
              disabled={isGrading}
            >
              {isGrading ? "Grading..." : "Grade Assignment"}
            </Button>
            <p className="text-sm text-muted-foreground">
              Note: For T-SQL procedural questions (Q11-Q15), variable names (starting with '@') are flexible and do not need to match the model answer exactly, as long as the overall structure and data types are correct.
            </p>
          </CardContent>
        </Card>

        {gradingResults && (
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                Grading Results
                <Badge variant="default" className="text-lg px-4 py-2">
                  Total Score: {totalScore.toFixed(1)} / {totalMaxScore.toFixed(1)}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {gradingResults.map((item, index) => (
                <div key={index} className="border p-4 rounded-md bg-muted/20">
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
                      <h4 className="font-medium flex items-center gap-2">
                        Student's Output
                        <Badge variant="secondary">Query {index + 1}</Badge>
                      </h4>
                      {renderResult(item.student.result)}
                      
                      <h5 className="font-medium mt-2">Student's SQL:</h5>
                      <ScrollArea className="h-20 w-full border rounded-md p-2 bg-background">
                        <pre className="text-xs whitespace-pre-wrap">{item.student.sql}</pre>
                      </ScrollArea>
                    </div>
                    
                    <div>
                      <h4 className="font-medium flex items-center gap-2">
                        Model Answer Output
                        <Badge variant="secondary">Query {index + 1}</Badge>
                      </h4>
                      {renderResult(item.model.result)}
                      
                      <h5 className="font-medium mt-2">Model Answer SQL:</h5>
                      <ScrollArea className="h-20 w-full border rounded-md p-2 bg-background">
                        <pre className="text-xs whitespace-pre-wrap">{item.model.sql}</pre>
                      </ScrollArea>
                    </div>
                  </div>
                  
                  {index < gradingResults.length - 1 && <Separator className="my-4" />}
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Initial SQL Setup (PostgreSQL)</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={initialSqlSetup}
                readOnly
                rows={20}
                className="font-mono text-sm bg-muted/50"
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Model Answers SQL</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={modelAnswersSql}
                readOnly
                rows={20}
                className="font-mono text-sm bg-muted/50"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </ScrollArea>
  );
};

export default AssignmentGrader;