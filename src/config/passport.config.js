import passport from "passport";
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';

const cookieExtractor = req => req?.signedCookies?.currentUser ?? null;

const initializePassport = () => {
    passport.use('jwt', new JWTStrategy(
        {
            jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
            secretOrKey: process.env.JWT_SECRET
        },
        async (jwt_payload, done) => {
            try {
                return done(null, jwt_payload);
            } catch (error) {
                return done(error);
            };
        }));
};

export default initializePassport;