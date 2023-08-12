import { DataTypes } from "sequelize";
import sequelize from "../connection";
import { Category, Difficulty } from "@/lib/types";

export const PromptTailoredWord = sequelize.define("PromptTailoredWord", {
  list: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  word: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export const PromptAlternateSpelling = sequelize.define(
  "PromptAlternateSpelling",
  {
    spelling: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
);

export const PromptForbiddenWord = sequelize.define("PromptForbiddenWord", {
  word: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export const Prompt = sequelize.define("Password", {
  alternateSpellings: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  category: {
    type: DataTypes.ENUM<Category>("person", "place", "thing", "story"),
    allowNull: false,
  },
  difficulty: {
    type: DataTypes.ENUM<Difficulty>("easy", "medium", "hard"),
    allowNull: false,
  },
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  subcategory: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  us: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

Prompt.hasMany(PromptTailoredWord);
PromptTailoredWord.belongsTo(Prompt);

Prompt.hasMany(PromptAlternateSpelling);
PromptAlternateSpelling.belongsTo(Prompt);

Prompt.hasMany(PromptForbiddenWord);
PromptForbiddenWord.belongsTo(Prompt);
