import { Router } from "express";
import { routeExecutor } from "../helpers/routeExecutor";
import { getEvents, getFreeEvents, bookEvent } from "../handlers/event.handler";

const EventRouter: Router = Router();

EventRouter.get("/events", routeExecutor(getEvents));
EventRouter.get("/free-events", routeExecutor(getFreeEvents));
EventRouter.post("/book-event", routeExecutor(bookEvent));

export default EventRouter;
