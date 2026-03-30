import prismaClient from "../../prisma/index";

interface FinishOrderProps {
    order_id: string;
}

class FinishOrderService {
    async execute({ order_id }: FinishOrderProps) {

        const order = await prismaClient.order.findFirst({
            where: {
                id: order_id,
            },
        });

        if (!order) {
            throw new Error("Pedido não encontrado");
        }

        if (order.status) {
            throw new Error("Pedido já foi finalizado");
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