import jwt from 'jsonwebtoken';
const { sign, verify } = jwt;

const JWT_SECRET = 'tempsecret';

export const generateToken = (user) => {
    const payload = { ...user }
    return sign(payload, JWT_SECRET, { expiresIn: '24h' });
};

export const verifyToken = token => verify(token, JWT_SECRET);
