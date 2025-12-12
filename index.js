import express from 'express';
import userRouter from './src/routes/user.router.js';
import connectMongoDB from './src/config/db.js';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = 8080;
connectMongoDB();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// app.use('/', viewsRouter);
app.use('/api/users',  userRouter);

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});