import { Request, Response } from "express";
import { uploadFile, downloadFile } from "../services/fileService";

export const uploadMaterial = async (req: Request, res: Response) => {
  try {
    const filePath = await uploadFile(req.file!);
    res.status(201).json({ message: "Material uploaded successfully", filePath });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export const downloadMaterial = async (req: Request, res: Response) => {
  try {
    const filePath = await downloadFile(req.params.fileName);
    res.download(filePath);
  } catch (error) {
    res.status(404).json({ message: "File not found" });
  }
};
