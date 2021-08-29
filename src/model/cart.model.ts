import  mongoose, {Schema}  from "mongoose";
import ICart from "../interface/cart.interface";

const CartSchema = new Schema(
    {
        beverage: {type: Schema.Types.ObjectId, ref: 'Beverage', required: true},
        quatity: {type: Number, required: true},
        option: {type: Schema.Types.ObjectId, ref: 'Option'}
    },
    {
        timestamps: true
    }
);



const Cart = mongoose.model<ICart>("Cart", CartSchema)

export default Cart