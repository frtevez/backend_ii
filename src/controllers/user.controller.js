import UserDto from "../dto/user.dto.js";
import { userRepository } from "../repositories/user.repository.js";
import { generateToken } from "../utils/jwt.js";
import { setAuthCookie } from "../utils/session.js";

class UserController {
  constructor(repository) {
    this.repository = repository;
  }

  _setCookieAndRespond = (res, user) => {
    const token = generateToken(user)
    setAuthCookie(res, token)
    res.json(new UserDto(user));
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
      this._setCookieAndRespond(res, user)
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await this.repository.login(email, password);
      this._setCookieAndRespond(res, user)

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
}

export const userController = new UserController(userRepository);