import { Router } from 'express';
import multerConfig from '../config/multerConfig';
import { uploadImagem } from '../controllers/produtoController';

const router = Router();

// Rota para upload de imagem
router.post('/produtos/:id/imagem', multerConfig.single('imagem'), uploadImagem);

export default router;