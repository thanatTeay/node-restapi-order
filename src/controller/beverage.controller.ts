import {NextFunction, Request, Response} from 'express'
import  mongoose  from 'mongoose';
import Beverage from '../model/beverage.model'



const createBeverage = (req: Request, res: Response, next: NextFunction) => {
    let {name, price} = req.body;

    console.log(name, price)
    const beverage = new Beverage({
        _id: new mongoose.Types.ObjectId(),
        name,
        price
    })

    return beverage.save()
    .then(result => {
        return res.status(201).json({
            beverage: result
        })
    })
    .catch(error => {
        return res.status(500).json({
            message: error.message,
            error
        })
    })
}


const getAllBeverage = (req: Request, res: Response, next: NextFunction) => {
   Beverage.find()
   .exec()
   .then((result) =>{
       return res.status(200).json({
           beverage: result,
           count: result.length
       })
   })
   .catch((error) => {
        return res.status(500).json({
            message: error.message,
            error
        })
   })
    
}

export default {getAllBeverage, createBeverage}