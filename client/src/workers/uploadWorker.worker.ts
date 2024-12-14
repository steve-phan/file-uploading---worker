// The worker script will be responsible for handling chunk uploads of a file
// and communicate back to the main thread about the progress and errors.

import { BASE_API_URL, CHUNKSIZE } from "../config/config";

type UploadMessage = {
  file: File;
  chunkSize: number;
};

type WorkerResponse =
  | {
      type: "progress";
      progress: number;
    }
  | {
      type: "error";
      error: string;
    }
  | {
      type: "complete";
    };

self.onmessage = async function (event: MessageEvent<UploadMessage>) {
  const { file } = event.data;
  const totalChunks = Math.ceil(file.size / CHUNKSIZE);
  let uploadedChunks = 0;
  let currentChunk = 0;
  const fileId = `${file.name}-${Date.now()}`; // Generate unique file ID for tracking purposes

  // Debug counter to limit retries if needed
  let retryCount = 0;
  const maxRetries = 3;

  // Start chunk upload loop
  while (currentChunk < totalChunks && retryCount < maxRetries) {
    const chunkStart = currentChunk * CHUNKSIZE;
    const chunkEnd = Math.min(chunkStart + CHUNKSIZE, file.size);
    const chunk = file.slice(chunkStart, chunkEnd);

    console.log(`Uploading chunk ${currentChunk + 1}/${totalChunks}`, {
      chunkStart,
      chunkEnd,
      chunkSize: chunk.size,
    });

    try {
      // Upload the current chunk
      await uploadChunk(chunk, currentChunk, totalChunks, fileId);
      uploadedChunks++;

      // Report progress back to the main thread
      self.postMessage({
        type: "progress",
        progress: (uploadedChunks / totalChunks) * 100,
      } as WorkerResponse);

      currentChunk++; // Move to the next chunk
    } catch (error) {
      retryCount++;
      console.error(
        `Error uploading chunk ${currentChunk}. Attempt ${retryCount}`,
        error
      );

      if (retryCount >= maxRetries) {
        self.postMessage({
          type: "error",
          error: `Chunk ${currentChunk} failed after ${retryCount} retries.`,
        } as WorkerResponse);
        return; // Stop further uploads if max retries are reached
      }
    }
  }

  // Notify completion if all chunks are successfully uploaded
  if (uploadedChunks === totalChunks) {
    console.log("Upload complete for fileId:", fileId);
    self.postMessage({ type: "complete" } as WorkerResponse);
  } else {
    console.warn("Upload incomplete. Total uploaded chunks:", uploadedChunks);
  }
};

async function uploadChunk(
  chunk: Blob,
  chunkNumber: number,
  totalChunks: number,
  fileId: string
): Promise<void> {
  const formData = new FormData();
  formData.append("fileChunk", chunk, `chunk-${chunkNumber}`);
  formData.append("chunkIndex", chunkNumber.toString());
  formData.append("totalChunks", totalChunks.toString());
  formData.append("fileId", fileId);

  const response = await fetch(`${BASE_API_URL}/uploads/chunk`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(
      `Chunk ${chunkNumber} upload failed with status: ${response.status}`
    );
  }
}

export default {};
