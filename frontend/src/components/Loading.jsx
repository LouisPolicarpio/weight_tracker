import React from "react";
import { LoaderCircle } from "lucide-react";

function Loading() {
  return (
    <div className="flex justify-center p-4">
      <LoaderCircle className="animate-spin text-blue-500 w-10 h-10" />
    </div>
  );
}

export default Loading;
