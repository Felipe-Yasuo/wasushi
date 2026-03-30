import { Router } from "express";
import multer from "multer";
import uploadConfig from "./config/multer";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";

import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { ListProductByCategoryController } from "./controllers/category/ListProductByCategoryController";

import { CreateProductController } from "./controllers/product/CreateProductController";
import { ListProductController } from "./controllers/product/ListProductController";
import { DeleteProductController } from "./controllers/product/DeleteProductController";

import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { AddItemController } from "./controllers/order/AddItemController";
import { RemoveItemController } from "./controllers/order/RemoveItemController";
import { DetailOrderController } from "./controllers/order/DetailOrderController";
import { SendOrderController } from "./controllers/order/SendOrderController";
import { FinishOrderController } from "./controllers/order/FinishOrderController";
import { ListOrdersController } from "./controllers/order/ListOrdersController";
import { DeleteOrderController } from "./controllers/order/DeleteOrderController";

import { createUserSchema, authUserSchema } from "./schemas/userSchema";
import { createCategorySchema, listProductByCategorySchema } from "./schemas/categorySchema";
import { createProductSchema, listProductSchema } from "./schemas/productSchema";
import {
    createOrderSchema,
    addItemSchema,
    removeItemSchema,
    detailOrderSchema,
    sendOrderSchema,
    finishOrderSchema,
    deleteOrderSchema,
} from "./schemas/orderSchema";
import { validateSchema } from "./middlewares/validateSchema";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { isAdmin } from "./middlewares/isAdmin";

const router = Router();
const upload = multer(uploadConfig);

// Rotas User
router.post("/users", validateSchema(createUserSchema), new CreateUserController().handle);
router.post("/session", validateSchema(authUserSchema), new AuthUserController().handle);
router.get("/me", isAuthenticated, new DetailUserController().handle);

// Rotas Category
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

// Rotas Product
router.post(
    "/product",
    isAuthenticated,
    isAdmin,
    upload.single("file"),
    validateSchema(createProductSchema),
    new CreateProductController().handle
);

router.get(
    "/products",
    isAuthenticated,
    validateSchema(listProductSchema),
    new ListProductController().handle
);

router.delete(
    "/product",
    isAuthenticated,
    isAdmin,
    new DeleteProductController().handle
);

// Rotas Order
router.post(
    "/order",
    isAuthenticated,
    validateSchema(createOrderSchema),
    new CreateOrderController().handle
);

router.delete(
    "/order",
    isAuthenticated,
    validateSchema(deleteOrderSchema),
    new DeleteOrderController().handle
);

router.get(
    "/order/detail",
    isAuthenticated,
    validateSchema(detailOrderSchema),
    new DetailOrderController().handle
);

router.get(
    "/orders",
    isAuthenticated,
    new ListOrdersController().handle
);

router.post(
    "/order/add",
    isAuthenticated,
    validateSchema(addItemSchema),
    new AddItemController().handle
);

router.delete(
    "/order/remove",
    isAuthenticated,
    validateSchema(removeItemSchema),
    new RemoveItemController().handle
);

router.put(
    "/order/send",
    isAuthenticated,
    validateSchema(sendOrderSchema),
    new SendOrderController().handle
);

router.put(
    "/order/finish",
    isAuthenticated,
    validateSchema(finishOrderSchema),
    new FinishOrderController().handle
);

export { router };