import { Request, Response, NextFunction } from "express";
import ticketService from "./ticket.service";

class TicketController {
  private ticketService: typeof ticketService;
  constructor() {
    this.ticketService = ticketService;

    this.createTicket = this.createTicket.bind(this);
    this.getUserTickets = this.getUserTickets.bind(this);
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
}

export default new TicketController();
