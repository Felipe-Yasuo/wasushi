import prisma from "../../prisma";

interface ProductRequest {
    name: string;
    price: string;
    description: string;
    banner: string;
    category_id: string;
}

class CreateProductService {
    async execute({ name, price, description, banner, category_id }: ProductRequest) {
        if (!name || !price || !description || !category_id) {
            throw new Error("Campos obrigatórios não preenchidos.");
        }

        const category = await prisma.category.findUnique({
            where: { id: category_id },
        });

        if (!category) {
            throw new Error("Categoria não encontrada.");
        }

        const product = await prisma.product.create({
            data: {
                name,
                price,
                description,
                banner,
                category_id,
            },
            select: {
                id: true,
                name: true,
                price: true,
                description: true,
                banner: true,
                category_id: true,
            },
        });

        return product;
    }
}

export { CreateProductService };

