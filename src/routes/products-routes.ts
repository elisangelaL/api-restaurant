import { ProductsController } from "@/controllers/products-controller";
import { Router } from "express";

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.get("/", productsController.index);
productsRouter.post("/", productsController.create);
productsRouter.put("/:id", productsController.update);
productsRouter.delete("/:id", productsController.remove);

export { productsRouter };