import { z } from "zod";

export const createCategorySchema = z.object({
    body: z.object({
        name: z
            .string({ error: "Nome da categoria é obrigatório" })
            .trim()
            .min(2, { message: "Nome da categoria deve ter no mínimo 2 caracteres" }),
    }),
});

export const listProductByCategorySchema = z.object({
    query: z.object({
        category_id: z
            .uuid({ error: "category_id deve ser um UUID válido" }),
    }),
});