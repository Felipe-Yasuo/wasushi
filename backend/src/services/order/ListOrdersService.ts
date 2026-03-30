import prismaClient from "../../prisma/index";

class ListOrdersService {
    async execute() {

        const orders = await prismaClient.order.findMany({
            where: {
                draft: false,
                status: false,
            },
            orderBy: {
                createdAt: "asc",
            },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });

        return orders;
    }
}

export { ListOrdersService };