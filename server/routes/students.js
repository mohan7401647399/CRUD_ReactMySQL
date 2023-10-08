const express = require("express");
const router = express.Router();
const studentController = require("../controller/studentContoller")

// View ALl
router.get("/", studentController.view);

// Add new records
router.get("/addusers", studentController.addusers);
router.post("/addusers", studentController.save);

// Edit records
router.get("/edituser/:id", studentController.edituser);
router.post("/edituser/:id", studentController.edit);

// delete records
router.get("/deleteuser/:id", studentController.delete);
// router.get("", (req, res) => {
//     res.render("home")
// });

module.exports = router;