import { Request, Response, NextFunction } from "express";
import ticketService from "./ticket.service";
import { ticketMessages } from "../../constant/messages";

class TicketController {
  private ticketService: typeof ticketService;
  constructor() {
    this.ticketService = ticketService;

    this.createTicket = this.createTicket.bind(this);
    this.getUserTickets = this.getUserTickets.bind(this);
    this.getAllTicketsForAdmin = this.getAllTicketsForAdmin.bind(this);
    this.getTicketById = this.getTicketById.bind(this);
    this.deleteTicket = this.deleteTicket.bind(this);
  }

  async createTicket(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description, priority, status } = req.body;
      const userId = req.user?.id;

      if (!userId) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized" });
      }

      const ticket = await this.ticketService.createTicket({
        title,
        description,
        priority,
        status,
        userId,
      });

      return res.status(201).json({ success: true, ticket });
    } catch (error) {
      next(error);
    }
  }

  async getUserTickets(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized" });
      }

      const tickets = await this.ticketService.getTicketsByUser(userId);

      return res.status(200).json({ success: true, tickets });
    } catch (error) {
      next(error);
    }
  }

  async getAllTicketsForAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const tickets = await this.ticketService.getAllTickets();

      return res.status(200).json({ success: true, tickets });
    } catch (error) {
      next(error);
    }
  }

  async getTicketById(req: Request, res: Response, next: NextFunction) {
    try {
      const ticketId = Number(req.params.id);

      const ticket = await this.ticketService.getTicketById(ticketId);

      return res.status(200).json({
        success: true,
        message: ticketMessages.TICKET_ID_FETCHED_SUCCESSFULLY,
        ticket,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteTicket(req: Request, res: Response, next: NextFunction) {
    try {
      const ticketId = Number(req.params.id);
      const userId = req.user?.id;

      if (!userId) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized" });
      }

      const result = await this.ticketService.deleteTicket(ticketId);

      return res.status(200).json({
        success: true,
        result,
        message: ticketMessages.TICKET_DELETE_SUCCESSFULLY,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new TicketController();
