"use client";

import { FC } from "react";
import { IconContext } from "react-icons";
import { GrUndo } from "react-icons/gr";
import { MdAdd, MdFitScreen, MdRemove } from "react-icons/md";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface Props {
  zoom: number;
  handleZoom: (zoom: number) => void;
  fitToViewer: () => void;
  resetZoom: () => void;
}

export const ViewerControls: FC<Props> = ({
  zoom,
  handleZoom,
  fitToViewer,
  resetZoom,
}) => (
  <IconContext.Provider value={{ className: "text-white" }}>
    <TooltipProvider>
      <div className="absolute right-5 top-5 z-10 flex flex-col items-center gap-2 bg-slate-900 px-2 text-xs opacity-30 transition-opacity hover:opacity-100">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="cursor-pointer p-1 text-base"
              onClick={handleZoom.bind(null, 0.05)}
            >
              <MdAdd />
            </button>
          </TooltipTrigger>
          <TooltipContent side="left" sideOffset={16}>
            <p>Acercar</p>
          </TooltipContent>
        </Tooltip>
        <p className="text-sm">{zoom.toFixed(2)}</p>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="cursor-pointer p-1"
              onClick={handleZoom.bind(null, -0.05)}
            >
              <MdRemove />
            </button>
          </TooltipTrigger>
          <TooltipContent side="left" sideOffset={16}>
            <p>Alejar</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="py-1 text-base" onClick={fitToViewer}>
              <MdFitScreen />
            </button>
          </TooltipTrigger>
          <TooltipContent side="left" sideOffset={16}>
            <p>Ajustar</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="py-1 text-base" onClick={resetZoom}>
              <GrUndo />
            </button>
          </TooltipTrigger>
          <TooltipContent side="left" sideOffset={16}>
            <p>Restablecer</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  </IconContext.Provider>
);
