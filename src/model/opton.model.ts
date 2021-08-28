import  mongoose, {Schema}  from "mongoose";
import IOption from "../interface/option.interface";

const OptionSchema = new Schema(
    {
        name: {type: String, required: true},
        price: {type: Number, required: true},
    },
    {
        timestamps: true
    }
);



const Option = mongoose.model<IOption>("Option", OptionSchema)

export default Option