import prisma from "../../prisma";

class ListCategoryService {
    async execute() {

        const categories = await prisma.category.findMany({
            select: {
                id: true,
                name: true,
                created_at: true,
            },
            orderBy: {
                created_at: "desc",
            },
        });


        return categories;
    }
}

export { ListCategoryService };
