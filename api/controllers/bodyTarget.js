const bodyRouter = require('express').Router()
const BodyTarget = require('../models/BodyTarget')

bodyRouter.get('/', async (request, response) => {
    try {
        const routine = await BodyTarget.find({})

        response.json(routine);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }

});

bodyRouter.post('/', async (req, res) => {
    const { name, description } =await req.body

    if (!name || !description) {
        return res.status(401).json({ message: "Data is required" })
    }
    try {
        const newBody = new BodyTarget({
            name,
            description
        })
        const saveBody = await newBody.save()
        res.json(saveBody)
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
})

module.exports = bodyRouter
