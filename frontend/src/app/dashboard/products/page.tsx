import { ProductForm } from "@/components/dashboard/product-form";
import { apiClient } from "@/lib/api";
import { getToken } from "@/lib/auth";
import { Category, Product, TopProduct } from "@/lib/types";
import { UtensilsCrossed } from "lucide-react";
import { ProductSearch } from "@/components/dashboard/product-search";

export default async function ProductsPage() {
    const token = await getToken();

    const [products, categories, topProducts] = await Promise.all([
        apiClient<Product[]>("/products", { token: token!, cache: "no-store" }),
        apiClient<Category[]>("/category", { token: token!, cache: "no-store" }),
        apiClient<TopProduct[]>("/products/top", { token: token!, cache: "no-store" }).catch(() => [] as TopProduct[]),
    ]);

    return (
        <div>
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-brand-primary">Produtos</h1>
                <ProductForm categories={categories.filter((c) => !c.disabled)} />
            </div>

            {/* Stats */}
            <div className="mb-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-surface-container p-6">
                    <p className="mb-1 text-xs font-semibold tracking-[0.15em] text-tertiary">
                        PERFORMANCE DO MENU
                    </p>
                    <p className="mb-4 text-xl font-semibold text-on-surface">
                        Pratos mais vendidos
                    </p>

                    {topProducts.length > 0 ? (
                        <div className="space-y-3">
                            {topProducts.map((item, index) => (
                                <div key={item.id} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-surface-high text-xs font-bold text-on-surface-variant">
                                            {index + 1}
                                        </span>
                                        <span className="text-sm text-on-surface">
                                            {item.name}
                                        </span>
                                    </div>
                                    <span className="text-2xl font-bold text-on-surface">
                                        {item.totalSold}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-on-surface-variant">
                            Nenhuma venda registrada ainda
                        </p>
                    )}
                </div>

                <div className="flex flex-col items-center justify-center rounded-xl bg-surface-container p-6">
                    <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-surface-high">
                        <UtensilsCrossed className="h-7 w-7 text-brand-primary" />
                    </div>
                    <p className="text-3xl font-bold text-on-surface">
                        {products.filter((p) => !p.disabled).length}
                    </p>
                    <p className="text-xs font-semibold tracking-[0.15em] text-on-surface-variant">
                        ITENS ATIVOS
                    </p>
                </div>
            </div>

            {/* Search + Table */}
            <ProductSearch products={products} categories={categories} />
        </div>
    );
}