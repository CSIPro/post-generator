import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";

import { TemplateSelector } from "@/components/template-selector/template-selector";

export default function Page() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center gap-4 bg-primary pt-16 sm:p-8 sm:pt-16 md:p-16">
      <span className="flex w-full items-center justify-between gap-2 px-2">
        <Link
          href="/"
          className="flex h-8 items-center justify-center rounded-sm border-2 border-white bg-transparent px-2 text-lg text-white transition-all hover:bg-accent"
        >
          <BiArrowBack />
        </Link>
      </span>
      <h1 className="absolute left-2 top-4 text-xl sm:left-10 md:left-16 md:pl-2">
        Escoge una plantilla
      </h1>
      <TemplateSelector />
    </div>
  );
}
