import Link from "next/link";
import { useRouter } from "next/router";
import { FC, ReactNode } from "react";
import { BiArrowBack } from "react-icons/bi";

import { AssetsForm } from "./assets-form";
import { ConfigForm } from "./config-form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";

interface Props {
  onDownload: () => void;
  children: ReactNode;
}

export const PostForm: FC<Props> = ({ onDownload, children }) => {
  const router = useRouter();

  const handleDownload = () => {
    onDownload();
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="relative col-span-2 h-screen w-full overflow-hidden bg-muted text-white">
      <ScrollArea className="relative flex h-full flex-col gap-1 overflow-auto">
        <div className="flex flex-col p-4">
          <div className="flex flex-row items-center gap-2">
            <Button
              onClick={handleGoBack}
              className="flex h-8 items-center justify-center rounded-sm border border-white bg-muted px-2 text-lg transition-all hover:bg-primary"
            >
              <BiArrowBack />
            </Button>
            <h1 className="text-xl">Edita la plantilla</h1>
          </div>
          <Accordion type="single" collapsible>
            <AccordionItem
              value="template-props"
              className="border-b-slate-400"
            >
              <AccordionTrigger>Plantilla</AccordionTrigger>
              <AccordionContent>
                <ConfigForm />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="content-form" className="border-b-slate-400">
              <AccordionTrigger>Contenido</AccordionTrigger>
              <AccordionContent>{children}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="assets-form" className="border-b-slate-400">
              <AccordionTrigger>Recursos gráficos</AccordionTrigger>
              <AccordionContent>
                <AssetsForm />
              </AccordionContent>
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
