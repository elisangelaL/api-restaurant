import { Router } from "express";
import { productsRouter } from "./products-routes";
import { tablesRoutes } from "./tables-route";
import { tablesSessionsRoutes } from "./tables-sessions-routes";
import{ordersRouter} from "./orders-routes";

const routes = Router();
routes.use("/products", productsRouter);
routes.use("/tables", tablesRoutes);
routes.use("/tables-sessions", tablesSessionsRoutes);
routes.use("/orders", ordersRouter);


export { routes };