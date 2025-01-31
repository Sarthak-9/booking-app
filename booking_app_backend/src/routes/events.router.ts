import { Router } from "express";
import Executor from "../helpers/routeExecutor";
import { getEvents, getFreeEvents, bookEvent } from "../handlers/event.handler";

const EventRouter: Router = Router();

EventRouter.get("/events", Executor(getEvents));
EventRouter.get("/free-events", Executor(getFreeEvents));
EventRouter.post("/book-event", Executor(bookEvent));

export default EventRouter;
