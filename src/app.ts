import express, { Application as ExpressApp } from "express";
import SwaggerConfig from "./config/swagger.config.js";
import { Sequelize } from "sequelize"; // Import Sequelize
import dotenv from "dotenv";
import path from "path";
import { AllRoutes } from "./routes/index.routes.js";
import { initDatabase } from "./config/model.init";

export class Application {
  private app: ExpressApp;
  private port: number;
  private sequelize: Sequelize;

  constructor(port: number, sequelize: Sequelize) {
    this.port = port;
    this.sequelize = sequelize;

    // Load environment variables based on NODE_ENV
    const envFile =
      process.env.NODE_ENV === "production"
        ? ".env.production"
        : ".env.development";

    dotenv.config({ path: path.resolve(process.cwd(), envFile) });

    // Create Express application instance
    this.app = express();

    // Initialize core application layers
    this.initializeMiddlewares();
    this.initializeSwagger();
    this.setupRoutes();
  }

  /** Register global middlewares */
  private initializeMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  /** Setup Swagger documentation */
  private initializeSwagger(): void {
    SwaggerConfig(this.app);
  }

  /** Initialize database connection */
  async initDatabase(): Promise<void> {
    try {
      await this.sequelize.authenticate();
      console.log("✅ Database connection has been established successfully.");
    } catch (error) {
      console.error("❌ Unable to connect to the database:", error);
      throw error;
    }
  }

  async setupRoutes(): Promise<void> {
    this.app.use(AllRoutes)
  }

  /** Start HTTP server */
async start(): Promise<void> {
  try {
    // initialize database with sync
    await initDatabase();

    // سپس سرور را استارت بزن
    this.app.listen(this.port, () => {
      console.log(`🚀 Server running on port ${this.port}`);
      console.log(`📚 Swagger: http://localhost:${this.port}/api-docs`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
    });
  } catch (error) {
    console.error("Failed to start application:", error);
    process.exit(1);
  }
}


  /** Get Express app instance (for testing or additional configuration) */
  public getApp(): ExpressApp {
    return this.app;
  }
}
