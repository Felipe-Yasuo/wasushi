import prismaClient from "../../prisma/index";

interface ListProductByCategoryProps {
    category_id: string;
}

class ListProductByCategoryService {
    async execute({ category_id }: ListProductByCategoryProps) {

        const category = await prismaClient.category.findFirst({
            where: {
                id: category_id,
            },
        });

        if (!category) {
            throw new Error("Categoria não encontrada");
        }

        const products = await prismaClient.product.findMany({
            where: {
                category_id: category_id,
                disabled: false,
            },
            orderBy: {
                name: "asc",
            },
        });

        return products;
    }
}

export { ListProductByCategoryService };