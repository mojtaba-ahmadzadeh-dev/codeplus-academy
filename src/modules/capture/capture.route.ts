import { Router } from "express";
import captureController from "./capture.controller";
import { upload } from "../../middleware/upload.middleware";

const captureRouter = Router();

captureRouter.post(
  "/create",
  upload.single("file"),
  captureController.createCapture,
);

captureRouter.get(
  "/",
  captureController.getAllCaptures
);

captureRouter.get("/:id", captureController.getCaptureById);

export default captureRouter;
