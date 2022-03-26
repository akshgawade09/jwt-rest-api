const jwt = require("jsonwebtoken");

module.exports.auth = async (req, res, next) => {
    const token = req.header("auth-token");

    if(!token) return res.status(401).send("Access denied.");

    try {
        const verified = await jwt.verify(token, process.env.JWT_SECRET_TOKEN);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send("Invalid Token.");
    }
}