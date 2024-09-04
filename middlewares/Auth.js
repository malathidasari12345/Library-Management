const jwt = require('jsonwebtoken');
const User = require('../models/users');

const isAuth = async (req, res, next) => {
    const { token } = req.cookies;
    console.log(token);

    if (!token) {
        return res.status(409).json({
            success: false,
            message: 'Please Login',
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded._id);
        console.log(req.user)
        if (!req.user) {
            return res.status(401).json({ message: 'User not found' });
        }
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};

module.exports = isAuth;
