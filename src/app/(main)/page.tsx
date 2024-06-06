import Link from "next/link";
import AnimatedHomeSection from "./_components/AnimatedHomeSection";

export default function Home() {
  return (
    <main className="p-2">
      <h1 className="text-2xl font-bold">Editor for Blather &apos;Round</h1>
      <p className="text-lg">
        Editor for Blather &apos;Round is a website which allows you to easily
        create and customize your Blather &apos;Round experience.
      </p>
      <article className="text-lg">
        <h3 className="text-xl font-bold">How to use</h3>
        <p>
          To get started,{" "}
          <Link href="/project/create" className="text-blue-400">
            create a project
          </Link>
          ! You may need to create an account or log in to get started.
        </p>
        <p>
          In addition, you can browse existing{" "}
          <Link href="/projects" className="text-blue-400">
            public projects
          </Link>{" "}
          to try out or start a new projects from.
        </p>
        <p className="mt-2">
          In the project editor, you can quickly switch and search through word
          lists and prompts. The editor also includes helpful tooltips to
          explain what each field does. Make sure to save your project to avoid
          losing changes by pressing the save button.
        </p>
      </article>
      <br />
      <div>
        <AnimatedHomeSection />
      </div>
    </main>
  );
}
