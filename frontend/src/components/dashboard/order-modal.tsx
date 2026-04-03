"use client";

import { finishOrderAction } from "@/actions/orders";
import { Order } from "@/lib/types";
import { formatPrice, formatTime } from "@/lib/format";
import { X } from "lucide-react";
import { useState } from "react";

interface OrderModalProps {
    order: Order;
    onClose: () => void;
    onFinish: () => void;
}

export function OrderModal({ order, onClose, onFinish }: OrderModalProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const total = order.items?.reduce(
        (sum, item) => sum + item.product.price * item.amount,
        0
    ) || 0;

    async function handleFinish() {
        try {
            setLoading(true);
            setError("");
            const result = await finishOrderAction(order.id);

            if (result.success) {
                onClose();
                onFinish();
            } else {
                setError(result.error);
            }
        } catch (err) {
            setError("Erro ao finalizar pedido.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-modal-title"
            aria-describedby="order-modal-description"
        >
            <div className="w-full max-w-lg rounded-xl bg-surface-container p-6">
                <div className="mb-4 flex items-start justify-between">
                    <div>
                        <span className="mb-2 inline-block rounded-full bg-brand-container/15 px-3 py-1 text-xs font-semibold text-brand-primary">
                            MESA {String(order.table).padStart(2, "0")}
                        </span>
                        <h2 id="order-modal-title" className="text-xl font-bold text-on-surface">
                            Detalhes do Pedido
                        </h2>
                        <p id="order-modal-description" className="text-sm text-on-surface-variant">
                            Cliente: {order.name || "Sem nome"} • {formatTime(order.createdAt)}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        aria-label="Fechar"
                        className="rounded-lg p-1 text-on-surface-variant hover:text-on-surface"
                    >
                        <X className="h-5 w-5" aria-hidden="true" />
                    </button>
                </div>

                <div className="my-6 space-y-4">
                    {order.items?.map((item) => (
                        <div key={item.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-high text-xs font-semibold text-on-surface-variant">
                                    {item.amount}x
                                </span>
                                <div>
                                    <p className="font-medium text-on-surface">
                                        {item.product.name}
                                    </p>
                                    <p className="text-xs text-on-surface-variant">
                                        {item.product.description}
                                    </p>
                                </div>
                            </div>
                            <p className="text-sm font-medium text-on-surface">
                                {formatPrice(item.product.price * item.amount)}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mb-6 flex items-center justify-between border-t border-outline-variant/20 pt-4">
                    <p className="text-on-surface-variant">Total do Pedido</p>
                    <p className="text-2xl font-bold text-on-surface">
                        {formatPrice(total)}
                    </p>
                </div>

                {error && (
                    <div className="mb-3 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">
                        {error}
                    </div>
                )}

                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 rounded-lg border border-outline-variant/20 py-3 text-sm font-semibold tracking-wider text-on-surface-variant transition-colors hover:bg-surface-high"
                    >
                        Fechar
                    </button>
                    <button
                        onClick={handleFinish}
                        disabled={loading}
                        className="flex-1 rounded-lg bg-gradient-to-r from-brand-container to-brand-primary py-3 text-sm font-bold tracking-wider text-brand-on-container transition-opacity hover:opacity-90 disabled:opacity-50"
                    >
                        {loading ? "Finalizando..." : "Finalizar pedido"}
                    </button>
                </div>
            </div>
        </div>
    );
}