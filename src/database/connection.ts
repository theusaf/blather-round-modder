import { AppDataSource } from "./config/config.js";
import { UserEntity } from "./entity/system/User.js";
import { seed } from "./seeds/parse_data.js";

if (!AppDataSource.isInitialized) {
  await AppDataSource.initialize();
}

const jackboxUser = await UserEntity.findOneBy({ username: "jackbox" });

if (!jackboxUser) await seed();

export default AppDataSource;
