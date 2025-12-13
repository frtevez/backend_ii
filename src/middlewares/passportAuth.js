import passport from "passport";

export const passportCall = (strategy) =>
    async (req, res, next) => {
        passport.authenticate(strategy, { session: false }, (error, user, info) => {
            if (error || !user) return res.redirect(`/login?error=${info}`);
            req.user = user;
            next();
        })(req, res, next);
    };

export default passportCall;