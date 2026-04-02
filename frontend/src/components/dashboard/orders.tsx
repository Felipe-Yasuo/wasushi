"use client";

import { listOrdersAction, detailOrderAction } from "@/actions/orders";
import { Order } from "@/lib/types";
import { formatPrice, formatTime } from "@/lib/format";
import { Clock, RefreshCw } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { OrderModal } from "./order-modal";

export function Orders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [error, setError] = useState("");

    const loadOrders = useCallback(async () => {
        try {
            setLoading(true);
            setError("");
            const result = await listOrdersAction();
            if (result.success) {
                setOrders(result.data);
            } else {
                setError(result.error);
            }
        } catch (err) {
            setError("Erro ao carregar pedidos.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadOrders();
    }, [loadOrders]);

    async function handleOpenDetail(orderId: string) {
        try {
            setError("");
            const result = await detailOrderAction(orderId);
            if (result.success && result.data) {
                setSelectedOrder(result.data);
            } else {
                setError(result.error);
            }
        } catch (err) {
            setError("Erro ao carregar detalhes do pedido.");
        }
    }

    return (
        <div>
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-brand-primary">Pedidos</h1>
                <button
                    onClick={loadOrders}
                    disabled={loading}
                    className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-brand-container to-brand-primary px-5 py-2.5 text-sm font-semibold tracking-wider text-brand-on-container transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                    <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                    Atualizar
                </button>
            </div>

            {/* Stats */}
            <div className="mb-8">
                <div className="rounded-xl bg-surface-container p-6">
                    <p className="mb-1 text-xs font-semibold tracking-[0.15em] text-on-surface-variant">
                        FLUXO EM TEMPO REAL
                    </p>
                    <p className="text-4xl font-bold text-on-surface">
                        {String(orders.length).padStart(2, "0")} Pedidos{" "}
                        <span className="text-tertiary">Pendentes</span>
                    </p>
                </div>
            </div>

            {/* Error */}
            {error && (
                <div className="mb-4 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    {error}
                </div>
            )}

            {/* Orders Grid */}
            {loading && orders.length === 0 ? (
                <div className="flex h-64 items-center justify-center">
                    <RefreshCw className="h-6 w-6 animate-spin text-on-surface-variant" />
                </div>
            ) : orders.length === 0 ? (
                <div className="flex h-64 flex-col items-center justify-center rounded-xl bg-surface-container">
                    <p className="text-lg text-on-surface-variant">
                        Nenhum pedido pendente
                    </p>
                    <p className="mt-1 text-sm text-on-surface-variant/50">
                        Os pedidos aparecerão aqui quando enviados pelo app
                    </p>
                </div>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="rounded-xl bg-surface-container p-5"
                        >
                            <div className="mb-3 flex items-center justify-between">
                                <span className="rounded-full bg-brand-container/15 px-3 py-1 text-xs font-semibold text-brand-primary">
                                    MESA {String(order.table).padStart(2, "0")}
                                </span>
                                <span className="flex items-center gap-1 text-xs text-on-surface-variant">
                                    <Clock className="h-3 w-3" />
                                    {formatTime(order.createdAt)}
                                </span>
                            </div>

                            <p className="text-lg font-semibold text-on-surface">
                                {order.name || "Sem nome"}
                            </p>
                            <p className="mb-4 flex items-center gap-1.5 text-xs text-on-surface-variant">
                                <span className="inline-block h-1.5 w-1.5 rounded-full bg-tertiary" />
                                Preparando
                            </p>

                            {order.items && order.items.length > 0 && (
                                <div className="mb-4 space-y-1.5">
                                    {order.items.slice(0, 3).map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-center justify-between text-sm"
                                        >
                                            <span className="text-on-surface-variant">
                                                {item.amount}x {item.product.name}
                                            </span>
                                            <span className="text-on-surface">
                                                {formatPrice(item.product.price * item.amount)}
                                            </span>
                                        </div>
                                    ))}
                                    {order.items.length > 3 && (
                                        <p className="text-xs text-on-surface-variant/50">
                                            +{order.items.length - 3} item(ns)
                                        </p>
                                    )}
                                </div>
                            )}

                            <button
                                onClick={() => handleOpenDetail(order.id)}
                                className="w-full rounded-lg bg-surface-high py-2.5 text-sm font-medium text-on-surface-variant transition-colors hover:bg-surface-highest"
                            >
                                Ver Detalhes
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {selectedOrder && (
                <OrderModal
                    order={selectedOrder}
                    onClose={() => setSelectedOrder(null)}
                    onFinish={loadOrders}
                />
            )}
        </div>
    );
}
