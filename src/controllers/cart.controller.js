import { cartRepository } from "../repositories/cart.repository.js";
import { productRepository } from "../repositories/product.repository.js";
import { ticketRepository } from "../repositories/ticket.respository.js";
import { userRepository } from "../repositories/user.repository.js";

class CartController {
    constructor(repository, productRepository, ticketRepository, userRepository) {
        this.repository = repository;
        this.productRepository = productRepository
        this.ticketRepository = ticketRepository
        this.userRepository = userRepository
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

    purchase = async (req, res, next) => {
        try {
            const cartId = req.params.cid ?? req.user.cart
            if (!cartId) return res.status(400).json({ status: "error", message: "No cart provided" })
            const userId = req.body?.user ?? req.user._id
            if (!userId) return res.status(400).json({ status: "error", message: "No user provided" })
            const cart = await this.repository.getCart(cartId)
            let totalPriceAmount = 0
            const products = []
            const unavailableProducts = []
            for (const element of cart.products) {
                const product = await this.productRepository.get(element.product)
                const quantity = element.quantity
                if (product.stock < quantity) {
                    unavailableProducts.push(product.title)
                    continue
                }
                const productTotalPrice = quantity * product.price

                totalPriceAmount += productTotalPrice
                products.push({ product: product.title, quantity })
                await this.productRepository.decreaseStock(product._id, quantity)
            }
            const user = await this.userRepository.getUser(userId)
            const ticketData = {
                purchaserId: user._id,
                purchaser: user.email,
                amount: totalPriceAmount,
                items: products
            }
            if (unavailableProducts.length >= products.length) {
                return res.status(400).json({
                    status: "error",
                    message: "All requested products were exceeded in demand"
                })
            }
            const ticket = await this.ticketRepository.issue(ticketData)
            let response = { ticket }
            if (unavailableProducts.length > 0) {
                response = {
                    ticket, unavailableProducts,
                    message: "The requested quantity for certain products exceeded their available stock"
                }
            }
            res.json(response)
        } catch (error) {
            next(error)
        }
    }
}

export const cartController = new CartController(cartRepository, productRepository, ticketRepository, userRepository);