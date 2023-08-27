/* eslint-disable @next/next/no-img-element */
import {
  ChangeEventHandler,
  DragEventHandler,
  FC,
  MouseEventHandler,
  useContext,
  useRef,
} from "react";
import { MdDelete } from "react-icons/md";

import { PosterContext } from "@/context/poster";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";

export const AssetsForm = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    assets: { assets, addAsset },
  } = useContext(PosterContext);

  const handleDrop: DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();

    const { files } = event.dataTransfer;

    const filesArray = Array.from(files);

    filesArray.forEach((file) => {
      if (!file.type.startsWith("image/")) return;

      addAsset(file);
    });
  };

  const handleDragOver: DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { files } = event.target;

    if (files === null) return;

    const filesArray = Array.from(files);

    filesArray.forEach((file) => addAsset(file));
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        {/* <Label htmlFor="assets">Imágenes</Label> */}
        <Input
          ref={fileInputRef}
          // {...register("picture")}
          onChange={handleInputChange}
          id="assets"
          type="file"
          accept="image/*"
          multiple
          className="hidden"
        />
        <ScrollArea className="border">
          <div
            onClick={handleClick}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="grid h-60 max-h-60 justify-start items-start gap-2 p-2 md:grid-cols-3"
          >
            {assets.length < 1 && (
              <p className="col-span-full row-span-full text-center">
                Arrastra tus archivos aquí
              </p>
            )}
            {assets.map((asset, index) => (
              <AssetItem key={`Asset ${asset.name} ${index}`} asset={asset} />
            ))}
          </div>
        </ScrollArea>
      </div>
    </>
  );
};

interface AssetItemProps {
  asset: File;
}

const AssetItem: FC<AssetItemProps> = ({ asset }) => {
  const {
    assets: { removeAsset },
  } = useContext(PosterContext);

  const handleRemoveAsset: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    removeAsset(asset);
  };

  return (
    <div className="group relative w-full">
      <div className="absolute bottom-2 right-2 h-fit w-fit bg-slate-900 bg-opacity-30 opacity-50 transition-all group-hover:bg-opacity-90 group-hover:opacity-100">
        <Button
          size="icon"
          onClick={handleRemoveAsset}
          className="w-8 bg-transparent text-xl text-red-600 hover:bg-transparent"
        >
          <MdDelete />
        </Button>
      </div>
      <img
        src={URL.createObjectURL(asset)}
        alt={asset.name}
        className="aspect-square object-contain"
      />
    </div>
  );
};
