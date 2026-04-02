"use client";

import { deleteProductAction } from "@/actions/products";
import { ConfirmModal } from "./confirm-modal";
import { Trash2 } from "lucide-react";
import { useState } from "react";

interface DeleteButtonProps {
    productId: string;
}

export function DeleteButton({ productId }: DeleteButtonProps) {
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleDelete() {
        try {
            setLoading(true);
            setError("");
            const result = await deleteProductAction(productId);
            if (result.success) {
                setShowConfirm(false);
            } else {
                setError(result.error);
            }
        } catch (err) {
            setError("Erro ao deletar produto.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <button
                onClick={() => setShowConfirm(true)}
                className="rounded-lg p-2 text-on-surface-variant transition-colors hover:bg-brand-container/15 hover:text-brand-primary"
            >
                <Trash2 className="h-4 w-4" />
            </button>

            {showConfirm && (
                <ConfirmModal
                    title="Deletar produto"
                    message={error || "Tem certeza que deseja deletar este produto? Esta ação não pode ser desfeita."}
                    confirmLabel="Deletar"
                    onConfirm={handleDelete}
                    onCancel={() => { setShowConfirm(false); setError(""); }}
                    loading={loading}
                />
            )}
        </>
    );
}