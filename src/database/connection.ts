import { AppDataSource } from "./config/config.js";
import { UserEntity } from "./entity/system/User";
import { seed } from "./seeds/parse_data.js";

const jackboxUser = await UserEntity.findOneBy({ username: "jackbox" });

if (!jackboxUser) {
  await seed();
}

export default AppDataSource;
