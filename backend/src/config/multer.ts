import crypto from "crypto";
import multer from "multer";
import { extname, resolve } from "path";

export default {
    upload(folder: string) {
        return {
            storage: multer.diskStorage({
                destination: resolve(__dirname, "..", "..", folder),
                filename: (request, file, callback) => {
                    const fileHash = crypto.randomBytes(16).toString("hex");
                    const fileName = `${fileHash}-${file.originalname}`;

                    return callback(null, fileName);
                },
            }),
            fileFilter: (request: any, file: Express.Multer.File, callback: any) => {
                const allowedMimes = ["image/jpeg", "image/png", "image/jpg"];

                if (allowedMimes.includes(file.mimetype)) {
                    callback(null, true);
                } else {
                    callback(new Error("Formato de arquivo inválido."));
                }
            },
        };
    },
};
