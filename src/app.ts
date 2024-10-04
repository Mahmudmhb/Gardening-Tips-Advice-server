import express, { Application, Request, Response } from "express";
import router from "./app/route";
import cors from "cors";
import gobalErrorHandler from "./app/middleware/gobalErrorHandler";
import NotFound from "./app/middleware/notFound";
const app: Application = express();
app.use(express.json());
app.use(cors());
app.use("/api/", router);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
app.use(gobalErrorHandler);

//Not Found
// app.use(NotFound);
export default app;
