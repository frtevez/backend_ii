// NO FUNCIONAL

import Router from "express";

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

export default viewsRouter;