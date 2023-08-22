import { toPng } from "html-to-image";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { PostDataContext } from "@/context/post-data-context";

import { PostForm, PostFormInputs } from "../post-form/post-form";
import { PostViewer } from "../post-viewer/post-viewer";

export const PostGenerator = () => {
  const postRef = useRef<HTMLDivElement>(null);

  const [topics, setTopics] = useState<string[]>([]);
  const [presenters, setPresenters] = useState<string[]>([]);
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>();

  const { register, watch, reset } = useForm<PostFormInputs>();

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

  const addTopic = (topic: string) => {
    if (!topic) return;

    setTopics((prevTopics) => [...prevTopics, topic]);
  };

  const removeTopic = (topic: string) => {
    setTopics((prevTopics) => prevTopics.filter((t) => t !== topic));
  };

  const addPresenter = (presenter: string) => {
    if (!presenter) return;

    setPresenters((prevPresenters) => [...prevPresenters, presenter]);
  };

  const removePresenter = (presenter: string) => {
    setPresenters((prevPresenters) =>
      prevPresenters.filter((p) => p !== presenter),
    );
  };

  return (
    <PostDataContext.Provider
      value={{
        topics,
        presenters,
        date,
        time,
        setTime,
        addTopic,
        removeTopic,
        addPresenter,
        removePresenter,
        setTopics,
        setPresenters,
        setDate,
      }}
    >
      <section className="grid w-full grid-cols-1 gap-1 md:grid-cols-3">
        <PostViewer postRef={postRef} watch={watch} />
        <PostForm register={register} onDownload={handlePostDownload} />
      </section>
    </PostDataContext.Provider>
  );
};
