import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    first_name: {
        type: String,
        required: true,
        trim: true
    },
    last_name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: "cart",
        unique: true,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'customer'
    }
}, { timestamps: true });

const UserModel = model('user', UserSchema);

export default UserModel;