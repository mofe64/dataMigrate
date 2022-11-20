import mysql from "mysql2/promise";
import { ColumnSummary } from "./columnSummary";
import {
  mySqlConnectionParams,
  showCreateTableResult,
  showTableResult,
} from "./summarizeDb.interface";
import { Summary } from "./Summary";

let summary: Summary;

const createConnection = async (
  connectionParams: mySqlConnectionParams
): Promise<mysql.Connection> => {
  const newConnection = await mysql.createConnection({
    host: connectionParams.host,
    user: connectionParams.user,
    password: connectionParams.password,
    database: connectionParams.database,
  });
  return newConnection;
};

export const summarize = async (params: mySqlConnectionParams) => {
  summary = new Summary();
  const connection = await createConnection(params);
  const databaseName = connection.config.database as string;
  summary.databaseName = databaseName;
  const tables = await getExistingTables(connection);
  summary.tables = tables;
  await explainTable(tables[1], connection);
  await connection.end();
  console.log("database name --> ", summary.databaseName);
  console.log("database table --> ", summary.tables);
};

const getExistingTables = async (
  connection: mysql.Connection
): Promise<string[]> => {
  const result = await connection.execute("show tables");
  const databaseName = summary.databaseName;
  const tableResults: unknown = result[0];
  const tableList = tableResults as showTableResult[];
  const key = `Tables_in_${databaseName}`;
  const confirmedDatabaseTables: string[] = [];
  tableList.forEach((item) => {
    confirmedDatabaseTables.push(item[key]);
  });
  return confirmedDatabaseTables;
};
const explainTable = async (
  tableName: string,
  connection: mysql.Connection
) => {
  const result = await connection.execute(`show create table ${tableName}`);
  const createTableResultArr = result[0] as showCreateTableResult[];
  const createTableStatementUnprocessed =
    createTableResultArr[0]["Create Table"];
  const statementBreakdown = breakDownCreateTableStatement(
    createTableStatementUnprocessed
  );
  const columns: ColumnSummary[] = [];
  const keys: string[] = [];
  const constraints: string[] = [];

  statementBreakdown.forEach((statement) => {
    // console.log("statement is ", statement.trim());
    if (statement.startsWith("`")) {
      const column = prepareColumns(statement);
      columns.push(column);
    }
  });
};

const breakDownCreateTableStatement = (statement: string): string[] => {
  const processedStatements: string[] = [];
  let processedStatement = statement.replace("(", "");

  const indexOfClosingParantheses = processedStatement.lastIndexOf(")");
  processedStatement =
    processedStatement.slice(0, indexOfClosingParantheses) +
    processedStatement.slice(indexOfClosingParantheses + 1);
  const statementsArray = processedStatement.split(/\n/);
  statementsArray.forEach((statement) => {
    processedStatements.push(statement.trim());
  });
  return processedStatements;
};
const prepareColumns = (columnStatement: string): ColumnSummary => {
  const columnSummary = new ColumnSummary();
  const columnStatementParts = columnStatement.split(" ");
  console.log(columnStatementParts);
  const columnName = columnStatementParts[0];
  columnSummary.columnName = columnName;

  return columnSummary;
};
