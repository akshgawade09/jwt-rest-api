const router = require("express").Router();
const User = require("../models/user");
const {registerValidation, loginValidation} = require("../validation");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
    // Validation
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details);

    // Check if user exists
    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) return res.status(400).send("Email already exists.");

    // Password hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create User
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    });

    try {
        const savedUser = await user.save();
        res.send({user: savedUser._id});
    } catch (error) {
        res.status(400).send(error); 
    }
})

router.post("/login", async (req, res) => {
    // Validation
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details);

    // Check if user exists
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send("Email does not exists.");

    // Password valid
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send("Invalid email or password.");

    // Create & assign a token
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET_TOKEN);

    res.header("auth-token", token).send(token);
})

module.exports = router;