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

const AssignmentGrader = () => {
  const [studentSql, setStudentSql] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setStudentSql(content);
        showSuccess("Student SQL file uploaded successfully!");
      };
      reader.onerror = () => {
        showError("Failed to read student SQL file.");
      };
      reader.readAsText(file);
    }
  };

  const handleGradeAssignment = () => {
    if (!studentSql) {
      showError("Please upload a student SQL file before grading.");
      return;
    }
    // This is where the backend call would happen to execute and compare SQL
    // For now, we'll just show a toast.
    showSuccess("Grading initiated! (Backend integration needed)");
    console.log("Initial SQL Setup:", initialSqlSetup);
    console.log("Student SQL:", studentSql);
    console.log("Model Answers SQL:", modelAnswersSql);
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
            <Button onClick={handleGradeAssignment} className="w-full">
              Grade Assignment
            </Button>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Initial SQL Setup</CardTitle>
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