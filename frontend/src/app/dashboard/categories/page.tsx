import { CategoryForm } from "@/components/dashboard/category-form";
import { apiClient } from "@/lib/api";
import { getToken } from "@/lib/auth";
import { Category } from "@/lib/types";
import { formatDate } from "@/lib/format";

export default async function CategoriesPage() {
    const token = await getToken();

    const categories = await apiClient<Category[]>("/category", {
        token: token!,
        cache: "no-store",
    });

    return (
        <div>
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-brand-primary">Categorias</h1>
                <CategoryForm />
            </div>

            {/* Stats */}
            <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-xl bg-surface-container p-6">
                    <p className="mb-1 text-xs font-semibold tracking-[0.15em] text-on-surface-variant">
                        TOTAL DE CATEGORIAS
                    </p>
                    <p className="text-5xl font-bold text-on-surface">
                        {String(categories.length).padStart(2, "0")}
                    </p>
                </div>
                <div className="rounded-xl bg-surface-container p-6">
                    <p className="mb-1 text-xs font-semibold tracking-[0.15em] text-on-surface-variant">
                        MAIS RECENTE
                    </p>
                    <p className="text-5xl font-bold text-on-surface">
                        {categories.length > 0 ? categories[categories.length - 1]?.name : "—"}
                    </p>
                </div>
                <div className="hidden rounded-xl bg-surface-container p-6 lg:block">
                    <p className="mb-1 text-xs font-semibold tracking-[0.15em] text-on-surface-variant">
                        STATUS
                    </p>
                    <p className="mt-2 flex items-center gap-2 text-lg font-semibold text-tertiary">
                        <span className="inline-block h-2 w-2 rounded-full bg-tertiary" />
                        Todas ativas
                    </p>
                </div>
            </div>

            {/* Table */}
            <div className="rounded-xl bg-surface-container">
                <div className="flex items-center justify-between p-5">
                    <h2 className="text-lg font-semibold text-on-surface">
                        Lista de Categorias
                    </h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-outline-variant/10">
                                <th className="px-5 py-3 text-left text-xs font-semibold tracking-[0.15em] text-on-surface-variant">
                                    NOME
                                </th>
                                <th className="px-5 py-3 text-left text-xs font-semibold tracking-[0.15em] text-on-surface-variant">
                                    DATA DE CRIAÇÃO
                                </th>
                                <th className="px-5 py-3 text-left text-xs font-semibold tracking-[0.15em] text-on-surface-variant">
                                    STATUS
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category) => (
                                <tr
                                    key={category.id}
                                    className="border-b border-outline-variant/5 transition-colors hover:bg-surface-high/30"
                                >
                                    <td className="px-5 py-4 font-medium text-on-surface">
                                        {category.name}
                                    </td>
                                    <td className="px-5 py-4 text-sm text-on-surface-variant">
                                        {formatDate(category.createdAt)}
                                    </td>
                                    <td className="px-5 py-4">
                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-tertiary/10 px-3 py-1 text-xs font-semibold text-tertiary">
                                            <span className="inline-block h-1.5 w-1.5 rounded-full bg-tertiary" />
                                            ATIVO
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {categories.length === 0 && (
                        <div className="flex h-32 items-center justify-center">
                            <p className="text-on-surface-variant">
                                Nenhuma categoria cadastrada
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}