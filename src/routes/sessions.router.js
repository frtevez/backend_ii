import Router from "express";
import passportCall from "../middlewares/passportAuth.js";
import { userController } from "../controllers/user.controller.js";
import { handlePolicies } from "../middlewares/handlePolicies.js";


const sessionsRouter = Router();

sessionsRouter.get('/current', passportCall('jwt'), handlePolicies(["CUSTOMER", "ADMIN"]), userController.current);

export default sessionsRouter;