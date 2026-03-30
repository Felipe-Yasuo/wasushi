import { Request, Response } from "express";
import { DeleteProductService } from "../../services/product/DeleteProductService";

class DeleteProductController {
    async handle(request: Request, response: Response) {
        const product_id = request.query.product_id as string;

        if (!product_id) {
            return response.status(400).json({
                error: "product_id é obrigatório",
            });
        }

        const deleteProductService = new DeleteProductService();

        const product = await deleteProductService.execute({ product_id });

        return response.json(product);
    }
}

export { DeleteProductController };