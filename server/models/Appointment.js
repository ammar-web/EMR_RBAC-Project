const mongoose=require("mongoose");

const appointmentSchema=new mongoose.Schema({

patient:{
type:String,
required:true
},

doctor:{
type:String,
required:true
},

date:{
type:String,
required:true
},

status:{
type:String,
default:"Pending"
},

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

module.exports=mongoose.model("Appointment",appointmentSchema);
