"use client";

import { updateCategoryAction } from "@/actions/categories";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Category } from "@/lib/types";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface EditCategoryFormProps {
    category: Category;
}

export function EditCategoryForm({ category }: EditCategoryFormProps) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState(category.name);
    const [disabled, setDisabled] = useState(category.disabled);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    function handleOpenChange(isOpen: boolean) {
        setOpen(isOpen);
        if (isOpen) {
            setName(category.name);
            setDisabled(category.disabled);
            setError("");
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");

            const result = await updateCategoryAction(category.id, name, disabled);

            if (result.success) {
                setOpen(false);
                router.refresh();
            } else {
                setError(result.error);
            }
        } catch {
            setError("Erro ao atualizar categoria");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <button aria-label="Editar categoria" className="rounded-lg p-2 text-on-surface-variant transition-colors hover:bg-surface-high hover:text-on-surface">
                    <Pencil className="h-4 w-4" aria-hidden="true" />
                </button>
            </DialogTrigger>
            <DialogContent className="border-outline-variant/10 bg-surface-container sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-on-surface">
                        Editar categoria
                    </DialogTitle>
                    <DialogDescription className="text-sm text-on-surface-variant">
                        Altere o nome ou status da categoria.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-5 pt-2">
                    <div>
                        <label htmlFor="edit-category-name" className="mb-2 block text-xs font-semibold tracking-[0.15em] text-on-surface-variant">
                            NOME DA CATEGORIA
                        </label>
                        <input
                            id="edit-category-name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full rounded-lg bg-surface-highest/60 py-3 px-4 text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-xs font-semibold tracking-[0.15em] text-on-surface-variant">
                            STATUS
                        </label>
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => setDisabled(false)}
                                aria-pressed={!disabled}
                                className={`flex-1 rounded-lg py-3 text-sm font-semibold tracking-wider transition-all ${!disabled
                                        ? "bg-tertiary/20 text-tertiary ring-2 ring-tertiary/50"
                                        : "bg-surface-highest/60 text-on-surface-variant hover:bg-surface-highest"
                                    }`}
                            >
                                ATIVO
                            </button>
                            <button
                                type="button"
                                onClick={() => setDisabled(true)}
                                aria-pressed={disabled}
                                className={`flex-1 rounded-lg py-3 text-sm font-semibold tracking-wider transition-all ${disabled
                                        ? "bg-brand-container/20 text-brand-primary ring-2 ring-brand-container/50"
                                        : "bg-surface-highest/60 text-on-surface-variant hover:bg-surface-highest"
                                    }`}
                            >
                                DESATIVADO
                            </button>
                        </div>
                    </div>

                    {error && <p className="text-sm text-brand-container">{error}</p>}

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="flex-1 rounded-lg border border-outline-variant/20 py-3 text-sm font-semibold tracking-wider text-on-surface-variant transition-colors hover:bg-surface-high"
                        >
                            CANCELAR
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 rounded-lg bg-gradient-to-r from-brand-container to-brand-primary py-3 text-sm font-bold tracking-wider text-brand-on-container transition-opacity hover:opacity-90 disabled:opacity-50"
                        >
                            {loading ? "SALVANDO..." : "SALVAR"}
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}