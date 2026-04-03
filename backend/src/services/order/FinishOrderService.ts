import prismaClient from "../../prisma/index";
import { AppError } from "../../errors/AppError";

interface FinishOrderProps {
    order_id: string;
}

class FinishOrderService {
    async execute({ order_id }: FinishOrderProps) {

        const order = await prismaClient.order.findFirst({
            where: {
                id: order_id,
            },
            select: { id: true, status: true },
        });

        if (!order) {
            throw new AppError("Pedido não encontrado", 404);
        }

        if (order.status) {
            throw new AppError("Pedido já foi finalizado", 400);
        }

        const updatedOrder = await prismaClient.order.update({
            where: {
                id: order_id,
            },
            data: {
                status: true,
            },
        });

        return updatedOrder;
    }
}

export { FinishOrderService };