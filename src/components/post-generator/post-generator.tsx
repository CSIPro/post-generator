"use client";

import { toPng } from "html-to-image";
import { FC, ForwardRefExoticComponent, RefAttributes, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { ContentForm } from "../post-form/content-form";
import { PostForm } from "../post-form/post-form";
import { PostViewer } from "../post-viewer/post-viewer";
import { TemplateVariant } from "../template-item/template-item";
import { Banner } from "../templates/banner/banner";
import { BannerForm, BannerFormInputs } from "../templates/banner/banner-form";
import { Poster, PosterFormInputs } from "../templates/poster";

type FormInputs = PosterFormInputs | BannerFormInputs;

interface Template {
  name: string;
  template: ForwardRefExoticComponent<RefAttributes<HTMLDivElement>>;
  form: FC;
}

interface Props {
  template: TemplateVariant;
}

const templates: Record<TemplateVariant, Template> = {
  poster: {
    name: "Poster",
    template: Poster,
    form: ContentForm,
  },
  banner: {
    name: "Banner",
    template: Banner,
    form: BannerForm,
  },
};

export const PostGenerator: FC<Props> = ({ template }) => {
  const postRef = useRef<HTMLDivElement>(null);

  const postForm = useForm<FormInputs>();

  const handlePostDownload = async () => {
    if (postRef.current === null) return;

    const { offsetHeight, offsetWidth } = postRef.current;

    const postLink = await toPng(postRef.current, {
      cacheBust: true,
      canvasHeight: offsetHeight,
      canvasWidth: offsetWidth,
    });

    const now = new Date().getTime();

    const downloadLink = document.createElement("a");
    downloadLink.href = postLink;
    downloadLink.download = `${template}-${now}.png`;
    downloadLink.click();
  };

  const getCurrentTemplateOffset = () => {
    if (postRef.current === null) return;

    const { offsetWidth, offsetHeight } = postRef.current;

    return {
      width: offsetWidth,
      height: offsetHeight,
    };
  };

  const { form: Form, template: Template } = templates[template];

  return (
    <section className="grid w-full grid-cols-1 grid-rows-2 md:grid-cols-5 md:grid-rows-1">
      <FormProvider {...postForm}>
        <PostViewer onFitToViewer={getCurrentTemplateOffset}>
          <Template ref={postRef} />
        </PostViewer>
        <PostForm onDownload={handlePostDownload}>
          <Form />
        </PostForm>
      </FormProvider>
    </section>
  );
};
