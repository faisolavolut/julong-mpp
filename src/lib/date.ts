import day from "dayjs";
import relative from "dayjs/plugin/relativeTime";

day.extend(relative);

export const longDate = (date: string | Date) => {
  if (date instanceof Date || typeof date === "string") {
    return day(date).format("DD MMM YYYY - hh:mm");
  }
  return "-";
};

export const shortDate = (date: string | Date) => {
  if (date instanceof Date || typeof date === "string") {
    return day(date).format("DD/MM/YYYY");
  }
  return "-";
};

export const timeAgo = (date: string | Date) => {
  if (date instanceof Date || typeof date === "string") {
    return day(date).fromNow();
  }
  return "-";
};
export const formatTime = (date: string | Date) => {
  if (date instanceof Date || typeof date === "string") {
    return day(date).format("hh:mm");
  }
  return "-";
};
