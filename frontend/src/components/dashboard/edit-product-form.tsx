"use client";

import { updateProductAction } from "@/actions/products";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Category, Product } from "@/lib/types";
import { Pencil, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { PriceInput } from "./price-input";

interface EditProductFormProps {
    product: Product;
    categories: Category[];
}

export function EditProductForm({ product, categories }: EditProductFormProps) {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [fileName, setFileName] = useState("");
    const formRef = useRef<HTMLFormElement>(null);

    async function handleSubmit(formData: FormData) {
        try {
            setLoading(true);
            setError("");

            const result = await updateProductAction(product.id, formData);

            if (result.success) {
                setOpen(false);
                setFileName("");
            } else {
                setError(result.error);
            }
        } catch {
            setError("Erro ao atualizar produto");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className="rounded-lg p-2 text-on-surface-variant transition-colors hover:bg-surface-high hover:text-on-surface">
                    <Pencil className="h-4 w-4" />
                </button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto border-outline-variant/10 bg-surface-container sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="text-on-surface">
                        Editar produto
                    </DialogTitle>
                </DialogHeader>

                <form ref={formRef} action={handleSubmit} className="space-y-5 pt-2">
                    <div>
                        <label className="mb-2 block text-xs font-semibold tracking-[0.15em] text-on-surface-variant">
                            NOME DO PRATO
                        </label>
                        <input
                            type="text"
                            name="name"
                            defaultValue={product.name}
                            required
                            className="w-full rounded-lg bg-surface-highest/60 py-3 px-4 text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-2 block text-xs font-semibold tracking-[0.15em] text-on-surface-variant">
                                PREÇO (R$)
                            </label>
                            <PriceInput name="price" initialValue={product.price} />
                        </div>
                        <div>
                            <label className="mb-2 block text-xs font-semibold tracking-[0.15em] text-on-surface-variant">
                                CATEGORIA
                            </label>
                            <select
                                name="category_id"
                                defaultValue={product.category_id}
                                required
                                className="w-full rounded-lg bg-surface-highest/60 py-3 px-4 text-on-surface focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                            >
                                <option value="">Selecione...</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-xs font-semibold tracking-[0.15em] text-on-surface-variant">
                            DESCRIÇÃO
                        </label>
                        <textarea
                            name="description"
                            defaultValue={product.description}
                            required
                            rows={3}
                            className="w-full resize-none rounded-lg bg-surface-highest/60 py-3 px-4 text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-xs font-semibold tracking-[0.15em] text-on-surface-variant">
                            IMAGEM DO PRODUTO (opcional)
                        </label>
                        <div className="mb-2 flex items-center gap-3">
                            <img
                                src={product.banner}
                                alt={product.name}
                                className="h-16 w-20 rounded-lg object-cover"
                            />
                            <p className="text-xs text-on-surface-variant">Imagem atual</p>
                        </div>
                        <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-outline-variant/20 py-6 transition-colors hover:border-brand-primary/30">
                            <Upload className="mb-2 h-5 w-5 text-on-surface-variant/50" />
                            <p className="text-sm text-on-surface-variant">
                                {fileName || "Trocar imagem (clique para upload)"}
                            </p>
                            <p className="text-xs text-on-surface-variant/50">
                                PNG, JPG até 5MB
                            </p>
                            <input
                                type="file"
                                name="file"
                                accept="image/jpeg,image/jpg,image/png,image/webp"
                                className="hidden"
                                onChange={(e) =>
                                    setFileName(e.target.files?.[0]?.name || "")
                                }
                            />
                        </label>
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