import { cartDao } from "../dao/mongo/cart.dao.js"
import CustomError from "../utils/customError.js"

class CartRepository {
    constructor(dao) {
        this.dao = dao
    }

    addProduct = async (cartId, productId, quantity) => {
        try {
            const cart = await this.dao.getById(cartId)
            if (!cart) {
                throw new CustomError('No cart available', 400)
            };
            const productExistsInCart = cart.products.some(p => p.product.equals(productId))

            if (productExistsInCart) {
                throw new CustomError('This product is already in cart!', 400)
            };
            return await this.dao.pushProduct(cartId, productId, quantity)
        } catch (error) {
            throw new Error(error)
        }
    }

    getCart = async (id) => {
        try {
            return await this.dao.getById(id)
        } catch (error) {
            throw new Error(error)
        }
    }


}

export const cartRepository = new CartRepository(cartDao)