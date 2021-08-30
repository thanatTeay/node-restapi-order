import  mongoose, {Schema}  from "mongoose";
import IBeverage from "../interface/beverage.interface";

const BeverageSchema = new Schema(
    {
        name: {type: String, required: true},
        price: {type: Number, required: true},
        option: {type: Schema.Types.ObjectId, ref: 'Option'},
    },
    {
        timestamps: true
    }
);



const Beverage = mongoose.model<IBeverage>("Beverage", BeverageSchema)

export default Beverage