/* eslint-disable @next/next/no-img-element */
import { FC, RefObject, forwardRef, useContext, useRef, useState } from "react";

import { TemplateContext, templates } from "@/context/template-context";

import { ViewerControls } from "./viewer-controls";
import { Poster } from "../templates/poster";
import { ScrollArea } from "../ui/scroll-area";

// TODO: Fix image download on mobile
export const PostViewer = forwardRef<HTMLDivElement>(
  function PostViewer(props, postRef) {
    const viewerRef = useRef<HTMLDivElement>(null);
    const { template } = useContext(TemplateContext);

    const [zoom, setZoom] = useState(1);

    const handleZoom = (value: number) => {
      setZoom((prevZoom) => prevZoom + value);
    };

    const fitToViewer = () => {
      if (viewerRef.current === null) return;

      const { width, height } = viewerRef.current.getBoundingClientRect();

      setZoom(Math.min((width - 24) / 1080, (height - 24) / 1080));
    };

    const resetZoom = () => {
      setZoom(1);
    };

    const { template: Template } = templates[template!];

    return (
      <div className="relative col-span-3 max-h-96 bg-slate-800 text-white md:max-h-screen">
        <ViewerControls
          zoom={zoom}
          handleZoom={handleZoom}
          fitToViewer={fitToViewer}
          resetZoom={resetZoom}
        />
        <div ref={viewerRef} className="flex h-full p-1 w-full">
          <ScrollArea>
            <div
              className="transition-transform"
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: "top left",
              }}
            >
              <Template ref={postRef} />
            </div>
          </ScrollArea>
        </div>
      </div>
    );
  },
);
