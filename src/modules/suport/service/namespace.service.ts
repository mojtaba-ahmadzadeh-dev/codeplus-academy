import createHttpError from "http-errors";
import { ISupport } from "../types/index.types";
import { Conversation } from "../entities/conversation.model";

class NamespaceService {
  private model: typeof Conversation;
  constructor() {
    this.model = Conversation;
  }
  async createNamespace({ title, endpoint }: ISupport) {
    await this.checkExistWithEndpoint(endpoint);

    await this.model.create({ title, endpoint });
  }

  async getNamespaces(): Promise<ISupport[]> {
    const namespaces = await this.model.findAll();
    return namespaces;
  }

  async removeNamespaceById({ id }: { id: string }): Promise<void> {
    const namespace = await this.model.findByPk(id);

    if (namespace) {
      await namespace.destroy();
    } else {
      throw createHttpError.NotFound("فضای مورد نظر پیدا نشد");
    }
  }

  async checkExistWithEndpoint(endpoint: string): Promise<void> {
    const namespaces = await this.model.findOne({ where: { endpoint } });
    if (namespaces)
      throw createHttpError.Conflict("قبلا همچین فضایی با این نام ساخته شده");
  }
}

export default new NamespaceService();
