import prismaClient from "../../prisma/index";
import { AppError } from "../../errors/AppError";

interface SendOrderProps {
    order_id: string;
    name: string;
}

class SendOrderService {
    async execute({ order_id, name }: SendOrderProps) {

        const order = await prismaClient.order.findFirst({
            where: {
                id: order_id,
            },
            select: { id: true, draft: true },
        });

        if (!order) {
            throw new AppError("Pedido não encontrado", 404);
        }

        if (!order.draft) {
            throw new AppError("Pedido já foi enviado para a cozinha", 400);
        }

        const updatedOrder = await prismaClient.order.update({
            where: {
                id: order_id,
            },
            data: {
                draft: false,
                name: name,
            },
        });

        return updatedOrder;
    }
}

export { SendOrderService };