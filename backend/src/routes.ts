import { Router } from "express";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";

import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { ListProductByCategoryController } from "./controllers/category/ListProductByCategoryController";

import { createUserSchema, authUserSchema } from "./schemas/userSchema";
import { createCategorySchema, listProductByCategorySchema } from "./schemas/categorySchema";
import { validateSchema } from "./middlewares/validateSchema";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { isAdmin } from "./middlewares/isAdmin";

const router = Router();

router.post("/users", validateSchema(createUserSchema), new CreateUserController().handle);
router.post("/session", validateSchema(authUserSchema), new AuthUserController().handle);
router.get("/me", isAuthenticated, new DetailUserController().handle);

router.post(
    "/category",
    isAuthenticated,
    isAdmin,
    validateSchema(createCategorySchema),
    new CreateCategoryController().handle
);

router.get("/category", isAuthenticated, new ListCategoryController().handle);

router.get(
    "/category/product",
    isAuthenticated,
    validateSchema(listProductByCategorySchema),
    new ListProductByCategoryController().handle
);

export { router };