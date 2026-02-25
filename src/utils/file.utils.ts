import path from "path";
import { Express } from "express";

export const getImageUrl = (
  file: Express.Multer.File | null,
  folder: string,
  basePath: string = ""
): string | null => {
  if (!file) return null;

  const fileName = path.basename(file.path);

  return `${basePath}/uploads/${folder}/${fileName}`;
};