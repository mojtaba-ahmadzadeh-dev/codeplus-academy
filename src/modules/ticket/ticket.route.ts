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

export default ticketRouter;
