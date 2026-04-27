import cors from 'cors';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import { AppError } from './errors/AppError';
import { router } from './routes';

const app = express();

app.use(express.json());
app.use(cors({
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(",") : "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.get("/health", (_, response) => {
    response.status(200).json({ status: "ok" });
});

app.use(router);

app.use((error: Error, _request: Request, response: Response, _next: NextFunction) => {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            error: error.message,
        });
    }

    console.error("[ERRO INTERNO]", error);

    return response.status(500).json({
        error: "Erro interno do servidor",
    });
});

const PORT = Number(process.env.PORT) || 3333;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor Wasushi rodando na porta ${PORT}`);
});