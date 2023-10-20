import { SessionDataSource } from "./config/sessionConfig.js";
import { seed } from "./seeds/parse_data.js";

if (!SessionDataSource.isInitialized) {
  await SessionDataSource.initialize();
}

export default SessionDataSource;
