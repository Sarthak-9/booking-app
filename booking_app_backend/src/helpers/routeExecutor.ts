import { Request, Response, NextFunction } from "express";

class BadRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BadRequestError";
  }
}

class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

class InternalServerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InternalServerError";
  }
}

class ExistingEventError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "EventAlreadyExists";
  }
}

const routeExecutor =
  (handler: any, params?: Record<string, boolean>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await handler(req, res, params);
      res.status(200).send(response);
    } catch (e) {
      if (e instanceof BadRequestError) {
        res.status(400).send({ error: e.message });
      } else if (e instanceof NotFoundError) {
        res.status(404).send({ error: e.message });
      } else if (e instanceof InternalServerError) {
        res.status(500).send({ error: e.message });
      } else if (e instanceof ExistingEventError) {
        res.status(422).send({ error: e.message });
      } else {
        res.status(500).send({ error: "An unexpected error occurred" });
      }
      next(e);
    }
  };

export {
  routeExecutor,
  BadRequestError,
  NotFoundError,
  InternalServerError,
  ExistingEventError,
};
