"use client";

import * as React from "react";
import { toast } from "sonner";
import { useDropzone } from "react-dropzone";

import { UploadIcon } from "lucide-react";
import { compressImages } from "@/actions/compression";

export function ImageCompressorForm() {
  const [files, setFiles] = React.useState<File[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxFiles: 10,
    maxSize: 10 * 1024 * 1024, // 10MB
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles);
    },
  });

  const handleSubmit = React.useCallback(async () => {
    try {
      setIsLoading(true);

      if (files.length === 0) {
        toast.error("Please select an image to convert");
        return;
      }

      if (files.length > 10) {
        toast.error("You can only convert up to 10 images at a time");
        return;
      }

      const formData = new FormData();
      files.forEach((file) => formData.append("images", file));

      const result = await compressImages(formData);

      result.files.forEach((file) => {
        const link = document.createElement("a");
        link.href = `data:image/webp;base64,${file.convertedBuffer}`;
        link.download = file.convertedName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });

      toast.success("Images converted successfully");
    } catch (err) {
      toast.error("An error occurred while converting the images");
    } finally {
      setFiles([]);
      setIsLoading(false);
    }
  }, [files]);

  React.useEffect(() => {
    if (files.length > 0) {
      handleSubmit();
    }
  }, [files.length, handleSubmit]);

  return (
    <section className="w-full container">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 mx-auto block"
      >
        <div
          aria-disabled={isLoading}
          {...getRootProps({
            className:
              "flex flex-col items-center justify-center cursor-default gap-4 rounded-lg border-2 border-dashed border-muted-foreground/50 bg-background p-8 text-muted-foreground transition-colors hover:border-muted-foreground h-52 md:h-64 max-w-md mx-auto disabled:pointer-events-none disabled:cursor-not-allowed disabled:border-muted-foreground disabled:text-muted-foreground disabled:bg-background disabled:hover:border-muted-foreground disabled:opacity-60",
          })}
        >
          <input {...getInputProps()} />
          <UploadIcon className="h-8 w-8" />
          <p className="text-center">Drag and drop your image here or click to select a file.</p>
        </div>
        <p className="text-sm text-center text-muted-foreground">
          Max size of a file: 10MB, Max files: 10
        </p>
      </form>
    </section>
  );
}
