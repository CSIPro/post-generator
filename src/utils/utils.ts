/* eslint-disable import/no-duplicates */
import { format } from "date-fns";
import { es } from "date-fns/locale";

export const formatFullTemplateDate = (date: Date) => {
  const formattedDate = format(date, "EEEE dd 'de' MMMM 'del' yyyy", {
    locale: es,
  });

  return (
    formattedDate.substring(0, 1).toUpperCase() + formattedDate.substring(1)
  );
};

export const formatFullDate = (date: Date) =>
  format(date, "dd 'de' MMMM 'del' yyyy", { locale: es });
