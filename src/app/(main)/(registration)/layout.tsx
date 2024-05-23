import { ReactNode } from "react";

export default function RegistrationLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex justify-center bg-slate-300 h-full">
      <div className="w-9/12 md:w-[32rem] p-4 bg-slate-50 rounded-xl border-slate-400 border-2 h-min my-6">
        {children}
      </div>
    </div>
  );
}
