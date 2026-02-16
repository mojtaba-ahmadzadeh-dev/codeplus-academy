import { STATUS } from "../../constant/status.constant";
import { Course } from "../course/entities/course.model";
import { Basket } from "./basket.model";
import { BasketAction } from "../../constant/basket.constant";
import createHttpError from "http-errors";
import { BasketMessages } from "../../constant/messages";

class BasketService {
  private basketModel: typeof Basket;

  constructor() {
    this.basketModel = Basket;
  }

  // 🟢 CREATE BASKET
  async createBasket(data: {
    userId: number;
    courseId: number;
    quantity?: number;
  }) {
    const { userId, courseId } = data;
    const quantity = data.quantity && data.quantity > 0 ? data.quantity : 1;

    const course = (await Course.findByPk(courseId)) as Course;

    const totalPrice = this.calculateItemTotalPrice(course, quantity);

    const basket = await this.basketModel.create({
      userId,
      courseId: course.id,
      quantity,
      totalPrice,
      status: STATUS.ACTIVE,
    });

    return this.findBasketWithCourse(basket.id);
  }

  // GET USER BASKET
  async getUserBasket(userId: number) {
    const baskets = await this.basketModel.findAll({
      where: { userId, status: STATUS.ACTIVE },
      include: [this.courseInclude()],
    });

    const totalPrice = baskets.reduce((sum, basket) => {
      const course = basket.get("course") as Course | null;
      if (!course) return sum;

      return sum + this.calculateItemTotalPrice(course, basket.quantity);
    }, 0);

    return {
      baskets,
      totalPrice,
    };
  }

  // UPDATE QUANTITY
  async updateQuantity(
    userId: number,
    itemIdParam: string,
    action: BasketAction,
  ) {
    const itemId = Number(itemIdParam);

    if (!Number.isInteger(itemId) || itemId <= 0) {
      throw new Error("Invalid itemId");
    }

    if (!Object.values(BasketAction).includes(action)) {
      throw new Error("Invalid action");
    }

    const basketItem = await this.basketModel.findOne({
      where: {
        id: itemId,
        userId,
        status: STATUS.ACTIVE,
      },
      include: [
        {
          model: Course,
          as: "course",
        },
      ],
    });

    if (!basketItem) {
      throw new Error("Basket item not found");
    }

    const quantityChange = action === BasketAction.INCREMENT ? 1 : -1;
    const newQuantity = basketItem.quantity + quantityChange;

    if (newQuantity <= 0) {
      await basketItem.destroy();
      return { deleted: true };
    }

    const course = basketItem.get("course") as Course;

    basketItem.quantity = newQuantity;
    basketItem.totalPrice = this.calculateItemTotalPrice(course, newQuantity);

    await basketItem.save();

    return basketItem;
  }

  // 🟢 DELETE ITEM FROM BASKET
  async removeItem(userId: number, itemIdParam: string) {
    const itemId = Number(itemIdParam);

    const basketItem = await this.basketModel.findOne({
      where: {
        id: itemId,
        userId,
        status: STATUS.ACTIVE,
      },
    });

    if (!basketItem) {
      throw createHttpError.BadRequest(BasketMessages.BASKET_NOT_FOUND);
    }

    await basketItem.destroy();

    return { deleted: true };
  }

  // PRIVATE HELPERS
  private calculateItemTotalPrice(course: Course, quantity: number): number {
    const basePrice = course.discount
      ? course.price - (course.price * course.discount) / 100
      : course.price;

    return basePrice * quantity;
  }

  private courseInclude() {
    return {
      model: Course,
      as: "course",
      attributes: [
        "id",
        "title",
        "slug",
        "description",
        "price",
        "discount",
        "thumbnail",
        "status",
        "level",
        "duration",
        "created_at",
      ],
    };
  }

  private async findBasketWithCourse(basketId: number) {
    return this.basketModel.findByPk(basketId, {
      include: [this.courseInclude()],
    });
  }
}

export default new BasketService();
