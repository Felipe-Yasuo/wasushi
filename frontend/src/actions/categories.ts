"use server";

import { apiClient } from "@/lib/api";
import { getToken, removeToken } from "@/lib/auth";
import { Category } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function createCategoryAction(formData: FormData) {
    try {
        const token = await getToken();
        const name = formData.get("name") as string;

        if (!token) {
            return { success: false, error: "Não autorizado" };
        }

        await apiClient<Category>("/category", {
            method: "POST",
            body: JSON.stringify({ name }),
            token: token,
        });

        revalidatePath("/dashboard/categories");

        return { success: true, error: "" };
    } catch (error) {
        if (error instanceof Error) {
            if ((error as any).status === 401) {
                await removeToken();
                return { success: false, error: "Sessão expirada. Faça login novamente." };
            }
            return { success: false, error: error.message };
        }

        return { success: false, error: "Erro ao criar categoria" };
    }
}

export async function updateCategoryAction(categoryId: string, name: string, disabled: boolean) {
    try {
        const token = await getToken();

        if (!token) {
            return { success: false, error: "Não autorizado" };
        }

        await apiClient(`/category?category_id=${categoryId}`, {
            method: "PUT",
            body: JSON.stringify({ name, disabled }),
            token: token,
        });

        revalidatePath("/dashboard/categories");

        return { success: true, error: "" };
    } catch (error) {
        if (error instanceof Error) {
            if ((error as any).status === 401) {
                await removeToken();
                return { success: false, error: "Sessão expirada. Faça login novamente." };
            }
            return { success: false, error: error.message };
        }

        return { success: false, error: "Erro ao atualizar categoria" };
    }
}

export async function deleteCategoryAction(categoryId: string) {
    try {
        const token = await getToken();

        if (!token) {
            return { success: false, error: "Não autorizado" };
        }

        await apiClient(`/category?category_id=${categoryId}`, {
            method: "DELETE",
            token: token,
        });

        revalidatePath("/dashboard/categories");

        return { success: true, error: "" };
    } catch (error) {
        if (error instanceof Error) {
            if ((error as any).status === 401) {
                await removeToken();
                return { success: false, error: "Sessão expirada. Faça login novamente." };
            }
            return { success: false, error: error.message };
        }

        return { success: false, error: "Erro ao deletar categoria" };
    }
}