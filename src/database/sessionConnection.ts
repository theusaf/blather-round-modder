import { SessionDataSource } from "./config/sessionConfig.js";

if (!SessionDataSource.isInitialized) {
  await SessionDataSource.initialize();
}

export default SessionDataSource;
