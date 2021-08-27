import {Document} from 'mongoose'

export default interface IBeverage extends Document {
    name: string;
    price: number;
}