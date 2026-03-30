import { z } from "zod";

export const createUserSchema = z.object({
    body: z.object({
        name: z
            .string({ error: "Nome é obrigatório" })
            .trim()
            .min(3, { message: "Nome deve ter no mínimo 3 caracteres" }),
        email: z
            .email({ error: "Email inválido" })
            .trim()
            .toLowerCase(),
        password: z
            .string({ error: "Senha é obrigatória" })
            .min(6, { message: "Senha deve ter no mínimo 6 caracteres" }),
    }),
});

export const authUserSchema = z.object({
    body: z.object({
        email: z
            .email({ error: "Email inválido" })
            .trim()
            .toLowerCase(),
        password: z
            .string({ error: "Senha é obrigatória" })
            .min(1, { message: "Senha é obrigatória" }),
    }),
});