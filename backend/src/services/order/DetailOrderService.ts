import prismaClient from "../../prisma/index";
import { AppError } from "../../errors/AppError";

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
            throw new AppError("Pedido não encontrado", 404);
        }

        return order;
    }
}

export { DetailOrderService };
