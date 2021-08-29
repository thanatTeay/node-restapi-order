import {Document} from 'mongoose'
import IOption from './option.interface'
import IBeverage from './beverage.interface'

export default interface ICart extends Document {
    beverage: IBeverage['_id'];
    quatity: number;
    options: IOption['_id'];
}