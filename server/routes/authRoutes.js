const router=require("express").Router();
const User=require("../models/User");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

router.post("/register",async(req,res)=>{

try{

const {name,email,password,role,hospital}=req.body;

const user=new User({

name,

email,

password:await bcrypt.hash(password,10),

role,

hospital

});

await user.save();

res.json({message:"User Created"});

}catch(err){

res.status(500).json(err);

}

});

router.post("/login",async(req,res)=>{

const {email,password}=req.body;

const user=await User.findOne({email});

if(!user)

return res.status(400).json({message:"Invalid Email"});

const ok=await bcrypt.compare(password,user.password);

if(!ok)

return res.status(400).json({message:"Invalid Password"});

const token=jwt.sign({

id:user._id,

role:user.role,

hospital:user.hospital

},process.env.JWT_SECRET);

res.json({

token,

role:user.role,

name:user.name

});

});

module.exports=router;