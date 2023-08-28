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
import { useQueryClient } from "react-query";

import { PosterContext } from "@/context/poster";
import { UploadButton, UploadDropzone } from "@/utils/uploadthing";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";

export interface Asset {
  key: string;
  url: string;
}

export const AssetsForm = () => {
  const queryClient = useQueryClient();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    assetsQuery,
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

  console.log(assetsQuery?.data);

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
        <div className="max-h-60 w-full">
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) =>
              queryClient.invalidateQueries(["assets"])
            }
            className="ut-button:bg-primary ut-button:px-4 ut-button:mt-2 rounded-sm border-secondary bg-slate-950 p-2"
            content={{
              label({ ready, isUploading, isDragActive }) {
                if (isDragActive) return "Suelta tus archivos";
                if (isUploading) return "Subiendo...";
                if (ready) return "Escoge o arrastra tus archivos";

                return "Preparando...";
              },
              allowedContent({ ready, fileTypes }) {
                if (ready)
                  return `Archivos permitidos: ${fileTypes.join(", ")}`;
              },
              button({ ready, isUploading }) {
                if (ready) return "Subir";
                if (isUploading) return "Subiendo...";
              },
            }}
          />
        </div>
        <ScrollArea className="rounded-sm border border-primary bg-slate-950">
          <div className="grid h-60 max-h-60 items-start justify-start gap-2 p-2 md:grid-cols-3 md:grid-rows-2">
            {assetsQuery?.data &&
              assetsQuery.data.map((asset, index) => (
                <AssetItem key={`Asset ${asset.key} ${index}`} asset={asset} />
              ))}
          </div>
        </ScrollArea>
      </div>
    </>
  );
};

interface AssetItemProps {
  asset: Asset;
}

const AssetItem: FC<AssetItemProps> = ({ asset }) => {
  const {
    assets: { removeAsset },
  } = useContext(PosterContext);

  const handleRemoveAsset: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    // removeAsset(asset);
  };

  return (
    <div className="group relative w-full bg-white bg-opacity-10">
      <button
        onClick={handleRemoveAsset}
        className="absolute bottom-2 right-2 inline-flex aspect-square w-8 items-center justify-center bg-white bg-opacity-25 text-xl text-secondary transition-all group-hover:bg-opacity-100 group-hover:bg-black rounded-full"
      >
        <MdDelete />
      </button>
      <img
        src={asset.url}
        alt={`Uploaded asset ${asset.key}`}
        className="aspect-square object-contain"
      />
    </div>
  );
};
