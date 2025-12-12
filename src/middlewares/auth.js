import { verifyToken } from "../utils/jwt";

export const requireAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'No token' });

    const token = authHeader.split(' ')[1]
    try {
        const payload = verifyToken(token);
        req.user = payload;
        next()
    } catch (error) {
        res.status(403).json({error: 'Invalid token'});
    }
};