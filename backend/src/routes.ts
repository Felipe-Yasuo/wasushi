import { Router, Request, Response } from "express";
import multer from "multer";

import uploadConfig from "./config/multer";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuthenticated } from "./middleware/isAuthenticated";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { CreateProductController } from "./controllers/product/CreateProductController";
import { ListByCategoryController } from "./controllers/product/ListByCategoryController";

const router = Router();
const upload = multer(uploadConfig.upload("./tmp"));


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


// product
router.post(
    "/product",
    isAuthenticated,
    upload.single("file"),
    new CreateProductController().handle
);
router.get(
    "/category/product",
    isAuthenticated,
    new ListByCategoryController().handle
);


export { router };