import Link from "next/link";
import { FC } from "react";
import { BiArrowBack } from "react-icons/bi";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";

import { ContentForm } from "./content-form";
import { TemplateForm } from "./template-form";

interface Props {
  onDownload: () => void;
}

export const PostForm: FC<Props> = ({ onDownload }) => {
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
                <TemplateForm />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="content-form" className="border-b-slate-400">
              <AccordionTrigger>Contenido</AccordionTrigger>
              <AccordionContent>
                <ContentForm />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="assets-form" className="border-b-slate-400">
              <AccordionTrigger>Recursos</AccordionTrigger>
              <AccordionContent>Let&apos;s go</AccordionContent>
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

{
  /* <div>
          <form onSubmit={submitPicture(onSubmitPicture)}>
            <Label htmlFor="picture">Imagen</Label>
            <div className="flex flex-row items-center gap-2">
              <Input
                {...regPicture("picture")}
                id="picture"
                type="file"
                accept="image/*"
              />
              <Button
                size="icon"
                type="submit"
                className="text-lg transition-all hover:bg-primary hover:brightness-110"
              >
                <MdAdd />
              </Button>
            </div>
          </form>
        </div> */
}
