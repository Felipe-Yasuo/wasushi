import prismaClient from "../../prisma/index";

interface ListProductProps {
    disabled?: boolean;
}

class ListProductService {
    async execute({ disabled }: ListProductProps) {

        const products = await prismaClient.product.findMany({
            where: {
                ...(disabled !== undefined && { disabled }),
            },
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
        });

        return products;
    }
}

export { ListProductService };