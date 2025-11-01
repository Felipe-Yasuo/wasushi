import { Router, Request, Response } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailuserController } from "./controllers/user/DetailUserController";
import { isAuthenticated } from "./middleware/isAuthenticated";

const router = Router();


// Controllers
const createUserController = new CreateUserController()
const authUserController = new AuthUserController();


// Rotas
router.post('/users', (req, res) => createUserController.handle(req, res))
router.post("/session", (req, res) => authUserController.handle(req, res));



router.get("/me", isAuthenticated, new DetailuserController().handle);

export { router };