import prismaClient from "../../prisma/index";

interface ListProductProps {
    disabled?: boolean;
    page?: number;
    limit?: number;
}

class ListProductService {
    async execute({ disabled, page = 1, limit = 20 }: ListProductProps) {

        const skip = (page - 1) * limit;
        const where = {
            ...(disabled !== undefined && { disabled }),
        };

        const [products, total] = await Promise.all([
            prismaClient.product.findMany({
                where,
                include: {
                    category: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
                orderBy: {
                    name: "asc",
                },
                skip,
                take: limit,
            }),
            prismaClient.product.count({ where }),
        ]);

        return {
            data: products,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
}

export { ListProductService };