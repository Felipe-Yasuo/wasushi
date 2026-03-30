"use server";

import { apiClient } from "@/lib/api";
import { getToken } from "@/lib/auth";
import { revalidatePath } from "next/cache";

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