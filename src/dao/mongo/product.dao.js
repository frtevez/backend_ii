import MongoDao from "./mongo.dao.js";
import ProductModel from "./models/product.model.js";

class ProductDao extends MongoDao {
  constructor(model) {
    super(model);
  }
}

export const productDao = new ProductDao(ProductModel);