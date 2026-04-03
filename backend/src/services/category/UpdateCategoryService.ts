import prismaClient from "../../prisma/index";
import { AppError } from "../../errors/AppError";

interface UpdateCategoryProps {
    category_id: string;
    name?: string;
    disabled?: boolean;
}

class UpdateCategoryService {
    async execute({ category_id, name, disabled }: UpdateCategoryProps) {

        const category = await prismaClient.category.findFirst({
            where: { id: category_id },
            select: { id: true, name: true },
        });

        if (!category) {
            throw new AppError("Categoria não encontrada", 404);
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