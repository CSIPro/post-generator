import { toPng } from "html-to-image";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { PostForm, PostFormInputs } from "../post-form/post-form";
import { PostViewer } from "../post-viewer/post-viewer";

export const PostGenerator = () => {
  const [zoom, setZoom] = useState(1);
  const postRef = useRef<HTMLDivElement>(null);

  const { register, watch, reset } = useForm<PostFormInputs>();

  const handleZoom = (value: number) => {
    setZoom((prevZoom) => prevZoom + value);
  };

  const handlePostDownload = async () => {
    if (postRef.current === null) return;

    const postLink = await toPng(postRef.current, {
      cacheBust: true,
      canvasWidth: 1080,
      canvasHeight: 1080,
    });

    const downloadLink = document.createElement("a");
    downloadLink.href = postLink;
    downloadLink.download = "post.png";
    downloadLink.click();
  };

  return (
    <section className="grid w-full grid-cols-1 md:grid-cols-2">
      <PostViewer postRef={postRef} watch={watch} zoom={zoom} />
      <PostForm
        register={register}
        onDownload={handlePostDownload}
        zoom={zoom}
        onZoom={handleZoom}
      />
    </section>
  );
};
