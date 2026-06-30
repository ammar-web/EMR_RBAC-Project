const router = require("express").Router();

const auth = require("../middleware/auth");
const role = require("../middleware/roles");

const { getDashboard } = require("../controllers/dashboardController");

router.get("/", auth, getDashboard);

module.exports = router;