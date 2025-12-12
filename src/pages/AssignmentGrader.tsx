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
import { markingSchedule } from "@/data/markingSchedule"; // Import the new marking schedule object

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
    studentResult: any,
    modelResult: any
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

    for (const [ruleName, ruleDefinition] of Object.entries(questionMarking)) {
      if (typeof ruleDefinition === 'number') {
        // This is a simple keyword match or special case like [labels]
        maxScore += ruleDefinition; // Add points to maxScore

        if (ruleName === '[labels]') {
          // Special handling for Q5 aliases: check for presence of 'AS' keywords
          if (questionId === 'Q5') {
            const selectClauseMatch = studentSql.match(/SELECT\s+(.*?)\s+FROM/is);
            if (selectClauseMatch && selectClauseMatch[1]) {
              const selectContent = selectClauseMatch[1];
              const asCount = (selectContent.match(/\bAS\b/gi) || []).length;
              if (asCount >= 5) { // Expecting 5 aliases for Q5 aggregate functions
                score += ruleDefinition;
                feedback.push(`+${ruleDefinition} for correctly including aliases for aggregate functions.`);
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
               score += ruleDefinition;
               feedback.push(`+${ruleDefinition} for labels (query executed successfully).`);
            } else {
               feedback.push(`-0 for labels (query execution failed).`);
            }
          }
        } else if (ruleName === 'JOIN' && questionId === 'Q4') { // Specific check for Q4's JOIN rule
          const joinCount = countKeywordOccurrences(studentSqlLower, 'join');
          if (joinCount >= 1) { // Check for at least one JOIN
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
        } else if (studentSqlLower.includes(ruleName.toLowerCase())) {
          score += ruleDefinition;
          feedback.push(`+${ruleDefinition} for '${ruleName}'.`);
        } else {
          feedback.push(`-0 for missing '${ruleName}'.`);
        }
      } else if (typeof ruleDefinition === 'object' && ruleDefinition !== null && 'regex' in ruleDefinition && 'weight' in ruleDefinition) {
        // This is a REGEX rule
        maxScore += ruleDefinition.weight; // Add points to maxScore
        try {
          const regex = new RegExp(ruleDefinition.regex, 'is'); // 's' flag for dotall, 'i' for case-insensitive
          if (regex.test(studentSql)) { // Test against the full studentSql
            score += ruleDefinition.weight;
            feedback.push(`+${ruleDefinition.weight} for matching pattern: \`${ruleDefinition.regex}\`.`);
          } else {
            feedback.push(`-0 for not matching pattern: \`${ruleDefinition.regex}\`.`);
          }
        } catch (e: any) {
          feedback.push(`Error in regex pattern '${ruleDefinition.regex}': ${e.message}`);
        }
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

  return (
    <ScrollArea className="h-screen w-full p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
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
    </ScrollArea>
  );
};

export default AssignmentGrader;