import prompt from "prompt-sync";
import { summarize } from "./protocols/mysql/summarizeDb";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });

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
const mode = process.env.node_env;
if (mode === "dev") {
  summarize({
    host: "localhost",
    user: "root",
    password: "",
    database: "rental_system",
  });
} else {
  collectParams();
}
