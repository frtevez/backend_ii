import User from '../models/user.model.js';
import { hashSync, compareSync, genSaltSync } from 'bcrypt';
import { generateToken } from '../utils/jwt.js';
import { Types } from 'mongoose';

const createHash = password => hashSync(password, genSaltSync(10));
const isValidPassword = (user, password) => compareSync(password, user.password);

export const registerUser = async (req, res) => {
    const { first_name, last_name, email, age, password, role } = req.body;

    if (!first_name || !last_name || !email || !age || !password || !role) {
        return res.status(400).json({ error: 'Required fields are empty' });
    };
    const hashedPassword = createHash(password);

    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ error: 'User already exists' })
        const newUser = new User({ first_name, last_name, email, age, password: hashedPassword, cart: new Types.ObjectId(), role });
        newUser.save();
        res.status(201).json({ message: 'Registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    };
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Required fields are empty' });
    };

    try {
        const user = await User.findOne({ email }).lean();
        if (!user || !isValidPassword(user, password)) {
            return res.status(401).json({ error: 'Password is incorrect or user does not exist' });
        };
        const token = generateToken(user);
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 3600000,
        })
        res.status(200).json({ message: 'Logged in successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    };
};