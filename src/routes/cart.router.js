import Router from "express";
import passportCall from "../middlewares/passportAuth.js";
import { handlePolicies } from "../middlewares/handlePolicies.js";
import { cartController } from "../controllers/cart.controller.js";
import { userController } from "../controllers/user.controller.js";


const cartRouter = Router();

cartRouter.get("/", passportCall('jwt'), handlePolicies(["CUSTOMER"]), cartController.get)
cartRouter.post('/', passportCall('jwt'), handlePolicies(["CUSTOMER"]), cartController.addProductToCurrentUserCart);
cartRouter.put('/reset', passportCall('jwt'), handlePolicies(["CUSTOMER"]), userController.resetCart);

export default cartRouter;