import { Request, Response, NextFunction } from "express";
import namespaceService from "../service/namespace.service";
import { StatusCodes } from "http-status-codes";

class NamespaceController {
  private namespaceSrvice: typeof namespaceService;

  constructor() {
    this.namespaceSrvice = namespaceService;

    this.createNamespace = this.createNamespace.bind(this);
    this.getNamespaces = this.getNamespaces.bind(this);
    this.removeNamespaceById = this.removeNamespaceById.bind(this);
  }

  async createNamespace(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, endpoint } = req.body;

      await this.namespaceSrvice.createNamespace({ title, endpoint });

      res.status(StatusCodes.CREATED).json({
        StatusCodes: StatusCodes.CREATED,
        message: "فضای گفتوگو با موفقیت ساخته شد",
      });
    } catch (error) {
      next(error);
    }
  }

  async getNamespaces(req: Request, res: Response, next: NextFunction) {
    try {
      const namespaces = await this.namespaceSrvice.getNamespaces();

      res.status(StatusCodes.OK).json({
        StatusCodes: StatusCodes.OK,
        namespaces,
      });
    } catch (error) {
      next(error);
    }
  }

  async removeNamespaceById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.namespaceSrvice.removeNamespaceById({ id });

      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "فضای گفتگو با موفقعیت حذف شد",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new NamespaceController();
