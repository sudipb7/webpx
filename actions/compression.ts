"use server";

import sharp from "sharp";
import { v4 as uuid } from "uuid";

import type { ConversionResult, FormDataFile } from "@/types";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/jpg"];

export async function compressImages(formData: FormData): Promise<ConversionResult> {
  try {
    const files = formData.getAll("images") as FormDataFile[];

    if (files.length === 0) {
      throw new Error("No files uploaded");
    }

    const convertedFiles = await Promise.all(
      files.map(async (file: FormDataFile) => {
        if (!ALLOWED_MIME_TYPES.includes(file.type)) {
          throw new Error(`Invalid file type: ${file.type}`);
        }

        if (file.size > MAX_FILE_SIZE) {
          throw new Error(`File too large: ${file.name}`);
        }

        const buffer = await file.arrayBuffer();
        const outputFileName = `${uuid()}.webp`;

        const webpBuffer = await sharp(Buffer.from(buffer)).webp({ quality: 75 }).toBuffer();

        return {
          originalName: file.name,
          convertedName: outputFileName,
          size: webpBuffer.length,
          convertedBuffer: webpBuffer.toString("base64"),
        };
      })
    );

    return {
      message: "Conversion successful",
      files: convertedFiles,
    };
  } catch (error) {
    console.error("Conversion error:", error);
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}
