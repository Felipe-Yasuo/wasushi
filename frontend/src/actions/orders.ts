"use server";

import { apiClient } from "@/lib/api";
import { getToken } from "@/lib/auth";
import { Order } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function listOrdersAction() {
    try {
        const token = await getToken();

        if (!token) {
            return { success: false, error: "Não autorizado", data: [] as Order[] };
        }

        const data = await apiClient<Order[]>("/orders", { token });

        return { success: true, error: "", data };
    } catch (error) {
        if (error instanceof Error) {
            return { success: false, error: error.message, data: [] as Order[] };
        }

        return { success: false, error: "Falha ao carregar pedidos", data: [] as Order[] };
    }
}

export async function detailOrderAction(orderId: string) {
    try {
        const token = await getToken();

        if (!token) {
            return { success: false, error: "Não autorizado", data: null };
        }

        const data = await apiClient<Order>(`/order/detail?order_id=${orderId}`, { token });

        return { success: true, error: "", data };
    } catch (error) {
        if (error instanceof Error) {
            return { success: false, error: error.message, data: null };
        }

        return { success: false, error: "Falha ao carregar detalhes", data: null };
    }
}

export async function finishOrderAction(orderId: string) {
    if (!orderId) {
        return { success: false, error: "Falha ao finalizar o pedido" };
    }

    try {
        const token = await getToken();

        if (!token) {
            return { success: false, error: "Não autorizado" };
        }

        await apiClient("/order/finish", {
            method: "PUT",
            body: JSON.stringify({ order_id: orderId }),
            token: token,
        });

        revalidatePath("/dashboard");

        return { success: true, error: "" };
    } catch (error) {
        if (error instanceof Error) {
            return { success: false, error: error.message };
        }

        return { success: false, error: "Falha ao finalizar o pedido" };
    }
}