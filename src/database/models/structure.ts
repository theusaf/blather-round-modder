import { DataTypes } from "sequelize";
import sequelize from "../connection";
import { Category } from "@/lib/types";

export const SentenceStructureString = sequelize.define(
  "SentenceStructureString",
  {
    string: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
);

export const SentenceStructure = sequelize.define("SentenceStructure", {
  category: {
    type: DataTypes.ENUM<Category | "response">(
      "person",
      "place",
      "thing",
      "story",
      "response",
    ),
    allowNull: false,
  },
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
});

SentenceStructure.hasMany(SentenceStructureString);
SentenceStructureString.belongsTo(SentenceStructure);
