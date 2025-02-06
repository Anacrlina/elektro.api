import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// Middleware de validação para cadastro de usuário
export const validarCadastro = [
  body('email').isEmail().withMessage('Email inválido'),
  body('name').notEmpty().withMessage('O nome é obrigatório'),
  body('password').isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres'),
  body('phone').optional().isMobilePhone('pt-BR').withMessage('Número de telefone inválido'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ erros: errors.array() });
    }
    next();
  }
];