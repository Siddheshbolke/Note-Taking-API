import userModel from "../model/userModel.js"
import createError from "../utils/createError.js"


//delete user
export const deleteUser=async(req,res,next)=>{

    const user=await userModel.findById(req.params.id)

    if(req.userId !== user._id.toString()){
      return  next(createError(403,"you can delete only our account"))
    }

    await userModel.findByIdAndDelete(req.params.id);

    res.status(200).send("deleted successfully")
    
    

}


