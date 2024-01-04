import mongoose from "mongoose";
const { Schema } = mongoose;

const noteSchema = new Schema({

  userId:{
    type:String,
    required:true
  },

  title:{
    type:String,
    required:[true,"title is required"],
  },

  content:{
    type:String,
    required:[true,"content is required"],
  }


},{
  timestamps:true
});

export default mongoose.model("Note", noteSchema)