import prisma from "../../prisma";

interface CategoryRequest {
    name: string;
}

class CreateCategoryService {
    async execute({ name }: CategoryRequest) {

        if (!name || name.trim() === "") {
            throw new Error("O nome da categoria é obrigatório.");
        }

        const categoryExists = await prisma.category.findFirst({
            where: { name },
        });

        if (categoryExists) {
            throw new Error("Categoria já cadastrada.");
        }

        const category = await prisma.category.create({
            data: { name },
            select: { id: true, name: true, created_at: true },
        });

        return category;
    }
}

export { CreateCategoryService };
