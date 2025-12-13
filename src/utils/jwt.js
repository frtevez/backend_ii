import jwt from 'jsonwebtoken';
const { sign } = jwt;

export const generateToken = (user) => {
    const JWT_SECRET = process.env.JWT_SECRET;
    const payload = { ...user }
    return sign(payload, JWT_SECRET, { expiresIn: '24h' });
};