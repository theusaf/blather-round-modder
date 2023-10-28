-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "lastUpdated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "public" BOOLEAN NOT NULL DEFAULT false,
    "ownerUsername" TEXT NOT NULL,
    "likes" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "project_ownerUsername_fkey" FOREIGN KEY ("ownerUsername") REFERENCES "user" ("username") ON DELETE CASCADE ON UPDATE NO ACTION
);
INSERT INTO "new_project" ("description", "id", "lastUpdated", "name", "ownerUsername", "public") SELECT "description", "id", "lastUpdated", "name", "ownerUsername", "public" FROM "project";
DROP TABLE "project";
ALTER TABLE "new_project" RENAME TO "project";
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_project_1" ON "project"("ownerUsername", "name");
Pragma writable_schema=0;
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
