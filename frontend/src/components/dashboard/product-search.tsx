"use client";

import { Category, Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { Search } from "lucide-react";
import { useState } from "react";
import { EditProductForm } from "./edit-product-form";
import { DeleteButton } from "./delete-button";

interface ProductSearchProps {
    products: Product[];
    categories: Category[];
}

export function ProductSearch({ products, categories }: ProductSearchProps) {
    const [search, setSearch] = useState("");

    const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase()) ||
        product.category?.name?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="rounded-xl bg-surface-container">
            {/* Search bar */}
            <div className="p-5">
                <div className="relative max-w-sm">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-variant/50" />
                    <input
                        type="text"
                        placeholder="Buscar pratos..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-lg bg-surface-highest/60 py-2.5 pl-10 pr-4 text-sm text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-outline-variant/10">
                            <th className="px-5 py-3 text-left text-xs font-semibold tracking-[0.15em] text-on-surface-variant">
                                IMAGEM
                            </th>
                            <th className="px-5 py-3 text-left text-xs font-semibold tracking-[0.15em] text-on-surface-variant">
                                NOME
                            </th>
                            <th className="px-5 py-3 text-left text-xs font-semibold tracking-[0.15em] text-on-surface-variant">
                                CATEGORIA
                            </th>
                            <th className="px-5 py-3 text-left text-xs font-semibold tracking-[0.15em] text-on-surface-variant">
                                PREÇO
                            </th>
                            <th className="px-5 py-3 text-right text-xs font-semibold tracking-[0.15em] text-on-surface-variant">
                                AÇÃO
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((product) => (
                            <tr
                                key={product.id}
                                className="border-b border-outline-variant/5 transition-colors hover:bg-surface-high/30"
                            >
                                <td className="px-5 py-4">
                                    <img
                                        src={product.banner}
                                        alt={product.name}
                                        className="h-12 w-16 rounded-lg object-cover"
                                    />
                                </td>
                                <td className="px-5 py-4">
                                    <p className="font-medium text-on-surface">
                                        {product.name}
                                    </p>
                                    <p className="max-w-xs truncate text-xs text-on-surface-variant">
                                        {product.description}
                                    </p>
                                </td>
                                <td className="px-5 py-4">
                                    <span className="rounded-full bg-surface-high px-3 py-1 text-xs font-semibold uppercase text-on-surface-variant">
                                        {product.category?.name || "—"}
                                    </span>
                                </td>
                                <td className="px-5 py-4 text-sm font-medium text-on-surface">
                                    {formatPrice(product.price)}
                                </td>
                                <td className="px-5 py-4">
                                    <div className="flex items-center justify-end gap-1">
                                        <EditProductForm
                                            product={product}
                                            categories={categories}
                                        />
                                        <DeleteButton productId={product.id} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filtered.length === 0 && (
                    <div className="flex h-32 items-center justify-center">
                        <p className="text-on-surface-variant">
                            {search ? "Nenhum produto encontrado" : "Nenhum produto cadastrado"}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}