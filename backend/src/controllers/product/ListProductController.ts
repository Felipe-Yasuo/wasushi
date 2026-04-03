import { Request, Response } from "express";
import { ListProductService } from "../../services/product/ListProductService";

class ListProductController {
    async handle(request: Request, response: Response) {
        const disabled = request.query.disabled !== undefined
            ? request.query.disabled === "true"
            : undefined;
        const page = Number(request.query.page) || 1;
        const limit = Number(request.query.limit) || 20;

        const listProductService = new ListProductService();

        const products = await listProductService.execute({ disabled, page, limit });

        return response.json(products);
    }
}

export { ListProductController };