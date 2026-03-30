import prismaClient from "../../prisma/index";

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
        });

        if (!order) {
            throw new Error("Pedido não encontrado");
        }

        if (!order.draft) {
            throw new Error("Pedido já foi enviado para a cozinha");
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