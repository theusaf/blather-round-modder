import { ResolvingMetadata } from "next";
import { ReactNode } from "react";

export async function generateMetadata(_: unknown, parent: ResolvingMetadata) {
  return {
    title: `${(await parent).title?.absolute} - Log in`,
  };
}

export default function ({ children }: { children: ReactNode }) {
  return children;
}
