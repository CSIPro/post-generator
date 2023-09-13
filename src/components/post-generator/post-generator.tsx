import { toPng } from "html-to-image";
import { useContext, useRef } from "react";

import { TemplateContext, templates } from "@/context/template-context";

import { ContentForm } from "../post-form/content-form";
import { PostForm } from "../post-form/post-form";
import { PostViewer } from "../post-viewer/post-viewer";

export const PostGenerator = () => {
  const posterRef = useRef<HTMLDivElement>(null);
  const { template } = useContext(TemplateContext);

  const handlePostDownload = async () => {
    if (posterRef.current === null) return;

    const postLink = await toPng(posterRef.current, {
      cacheBust: true,
      canvasWidth: 1080,
      canvasHeight: 1080,
    });

    const now = new Date().getTime();

    const downloadLink = document.createElement("a");
    downloadLink.href = postLink;
    downloadLink.download = `poster-${now}.png`;
    downloadLink.click();
  };

  const { form: Form } = templates[template!];

  return (
    <section className="grid w-full grid-cols-1 grid-rows-2 md:grid-cols-5 md:grid-rows-1">
      <PostViewer ref={posterRef} />
      <PostForm onDownload={handlePostDownload}>
        <Form />
      </PostForm>
    </section>
  );
};
