// db.ts
"use client";

import { initSqlJs, Database, SqlJsStatic } from "sql.js"; // 1. Named import
const sqlWasm = "/sqlite3.wasm"; // 2. Static asset path for the correct file name


let SQL: SqlJsStatic | null = null;
let db: Database | null = null;

// Function to initialize the database with a given SQL setup script
export async function initializeDatabase(setupSql: string): Promise<void> {
  if (!SQL) {
    SQL = await initSqlJs({ locateFile: () => sqlWasm });
  }

  if (db) {
    db.close(); // Close existing database if any
  }
  db = new SQL.Database();

  try {
    db.exec(setupSql);
    console.log("Database initialized successfully with schema and data.");
  } catch (error: any) {
    console.error("Error initializing database:", error);
    throw new Error(`Database initialization failed: ${error.message}`);
  }
}

// Function to execute a SQL query and return results
export function executeQuery(sql: string): { columns: string[]; values: any[][] } | { error: string } {
  if (!db) {
    return { error: "Database not initialized. Please initialize it first." };
  }

  // Preprocess SQL to handle optional semicolons for single statements
  let processedSql = sql.trim();
  if (processedSql.length > 0 && !processedSql.endsWith(';') && !processedSql.toLowerCase().includes('go')) {
    // Only add semicolon if it's likely a single statement and doesn't contain 'GO'
    // 'GO' is an MS SQL batch separator, not standard SQL, and sql.js won't understand it.
    // For multi-statement queries without 'GO', sql.js will only execute the first one.
    processedSql += ';';
  }

  try {
    const res = db.exec(processedSql);
    if (res.length > 0) {
      return { columns: res[0].columns, values: res[0].values };
    } else {
      // For non-SELECT statements (INSERT, UPDATE, DELETE, DDL), res.length will be 0
      // We can return a success message or empty result.
      return { columns: [], values: [] };
    }
  } catch (error: any) {
    console.error("Error executing query:", error);
    return { error: error.message };
  }
}

// Function to close the database
export function closeDatabase(): void {
  if (db) {
    db.close();
    db = null;
    SQL = null;
    console.log("Database closed.");
  }
}