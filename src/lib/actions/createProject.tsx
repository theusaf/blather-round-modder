"use server";
import { redirect } from "next/navigation";
import Project from "../database/models/project";
import { getUserSession } from "../util/auth";
import { getBaseProject } from "../util/getBaseProject";

export async function createProject(name: string, type: string) {
  const userSession = await getUserSession();
  if (!userSession) return;
  if (typeof name !== "string" || typeof type !== "string") return;
  const project = new Project({
    name,
    public: false,
    ownerId: userSession.sub,
  });
  switch (type) {
    case "full": {
      const baseProject = await getBaseProject();
      project.prompts = baseProject.prompts;
      project.sentenceStructures = baseProject.sentenceStructures;
      project.wordLists = baseProject.wordLists;
      break;
    }
    case "scaffold": {
      const baseProject = await getBaseProject();
      project.sentenceStructures = baseProject.sentenceStructures;
      project.wordLists = baseProject.wordLists;
      break;
    }
    default: {
      project.wordLists = [
        {
          amount: "",
          id: "1",
          maxChoices: "",
          name: "response-sentence",
          optional: false,
          placeholder: "",
          words: [],
        },
        {
          amount: "",
          id: "1",
          maxChoices: "",
          name: "response-sentence-thing",
          optional: false,
          placeholder: "",
          words: [],
        },
        {
          amount: "",
          id: "1",
          maxChoices: "",
          name: "response-sentence-person",
          optional: false,
          placeholder: "",
          words: [],
        },
        {
          amount: "",
          id: "1",
          maxChoices: "",
          name: "response-sentence-place",
          optional: false,
          placeholder: "",
          words: [],
        },
        {
          amount: "",
          id: "1",
          maxChoices: "",
          name: "response-sentence-story",
          optional: false,
          placeholder: "",
          words: [],
        },
        {
          amount: "",
          id: "1",
          maxChoices: "",
          name: "response-sentence-clue",
          optional: false,
          placeholder: "",
          words: [],
        },
      ];
      project.sentenceStructures = [
        {
          category: "thing",
          id: "1",
          structures: [],
        },
        {
          category: "person",
          id: "2",
          structures: [],
        },
        {
          category: "place",
          id: "3",
          structures: [],
        },
        {
          category: "story",
          id: "4",
          structures: [],
        },
        {
          category: "response",
          id: "5",
          structures: ["<response-sentence> <PLAYERGUESS>"],
        },
      ];
    }
  }
  await project.save();
  redirect(`/project/${project.id}/edit`);
}
