import prismaClient from "../../prisma/index";

class ListCategoryService {
    async execute() {

        const categories = await prismaClient.category.findMany({
            orderBy: {
                createdAt: "asc",
            },
        });

        return categories;
    }
}

export { ListCategoryService };