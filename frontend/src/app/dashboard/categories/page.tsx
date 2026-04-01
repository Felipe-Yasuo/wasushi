import { CategoryForm } from "@/components/dashboard/category-form";
import { EditCategoryForm } from "@/components/dashboard/edit-category-form";
import { DeleteCategoryButton } from "@/components/dashboard/delete-category-button";
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
            <div className="mb-8 grid gap-4 sm:grid-cols-2">
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
                        CATEGORIAS ATIVAS
                    </p>
                    <p className="text-5xl font-bold text-tertiary">
                        {String(categories.filter((c) => !c.disabled).length).padStart(2, "0")}
                    </p>
                </div>
            </div>

            {/* Table */}
            <div className="rounded-xl bg-surface-container">
                <div className="p-5">
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
                                <th className="px-5 py-3 text-right text-xs font-semibold tracking-[0.15em] text-on-surface-variant">
                                    AÇÕES
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
                                        {category.disabled ? (
                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-container/10 px-3 py-1 text-xs font-semibold text-brand-primary">
                                                <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-container" />
                                                DESATIVADO
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-tertiary/10 px-3 py-1 text-xs font-semibold text-tertiary">
                                                <span className="inline-block h-1.5 w-1.5 rounded-full bg-tertiary" />
                                                ATIVO
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-5 py-4">
                                        <div className="flex items-center justify-end gap-1">
                                            <EditCategoryForm category={category} />
                                            <DeleteCategoryButton categoryId={category.id} />
                                        </div>
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