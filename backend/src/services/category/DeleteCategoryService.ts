import prismaClient from "../../prisma/index";

interface DeleteCategoryProps {
    category_id: string;
}

class DeleteCategoryService {
    async execute({ category_id }: DeleteCategoryProps) {

        const category = await prismaClient.category.findFirst({
            where: { id: category_id },
        });

        if (!category) {
            throw new Error("Categoria não encontrada");
        }

        const deletedCategory = await prismaClient.category.delete({
            where: { id: category_id },
        });

        return deletedCategory;
    }
}

export { DeleteCategoryService };