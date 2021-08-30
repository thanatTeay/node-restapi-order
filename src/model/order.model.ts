import  mongoose, {Schema}  from "mongoose";
import IOrder from "../interface/order.interface";
import Beverage from "./beverage.model";

const OrderSchema = new Schema(
    {
        beverage: [{
            name: String, price:Number, quatity: Number ,option: [{name: String, price: Number}]
        }],
        
        total: {type: Number, required: true }

        
    },
    {
        timestamps: true
    }
);



const Order = mongoose.model<IOrder>("Order", OrderSchema)

export default Order