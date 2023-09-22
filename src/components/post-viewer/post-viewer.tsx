"use client";

/* eslint-disable @next/next/no-img-element */
import { FC, ReactNode, useRef, useState } from "react";

import { ViewerControls } from "./viewer-controls";
import { ScrollArea } from "../ui/scroll-area";

interface Props {
  children: ReactNode;
}

// TODO: Fix image download on mobile
export const PostViewer: FC<Props> = ({ children }) => {
  const viewerRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="relative col-span-3 max-h-96 bg-slate-800 text-white md:max-h-screen">
      <ViewerControls
        zoom={zoom}
        handleZoom={handleZoom}
        fitToViewer={fitToViewer}
        resetZoom={resetZoom}
      />
      <div ref={viewerRef} className="flex h-full w-full p-1">
        <ScrollArea>
          <div
            className="transition-transform"
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: "top left",
            }}
          >
            {children}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
