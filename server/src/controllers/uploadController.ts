// controllers/ChunkUploadController.ts

import { Request, Response } from "express";
import ChunkUploadService from "../services/uploadService";

class ChunkUploadController {
  static async handleChunkUpload(req: Request, res: Response): Promise<void> {
    try {
      const { chunkIndex, totalChunks, fileId } = req.body;
      const { file } = req;

      if (!file || chunkIndex === undefined || !totalChunks || !fileId) {
        res.status(400).json({ error: "Invalid request data" });
        return;
      }

      const chunkIndexInt = parseInt(chunkIndex);
      const totalChunksInt = parseInt(totalChunks);

      if (isNaN(chunkIndexInt) || isNaN(totalChunksInt)) {
        res.status(400).json({ error: "Invalid chunk index or total chunks" });
        return;
      }

      const result = await ChunkUploadService.saveChunk(
        file,
        chunkIndexInt,
        totalChunksInt,
        fileId
      );

      res.json(result);
    } catch (error) {
      console.error("Error in handleChunkUpload:", error);
      res.status(500).json({
        error: error instanceof Error ? error.message : "Something went wrong",
      });
    }
  }
}

export default ChunkUploadController;
