import prismaClient from "../../prisma/index";
import { AppError } from "../../errors/AppError";

interface DeleteOrderProps {
    order_id: string;
}

class DeleteOrderService {
    async execute({ order_id }: DeleteOrderProps) {

        const order = await prismaClient.order.findFirst({
            where: {
                id: order_id,
            },
        });

        if (!order) {
            throw new AppError("Pedido não encontrado", 404);
        }

        const deletedOrder = await prismaClient.order.delete({
            where: {
                id: order_id,
            },
        });

        return deletedOrder;
    }
}

export { DeleteOrderService };