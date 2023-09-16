const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/User');

loginRouter.post('/', async (req, res) => {
    const { body } = await req;
    const { username, password } = body;

    const user = await User.findOne({ username }).populate('routine');
    const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash);

    if (!(user && passwordCorrect)) {
        return res.status(401).json({
            message: "Invalid user of password"
        })
    }
    const userForToken = {
        id: user._id,
        username: user.username
    }

    const token = jwt.sign(
        userForToken, process.env.SECRET, {
        expiresIn: 60 * 60 * 24 * 7
    }
    )
    return res.send({
        username: user.username,
        token,
        routine:user.routine,
    })


})

module.exports = loginRouter;
