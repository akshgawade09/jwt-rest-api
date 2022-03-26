const router = require("express").Router();
const {auth} = require("../routes/verify-token");
const User = require("../models/user");

router.get("/", auth, async (req, res) => {
    const user = await User.findById({_id: req.user._id});
    res.send(user);
})

module.exports = router;