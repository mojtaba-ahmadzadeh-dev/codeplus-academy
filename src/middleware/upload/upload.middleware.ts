import multer from "multer";
import path from "path";
import fs from "fs";

const createStorage = (folder: string) => {

  const uploadDir = path.join(
    process.cwd(),
    "public",
    "uploads",
    folder
  );

  fs.mkdirSync(uploadDir, { recursive: true });

  return multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, uploadDir);
    },
    filename: (_req, file, cb) => {
      const uniqueName =
        Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueName + path.extname(file.originalname));
    },
  });
};

export const uploadUser = multer({
  storage: createStorage("user"),
});

export const uploadRoom = multer({
  storage: createStorage("room"),
});