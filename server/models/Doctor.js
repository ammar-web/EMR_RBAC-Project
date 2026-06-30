const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({

  name:{
    type:String,
    required:true
  },

  specialization:{
    type:String,
    required:true
  },

  hospital:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Hospital"
  },

  createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  }

},
{
timestamps:true
});

module.exports=mongoose.model("Doctor",doctorSchema);