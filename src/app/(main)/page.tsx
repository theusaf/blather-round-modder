import AnimatedHomeSection from "./_components/AnimatedHomeSection";

export default function Home() {
  return (
    <main className="p-2">
      <h1 className="text-2xl font-bold">Editor for Blather 'Round</h1>
      <div>
        <AnimatedHomeSection />
      </div>
      <article>more content</article>
    </main>
  );
}
