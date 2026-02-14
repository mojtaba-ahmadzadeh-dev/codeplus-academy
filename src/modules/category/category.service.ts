import createHttpError from "http-errors";
import { CategoryMessages } from "../../constant/messages";
import { STATUS } from "../../constant/status.constant";
import { Category } from "./category.model";

class CategoryService {
  private categoryModel: typeof Category;

  constructor() {
    this.categoryModel = Category;
  }

  async createCategory(data: {
    title: string;
    description?: string;
    parentId?: number | null;
    status?: (typeof STATUS)[keyof typeof STATUS];
  }) {
    if (data.parentId) {
      const parent = await this.categoryModel.findByPk(data.parentId);
      if (!parent) throw new Error(CategoryMessages.PARENT_NOT_FOUND);
    }

    const category = await this.categoryModel.create({
      ...data,
      status: data.status || STATUS.ACTIVE,
    });
    return category;
  }

  async getAllCategories() {
    const categories = await this.categoryModel.findAll({
      where: { parentId: null }, // فقط دسته‌بندی‌های اصلی
      include: [
        {
          model: this.categoryModel,
          as: "children", // **باید با alias در مدل یکی باشه**
        },
      ],
    });
    return categories;
  }

  async updateCategory(
    id: number,
    data: {
      title?: string;
      description?: string;
      parentId?: number | null;
      status?: (typeof STATUS)[keyof typeof STATUS];
    },
  ) {
    const category = await this.categoryModel.findByPk(id);

    if (!category) {
      throw createHttpError.NotFound(CategoryMessages.CATEGORY_NOT_FOUND);
    }

    if (data.title) {
      const existing = await this.categoryModel.findOne({
        where: { title: data.title },
      });
      if (existing && existing.id !== id) {
        throw createHttpError.BadRequest(CategoryMessages.TITLE_ALREADY_EXISTS);
      }
    }

    if (data.parentId !== undefined && data.parentId !== null) {
      if (data.parentId === id) {
        throw createHttpError.BadRequest(CategoryMessages.INVALID_PARENT);
      }

      const parent = await this.categoryModel.findByPk(data.parentId);
      if (!parent) {
        throw createHttpError.NotFound(CategoryMessages.PARENT_NOT_FOUND);
      }
    }

    await category.update({
      title: data.title ?? category.title,
      description: data.description ?? category.description,
      parentId: data.parentId !== undefined ? data.parentId : category.parentId,
      status: data.status ?? category.status,
    });

    return category;
  }

  async deleteCategory(id: number) {
    const category = await this.categoryModel.findByPk(id);

    if (!category) {
      throw createHttpError.NotFound(CategoryMessages.CATEGORY_NOT_FOUND);
    }

    const children = await this.categoryModel.findAll({
      where: { parentId: id },
    });
    if (children.length > 0) {
      throw createHttpError.BadRequest(CategoryMessages.CATEGORY_HAS_CHILDREN);
    }

    await category.destroy();
    return { message: "Category deleted successfully" };
  }

  async getCategoryWithChildren(id: number) {
    const category = await this.categoryModel.findByPk(id, {
      include: [{ model: this.categoryModel, as: "children" }],
    });

    if (!category) {
      throw createHttpError.NotFound(CategoryMessages.CATEGORY_NOT_FOUND);
    }

    return category;
  }
}

export default new CategoryService();
