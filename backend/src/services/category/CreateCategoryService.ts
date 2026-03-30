import prismaClient from "../../prisma/index";

interface CreateCategoryProps {
    name: string;
}

class CreateCategoryService {
    async execute({ name }: CreateCategoryProps) {

        const categoryAlreadyExists = await prismaClient.category.findFirst({
            where: {
                name: name,
            },
        });

        if (categoryAlreadyExists) {
            throw new Error("Categoria já existe");
        }

        const category = await prismaClient.category.create({
            data: {
                name: name,
            },
        });

        return category;
    }
}

export { CreateCategoryService };