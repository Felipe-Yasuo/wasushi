import { Router, Request, Response } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuthenticated } from "./middleware/isAuthenticated";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";

const router = Router();


// Controllers
const createUserController = new CreateUserController()
const authUserController = new AuthUserController();


// Rotas

//user
router.post('/users', (req, res) => createUserController.handle(req, res))
router.post("/session", (req, res) => authUserController.handle(req, res));
router.get("/me", isAuthenticated, new DetailUserController().handle);


//category
router.post("/category", isAuthenticated, new CreateCategoryController().handle);
router.get("/categories", isAuthenticated, new ListCategoryController().handle);


export { router };