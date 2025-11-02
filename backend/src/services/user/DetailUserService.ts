import prisma from "../../prisma";

class DetailUserService {
    async execute(user_id: string) {

        // Busca o usuário logado no banco
        const user = await prisma.user.findFirst({
            where: { id: user_id },
            select: {
                id: true,
                name: true,
                email: true,
                created_at: true,
            },
        });

        return user;
    }
}

export { DetailUserService };