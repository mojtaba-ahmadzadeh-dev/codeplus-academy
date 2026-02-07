// src/modules/category/category.controller.ts
import { NextFunction, Request, Response } from "express";
import CategoryService from "./category.service";
import { StatusCodes } from "http-status-codes";

class CategoryController {
  private CategoryService: typeof CategoryService;

  constructor() {
    this.CategoryService = CategoryService;

    this.createCategory = this.createCategory.bind(this);
    this.getAllCategories = this.getAllCategories.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
    this.getCategoryById = this.getCategoryById.bind(this);
  }

  async createCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description, parentId } = req.body;
      const category = await this.CategoryService.createCategory({
        title,
        description,
        parentId: parentId || null,
      });
      res.status(201).json(category);
    } catch (error: any) {
      next(error);
    }
  }

  async getAllCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await this.CategoryService.getAllCategories();
      res.status(200).json(categories);
    } catch (error: any) {
      next(error);
    }
  }

  async updateCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { title, description, parentId, status } = req.body;

      const updatedCategory = await this.CategoryService.updateCategory(
        Number(id),
        {
          title,
          description,
          parentId,
          status,
        },
      );

      res.status(StatusCodes.OK).json(updatedCategory);
    } catch (error: any) {
      next(error);
    }
  }

  async deleteCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.CategoryService.deleteCategory(Number(id));
      res.status(StatusCodes.OK).json(result);
    } catch (error: any) {
      next(error);
    }
  }

  async getCategoryById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const category = await this.CategoryService.getCategoryWithChildren(
        Number(id),
      );
      res.status(StatusCodes.OK).json(category);
    } catch (error: any) {
      next(error);
    }
  }
}

export default new CategoryController();
