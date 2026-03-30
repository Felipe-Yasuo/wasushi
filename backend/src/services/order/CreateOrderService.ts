import prismaClient from "../../prisma/index";

interface CreateOrderProps {
    table: number;
    name?: string;
}

class CreateOrderService {
    async execute({ table, name }: CreateOrderProps) {

        const order = await prismaClient.order.create({
            data: {
                table: table,
                name: name || null,
            },
        });

        return order;
    }
}

export { CreateOrderService };