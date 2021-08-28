import {Document} from 'mongoose'

export default interface IOption extends Document {
    name: string;
    price: number;
}