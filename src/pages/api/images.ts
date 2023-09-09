import type { NextApiRequest, NextApiResponse } from "next";
import { utapi } from "uploadthing/server";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const files = await utapi.listFiles();

  const imageKeys = files.map(({ key }) => key);

  const images = await utapi.getFileUrls(imageKeys);

  res.status(200).json(images);
};

export default handler;
