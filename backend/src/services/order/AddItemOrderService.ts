import prismaClient from "../../prisma/index";
import { AppError } from "../../errors/AppError";

interface AddItemProps {
    order_id: string;
    product_id: string;
    amount: number;
}

class AddItemOrderService {
    async execute({ order_id, product_id, amount }: AddItemProps) {

        const orderExists = await prismaClient.order.findFirst({
            where: {
                id: order_id,
            },
        });

        if (!orderExists) {
            throw new AppError("Pedido não encontrado", 404);
        }

        const productExists = await prismaClient.product.findFirst({
            where: {
                id: product_id,
            },
        });

        if (!productExists) {
            throw new AppError("Produto não encontrado", 404);
        }

        const item = await prismaClient.item.create({
            data: {
                order_id: order_id,
                product_id: product_id,
                amount: amount,
            },
            include: {
                product: true,
            },
        });

        return item;
    }
}

export { AddItemOrderService };