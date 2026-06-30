const mongoose=require("mongoose");

module.exports=mongoose.model("Hospital",{

name:String,

city:String,

status:String

});