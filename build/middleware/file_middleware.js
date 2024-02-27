"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileMiddleWare = void 0;
const multer_1 = __importStar(require("multer"));
const path_1 = __importDefault(require("path"));
class FileMiddleWare {
    constructor() {
        // Attribute Save File Type
        // Create Object File Multer to get the file type.
        this.diskLoader = (0, multer_1.default)({
            // storage = define folder to be saved the files
            storage: (0, multer_1.diskStorage)({
                destination: (req, file, cb) => {
                    cb(null, path_1.default.join(__dirname, "../../uploads"));
                },
                // random unique file name
                filename: (req, file, cb) => {
                    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 10000);
                    this.fileName = uniqueSuffix + "." + file.originalname.split(".").pop();
                    cb(null, this.fileName);
                },
            }),
            limits: {
                fileSize: 67108864, // 64 MByte
            },
        });
    }
}
exports.FileMiddleWare = FileMiddleWare;
//# sourceMappingURL=file_middleware.js.map