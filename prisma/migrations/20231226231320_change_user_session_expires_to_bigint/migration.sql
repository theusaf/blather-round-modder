/*
  Warnings:

  - You are about to alter the column `expires` on the `user_sesion` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user_sesion" (
    "session_id" TEXT NOT NULL PRIMARY KEY,
    "expires" BIGINT NOT NULL,
    "user_username" TEXT NOT NULL
);
INSERT INTO "new_user_sesion" ("expires", "session_id", "user_username") SELECT "expires", "session_id", "user_username" FROM "user_sesion";
DROP TABLE "user_sesion";
ALTER TABLE "new_user_sesion" RENAME TO "user_sesion";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
