import {Document} from 'mongoose'
import IOption from './option.interface'

export default interface IBeverage extends Document {
    name: string;
    price: number;
    
}
