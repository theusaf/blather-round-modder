import { ProjectType } from "@/lib/types/project";
import ProjectLoadHandler from "./_components/ProjectLoadHandler";
import NavBar from "./_components/NavBar";

export default function EditProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const initialProject: ProjectType = {
    id: "test-project",
    likes: 0,
    name: "Test Project",
    description: "This is a test project",
    public: false,
    ownerId: "test-user",
    prompts: [
      {
        alternateSpellings: ["hi"],
        category: "thing",
        difficulty: "easy",
        forbiddenWords: ["bye"],
        id: "000",
        password: "hello",
        subcategory: "",
        tailoredWords: [
          {
            list: "<yeet>",
            word: "greeting",
          },
        ],
        us: false,
      },
    ],
    sentenceStructures: [
      {
        category: "thing",
        id: "000",
        structures: ["The <thing> is <color>."],
      },
    ],
    wordLists: [
      {
        amount: "",
        id: "000",
        maxChoices: "",
        name: "thing",
        optional: false,
        placeholder: "",
        words: [
          {
            alwaysChoose: false,
            word: "Hello!",
          },
        ],
      },
    ],
  };
  return (
    <ProjectLoadHandler project={initialProject}>
      <NavBar />
      <div className="p-2">
        <h1 className="text-2xl font-bold">Edit Project</h1>
      </div>
    </ProjectLoadHandler>
  );
}
