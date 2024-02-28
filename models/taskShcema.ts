import mongoose from 'mongoose';
import Joi from "joi"


interface Task {
    title : string,
    description : string
}

const taskSchema = new mongoose.Schema({
    title :{
        type: String,
        required : true,
        trim : true,
        unique : true,
        minlength: 3,
        maxlength: 200,
    },
    description:{
        type: String,
        trim : true,
        minlength: 3,
        maxlength: 200,
    }
   
})
const taskModel = mongoose.models.Tasks ||  mongoose.model("Tasks" , taskSchema)
export default taskModel;

function validateTask(obj: any) {
    const schema = Joi.object({
      title: Joi.string().trim().min(5).max(100).required(),
      description : Joi.string().trim().min(3).max(200).required(),
      
    });
    return schema.validate(obj);
  }

  export {
    validateTask
  }