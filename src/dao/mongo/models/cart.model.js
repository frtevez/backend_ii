import {Schema, Model} from "mongoose";

const cartSchema = new Schema({
    products: {
        type: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: "product",
                    unique: true
                },
                quantity: {
                    type: Number,
                    min: 1,
                    default: 1
                }
            }
        ],
        default: []
    }
}, {
    timestamps: true
});

const CartModel = Model("cart", cartSchema);

export default CartModel;