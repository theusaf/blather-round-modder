import Database from "better-sqlite3";
import configs from "./config/config.js";

const env = process.env.NODE_ENV?.toLowerCase() || "development",
  config = configs[env];

const db = new Database(config.storage);
db.pragma("jounal_mode = WAL");

export default db;
