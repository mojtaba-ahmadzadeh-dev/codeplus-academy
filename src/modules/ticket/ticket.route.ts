import { Router } from "express";
import ticketController from "./ticket.controller";
import { rbacGuard } from "../../middleware/guard/rbac.guard";
import { Permissions } from "../../constant/role.constant";

const ticketRouter = Router();

ticketRouter.post(
  "/",
  rbacGuard([Permissions.TICKET_CREATE]),
  ticketController.createTicket,
);

ticketRouter.get(
  "/user",
  rbacGuard([Permissions.TICKET_READ]),
  ticketController.getUserTickets,
);

ticketRouter.get(
  "/admin",
  rbacGuard([Permissions.TICKET_READ_ALL]),
  ticketController.getAllTicketsForAdmin,
);

ticketRouter.get(
  "/:id",
  rbacGuard([Permissions.TICKET_READ]),
  ticketController.getTicketById,
);

ticketRouter.delete(
  "/:id",
  rbacGuard([Permissions.TICKET_DELETE_ID]),
  ticketController.deleteTicket,
);

export default ticketRouter;
