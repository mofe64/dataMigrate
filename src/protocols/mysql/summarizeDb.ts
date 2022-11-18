import mysql from "mysql2/promise";
import { mySqlConnectionParams } from "./summarizeDb.interface";

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
  const connection = await createConnection(params);
  getExistingTables(connection);
  await connection.end();
};
const getExistingTables = async (connection: mysql.Connection) => {
  const tables = await connection.execute("show tables");
  console.log(tables);
};
