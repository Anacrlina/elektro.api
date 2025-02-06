import { Request, Response } from 'express';
import pool from '../db'; // Conexão com o PostgreSQL

 export const registerUser = async(request, response) => {
   const { email, nome } = request.body;
 
   try {
     // Aqui você pode salvar o usuário no banco antes do email, se necessário
 
     await sendEmail(email, "Bem-vindo ao Elektro!", "Olá",{nome}, "obrigado por se cadastrar"!);
 
     request.status(201).json({ message: "Usuário registrado e email enviado!" });
   } catch (error) {
     request.status(500).json({ message: "Erro ao registrar usuário", error });
   }
 };
export const uploadImagem = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const imagemBuffer = req.file?.buffer;

    if (!imagemBuffer) {
        res.status(400).json({ mensagem: 'Nenhuma imagem foi enviada.' });
        return;
    }

    try {
        const result = await pool.query(
            'UPDATE produtos SET imagem = $1 WHERE id = $2 RETURNING *',
            [imagemBuffer, id]
        );

        if (result.rowCount === 0) {
            res.status(404).json({ mensagem: 'Produto não encontrado.' });
            return;
        }

        res.status(200).json({ mensagem: 'Imagem adicionada com sucesso!', produto: result.rows[0] });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao adicionar imagem.', erro: (error as Error).message });
    }
};
import { sendEmail } from "../services/emailService";
