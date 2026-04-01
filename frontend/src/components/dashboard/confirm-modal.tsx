"use client";

import { X } from "lucide-react";

interface ConfirmModalProps {
    title: string;
    message: string;
    confirmLabel?: string;
    onConfirm: () => void;
    onCancel: () => void;
    loading?: boolean;
}

export function ConfirmModal({
    title,
    message,
    confirmLabel = "Deletar",
    onConfirm,
    onCancel,
    loading = false,
}: ConfirmModalProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="w-full max-w-sm rounded-xl bg-surface-container p-6">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-on-surface">{title}</h2>
                    <button
                        onClick={onCancel}
                        className="rounded-lg p-1 text-on-surface-variant hover:text-on-surface"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <p className="mb-6 text-sm text-on-surface-variant">{message}</p>

                <div className="flex gap-3">
                    <button
                        onClick={onCancel}
                        className="flex-1 rounded-lg border border-outline-variant/20 py-3 text-sm font-semibold tracking-wider text-on-surface-variant transition-colors hover:bg-surface-high"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="flex-1 rounded-lg bg-brand-container py-3 text-sm font-bold tracking-wider text-brand-on-container transition-opacity hover:opacity-90 disabled:opacity-50"
                    >
                        {loading ? "Deletando..." : confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}