const bcrypt = require('bcrypt')
const User = require('../models/User')
const userRouter = require('express').Router()

userRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('routine', {
        day: 1,
        exersiceItem: 1
    })

    res.json(users)
})

userRouter.post('/', async (request, response) => {
    try {
        const { body } = await request
        const { username, password } = await body


        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)

        const user = new User({
            username,
            passwordHash,
        })

        const savedUser = await user.save()
        response.status(201).json(savedUser)

    } catch (error) {
        console.error(error)
        response.status(400).json({ error })

    }

})

module.exports = userRouter