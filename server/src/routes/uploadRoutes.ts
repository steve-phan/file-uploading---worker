// routes/uploadRoutes.ts

import { Router } from "express";
import multer from "multer";
import ChunkUploadController from "../controllers/uploadController";
 
const uploadRouter = Router();
const upload = multer({ dest: "uploads/" });

uploadRouter.post("/chunk", upload.single("fileChunk"), ChunkUploadController.handleChunkUpload);

export default uploadRouter;
