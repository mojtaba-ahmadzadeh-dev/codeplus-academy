import { Server, Socket } from "socket.io";
import { Conversation } from "../suport/entities/conversation.model";
import { Room } from "../suport/entities/room.model";
import { Message } from "../suport/entities/message.model";
import { Location } from "../suport/entities/location.model";

class SocketService {
  private io!: Server;

  init(io: Server) {
    this.io = io;

    this.io.on("connection", async (socket: Socket) => {
      console.log("Client connected:", socket.id);
      

      const namespaces = await this.getNamespaces();
      socket.emit("namespaces", namespaces);
    });

    this.io.of(/^\/\w+$/).on("connection", async (socket: Socket) => {
      const namespaceName = socket.nsp.name.replace("/", "");
      console.log(`Connected to namespace: ${namespaceName}`);

      const conversation = await Conversation.findOne({
        where: { endpoint: namespaceName },
        include: [{ model: Room, as: "rooms" }],
      });

      if (!conversation) {
        socket.disconnect();
        return;
      }

      socket.emit("rooms", conversation.rooms);

      this.registerRoomHandlers(socket, namespaceName);
    });
  }

  // Namespaces
  private async getNamespaces() {
    return await Conversation.findAll({
      attributes: ["id", "title", "endpoint"],
    });
  }

  // Room Logic
  private registerRoomHandlers(socket: Socket, endpoint: string) {
    socket.on("joinRoom", async (roomName: string) => {
      const room = await Room.findOne({
        where: { name: roomName },
      });

      if (!room) return;

      const joinedRooms = [...socket.rooms].filter((r) => r !== socket.id);

      for (const r of joinedRooms) {
        socket.leave(r);
        await this.updateOnlineUsers(endpoint, r);
      }

      socket.join(roomName);
      await this.updateOnlineUsers(endpoint, roomName);

      socket.emit("roomInfo", room);
    });

    socket.on("newMessage", async (data) => {
      await this.handleNewMessage(data, endpoint);
    });

    socket.on("shareLocation", async (data) => {
      await this.handleLocation(data, endpoint);
    });

    socket.on("disconnect", async () => {
      const joinedRooms = [...socket.rooms].filter((r) => r !== socket.id);

      for (const r of joinedRooms) {
        await this.updateOnlineUsers(endpoint, r);
      }

      console.log("Disconnected:", socket.id);
    });
  }

  // Message
  private async handleNewMessage(data: any, endpoint: string) {
    const { senderId, message, roomName } = data;

    const room = await Room.findOne({
      where: { name: roomName },
    });

    if (!room) return;

    const newMessage = await Message.create({
      senderId,
      message,
      dateTime: Date.now(),
      roomId: room.id,
    });

    this.io.of(`/${endpoint}`).to(roomName).emit("message", {
      id: newMessage.id,
      senderId,
      message,
      dateTime: newMessage.dateTime,
    });
  }

  // Location
  private async handleLocation(data: any, endpoint: string) {
    const { senderId, location, roomName } = data;

    const room = await Room.findOne({
      where: { name: roomName },
    });

    if (!room) return;

    const newLocation = await Location.create({
      senderId: Number(senderId),
      location,
      dateTime: Date.now(),
      roomId: Number(room.id),
    });

    this.io.of(`/${endpoint}`).to(roomName).emit("location", {
      senderId,
      location,
      dateTime: newLocation.dateTime,
    });
  }

  // Online Users
  private async updateOnlineUsers(endpoint: string, roomName: string) {
    const sockets = await this.io.of(`/${endpoint}`).in(roomName).allSockets();

    this.io.of(`/${endpoint}`).to(roomName).emit("onlineUsers", sockets.size);
  }
}

export default new SocketService();
