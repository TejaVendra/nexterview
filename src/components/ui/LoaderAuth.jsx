import React from "react";
import { LoaderCircle } from "lucide-react";

function LoaderAuth() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-3">
        <LoaderCircle className="h-10 w-10 animate-spin text-black" />

        <p className="text-sm font-medium text-gray-500">
          Checking authentication...
        </p>
      </div>
    </div>
  );
}

export default LoaderAuth;