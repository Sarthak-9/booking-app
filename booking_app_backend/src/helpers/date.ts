import moment from "moment-timezone";
import config from "./config";

export const parseTime = (date: Date, timeString: string): Date => {
  const [hours, minutes, seconds] = timeString.split(":").map(Number);
  const newDate = new Date(date);
  newDate.setHours(hours, minutes, seconds, 0);
  return newDate;
};
export const prepareEndDateFromStartDate = (startDate: Date): Date => {
  const { endHour } = config.eventConfig;
  const endDate = parseTime(startDate, endHour);
  return endDate;
};

export const convertDateToUTC = (date: string, timezone: string): Date => {
  const utcDate = moment.tz(date, timezone).utc().toDate();
  return utcDate;
};

export const convertUTCToTimezone = (utcDate: Date, timezone: string): Date => {
  const localDate = moment
    .utc(utcDate)
    .tz(timezone)
    .format("YYYY-MM-DDTHH:mm:ss");
  return new Date(localDate);
};

export const convertUTCDateStringToTimezone = (
  utcDate: string,
  timezone: string
): string => {
  const localDate = moment.utc(utcDate).tz(timezone).format();
  return localDate;
};

export const getFullDateWithoutTime = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
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
