import {Schema, model} from "mongoose";

const cartSchema = new Schema({
    products: {
        type: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: "product"
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

const CartModel = model("cart", cartSchema);

export default CartModel;