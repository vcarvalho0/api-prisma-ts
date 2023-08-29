import { Router } from "express";
import { UserController } from "@src/controllers/user-controller";
import { auth } from "@src/middlewares/auth";

export const routes = Router();

routes.post("/api/user", new UserController().create);
routes.post("/api/user/login", new UserController().login);

routes.get("/api/user", auth, new UserController().me);
