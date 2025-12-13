import Router from "express";
import User from "../models/user.model.js";
import passportCall from "../middlewares/passportAuth.js";

const viewsRouter = Router();

viewsRouter.get('/', (req, res) => {
    res.status(200).json({ message: 'home page' });
});

viewsRouter.get('/login', (req, res) => {
    res.status(200).json({ message: 'login page', error: req.query.error });
});

viewsRouter.get('/register', (req, res) => {
    res.status(200).json({ message: 'register page' });
});

viewsRouter.get('/api/sessions/current', passportCall('jwt'), async (req, res) => {
    const user = await User.findById(req.user._id).lean();
    res.json({ 'current': { ...user } });
});

export default viewsRouter;