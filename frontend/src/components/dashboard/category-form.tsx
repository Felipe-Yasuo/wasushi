"use client";

import { createCategoryAction } from "@/actions/categories";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useRef, useState } from "react";

export function CategoryForm() {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    async function handleSubmit(formData: FormData) {
        try {
            setLoading(true);
            setError("");

            const result = await createCategoryAction(formData);

            if (result.success) {
                setOpen(false);
                formRef.current?.reset();
            } else {
                setError(result.error);
            }
        } catch {
            setError("Erro ao criar categoria");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-brand-container to-brand-primary px-5 py-2.5 text-sm font-semibold tracking-wider text-brand-on-container transition-opacity hover:opacity-90">
                    <Plus className="h-4 w-4" />
                    Nova Categoria
                </button>
            </DialogTrigger>
            <DialogContent className="border-outline-variant/10 bg-surface-container sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-on-surface">
                        Nova categoria
                    </DialogTitle>
                    <DialogDescription className="text-sm text-on-surface-variant">
                        Crie uma nova categoria para o cardápio.
                    </DialogDescription>
                </DialogHeader>

                <form ref={formRef} action={handleSubmit} className="space-y-5 pt-2">
                    <div>
                        <label htmlFor="category-name" className="mb-2 block text-xs font-semibold tracking-[0.15em] text-on-surface-variant">
                            NOME DA CATEGORIA
                        </label>
                        <input
                            id="category-name"
                            type="text"
                            name="name"
                            placeholder="Ex: Sushi, Temaki, Bebidas..."
                            required
                            className="w-full rounded-lg bg-surface-highest/60 py-3 px-4 text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                        />
                    </div>

                    {error && <p className="text-sm text-brand-container">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-gradient-to-r from-brand-container to-brand-primary py-3 text-sm font-bold tracking-wider text-brand-on-container transition-opacity hover:opacity-90 disabled:opacity-50"
                    >
                        {loading ? "Criando..." : "Criar categoria"}
                    </button>
                </form>
            </DialogContent>
        </Dialog>
    );
}