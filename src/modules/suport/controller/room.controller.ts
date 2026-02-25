import { Request, Response, NextFunction } from "express";
import roomService from "../service/room.service";
import { getImageUrl } from "../../../utils/file.utils";
import { StatusCodes } from "http-status-codes";

class RoomController {
  private roomService: typeof roomService;

  constructor() {
    this.roomService = roomService;
    this.createNewRoom = this.createNewRoom.bind(this);
  }

  async createNewRoom(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, description } = req.body;
      const image = getImageUrl(req.file ?? null, "room") ?? undefined;

      const room = await this.roomService.createNewRoom({
        name,
        description,
        image,
      });

      res.status(StatusCodes.CREATED).json({
        statusCode: StatusCodes.CREATED,
        message: "اتاق گفتگو با موفقیت ساخته شد",
        room,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new RoomController();
