import { hashSync, compareSync, genSaltSync } from 'bcrypt';
import { generateToken } from '../utils/jwt.js';
import { Types } from 'mongoose';
import { userDao } from '../dao/mongo/user.dao.js';
import CustomError from '../utils/customError.js';

const createHash = password => hashSync(password, genSaltSync(10));
const isValidPassword = (user, password) => compareSync(password, user.password);

class UserRepository {
    constructor(dao) {
        this.dao = dao;
    }

    listAll = async () => {
        try {
            return await userDao.getAll()
        } catch (error) {
            throw new Error(error)
        }
    };

    register = async (body) => {
        const { first_name, last_name, email, age, password, role } = body;

        if (!first_name || !last_name || !email || !age || !password || !role) {
            throw new CustomError('Required fields are empty', 400);
        };
        const hashedPassword = createHash(password);

        try {
            const userExists = await this.dao.getByEmail(email);
            if (userExists) throw new CustomError('User already exists', 400);
            const newUser = await this.dao.create({
                first_name,
                last_name,
                email,
                age,
                password: hashedPassword,
                cart: new Types.ObjectId(),
                role
            });
            return newUser.toObject();
        } catch (error) {
            throw new Error(error);
        };
    };

    login = async (email, password) => {
        if (!email || !password) {
            throw new CustomError('Required fields are empty', 400);
        };

        try {
            const user = await this.dao.getByEmail(email);
            if (!user || !isValidPassword(user, password)) {
                throw new CustomError('Password is incorrect or user does not exist', 401);
            };
            return user.toObject();
        } catch (error) {
            throw new Error(error)
        };
    };
}

export const userRepository = new UserRepository(userDao);