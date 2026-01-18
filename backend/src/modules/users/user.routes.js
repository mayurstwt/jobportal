const express = require("express");
const router = express.Router();

const {protect} = require("../../middlewares/auth.middleware");
const {authorize} = require("../../middlewares/role.middleware");


router.get("/me", protect,  (req,res) => {
    res.json({
        message: "Protected route accessed",
        user: req.user
    })
})


router.get("/admin", protect , authorize("admin"), (req,res) => {
    res.json({
        message: "Admin route accessed",
        user: req.user
    })
})


module.exports = router;