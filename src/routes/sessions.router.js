import Router from "express";
import passportCall from "../middlewares/passportAuth.js";
import { userController } from "../controllers/user.controller.js";


const sessionsRouter = Router();

sessionsRouter.get('/current', passportCall('jwt'), userController.current);

export default sessionsRouter;