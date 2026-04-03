import { Request, Response } from "express";
import { ListOrdersService } from "../../services/order/ListOrdersService";

class ListOrdersController {
    async handle(request: Request, response: Response) {
        const page = Number(request.query.page) || 1;
        const limit = Number(request.query.limit) || 20;

        const listOrdersService = new ListOrdersService();

        const orders = await listOrdersService.execute({ page, limit });

        return response.json(orders);
    }
}

export { ListOrdersController };