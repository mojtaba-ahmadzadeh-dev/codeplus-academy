import createHttpError from "http-errors";
import { Ticket } from "./ticket.model";
import { TicketCreationAttributes } from "./types/index.types";

class TicketService {
  private ticketModel: typeof Ticket;

  constructor() {
    this.ticketModel = Ticket;
  }

  async createTicket(data: TicketCreationAttributes) {
    const ticket = await this.ticketModel.create(data);
    return ticket;
  }

  async getTicketsByUser(userId: number) {
    const tickets = await this.ticketModel.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });
    return tickets;
  }

  async getAllTickets() {
    const tickets = await this.ticketModel.findAll({
      order: [["createdAt", "DESC"]],
    });
    return tickets;
  }

  async getTicketById(ticketId: number) {
    const ticket = await this.ticketModel.findByPk(ticketId);

    if (!ticket) throw createHttpError.BadRequest("تیکت مورد نظر یافت نشد");

    return ticket;
  }

}

export default new TicketService();
