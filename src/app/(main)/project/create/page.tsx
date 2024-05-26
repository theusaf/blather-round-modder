import SectionCard from "@/lib/components/SectionCard";
import { CreationForm } from "./_components/CreationForm";
import { decrypt } from "@/lib/util/session";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function CreateProjectPage() {
  const session = cookies().get("session");
  const userDetails = await decrypt(session?.value);

  return (
    <main className="p-2">
      <h1 className="text-2xl font-bold">Create New Project</h1>
      {userDetails ? (
        <div>
          <SectionCard className="md:w-4/5 m-auto mt-6 p-4">
            <CreationForm />
          </SectionCard>
        </div>
      ) : (
        <p>You must be <Link href="/login" className="underline">logged in</Link> to create a project.</p>
      )}
    </main>
  );
}
