/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { FC, RefObject, useContext, useRef, useState } from "react";
import { IoLocationSharp, IoCalendarClear, IoTimeSharp } from "react-icons/io5";
import { Rnd } from "react-rnd";

import { PosterContext } from "@/context/poster";
import { cn } from "@/lib/utils";
import { formatFullTemplateDate } from "@/utils/utils";

import { SocialMedia } from "../social-media/social-media";
import { colorItemVariants } from "../ui/color-item";
import { NameEmphasis } from "../ui/name-emphasis";
import { ScrollArea } from "../ui/scroll-area";

import { ViewerControls } from "./viewer-controls";

interface Props {
  postRef: RefObject<HTMLDivElement>;
}

// TODO: Fix image download on mobile
export const PostViewer: FC<Props> = ({ postRef }) => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const {
    posterBg: { posterBg },
    topics: { topics },
    presenters: { presenters },
    assets: { assets },
    date,
    time,
    posterForm,
  } = useContext(PosterContext);

  const [zoom, setZoom] = useState(1);

  const handleZoom = (value: number) => {
    setZoom((prevZoom) => prevZoom + value);
  };

  const fitToViewer = () => {
    if (viewerRef.current === null) return;

    const { width, height } = viewerRef.current.getBoundingClientRect();

    setZoom(Math.min((width - 24) / 1080, (height - 24) / 1080));
  };

  const resetZoom = () => {
    setZoom(1);
  };

  const { bg: contextBg, text: contextText } = colorItemVariants[posterBg];

  return (
    <div className="relative col-span-3 max-h-96 max-w-full bg-slate-800 text-white md:max-h-screen">
      <ViewerControls
        zoom={zoom}
        handleZoom={handleZoom}
        fitToViewer={fitToViewer}
        resetZoom={resetZoom}
      />
      <div ref={viewerRef} className="flex h-full p-1 md:h-full md:w-full">
        <ScrollArea>
          <div
            className="transition-transform"
            style={{ transform: `scale(${zoom})`, transformOrigin: "top left" }}
          >
            <div
              ref={postRef}
              className={cn(
                "relative grid aspect-square w-[1080px] grid-cols-3 grid-rows-4 gap-2 px-8 py-24 text-3xl transition-all",
                contextBg,
                contextText,
              )}
            >
              {assets.map((asset, index) => (
                <Rnd
                  key={`${asset.key} ${index}`}
                  className="absolute z-10 p-4 hover:ring hover:ring-accent"
                  lockAspectRatio={true}
                >
                  <img
                    src={asset.url}
                    alt={asset.url}
                    draggable="false"
                    className="aspect-square w-full"
                  />
                </Rnd>
              ))}
              <span className="absolute left-8 top-8 flex flex-row gap-2 text-5xl">
                <h1>CSI PRO</h1>
                {posterForm && posterForm?.watch("event")?.length > 0 && (
                  <NameEmphasis>{posterForm?.watch("event")}</NameEmphasis>
                )}
              </span>
              <div className="col-span-full pl-2">
                <div className="flex h-full flex-col items-center justify-center">
                  {posterForm && posterForm?.watch("title")?.length > 0 && (
                    <h1
                      className={cn(
                        "bg-white px-4 py-2 text-center text-7xl font-bold",
                        colorItemVariants[posterBg].nameEmphasis,
                      )}
                    >
                      {posterForm?.watch("title")}
                    </h1>
                  )}
                </div>
              </div>
              <div className="col-span-2 pl-2">
                <ul className="ml-px border-l-4 border-white pl-5">
                  {topics.map((topic, index) => (
                    <li
                      key={`Topic ${topic} ${index}`}
                      className="flex flex-row py-1"
                    >
                      <p>&#62; {topic}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-span-2 flex flex-col gap-2 pl-2">
                <h2>Presentado por:</h2>
                <ul className="ml-px">
                  {presenters.map((presenter, index) => (
                    <li
                      key={`Presenter ${presenter} ${index}`}
                      className="flex flex-row py-1"
                    >
                      <p>&#62; {presenter}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-1/2"></div>
              <div className="col-span-2 flex flex-col gap-2 pl-2">
                <h1>Ubicación y fecha</h1>
                <div className="flex flex-col gap-1">
                  <span className="flex items-center gap-2">
                    <IoLocationSharp />
                    <p>{posterForm?.watch("location")}</p>
                  </span>
                  {date && (
                    <span className="flex flex-row items-center gap-2">
                      <IoCalendarClear />
                      <>
                        <p>{formatFullTemplateDate(date)}</p>
                      </>
                    </span>
                  )}
                  <span className="flex flex-row items-center gap-2">
                    <IoTimeSharp />
                    {time && time.length > 0 && <p>{time} hrs</p>}
                  </span>
                </div>
              </div>
              <div className=""></div>
              <div className="absolute bottom-8 left-8 flex w-3/4 flex-row gap-4">
                <SocialMedia variant="instagram">@csipro.dev</SocialMedia>
                <SocialMedia variant="github">/csipro</SocialMedia>
                <SocialMedia variant="twitter">@csipro_dev</SocialMedia>
                <SocialMedia variant="linkedin">/csi-pro</SocialMedia>
                <SocialMedia variant="facebook">/csipro.dev</SocialMedia>
              </div>
              <Image
                src="/assets/csipro.svg"
                alt="CSI PRO icon"
                width={120}
                height={120}
                className="absolute bottom-8 right-8"
              />
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
