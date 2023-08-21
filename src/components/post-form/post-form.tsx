import { FC } from "react";
import { UseFormRegister } from "react-hook-form";

export interface PostFormInputs {
  event: string;
  content: string;
  presenters: string;
  location: string;
  date: string;
}

interface Props {
  zoom: number;
  onZoom: (value: number) => void;
  onDownload: () => void;
  register: UseFormRegister<PostFormInputs>;
}

export const PostForm: FC<Props> = ({ register, onDownload, zoom, onZoom }) => {
  const handleDownload = () => {
    onDownload();
  };

  return (
    <div className="w-full bg-slate-500">
      <h1>Post Form</h1>
      <div className="flex w-full flex-col gap-2 px-2 text-slate-900">
        <input {...register("event")} type="text" placeholder="Event" />
        <input {...register("content")} type="text" placeholder="Content" />
        <input
          {...register("presenters")}
          type="text"
          placeholder="Presenters"
        />
        <div className="flex flex-row gap-2 text-white">
          <p>Zoom</p>
          <button onClick={onZoom.bind(null, -0.1)}>-</button>
          <p className="w-16 text-center">{zoom.toFixed(2)}</p>
          <button onClick={onZoom.bind(null, 0.1)}>+</button>
        </div>
      </div>
      <button
        type="button"
        onClick={handleDownload}
        className="rounded-sm bg-slate-600 p-2"
      >
        Download post
      </button>
    </div>
  );
};
