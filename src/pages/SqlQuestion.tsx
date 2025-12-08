"use client";

import React, { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { initializeDatabase, executeQuery, closeDatabase } from "@/integrations/sqljs/db";
import { sqlQuestionSetup } from "@/data/sqlQuestionSetup";
import { showSuccess, showError } from "@/utils/toast";
import { MadeWithDyad } from "@/components/made-with-dyad";

interface QueryResult {
  columns: string[];
  values: any[][];
  error?: string;
}

const SqlQuestion = () => {
  const [sqlInput, setSqlInput] = useState<string>("");
  const [queryResult, setQueryResult] = useState<QueryResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const setupDb = async () => {
      try {
        await initializeDatabase(sqlQuestionSetup);
        showSuccess("Database ready! You can now run SQL queries.");
      } catch (err: any) {
        showError(`Failed to initialize database: ${err.message}`);
        setQueryResult({ columns: [], values: [], error: `Database initialization failed: ${err.message}` });
      } finally {
        setIsLoading(false);
      }
    };

    setupDb();

    return () => {
      closeDatabase();
    };
  }, []);

  const handleRunQuery = () => {
    if (!sqlInput.trim()) {
      showError("Please enter an SQL query to run.");
      return;
    }

    const result = executeQuery(sqlInput);
    if ("error" in result) {
      showError(`SQL Error: ${result.error}`);
      setQueryResult({ columns: [], values: [], error: result.error });
    } else {
      showSuccess("Query executed successfully!");
      setQueryResult(result);
    }
  };

  const renderTable = (result: QueryResult) => {
    if (result.error) {
      return <p className="text-red-500">Error: {result.error}</p>;
    }
    if (!result.columns || result.columns.length === 0) {
      return <p className="text-muted-foreground">No results returned (e.g., DDL/DML statement or empty SELECT).</p>;
    }

    return (
      <ScrollArea className="h-72 w-full border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              {result.columns.map((col, index) => (
                <TableHead key={index}>{col}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {result.values.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <TableCell key={cellIndex}>{String(cell)}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    );
  };

  return (
    <ScrollArea className="h-screen w-full p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center mb-8">SQL Question Editor</h1>

        <Card>
          <CardHeader>
            <CardTitle>Enter Your SQL Query</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Type your SQL query here (e.g., SELECT * FROM Customer;)"
              value={sqlInput}
              onChange={(e) => setSqlInput(e.target.value)}
              rows={10}
              className="font-mono text-sm"
              disabled={isLoading}
            />
            <Button onClick={handleRunQuery} className="w-full" disabled={isLoading}>
              {isLoading ? "Initializing Database..." : "Run Query"}
            </Button>
            {!isLoading && (
              <p className="text-sm text-muted-foreground">
                Note: For single statements, a semicolon is optional. For multiple statements, only the first will execute without semicolons.
              </p>
            )}
          </CardContent>
        </Card>

        {queryResult && (
          <Card>
            <CardHeader>
              <CardTitle>Query Results</CardTitle>
            </CardHeader>
            <CardContent>
              {renderTable(queryResult)}
            </CardContent>
          </Card>
        )}
        <MadeWithDyad />
      </div>
    </ScrollArea>
  );
};

export default SqlQuestion;