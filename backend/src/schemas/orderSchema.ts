import { z } from "zod";

export const createOrderSchema = z.object({
    body: z.object({
        table: z
            .number({ error: "Número da mesa é obrigatório" })
            .int({ message: "Número da mesa deve ser inteiro" })
            .positive({ message: "Número da mesa deve ser positivo" }),
        name: z
            .string()
            .trim()
            .optional(),
    }),
});

export const addItemSchema = z.object({
    body: z.object({
        order_id: z
            .uuid({ error: "order_id deve ser um UUID válido" }),
        product_id: z
            .uuid({ error: "product_id deve ser um UUID válido" }),
        amount: z
            .number({ error: "Quantidade é obrigatória" })
            .int({ message: "Quantidade deve ser um número inteiro" })
            .positive({ message: "Quantidade deve ser positiva" }),
    }),
});

export const removeItemSchema = z.object({
    query: z.object({
        item_id: z
            .uuid({ error: "item_id deve ser um UUID válido" }),
    }),
});

export const detailOrderSchema = z.object({
    query: z.object({
        order_id: z
            .uuid({ error: "order_id deve ser um UUID válido" }),
    }),
});

export const sendOrderSchema = z.object({
    body: z.object({
        order_id: z
            .uuid({ error: "order_id deve ser um UUID válido" }),
        name: z
            .string({ error: "Nome é obrigatório" })
            .trim()
            .min(1, { message: "Nome é obrigatório" }),
    }),
});

export const finishOrderSchema = z.object({
    body: z.object({
        order_id: z
            .uuid({ error: "order_id deve ser um UUID válido" }),
    }),
});

export const deleteOrderSchema = z.object({
    query: z.object({
        order_id: z
            .uuid({ error: "order_id deve ser um UUID válido" }),
    }),
});