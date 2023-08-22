import { format } from "date-fns";
import { es } from "date-fns/locale";

export const formatFullDate = (date: Date) =>
  format(date, "dd 'de' MMMM 'del' yyyy", { locale: es });
