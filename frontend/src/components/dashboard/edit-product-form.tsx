"use client";

import { updateProductAction } from "@/actions/products";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Category, Product } from "@/lib/types";
import { Pencil, Upload } from "lucide-react";
import Image from "next/image";
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
    const [disabled, setDisabled] = useState(product.disabled);
    const formRef = useRef<HTMLFormElement>(null);

    async function handleSubmit(formData: FormData) {
        try {
            setLoading(true);
            setError("");

            formData.set("disabled", String(disabled));

            const file = formData.get("file") as File;
            if (!file || file.size === 0) {
                formData.delete("file");
            }

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
        <Dialog open={open} onOpenChange={(isOpen) => {
            setOpen(isOpen);
            if (isOpen) {
                setDisabled(product.disabled);
                setError("");
                setFileName("");
            }
        }}>
            <DialogTrigger asChild>
                <button aria-label="Editar produto" className="rounded-lg p-2 text-on-surface-variant transition-colors hover:bg-surface-high hover:text-on-surface">
                    <Pencil className="h-4 w-4" aria-hidden="true" />
                </button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto border-outline-variant/10 bg-surface-container sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="text-on-surface">
                        Editar produto
                    </DialogTitle>
                    <DialogDescription className="text-sm text-on-surface-variant">
                        Altere as informações do produto.
                    </DialogDescription>
                </DialogHeader>

                <form ref={formRef} action={handleSubmit} className="space-y-5 pt-2">
                    <div>
                        <label htmlFor="edit-product-name" className="mb-2 block text-xs font-semibold tracking-[0.15em] text-on-surface-variant">
                            NOME DO PRATO
                        </label>
                        <input
                            id="edit-product-name"
                            type="text"
                            name="name"
                            defaultValue={product.name}
                            required
                            className="w-full rounded-lg bg-surface-highest/60 py-3 px-4 text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="edit-product-price" className="mb-2 block text-xs font-semibold tracking-[0.15em] text-on-surface-variant">
                                PREÇO (R$)
                            </label>
                            <PriceInput id="edit-product-price" name="price" initialValue={product.price} />
                        </div>
                        <div>
                            <label htmlFor="edit-product-category" className="mb-2 block text-xs font-semibold tracking-[0.15em] text-on-surface-variant">
                                CATEGORIA
                            </label>
                            <select
                                id="edit-product-category"
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
                        <label htmlFor="edit-product-description" className="mb-2 block text-xs font-semibold tracking-[0.15em] text-on-surface-variant">
                            DESCRIÇÃO
                        </label>
                        <textarea
                            id="edit-product-description"
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
                            <Image
                                src={product.banner}
                                alt={product.name}
                                width={80}
                                height={64}
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