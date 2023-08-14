import { WordListType } from "@/lib/blather_types";
import { BaseWrapper } from "../base";
import { Project } from "../system/project";

class WordListWord extends BaseWrapper {}

export class WordList extends BaseWrapper<WordListType> {}

// WordList
WordList.tableName = "word_list";
WordList.attributeNames = ["amount", "max_choices", "name", "placeholder", "project", "words"];

WordList.belongsTo({
  attribute: "project",
  foreignKey: "project_id",
  cls: Project,
  mapper(model: Project) {
    return model.toJSON();
  }
});

WordList.hasMany({
  attribute: "words",
  foreignKey: "word_list_id",
  cls: WordListWord,
  mapper(model: WordListWord) {
    return model.toJSON();
  }
});

// WordListWord
WordListWord.tableName = "word_list_word";
WordListWord.attributeNames = ["word", "always_choose", "wordList"];

WordListWord.belongsTo({
  attribute: "wordList",
  foreignKey: "word_list_id",
  cls: WordList,
  mapper(model: WordList) {
    return model.toJSON();
  }
});
