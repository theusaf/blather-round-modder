import { dirname } from "node:path";
import { existsSync, mkdirSync } from "node:fs";
import Database from "better-sqlite3";
import configs from "./config/config.js";

const env = process.env.NODE_ENV?.toLowerCase() || "development",
  config = configs[env];

if (!existsSync(dirname(config.storage))) {
  mkdirSync(dirname(config.storage));
}

const db = new Database(config.storage);
db.pragma("jounal_mode = WAL");

export default db;
