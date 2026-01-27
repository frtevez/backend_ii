import { hashSync, compareSync, genSaltSync } from 'bcrypt';
import { userDao } from '../dao/mongo/user.dao.js';
import CustomError from '../utils/customError.js';
import { cartDao } from '../dao/mongo/cart.dao.js';

const createHash = password => hashSync(password, genSaltSync(10));
const isValidPassword = (user, password) => compareSync(password, user.password);

class UserRepository {
    constructor(dao, cartDao) {
        this.dao = dao;
        this.cartDao = cartDao;
    }

    listAll = async () => {
        try {
            return await this.dao.getAll()
        } catch (error) {
            throw new Error(error)
        }
    };

    resetCart = async (userId) => {
        try {

            const cart = await this.cartDao.create()

            await this.dao.updateById(userId, { cart: cart._id })
            return cart
        } catch (error) {
            throw new Error(error)
        }
    }

    register = async (body) => {
        const { first_name, last_name, email, age, password, role } = body;

        if (!first_name || !last_name || !email || !age || !password || !role) {
            throw new CustomError('Required fields are empty', 400);
        };
        const hashedPassword = createHash(password);

        try {
            const userExists = await this.dao.getByEmail(email);
            if (userExists) throw new CustomError('User already exists', 400);
            const newCart = await cartDao.create({ products: [] })
            const newUser = await this.dao.create({
                first_name,
                last_name,
                email,
                age,
                password: hashedPassword,
                cart: newCart._id,
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

    removeUser = async (id) => {
        try {
            const user = await this.dao.getById(id)
            await cartDao.deleteById(user.cart)
            return await this.dao.deleteById(id)
        } catch (error) {
            throw new Error(error)
        }
    }

    getUser = async (id) => {
        try {
            return await this.dao.getById(id)
        } catch (error) {
            throw new Error(error)
        }
    }
}

export const userRepository = new UserRepository(userDao, cartDao);