const mongoose=require("mongoose");

const prescriptionSchema=new mongoose.Schema({

patient:String,

doctor:String,

medicine:String,

notes:String,

hospital:{
type:mongoose.Schema.Types.ObjectId,
ref:"Hospital"
},

doctorUser:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
}

},
{
timestamps:true
});

module.exports=mongoose.model("Prescription",prescriptionSchema);