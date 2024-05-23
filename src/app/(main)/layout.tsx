import { NavBar } from "./_components/NavBar";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-full">
      <NavBar />
      <div className="flex-1">{children}</div>
      <footer className="p-8 bg-lime-700 text-white">
        &copy; 2024 Daniel Lau
      </footer>
    </div>
  );
}
