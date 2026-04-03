import prismaClient from "../../prisma/index";
import cloudinary from "../../config/cloudinary";
import { AppError } from "../../errors/AppError";

interface UpdateProductProps {
    product_id: string;
    name?: string;
    price?: string;
    description?: string;
    category_id?: string;
    disabled?: string;
    file?: Express.Multer.File;
}

class UpdateProductService {
    async execute({ product_id, name, price, description, category_id, disabled, file }: UpdateProductProps) {

        const product = await prismaClient.product.findFirst({
            where: { id: product_id },
            select: { id: true, name: true, price: true, description: true, banner: true, category_id: true },
        });

        if (!product) {
            throw new AppError("Produto não encontrado", 404);
        }

        let banner = product.banner;

        if (file) {
            const uploadResult = await new Promise<string>((resolve, reject) => {
                cloudinary.uploader
                    .upload_stream(
                        { folder: "wasushi", resource_type: "image" },
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

            banner = uploadResult;
        }

        const updatedProduct = await prismaClient.product.update({
            where: { id: product_id },
            data: {
                name: name || product.name,
                price: price ? parseInt(price) : product.price,
                description: description || product.description,
                category_id: category_id || product.category_id,
                banner: banner,
                ...(disabled !== undefined && { disabled: disabled === "true" }),
            },
            include: {
                category: {
                    select: { id: true, name: true },
                },
            },
        });

        return updatedProduct;
    }
}

export { UpdateProductService };