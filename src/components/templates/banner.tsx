/* eslint-disable @next/next/no-img-element */
import { FC, useContext, useRef } from "react";
import { useFormContext } from "react-hook-form";

import { TemplateContext } from "@/context/template-context";
import { cn } from "@/lib/utils";

import { BannerFormInputs } from "./banner/banner-form";
import { colorItemVariants } from "../ui/color-item";

export interface PosterFormInputs {
  name: string;
}

export const Banner = () => {
  const postRef = useRef<HTMLDivElement>(null);
  const {
    primaryColor: { color },
  } = useContext(TemplateContext);
  const { watch } = useFormContext<BannerFormInputs>();

  const {
    bg: contextBg,
    text: contextText,
    nameEmphasis,
    nameEmphasisBg,
  } = colorItemVariants[color];

  return (
    <div
      ref={postRef}
      className={cn(
        "relative flex h-[160px] max-w-[1080px] items-center gap-4 whitespace-nowrap pl-4 text-9xl transition-all",
        contextBg,
        contextText,
      )}
    >
      <h1>CSI PRO</h1>
      <h1
        className={cn(
          "h-full bg-white px-4 font-bold flex items-center uppercase tracking-wide",
          nameEmphasis,
          nameEmphasisBg,
        )}
      >
        {watch("title")}
      </h1>
    </div>
  );
};
