import { UseInterceptors, applyDecorators } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { notMatchFormatException } from './exceptions/notMatchFormat.exception';

function createRoute(req) {
    const directory = path.join(
        __dirname,
        '..',
        '..',
        'public',
        'uploads',
        'products',
    );
    req.body.fileUploadPath = path
        .join('upload', 'products')
        .replace(/\\/g, '/');
    fs.mkdirSync(directory, { recursive: true });
    return directory;
}

export const uploadFile = (
    fieldName: string = 'file',
    mimetype: string[] = [],
) => {
    return applyDecorators(
        UseInterceptors(
            FileInterceptor(fieldName, {
                storage: diskStorage({
                    destination: (req, file, cb) => {
                        if (file?.originalname) {
                            const filePath = createRoute(req);
                            return cb(null, filePath);
                        }
                        cb(null, null);
                    },
                    filename: (req, file, cb) => {
                        if (file?.originalname) {
                            const ext = path.extname(file.originalname);
                            const fileName = String(new Date().getTime() + ext);
                            req.body.fileName = fileName;
                            return cb(null, fileName);
                        }
                        cb(null, null);
                    },
                }),
                fileFilter: (req, file, cb) => {
                    const ext = path.extname(file.originalname);
                    if (mimetype.includes(ext)) {
                        return cb(null, true);
                    }
                    return cb(new notMatchFormatException(), false);
                },
            }),
        ),
    );
};
