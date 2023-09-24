import { utapi } from "uploadthing/server";

export async function GET(_: Request) {
  const files = await utapi.listFiles();

  const imageKeys = files.map(({ key }) => key);

  const images = await utapi.getFileUrls(imageKeys);

  return new Response(JSON.stringify(images), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
