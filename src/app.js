import express from 'express';
import userRouter from './routes/user.router.js';
import connectMongoDB from './config/db.js';
import cookieParser from 'cookie-parser';
import viewsRouter from './routes/views.router.js';
import initializePassport from './config/passport.config.js';
import passport from 'passport';
import { configDotenv } from 'dotenv';

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

connectMongoDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on http://localhost:${PORT}`);
    });
});
