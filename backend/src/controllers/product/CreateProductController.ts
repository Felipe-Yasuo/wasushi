import { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService";

class CreateProductController {
    async handle(request: Request, response: Response) {
        const { name, price, description, category_id } = request.body;

        const file = request.file;

        if (!file) {
            return response.status(400).json({
                error: "Imagem do produto é obrigatória",
            });
        }

        const createProductService = new CreateProductService();

        const product = await createProductService.execute({
            name,
            price,
            description,
            category_id,
            file,
        });

        return response.json(product);
    }
}

export { CreateProductController };