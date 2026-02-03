import { Sequelize, Dialect } from "sequelize";
import { env } from "./env";

export const sequelize = new Sequelize({
  dialect: env.DB.DIALECT as Dialect,
  host: env.DB.HOST,
  port: env.DB.PORT,
  username: env.DB.USERNAME,
  password: env.DB.PASSWORD,
  database: env.DB.NAME,
  logging: false,
});