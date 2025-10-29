import prisma from '../../prisma'
import { hash } from 'bcryptjs'

interface UserRequest {
    name: string
    email: string
    password: string
}

class CreateUserService {
    async execute({ name, email, password }: UserRequest) {
        if (!name || !email || !password) {
            throw new Error('Preencha todos os campos obrigatórios.')
        }

        const userExists = await prisma.user.findFirst({
            where: { email },
        })

        if (userExists) {
            throw new Error('E-mail já está em uso.')
        }

        const passwordHash = await hash(password, 8)

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: passwordHash,
            },
            select: {
                id: true,
                name: true,
                email: true,
                created_at: true,
            },
        })

        return user
    }
}

export { CreateUserService }

