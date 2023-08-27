import { CalendarIcon } from "lucide-react";
import { FC } from "react";
import type { SelectSingleEventHandler } from "react-day-picker";

import { cn } from "@/lib/utils";
import { formatFullDate } from "@/utils/utils";

import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

interface DatePickerProps {
  date?: Date;
  setDate: SelectSingleEventHandler;
}

export const DatePicker: FC<DatePickerProps> = ({ date, setDate }) => {
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
