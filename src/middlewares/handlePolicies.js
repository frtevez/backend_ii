import jwt from 'jsonwebtoken'

export const handlePolicies = policies => (req, res, next) => {
    if (policies.includes("PUBLIC")) return next()

    const token = req.signedCookies.currentUser

    const user = jwt.verify(token, process.env.JWT_SECRET)
    
    if (!policies.includes(user.role.toUpperCase())) {
        return res.status(403).send({status: 'error', error: 'Forbidden'})
    }

    req.user = user
    next()
}