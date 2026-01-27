import express from "express";
import { productController } from "../controllers/product.controller.js";
import { handlePolicies } from "../middlewares/handlePolicies.js";

const productRouter = express.Router();

productRouter.get('/', productController.listAll);
productRouter.get('/:pid', productController.get);
productRouter.post('/', handlePolicies(["ADMIN"]), productController.new);
productRouter.put('/:pid', handlePolicies(["ADMIN"]), productController.edit);
productRouter.delete('/:pwid', handlePolicies(["ADMIN"]), productController.remove);
productRouter.put('/:pid/stock/increase', handlePolicies(["ADMIN"]), productController.increaseStock);
productRouter.put('/:pid/stock/decrease', handlePolicies(["ADMIN"]), productController.decreaseStock);

export default productRouter;