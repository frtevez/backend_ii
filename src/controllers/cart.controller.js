import { cartRepository } from "../repositories/cart.repository.js";

class CartController {
    constructor(repository) {
        this.repository = repository;
    }

    addProductToCurrentUserCart = async (req, res, next) => {
        try {
            const cartId = req.user.cart
            const { product_id: product, quantity } = req.body
            await this.repository.addProduct(cartId, product, quantity)
            const cart = await this.repository.getCart(cartId)
            res.json({ cart })
        } catch (error) {
            next(error)
        }
    }

    get = async (req, res, next) => {
        try {
            const cart = await this.repository.getCart(req.user.cart)
            res.json({ cart })
        } catch (error) {
            next(error)
        }
    }

    listAll = async (req, res, next) => {
        try {
            const carts = await this.repository.listAll();
            res.json({ carts });
        } catch (error) {
            next(error);
        }
    };
    
}

export const cartController = new CartController(cartRepository);