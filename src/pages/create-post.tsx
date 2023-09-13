import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { BiArrowBack } from "react-icons/bi";

import { TemplateSelector } from "@/components/template-selector/template-selector";
import { Button } from "@/components/ui/button";
import { TemplateContext } from "@/context/template-context";

export default function CreatePostPage() {
  const router = useRouter();
  const { template } = useContext(TemplateContext);

  const handleEditTemplate = () => {
    if (!template) return;

    router.push("/flyer");
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center gap-4 bg-primary pt-16 sm:p-8 sm:pt-16 md:p-16">
      <span className="flex w-full items-center justify-between gap-2 px-2">
        <Link
          href="/"
          className="flex h-8 items-center justify-center rounded-sm border-2 border-white bg-transparent px-2 text-lg text-white transition-all hover:bg-accent"
        >
          <BiArrowBack />
        </Link>
        <Button
          onClick={handleEditTemplate}
          disabled={!template}
          className="bg-white text-primary transition-all hover:bg-accent hover:text-white disabled:cursor-not-allowed"
        >
          Siguiente
        </Button>
      </span>
      <h1 className="absolute left-2 top-4 text-xl sm:left-10 md:left-16 md:pl-2">
        Escoge una plantilla
      </h1>
      <TemplateSelector />
    </div>
  );
}
