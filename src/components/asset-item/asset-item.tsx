/* eslint-disable @next/next/no-img-element */
import { FC, MouseEventHandler, useContext } from "react";
import { IconContext } from "react-icons";
import { CgRemoveR } from "react-icons/cg";
import { MdAddBox, MdDelete } from "react-icons/md";
import { SlOptions } from "react-icons/sl";

import { PosterContext } from "@/context/poster";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { cn } from "@/lib/utils";

export interface Asset {
  key: string;
  url: string;
}

interface AssetItemProps {
  asset: Asset;
}

export const AssetItem: FC<AssetItemProps> = ({ asset }) => {
  const {
    assets: { assets, addAsset, removeAsset },
  } = useContext(PosterContext);

  const isRendered = assets.some((a) => a.key === asset.key);

  return (
    <div
      className={cn(
        "group relative flex h-full w-full items-center justify-center overflow-hidden bg-white bg-opacity-10",
        `${isRendered && "ring-1 ring-accent"}`
      )}
    >
      <AssetActions asset={asset} isRendered={isRendered} />
      <img
        src={asset.url}
        alt={`Uploaded asset ${asset.key}`}
        className="object-contain"
      />
    </div>
  );
};

interface AssetActionsProps {
  asset: Asset;
  isRendered?: boolean;
}

const AssetActions: FC<AssetActionsProps> = ({ asset, isRendered }) => {
  const {
    assets: { addAsset, removeAsset },
  } = useContext(PosterContext);

  const handleAddAsset: MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();

    addAsset(asset.key);
  };

  const handleRemoveAsset: MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();

    removeAsset(asset.key);
  };

  return (
    <IconContext.Provider value={{ className: "text-white" }}>
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="absolute right-2 top-2 bg-black opacity-25 transition-all group-hover:opacity-100"
        >
          <Button
            variant="outline"
            size="icon"
            className="inline-flex h-6 w-6 items-center justify-center"
          >
            <SlOptions />
          </Button>
        </DropdownMenuTrigger>
        <IconContext.Provider value={{ className: "text-white mr-2 text-lg" }}>
          <DropdownMenuContent className="bg-black text-white">
            <DropdownMenuItem
              onClick={isRendered ? handleRemoveAsset : handleAddAsset}
            >
              {isRendered ? <CgRemoveR /> : <MdAddBox />}
              <span>{isRendered ? "Quitar" : "Agregar"}</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="group/delete-item text-red-500 transition-all">
              <IconContext.Provider
                value={{
                  className:
                    "group-hover/delete-item:text-accent-foreground text-red-500 mr-2 text-lg",
                }}
              >
                <MdDelete />
                <span>Eliminar</span>
              </IconContext.Provider>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </IconContext.Provider>
      </DropdownMenu>
    </IconContext.Provider>
  );
};
