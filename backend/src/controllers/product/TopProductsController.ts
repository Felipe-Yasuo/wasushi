import { Request, Response } from "express";
import { TopProductsService } from "../../services/product/TopProductsService";

class TopProductsController {
    async handle(request: Request, response: Response) {

        const topProductsService = new TopProductsService();

        const topProducts = await topProductsService.execute();

        return response.json(topProducts);
    }
}

export { TopProductsController };