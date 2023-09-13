import { useContext } from "react";
import { useQueryClient } from "react-query";

import { PosterContext } from "@/context/poster";
import { TemplateContext } from "@/context/template-context";
import { UploadDropzone } from "@/utils/uploadthing";

import { AssetItem } from "../asset-item/asset-item";
import { ScrollArea } from "../ui/scroll-area";

export const AssetsForm = () => {
  const queryClient = useQueryClient();

  const { assetsQuery } = useContext(TemplateContext);

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="max-h-60 w-full">
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(_) =>
              queryClient.invalidateQueries(["assets"])
            }
            className="rounded-sm border-secondary bg-slate-950 p-2 ut-button:mt-2 ut-button:bg-primary ut-button:px-4 ut-upload-icon:h-12"
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
          <div className="grid h-60 items-start justify-start gap-2 p-2 md:grid-cols-3 md:grid-rows-2">
            {assetsQuery?.isLoading && (
              <p className="col-span-full row-span-full text-center">
                Loading...
              </p>
            )}
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
