import UserDto from "../dto/user.dto.js";
import { userRepository } from "../repositories/user.repository.js";
import { generateToken } from "../utils/jwt.js";
import { setAuthCookie } from "../utils/session.js";

class UserController {
  constructor(repository) {
    this.repository = repository;
  }

  _setCookie = (res, data) => {
    const token = generateToken(data)
    setAuthCookie(res, token)
  }

  current = async (req, res, next) => {
    try {
      const currentUser = new UserDto(req.user)
      res.json({ currentUser })
    } catch (error) {
      next(error)
    }
  }

  register = async (req, res, next) => {
    try {
      const user = await this.repository.register(req.body);
      this._setCookie(res, user)
      res.json(new UserDto(user));
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await this.repository.login(email, password);
      this._setCookie(res, user)
      res.json(new UserDto(user));
    } catch (error) {
      next(error);
    }
  };

  listAll = async (req, res, next) => {
    try {
      const users = await this.repository.listAll();
      res.json({ users: users.map(u => new UserDto(u)) });
    } catch (error) {
      next(error);
    }
  };

  resetCart = async (req, res, next) => {
    try {
      const userId = req.user._id
      
      const cart = await this.repository.resetCart(userId)
      const user = await this.repository.getUser(userId)
      
      this._setCookie(res, user.toObject())

      res.json({ cart })
    } catch (error) {
      next(error)
    }
  }
}

export const userController = new UserController(userRepository);