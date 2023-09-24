/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { forwardRef, useContext } from "react";
import { useFormContext } from "react-hook-form";
import { IoPerson } from "react-icons/io5";
import { Rnd } from "react-rnd";

import { SocialMedia } from "@/components/social-media/social-media";
import { colorItemVariants } from "@/components/ui/color-item";
import { NameEmphasis } from "@/components/ui/name-emphasis";
import { TemplateContext } from "@/context/template-context";
import { cn } from "@/lib/utils";
import { formatFullTemplateDate } from "@/utils/utils";

export interface PosterFormInputs {
  event: string;
  title: string;
  topics: string;
  presenters: string;
  location: string;
  time: string;
}

export const PosterRevamped = forwardRef<HTMLDivElement>(
  function PosterRevamped(props, ref) {
    const {
      assets: { assets },
      topics: { topics },
      presenters: { presenters },
      primaryColor: { color },
      date,
      time,
    } = useContext(TemplateContext);
    const { watch } = useFormContext<PosterFormInputs>();

    const {
      bg: contextBg,
      text: contextText,
      nameEmphasis,
    } = colorItemVariants[color];

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex aspect-square w-[1080px] flex-col items-center gap-12 px-12 pt-40 text-3xl transition-all",
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
        <span className="absolute left-12 top-12 flex flex-row items-center gap-2 text-5xl">
          <h1>CSI PRO</h1>
          {watch("event")?.length > 0 && (
            <NameEmphasis>{watch("event")}</NameEmphasis>
          )}
        </span>
        <Image
          src="/assets/csipro.svg"
          alt="CSI PRO icon"
          width={100}
          height={100}
          className="absolute right-12 top-12"
        />
        {watch("title")?.length > 0 && (
          <h1
            className={cn(
              "bg-white px-4 py-2 text-center text-7xl font-bold transition-all",
              nameEmphasis,
              colorItemVariants[color].nameEmphasisBg,
            )}
          >
            {watch("title")}
          </h1>
        )}
        <ul className="flex flex-col items-center gap-2 text-5xl font-bold">
          {topics.map((topic, index) => (
            <li key={`Topic ${topic} ${index}`} className="py-1">
              <p>&#62; {topic}</p>
            </li>
          ))}
        </ul>
        <div className="flex w-full flex-col items-start gap-2 text-4xl">
          <h2 className="font-bold">Presentado por:</h2>
          <ul className="flex flex-col gap-2">
            {presenters.map((presenter, index) => (
              <li
                key={`Presenter ${presenter} ${index}`}
                className="flex items-center gap-2"
              >
                <IoPerson />
                <p>{presenter}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex w-full justify-start">
          <div className="flex w-4/5 flex-col gap-2 rounded-3xl border-4 border-white p-6">
            {date && (
              <span className="flex flex-row items-center gap-2">
                <p>{formatFullTemplateDate(date)}</p>
              </span>
            )}
            {(time || !!watch("location")) && (
              <span className="flex items-center gap-2">
                {time && time.length > 0 && <p>{time} hrs -</p>}
                <p>{watch("location")}</p>
              </span>
            )}
            <span className="flex flex-row items-center gap-2">
              UNIVERSIDAD DE SONORA
            </span>
          </div>
        </div>
        <div />
        <div className="absolute bottom-12 left-12 flex flex-row gap-4">
          <SocialMedia variant="instagram" size="lg">
            @csipro.dev
          </SocialMedia>
          <SocialMedia variant="twitter" size="lg">
            @csipro_dev
          </SocialMedia>
          <SocialMedia variant="facebook" size="lg">
            /csipro.dev
          </SocialMedia>
        </div>
      </div>
    );
  },
);
