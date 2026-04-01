import { Request, Response } from "express";
import { DeleteCategoryService } from "../../services/category/DeleteCategoryService";

class DeleteCategoryController {
    async handle(request: Request, response: Response) {
        const category_id = request.query.category_id as string;

        if (!category_id) {
            return response.status(400).json({
                error: "category_id é obrigatório",
            });
        }

        const deleteCategoryService = new DeleteCategoryService();

        const category = await deleteCategoryService.execute({ category_id });

        return response.json(category);
    }
}

export { DeleteCategoryController };