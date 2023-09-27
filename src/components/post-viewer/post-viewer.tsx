"use client";

/* eslint-disable @next/next/no-img-element */
import { FC, ReactNode, useRef, useState } from "react";

import { ViewerControls } from "./viewer-controls";
import { ScrollArea } from "../ui/scroll-area";

interface Props {
  children: ReactNode;
  onFitToViewer: () => { height: number; width: number } | undefined;
}

export const PostViewer: FC<Props> = ({ onFitToViewer, children }) => {
  const viewerRef = useRef<HTMLDivElement>(null);

  const [zoom, setZoom] = useState(1);

  const handleZoom = (value: number) => {
    setZoom((prevZoom) => prevZoom + value);
  };

  const fitToViewer = () => {
    if (viewerRef.current === null) return;

    const { width, height } = viewerRef.current.getBoundingClientRect();

    const offset = onFitToViewer();

    setZoom(
      Math.min(
        (width - 24) / (offset?.width ?? 1080),
        (height - 24) / (offset?.height ?? 1080),
      ),
    );
  };

  const resetZoom = () => {
    setZoom(1);
  };

  return (
    <div className="relative col-span-3 row-span-1 max-h-96 bg-slate-800 text-white md:max-h-screen">
      <ViewerControls
        zoom={zoom}
        handleZoom={handleZoom}
        fitToViewer={fitToViewer}
        resetZoom={resetZoom}
      />
      <div ref={viewerRef} className="flex h-full min-w-full p-1">
        <ScrollArea className="h-full w-full">
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
