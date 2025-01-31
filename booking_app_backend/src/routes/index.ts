import { Application, Router } from "express";
import EventRouter from "./events.router";

const routes: [string, Router][] = [["/event", EventRouter]];

export const attachRoutes = (app: Application) => {
  routes.forEach((route) => {
    const [url, controller] = route;
    app.use(url, controller);
  });
};

export default attachRoutes;
