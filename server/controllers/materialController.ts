import { Request, Response } from "express";
import { MaterialService } from "../services/materialService";
import { uploadFile, downloadFile } from "../services/fileService";

export class MaterialController {
  static async getMaterialsByCourse(req: Request, res: Response): Promise<void> {
    try {
      const courseId = parseInt(req.params.courseId);
      const materials = await MaterialService.getMaterialsByCourse(courseId);
      res.status(200).json(materials);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      res.status(500).json({ message: "Error fetching materials", error: errorMessage });
    }
  }

  static async createMaterial(req: Request, res: Response): Promise<void> {
    try {
      const materialData = req.body;
      if (req.file) {
        const filePath = await uploadFile(req.file);
        materialData.filePath = filePath;
      }
      const material = await MaterialService.createMaterial(materialData);
      res.status(201).json(material);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      res.status(500).json({ message: "Error creating material", error: errorMessage });
    }
  }

  static async downloadMaterial(req: Request, res: Response): Promise<void> {
    try {
      const fileName = req.params.fileName;
      const filePath = await downloadFile(fileName);
      res.download(filePath);
    } catch (error) {
      res.status(404).json({ message: "Error downloading file", error: (error as any).message });
    }
  }
}

