import { Request, Response } from "express";
import { ListProductService } from "../../services/product/ListProductService";

class ListProductController {
    async handle(request: Request, response: Response) {
        const disabledParam = request.query.disabled as string | undefined;
        const disabled = disabledParam !== undefined ? disabledParam === "true" : undefined;

        const listProductService = new ListProductService();

        const products = await listProductService.execute({ disabled });

        return response.json(products);
    }
}

export { ListProductController };