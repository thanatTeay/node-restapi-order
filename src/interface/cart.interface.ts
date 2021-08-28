import {Document} from 'mongoose'

export default interface ICart extends Document {
    name: string;
    price: number;
}