const router = require("express").Router();

const auth = require("../middleware/auth");

const role = require("../middleware/roles");

const {

getHospitals,
addHospital,
updateHospital,
deleteHospital

}=require("../controllers/hospitalController");

router.get(
"/",
auth,
role("platform_admin"),
getHospitals
);

router.post(
"/",
auth,
role("platform_admin"),
addHospital
);

router.put(
"/:id",
auth,
role("platform_admin"),
updateHospital
);

router.delete(
"/:id",
auth,
role("platform_admin"),
deleteHospital
);

module.exports=router;