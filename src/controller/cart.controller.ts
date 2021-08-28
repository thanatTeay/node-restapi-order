import {NextFunction, Request, Response} from 'express'
import  mongoose  from 'mongoose';
import Cart from '../model/cart.model'



const updateCart = (req: Request, res: Response, next: NextFunction) => {
    let id = req.params.id;
    Cart.findByIdAndUpdate(id,req.body)
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
    })
}



const createCart = (req: Request, res: Response, next: NextFunction) => {
    let {name, price} = req.body;

    const cart = new Cart({
        _id: new mongoose.Types.ObjectId(),
        name,
        price
    })

    return cart.save()
    .then(result => {
        return res.status(201).json({
            cart: result
        })
    })
    .catch(error => {
        return res.status(500).json({
            message: error.message,
            error
        })
    })
}

const deleteCart = (req: Request, res: Response, next: NextFunction) => {
    let id = req.params.id;
    console.log(id)
    Cart.deleteOne({_id: id}).exec().then((result) =>{
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


const getCartByID = (req: Request, res: Response, next: NextFunction) => {

    
    Cart.findById(req.params.id, (err: any , result: any)=>{
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





const getAllCart = (req: Request, res: Response, next: NextFunction) => {
   Cart.find()
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

export default {getAllCart, createCart, getCartByID,deleteCart,updateCart}