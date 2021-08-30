import  mongoose, {Schema}  from "mongoose";
import IOrder from "../interface/order.interface";

const OrderSchema = new Schema(
    {
        beverage: {type: Schema.Types.ObjectId, ref: 'Beverage', required: true},
        quatity: {type: Number, required: true},
    },
    {
        timestamps: true
    }
);



const Order = mongoose.model<IOrder>("Order", OrderSchema)

export default Order