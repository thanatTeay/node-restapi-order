import {Document} from 'mongoose'
import IBeverage from './beverage.interface'

export default interface IOrder extends Document {
    beverage: IBeverage['_id'];
    quatity: number;
}