import prismaClient from "../../prisma/index";
import { AppError } from "../../errors/AppError";

interface ListProductByCategoryProps {
    category_id: string;
}

class ListProductByCategoryService {
    async execute({ category_id }: ListProductByCategoryProps) {

        const category = await prismaClient.category.findFirst({
            where: {
                id: category_id,
            },
            select: { id: true },
        });

        if (!category) {
            throw new AppError("Categoria não encontrada", 404);
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