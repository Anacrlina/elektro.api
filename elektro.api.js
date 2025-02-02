import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response} from "express";

const prisma = new PrismaClient();

class usuariocontroller{
    //metodo de criar um novo usuario
    static async create(req, resp) {
        const{ Nome, Idade, CPF, Telefone, Email, Rg } = req.body;
        try {
           let usuarioInput ={
                Nome,
                Idade,
                CPF,
                Telefone,
                Email,
                Rg,
            }

            const newUsuario = await prisma.usuario.create({
                data:usuarioInput
            });
            return resp.status(201).json({
                Message: "Usuario criado com sucesso",
                data : newUsuario,
            });
        } catch (error) {
            return resp.status(500).json({
                message: "erro ao criar usuário",
                error: error,
            });
        }}

      // Listar todos os usuários
      static async listar(_req, res) {
        const { id } = req.params;
        try {
          const usuarios = await prisma.usuario.findMany({
            include: { produtos: true }, // Inclui os produtos relacionados ao usuário
          });
          return res.json(usuarios);
        } catch (error) {
          return res.status(500).json({ error: "Erro ao buscar usuários" });
        }
    }
    
      // Buscar um usuário por ID
      static async buscarPorId(req, res) {
        const { id } = req.params;
        try {
          const usuario = await prisma.usuario.findUnique({
            where: { id: Number(id) },
            include: { produtos: true },
          });
          if (!usuario) return res.status(404).json({ error: "Usuário não encontrado" });
          return res.json(usuario);
        } catch (error) {
          return res.status(500).json({ error: "Erro ao buscar usuário" });
        }
      }
    
      // Atualizar um usuário
      static async atualizar(req, res) {
        const { id } = req.params;
        const dados = req.body;
        try {
          const usuarioAtualizado = await prisma.usuario.update({
            where: { id: Number(id) },
            data: dados,
          });
          return res.json(usuarioAtualizado);
        } catch (error) {
          return res.status(500).json({ error: "Erro ao atualizar usuário" });
        }
      }
    
      // Deletar um usuário
      static async deletar(req, res) {
        const { id } = req.params;
        try {
          await prisma.usuario.delete({ where: { id: Number(id) } });
          return res.json({ message: "Usuário deletado com sucesso" });
        } catch (error) {
          return res.status(500).json({ error: "Erro ao deletar usuário" });
        }
      }
    }
    
   
    class produtocontroller{
        //metodo de criar um novo usuario
        static async create(req, resp) {
            const{ Preço, Marca, modelo, Qualidade, Referencia, Fabricacao } = req.body;
            try {
               let produtoInput ={
                    Preço,
                    Marca,
                    modelo,
                    Qualidade,
                    Referencia,
                    Fabricacao,
                }
    
                const newproduto = await prisma.produto.create({
                    data:produtoInput
                });
                return resp.status(201).json({
                    Message: "produto criado com sucesso",
                    data : newproduto,
                });
            } catch (error) {
                return resp.status(500).json({
                    message: "erro ao criar produto",
                    error: error,
                });
            }}

 // Listar todos os produtos
 static async listar(req, re) {
    try {
      const produtos = await prisma.produto.findMany({
        include: { usuario: true }, // Inclui informações do usuário dono do produto
      });
      return res.json(produtos);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar produtos" });
    }
  }

  // Buscar um produto por ID
  static async buscarPorId(req, res) {
    const { id } = req.params;
    try {
      const produto = await prisma.produto.findUnique({
        where: { id: Number(id) },
        include: { usuario: true },
      });
      if (!produto) return res.status(404).json({ error: "Produto não encontrado" });
      return res.json(produto);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar produto" });
    }
  }

  // Atualizar um produto
  static async atualizar(req, res) {
    const { id } = req.params;
    const dados = req.body;
    try {
      const produtoAtualizado = await prisma.produto.update({
        where: { id: Number(id) },
        data: dados,
      });
      return res.json(produtoAtualizado);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao atualizar produto" });
    }
  }

  // Deletar um produto
  static async deletar(req, res) {
    const { id } = req.params;
    try {
      await prisma.produto.delete({ where: { id: Number(id) } });
      return res.json({ message: "Produto deletado com sucesso" });
    } catch (error) {
      return res.status(500).json({ error: "Erro ao deletar produto" });
    }
  }}


export default ProdutoController;