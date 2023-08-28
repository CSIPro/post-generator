// import type { NextApiRequest, NextApiResponse } from "next";
import { createUploadthing, type FileRouter } from "uploadthing/next-legacy";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } }).onUploadComplete(
    async ({ metadata, file }) => {
      console.log("Upload complete: ", metadata);
      console.log("File URL: ", file.url);
    },
  ),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
