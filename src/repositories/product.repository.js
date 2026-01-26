import { productDao } from '../dao/mongo/product.dao.js';
import CustomError from '../utils/customError.js';

class ProductRepository {
    constructor(dao) {
        this.dao = dao;
    }

    get = async (id) => {
        try {
            return await this.dao.getById(id)
        } catch (error) {
            throw new Error(error)
        }
    };


    listAll = async () => {
        try {
            return await this.dao.getAll()
        } catch (error) {
            throw new Error(error)
        }
    };

    addNew = async (body) => {
        try {
            const { title, description, price, stock, category, thumbnails } = body
            const newProduct = this.dao.create({ title, description, price, stock, category, thumbnails })
            return await newProduct;
        } catch (error) {
            throw new Error(error);
        }
    }

    remove = async (id) => {
        try {
            return await this.dao.deleteById(id)
        } catch (error) {
            throw new Error(error);
        }
    }

    edit = async (id, body) => {
        try {
            return await this.dao.updateById(id, body)
        } catch (error) {
            throw new Error(error);
        }
    }

    increaseStock = async (id, quantity) => {
        try {
            const product = await this.dao.getById(id)
            const newStock = product.stock + Number(quantity)
            return await this.dao.updateById(id, { stock: newStock })
        } catch (error) {
            throw new Error(error);
        }
    }

    decreaseStock = async (id, quantity) => {
        try {
            const product = await this.dao.getById(id)
            const newStock = product.stock - Number(quantity)
            return await this.dao.updateById(id, { stock: newStock })
        } catch (error) {
            throw new Error(error);
        }
    }

}

export const productRepository = new ProductRepository(productDao);