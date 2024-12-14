import React, { useRef } from "react";
import UploadWorker from "../../workers/uploadWorker.worker";
import { useUpload } from "../../hooks/useUpload";

const TypedWorker = UploadWorker as unknown as { new (): Worker };
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

export const UploadComponent: React.FC = () => {
  const { setProgress, setIsUploading, isUploading } = useUpload();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      startUpload(file);
      // Reset file input value so the same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const startUpload = (file: File) => {
    const worker = new TypedWorker();
    setIsUploading(true);

    worker.postMessage({ file });

    worker.onmessage = (event: MessageEvent<WorkerResponse>) => {
      const { type } = event.data;

      if (type === "progress") {
        setProgress(event.data.progress);
      } else if (type === "error") {
        console.error(event.data.error);
        setIsUploading(false);
      } else if (type === "complete") {
        setIsUploading(false);
        setProgress(100);
        console.log("Upload complete");
      }
    };
  };

  return (
    <div className="flex flex-col items-center p-8">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">File Upload</h2>
        <div className="flex flex-col items-center">
          <label
            htmlFor="file-upload"
            className="w-full bg-pink-500 text-white text-center py-2 rounded-lg cursor-pointer hover:bg-pink-600 transition"
          >
            Select File to Upload
          </label>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
            ref={fileInputRef}
          />
        </div>
      </div>
    </div>
  );
};
