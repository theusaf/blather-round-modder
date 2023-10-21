-- CreateTable
CREATE TABLE "project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "lastUpdated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "public" BOOLEAN NOT NULL DEFAULT false,
    "ownerUsername" TEXT NOT NULL,
    CONSTRAINT "project_ownerUsername_fkey" FOREIGN KEY ("ownerUsername") REFERENCES "user" ("username") ON DELETE CASCADE ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "prompt" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "category" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "subcategory" TEXT,
    "us" BOOLEAN NOT NULL,
    "projectId" INTEGER NOT NULL,
    CONSTRAINT "prompt_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "prompt_alternate_spelling" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" TEXT NOT NULL,
    "promptId" INTEGER NOT NULL,
    CONSTRAINT "prompt_alternate_spelling_promptId_fkey" FOREIGN KEY ("promptId") REFERENCES "prompt" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "prompt_forbidden_word" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" TEXT NOT NULL,
    "promptId" INTEGER NOT NULL,
    CONSTRAINT "prompt_forbidden_word_promptId_fkey" FOREIGN KEY ("promptId") REFERENCES "prompt" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "prompt_tailored_word" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "list" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "promptId" INTEGER NOT NULL,
    CONSTRAINT "prompt_tailored_word_promptId_fkey" FOREIGN KEY ("promptId") REFERENCES "prompt" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "sentence_structure" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "category" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,
    CONSTRAINT "sentence_structure_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "sentence_structure_structure" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" TEXT NOT NULL,
    "sentenceStructureId" INTEGER NOT NULL,
    CONSTRAINT "sentence_structure_structure_sentenceStructureId_fkey" FOREIGN KEY ("sentenceStructureId") REFERENCES "sentence_structure" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "user" (
    "username" TEXT NOT NULL PRIMARY KEY,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "salt" TEXT
);

-- CreateTable
CREATE TABLE "word_list" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "amount" INTEGER,
    "maxChoices" INTEGER,
    "name" TEXT NOT NULL,
    "optional" BOOLEAN NOT NULL,
    "placeholder" TEXT,
    "projectId" INTEGER NOT NULL,
    CONSTRAINT "word_list_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "word_list_word" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "alwaysChoose" BOOLEAN NOT NULL,
    "word" TEXT NOT NULL,
    "wordListId" INTEGER NOT NULL,
    CONSTRAINT "word_list_word_wordListId_fkey" FOREIGN KEY ("wordListId") REFERENCES "word_list" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "user_sesion" (
    "session_id" TEXT NOT NULL PRIMARY KEY,
    "expires" INTEGER NOT NULL,
    "user_username" TEXT NOT NULL
);

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_project_1" ON "project"("ownerUsername", "name");
Pragma writable_schema=0;

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_prompt_1" ON "prompt"("projectId", "password");
Pragma writable_schema=0;

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_prompt_alternate_spelling_1" ON "prompt_alternate_spelling"("promptId", "value");
Pragma writable_schema=0;

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_prompt_forbidden_word_1" ON "prompt_forbidden_word"("promptId", "value");
Pragma writable_schema=0;

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_word_list_1" ON "word_list"("projectId", "name");
Pragma writable_schema=0;

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_word_list_word_1" ON "word_list_word"("wordListId", "word");
Pragma writable_schema=0;
