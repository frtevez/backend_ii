import Router from "express";
import requireAuth from "../middlewares/auth.js";
import User from "../models/user.model.js";

const viewsRouter = Router();

viewsRouter.get('/', (req, res) => {
    res.status(200).json({ message: 'home page' })
});

viewsRouter.get('/login', (req, res) => {
    res.status(200).json({ message: 'login page' })
});

viewsRouter.get('/register', (req, res) => {
    res.status(200).json({ message: 'register page' })
});

viewsRouter.get('/api/sessions/current', requireAuth, async (req, res) => {
    const user = await User.findById(req.user._id).lean()
    res.json({'current': { ...user }})
});

export default viewsRouter;