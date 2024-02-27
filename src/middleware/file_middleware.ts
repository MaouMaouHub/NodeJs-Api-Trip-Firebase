import multer, { diskStorage, Multer } from "multer";

import path from "path";

export class FileMiddleWare {
  // Attribute Save FileName
  public fileName: string;

  // Attribute Save File Type
  // Create Object File Multer to get the file type.
  public readonly diskLoader: Multer = multer({
    // storage = define folder to be saved the files
    storage: diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../uploads"));
      },
      // random unique file name
      filename: (req, file, cb) => {
        const uniqueSuffix =
          Date.now() + "-" + Math.round(Math.random() * 10000);
        this.fileName = uniqueSuffix + "." + file.originalname.split(".").pop();
        cb(null, this.fileName);
      },
    }),
    limits: {
      fileSize: 67108864, // 64 MByte
    },
  });
}
