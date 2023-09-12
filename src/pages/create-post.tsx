import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";

import { TemplateSelector } from "@/components/template-selector/template-selector";

export default function CreatePostPage() {
  return (
    <div className="relative flex min-h-screen w-full pt-16 sm:pt-16 sm:p-8 md:p-16 flex-col items-center justify-between gap-4 bg-primary">
      <span className="absolute left-4 top-4 flex items-center gap-2">
        <Link
          href="/"
          className="flex h-8 items-center justify-center rounded-sm border-2 border-white bg-transparent px-2 text-lg text-white transition-all hover:bg-accent"
        >
          <BiArrowBack />
        </Link>
        <h1 className="text-xl">Escoge una plantilla</h1>
      </span>
      <TemplateSelector />
    </div>
  );
}
