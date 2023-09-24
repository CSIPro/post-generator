"use client";

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
import { Poster, PosterFormInputs } from "@/components/templates/poster";
import { colorItemVariants } from "@/components/ui/color-item";

export type TemplateVariants = "poster" | "banner";

export interface Template {
  name: string;
  template: FC;
  form: FC;
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
  clearContext: () => void;
  template?: TemplateVariants;
  setTemplate: (template: TemplateVariants) => void;
  assetsQuery?: UseQueryResult<Asset[], unknown>;
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
  clearContext: () => {},
  setTemplate: (_) => {},
  primaryColor: {
    color: "primary",
    setPrimaryColor: (_) => {},
  },
  topics: {
    topics: [],
    addTopic: (_) => {},
    removeTopic: (_) => {},
    setTopics: (_) => {},
  },
  presenters: {
    presenters: [],
    addPresenter: (_) => {},
    removePresenter: (_) => {},
    setPresenters: (_) => {},
  },
  assets: {
    assets: [],
    addAsset: (_) => {},
    removeAsset: (_) => {},
    setAssets: (_) => {},
  },
  date: new Date(),
  setDate: () => {},
});

const getAssets = async () => {
  const res = await fetch("/api/assets");
  console.log(res);

  const data = (await res.json()) as Asset[];
  console.log(data);

  return data;
};

export const TemplateProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const assetsQuery = useQuery({ queryKey: ["assets"], queryFn: getAssets });

  const [template, setTemplate] = useState<TemplateVariants>("poster");
  const [primaryColor, setPrimaryColor] =
    useState<keyof typeof colorItemVariants>("primary");
  const form = useForm<PosterFormInputs | BannerFormInputs>();

  const [topics, setTopics] = useState<string[]>([]);
  const [presenters, setPresenters] = useState<string[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);

  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>();

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

  const clearContext = () => {
    setTemplate("poster");
    setPrimaryColor("primary");
    setTopics([]);
    setPresenters([]);
    setAssets([]);
    setDate(undefined);
    setTime(undefined);
  };

  const value = {
    clearContext,
    template,
    setTemplate,
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
