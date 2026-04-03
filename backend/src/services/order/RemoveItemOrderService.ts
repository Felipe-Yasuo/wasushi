import prismaClient from "../../prisma/index";
import { AppError } from "../../errors/AppError";

interface RemoveItemProps {
    item_id: string;
}

class RemoveItemOrderService {
    async execute({ item_id }: RemoveItemProps) {

        const itemExists = await prismaClient.item.findFirst({
            where: {
                id: item_id,
            },
            select: { id: true },
        });

        if (!itemExists) {
            throw new AppError("Item não encontrado", 404);
        }

        const removedItem = await prismaClient.item.delete({
            where: {
                id: item_id,
            },
        });

        return removedItem;
    }
}

export { RemoveItemOrderService };