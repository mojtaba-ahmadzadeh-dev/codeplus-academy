import createHttpError from "http-errors";
import { IRoom } from "../types/index.types";
import { Conversation } from "../entities/conversation.model";
import { Room } from "../entities/room.model";

class RoomService {
  private model: typeof Room;
  private conversationModel: typeof Conversation;

  constructor() {
    this.model = Room;
    this.conversationModel = Conversation;
  }

  async createNewRoom({ name, description, image }: IRoom) {
    await this.checkExistWithName(name);

    const conversation = await this.conversationModel.create({
      title: name,
      endpoint: name.toLowerCase().replace(/\s+/g, "-"),
    });

    if (!conversation) {
      throw createHttpError.InternalServerError("خطا در ساخت conversation");
    }

    const createRoom = await this.model.create({
      name,
      description,
      conversationId: conversation.id,
      image,
    });

    if (!createRoom) {
      throw createHttpError.InternalServerError(
        "مشکلی در ساخت اتاق گفتگو پیش آمده",
      );
    }

    return createRoom;
  }

  async getAllRooms(): Promise<IRoom[]> {
    const rooms = await this.model.findAll();
    return rooms;
  }

async deleteRoomById(id: number): Promise<void> {
  const room = await this.model.findByPk(id);

  if (!room) {
    throw createHttpError.NotFound("اتاق پیدا نشد");
  }

  // اگر conversation مرتبط داری، حذفش کن
  if (room.conversationId) {
    await this.conversationModel.destroy({
      where: { id: room.conversationId },
    });
  }

  await room.destroy();
}
  async checkExistWithName(name: string): Promise<void> {
    const room = await this.model.findOne({ where: { name } });
    if (room)
      throw createHttpError.Conflict("اتاق گفتگو با این نام قبلا ثبت شده است");
  }
}

export default new RoomService();
