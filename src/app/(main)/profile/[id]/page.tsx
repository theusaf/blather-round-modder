import "server-only";

export default function ProfilePage({ params }: { params: { id: string } }) {
  return (
    <main className="p-2">
      <h1 className="text-2xl font-bold">
        <span>{params.id}</span>'s Projects
      </h1>
    </main>
  );
}
