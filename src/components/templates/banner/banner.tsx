"use client";

/* eslint-disable @next/next/no-img-element */
import { forwardRef, useContext } from "react";
import { useFormContext } from "react-hook-form";

import { TemplateContext } from "@/context/template-context";
import { cn } from "@/lib/utils";

import { BannerFormInputs } from "./banner-form";
import { colorItemVariants } from "../../ui/color-item";

export interface PosterFormInputs {
  name: string;
}

export const Banner = forwardRef<HTMLDivElement>(function Banner(props, ref) {
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
      ref={ref}
      className={cn(
        "relative flex h-[160px] w-fit items-center gap-4 whitespace-nowrap pl-4 text-9xl transition-all",
        contextBg,
        contextText,
      )}
    >
      <h1>CSI PRO</h1>
      <h1
        className={cn(
          "flex items-center bg-white px-4 font-bold uppercase tracking-wide transition-all",
          nameEmphasis,
          nameEmphasisBg,
          !!watch("title") && "h-full",
        )}
      >
        {watch("title")}
      </h1>
    </div>
  );
});
