import prismaClient from "../../prisma/index";
import { AppError } from "../../errors/AppError";

interface DeleteProductProps {
    product_id: string;
}

class DeleteProductService {
    async execute({ product_id }: DeleteProductProps) {

        const product = await prismaClient.product.findFirst({
            where: {
                id: product_id,
            },
            select: { id: true },
        });

        if (!product) {
            throw new AppError("Produto não encontrado", 404);
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