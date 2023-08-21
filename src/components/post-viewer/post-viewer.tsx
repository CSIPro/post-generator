import Image from "next/image";
import { FC, RefObject } from "react";
import { UseFormWatch } from "react-hook-form";

import { PostFormInputs } from "../post-form/post-form";
import { SocialMedia } from "../social-media/social-media";

interface Props {
  zoom: number;
  postRef: RefObject<HTMLDivElement>;
  watch: UseFormWatch<PostFormInputs>;
}

export const PostViewer: FC<Props> = ({ watch, postRef, zoom }) => {
  return (
    <div className="max-h-screen w-full overflow-scroll bg-slate-800 p-4 text-4xl">
      <div style={{ transform: `scale(${zoom})`, transformOrigin: "top left" }}>
        <div
          ref={postRef}
          className="relative aspect-square w-[1080px] bg-primary-700 px-4 py-16"
        >
          <span className="absolute left-4 top-4 flex flex-row gap-1">
            <h1>CSI PRO</h1>
            {watch("event")?.length > 0 && (
              <h1 className="bg-white px-1 font-bold uppercase tracking-wider text-primary-700">
                {watch("event")}
              </h1>
            )}
          </span>
          <div className="h-1/3 w-full border border-slate-800 bg-primary-900">
            <h2>Contenido</h2>
            <p className="text-sm ">{watch("content")}</p>
          </div>
          <div className="flex h-1/3 w-full flex-row">
            <div className="h-full w-1/2 border border-slate-800 bg-primary-900">
              <h2>Presentadores</h2>
              <p className="text-2xl font-bold">{watch("presenters")}</p>
            </div>
            <div className="h-full w-1/2 border border-slate-800 bg-primary-900">
              ¿Fotos?
            </div>
          </div>
          <div className="flex h-1/3 w-full flex-row">
            <div className="h-full w-1/2 border border-slate-800 bg-primary-900">
              Lugar del evento
            </div>
            <div className="h-full w-1/2 border border-slate-800 bg-primary-900">
              Extras
            </div>
          </div>
          <div className="absolute bottom-4 left-4 flex w-3/4 flex-row gap-4">
            <SocialMedia variant="instagram">@csipro.dev</SocialMedia>
            <SocialMedia variant="github">/csipro</SocialMedia>
            <SocialMedia variant="twitter">@csipro_dev</SocialMedia>
            <SocialMedia variant="linkedin">/csi-pro</SocialMedia>
            <SocialMedia variant="facebook">/csipro.dev</SocialMedia>
          </div>
          <Image
            src="/assets/csipro.svg"
            alt="CSI PRO icon"
            width={40}
            height={40}
            className="absolute bottom-4 right-4"
          />
        </div>
      </div>
    </div>
  );
};
