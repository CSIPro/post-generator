import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

import { cn } from "@/lib/utils";

export type TemplateVariant = "poster" | "banner" | "poster-rev";

interface Props {
  variant: TemplateVariant;
  name: string;
  src: string;
}

export const TemplateItem: FC<Props> = ({ variant, src, name }) => {
  return (
    <Link
      href={`/templates/${variant}`}
      className={cn(
        "relative flex aspect-square cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-sm bg-muted p-2 ring-2 ring-secondary transition-all hover:ring-4 hover:brightness-110",
      )}
    >
      <Image src={src} alt={name} height={160} width={160} />
      <div className="absolute bottom-0 left-1/2 w-full -translate-x-1/2 bg-slate-900 bg-opacity-60 px-8 py-2 transition-all">
        <p className={cn("text-center transition-all")}>{name}</p>
      </div>
    </Link>
  );
};
