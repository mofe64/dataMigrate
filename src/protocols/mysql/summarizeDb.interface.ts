export interface mySqlConnectionParams {
  host: string;
  user: string;
  password: string;
  database: string;
}

export interface showTableResult {
  [tableName: string]: string;
}

export interface showCreateTableResult {
  Table: string;
  "Create Table": string;
}
