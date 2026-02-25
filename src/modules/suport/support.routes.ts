import { Router } from "express";
import namespaceController from "./controller/namespace.controller";

const supportRouter = Router()

supportRouter.post(`/namespace/create`, namespaceController.createNamespace);
supportRouter.get(`/namespace`, namespaceController.getNamespaces);

export default supportRouter