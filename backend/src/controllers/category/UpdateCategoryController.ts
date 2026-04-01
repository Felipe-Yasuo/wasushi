import { Request, Response } from "express";
import { UpdateCategoryService } from "../../services/category/UpdateCategoryService";

class UpdateCategoryController {
    async handle(request: Request, response: Response) {
        const category_id = request.query.category_id as string;
        const { name, disabled } = request.body;

        if (!category_id) {
            return response.status(400).json({
                error: "category_id é obrigatório",
            });
        }

        const updateCategoryService = new UpdateCategoryService();

        const category = await updateCategoryService.execute({
            category_id,
            name,
            disabled,
        });

        return response.json(category);
    }
}

export { UpdateCategoryController };