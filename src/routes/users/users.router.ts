import { Router } from "express";
import { httpCreateNewUser } from "./users.controller";

const usersRouter = Router();

usersRouter.post("/", httpCreateNewUser);

export default usersRouter;
