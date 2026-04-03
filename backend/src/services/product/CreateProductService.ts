import prismaClient from "../../prisma/index";
import cloudinary from "../../config/cloudinary";
import { AppError } from "../../errors/AppError";

interface CreateProductProps {
    name: string;
    price: string;
    description: string;
    category_id: string;
    file: Express.Multer.File;
}

class CreateProductService {
    async execute({ name, price, description, category_id, file }: CreateProductProps) {

        const categoryExists = await prismaClient.category.findFirst({
            where: {
                id: category_id,
            },
            select: { id: true },
        });

        if (!categoryExists) {
            throw new AppError("Categoria não encontrada", 404);
        }

        const uploadResult = await new Promise<string>((resolve, reject) => {
            cloudinary.uploader
                .upload_stream(
                    {
                        folder: "wasushi",
                        resource_type: "image",
                    },
                    (error, result) => {
                        if (error || !result) {
                            reject(new Error("Erro ao fazer upload da imagem"));
                            return;
                        }
                        resolve(result.secure_url);
                    }
                )
                .end(file.buffer);
        });

        const product = await prismaClient.product.create({
            data: {
                name: name,
                price: parseInt(price),
                description: description,
                banner: uploadResult,
                category_id: category_id,
            },
        });

        return product;
    }
}

export { CreateProductService };