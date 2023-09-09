import { FC, useContext } from "react";

import { PosterContext } from "@/context/poster";
import { cn } from "@/lib/utils";

interface Props {
  variant: "primary" | "muted";
  selected?: boolean;
}

interface VariantValue {
  bg: string;
  text: string;
  nameEmphasis: string;
}

export const colorItemVariants: Record<Props["variant"], VariantValue> = {
  primary: {
    bg: "bg-primary",
    text: "text-primary-foreground",
    nameEmphasis: "text-primary",
  },
  muted: {
    bg: "bg-muted",
    text: "text-primary-foreground",
    nameEmphasis: "text-muted",
  },
  // white: "bg-white text-muted",
  // gray: "bg-gray-400 text-muted",
};

export const ColorItem: FC<Props> = ({ variant, selected }) => {
  const {
    posterBg: { setPosterBg },
  } = useContext(PosterContext);

  return (
    <div
      onClick={setPosterBg.bind(null, variant)}
      className={cn(
        "aspect-square w-6 cursor-pointer rounded-full ring-2 ring-gray-400 transition-all hover:ring-secondary",
        colorItemVariants[variant].bg,
        selected && "ring-2 ring-accent",
      )}
    />
  );
};
