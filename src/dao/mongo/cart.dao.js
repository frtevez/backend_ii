import CustomError from "../../utils/customError.js";
import CartModel from "./models/cart.model.js";
import MongoDao from "./mongo.dao.js";

class CartDao extends MongoDao {
    constructor(model) {
        super(model);
    }
    pushProduct = async (cartId, productId, quantity) => {
        try {
            return await this.model.updateOne({ _id: cartId }, { $push: { products: { product: productId, quantity } } }, { runValidators: true })
        } catch (error) {
            throw new Error(error)
        }
    }
}

export const cartDao = new CartDao(CartModel);