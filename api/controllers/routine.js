const routineRouter = require('express').Router()
const userExtractor = require('../middleware/userExtractor')
const Routine = require('../models/Routine');
const User = require('../models/User');


routineRouter.get('/', userExtractor, async (request, response, next) => {
    try {
        const routine = await Routine.find({}).populate('user', {
            username: 1
        })

        response.json(routine);
    } catch (error) {
        next(error)
    }

});

routineRouter.post('/', userExtractor, async (req, res) => {
    const { day, exersiceItem } = await req.body;
    const { userId } = await req;

    const user = await User.findById(userId);
    const item = await Routine.find({ day: day });

    if (item.length > 0) {
        item[0].exersiceItem = item[0].exersiceItem.concat(exersiceItem);
        await item[0].save();
        return;
    }

    try {

        const newRoutine = new Routine({
            user,
            day,
            exersiceItem,
        });

        const saveRoutine = await newRoutine.save();
        user.routine = user.routine.concat(saveRoutine._id);
        await user.save();

        res.json(saveRoutine);
    } catch (error) {
        console.log(error);
    }

});

routineRouter.delete('/:id', userExtractor, async (req, res) => {
    const { id } = req.params;

    try {
        await Routine.findByIdAndDelete(id)
        res.status(204).end()
    } catch (error) {
        res.status(204).end
        console.log(error);
    }

});

routineRouter.delete('/:id/:name', userExtractor, async (req, res) => {
    const { id, name } = req.params;
    try {
        const routine = await Routine.findById(id);
        routine.exersiceItem = routine.exersiceItem.filter(item => item.Name.toLowerCase().replace(/\s+/g, '') !== name.toLowerCase().replace(/\s+/g, ''));
        await routine.save();

        res.status(204).end()
    } catch (error) {
        res.status(204).end
        console.log(error);
    }

});

module.exports = routineRouter;