import { revalidatePath } from "next/cache";

export default function revalidateProjectPaths(username: string) {
  revalidatePath("/projects");
  revalidatePath(`/profile/${encodeURIComponent(username)}`);
}
