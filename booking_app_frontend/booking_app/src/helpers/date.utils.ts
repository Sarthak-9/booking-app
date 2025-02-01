export const toLocalISOString = (date: Date): string => {
  return new Intl.DateTimeFormat("default", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  })
    .format(date)
    .replace(/\//g, "-")
    .replace(", ", "T");
};

export const parseLocalDate = (dateString: string): Date => {
  if (dateString.endsWith("Z")) {
    dateString = dateString.slice(0, -1);
  }
  return new Date(dateString);
};
