import multer, { Multer } from "multer";

export class FileStorageMiddleWare {
  // Attribute Save FileName
  public fileName: string;

  // Attribute Save File Type
  // Create Object File Multer to get the file type.
  public readonly diskLoader: Multer = multer({
    // storage = define folder to be saved the files
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 67108864, // 64 MByte
    },
  });
}
