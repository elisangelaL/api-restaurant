import { AppError } from "@/utils/AppError";
import { NextFunction, Request, Response } from "express";
import {z} from "zod";

class ProductsController{
    async index(request: Request, response: Response, next: NextFunction){
        try{
           
            return response.json({ message: "ok!" });
        }catch(error){
            next(error);
        }
    }
    async create(request: Request, response: Response, next: NextFunction){
        try{
            const schema = z.object({
                name: z.string().trim().min(6),
                price: z.number().positive({message:"Price must be positive"})
            });
            const { name, price } = schema.parse(request.body);
            return response.status(201).json({ name, price });
        }catch(error){
            next(error);
        }
    }
}

export { ProductsController };