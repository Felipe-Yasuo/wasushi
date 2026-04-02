import prismaClient from "../../prisma/index";
import { AppError } from "../../errors/AppError";

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
            throw new AppError("Categoria já existe", 409);
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