import {NextFunction, Request, Response} from 'express'
import  mongoose  from 'mongoose';
import Beverage from '../model/beverage.model'



const updateBeverage = (req: Request, res: Response, next: NextFunction) => {
    let id = req.params.id;
    Beverage.findByIdAndUpdate(id,req.body)
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



const createBeverage = (req: Request, res: Response, next: NextFunction) => {
    let {name, price} = req.body;

    //let option = optionController.getOptionByID(res:"61298c6c2c09f5d69b33a058")

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

const deleteBeverage = (req: Request, res: Response, next: NextFunction) => {
    let id = req.params.id;
    console.log(id)
    Beverage.deleteOne({_id: id}).exec().then((result) =>{
        console.log(result)
        return res.status(200).json({
            message: "Successfully deleted the beverage name "+result
            
        })
    })
    .catch((error) => {
         return res.status(500).json({
             message: error.message,
             error
         })
    })

}


const getBeverageByID = (req: Request, res: Response, next: NextFunction) => {

    
    Beverage.findById(req.params.id, (err: any , result: any)=>{
        console.log(result)
        if(err){
            return res.status(500).json({
                message: err.message,
                err
            })
        }else{
            return res.status(200).json({
                beverage: result
                
            })
        }
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

export default {getAllBeverage, createBeverage, getBeverageByID,deleteBeverage,updateBeverage}