import { Request, Response } from "express";
import { UpdateProductService } from "../../services/product/UpdateProductService";

class UpdateProductController {
    async handle(request: Request, response: Response) {
        const product_id = request.query.product_id as string;
        const { name, price, description, category_id, disabled } = request.body;
        const file = request.file;

        const updateProductService = new UpdateProductService();

        const product = await updateProductService.execute({
            product_id,
            name,
            price,
            description,
            category_id,
            disabled,
            file,
        });

        return response.json(product);
    }
}

export { UpdateProductController };