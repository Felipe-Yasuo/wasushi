import { Request, Response } from "express";
import { DeleteOrderService } from "../../services/order/DeleteOrderService";

class DeleteOrderController {
    async handle(request: Request, response: Response) {
        const order_id = request.query.order_id as string;

        if (!order_id) {
            return response.status(400).json({
                error: "order_id é obrigatório",
            });
        }

        const deleteOrderService = new DeleteOrderService();

        const order = await deleteOrderService.execute({ order_id });

        return response.json(order);
    }
}

export { DeleteOrderController };