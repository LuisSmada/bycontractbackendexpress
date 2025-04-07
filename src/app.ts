import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import usersRouter from "routes/users/users.router";

const app = express();

app.use(cors());
app.use(morgan("combined"));
app.use(express.json());

app.use("/users", usersRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("OK");
});

export default app;
