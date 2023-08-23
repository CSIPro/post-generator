import { CalendarIcon } from "lucide-react";
import Link from "next/link";
import { FC, useContext } from "react";
import type { SelectSingleEventHandler } from "react-day-picker";
import { UseFormRegister, useForm } from "react-hook-form";
import { BiArrowBack } from "react-icons/bi";
import { MdAdd, MdRemove } from "react-icons/md";

import { PosterContext } from "@/context/poster";
import { cn } from "@/lib/utils";
import { formatFullDate } from "@/utils/utils";

import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export interface PostFormInputs {
  event: string;
  title: string;
  content: string;
  presenters: string;
  location: string;
  time: string;
}

interface Props {
  onDownload: () => void;
}

export const PostForm: FC<Props> = ({ onDownload }) => {
  const {
    register: regContent,
    handleSubmit: submitContent,
    reset: resetContent,
  } = useForm<Pick<PostFormInputs, "content">>();

  const {
    register: regPresenters,
    handleSubmit: submitPresenters,
    reset: resetPresenters,
  } = useForm<Pick<PostFormInputs, "presenters">>();

  const {
    posterForm,
    topics,
    presenters,
    date,
    setTime,
    addTopic,
    removeTopic,
    addPresenter,
    removePresenter,
    setDate,
  } = useContext(PosterContext);

  const onSubmitContent = (data: Pick<PostFormInputs, "content">) => {
    addTopic(data.content);
    resetContent({ content: "" });
  };

  const onSubmitPresenters = (data: Pick<PostFormInputs, "presenters">) => {
    addPresenter(data.presenters);
    resetPresenters({ presenters: "" });
  };

  const handleDownload = () => {
    onDownload();
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-muted text-white">
      <div className="relative flex h-full flex-col gap-1 overflow-auto p-2">
        <div className="flex flex-row items-center gap-2">
          <Link
            href="/"
            className="flex h-8 items-center justify-center rounded-sm border border-white bg-muted px-2 text-lg transition-all hover:bg-primary"
          >
            <BiArrowBack />
          </Link>
          <h1 className="text-xl">Edita el contenido</h1>
        </div>
        <div>
          <Label htmlFor="event">Evento</Label>
          <Input
            id="event"
            {...posterForm?.register("event")}
            type="text"
            placeholder="Evento"
            className="text-muted"
          />
        </div>
        <div>
          <Label htmlFor="title">Título</Label>
          <Input
            id="title"
            {...posterForm?.register("title")}
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
                {...regContent("content")}
                type="text"
                placeholder="Contenido"
                className="text-muted"
              />
              <Button
                type="submit"
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
                  className="h-6 cursor-pointer bg-transparent text-lg text-white"
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
                  className="h-6 cursor-pointer bg-transparent text-lg text-white"
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
            {...posterForm?.register("location")}
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
                <SelectItem key={i} value={`${i + 8}:00`}>
                  {`${i + 8}:00`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          type="button"
          onClick={handleDownload}
          className="mt-1 w-full transition-all hover:bg-primary hover:brightness-110"
        >
          Descargar
        </Button>
      </div>
    </div>
  );
};

interface DatePickerProps {
  date?: Date;
  setDate: SelectSingleEventHandler;
}

const DatePicker: FC<DatePickerProps> = ({ date, setDate }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal text-muted hover:bg-primary hover:text-white",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? formatFullDate(date) : <span>Escoge una fecha</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
