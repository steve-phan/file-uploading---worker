import fs from "fs";
import path from "path";
import fsExtra from "fs-extra";

const CHUNKS_DIR = path.resolve(process.cwd(), "uploads", "chunks");
const FINAL_UPLOADS_DIR = path.resolve(process.cwd(), "uploads");

(async () => {
  await fsExtra.ensureDir(CHUNKS_DIR);
  await fsExtra.ensureDir(FINAL_UPLOADS_DIR);
})();

class ChunkUploadService {
  static async saveChunk(
    file: Express.Multer.File,
    chunkIndex: number,
    totalChunks: number,
    fileId: string
  ) {
    try {
      // Sanitize the file name while preserving the extension
      const sanitizedFileName = ChunkUploadService.sanitizeFileName(
        file.originalname
      );
      const fileExtension = path.extname(file.originalname); // Extract the extension (e.g., .jpeg, .png)
      const fileDir = path.join(CHUNKS_DIR, fileId);

      console.log({ file });

      // Ensure the chunk directory exists
      await fsExtra.ensureDir(fileDir);

      // Save the chunk to the chunk directory without an extension
      const chunkPath = path.join(fileDir, `chunk-${chunkIndex}`);
      await fs.promises.rename(file.path, chunkPath);

      // Check all uploaded chunks
      const uploadedChunks = await fs.promises.readdir(fileDir);
      // console.log(`Uploaded chunks: ${uploadedChunks.length}/${totalChunks}`);

      // Only combine chunks if all are available
      if (uploadedChunks.length === totalChunks) {
        // Create final file path with the sanitized file name and original file extension
        const finalFilePath = path.join(
          FINAL_UPLOADS_DIR,
          this.getOriginalFileName(fileId)
        );

        await ChunkUploadService.combineChunks(
          fileDir,
          finalFilePath,
          totalChunks
        );

        // Remove chunks directory after successful reassembly
        await fsExtra.remove(fileDir);

        return { status: "completed", filePath: finalFilePath };
      }

      return { status: "chunk received", chunkIndex };
    } catch (error) {
      console.error("Error saving chunk:", error);
      throw new Error("Chunk upload failed");
    }
  }

  private static async combineChunks(
    chunkDir: string,
    finalFilePath: string,
    totalChunks: number
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const writeStream = fs.createWriteStream(finalFilePath);

      writeStream.on("finish", resolve);
      writeStream.on("error", reject);

      (async () => {
        for (let i = 0; i < totalChunks; i++) {
          const chunkPath = path.join(chunkDir, `chunk-${i}`);
          console.log(`Reading chunk ${i} from ${chunkPath}`);
          try {
            const data = await fs.promises.readFile(chunkPath);
            writeStream.write(data);
          } catch (error) {
            console.error(`Error reading chunk ${i} from ${chunkPath}`, error);
            writeStream.destroy();
            reject(error);
          }
        }

        writeStream.end();
      })().catch((err) => {
        writeStream.destroy();
        reject(err);
      });
    });
  }

  private static sanitizeFileName(fileName: string): string {
    const baseName = path.basename(fileName, path.extname(fileName)); // Get the base name without extension

    // Replace any characters that are not alphanumeric, dots, hyphens, or underscores
    const sanitizedBaseName = baseName.replace(/[^a-zA-Z0-9.\-_]/g, "_");

    return sanitizedBaseName; // Return the sanitized base name (extension will be added when needed)
  }

  private static getOriginalFileName(fileNameWithTimestamp: string): string {
    const parts = fileNameWithTimestamp.split("-");

    // Remove the last part, which is the timestamp
    parts.pop();

    // Join the remaining parts back with `-` to reconstruct the original name
    return parts.join("-");
  }
}

export default ChunkUploadService;
