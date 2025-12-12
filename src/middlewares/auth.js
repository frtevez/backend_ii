import { verifyToken } from "../utils/jwt.js";

const requireAuth = (req, res, next) => {
    const token = req.signedCookies.currentUser;
    if (!token) return res.status(401).json({ error: 'No token' });

    try {
        const payload = verifyToken(token);
        req.user = payload;
        next()
    } catch (error) {
        res.status(403).json({ error: 'Invalid token' });
    }
};
export default requireAuth;