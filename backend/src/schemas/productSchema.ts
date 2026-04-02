import { z } from "zod";

export const createProductSchema = z.object({
    body: z.object({
        name: z
            .string({ error: "Nome do produto é obrigatório" })
            .trim()
            .min(1, { message: "Nome do produto é obrigatório" }),
        price: z
            .string({ error: "Preço é obrigatório" })
            .min(1, { message: "Preço é obrigatório" })
            .regex(/^\d+$/, { message: "Preço deve conter apenas números inteiros (em centavos)" }),
        description: z
            .string({ error: "Descrição é obrigatória" })
            .trim()
            .min(1, { message: "Descrição é obrigatória" }),
        category_id: z
            .uuid({ error: "category_id deve ser um UUID válido" }),
    }),
});

export const listProductSchema = z.object({
    query: z.object({
        disabled: z
            .enum(["true", "false"], {
                message: "O parâmetro disabled deve ser 'true' ou 'false'",
            })
            .optional(),
    }),
});

export const updateProductSchema = z.object({
    query: z.object({
        product_id: z
            .uuid({ error: "product_id deve ser um UUID válido" }),
    }),
});