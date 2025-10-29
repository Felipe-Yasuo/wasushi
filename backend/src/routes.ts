import { Router, Request, Response } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";

const router = Router();

const createUserController = new CreateUserController()



// Rota para criar usuário
router.post('/users', (req, res) => createUserController.handle(req, res))

export { router };