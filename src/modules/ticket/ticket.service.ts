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
}

export default new TicketService();
