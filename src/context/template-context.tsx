import { FC, ReactNode, createContext, useState } from "react";
import type { SelectSingleEventHandler } from "react-day-picker";
import { FormProvider, useForm } from "react-hook-form";
import { UseQueryResult, useQuery } from "react-query";

import { Asset } from "@/components/asset-item/asset-item";
import { ContentForm } from "@/components/post-form/content-form";
import { Banner } from "@/components/templates/banner/banner";
import {
  BannerForm,
  BannerFormInputs,
} from "@/components/templates/banner/banner-form";
import {
  PostForm,
  Poster,
  PosterFormInputs,
} from "@/components/templates/poster";
import { colorItemVariants } from "@/components/ui/color-item";

export type TemplateVariants = "poster" | "banner";

export interface Template {
  name: string;
  template: FC<any>;
  form: FC<any>;
}

export const templates: Record<TemplateVariants, Template> = {
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

interface TemplateContextProps {
  template?: "poster" | "banner";
  setTemplate: (template: "poster" | "banner") => void;
  assetsQuery?: UseQueryResult<Asset[], unknown>;
  clearTemplate: () => void;
  primaryColor: {
    color: keyof typeof colorItemVariants;
    setPrimaryColor: (color: keyof typeof colorItemVariants) => void;
  };
  topics: {
    topics: string[];
    addTopic: (topic: string) => void;
    removeTopic: (topic: string) => void;
    setTopics: (topics: string[]) => void;
  };
  presenters: {
    presenters: string[];
    addPresenter: (presenter: string) => void;
    removePresenter: (presenter: string) => void;
    setPresenters: (presenters: string[]) => void;
  };
  assets: {
    assets: Asset[];
    addAsset: (assetKey: string) => void;
    removeAsset: (assetKey: string) => void;
    setAssets: (assetKeys: Asset[]) => void;
  };
  date?: Date;
  time?: string;
  setTime?: (time: string) => void;
  setDate: SelectSingleEventHandler;
}

export const TemplateContext = createContext<TemplateContextProps>({
  setTemplate: (template) => {},
  clearTemplate: () => {},
  primaryColor: {
    color: "primary",
    setPrimaryColor: (color) => {},
  },
  topics: {
    topics: [],
    addTopic: (topic) => {},
    removeTopic: (topic) => {},
    setTopics: (topics) => {},
  },
  presenters: {
    presenters: [],
    addPresenter: (presenter) => {},
    removePresenter: (presenter) => {},
    setPresenters: (presenters) => {},
  },
  assets: {
    assets: [],
    addAsset: (asset) => {},
    removeAsset: (asset) => {},
    setAssets: (assets) => {},
  },
  date: new Date(),
  setDate: () => {},
});

const getAssets = async () => {
  const res = await fetch("/api/images");

  const data = (await res.json()) as Asset[];

  return data;
};

export const TemplateProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const assetsQuery = useQuery({ queryKey: ["assets"], queryFn: getAssets });

  const [template, setTemplate] = useState<"poster" | "banner" | undefined>(
    "banner",
  );
  const [primaryColor, setPrimaryColor] =
    useState<keyof typeof colorItemVariants>("primary");
  const form = useForm<PosterFormInputs | BannerFormInputs, undefined, any>();

  const [topics, setTopics] = useState<string[]>([]);
  const [presenters, setPresenters] = useState<string[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);

  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>();

  const clearTemplate = () => setTemplate(undefined);

  const addTopic = (topic: string) => {
    if (!topic) return;

    setTopics((prevTopics) => [...prevTopics, topic]);
  };

  const removeTopic = (topic: string) => {
    setTopics((prevTopics) => prevTopics.filter((t) => t !== topic));
  };

  const addPresenter = (presenter: string) => {
    if (!presenter) return;

    setPresenters((prevPresenters) => [...prevPresenters, presenter]);
  };

  const removePresenter = (presenter: string) => {
    setPresenters((prevPresenters) =>
      prevPresenters.filter((p) => p !== presenter),
    );
  };

  const addAsset = (assetKey: string) => {
    const asset = assetsQuery.data?.find((a) => a.key === assetKey);

    if (!asset) return;

    setAssets((prevAssets) => [...prevAssets, asset]);
  };

  const removeAsset = (assetKey: string) => {
    setAssets((prevAssets) => prevAssets.filter((a) => a.key !== assetKey));
  };

  const value = {
    template,
    setTemplate,
    clearTemplate,
    assetsQuery,
    primaryColor: {
      color: primaryColor,
      setPrimaryColor,
    },
    topics: {
      topics,
      addTopic,
      removeTopic,
      setTopics,
    },
    presenters: {
      presenters,
      addPresenter,
      removePresenter,
      setPresenters,
    },
    assets: {
      assets,
      addAsset,
      removeAsset,
      setAssets,
    },
    date,
    time,
    setTime,
    setDate,
  };

  return (
    <TemplateContext.Provider value={value}>
      <FormProvider {...form}>{children}</FormProvider>
    </TemplateContext.Provider>
  );
};
