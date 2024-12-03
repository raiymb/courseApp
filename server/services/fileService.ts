import fs from "fs";
import path from "path";

const UPLOADS_DIR = path.join(__dirname, "../../uploads");

export const uploadFile = async (file: Express.Multer.File): Promise<string> => {
  const filePath = path.join(UPLOADS_DIR, file.filename);

  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }

  fs.writeFileSync(filePath, file.buffer);
  return filePath;
};

export const downloadFile = async (fileName: string): Promise<string> => {
  const filePath = path.join(UPLOADS_DIR, fileName);

  if (!fs.existsSync(filePath)) {
    throw new Error("File not found");
  }

  return filePath;
};
