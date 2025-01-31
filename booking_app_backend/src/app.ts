import express from "express";
import cors from "cors";
import attachRoutes from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
attachRoutes(app);

export default app;
