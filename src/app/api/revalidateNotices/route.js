import { revalidateTag } from "next/cache";

export async function GET(request) {
  revalidateTag("notices");
  return Response.json({ message: "Notices Revalidated Successfully!" });
}
