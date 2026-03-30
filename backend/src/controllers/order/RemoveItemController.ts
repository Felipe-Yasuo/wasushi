import { Request, Response } from "express";
import { RemoveItemOrderService } from "../../services/order/RemoveItemOrderService";

class RemoveItemController {
    async handle(request: Request, response: Response) {
        const item_id = request.query.item_id as string;

        const removeItemService = new RemoveItemOrderService();

        const item = await removeItemService.execute({ item_id });

        return response.json(item);
    }
}

export { RemoveItemController };