"use client";

import { useContext } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { MdAdd, MdRemove } from "react-icons/md";

import { TemplateContext } from "@/context/template-context";

import { Button } from "../ui/button";
import { DatePicker } from "../ui/date-picker";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export interface ContentFormInputs {
  event: string;
  title: string;
  topics: string;
  presenters: string;
  location: string;
  time: string;
}

export const ContentForm = () => {
  const {
    register: regContent,
    handleSubmit: submitContent,
    reset: resetContent,
  } = useForm<Pick<ContentFormInputs, "topics">>();

  const {
    register: regPresenters,
    handleSubmit: submitPresenters,
    reset: resetPresenters,
  } = useForm<Pick<ContentFormInputs, "presenters">>();

  const {
    topics: { topics, addTopic, removeTopic },
    presenters: { presenters, addPresenter, removePresenter },
    date,
    setTime,
    setDate,
  } = useContext(TemplateContext);

  const { register } = useFormContext();

  const onSubmitContent = (data: Pick<ContentFormInputs, "topics">) => {
    addTopic(data.topics);
    resetContent({ topics: "" });
  };

  const onSubmitPresenters = (data: Pick<ContentFormInputs, "presenters">) => {
    addPresenter(data.presenters);
    resetPresenters({ presenters: "" });
  };

  return (
    <>
      <div>
        <Label htmlFor="event">Evento</Label>
        <Input
          id="event"
          {...register("event")}
          type="text"
          placeholder="Evento"
          className="text-muted"
        />
      </div>
      <div>
        <Label htmlFor="title">Título</Label>
        <Input
          id="title"
          {...register("title")}
          type="text"
          placeholder="Título"
          className="text-muted"
        />
      </div>
      <div>
        <form onSubmit={submitContent(onSubmitContent)}>
          <Label htmlFor="content">Contenido</Label>
          <div className="flex flex-row items-center gap-2">
            <Input
              id="content"
              {...regContent("topics")}
              type="text"
              placeholder="Contenido"
              className="text-muted"
            />
            <Button
              type="submit"
              size="icon"
              className="text-lg transition-all hover:bg-primary hover:brightness-110"
            >
              <MdAdd />
            </Button>
          </div>
        </form>
        <ul className="py-2 pl-2">
          {topics.length < 1 && (
            <li className="flex flex-row items-center justify-center py-1">
              No hay temas
            </li>
          )}
          {topics.map((topic, index) => (
            <li
              key={`Topic ${topic} ${index}`}
              className="flex flex-row items-center justify-between gap-2 py-1"
            >
              <p>&#62; {topic}</p>
              <Button
                variant="outline"
                size="icon"
                className="h-6 cursor-pointer bg-transparent text-base text-white"
                onClick={removeTopic.bind(null, topic)}
              >
                <MdRemove />
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <form onSubmit={submitPresenters(onSubmitPresenters)}>
          <Label htmlFor="presenters">Presentadores</Label>
          <div className="flex flex-row items-center gap-2">
            <Input
              id="presenters"
              {...regPresenters("presenters")}
              type="text"
              placeholder="Presentadores"
              className="text-muted"
            />
            <Button
              type="submit"
              size="icon"
              className="text-lg transition-all hover:bg-primary hover:brightness-110"
            >
              <MdAdd />
            </Button>
          </div>
        </form>
        <ul className="py-2 pl-2">
          {presenters.length < 1 && (
            <li className="flex flex-row items-center justify-center py-1">
              No hay presentadores
            </li>
          )}
          {presenters.map((presenter, index) => (
            <li
              key={`Presenter ${presenter} ${index}`}
              className="flex flex-row items-center justify-between gap-2 py-1"
            >
              <p>&#62; {presenter}</p>
              <Button
                variant="outline"
                size="icon"
                className="h-6 cursor-pointer bg-transparent text-base text-white"
                onClick={removePresenter.bind(null, presenter)}
              >
                <MdRemove />
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <Label htmlFor="location">Ubicación</Label>
        <Input
          id="location"
          {...register("location")}
          type="text"
          placeholder="Ubicación"
          className="text-muted"
        />
      </div>
      <div>
        <Label htmlFor="date">Fecha</Label>
        <DatePicker date={date} setDate={setDate} />
      </div>
      <div>
        <Label htmlFor="time">Hora</Label>
        <Select onValueChange={setTime}>
          <SelectTrigger className="w-full text-muted">
            <SelectValue placeholder="Selecciona la hora" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 13 }, (_, i) => (
              <SelectItem key={`Time of day ${i}`} value={`${i + 8}:00`}>
                {`${i + 8}:00`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};
