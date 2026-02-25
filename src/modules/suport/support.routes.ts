import { Router } from "express";
import namespaceController from "./controller/namespace.controller";

const supportRouter = Router()

supportRouter.post(`/namespace/create`, namespaceController.createNamespace);

export default supportRouter