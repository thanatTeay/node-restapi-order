import  mongoose, {Schema}  from "mongoose";
import IBeverage from "../interface/beverage.interface";
import Option from "./opton.model";

const BeverageSchema = new Schema(
    {
        name: {type: String, required: true},
        price: {type: Number, required: true},
        option: [{name: String, price: Number}]
    },
    {
        timestamps: true
    }
);



const Beverage = mongoose.model<IBeverage>("Beverage", BeverageSchema)

export default Beverage