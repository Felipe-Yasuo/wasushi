import prisma from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthRequest {
    email: string;
    password: string;
}

class AuthUserService {
    async execute({ email, password }: AuthRequest) {
        if (!email) {
            throw new Error("Email obrigatório.");
        }

        const user = await prisma.user.findFirst({
            where: { email },
        });

        if (!user) {
            throw new Error("Usuário ou senha incorretos.");
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new Error("Usuário ou senha incorretos.");
        }

        const token = sign(
            {
                name: user.name,
                email: user.email,
            },
            process.env.JWT_SECRET as string,
            {
                subject: user.id,
                expiresIn: "30d",
            }
        );

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token,
        };
    }
}

export { AuthUserService };

