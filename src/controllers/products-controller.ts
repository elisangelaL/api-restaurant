import { knex } from "@/database/knex";
import { NextFunction, Request, Response } from "express";
import {number, z} from "zod";
import { AppError } from "@/utils/AppError";

class ProductsController{
    async index(request: Request, response: Response, next: NextFunction){
        try{
            const { name } = request.query;
            const products = await knex<ProductRepository>("products")
            .select("*")
            .whereLike("name", `%${name ?? ""}%`)
            .orderBy("name");
            return response.json(products);
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

            await knex<ProductRepository>("products").insert({ name, price });

            return response.status(201).json();
        }catch(error){
            next(error);
        }
    }

    async update(request: Request, response: Response, next: NextFunction){
        try{
            const schema = z.object({
                name: z.string().trim().min(6),
                price: z.number().positive({message:"Price must be positive"})
            });

            const id = z.string().transform((value) => Number(value))
            .refine((value) => !isNaN(value), {message:"ID must be a number"})
            .parse(request.params.id);
           
            const { name, price } = schema.parse(request.body);

            const product = await knex<ProductRepository>("products").select().where({ id }).first();

            if(!product){
                throw new AppError("Product not found", 404);
            }

            await knex<ProductRepository>("products")
            .update({ name, price, updated_at: knex.fn.now() })
            .where({ id });
            

                return response.json({"message":"Product updated successfully"});
        }catch(error){
            next(error);
        }
    }

    async remove(request: Request, response: Response, next: NextFunction){
        try{
            const id = z.string().transform((value) => Number(value))
            .refine((value) => !isNaN(value), {message:"ID must be a number"})
            .parse(request.params.id);

            const product = await knex<ProductRepository>("products").select().where({ id }).first();

            if(!product){
                throw new AppError("Product not found", 404);
            }

            await knex<ProductRepository>("products")
            .delete()
            .where({ id });

            return response.json({"message":"Product deleted successfully"});
        }catch(error){
            next(error);
        }
    }
}

export { ProductsController };