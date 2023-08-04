import * as fs from 'fs';
import * as path from 'path';

export function deleteFileInPublic(fileAddress: string) {
    if (fileAddress) {
        const pathFile = path.join(
            __dirname,
            '..',
            '..',
            'public',
            fileAddress,
        );
        if (fs.existsSync(pathFile)) fs.unlinkSync(pathFile);
    }
}
