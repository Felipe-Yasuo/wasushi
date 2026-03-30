import prismaClient from "../../prisma/index";

interface DetailOrderProps {
    order_id: string;
}

class DetailOrderService {
    async execute({ order_id }: DetailOrderProps) {

        const order = await prismaClient.order.findFirst({
            where: {
                id: order_id,
            },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });

        if (!order) {
            throw new Error("Pedido não encontrado");
        }

        return order;
    }
}

export { DetailOrderService };
