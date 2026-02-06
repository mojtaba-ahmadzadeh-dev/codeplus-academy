// src/modules/category/category.controller.ts
import { Request, Response } from "express";
import CategoryService from "./category.service";
import { StatusCodes } from "http-status-codes";

class CategoryController {
  private CategoryService: typeof CategoryService;

  constructor() {
    this.CategoryService = CategoryService;

    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
  }
  
  async create(req: Request, res: Response) {
    try {
      const { title, description, parentId } = req.body;
      const category = await this.CategoryService.createCategory({
        title,
        description,
        parentId: parentId || null,
      });
      res.status(201).json(category);
    } catch (error: any) {
      res.status(StatusCodes.CREATED).json({ message: error.message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const categories = await this.CategoryService.getAllCategories();
      res.status(200).json(categories);
    } catch (error: any) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }
}

export default new CategoryController();
