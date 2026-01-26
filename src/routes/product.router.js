import express from "express";
import crypto from "crypto";
import { productController } from "../controllers/product.controller.js";

const productRouter = express.Router();

productRouter.get('/', productController.listAll);
productRouter.get('/:pid', productController.get);
productRouter.post('/', productController.new);
productRouter.put('/:pid', productController.edit);
productRouter.delete('/:pid', productController.remove);
productRouter.put('/:pid/stock/increase', productController.increaseStock);
productRouter.put('/:pid/stock/decrease', productController.decreaseStock);

export default productRouter;