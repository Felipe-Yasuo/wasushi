import prismaClient from "../../prisma/index";

interface ListOrdersProps {
    page?: number;
    limit?: number;
}

class ListOrdersService {
    async execute({ page = 1, limit = 20 }: ListOrdersProps = {}) {

        const skip = (page - 1) * limit;

        const [orders, total] = await Promise.all([
            prismaClient.order.findMany({
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
                skip,
                take: limit,
            }),
            prismaClient.order.count({
                where: {
                    draft: false,
                    status: false,
                },
            }),
        ]);

        return {
            data: orders,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
}

export { ListOrdersService };