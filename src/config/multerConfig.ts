import multer, { FileFilterCallback } from 'multer';
import { Request } from 'express';

// Configuração para armazenar o arquivo em memória
const storage = multer.memoryStorage();

// Filtro para aceitar apenas imagens
const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Tipo de arquivo inválido. Apenas JPEG, PNG e GIF são permitidos.'));
    }
};

export default multer({ storage, fileFilter });
