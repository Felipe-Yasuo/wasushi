import { Request, Response } from "express";
import { ListProductService } from "../../services/product/ListProductService";

class ListProductController {
    async handle(request: Request, response: Response) {
        const disabled = request.query.disabled === "true";

        const listProductService = new ListProductService();

        const products = await listProductService.execute({ disabled });

        return response.json(products);
    }
}

export { ListProductController };