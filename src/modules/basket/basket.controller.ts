import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import basketService from "./basket.service";
import { BasketAction } from "../../constant/basket.constant";
import { BasketMessages } from "../../constant/messages";

class BasketController {
  private basketService: typeof basketService;

  constructor() {
    this.basketService = basketService;

    this.createBasket = this.createBasket.bind(this);
    this.getUserBasket = this.getUserBasket.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  // 🟢 CREATE BASKET
  async createBasket(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      const { courseId, quantity } = req.body;

      if (!userId) throw createHttpError.Unauthorized("Unauthorized");

      const basket = await this.basketService.createBasket({
        userId,
        courseId,
        quantity,
      });

      return res.status(201).json({
        message: BasketMessages.BASKET_CREATED_SUCCESSFULLY,
        data: basket,
      });
    } catch (error) {
      next(error);
    }
  }

  // 🟢 GET USER BASKET
  async getUserBasket(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;

      if (!userId) throw createHttpError.Unauthorized("Unauthorized");

      const basket = await this.basketService.getUserBasket(userId);

      return res.status(200).json({
        message: BasketMessages.BASKET_FETCHED_SUCCESSFULLY,
        data: basket,
      });
    } catch (error) {
      next(error);
    }
  }

  // 🟢 UPDATE QUANTITY
  async updateQuantity(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      const { itemId } = req.params;
      const { action } = req.body;

      if (!userId) throw createHttpError.Unauthorized("Unauthorized");

      const result = await this.basketService.updateQuantity(
        userId,
        itemId,
        action as BasketAction,
      );

      return res.status(200).json({
        message: BasketMessages.BASKET_UPDATED_SUCCESSFULLY,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  // 🟢 DELETE BASKET ITEM
  async removeItem(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      const { itemId } = req.params;

      if (!userId) throw createHttpError.Unauthorized("Unauthorized");

      const result = await this.basketService.removeItem(userId, itemId);

      return res.status(200).json({
        message: BasketMessages.BASKET_REMOVED_SUCCESSFULLY,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new BasketController();
