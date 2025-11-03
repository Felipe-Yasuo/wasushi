import { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService";

class CreateProductController {
    async handle(req: Request, res: Response) {
        const { name, price, description, category_id } = req.body;

        const banner = req.body.banner || "";

        const createProductService = new CreateProductService();

        const product = await createProductService.execute({
            name,
            price,
            description,
            banner,
            category_id,
        });

        return res.status(201).json(product);
    }
}

export { CreateProductController };
