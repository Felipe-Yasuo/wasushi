import multer from "multer";

export default {
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter: (_request: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
        const allowedMimes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Formato de arquivo inválido. Use apenas JPG, JPEG, PNG ou WEBP."));
        }
    },
};

