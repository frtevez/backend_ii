import express from 'express';
import userRouter from './src/routes/user.router.js';
import connectMongoDB from './src/config/db.js';
import cookieParser from 'cookie-parser';
import viewsRouter from './src/routes/views.router.js';

const app = express();
const PORT = 8080;

const JWT_SECRET = 'tempsecret';

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(JWT_SECRET));
app.use('/', viewsRouter);
app.use('/api/users', userRouter);

connectMongoDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on http://localhost:${PORT}`);
    });
});
