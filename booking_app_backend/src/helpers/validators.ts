import { BadRequestError } from "./routeExecutor";

export const validateGetRequests = (startDate: string) => {
  if (!startDate) {
    throw new BadRequestError("Start Date is required");
  }
};

export const validateBookEventRequest = (
  startDate: string,
  endDate: string
) => {
  if (!startDate) {
    throw new BadRequestError("Start Date is required");
  }
  if (!endDate) {
    throw new BadRequestError("End Date is required");
  } else {
    const preparedStartDate = new Date(startDate);
    const preparedEndDate = new Date(endDate);
    if (preparedEndDate < preparedStartDate) {
      throw new BadRequestError("Invalid Date Combination");
    }
  }
};
