import { Request, Response } from "express";
import { AddItemOrderService } from "../../services/order/AddItemOrderService";

class AddItemController {
    async handle(request: Request, response: Response) {
        const { order_id, product_id, amount } = request.body;

        const addItemService = new AddItemOrderService();

        const item = await addItemService.execute({
            order_id,
            product_id,
            amount,
        });

        return response.json(item);
    }
}

export { AddItemController };