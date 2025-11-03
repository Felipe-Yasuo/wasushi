import prisma from "../../prisma";

interface ProductRequest {
    category_id: string;
}

class ListByCategoryService {
    async execute({ category_id }: ProductRequest) {
        if (!category_id) {
            throw new Error("Categoria não informada.");
        }

        const products = await prisma.product.findMany({
            where: { category_id },
            select: {
                id: true,
                name: true,
                price: true,
                description: true,
                banner: true,
                category_id: true,
            },
        });

        return products;
    }
}

export { ListByCategoryService };
