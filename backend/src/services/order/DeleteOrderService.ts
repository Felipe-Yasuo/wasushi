import prismaClient from "../../prisma/index";

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
            throw new Error("Pedido não encontrado");
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