import {Document} from 'mongoose'
import IBeverage from './beverage.interface'

export default interface IOrder extends Document {
    beverage: [IBeverage];
    quatity: number;
}