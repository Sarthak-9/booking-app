export const parseLocalDate = (dateString: string): Date => {
  if (dateString.endsWith("Z")) {
    dateString = dateString.slice(0, -1);
  }
  return new Date(dateString);
};

export const formatDateToLocalISOString = (date: Date): string => {
  const pad = (num: number) => (num < 10 ? "0" : "") + num;
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};
