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
      where: { parentId: null },
      include: [{ model: this.categoryModel, as: "children" }],
    });
    return categories;
  }
}

export default new CategoryService();
