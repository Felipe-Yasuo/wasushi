import prismaClient from "../../prisma/index";

class TopProductsService {
    async execute() {

        const topProducts = await prismaClient.item.groupBy({
            by: ["product_id"],
            _sum: {
                amount: true,
            },
            orderBy: {
                _sum: {
                    amount: "desc",
                },
            },
            take: 5,
        });

        const productsWithDetails = await Promise.all(
            topProducts.map(async (item) => {
                const product = await prismaClient.product.findFirst({
                    where: { id: item.product_id },
                    select: { id: true, name: true },
                });

                return {
                    id: item.product_id,
                    name: product?.name || "Produto removido",
                    totalSold: item._sum.amount || 0,
                };
            })
        );

        return productsWithDetails;
    }
}

export { TopProductsService };