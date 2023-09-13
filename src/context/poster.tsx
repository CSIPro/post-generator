import { FC, ReactNode, createContext, useState } from "react";
import type { SelectSingleEventHandler } from "react-day-picker";
import { UseFormReturn, useForm } from "react-hook-form";
import { useQuery, type UseQueryResult } from "react-query";

import { Asset } from "@/components/asset-item/asset-item";
import type { ContentFormInputs } from "@/components/post-form/content-form";
import { colorItemVariants } from "@/components/ui/color-item";

interface PosterContextProps {
  posterForm?: UseFormReturn<ContentFormInputs, undefined, any>;
  assetsQuery?: UseQueryResult<Asset[], unknown>;
  posterBg: {
    posterBg: keyof typeof colorItemVariants;
    setPosterBg: (color: keyof typeof colorItemVariants) => void;
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

export const PosterContext = createContext<PosterContextProps>({
  posterBg: { posterBg: "primary", setPosterBg: (_) => {} },
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
  const res = await fetch("/api/images");

  const data = (await res.json()) as Asset[];

  return data;
};

export const PosterContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const assetsQuery = useQuery({ queryKey: ["assets"], queryFn: getAssets });

  const [posterBg, setPosterBg] =
    useState<keyof typeof colorItemVariants>("primary");
  const [topics, setTopics] = useState<string[]>([]);
  const [presenters, setPresenters] = useState<string[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);

  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>();

  const posterForm = useForm<ContentFormInputs>();

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

  const providerValue = {
    posterForm,
    assetsQuery,
    posterBg: {
      posterBg,
      setPosterBg,
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
    <PosterContext.Provider value={providerValue}>
      {children}
    </PosterContext.Provider>
  );
};
