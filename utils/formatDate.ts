import { format, compareAsc } from "date-fns";

export const formatDate = (dateStr: string) => {
  return format(new Date(dateStr), "MM/dd/yyyy");
};
