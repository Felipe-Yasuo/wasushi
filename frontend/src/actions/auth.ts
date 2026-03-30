"use server";

import { apiClient } from "@/lib/api";
import { removeToken, setToken } from "@/lib/auth";
import { AuthResponse, User } from "@/lib/types";
import { redirect } from "next/navigation";

export async function registerAction(
    prevState: { success: boolean; error: string; redirectTo?: string } | null,
    formData: FormData
) {
    try {
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        await apiClient<User>("/users", {
            method: "POST",
            body: JSON.stringify({ name, email, password }),
        });

        return { success: true, error: "", redirectTo: "/login" };
    } catch (error) {
        if (error instanceof Error) {
            return { success: false, error: error.message };
        }

        return { success: false, error: "Erro ao criar conta" };
    }
}

export async function loginAction(
    prevState: { success: boolean; error: string; redirectTo?: string } | null,
    formData: FormData
) {
    try {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const response = await apiClient<AuthResponse>("/session", {
            method: "POST",
            body: JSON.stringify({ email, password }),
        });

        await setToken(response.token);

        return { success: true, error: "", redirectTo: "/dashboard" };
    } catch (error) {
        if (error instanceof Error) {
            return { success: false, error: error.message };
        }

        return { success: false, error: "Erro ao fazer login" };
    }
}

export async function logoutAction() {
    await removeToken();
    redirect("/login");
}