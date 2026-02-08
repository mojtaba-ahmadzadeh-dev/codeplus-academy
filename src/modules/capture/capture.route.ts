import { Router } from "express";
import captureController from "./capture.controller";
import { upload } from "../../middleware/upload.middleware";
import { rbacGuard } from "../../middleware/guard/rbac.guard";
import { Permissions } from "../../constant/role.constant";
import {
  validateCreateCapture,
  validateDeleteCapture,
  validateGetCapture,
  validateUpdateCapture,
} from "./capture.validation";

const captureRouter = Router();

captureRouter.post(
  "/create",
  rbacGuard([Permissions.CAPTURE_CREATE]),
  validateCreateCapture,
  upload.single("file"),
  captureController.createCapture,
);

captureRouter.get(
  "/",
  rbacGuard([Permissions.CAPTURE_GETALL]),
  captureController.getAllCaptures,
);

captureRouter.get("/:id", captureController.getCaptureById);
(rbacGuard([Permissions.CAPTURE_BY_ID]),
  validateGetCapture,
  captureRouter.put(
    "/:id",
    rbacGuard([Permissions.CAPTURE_UPDATE]),
    validateUpdateCapture,
    upload.single("file"),
    captureController.updateCapture,
  ));

captureRouter.delete(
  "/:id",
  rbacGuard([Permissions.CAPTURE_DELETE]),
  validateDeleteCapture,
  captureController.deleteCapture,
);

export default captureRouter;
