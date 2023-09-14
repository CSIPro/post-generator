import { FC, ReactNode, useContext } from "react";

import { TemplateContext } from "@/context/template-context";
import { cn } from "@/lib/utils";

import { colorItemVariants } from "./color-item";

interface Props {
  children: ReactNode;
}

export const FullNameEmphasis: FC<Props> = ({ children }) => {
  return (
    <span
      className={`flex flex-row gap-2 whitespace-nowrap text-xl md:text-5xl`}
    >
      <h1>CSI PRO</h1>
      <NameEmphasis>{children}</NameEmphasis>
    </span>
  );
};

export const NameEmphasis: FC<Props> = ({ children }) => {
  const {
    primaryColor: { color },
  } = useContext(TemplateContext);

  return (
    <h1
      className={cn(
        "bg-white px-2 font-bold uppercase tracking-wider transition-all",
        colorItemVariants[color].nameEmphasis,
        colorItemVariants[color].nameEmphasisBg,
      )}
    >
      {children}
    </h1>
  );
};
