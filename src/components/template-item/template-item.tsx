import Image from "next/image";
import { FC, useContext } from "react";

import { TemplateContext } from "@/context/template-context";
import { cn } from "@/lib/utils";

export type TemplateVariant = "poster" | "banner";

interface Props {
  variant: TemplateVariant;
  name: string;
  src: string;
}

export const TemplateItem: FC<Props> = ({ variant, src, name }) => {
  const { template, setTemplate } = useContext(TemplateContext);

  const selected = template === variant;

  return (
    <div
      onClick={() => setTemplate(variant)}
      className={cn(
        "relative flex aspect-square cursor-pointer flex-col items-center justify-center gap-2 rounded-sm bg-muted p-2 ring-1 ring-white transition-all hover:brightness-110",
        selected && "ring-2 ring-accent",
      )}
    >
      <Image src={src} alt={name} height={160} width={160} />
      <div className="absolute bottom-0 left-1/2 w-full -translate-x-1/2 bg-slate-900 bg-opacity-60 px-8 py-2 transition-all">
        <p className={cn("text-center transition-all", selected && "text-lg")}>
          {name}
        </p>
      </div>
    </div>
  );
};
