import { PrismaClient } from "@prisma/client"
import { Request, Response, NextFunction } from "express";


const prisma = new PrismaClient();

async function isPremium(request: Request, response : Response, next: NextFunction) {
    
    try{

        const{userEmail}= request.body

        const user = await prisma.user.findUnique({
            where:{
                email:userEmail?.isPremiu
            }
        })

        if (user?.isPremium){
            next()
        }else{
            return response.status(401).json({message: "Não Autorizado "})
        }

    }catch(error:any){
            return response.status(500).json({message:error.message})
       }
    
}

export default isPremium