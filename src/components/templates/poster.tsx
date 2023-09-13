/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import { FC, forwardRef, useContext, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { BiArrowBack } from "react-icons/bi";
import { IoCalendarClear, IoLocationSharp, IoTimeSharp } from "react-icons/io5";
import { Rnd } from "react-rnd";

import { TemplateContext } from "@/context/template-context";
import { cn } from "@/lib/utils";
import { formatFullTemplateDate } from "@/utils/utils";

import { AssetsForm } from "../post-form/assets-form";
import { ConfigForm } from "../post-form/config-form";
import { ContentForm } from "../post-form/content-form";
import { SocialMedia } from "../social-media/social-media";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";
import { colorItemVariants } from "../ui/color-item";
import { NameEmphasis } from "../ui/name-emphasis";
import { ScrollArea } from "../ui/scroll-area";

export interface PosterFormInputs {
  event: string;
  title: string;
  topics: string;
  presenters: string;
  location: string;
  time: string;
}

export const Poster = forwardRef<HTMLDivElement>(function Poster(props, ref) {
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
        {watch("event")?.length > 0 && (
          <NameEmphasis>{watch("event")}</NameEmphasis>
        )}
      </span>
      <div className="col-span-full pl-2">
        <div className="flex h-full flex-col items-center justify-center">
          {watch("title")?.length > 0 && (
            <h1
              className={cn(
                "bg-white px-4 py-2 text-center text-7xl font-bold",
                nameEmphasis,
              )}
            >
              {watch("title")}
            </h1>
          )}
        </div>
      </div>
      <div className="col-span-2 pl-2">
        <ul className="ml-px border-l-4 border-white pl-5">
          {topics.map((topic, index) => (
            <li key={`Topic ${topic} ${index}`} className="flex flex-row py-1">
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
            <p>{watch("location")}</p>
          </span>
          {date && (
            <span className="flex flex-row items-center gap-2">
              <IoCalendarClear />
              <p>{formatFullTemplateDate(date)}</p>
            </span>
          )}
          <span className="flex flex-row items-center gap-2">
            <IoTimeSharp />
            {time && time.length > 0 && <p>{time} hrs</p>}
          </span>
        </div>
      </div>
      <div />
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
  );
});

interface PostFormProps {
  onDownload: () => void;
}

export const PostForm: FC<PostFormProps> = ({ onDownload }) => {
  const handleDownload = () => {
    onDownload();
  };

  return (
    <div className="relative col-span-2 h-screen w-full overflow-hidden bg-muted text-white">
      <ScrollArea className="relative flex h-full flex-col gap-1 overflow-auto">
        <div className="flex flex-col p-4">
          <div className="flex flex-row items-center gap-2">
            <Link
              href="/"
              className="flex h-8 items-center justify-center rounded-sm border border-white bg-muted px-2 text-lg transition-all hover:bg-primary"
            >
              <BiArrowBack />
            </Link>
            <h1 className="text-xl">Edita la plantilla</h1>
          </div>
          <Accordion type="single" collapsible>
            <AccordionItem
              value="template-props"
              className="border-b-slate-400"
            >
              <AccordionTrigger>Plantilla</AccordionTrigger>
              <AccordionContent>
                <ConfigForm />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="content-form" className="border-b-slate-400">
              <AccordionTrigger>Contenido</AccordionTrigger>
              <AccordionContent>
                <ContentForm />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="assets-form" className="border-b-slate-400">
              <AccordionTrigger>Recursos gráficos</AccordionTrigger>
              <AccordionContent>
                <AssetsForm />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Button
            type="button"
            onClick={handleDownload}
            className="mt-2 w-full transition-all hover:bg-primary hover:brightness-110"
          >
            Descargar
          </Button>
        </div>
      </ScrollArea>
    </div>
  );
};
