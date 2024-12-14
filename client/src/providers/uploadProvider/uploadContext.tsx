import React, { createContext, useContext, useState, ReactNode } from "react";

interface UploadContextProps {
  progress: number;
  isUploading: boolean;
  setProgress: (progress: number) => void;
  setIsUploading: (isUploading: boolean) => void;
}

export const UploadContext = createContext<UploadContextProps | undefined>(
  undefined
);

export const UploadProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  return (
    <UploadContext.Provider
      value={{ progress, isUploading, setProgress, setIsUploading }}
    >
      {children}
    </UploadContext.Provider>
  );
};
