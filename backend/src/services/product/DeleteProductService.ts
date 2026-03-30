import prismaClient from "../../prisma/index";

interface DeleteProductProps {
    product_id: string;
}

class DeleteProductService {
    async execute({ product_id }: DeleteProductProps) {

        const product = await prismaClient.product.findFirst({
            where: {
                id: product_id,
            },
        });

        if (!product) {
            throw new Error("Produto não encontrado");
        }

        const deletedProduct = await prismaClient.product.delete({
            where: {
                id: product_id,
            },
        });

        return deletedProduct;
    }
}

export { DeleteProductService };