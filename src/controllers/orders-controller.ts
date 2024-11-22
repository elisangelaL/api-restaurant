import { AppError } from '@/utils/AppError';
import {Request, Response, NextFunction} from 'express';
import {z} from 'zod';
import { knex } from "@/database/knex"

class OrdersController{
    async create(request: Request, response: Response, next: NextFunction){
        try{
            const schema = z.object({
                table_session_id: z.number().int().positive(),               
                    product_id: z.number().int().positive(),
                    quantity: z.number().int().positive()
               
            });
            const { table_session_id, product_id, quantity } = schema.parse(request.body);

            const session = await knex<TableRepository>('tables_sessions').select().where({id: table_session_id}).first();
            if(!session){
                throw new AppError('Table not found', 404);
            }

            if(session.closed_at){
                throw new AppError('Table session is closed', 400);
            }
            
            const product = await knex<ProductRepository>('products').select().where({id: product_id}).first();
            if(!product){
                throw new AppError('Product not found', 404);
            }
            await knex<OrdersRepository>('orders').insert({
                table_session_id,
                product_id,
                quantity,
                price: product.price,
               
            })
            
            return response.status(201).json();
        }catch(error){
            next(error);
        }
    }

    async index(request: Request, response: Response, next: NextFunction){
        try{
            const { table_session_id } = request.params;
            const order = await knex<OrdersRepository>('orders')
            .select(
                "orders.id", 
                "orders.table_session_id", 
                "orders.product_id",               
                "products.name", 
                "orders.price",
                "orders.quantity",
            )
                
            .join("products", 
                "products_id",
                "orders.product.id"
            )
            .where({ table_session_id });
            return response.json(order);
        }catch(error){
            next(error);
        }
    }
}

export { OrdersController };