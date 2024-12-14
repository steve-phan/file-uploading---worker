import React from "react";
import { useUpload } from "../hooks/useUpload";

export const StickyProgressBar: React.FC = () => {
  const { progress, isUploading } = useUpload();

  if (!isUploading) return null;

  return (
    <div className="fixed bottom-4 right-4 w-64 bg-white p-4 rounded-lg shadow-lg">
      <div className="flex flex-col items-center">
        <progress
          value={progress}
          max="100"
          className="w-full appearance-none h-4 rounded-full overflow-hidden"
        ></progress>
        <p className="text-center text-gray-700 mt-2">{progress}%</p>
      </div>
    </div>
  );
};
