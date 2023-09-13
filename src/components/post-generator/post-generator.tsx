import { toPng } from "html-to-image";
import { useContext, useRef } from "react";

import { TemplateContext, templates } from "@/context/template-context";

import { PostForm } from "../post-form/post-form";
import { PostViewer } from "../post-viewer/post-viewer";

export const PostGenerator = () => {
  const postRef = useRef<HTMLDivElement>(null);
  const { template } = useContext(TemplateContext);

  const handlePostDownload = async () => {
    if (postRef.current === null) return;

    const size = postRef.current.getBoundingClientRect();

    const postLink = await toPng(postRef.current, {
      cacheBust: true,
      canvasWidth: size.width,
      canvasHeight: size.height,
    });

    const now = new Date().getTime();

    const downloadLink = document.createElement("a");
    downloadLink.href = postLink;
    downloadLink.download = `${template}-${now}.png`;
    downloadLink.click();
  };

  const { form: Form } = templates[template!];

  return (
    <section className="grid w-full grid-cols-1 grid-rows-2 md:grid-cols-5 md:grid-rows-1">
      <PostViewer ref={postRef} />
      <PostForm onDownload={handlePostDownload}>
        <Form />
      </PostForm>
    </section>
  );
};
