import { Router } from "express";
import {
  httpCreateNewUser,
  httpDeleteUserById,
  httpGetAllUsers,
  httpGetUserById,
} from "./users.controller";

const usersRouter = Router();

usersRouter.post("/", httpCreateNewUser);
usersRouter.get("/", httpGetAllUsers);
usersRouter.get("/:id", httpGetUserById);
usersRouter.delete("/:id", httpDeleteUserById);

export default usersRouter;
