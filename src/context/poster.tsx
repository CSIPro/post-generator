import {
  FC,
  ReactNode,
  RefObject,
  createContext,
  useRef,
  useState,
} from "react";
import type { SelectSingleEventHandler } from "react-day-picker";
import { UseFormReturn, useForm } from "react-hook-form";

import type { ContentFormInputs } from "@/components/post-form/content-form";

interface PosterContextProps {
  posterForm?: UseFormReturn<ContentFormInputs, undefined, any>;
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
  pictures?: {
    pictures: string[];
    addPicture?: (picture: string) => void;
    removePicture?: (picture: string) => void;
    setPictures?: (pictures: string[]) => void;
  };
  date?: Date;
  time?: string;
  setTime?: (time: string) => void;
  setDate: SelectSingleEventHandler;
}

export const PosterContext = createContext<PosterContextProps>({
  topics: {
    topics: [],
    addTopic: (topic: string) => {},
    removeTopic: (topic: string) => {},
    setTopics: (topics: string[]) => {},
  },
  presenters: {
    presenters: [],
    addPresenter: (presenter: string) => {},
    removePresenter: (presenter: string) => {},
    setPresenters: (presenters: string[]) => {},
  },
  pictures: {
    pictures: [],
    addPicture: (picture: string) => {},
    removePicture: (picture: string) => {},
    setPictures: (pictures: string[]) => {},
  },
  date: new Date(),
  setDate: () => {},
});

export const PosterContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [topics, setTopics] = useState<string[]>([]);
  const [presenters, setPresenters] = useState<string[]>([]);
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

  const providerValue = {
    posterForm,
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
