import { FC, ReactNode, createContext, useState } from "react";
import type { SelectSingleEventHandler } from "react-day-picker";
import { UseFormReturn, useForm } from "react-hook-form";

import type { ContentFormInputs } from "@/components/post-form/content-form";
import { colorItemVariants } from "@/components/ui/color-item";

interface PosterContextProps {
  posterForm?: UseFormReturn<ContentFormInputs, undefined, any>;
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
    assets: File[];
    addAsset: (asset: File) => void;
    removeAsset: (asset: File) => void;
    setAssets: (assets: File[]) => void;
  };
  date?: Date;
  time?: string;
  setTime?: (time: string) => void;
  setDate: SelectSingleEventHandler;
}

export const PosterContext = createContext<PosterContextProps>({
  posterBg: { posterBg: "primary", setPosterBg: (color) => {} },
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

export const PosterContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [posterBg, setPosterBg] =
    useState<keyof typeof colorItemVariants>("primary");
  const [topics, setTopics] = useState<string[]>([]);
  const [presenters, setPresenters] = useState<string[]>([]);
  const [assets, setAssets] = useState<File[]>([]);

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

  const addAsset = (asset: File) => {
    setAssets((prevAssets) => [...prevAssets, asset]);
  };

  const removeAsset = (asset: File) => {
    setAssets((prevAssets) => prevAssets.filter((a) => a !== asset));
  };

  const providerValue = {
    posterForm,
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
