export interface ISupport {
  id?: string;
  title: string;
  endpoint: string;
}

export interface IConversation {
  id?: string;
  title: string;
  endpoint: string;
  rooms?: IRoom[];
}

export interface IRoom {
  id?: string;
  name: string;
  description?: string;
  image?: string;
  conversationId?: string;
}

export interface ILocation {
  id?: number;
  senderId: number;
  location: object | null;
  dateTime: number;
  roomId?: number;
}

export interface IMessage {
  id?: string;
  senderId: string;
  message: string;
  dateTime: number;
  roomId: string;
}
