import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import { router } from "./routes";

const app = express();

app.use(cors())
app.use(express.json())
app.use(router)


// Middleware global de tratamento de erros
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error('Erro capturado:', err)

    if (err instanceof Error) {
        return res.status(400).json({ error: err.message })
    }

    return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
    })
})



const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
