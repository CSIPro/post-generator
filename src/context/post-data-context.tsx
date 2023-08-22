import { createContext } from "react";
import type { SelectSingleEventHandler } from "react-day-picker";

interface PostDataContextProps {
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

export const PostDataContext = createContext<PostDataContextProps>({
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
