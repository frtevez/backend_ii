import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    description: {
        type: String,
        default: "",
        trim: true,
        index: "text"
    },
    price: {
        type: Number,
        required: true,
        default: 1,
        min: 0
    },
    stock: {
        type: Number,
        default: 0,
        min: 0
    },
    category: {
        type: String,
        default: "miscellaneous",
        trim: true,
        index: true
    },
    thumbnails: {
        type: [String],
        default: []
    }
}, {
    timestamps: true
});

const ProductModel = model('product', ProductSchema);

export default ProductModel;