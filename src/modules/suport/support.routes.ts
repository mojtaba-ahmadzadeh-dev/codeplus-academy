import { Router } from "express";
import namespaceController from "./controller/namespace.controller";
import roomController from "./controller/room.controller";
import { uploadRoom } from "../../middleware/upload/upload.middleware";

const supportRouter = Router()

supportRouter.post(`/namespace/create`, namespaceController.createNamespace);
supportRouter.get(`/namespace`, namespaceController.getNamespaces);
supportRouter.delete(`/namespace/delete/:id`, namespaceController.removeNamespaceById);
supportRouter.post(`/room/create`, uploadRoom.single("image"), roomController.createNewRoom);
supportRouter.get(
  "/room",
  roomController.getAllRooms
);

supportRouter.delete(
  `/room/delete/:id`,
  roomController.removeRoomById
);

export default supportRouter