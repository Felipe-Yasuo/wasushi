import { Request, Response } from "express";
import { UpdateProductService } from "../../services/product/UpdateProductService";

class UpdateProductController {
    async handle(request: Request, response: Response) {
        const product_id = request.query.product_id as string;
        const { name, price, description, category_id } = request.body;
        const file = request.file;

        if (!product_id) {
            return response.status(400).json({
                error: "product_id é obrigatório",
            });
        }

        const updateProductService = new UpdateProductService();

        const product = await updateProductService.execute({
            product_id,
            name,
            price,
            description,
            category_id,
            file,
        });

        return response.json(product);
    }
}

export { UpdateProductController };