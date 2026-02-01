import dotenv from "dotenv";
import type { StringValue } from "ms";

const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";

dotenv.config({ path: envFile });

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value;
}

export const env = {
  PORT: Number(requireEnv("PORT")),
  NODE_ENV: requireEnv("NODE_ENV"),

  DB: {
    DIALECT: requireEnv("DB_DIALECT"),
    HOST: requireEnv("DB_HOST"),
    PORT: Number(requireEnv("DB_PORT")),
    USERNAME: requireEnv("DB_USERNAME"),
    PASSWORD: requireEnv("DB_PASSWORD"),
    NAME: requireEnv("DB_NAME"),
  },

  JWT: {
    ACCESS_SECRET: requireEnv("ACCESS_TOKEN_SECRET"),
    REFRESH_SECRET: requireEnv("REFRESH_TOKEN_SECRET"),
    ACCESS_EXPIRES_IN: "7d" as StringValue,
    REFRESH_EXPIRES_IN: "30d" as StringValue,
  },
};