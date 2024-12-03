import express from "express";
import { uploadMaterial, downloadMaterial } from "../controllers/materialController";
import { authMiddleware } from "../middlewares/authMiddleware";
import multer from "multer";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // Use in-memory storage for file uploads

// Upload a material (requires authentication)
router.post("/upload", authMiddleware, upload.single("file"), uploadMaterial);

// Download a material
router.get("/download/:fileName", downloadMaterial);

export default router;
