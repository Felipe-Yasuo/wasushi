"use client";

import { deleteProductAction } from "@/actions/products";
import { Trash2 } from "lucide-react";
import { useState } from "react";

interface DeleteButtonProps {
    productId: string;
}

export function DeleteButton({ productId }: DeleteButtonProps) {
    const [loading, setLoading] = useState(false);

    async function handleDelete() {
        const confirm = window.confirm("Tem certeza que deseja deletar este produto?");
        if (!confirm) return;

        try {
            setLoading(true);
            await deleteProductAction(productId);
        } catch (error) {
            console.error("Erro ao deletar:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <button
            onClick={handleDelete}
            disabled={loading}
            className="rounded-lg p-2 text-on-surface-variant transition-colors hover:bg-brand-container/15 hover:text-brand-primary disabled:opacity-50"
        >
            <Trash2 className="h-4 w-4" />
        </button>
    );
}