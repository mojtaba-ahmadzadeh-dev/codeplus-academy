import { Request, Response, NextFunction } from "express";
import roomService from "../service/room.service";
import { getImageUrl } from "../../../utils/file.utils";
import { StatusCodes } from "http-status-codes";

class RoomController {
  private roomService: typeof roomService;

  constructor() {
    this.roomService = roomService;
    this.createNewRoom = this.createNewRoom.bind(this);
    this.getAllRooms = this.getAllRooms.bind(this);
    this.removeRoomById = this.removeRoomById.bind(this);
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

  async getAllRooms(req: Request, res: Response, next: NextFunction) {
    try {
      const rooms = await this.roomService.getAllRooms();

      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        rooms,
      });
    } catch (error) {
      next(error);
    }
  }

  async removeRoomById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      await roomService.deleteRoomById(Number(id));

      return res.status(200).json({
        statusCode: 200,
        message: "اتاق با موفقیت حذف شد",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new RoomController();
