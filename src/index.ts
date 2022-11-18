import prompt from "prompt-sync";
import { summarize } from "./protocols/mysql/summarizeDb";

const collectParams = async () => {
  const promptSync = prompt({ sigint: true });
  const username = promptSync("Enter username");
  const host = promptSync("Enter hostname");
  const password = promptSync("Enter password");
  const database = promptSync("Enter database");

  summarize({
    host: host,
    user: username,
    password: password,
    database: database,
  });
};

console.log("Welcome....");
collectParams();
