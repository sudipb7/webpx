/**
 * Represents the result of the image conversion process.
 */
export type ConversionResult = {
  message: string;
  files: ConvertedFile[];
};

/**
 * Represents a converted file.
 */
export type ConvertedFile = {
  originalName: string;
  convertedName: string;
  size: number;
  convertedBuffer: string;
};

/**
 * Represents a file object from FormData
 */
export type FormDataFile = {
  name: string;
  type: string;
  size: number;
  arrayBuffer: () => Promise<ArrayBuffer>;
};
