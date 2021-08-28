import {NextFunction, Request, Response} from 'express'
import  mongoose  from 'mongoose';
import Option from '../model/opton.model'



const updateOption = (req: Request, res: Response, next: NextFunction) => {
    let id = req.params.id;
    Option.findByIdAndUpdate(id,req.body)
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



const createOption = (req: Request, res: Response, next: NextFunction) => {
    let {name, price} = req.body;

    const option = new Option({
        _id: new mongoose.Types.ObjectId(),
        name,
        price
    })

    return option.save()
    .then(result => {
        return res.status(201).json({
            option: result
        })
    })
    .catch(error => {
        return res.status(500).json({
            message: error.message,
            error
        })
    })
}

const deleteOption = (req: Request, res: Response, next: NextFunction) => {
    let id = req.params.id;
    console.log(id)
    Option.deleteOne({_id: id}).exec().then((result) =>{
        console.log(result)
        return res.status(200).json({
            message: "Successfully deleted the Option name "+result
            
        })
    })
    .catch((error) => {
         return res.status(500).json({
             message: error.message,
             error
         })
    })

}


const getOptionByID = (req: Request, res: Response, next: NextFunction) => {

    
    Option.findById(req.params.id, (err: any , result: any)=>{
        console.log(result)
        if(err){
            return res.status(500).json({
                message: err.message,
                err
            })
        }else{
            return res.status(200).json({
                Option: result
                
            })
        }
    })
    
}





const getAllOption = (req: Request, res: Response, next: NextFunction) => {
   Option.find()
   .exec()
   .then((result) =>{
       return res.status(200).json({
           option: result,
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

export default {getAllOption, createOption, getOptionByID,deleteOption,updateOption}