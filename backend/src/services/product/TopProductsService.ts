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

        const productIds = topProducts.map((item) => item.product_id);

        const products = await prismaClient.product.findMany({
            where: { id: { in: productIds } },
            select: { id: true, name: true },
        });

        const productMap = new Map(products.map((p) => [p.id, p.name]));

        const productsWithDetails = topProducts.map((item) => ({
            id: item.product_id,
            name: productMap.get(item.product_id) || "Produto removido",
            totalSold: item._sum.amount || 0,
        }));

        return productsWithDetails;
    }
}

export { TopProductsService };