
import { Schema, Model } from "mongoose"

const TicketSchema = new Schema({
    code: {
        type: String,
        unique: true,
        required: true
    },
    amount: {
        type: Number,
        required: true,
    },
    items: {
        type: [{ product: String, quantity: Number }]
    },
    purchaser: {
        type: String,
        required: true
    },
    purchaserId: {
        type: Schema.Types.ObjectId,
        ref: "user"
    }
}, { timestamps: true })

const TicketModel = Model("ticket", TicketSchema)
export default TicketModel;