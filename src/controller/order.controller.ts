import {NextFunction, Request, Response} from 'express'
import  mongoose  from 'mongoose';
import Beverage from '../model/beverage.model';
import Order from '../model/order.model'



const updateOrder = (req: Request, res: Response, next: NextFunction) => {
   /* let id = req.params.id;
    Order.findByIdAndUpdate(id,req.body)
    .exec()
    .then((result) =>{
        console.log(result)
        return res.status(200).json({
            message: "Successfully updated"
            
        })
    })
    .catch((error) => {
         return res.status(500).json({
             message: error.message,
             error
         })
    })*/
}



const createOrder = (req: Request, res: Response, next: NextFunction) => {
    let {beverage, quatity} = req.body;

    /*Beverage.findById(beverage, (err: any , result: any)=>{
        console.log(result)
        console.log(err)

    })***/

    const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        beverage,
        quatity

    })

    return order.save()
    .then(result => {
        return res.status(201).json({
            order: result
        })
    })
    .catch(error => {
        return res.status(500).json({
            message: error.message,
            error
        })
    })
}

const deleteOrder = (req: Request, res: Response, next: NextFunction) => {
    let id = req.params.id;
    console.log(id)
    Order.deleteOne({_id: id}).exec().then((result) =>{
        console.log(result)
        return res.status(200).json({
            message: "Successfully deleted the Cart name "+result
            
        })
    })
    .catch((error) => {
         return res.status(500).json({
             message: error.message,
             error
         })
    })

}


const getOrderByID = (req: Request, res: Response, next: NextFunction) => {

    
    Order.findById(req.params.id, (err: any , result: any)=>{
        console.log(result)
        if(err){
            return res.status(500).json({
                message: err.message,
                err
            })
        }else{
            return res.status(200).json({
                cart: result
                
            })
        }
    })
    
}





const getAllOrder = (req: Request, res: Response, next: NextFunction) => {
    Order.find()
   .exec()
   .then((result) =>{
       return res.status(200).json({
           cart: result,
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

export default {getAllOrder, createOrder, getOrderByID,deleteOrder,updateOrder}