import { revalidateTag } from "next/cache";

export async function GET(request) {
  revalidateTag("recent-notices");
  return Response.json({ message: "Notices Revalidated Successfully!" });
}
