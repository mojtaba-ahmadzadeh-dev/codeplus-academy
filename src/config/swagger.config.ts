import path from "path";
import swaggerJsDocs from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { fileURLToPath } from "url";
import type { Application } from "express"; // ✅ فقط Application

/** Resolve current directory (ESM compatible) */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SwaggerConfig = (app: Application): void => {
  const swaggerOptions = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Codeplus Academy API",
        version: "1.0.0",
        description: "API documentation for Store Management project",
      },
    },
    apis: [path.join(__dirname, "../module/**/*.swagger.{ts,js}")],
  };

  const swaggerSpec = swaggerJsDocs(swaggerOptions);

  // Expose Swagger UI at /api-docs
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default SwaggerConfig;
