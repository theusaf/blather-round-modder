import { redirect } from "@/lib/app/navigation";

export async function GET(req: Request, context: { params: { id: string } }) {
  return redirect(req, `/projects/new?from=${context.params.id}`, 301);
}
