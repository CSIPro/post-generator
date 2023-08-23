import { format } from "date-fns";
import { es } from "date-fns/locale";

export const formatFullDate = (date: Date) => {
  const formattedDate = format(date, "EEEE dd 'de' MMMM 'del' yyyy", {
    locale: es,
  });

  return (
    formattedDate.substring(0, 1).toUpperCase() + formattedDate.substring(1)
  );
};
