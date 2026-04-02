"use client";

import { deleteCategoryAction } from "@/actions/categories";
import { ConfirmModal } from "./confirm-modal";
import { Trash2 } from "lucide-react";
import { useState } from "react";

interface DeleteCategoryButtonProps {
    categoryId: string;
}

export function DeleteCategoryButton({ categoryId }: DeleteCategoryButtonProps) {
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleDelete() {
        try {
            setLoading(true);
            setError("");
            const result = await deleteCategoryAction(categoryId);
            if (result.success) {
                setShowConfirm(false);
            } else {
                setError(result.error);
            }
        } catch (err) {
            setError("Erro ao deletar categoria.");
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
                    title="Deletar categoria"
                    message={error || "Tem certeza que deseja deletar esta categoria? Todos os produtos vinculados a ela também serão removidos."}
                    confirmLabel="Deletar"
                    onConfirm={handleDelete}
                    onCancel={() => { setShowConfirm(false); setError(""); }}
                    loading={loading}
                />
            )}
        </>
    );
}