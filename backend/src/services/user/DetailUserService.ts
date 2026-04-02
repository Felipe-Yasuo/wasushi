import prismaClient from "../../prisma/index";
import { AppError } from "../../errors/AppError";

interface DetailUserProps {
    user_id: string;
}

class DetailUserService {
    async execute({ user_id }: DetailUserProps) {

        const user = await prismaClient.user.findFirst({
            where: {
                id: user_id,
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
            },
        });

        if (!user) {
            throw new AppError("Usuário não encontrado", 404);
        }

        return user;
    }
}

export { DetailUserService };