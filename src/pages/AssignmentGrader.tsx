"use client";

import React, { useState } from "react";
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

interface QueryResult {
  question: string;
  student: {
    sql: string;
    result: any;
  };
  model: {
    sql: string;
    result: any;
  };
}

const AssignmentGrader = () => {
  const [studentSql, setStudentSql] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [gradingResults, setGradingResults] = useState<QueryResult[] | null>(null);
  const [isGrading, setIsGrading] = useState<boolean>(false);

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

    try {
      const { data, error } = await supabase.functions.invoke('grade-assignment', {
        body: {
          studentSql,
          modelAnswersSql,
          initialSqlSetup,
        },
      });

      if (error) {
        showError(`Grading failed: ${error.message}`);
        console.error("Edge Function error:", error);
        setGradingResults([{
          question: "Overall Grading Error",
          student: { sql: studentSql, result: { error: error.message } },
          model: { sql: modelAnswersSql, result: { error: "N/A" } }
        }]);
      } else {
        showSuccess("Assignment graded successfully!");
        setGradingResults(data.results);
      }
    } catch (error: any) {
      showError(`An unexpected error occurred: ${error.message}`);
      console.error("Client-side grading error:", error);
      setGradingResults([{
        question: "Overall Grading Error",
        student: { sql: studentSql, result: { error: error.message } },
        model: { sql: modelAnswersSql, result: { error: "N/A" } }
      }]);
    } finally {
      setIsGrading(false);
    }
  };

  const renderResult = (result: any) => {
    if (result === null) {
      return <p className="text-muted-foreground">No query executed or result available.</p>;
    }
    if (result.error) {
      return (
        <div className="text-red-500 text-sm">
          <p>Error: {result.error}</p>
          {result.sqlstate && <p>SQLSTATE: {result.sqlstate}</p>}
        </div>
      );
    }
    if (result.status === 'success') {
      return <p className="text-green-600 text-sm">Query executed successfully.</p>;
    }
    if (Array.isArray(result)) {
      if (result.length === 0) {
        return <p className="text-muted-foreground">No rows returned.</p>;
      }
      return (
        <ScrollArea className="h-40 w-full border rounded-md p-2 bg-background">
          <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
        </ScrollArea>
      );
    }
    return (
      <ScrollArea className="h-40 w-full border rounded-md p-2 bg-background">
        <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
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
            <Button onClick={handleGradeAssignment} className="w-full" disabled={isGrading}>
              {isGrading ? "Grading..." : "Grade Assignment"}
            </Button>
          </CardContent>
        </Card>

        {gradingResults && (
          <Card>
            <CardHeader>
              <CardTitle>Grading Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {gradingResults.map((item, index) => (
                <div key={index} className="border p-4 rounded-md bg-muted/20">
                  <h3 className="text-lg font-semibold mb-2">{item.question}</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium flex items-center gap-2">
                        Student's Output <Badge variant="secondary">Query {index + 1}</Badge>
                      </h4>
                      {renderResult(item.student.result)}
                      <h5 className="font-medium mt-2">Student's SQL:</h5>
                      <ScrollArea className="h-20 w-full border rounded-md p-2 bg-background">
                        <pre className="text-xs whitespace-pre-wrap">{item.student.sql}</pre>
                      </ScrollArea>
                    </div>
                    <div>
                      <h4 className="font-medium flex items-center gap-2">
                        Model Answer Output <Badge variant="secondary">Query {index + 1}</Badge>
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