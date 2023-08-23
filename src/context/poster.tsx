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

import { PostFormInputs } from "@/components/post-form/post-form";

interface PosterContextProps {
  posterForm?: UseFormReturn<PostFormInputs, undefined, any>;
  topics: string[];
  presenters: string[];
  pictures?: string[];
  date?: Date;
  time?: string;
  setTime?: (time: string) => void;
  setDate: SelectSingleEventHandler;
  addTopic: (topic: string) => void;
  removeTopic: (topic: string) => void;
  addPresenter: (presenter: string) => void;
  removePresenter: (presenter: string) => void;
  setTopics: (topics: string[]) => void;
  setPresenters: (presenters: string[]) => void;
  setPictures?: (pictures: string[]) => void;
}

export const PosterContext = createContext<PosterContextProps>({
  topics: [],
  presenters: [],
  pictures: [],
  date: new Date(),
  setDate: () => {},
  addTopic: (topic: string) => {},
  removeTopic: (topic: string) => {},
  addPresenter: (presenter: string) => {},
  removePresenter: (presenter: string) => {},
  setTopics: (topics: string[]) => {},
  setPresenters: (presenters: string[]) => {},
  setPictures: (pictures: string[]) => {},
});

export const PosterContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [topics, setTopics] = useState<string[]>([]);
  const [presenters, setPresenters] = useState<string[]>([]);
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>();

  const posterForm = useForm<PostFormInputs>();

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
    topics,
    presenters,
    date,
    time,
    setTime,
    setDate,
    addTopic,
    removeTopic,
    addPresenter,
    removePresenter,
    setTopics,
    setPresenters,
  };

  return (
    <PosterContext.Provider value={providerValue}>
      {children}
    </PosterContext.Provider>
  );
};
