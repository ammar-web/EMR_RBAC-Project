const User = require("./models/User");
const bcrypt = require("bcryptjs");

async function seedUsers() {

const users = [

{
name:"Platform Admin",
email:"admin@emr.com",
password:"admin123",
role:"platform_admin",
hospital:""
},

{
name:"Apollo Admin",
email:"apollo@emr.com",
password:"apollo123",
role:"hospital_admin",
hospital:"Apollo Hospital"
},

{
name:"Dr Sharma",
email:"doctor@emr.com",
password:"doctor123",
role:"doctor",
hospital:"Apollo Hospital"
}

];

for(const u of users){

const exist=await User.findOne({email:u.email});

if(!exist){

u.password=await bcrypt.hash(u.password,10);

await User.create(u);

console.log(u.email+" created");

}

}

}

module.exports=seedUsers;