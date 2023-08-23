import { toPng } from "html-to-image";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { PosterContext } from "@/context/poster";

import { PostForm, PostFormInputs } from "../post-form/post-form";
import { PostViewer } from "../post-viewer/post-viewer";

export const PostGenerator = () => {
  const posterRef = useRef<HTMLDivElement>(null);

  const handlePostDownload = async () => {
    if (posterRef.current === null) return;

    const postLink = await toPng(posterRef.current, {
      cacheBust: true,
      canvasWidth: 1080,
      canvasHeight: 1080,
    });

    const downloadLink = document.createElement("a");
    downloadLink.href = postLink;
    downloadLink.download = "poster.png";
    downloadLink.click();
  };

  return (
    <section className="grid w-full grid-cols-1 gap-1 md:grid-cols-3">
      <PostViewer postRef={posterRef} />
      <PostForm onDownload={handlePostDownload} />
    </section>
  );
};
