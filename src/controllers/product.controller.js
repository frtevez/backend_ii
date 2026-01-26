import UserDto from "../dto/user.dto.js";
import { productRepository } from "../repositories/product.repository.js";

class ProductController {
    constructor(repository) {
        this.repository = repository;
    }

    get = async (req, res, next) => {
        try {
            const product = await this.repository.get(req.params.pid)
            res.json({ product })
        } catch (error) {
            next(error)
        }
    }    

    new = async (req, res, next) => {
        try {
            const newProduct = await this.repository.addNew(req.body)
            res.json({ newProduct })
        } catch (error) {
            next(error)
        }
    }

    remove = async (req, res, next) => {
        try {
            const removedProduct = await this.repository.remove(req.params.pid)
            if (!removedProduct) return res.status(404)
                .json({ status: "error", message: "Product Not Found" });
            res.json({ removedProduct })
        } catch (error) {
            next(error)
        }
    }

    edit = async (req, res, next) => {
        try {
            const updatedProduct = await this.repository.edit(req.params.pid, req.body)
            if (!updatedProduct) return res.status(404).json({ status: "error", message: "Product Not Found" });
            res.json({ updatedProduct })
        } catch (error) {
            next(error)
        }
    }

    increaseStock = async (req, res, next) => {
        try {
            const updatedProduct = await this.repository.increaseStock(req.params.pid, req.body.quantity)
            res.json({ updatedProduct })
        } catch (error) {
            next(error)
        }
    }

    decreaseStock = async (req, res, next) => {
        try {
            const updatedProduct = await this.repository.decreaseStock(req.params.pid, req.body.quantity)
            res.json({ updatedProduct })
        } catch (error) {
            next(error)
        }
    }

    listAll = async (req, res, next) => {
        try {
            const allProducts = await this.repository.listAll();
            res.json({ allProducts });
        } catch (error) {
            next(error);
        }
    };
}

export const productController = new ProductController(productRepository);