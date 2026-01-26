import express from 'express';
import userRouter from './routes/user.router.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import viewsRouter from './routes/views.router.js';
import initializePassport from './config/passport.config.js';
import passport from 'passport';
import { configDotenv } from 'dotenv';
import sessionsRouter from './routes/sessions.router.js';
import productRouter from './routes/product.router.js';

configDotenv();
const app = express();

const PORT = process.env.PORT;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.JWT_SECRET));

initializePassport();
app.use(passport.initialize());

app.use('/', viewsRouter);
app.use('/api/users', userRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/product', productRouter);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on http://localhost:${PORT}`);
    });
});
