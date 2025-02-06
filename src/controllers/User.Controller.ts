import { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import auth from "../config/auth";

const prisma = new PrismaClient();

class UserController{

    static async getUsers(request: Request, response: Response){
        
        try {
            
            const users = await prisma.user.findMany();
    
            return response.status(200).json(users)
        } catch (error) {
            return response.status(400).json({ error: 'Error loading users' })
            
        }
    }
    
    static async createUser(request: Request, response: Response){

        const { name, email, password } = request.body;
        const { hash, salt } = auth.generatePassword(password);

        try {
            const User = await prisma.user.create({
                data: {
                    name,
                    email,
                    hash,
                    salt
                }
            })

            return response.status(201).json(User)

        } catch (error) {
            return response.status(400).json({ error: 'Error creating user' })
        }
    }

    static async login(request: Request, response: Response) {


        try {
            
            const {email, password} = request.body;
    
            const user = await prisma.user.findUnique({
                where:{ email: email}
            });

            if(!user)
                return response.status(400).json({message:"usuário não existe"})

            const {hash, salt} = user

            if(!auth.checkPassword(password, hash, salt)){
                return response.status(400).json({message:"Senha incorreta"})
            }
            const token = auth.generateJWT(user);
    
            return response.status(201).json({message:"Token enviado" ,token: token})

        } catch (error) {
            return response.status(500).json({message: "Server Error"})

        }
        
        
    }

    static async deleteUsers(request: Request, response: Response){
        try {
            const users = await prisma.user.deleteMany();
            return response.status(200).json({ message: 'Users deleted' })
        } catch (error) {
            return response.status(400).json({ error: 'Error deleting users' })
        }
    }

    static async testeAutenticacao(request: Request, response: Response){
        const email = request.user as string; 

        if(!email)
            return response.status(401).json({ message: "Não autorizado" });

        return response.status(201).json({message:"acesso autorizado"})
    }

}

export default UserController;