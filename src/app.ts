import express, { Application as ExpressApp } from "express";
import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import path from "path";
import { AllRoutes } from "./routes/index.routes.js";
import { initDatabase } from "./config/model.init.js";
import { errorHandler } from "./exception/error-handler.js";
import cookieParser from "cookie-parser";
import SwaggerConfig from "./config/swagger.config.js";

import http from "http";
import { Server } from "socket.io";
import socketService from "./modules/socket/socket.service.js"; // مسیر سرویس ساکت

export class Application {
  private app: ExpressApp;
  private port: number;
  private sequelize: Sequelize;
  private server!: http.Server;
  private io!: Server;

  constructor(port: number, sequelize: Sequelize) {
    this.port = port;
    this.sequelize = sequelize;

    const envFile =
      process.env.NODE_ENV === "production"
        ? ".env.production"
        : ".env.development";

    dotenv.config({ path: path.resolve(process.cwd(), envFile) });

    this.app = express();

    this.initializeMiddlewares();
    this.initializeSwagger();
    this.setupRoutes();
    this.initializeErrorHandler();
  }

  // ==============================
  // Middlewares
  // ==============================

  private initializeMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeSwagger(): void {
    SwaggerConfig(this.app);
  }

  private setupRoutes(): void {
    this.app.use(AllRoutes);
  }

  private initializeErrorHandler(): void {
    this.app.use(errorHandler);
  }

  // ==============================
  // Socket Initialization
  // ==============================

  private initializeSocket(): void {
    this.server = http.createServer(this.app);

    this.io = new Server(this.server, {
      cors: {
        origin: "*",
        credentials: true,
      },
    });

    // Initialize socket service
    socketService.init(this.io);

    console.log("✅ Socket.io initialized");
  }

  // ==============================
  // Start Server
  // ==============================

  async start(): Promise<void> {
    try {
      await initDatabase();

      this.initializeSocket();

      this.server.listen(this.port, () => {
        console.log(`🚀 Server running on port ${this.port}`);
        console.log(`📚 Swagger: http://localhost:${this.port}/api-docs`);
        console.log(
          `🌍 Environment: ${process.env.NODE_ENV || "development"}`
        );
      });
    } catch (error) {
      console.error("❌ Failed to start application:", error);
      process.exit(1);
    }
  }

  public getApp(): ExpressApp {
    return this.app;
  }
}