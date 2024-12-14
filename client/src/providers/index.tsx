import React, { ReactNode } from "react";
import { UploadProvider } from "./uploadProvider/uploadContext";

export * from "./uploadProvider/uploadContext";

export const Providers = ({ children }: { children: ReactNode }) => {
  return <UploadProvider>{children}</UploadProvider>;
};
