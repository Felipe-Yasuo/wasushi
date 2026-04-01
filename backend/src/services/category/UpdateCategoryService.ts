import prismaClient from "../../prisma/index";

interface UpdateCategoryProps {
    category_id: string;
    name?: string;
    disabled?: boolean;
}

class UpdateCategoryService {
    async execute({ category_id, name, disabled }: UpdateCategoryProps) {

        const category = await prismaClient.category.findFirst({
            where: { id: category_id },
        });

        if (!category) {
            throw new Error("Categoria não encontrada");
        }

        const updatedCategory = await prismaClient.category.update({
            where: { id: category_id },
            data: {
                name: name || category.name,
                ...(disabled !== undefined && { disabled }),
            },
        });

        return updatedCategory;
    }
}

export { UpdateCategoryService };