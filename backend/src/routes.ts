import { Router, Request, Response } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";

const router = Router();


// Controllers
const createUserController = new CreateUserController()
const authUserController = new AuthUserController();


// Rotas
router.post('/users', (req, res) => createUserController.handle(req, res))
router.post("/session", (req, res) => authUserController.handle(req, res));

export { router };