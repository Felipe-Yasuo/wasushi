import prismaClient from "../../prisma/index";

interface RemoveItemProps {
    item_id: string;
}

class RemoveItemOrderService {
    async execute({ item_id }: RemoveItemProps) {

        const itemExists = await prismaClient.item.findFirst({
            where: {
                id: item_id,
            },
        });

        if (!itemExists) {
            throw new Error("Item não encontrado");
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