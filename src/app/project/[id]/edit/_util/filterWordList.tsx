import { WordListType } from "@/lib/types/blather";

export function filterWordList(list: WordListType, search: string) {
  return (
    list.name.toLowerCase().includes(search.toLowerCase()) ||
    list.words.some((word) => {
      return word.word.toLowerCase().includes(search.toLowerCase());
    })
  );
}
