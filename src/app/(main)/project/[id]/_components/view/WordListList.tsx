import SectionCard from "@/lib/components/SectionCard";
import type { WordListType } from "@/lib/types/blather";
import { ItemBlock } from "./ItemBlock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export function WordListList({ wordLists }: { wordLists: WordListType[] }) {
	return (
		<div className="flex flex-col gap-2 mt-2 overflow-auto h-full">
			{wordLists.map((list) => {
				const { id, name, words } = list;
				return (
					<SectionCard key={id}>
						<details>
							<summary>
								<div className="inline-flex gap-2">
									<span className="font-medium">{name}</span>
								</div>
							</summary>
							<div className="grid gap-1 grid-cols-1">
								{!!words.length && (
									<div>
										<h6 className="font-medium">Tailored Words</h6>
										<div className="flex gap-1 flex-wrap">
											{words.map((word, i) => (
												<ItemBlock key={`${word}-${i}`}>
													<span>{word.word}</span>
													{word.alwaysChoose && (
														<FontAwesomeIcon className="ml-1" icon={faCheck} />
													)}
												</ItemBlock>
											))}
										</div>
									</div>
								)}
							</div>
						</details>
					</SectionCard>
				);
			})}
		</div>
	);
}
